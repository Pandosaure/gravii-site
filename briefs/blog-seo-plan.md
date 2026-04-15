# Gravii Blog — SEO Content Plan

## Overview

7 posts forming a topical cluster around "product decision-making for B2B PMs." The goal is to establish topical authority on a new domain (gravii.app) so Google indexes the site as an expert source on product intelligence and PM decision-making.

All posts target B2B SaaS PMs at companies in the €5-50M ARR range. The tone is practitioner, not vendor. Write as a PM who builds tools, not a marketer selling one.

---

## Technical setup

- Blog lives at gravii.app/blog
- Platform: Next.js with MDX
- Every post needs: title tag (under 60 chars), meta description (under 155 chars), Open Graph image, JSON-LD Article schema, canonical URL
- URL structure: gravii.app/blog/[slug] — slugs are short, keyword-rich, no dates
- Author: Tommy Jamet, Head of Product at Coincover, founder of Gravii
- Author bio on every post (E-E-A-T signal): one paragraph about PM experience, link to LinkedIn

---

## Cluster architecture

One pillar post + 6 supporting posts. Every supporting post links to the pillar. The pillar links to every supporting post. Supporting posts cross-link to each other where natural.

```
                    ┌─────────────────────┐
                    │   PILLAR POST       │
                    │   Product Memory    │
                    └──────────┬──────────┘
                               │
     ┌──────┬──────┬───────────┼───────────┬──────┬──────┐
     │      │      │           │           │      │      │
  ┌──▼──┐┌──▼──┐┌──▼──┐  ┌───▼────┐ ┌───▼──┐┌──▼──┐┌──▼──┐
  │ #2  ││ #3  ││ #4  │  │  #7    │ │ #6   ││ #5  │
  │Sgnl ││Prior││Cntxt│  │Onboard │ │ Gut  ││Intel│
  └─────┘└─────┘└─────┘  └────────┘ └──────┘└─────┘
```

---

## Publishing schedule

| Week | Post | Type | SEO value |
|------|------|------|-----------|
| Week 1 | Post #2 — Customer signals | Supporting | Medium — establishes content foundation |
| Week 2 | Post #3 — Feature prioritization | Supporting | High — "feature prioritization framework" has real search volume |
| Week 3 | Post #4 — Losing context | Supporting | Medium — emotionally resonant, shareable |
| Week 4 | Post #1 — Pillar (product memory) | Pillar | Anchor — links to all 3 existing posts on publish |
| Week 6 | Post #7 — PM onboarding | Supporting | High — "product manager onboarding" has real search volume |
| Week 8 | Post #6 — Gut feeling decisions | Supporting | Medium — problem-aware PMs searching for alternatives |
| Week 10 | Post #5 — Intelligence analysts | Supporting | Low search volume but highest LinkedIn shareability |

The pillar goes live in week 4, not week 1. By the time it publishes, it already has 3 supporting posts to link to, making it immediately authoritative.

---

## Post #1 — PILLAR

### Claude-blog command
```
/blog brief "product memory for B2B product teams"
```
Then:
```
/blog write "product memory for B2B product teams"
```

### SEO target
- Primary keyword: "product memory"
- Secondary keywords: "product intelligence tool", "product decision making", "B2B product management signals"
- Search intent: informational — PM is looking for a better way to organize product knowledge
- Target word count: 2500-3000 words (pillar posts need depth)

### Slug
`gravii.app/blog/product-memory`

### Title tag
"Product Memory: Why B2B Product Teams Keep Making the Same Mistakes"

### Meta description
"Product teams lose critical context within 48 hours of every meeting. Product memory systems capture, connect, and score the signals that drive better decisions."

### Content brief

Write this as a definitive guide to the concept of "product memory." The author (Tommy Jamet) is a Head of Product at a B2B company and is building a tool in this space, so write with genuine practitioner authority.

Structure:
1. Open with the problem: B2B product teams make high-stakes decisions based on incomplete information. Not because the information doesn't exist, but because it gets lost. Meeting notes decay. Slack threads get buried. The PM ends up prioritizing based on whoever spoke loudest last week.

2. Define "product memory" as a concept: it's the system that captures every signal from every conversation and connects them into a structured graph of WHO said WHAT about WHICH feature and WHY. It's not a note-taking tool. It's not a CRM. It's not analytics. It's the connective layer between all of those.

3. Explain why traditional tools fail at this:
   - CRMs capture accounts, not product signals
   - Note-taking tools capture text, not structure
   - Analytics tools capture behavior, not intent
   - Feedback tools capture requests, not the reasoning behind them

