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

TEXT:
${text}

Return ONLY valid JSON (no markdown, no backticks):

{
  "title": "5-8 word title",
  "content_type_label": "e.g. 'Customer Call Analysis' or 'Strategy Review' or 'Competitive Brief'",
  "urgency": "high | medium | low",
  "urgency_reason": "Very short: '€120K churn risk' or 'competitor shipped first' or 'no deadline pressure'",

  "headline": "ONE bold sentence (max 100 chars). This is your OPINION as an advisor — the single most important takeaway. Not a summary. A strategic judgment. E.g. 'Ship bulk import this quarter or lose your biggest account.' or 'Your onboarding is killing conversion — fix it before adding features.'",

  "columns": [
    {
      "label": "Adapt to content type (see rules)",
      "color": "#hex",
      "items": [
        {
          "text": "The key point in YOUR words as an advisor (not a quote). Max 12 words. Be direct.",
          "detail": "One supporting detail — who said it, or why it matters. Max 15 words.",
          "amount": "€120K or null — ONLY for financial figures"
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
    "The 1-3 specific actions this team should take NEXT. Be concrete: 'Send DataFlow a bulk import timeline by Friday' not 'Follow up with customer'. These should feel like a senior advisor telling you exactly what to do Monday morning."
  ],

  "blind_spots": [
    "1-2 genuinely missing perspectives. Be specific: 'No engineering input — has anyone scoped the effort?' Only include if truly absent. If the discussion was thorough, return empty array []."
  ],

  "traction_entity": "The feature/entity with the strongest signal — only if one clearly emerges, otherwise null",
  "traction_score": "20-45 if entity exists, 0 if null"
}

COLUMN RULES — adapt to content:
- Customer call: "What They Need" (#10B981) + "What's at Risk" (#EF4444)
- Product review: "Prioritize" (#10B981) + "Monitor" (#F59E0B)
- Strategy: "Decided" (#6366F1) + "Unresolved" (#F59E0B)
- Competitive: "Their Moves" (#EF4444) + "Our Edge" (#10B981)
- Engineering: "Shipped" (#10B981) + "Stuck" (#EF4444)
- Sales: "Hot Deals" (#10B981) + "Slipping" (#EF4444)
- General: "Key Signals" (#10B981) + "Watch Out" (#F59E0B)

CRITICAL RULES:
- MAX 3 items per column. Only the most important. Less is more.
- MAX 2 decisions. Skip if none were made.
- MAX 3 next_moves. Be specific and actionable.
- MAX 2 blind_spots. Empty array if discussion was thorough.
- The headline is NOT a summary. It's your STRATEGIC OPINION. Take a position.
- Column items use YOUR words as an advisor, not direct quotes.
- If the text is short or light on substance, still give your best analysis but be honest about confidence.
- traction_score: 20-45 for a clear signal entity. 0 if nothing stands out enough.`
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "AI error: " + err.substring(0, 200) });
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