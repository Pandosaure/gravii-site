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
        max_tokens: 3000,
        messages: [{
          role: "user",
          content: `You are a product intelligence analyst. Analyze this text and extract structured intelligence. CRITICALLY: adapt your analysis structure to the TYPE of content.

TEXT TO ANALYZE:
${text}

Return ONLY valid JSON (no markdown, no backticks, no explanation):

{
  "title": "Short descriptive title (5-8 words)",
  "content_type": "customer_call | product_review | strategy | competitive | engineering | sales | general",
  "content_type_label": "Human label, e.g. 'Customer Call Analysis' or 'Strategy Review'",
  "urgency": "high | medium | low",
  "urgency_reason": "One short phrase, e.g. 'churn risk on €120K ARR'",
  "insight": "One punchy strategic sentence (max 120 chars). Not a summary — an INTERPRETATION.",
  "columns": [
    {
      "label": "Column header — adapt to content type",
      "color": "#hex",
      "items": [
        {
          "quote": "Direct quote or key point (max 15 words)",
          "source": "Who / which entity",
          "tag": "Short label",
          "amount": "€120K or null"
        }
      ]
    },
    {
      "label": "Second column",
      "color": "#hex",
      "items": [...]
    }
  ],
  "connected": [
    { "from": "Entity", "to": "Entity", "label": "relationship type" }
  ],
  "decisions": [
    { "text": "What was decided", "owner": "Who owns it or null" }
  ],
  "blind_spots": [
    "What is MISSING from this discussion that a smart product leader would notice. Be specific: 'No customer voice — are end users being consulted?', 'No revenue impact quantified', 'No competitive context', 'Engineering feasibility not discussed', 'No timeline mentioned', 'No success metrics defined'. Only genuinely missing perspectives."
  ],
  "traction_entity": "Entity with most signal strength",
  "traction_score": 20-45
}

COLUMN RULES — adapt to content type:
- Customer call/feedback: "Needs" (#10B981) + "Risks" (#EF4444)
- Product review/planning: "Build" (#10B981) + "Watch" (#F59E0B)
- Strategy/leadership: "Decisions" (#6366F1) + "Open Questions" (#F59E0B)
- Competitive: "Threats" (#EF4444) + "Advantages" (#10B981)
- Engineering/sprint: "Progress" (#10B981) + "Blocked" (#EF4444)
- Sales/pipeline: "Opportunities" (#10B981) + "At Risk" (#EF4444)
- General: "Signals" (#10B981) + "Risks" (#F59E0B)

RULES:
- ALWAYS exactly 2 columns, max 4 items each
- Max 4 connected, max 2 decisions
- 2-4 blind spots — genuinely missing perspectives, not what IS in the text
- traction_score 20-45 for single meeting, never above 50
- urgency: high = revenue/deadline/competitive; medium = important; low = exploratory`
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