4. Describe what a product memory system actually does:
   - Captures unstructured input (meetings, emails, calls)
   - Extracts entities (people, companies, features) and signals (requests, risks, decisions)
   - Connects them in a graph (WHO relates to WHAT through which signals)
   - Scores traction over time (which features are gaining evidence, which are losing it)
   - Surfaces what changed (not a dashboard of static numbers, but a view of deltas)

5. The compounding effect: unlike a spreadsheet or a doc, a product memory system gets more valuable with every conversation captured. The 50th capture doesn't just add data — it reinforces or contradicts patterns from the first 49. This is the fundamental shift from "storing notes" to "building intelligence."

6. Close with: the decision stays human. Product memory doesn't tell you what to build. It tells you what you know, how strongly you know it, and what you might be missing. The PM's judgment is amplified, not replaced.

### Internal links to include
- Link to Post #2 when discussing signal capture
- Link to Post #3 when discussing prioritization failures
- Link to Post #4 when discussing context loss
- Link to Post #5 when discussing connecting signals (once published)
- Link to Post #6 when discussing gut-feel decisions (once published)
- Link to Post #7 when discussing how product memory compounds over time and enables faster onboarding

### E-E-A-T signals
- Author's first-hand experience as Head of Product managing 50+ accounts
- Specific examples from real PM workflows (anonymized)
- No claims about Gravii's features — this is a concept piece, not a product pitch
- Mention Gravii once, naturally, as "a tool I'm building to solve this" — in the closing section only

### AI citation optimization
- Include a clear definition paragraph for "product memory" that AI systems can extract as a citation
- Use question-based H2s where natural: "What is product memory?", "Why do traditional tools fail?"
- Include a summary box or key takeaways section at the end

---

## Post #2 — SUPPORTING

### Claude-blog command
```
/blog brief "how to capture customer signals without adding another tool"
```
Then:
```
/blog write "how to capture customer signals without adding another tool"
```

### SEO target
- Primary keyword: "capture customer signals"
- Secondary keywords: "customer feedback capture", "product signals from meetings", "customer intelligence B2B"
- Search intent: informational/problem-aware — PM knows they're losing information, looking for approaches
- Target word count: 1500-2000 words

### Slug
`gravii.app/blog/capture-customer-signals`

### Title tag
"How to Capture Customer Signals Without Adding Another Tool to Your Stack"

### Meta description
"Your customers tell you everything you need to know. The problem isn't collection, it's that signals get lost in meeting notes, emails, and Slack threads within 48 hours."

### Content brief

This post addresses the "tool fatigue" problem. PMs already have Jira, Confluence, Notion, a CRM, Slack, email. The last thing they want is another tool to maintain. The post should validate that frustration and then reframe the problem.

Structure:
1. The tool stack problem: PMs are drowning in tools. Adding "one more feedback tool" gets rejected by the team, the budget, or the PM themselves. This is rational, not lazy.

2. The real problem isn't collection, it's structure: customer signals already exist in every meeting, every email, every support ticket. The PM hears "we need this by Q3 or we'll evaluate alternatives" — that's a churn risk signal with a deadline attached. But it lives in a meeting note that gets forgotten.

3. Three patterns that work without new tools (be honest, these are what PMs actually do):
   - The "email-to-self" pattern: forwarding key emails to a central inbox
   - The "structured meeting note" pattern: using a template that forces signal extraction
   - The "weekly synthesis" pattern: spending 30 min Friday connecting the week's signals

4. Where these patterns break down: they depend on the PM's discipline and memory. They work at 10 accounts. They collapse at 50. The PM becomes the bottleneck and the single point of failure.

5. What "effortless capture" actually looks like: the ideal system takes raw input (paste a meeting note, forward an email) and does the structuring automatically. The PM's job shifts from "extract and organize signals" to "confirm what the system found." This is a 10x reduction in effort, not a new workflow.

6. Close with: the goal isn't zero input — it's minimal input with maximum structure. The PM should spend their time on decisions, not data entry.

