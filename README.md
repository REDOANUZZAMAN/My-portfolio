# REDOANUZZAMAN - Full-Stack Portfolio with Admin Panel

A modern, fully animated portfolio website with a powerful admin panel for content management.

## 🚀 Features

### Frontend
- **Modern Design**: Dark theme with gradient accents and glassmorphism
- **Fully Animated**: Framer Motion animations throughout
- **Responsive**: Mobile-first design that works on all devices
- **Sections**: Hero, About, Skills, Projects, Services, Testimonials, Contact
- **Performance Optimized**: Built with Next.js 15 and React 18

### Admin Panel
- **Secure Login**: Protected admin area with authentication
- **Complete CRUD**: Create, Read, Update, Delete all content
- **Content Management**:
  - Hero section (heading, subheading, bio)
  - About section (title, description, image)
  - Skills (add/edit/delete with progress bars)
  - Projects (full project management with images and tags)
  - Services (3 pricing packages)
  - Testimonials (client feedback)
  - Settings (SEO, social links, colors)
- **Modern UI**: Clean dashboard with real-time preview

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18, TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Backend**: Supabase (optional, uses local JSON by default)

## 📦 Installation

1. **Clone or navigate to the project**:
   \`\`\`bash
   cd redoan-portfolio
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/me

## 🔐 Admin Access

**Default Credentials**:
- Username: `admin`
- Password: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📝 Configuration

### Environment Variables

Create or edit `.env.local`:

\`\`\`env
# Supabase (Optional - uses local JSON by default)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Admin Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_SECRET=your_secret_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

\`\`\`typescript
colors: {
  primary: { ... },  // Main brand color
  accent: { ... },   // Secondary color
}
\`\`\`

Or use the Admin Panel > Settings to change colors dynamically.

### Content

All content can be edited through the Admin Panel at `/me`.

## 📁 Project Structure

\`\`\`
redoan-portfolio/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── admin/
│       ├── page.tsx          # Admin panel
│       └── layout.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       └── sections/
│           ├── AdminHero.tsx
│           ├── AdminAbout.tsx
│           ├── AdminSkills.tsx
│           ├── AdminProjects.tsx
│           ├── AdminServices.tsx
│           ├── AdminTestimonials.tsx
│           └── AdminSettings.tsx
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── db.ts                 # Default data
└── public/                   # Static assets
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

## 📚 Database Setup (Optional)

By default, the site uses local JSON data. To use Supabase:

1. Create a Supabase project
2. Run the SQL schema (see below)
3. Add credentials to `.env.local`
4. Uncomment API routes in the code

## 🔧 Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

## 📄 License

MIT License - Feel free to use for your own portfolio!

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ by REDOANUZZAMAN
