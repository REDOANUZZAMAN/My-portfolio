## REDOANUZZAMAN  My Portfolio

A modern, fully-animated portfolio website built with Next.js and a small admin panel for content management.

Features
- Modern, responsive design with a dark theme and subtle animations
- Admin panel with secure login and content CRUD for sections (Hero, About, Skills, Projects, Services, Testimonials)
- Built with Next.js, React, TailwindCSS and optional Supabase backend

Tech Stack
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- Framer Motion (animations)
- Supabase (optional)

Installation
1. Clone the repo and navigate into it:
```powershell
cd "redoan-portfolio"
```
2. Install dependencies:
```powershell
npm install
```
3. Run the development server:
```powershell
npm run dev
```

Open `http://localhost:3000` for the frontend and `http://localhost:3000/me` for the admin panel.

Environment variables
Create a `.env.local` (or set on your hosting provider) and include any Supabase credentials and admin secrets, for example:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_SECRET=your_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Deployment
- Vercel: push to GitHub and import the project on Vercel. Add environment variables and deploy.
- Netlify: connect repository, set build command to `npm run build`, and publish directory to `.next`.

Project structure (abridged)
```
redoan-portfolio/
 app/
 components/
 admin/
 lib/
 public/
```

Scripts
```powershell
npm run dev
npm run build
npm run start
npm run lint
```

License
MIT  feel free to adapt for your own portfolio.

Built by REDOANUZZAMAN
