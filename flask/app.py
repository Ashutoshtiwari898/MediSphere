import os
import sys
import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image

# Enable legacy tf.keras only when tf_keras is installed.
# Forcing this env var without tf_keras causes TensorFlow startup failures.
if importlib.util.find_spec("tf_keras") is not None:
    os.environ.setdefault("TF_USE_LEGACY_KERAS", "1")

import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from recommendation import cnv, dme, drusen, normal


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "Trained_Model.keras"
MODEL_H5_PATH = BASE_DIR / "Trained_Model.h5"
CLASS_NAMES = ["CNV", "DME", "DRUSEN", "NORMAL"]

app = Flask(__name__)
CORS(app)

model = None
model_load_error = None


def _attempt_tf_load(candidate):
    tf.keras.backend.clear_session()

    try:
        return tf.keras.models.load_model(candidate, compile=False, safe_mode=False)
    except TypeError:
        return tf.keras.models.load_model(candidate, compile=False)


def _attempt_standalone_keras_load(candidate):
    # Fallback for environments where standalone keras handles serialization better.
    import keras

    return keras.models.load_model(candidate, compile=False)


def load_prediction_model():
    candidates = [MODEL_PATH, MODEL_H5_PATH]
    candidate_errors = []

    # Some saved-model graphs are deeply nested and can exceed default recursion depth.
    original_recursion_limit = sys.getrecursionlimit()
    if original_recursion_limit < 10000:
        sys.setrecursionlimit(10000)

    try:
        for candidate in candidates:
            if not candidate.exists():
                continue

            try:
                return _attempt_tf_load(candidate)
            except Exception as tf_exc:
                try:
                    return _attempt_standalone_keras_load(candidate)
                except Exception as keras_exc:
                    candidate_errors.append(
                        f"{candidate.name} -> tf.keras: {tf_exc}; keras: {keras_exc}"
                    )

        if not candidate_errors:
            raise RuntimeError(
                f"Unable to load a model from {MODEL_PATH.name} or {MODEL_H5_PATH.name}. "
                "No model file was found."
            )

        raise RuntimeError(
            f"Unable to load a model from {MODEL_PATH.name} or {MODEL_H5_PATH.name}. "
            f"Errors: {' | '.join(candidate_errors)}"
        )
    finally:
        if sys.getrecursionlimit() != original_recursion_limit:
            sys.setrecursionlimit(original_recursion_limit)


def get_model():
    global model, model_load_error

    if model is not None:
        return model

    if model_load_error is not None:
        raise RuntimeError(model_load_error)

    try:
        model = load_prediction_model()
        return model
    except Exception as exc:
        model_load_error = str(exc)
        raise


def model_prediction(image_file):
    prediction_model = get_model()
    image_file.stream.seek(0)
    img = Image.open(image_file.stream).convert("RGB").resize((224, 224))
    x = np.array(img, dtype=np.float32)
    x = np.expand_dims(x, axis=0)
    x = tf.keras.applications.mobilenet_v3.preprocess_input(x)
    predictions = prediction_model.predict(x, verbose=0)

    predicted_index = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))
    return predicted_index, confidence


def get_symptom_recommendation(symptoms_text):
    symptoms = (symptoms_text or "").lower()

    dme_keywords = ["diabetes", "sugar", "blurred", "swelling", "edema"]
    cnv_keywords = ["distortion", "wavy", "metamorphopsia", "central vision"]
    drusen_keywords = ["dry amd", "amd", "drusen", "aging", "elderly"]

    if any(word in symptoms for word in dme_keywords):
        return dme
    if any(word in symptoms for word in cnv_keywords):
        return cnv
    if any(word in symptoms for word in drusen_keywords):
        return drusen
    return normal


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify(
        {
            "status": "ok",
            "modelLoaded": model is not None,
            "modelError": model_load_error,
        }
    ), 200


@app.route("/", methods=["GET"])
def root_status():
    return jsonify(
        {
            "message": "Flask API is running.",
            "routes": ["/health", "/predict", "/recommend"],
        }
    ), 200


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided. Use form-data key 'image'."}), 400

    image_file = request.files["image"]
    if not image_file or image_file.filename == "":
        return jsonify({"error": "Empty image file."}), 400

    try:
        predicted_index, confidence = model_prediction(image_file)
        prediction = CLASS_NAMES[predicted_index]

        return jsonify(
            {
                "prediction": prediction,
                "classIndex": predicted_index,
                "confidence": round(confidence, 4),
            }
        ), 200
    except Exception as exc:
        return jsonify({"error": f"Prediction failed: {str(exc)}"}), 500


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json(silent=True) or {}
        patient_name = data.get("patientName", "Patient")
        age = str(data.get("age", "")).strip()
        symptoms = data.get("symptoms", "")

        if not symptoms:
            return jsonify({"error": "Symptoms are required."}), 400

        recommendation_text = get_symptom_recommendation(symptoms)
        header = f"Patient: {patient_name}\nAge: {age or 'N/A'}\n\n"

        return jsonify({"result": header + recommendation_text}), 200
    except Exception as exc:
        return jsonify({"error": f"Recommendation failed: {str(exc)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)