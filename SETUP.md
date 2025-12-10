# Setup Guide

## Quick Start

1. **Install Dependencies**:
   \`\`\`bash
   cd redoan-portfolio
   npm install
   \`\`\`

2. **Start Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Access the Site**:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Login: admin / admin123

## What's Included

✅ Fully animated frontend portfolio
✅ Complete admin panel for content management
✅ Responsive design (mobile, tablet, desktop)
✅ Dark theme with gradient accents
✅ Glassmorphism UI components
✅ Framer Motion animations
✅ React Hot Toast notifications
✅ TypeScript for type safety

## Admin Panel Features

The admin panel allows you to edit:

1. **Hero Section**: Main heading, subheading, and bio
2. **About Section**: Title, description, and image
3. **Skills**: Add/edit/delete skills with progress bars
4. **Projects**: Full CRUD for portfolio projects
5. **Services**: Edit 3 pricing packages (Starter, Professional, Premium)
6. **Testimonials**: Manage client testimonials
7. **Settings**: Site title, description, social links, theme colors

## Data Storage

Currently using local JSON data (lib/db.ts). 

To integrate with a real database:
- Use Supabase (recommended)
- Add PostgreSQL
- Connect to Firebase
- Build custom API

## Customization Tips

### Change Colors
1. Use Admin Panel > Settings
2. Or edit `tailwind.config.ts`

### Add New Sections
1. Create component in `components/`
2. Add to `app/page.tsx`
3. Create admin section in `components/admin/sections/`
4. Add to `AdminDashboard.tsx`

### Change Fonts
Edit `app/layout.tsx`:
\`\`\`typescript
import { YourFont } from "next/font/google";
\`\`\`

## Production Deployment

Before deploying:

1. ✅ Change admin credentials
2. ✅ Update environment variables
3. ✅ Test all features
4. ✅ Optimize images
5. ✅ Update SEO settings in admin panel

## Need Help?

Check the README.md for full documentation.