### Internal links
- Link to pillar (Post #1) when defining "product memory"
- Link to Post #4 when discussing context loss over time

### E-E-A-T signals
- First-hand examples of managing 50+ customer accounts
- Honest about the limitations of manual approaches
- No product pitch — mention Gravii only as "the approach I'm exploring" if natural

---

## Post #3 — SUPPORTING

### Claude-blog command
```
/blog brief "why feature prioritization frameworks ignore half the evidence"
```
Then:
```
/blog write "why feature prioritization frameworks ignore half the evidence"
```

### SEO target
- Primary keyword: "feature prioritization framework"
- Secondary keywords: "RICE framework limitations", "product prioritization B2B", "how to prioritize features"
- Search intent: informational — PM is using RICE/WSJF/Impact-Effort and feeling like something is off
- Target word count: 1800-2200 words
- NOTE: "feature prioritization framework" has real search volume. This post targets an existing query and redirects the reader toward the product memory concept.

### Slug
`gravii.app/blog/feature-prioritization-evidence`

### Title tag
"Why Your Feature Prioritization Framework Ignores Half the Evidence"

### Meta description
"RICE scores and impact-effort matrices look rigorous. But they're usually filled with guesses, recency bias, and whoever lobbied hardest. Here's what's missing."

### Content brief

This is the highest-SEO-value post in the cluster. "Feature prioritization framework" is a real search term with existing volume. The post needs to rank for it by providing genuine value, then naturally connect to the product memory concept.

Structure:
1. Open with: frameworks feel rigorous. RICE gives you a number. Impact-effort gives you a quadrant. You feel like you made a data-driven decision. But where did the inputs come from?

2. The input problem: most prioritization frameworks are filled with estimates, not evidence. "Reach" in RICE is usually a guess. "Impact" is usually based on the last conversation the PM had, not the full body of evidence. "Confidence" is how the PM feels that morning.

3. Three specific biases that corrupt framework inputs:
   - Recency bias: the customer who spoke yesterday gets more weight than the 10 who spoke last month
   - Volume bias: the loudest customer (or the loudest internal stakeholder) dominates
   - Survivorship bias: you only hear from customers who stayed. Churned customers took their signals with them.

4. What "evidence-based prioritization" actually requires: not a better formula, but better inputs. You need to know: how many distinct customers mentioned this feature (breadth), how strongly they feel about it (strength), whether it's a growth signal or a churn risk (type), and whether the trend is increasing or fading (momentum).

5. How signal accumulation changes the game: instead of scoring features once in a spreadsheet, you let evidence accumulate continuously. A feature that 12 customers mentioned over 3 months with increasing urgency is a different priority than one that 1 VP shouted about yesterday. But in a traditional framework, the VP's request often wins.

6. Close with: the framework isn't the problem. The inputs are. Fix the inputs, and any framework works better.

### Internal links
- Link to pillar (Post #1) for the product memory concept
- Link to Post #2 when discussing how signals get captured
- Link to Post #6 when discussing gut-feel bias

### E-E-A-T signals
- Reference real frameworks (RICE, WSJF, Impact-Effort) with accurate descriptions
- Share personal experience of using these frameworks and feeling uneasy about the inputs
- Name the biases with proper terminology (recency bias, survivorship bias)

---

## Post #4 — SUPPORTING

### Claude-blog command
```
/blog brief "the real cost of losing context between customer calls"
```
Then:
```
/blog write "the real cost of losing context between customer calls"
```

### SEO target
- Primary keyword: "losing context customer calls"
- Secondary keywords: "customer meeting follow up", "product management context switching", "B2B customer intelligence"
- Search intent: problem-aware — PM recognizes they forget things between calls
- Target word count: 1500-1800 words

### Slug
`gravii.app/blog/losing-context-customer-calls`

### Title tag
"The Real Cost of Losing Context Between Customer Calls"

### Meta description
"Within 48 hours of a customer call, most PMs have lost 60-70% of the nuance. The feature request is remembered. The reasoning behind it is gone."

### Content brief

This is the most emotionally resonant post. Every PM has experienced this. They had a great call, took notes, and two weeks later can't remember why a specific feature mattered to that customer.

Structure:
1. The 48-hour decay: after a customer call, you remember the headlines — they want feature X, they're frustrated about Y. But the nuance decays fast. Why they want feature X. What they're currently doing instead. What the business impact is. Who else on their team is affected. This context is what makes the signal actionable, and it's the first thing to go.

2. The compounding loss: this isn't just about one call. A PM has 5-10 calls per week across 30-50 accounts. Every lost detail from every call compounds into a picture that's increasingly incomplete. After a quarter, the PM's "understanding" of their customer base is a patchwork of whatever stuck.

3. What gets lost specifically (make this concrete):
   - The exact words the customer used (not your paraphrase)
   - The timeline or deadline they mentioned
   - The competitive context ("we're also evaluating [competitor] for this")
   - The internal champion's personal motivation
   - The connection between this request and what another customer said last month

4. How PMs compensate (and why it doesn't scale):
   - Re-reading old notes before each call (time-consuming)
   - Asking the customer to repeat themselves (damages trust)
   - Relying on CRM fields that are too structured to capture nuance
   - Building elaborate Notion databases that become maintenance burdens

5. The alternative: context that accumulates automatically. Every conversation adds to a structured record of what this customer cares about, connected to what every other customer cares about. Before your next call, you don't re-read notes — you see the full picture.

6. Close with: the most expensive thing in product management isn't building the wrong feature. It's making decisions with 30% of the information when 100% was available — just not remembered.

### Internal links
- Link to pillar (Post #1) for the product memory concept
- Link to Post #2 when discussing capture approaches
- Link to Post #3 when discussing how lost context corrupts prioritization
- Link to Post #7 when discussing how context loss makes PM onboarding slow

### E-E-A-T signals
- Personal anecdote of forgetting a critical detail and discovering it months later
- Be specific about the types of context that get lost
- The 48-hour and 60-70% figures should be presented as observations, not cited as studies (unless real studies exist — use /blog outline to SERP-check)

---

## Post #5 — SUPPORTING

### Claude-blog command
```
/blog brief "what product teams can learn from intelligence analysts about connecting signals"
```
Then:
```
/blog write "what product teams can learn from intelligence analysts about connecting signals"
```

### SEO target
- Primary keyword: "connecting product signals"
- Secondary keywords: "product intelligence", "signal analysis product management", "pattern recognition PM"
- Search intent: informational/curiosity — PM interested in a novel framing
- Target word count: 1800-2200 words
- NOTE: this post is the most shareable/linkable of the cluster. The unusual angle (intelligence analysis applied to PM) makes it good for LinkedIn recycling and potential backlinks.

### Slug
`gravii.app/blog/intelligence-analysts-product-signals`

### Title tag
"What Product Teams Can Learn From Intelligence Analysts About Connecting Signals"

### Meta description
"Intelligence analysts don't collect more data. They connect data that already exists. B2B product teams have the same problem and can steal the same playbook."

### Content brief

This is the "thought leadership" piece. It borrows from intelligence analysis methodology and applies it to product management. The analogy is genuinely strong: both disciplines involve connecting weak signals from multiple sources to form actionable assessments under uncertainty.

Structure:
1. The parallel: intelligence analysts don't have a data problem. They have a connection problem. Thousands of reports from multiple sources, each individually unremarkable, that become significant when connected. B2B product teams have the exact same challenge — dozens of customer conversations that individually seem routine but collectively reveal a pattern.

2. Three principles from intelligence analysis that apply to product:
   - **Convergence over conviction**: one source saying something strongly is less reliable than five sources saying it independently. In PM terms: one customer demanding a feature is an anecdote. Five customers mentioning the same pain point is a pattern.
   - **Temporal analysis**: when signals appear matters as much as what they say. A feature request that comes up in three consecutive months with increasing urgency is different from one mentioned three times two years ago. Intelligence analysts track timelines. PMs usually don't.
   - **Source diversity**: a signal from a customer, confirmed by a competitor's public roadmap, reinforced by a support ticket pattern, is far stronger than the same signal from three people at the same company. Intelligence analysts weight by source independence. PMs weight by seniority.

3. Why PMs don't naturally think this way: PM training emphasizes frameworks (prioritization matrices, OKRs, roadmaps) not analytical tradecraft. The tools PMs use are built for organizing work, not connecting evidence. The result: PMs are excellent project managers but mediocre analysts.

4. What a "product intelligence graph" looks like: entities (people, companies, features) connected by signals (requests, risks, decisions) weighted by strength and tracked over time. Not a dashboard with numbers. A living network that shows how the pieces relate.

5. Close with: you don't need to be a spy to think like one. The analytical discipline of connecting weak signals from independent sources is the highest-leverage skill a PM can develop. The tools are starting to catch up.

### Internal links
- Link to pillar (Post #1) for the product memory concept
- Link to Post #3 when discussing how frameworks fail without good signal analysis
- Link to Post #4 when discussing context loss degrading signal quality

### E-E-A-T signals
- Reference real intelligence analysis concepts (convergence, source reliability, temporal analysis) accurately
- This is a thought leadership piece — the author's perspective and original thinking are the value
- Mention that the author is building a graph-based product memory tool (Gravii) inspired by these principles

---

## Post #6 — SUPPORTING

### Claude-blog command
```
/blog brief "how to stop making product decisions from memory and gut feeling"
```
Then:
```
/blog write "how to stop making product decisions from memory and gut feeling"
```

### SEO target
- Primary keyword: "product decisions gut feeling"
- Secondary keywords: "data driven product decisions", "product management bias", "evidence based product management"
- Search intent: problem-aware — PM knows gut decisions are risky, looking for alternatives
- Target word count: 1500-1800 words

### Slug
`gravii.app/blog/stop-gut-feeling-product-decisions`

### Title tag
"How to Stop Making Product Decisions From Memory and Gut Feeling"

### Meta description
"Most product decisions feel data-driven but are actually gut calls dressed up with selective evidence. Here's how to tell the difference and what to do about it."

### Content brief

This is the closing post that directly challenges the PM's current behavior. It should feel like a mirror — the reader recognizes themselves and their team.

Structure:
1. The uncomfortable truth: most product decisions are gut calls. Not because PMs are lazy, but because the evidence is scattered across 40 Slack threads, 15 meeting notes, and 3 Notion databases. When you need to make a call in a roadmap meeting, you go with what you remember. What you remember is biased.

2. How gut decisions disguise themselves as data:
   - "Multiple customers asked for this" — how many? Which ones? When?
   - "This is strategic" — based on what evidence? Whose strategy?
   - "I have a strong feeling about this" — that feeling is the average of your last 3 conversations, not your last 30
   - "The data says..." — which data? Selected from what? Ignoring what?

3. Why this matters more at scale: at 5 accounts, gut is fine. You can hold the full picture in your head. At 50 accounts, your memory is a lossy compression of reality. The features of the 5 customers you spoke to this week dominate. The 45 you didn't speak to are invisible.

4. The shift from "remember" to "know": the difference between gut and evidence isn't the decision process — it's the input quality. If you can see that 12 customers mentioned API performance, 8 mentioned it in the context of churn risk, and the trend is increasing over 3 months — you're not using gut. You're using evidence. But you need a system that accumulated that evidence for you.

5. Practical steps to start shifting (honest, not salesy):
   - After every customer call, write down the 2-3 signals, not just the action items
   - When making a prioritization argument, cite the number of independent sources
   - When someone says "I feel strongly," ask "based on what evidence?"
   - Track whether your gut predictions were right over a quarter — most PMs are surprised

6. Close with: the goal isn't to eliminate intuition. Experienced PM intuition is valuable. The goal is to give that intuition better raw material to work with. The best PMs don't ignore their gut — they calibrate it against evidence.

### Internal links
- Link to pillar (Post #1) for the product memory concept
- Link to Post #3 when discussing prioritization biases
- Link to Post #5 when discussing signal connection
- Link to Post #4 when discussing memory decay

### E-E-A-T signals
- Personal honesty about making gut decisions and being wrong
- Practical steps that don't require any tool — establishes credibility by being helpful, not salesy
- Gravii mentioned only in passing if at all — "I'm building a system to automate the evidence accumulation part"

---

## Post #7 — SUPPORTING

### Claude-blog command
```
/blog brief "why it takes 3 months to onboard a product manager and how to fix it"
```
Then:
```
/blog write "why it takes 3 months to onboard a product manager and how to fix it"
```

### SEO target
- Primary keyword: "product manager onboarding"
- Secondary keywords: "PM onboarding time", "product team knowledge transfer", "product context handover", "new PM ramp up"
- Search intent: problem-aware — PM leaders hiring or new PMs feeling the ramp-up pain
- Target word count: 1800-2200 words
- NOTE: "product manager onboarding" has real search volume. People Google this when hiring or starting new roles. This post catches them at a moment when Gravii's value proposition is most obvious.

### Slug
`gravii.app/blog/product-manager-onboarding`

### Title tag
"Why It Takes 3 Months to Onboard a PM and How to Cut It to 3 Days"

### Meta description
"New PMs spend weeks piecing together context from old docs, Slack threads, and colleagues' memories. The problem isn't the PM. It's that product context lives in people's heads."

### Content brief

This post addresses a universal PM pain: the slow ramp-up when joining a new team or taking over a new product area. The hook is the time gap — 2-3 months before a PM feels confident making decisions, not because they lack skill, but because context is scattered and undocumented.

Structure:
1. The onboarding tax: a new PM joins the team. Week one is meetings with stakeholders who each give a different version of priorities. Week two is reading old PRDs and Confluence pages that are already outdated. Week three they sit in on customer calls and hear things that contradict what they read. By month two they're forming their own mental model. By month three they trust it enough to make real decisions. That's a quarter of lost productivity — and the company is paying a senior salary the whole time.

2. What actually takes so long: it's not learning the product. Any smart PM can understand features in a week. It's learning the context around decisions. Why was this prioritized over that? What did customers actually say? What was tried before and failed? Who are the key accounts and what do they care about? This context lives in people's heads, in scattered meeting notes, and in Slack threads nobody can find.

3. Why traditional onboarding solutions fail:
   - Onboarding docs go stale the moment they're written
   - Buddy systems depend on one person's memory and availability
   - Confluence pages capture decisions but not the evidence behind them
   - CRM notes capture account status but not the product signals
   - "Just sit in on calls for a few weeks" means the new PM is passive when they should be acting

4. The departure problem: when a PM leaves, their context leaves with them. The relationships they built with customers, the nuance behind every priority, the signals they were tracking — gone. The next PM starts from scratch. The org loses months of accumulated intelligence every time someone changes roles.

5. What "persistent context" looks like: a system where every signal is captured, every relationship mapped, every evidence chain auditable. A new PM opens it on day one and sees: here are the customers, here's what they care about, here's what's gaining traction, here's the evidence behind every priority. Not a briefing document — a living graph they can explore. The context isn't in anyone's head. It's in the system.

6. Close with: the best product teams aren't the ones with the best onboarding docs. They're the ones where context is a shared asset, not a personal one. When context is persistent and transferable, a PM ramps in days, not months. And when someone leaves, the intelligence stays.

### Internal links
- Link to pillar (Post #1) for the product memory concept
- Link to Post #2 when discussing signal capture as the input mechanism
- Link to Post #4 when discussing context loss between calls (same problem, different timeframe — calls vs tenure)

### E-E-A-T signals
- Author's first-hand experience onboarding into new product areas and inheriting context from predecessors
- Reference real onboarding timelines (2-3 months is industry standard for PM ramp-up)
- Gravii mentioned once as "a system I'm building to make product context persistent" — in the closing section only
- Don't frame this as a Gravii feature pitch. Frame it as a problem statement that any PM leader will recognize

### AI citation optimization
- Include a clear answer to "how long does it take to onboard a product manager" early in the post — this is a question AI systems will surface answers for
- Use a question-based H2: "Why does PM onboarding take so long?"
- Include a concise summary paragraph at the end suitable for AI extraction

---

## Cross-post linking map

| From post | Links to |
|-----------|----------|
| #1 Pillar | #2 (signal capture), #3 (prioritization), #4 (context loss), #5 (connecting signals), #6 (gut decisions), #7 (onboarding/persistent context) |
| #2 Signals | #1 (product memory definition), #4 (context loss) |
| #3 Prioritization | #1 (product memory), #2 (signal capture), #6 (gut bias) |
| #4 Context loss | #1 (product memory), #2 (capture approaches), #3 (corrupted prioritization), #7 (onboarding slow because context lost) |
| #5 Intelligence | #1 (product memory), #3 (frameworks fail), #4 (context loss) |
| #6 Gut feeling | #1 (product memory), #3 (prioritization bias), #5 (signal connection), #4 (memory decay) |
| #7 Onboarding | #1 (product memory), #2 (signal capture), #4 (context loss) |

---

## After each post is written

Run these commands:
1. `/blog seo-check <file>` — validate SEO elements
2. `/blog schema <file>` — generate JSON-LD Article schema
3. `/blog repurpose <file>` — generate LinkedIn posts for content recycling
4. `/blog analyze <file>` — quality score, aim for 80+

---

## Content rules (apply to every post)

- No em-dashes. Use hyphens.
- No "game-changer", "leverage", "unlock", "empower", "dive into", "let's explore", "in today's fast-paced" or any other AI slop phrases.
- No "at [Company], we believe..." framing. Write as a practitioner sharing experience, not a company publishing thought leadership.
- Gravii is mentioned at most once per post, naturally, never as a pitch. The posts sell the problem, not the product.
- Every H2 should be a question or a strong declarative statement. No generic headings like "The Importance of..." or "Understanding..."
- Use specific numbers and examples over vague claims. "50 accounts" not "many accounts." "48 hours" not "quickly."
- Include one surprising or counterintuitive point per post that makes the reader stop and think. This is what makes posts shareable.
- Write for a PM who has 5+ years of experience. Don't explain what a CRM is. Don't explain what B2B means. Respect the reader's intelligence.
