export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { text } = req.body;
  if (!text || text.length < 50) return res.status(400).json({ error: "Text too short. Paste at least a few paragraphs." });
  if (text.length > 15000) return res.status(400).json({ error: "Text too long. Keep it under 15,000 characters." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2500,
        messages: [{
          role: "user",
          content: `You are a sharp, senior product strategy advisor. A product leader just handed you notes from a discussion. Give them the strategic snapshot they need — NOT a data dump. Be opinionated. Be concise. Only surface what MATTERS.

Your #1 priority is RELEVANCE. Every section you include must earn its place. If something isn't genuinely useful for this specific content, omit it.

TEXT:
${text}

Return ONLY valid JSON (no markdown, no backticks):

{
  "title": "5-8 word title",
  "content_type_label": "e.g. 'Customer Call Analysis', 'Strategy Review', 'Competitive Brief'",
  "urgency": "high | medium | low",
  "urgency_reason": "Very short: '€120K churn risk' or 'no deadline pressure'",

  "headline": "ONE bold sentence (max 100 chars). Your STRATEGIC OPINION — the single most important takeaway. Take a position. E.g. 'Ship bulk import this quarter or lose your biggest account.'",

  "columns": [
    {
      "label": "Adapt to content type (see rules)",
      "color": "#hex",
      "items": [
        {
          "text": "Key point in YOUR words as advisor (max 12 words). Be direct.",
          "detail": "Supporting detail — who, why it matters. Max 15 words.",
          "amount": "€120K or null — ONLY for actual financial figures mentioned"
        }
      ]
    },
    {
      "label": "Second column",
      "color": "#hex",
      "items": [...]
    }
  ],

  "decisions": [
    { "text": "What was decided (max 12 words)", "owner": "Who owns it, or null" }
  ],

  "next_moves": [
    "1-3 specific actions for Monday morning. Be concrete: 'Send DataFlow a timeline by Friday' not 'Follow up with customer'."
  ],

  "blind_spots": [
    "1-2 genuinely missing perspectives. Be specific. Empty array [] if the discussion was thorough."
  ],

  "traction": [
    {
      "entity": "Feature or initiative name",
      "score": 20-45,
      "reason": "Very short: why this score — e.g. '2 customer requests + churn risk' or '1 mention, no urgency'"
    }
  ]
}

COLUMN RULES — adapt to content:
- Customer call: "What They Need" (#10B981) + "What's at Risk" (#EF4444)
- Product review: "Prioritize" (#10B981) + "Monitor" (#F59E0B)
- Strategy: "Decided" (#6366F1) + "Unresolved" (#F59E0B)
- Competitive: "Their Moves" (#EF4444) + "Our Edge" (#10B981)
- Engineering: "Shipped" (#10B981) + "Stuck" (#EF4444)
- Sales: "Hot Deals" (#10B981) + "Slipping" (#EF4444)
- General: "Key Signals" (#10B981) + "Watch Out" (#F59E0B)

TRACTION RULES — this is critical:
- Traction scores represent how much evidence supports building/prioritizing something
- ONLY include traction for clear features, initiatives, or projects that emerged as priorities
- Return EMPTY ARRAY [] if no clear feature/initiative was discussed, or if the text is exploratory/informational with no prioritization signals
- Max 3 entities. Each must have real signal evidence from the text.
- Score range 15-45 for a single discussion. Higher = more signals, urgency, revenue impact, multiple sources.
- A casual mention = don't include. Multiple signals from multiple sources = include.
- Sort by score descending.

GENERAL RULES:
- MAX 3 items per column. Only the most important.
- MAX 2 decisions. Skip if none were made.
- MAX 3 next_moves. Concrete and actionable.
- MAX 2 blind_spots. Empty array if thorough.
- The headline is NOT a summary. It's your STRATEGIC OPINION.
- Column items use YOUR words, not direct quotes.
- Every section must earn its place. Omit empty or low-value sections.`
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "AI processing failed. Please try again." });
    }

    const data = await response.json();
    const responseText = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    let result;
    try {
      const cleaned = responseText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      result = JSON.parse(cleaned);
    } catch {
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}