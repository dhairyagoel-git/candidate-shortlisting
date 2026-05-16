import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./ShortlistedCandidates.css";

const MATCH_COLOR = {
  High: "#00d4aa",
  Medium: "#ffd166",
  Low: "#ff4d6d",
};

export default function ShortlistedCandidates({ results, type, onBack }) {
  const [view, setView] = useState("list"); // "list" | "chart"

  const getScore = (candidate) => {
    if (type === "ai") return candidate.aiScore ?? 0;
    return candidate.matchScore ?? 0;
  };

  const getMatchLevel = (score) => {
    if (score >= 80) return "High";
    if (score >= 50) return "Medium";
    return "Low";
  };

  const chartData = results.map((c) => ({
    name: c.name.split(" ")[0],
    score: getScore(c),
    level: c.matchLevel || getMatchLevel(getScore(c)),
  }));

  return (
    <div className="results-page">
      <div className="results-header">
        <div>
          <h2 className="section-title">
            {type === "ai" ? "🤖 AI Shortlist Results" : "🔍 Match Results"}
          </h2>
          <p className="section-sub">
            {results.length} candidates found · Ranked by{" "}
            {type === "ai" ? "AI analysis" : "skill overlap"}
          </p>
        </div>
        <div className="results-actions">
          <button
            className={`btn btn-secondary view-toggle ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            List
          </button>
          <button
            className={`btn btn-secondary view-toggle ${view === "chart" ? "active" : ""}`}
            onClick={() => setView("chart")}
          >
            📊 Chart
          </button>
          <button className="btn btn-secondary" onClick={onBack}>
            ← New Search
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">😕</div>
          <h3>No matches found</h3>
          <p>Try adjusting the job requirements or adding more candidates</p>
        </div>
      ) : (
        <>
          {view === "chart" && (
            <div className="card chart-card">
              <h3 className="chart-title">Match Score Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
                  <XAxis dataKey="name" stroke="#888899" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#888899" tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "#12121a",
                      border: "1px solid #2a2a3d",
                      borderRadius: "8px",
                      color: "#e8e8f0",
                    }}
                    formatter={(val) => [`${val}%`, "Score"]}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={MATCH_COLOR[entry.level] || "#6c63ff"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                <span className="legend-item high">● High Match</span>
                <span className="legend-item medium">● Medium Match</span>
                <span className="legend-item low">● Low Match</span>
              </div>
            </div>
          )}

          <div className="results-list">
            {results.map((candidate, index) => {
              const score = getScore(candidate);
              const level = candidate.matchLevel || getMatchLevel(score);

              return (
                <div key={candidate._id || index} className={`result-card card match-${level.toLowerCase()}`}>
                  <div className="result-rank">#{index + 1}</div>

                  <div className="result-main">
                    <div className="result-header">
                      <div className="result-avatar">
                        {candidate.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="result-info">
                        <h3>{candidate.name}</h3>
                        {candidate.email && (
                          <p className="result-email">{candidate.email}</p>
                        )}
                      </div>
                      <div className="result-score-section">
                        <div
                          className="score-circle"
                          style={{
                            "--score-color": MATCH_COLOR[level] || "#6c63ff",
                          }}
                        >
                          <span className="score-value">{score}%</span>
                        </div>
                        <span
                          className={`match-badge match-${level.toLowerCase()}`}
                        >
                          {level}
                        </span>
                      </div>
                    </div>

                    <div className="result-meta">
                      {candidate.experience !== undefined && (
                        <span className="meta-badge">
                          🕐 {candidate.experience} yrs exp
                        </span>
                      )}
                      {candidate.meetsExperience !== undefined && (
                        <span
                          className={`meta-badge ${candidate.meetsExperience ? "meets-exp" : "lacks-exp"}`}
                        >
                          {candidate.meetsExperience ? "✓ Meets experience" : "✗ Below experience"}
                        </span>
                      )}
                    </div>

                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="result-skills">
                        {candidate.skills.map((skill, i) => {
                          const isMatched = candidate.matchedSkills?.some(
                            (m) => m.toLowerCase() === skill.toLowerCase()
                          );
                          const isPreferred = candidate.preferredMatched?.some(
                            (m) => m.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <span
                              key={i}
                              className={`skill-tag ${isMatched ? "matched" : isPreferred ? "preferred" : ""}`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {type === "ai" && candidate.recommendation && (
                      <div className="ai-recommendation">
                        <span className="ai-label">🤖 AI Analysis</span>
                        <p>{candidate.recommendation}</p>
                      </div>
                    )}

                    {candidate.bio && (
                      <p className="result-bio">{candidate.bio}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
