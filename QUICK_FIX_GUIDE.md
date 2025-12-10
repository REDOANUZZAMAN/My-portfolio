# 🔧 Quick Fix Guide - Database Setup

## 🚨 Current Issue
You're seeing this error:
```
Could not find the 'image_frame' column of 'about' in the schema cache
```

This means your Supabase database needs to be set up!

---

## ✅ Solution: Run SQL Schema

You have **2 options**:

### Option 1: Run Full Schema (Recommended - First Time Setup)
If you haven't set up the database yet:

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

2. **Run Full Schema**:
   - Open file: `supabase-schema.sql`
   - Copy ALL content
   - Paste into SQL Editor
   - Click "Run" (or Ctrl+Enter)
   - Wait for success ✅

### Option 2: Just Add Missing Column (If Tables Already Exist)
If you already have tables but missing the `image_frame` column:

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk
   - Click "SQL Editor"
   - Click "New Query"

2. **Run Quick Fix**:
   - Open file: `add-image-frame-column.sql`
   - Copy content
   - Paste into SQL Editor
   - Click "Run"
   - Done! ✅

---

## 🔄 Temporary Workaround (Already Applied)

I've updated the code to work WITHOUT the `image_frame` column:
- ✅ You can still edit About section
- ✅ Changes will save (except frame style)
- ⚠️ Frame selection won't persist until you run SQL
- ✅ You'll see: "About section updated! (Run SQL to enable frame saving)"

---

## 📋 What Happens After Running SQL

### Before (Current State):
- ❌ `image_frame` column missing
- ⚠️ Frame selection doesn't save
- ✅ Other fields work fine

### After (Once SQL is Run):
- ✅ `image_frame` column added
- ✅ Frame selection saves to database
- ✅ Frame persists across sessions
- ✅ Full functionality enabled

---

## 🧪 How to Test

### Test 1: Before Running SQL
1. Go to http://localhost:3000/me
2. Edit About section
3. Select a frame style
4. Click Save
5. ✅ See message: "About section updated! (Run SQL to enable frame saving)"
6. ⚠️ Frame won't persist on refresh

### Test 2: After Running SQL
1. Run the SQL schema (Option 1 or 2 above)
2. Go to http://localhost:3000/me
3. Edit About section
4. Select a frame style (e.g., "Circle")
5. Click Save
6. ✅ See message: "About section updated successfully with circle frame!"
7. Refresh page
8. ✅ Frame selection persists!

---

## 🗄️ Database Tables You'll Create

When you run `supabase-schema.sql`, these tables will be created:

1. ✅ **hero** - Main banner section
2. ✅ **about** - About section (with `image_frame` column)
3. ✅ **skills** - Your skills list
4. ✅ **projects** - Portfolio projects
5. ✅ **services** - Pricing tiers
6. ✅ **testimonials** - Client reviews
7. ✅ **site_settings** - Site configuration

**Sample data included** - Your portfolio will have default content!

---

## 🎯 Quick Commands

```bash
# Restart server (if needed)
npm run dev

# Clear cache and rebuild
rm -rf .next
npm run build

# Check for errors
npm run lint
```

---

## ✅ Current Server Status

Your server is running at: http://localhost:3000

**What's Working Now:**
- ✅ Admin panel accessible at `/me`
- ✅ Login works (admin/admin123)
- ✅ Hero section - full database integration
- ✅ About section - saves without frame (temp workaround)
- ✅ Skills section - full CRUD operations
- ✅ Main site - fetches data from database

**What Needs SQL Schema:**
- ⏳ `image_frame` column for About section
- ⏳ Proper data structure for all sections
- ⏳ Sample/default content loaded

---

## 🐛 Common Errors & Fixes

### Error: "Could not find the 'image_frame' column"
**Fix**: Run `add-image-frame-column.sql` in Supabase

### Error: "relation 'public.hero' does not exist"
**Fix**: Run full `supabase-schema.sql` in Supabase

### Error: "Failed to save changes"
**Check**: 
1. Supabase credentials in `.env.local`
2. Tables exist in database
3. Internet connection active

---

## 📞 Need Help?

1. **Check Supabase Dashboard**: See if tables exist
2. **Check Browser Console**: Look for detailed error messages
3. **Check Network Tab**: See if API calls are being made
4. **Verify .env.local**: Make sure credentials are correct

---

**Next Step**: Run the SQL schema and unlock full functionality! 🚀
