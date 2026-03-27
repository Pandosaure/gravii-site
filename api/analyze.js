export default async function handler(req, res) {
    // CORS
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
            content: `You are a product intelligence analyst. Analyze this meeting transcript / discussion and extract structured intelligence.
  
  TEXT TO ANALYZE:
  ${text}
  
  Return ONLY valid JSON (no markdown, no backticks, no explanation):
  
  {
    "title": "Short descriptive title for this discussion (5-8 words)",
    "insight": "A 2-3 sentence STRATEGIC synthesis. Don't summarize — interpret. What does this discussion reveal about priorities, risks, and opportunities? Write like a senior product advisor. Be specific, reference actual entities and numbers from the text.",
    "build": [
      {
        "quote": "Direct quote from the text (max 15 words)",
        "source": "Who said it or which entity it relates to",
        "type": "customer_request|competitive|validation|internal_priority",
        "type_label": "Customer Request|Competitive|Validation|Internal Priority"
      }
    ],
    "watch": [
      {
        "quote": "Direct quote (max 15 words)",
        "source": "Source entity",
        "type": "revenue_risk|dependency|blocker",
        "type_label": "Revenue Risk|Dependency|Blocker",
        "amount": "€120K or null if no amount mentioned"
      }
    ],
    "connected": [
      {
        "from": "Entity name",
        "to": "Entity name",
        "relationship": "depends_on|requested_by|relates_to|mentioned_in|spawned|competes_with",
        "label": "Human readable relationship label"
      }
    ],
    "decisions": [
      {
        "text": "What was decided (one sentence)",
        "owner": "Who owns it (if mentioned)"
      }
    ],
    "traction_entity": "The entity/feature with the most signal strength from this discussion",
    "traction_score": 0-100 score based on: how many signals point to it, urgency level, revenue impact, number of sources. A single meeting typically produces 20-45.
  }
  
  RULES:
  - "build" = signals pushing toward building something (requests, competitive pressure, validation)
  - "watch" = risks, dependencies, blockers that need attention
  - "connected" = relationships between entities detected in the text
  - Maximum 4 items in "build", 3 in "watch", 4 in "connected", 2 in "decisions"
  - Be selective — only include genuinely meaningful signals, not every mention
  - traction_score should be realistic: one meeting = 20-45 range, never above 50
  - If the text isn't a meeting/discussion, still extract whatever intelligence is there`
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