import React, { useState } from "react";
import { matchCandidates, aiShortlist } from "../api";
import "./JobMatchForm.css";

export default function JobMatchForm({ onResults }) {
  const [form, setForm] = useState({
    requiredSkills: "",
    minExperience: "",
    preferredSkills: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const parseSkills = (str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const buildPayload = () => ({
    requiredSkills: parseSkills(form.requiredSkills),
    minExperience: parseFloat(form.minExperience) || 0,
    preferredSkills: parseSkills(form.preferredSkills),
  });

  const handleBasicMatch = async () => {
    if (!form.requiredSkills.trim()) {
      setError("Please enter at least one required skill.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await matchCandidates(buildPayload());
      onResults(res.data, "basic");
    } catch (err) {
      setError(err.response?.data?.error || "Matching failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiMatch = async () => {
    if (!form.requiredSkills.trim()) {
      setError("Please enter at least one required skill.");
      return;
    }
    setAiLoading(true);
    setError("");
    try {
      const res = await aiShortlist(buildPayload());
      onResults(res.data, "ai");
    } catch (err) {
      setError(err.response?.data?.error || "AI shortlisting failed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="job-match-page">
      <div className="card job-match-card">
        <h2 className="section-title">Job Requirement</h2>
        <p className="section-sub">
          Enter job requirements to find and rank the best matching candidates
        </p>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label>Required Skills * <span className="hint">(comma separated)</span></label>
          <input
            name="requiredSkills"
            value={form.requiredSkills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Minimum Experience (years)</label>
            <input
              name="minExperience"
              type="number"
              min="0"
              step="0.5"
              value={form.minExperience}
              onChange={handleChange}
              placeholder="e.g. 2"
            />
          </div>
          <div className="form-group">
            <label>Preferred Skills <span className="hint">(optional)</span></label>
            <input
              name="preferredSkills"
              value={form.preferredSkills}
              onChange={handleChange}
              placeholder="e.g. AWS, Docker, TypeScript"
            />
          </div>
        </div>

        {(form.requiredSkills || form.preferredSkills) && (
          <div className="skills-preview-section">
            {form.requiredSkills && (
              <div className="preview-group">
                <span className="preview-label">Required:</span>
                <div className="preview-tags">
                  {parseSkills(form.requiredSkills).map((s, i) => (
                    <span key={i} className="skill-tag matched">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {form.preferredSkills && (
              <div className="preview-group">
                <span className="preview-label">Preferred:</span>
                <div className="preview-tags">
                  {parseSkills(form.preferredSkills).map((s, i) => (
                    <span key={i} className="skill-tag preferred">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="action-buttons">
          <button
            className="btn btn-secondary"
            onClick={handleBasicMatch}
            disabled={loading || aiLoading}
          >
            {loading ? (
              <>
                <span className="btn-spinner" /> Matching...
              </>
            ) : (
              "🔍 Basic Match"
            )}
          </button>

          <button
            className="btn btn-primary ai-btn"
            onClick={handleAiMatch}
            disabled={loading || aiLoading}
          >
            {aiLoading ? (
              <>
                <span className="btn-spinner white" /> AI Processing...
              </>
            ) : (
              "🤖 AI Shortlist (OpenRouter)"
            )}
          </button>
        </div>

        <div className="method-info">
          <div className="method-box">
            <strong>🔍 Basic Match</strong>
            <p>Ranks candidates by skill overlap % and experience criteria</p>
          </div>
          <div className="method-box">
            <strong>🤖 AI Shortlist</strong>
            <p>Uses OpenRouter AI to deeply analyze profiles and provide intelligent recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
