```markdown
# School Scheduler — Frontend (Next.js)

This repository contains the Next.js frontend for a "School Scheduler" app that:
- lets you add exams and topics (things to learn),
- calculates days left until each exam,
- generates a day-by-day study schedule using a ChatGPT-powered backend.

What I provided:
- Full frontend (TypeScript + app router) that stores exams in localStorage
- A mock local scheduler fallback so you can test UI without a backend
- An OpenAPI-style API spec (openapi.yaml) describing the backend endpoints and payloads

How it works:
- Add exams and topics via the UI
- Click "Generate schedule", the frontend calls POST /api/v1/schedule/generate
- If your backend implements that endpoint, it should proxy to the ChatGPT API and return a schedule
- If the backend is absent, the frontend uses a local mock scheduler to produce a reasonable schedule

Next steps for you (backend implementation):
1. Implement the openapi.yaml endpoints:
   - POST /api/v1/schedule/generate: accept exams and options, call ChatGPT (or your chosen LLM), and return GeneratedSchedule.
   - Optionally add persistence endpoints (GET/POST/DELETE /api/v1/exams) if you want server-side storage.
2. Use the request/response shapes in openapi.yaml and types.ts as your contract.
3. Deploy and remove the local mock fallback if desired.

If you'd like, I can next:
- scaffold a small Express / FastAPI / Next API route that implements POST /api/v1/schedule/generate with a ChatGPT call and schema validation, or
- produce server code for Netlify/Azure Functions/Vercel Serverless that does the same.

Which backend language/framework would you prefer for that scaffold (Node/Express, FastAPI, Next.js API route)?
```