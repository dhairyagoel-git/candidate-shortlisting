import React, { useState } from "react";
import { addCandidate } from "../api";
import "./CandidateForm.css";

export default function CandidateForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.skills || !form.experience) {
      setError("Please fill in all required fields.");
      return;
    }

    const skillsArray = form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (skillsArray.length === 0) {
      setError("Please enter at least one skill.");
      return;
    }

    setLoading(true);
    try {
      await addCandidate({
        name: form.name.trim(),
        email: form.email.trim(),
        skills: skillsArray,
        experience: parseFloat(form.experience),
        bio: form.bio.trim(),
      });
      setSuccess("Candidate added successfully!");
      setForm({ name: "", email: "", skills: "", experience: "", bio: "" });
      if (onSuccess) setTimeout(onSuccess, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="candidate-form-page">
      <div className="card candidate-form-card">
        <h2 className="section-title">Add Candidate</h2>
        <p className="section-sub">Fill in the candidate's details below</p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. rahul@gmail.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Skills * <span className="hint">(comma separated)</span></label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>
            <div className="form-group">
              <label>Experience (years) *</label>
              <input
                name="experience"
                type="number"
                min="0"
                step="0.5"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 2"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio / Projects <span className="hint">(optional)</span></label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Brief description of candidate's projects and background..."
            />
          </div>

          {form.skills && (
            <div className="skills-preview">
              <span className="skills-preview-label">Preview:</span>
              <div className="skills-preview-tags">
                {form.skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Candidate"}
          </button>
        </form>
      </div>
    </div>
  );
}
