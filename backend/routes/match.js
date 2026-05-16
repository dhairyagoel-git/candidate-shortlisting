const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

function matchCandidates(candidates, job) {
  return candidates
    .map((candidate) => {
      const matchedSkills = candidate.skills.filter((skill) =>
        job.requiredSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
      );

      const preferredMatched = job.preferredSkills
        ? candidate.skills.filter((skill) =>
            job.preferredSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
          )
        : [];

      const score = matchedSkills.length / job.requiredSkills.length;
      const meetsExperience = candidate.experience >= (job.minExperience || 0);

      let matchLevel = "Low";
      if (score >= 0.8 && meetsExperience) matchLevel = "High";
      else if (score >= 0.5 && meetsExperience) matchLevel = "Medium";

      return {
        _id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        skills: candidate.skills,
        experience: candidate.experience,
        bio: candidate.bio,
        matchScore: Math.round(score * 100),
        matchedSkills,
        preferredMatched,
        meetsExperience,
        matchLevel,
      };
    })
    .filter((c) => c.matchScore > 0 || c.meetsExperience)
    .sort((a, b) => b.matchScore - a.matchScore);
}

// POST /api/match - Shortlist candidates (basic logic)
router.post("/", async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills } = req.body;

    if (!requiredSkills || requiredSkills.length === 0) {
      return res.status(400).json({ error: "requiredSkills is required" });
    }

    const candidates = await Candidate.find();
    const results = matchCandidates(candidates, {
      requiredSkills,
      minExperience: minExperience || 0,
      preferredSkills: preferredSkills || [],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
