import React, { useEffect, useState } from "react";
import { getCandidates, deleteCandidate } from "../api";
import "./CandidateList.css";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchCandidates = async () => {
    try {
      const res = await getCandidates();
      setCandidates(res.data);
    } catch (err) {
      setError("Failed to load candidates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this candidate?")) return;
    setDeletingId(id);
    try {
      await deleteCandidate(id);
      setCandidates((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Failed to delete candidate.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" /> Loading candidates...
      </div>
    );
  }

  return (
    <div>
      <div className="list-header">
        <div>
          <h2 className="section-title">All Candidates</h2>
          <p className="section-sub">{candidates.length} candidates in the system</p>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {candidates.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No candidates yet</h3>
          <p>Add candidates using the "Add Candidate" tab</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div className="candidates-grid">
          {filtered.map((candidate) => (
            <div key={candidate._id} className="candidate-card card">
              <div className="candidate-card-header">
                <div className="candidate-avatar">
                  {candidate.name.charAt(0).toUpperCase()}
                </div>
                <div className="candidate-info">
                  <h3>{candidate.name}</h3>
                  <p className="candidate-email">{candidate.email}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(candidate._id)}
                  disabled={deletingId === candidate._id}
                >
                  {deletingId === candidate._id ? "..." : "Delete"}
                </button>
              </div>

              <div className="candidate-meta">
                <span className="meta-badge">
                  🕐 {candidate.experience} {candidate.experience === 1 ? "year" : "years"} exp
                </span>
                <span className="meta-badge">
                  🛠 {candidate.skills.length} skills
                </span>
                <span className="meta-badge added-date">
                  📅 {new Date(candidate.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="skills-list">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              {candidate.bio && (
                <p className="candidate-bio">{candidate.bio}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
