# Invest-Assist

Plain-language investing starter for first-generation college students (Education & Opportunity track).

**Live:** https://main.d2493a5p56pfp3.amplifyapp.com

## Sections
- **Start here**: 5 short lessons with progress saved on the device
- **Am I ready?**: order-of-operations checklist with a "next step"
- **Growth calculator**: compound growth with an SVG chart (what you put in vs. growth)
- **Which account?**: 4-question quiz (HYSA / 401(k) / Roth IRA / brokerage)
- **Jargon buster**: searchable glossary
- **Scam check**: red-flag self-check with FINRA/FTC links
- **EN | ES** language toggle (defaults to the browser language)

No backend, no accounts, no tracking. Everything stays in the browser (`localStorage`).

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
