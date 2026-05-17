const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// POST /api/ai/shortlist - AI-based candidate suggestion via OpenRouter
router.post("/shortlist", async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills } = req.body;

    if (!requiredSkills || requiredSkills.length === 0) {
      return res.status(400).json({ error: "requiredSkills is required" });
    }

    const candidates = await Candidate.find();

    if (candidates.length === 0) {
      return res.status(400).json({ error: "No candidates found in database" });
    }

    // Build candidate list string for the AI prompt
    const candidateList = candidates
      .map(
        (c, i) =>
          `${i + 1}. ${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience} years${c.bio ? ` - Bio: ${c.bio}` : ""}`,
      )
      .join("\n");

    const prompt = `
Job Requirements:
- Required Skills: ${requiredSkills.join(", ")}
- Minimum Experience: ${minExperience || 0} years
${preferredSkills && preferredSkills.length > 0 ? `- Preferred Skills: ${preferredSkills.join(", ")}` : ""}

Candidates:
${candidateList}

Please rank these candidates from best to worst fit for this job. For each candidate provide:
1. Their rank
2. A match score (0-100%)
3. A brief explanation of why they are suitable or not suitable

Format your response as JSON array like this:
[
  {
    "name": "Candidate Name",
    "rank": 1,
    "aiScore": 95,
    "recommendation": "Explanation here"
  }
]
Only return the JSON array, no extra text.
    `.trim();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errData = await response.json();
      return res
        .status(500)
        .json({ error: "OpenRouter API error", details: errData });
    }

    const data = await response.json();
    const rawText = data.choices[0].message.content;

    let aiResults;
    try {
      aiResults = JSON.parse(rawText);
    } catch {
      // Try to extract JSON from the response if it has extra text
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        aiResults = JSON.parse(jsonMatch[0]);
      } else {
        return res
          .status(500)
          .json({ error: "Failed to parse AI response", raw: rawText });
      }
    }

    // Merge AI results with candidate data from DB
    const enriched = aiResults.map((aiCandidate) => {
      const dbCandidate = candidates.find(
        (c) => c.name.toLowerCase() === aiCandidate.name.toLowerCase(),
      );
      return {
        ...aiCandidate,
        ...(dbCandidate
          ? {
              _id: dbCandidate._id,
              email: dbCandidate.email,
              skills: dbCandidate.skills,
              experience: dbCandidate.experience,
              bio: dbCandidate.bio,
            }
          : {}),
      };
    });

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
