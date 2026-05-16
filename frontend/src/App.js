import React, { useState } from "react";
import "./App.css";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobMatchForm from "./components/JobMatchForm";
import ShortlistedCandidates from "./components/ShortlistedCandidates";

const TABS = [
  { id: "candidates", label: "Candidates" },
  { id: "add", label: "Add Candidate" },
  { id: "match", label: "Job Matching" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [shortlistResults, setShortlistResults] = useState(null);
  const [shortlistType, setShortlistType] = useState("basic"); // "basic" | "ai"
  const [refreshKey, setRefreshKey] = useState(0);

  const handleShortlistResult = (results, type) => {
    setShortlistResults(results);
    setShortlistType(type);
    setActiveTab("results");
  };

  const handleCandidateAdded = () => {
    setRefreshKey((k) => k + 1);
    setActiveTab("candidates");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <div>
              <h1>TalentAI</h1>
              <p>Candidate Shortlisting System</p>
            </div>
          </div>
          <nav className="nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`nav-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            {shortlistResults && (
              <button
                className={`nav-btn ${activeTab === "results" ? "active" : ""}`}
                onClick={() => setActiveTab("results")}
              >
                Results
                <span className="badge">{shortlistResults.length}</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeTab === "candidates" && (
          <CandidateList key={refreshKey} />
        )}
        {activeTab === "add" && (
          <CandidateForm onSuccess={handleCandidateAdded} />
        )}
        {activeTab === "match" && (
          <JobMatchForm onResults={handleShortlistResult} />
        )}
        {activeTab === "results" && shortlistResults && (
          <ShortlistedCandidates
            results={shortlistResults}
            type={shortlistType}
            onBack={() => setActiveTab("match")}
          />
        )}
      </main>
    </div>
  );
}
