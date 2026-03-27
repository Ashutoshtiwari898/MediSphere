import React, { useState } from "react";

const EyeDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_FLASK_API_URL || (import.meta.env.DEV ? "http://127.0.0.1:5000" : "");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const diseaseDescriptions = {
    CNV: "Choroidal Neovascularization (CNV) occurs when abnormal blood vessels grow under the retina, which can lead to vision distortion or loss if untreated.",
    DME: "Diabetic Macular Edema (DME) is caused by fluid buildup in the retina due to diabetes, leading to blurred vision and potential vision impairment.",
    DRUSEN: "Drusen are yellow deposits under the retina associated with early age-related macular degeneration and can affect visual clarity over time.",
    NORMAL: "No major retinal disease pattern was detected in this scan.",
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Prediction request failed");
      }

      const disease = data.prediction;
      setPrediction({
        disease,
        confidence: data.confidence,
        message: `Model predicts: ${disease}`,
        description: diseaseDescriptions[disease] || "Prediction completed.",
      });
    } catch (err) {
      setError(err.message || "Something went wrong while connecting to Flask API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-2 py-4 sm:px-4">
      <div className="theme-card mb-6 p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
          EyeCheck Lab
        </p>
        <h2 className="display-font text-3xl font-bold sm:text-4xl">Retinal Image Detection</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
          Upload a retinal scan image and receive a fast AI prediction with confidence score.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="theme-card p-6 sm:p-8">
          <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-gray-700">
            Upload Retinal Scan
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-5 block w-full rounded-xl border border-dashed border-gray-300 bg-white/80 p-4 text-sm text-gray-600"
          />

          <button
            onClick={handleUpload}
            className="theme-btn w-full px-5 py-3 text-sm font-semibold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Processing..." : "Analyze Image"}
          </button>

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="theme-card p-6 sm:p-8">
          <h3 className="display-font text-2xl font-bold">Preview</h3>
          {previewURL ? (
            <img
              src={previewURL}
              alt="Uploaded Preview"
              className="mt-4 h-72 w-full rounded-xl border border-gray-200 object-cover shadow-md"
            />
          ) : (
            <p className="mt-4 rounded-xl border border-gray-200 bg-white/70 p-6 text-sm text-gray-500">
              No image selected yet. Choose a file to preview and analyze.
            </p>
          )}
        </div>
      </div>

      {prediction && (
        <div className="theme-card mt-6 p-6 sm:p-8">
          <h3 className="display-font text-2xl font-bold">Analysis Result</h3>
          <p className="mt-3 text-lg font-semibold text-gray-800">{prediction.message}</p>
          {typeof prediction.confidence === "number" && (
            <p className="mt-1 text-sm text-gray-600">
              Confidence: {(prediction.confidence * 100).toFixed(2)}%
            </p>
          )}
          <p className="mt-3 text-sm leading-6 text-gray-700">{prediction.description}</p>
          {prediction.disease !== "NORMAL" && (
            <p className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm font-medium text-orange-700">
              Please consult an eye specialist for a confirmed medical diagnosis.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EyeDetection;