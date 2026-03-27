import React, { useState } from "react";

const HealthAccess = () => {
  const flaskApiBaseUrl =
    (import.meta.env.VITE_FLASK_API_URL || (import.meta.env.DEV ? "http://127.0.0.1:5000" : ""))
      .replace(/\/+$/, "");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [consultationScheduled, setConsultationScheduled] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScheduleConsultation = () => {
    setConsultationScheduled(true);
  };

  const handleGetRecommendation = async () => {
    if (!patientName || !age || !symptoms) {
      alert("Please fill all fields");
      return;
    }

    if (!flaskApiBaseUrl) {
      setAiRecommendation("Flask API URL is missing. Set VITE_FLASK_API_URL in Vercel Environment Variables.");
      return;
    }

    setLoading(true);
    setAiRecommendation("");

    try {
      const response = await fetch(`${flaskApiBaseUrl}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          age,
          symptoms,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      if (data.result) {
        setAiRecommendation(data.result);
      } else {
        setAiRecommendation("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setAiRecommendation(error.message || "Unable to fetch recommendations at this time.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-2 py-4 text-gray-800 sm:px-4">
      <div className="theme-card mb-6 p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
          CareLink Desk
        </p>
        <h2 className="display-font text-3xl font-bold sm:text-4xl">
          Smart Health Query Assistant
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
          Share patient details and symptoms to get an instant AI guidance note and
          schedule a virtual consultation in one flow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="theme-card p-6 sm:p-8">
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              placeholder="Enter age"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700">
              Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              rows="5"
              placeholder="Example: headache, fatigue, blurry vision"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleScheduleConsultation}
              className="theme-btn px-6 py-3 text-sm font-semibold uppercase tracking-wide"
            >
              Schedule Consultation
            </button>
            <button
              onClick={handleGetRecommendation}
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700 transition hover:bg-gray-50"
            >
              {loading ? "Generating..." : "Get AI Recommendation"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {aiRecommendation && (
            <div className="theme-card p-6">
              <h3 className="display-font text-2xl font-bold">AI Recommendation</h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">
                {aiRecommendation}
              </p>
            </div>
          )}

          {consultationScheduled && (
            <div className="theme-card p-6">
              <h3 className="display-font text-2xl font-bold">Consultation Scheduled</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                A healthcare provider will contact you shortly for a virtual consultation.
              </p>
            </div>
          )}

          {!aiRecommendation && !consultationScheduled && (
            <div className="theme-card p-6">
              <h3 className="display-font text-2xl font-bold">Ready to Assist</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Fill the form and generate an AI recommendation. You can then schedule
                a virtual consultation directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthAccess;