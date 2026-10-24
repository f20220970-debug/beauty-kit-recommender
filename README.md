# Beauty Kit Recommender (prototype)

A working prototype of the **pre-visit beauty profile** PRD from the
[Wingit product case](https://github.com/f20220970-debug/wingit-product-case): a customer answers six questions
(skin type, undertone, concerns, occasion, budget, categories) and the app builds the advisor's **at-home trial kit**
of up to 14 products, each with the reasons it was chosen, plus an advisor brief.

**Design choice:** rules choose the kit, so it is predictable, testable and never suggests a wrong shade or skin
type; the LLM (Gemini, optional) only writes the advisor brief about products already chosen, its output is
validated, and a rule-based brief is used if the model is unavailable.

Products, brands and prices are **fictional samples**.

## Run it
```bash
npm install
npm test            # recommendation rules: undertone, skin type, caps, categories
npm run dev         # http://localhost:3000
```
Optional: set `GEMINI_API_KEY` (in `.env.local`, or in Vercel's environment variables) for AI-written briefs.
