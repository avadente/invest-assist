# Invest-Assist

Plain-language investing basics for students (Education & Opportunity track).

**Live:** https://main.d2493a5p56pfp3.amplifyapp.com

## Sections
- **Onboarding**: 7 one-at-a-time questions (experience, goals, monthly budget, time horizon, emergency fund, job/401(k) match, comfort with risk). Skippable and editable later
- **My plan**: one personalized output — a step-by-step action plan built from your answers (checkboxes sync with *Am I ready?*, each step links to its lesson), suggested first account, budget growth preview, gentle nudges, and a **shareable plan card** (share sheet, PNG download, or copy text)
- **Learn**: 5 short lessons + searchable jargon buster
- **Am I ready?**: order-of-operations checklist
- **Growth calculator**: compound growth chart, pre-filled with your budget, plus *Why start now?* (cost of waiting, cash vs. savings vs. investing, when growth passes contributions, cost per day)
- **Scam check**: red-flag self-check with FINRA/FTC links
- **EN | ES** language toggle (defaults to the browser language)

No backend, no accounts, no tracking. Everything stays in the browser (`localStorage`).

## Accessibility
Checked with axe-core (WCAG 2.1 AA) at 320px, 390px and desktop, in light/dark and EN/ES; all color pairs meet AA contrast; tap targets ≥ 44px.

## Develop
```bash
npm install
npm run dev     # local dev server
npm test        # growth-math unit tests (vitest)
npm run build   # outputs dist/
```

## Languages
English and Spanish. Text lives in `src/content/en.ts` and `src/content/es.ts`; quiz scoring is shared in
`src/content/quizScores.ts`. `src/content/content.test.ts` fails the build if the two languages drift apart.

## Deploy
Amplify Hosting (us-east-2) is connected to this repo. **Every push to `main` builds and deploys automatically.**
The build (`amplify.yml`) runs `npm test` first, so a failing test blocks the deploy.

Security headers (CSP, HSTS, X-Frame-Options, etc.) are set on the Amplify app's custom headers.
