# 🔍 Test Database Connection

## Why Changes Don't Persist

Your changes aren't saving because the **Supabase database tables don't exist yet**.

### What's Happening:
1. ❌ You edit content in `/me`
2. ❌ Code tries to save to Supabase
3. ❌ Tables don't exist → Save fails silently
4. ❌ Page refresh → Loads default data from `lib/db.ts`

---

## ✅ Solution: Create Database Tables

### Step 1: Check if Tables Exist

1. Go to: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk
2. Click "Table Editor" in left sidebar
3. **Do you see these tables?**
   - hero
   - about
   - skills
   - projects
   - services
   - testimonials
   - site_settings

**If NO tables exist** → Follow Step 2
**If tables exist but missing columns** → Follow Step 3

---

### Step 2: Create All Tables (First Time Setup)

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk
   - Click "SQL Editor" (left sidebar)
   - Click "New Query" button

2. **Copy & Paste Full Schema**:
   ```
   Open file: redoan-portfolio/supabase-schema.sql
   Select ALL content (Ctrl+A)
   Copy (Ctrl+C)
   ```

3. **Run in Supabase**:
   - Paste into SQL Editor (Ctrl+V)
   - Click "Run" button (or Ctrl+Enter)
   - Wait for "Success" message (takes ~5-10 seconds)

4. **Verify Tables Created**:
   - Go to "Table Editor" in Supabase
   - You should see 7 tables
   - Each table should have sample data

---

### Step 3: Add Missing Column (If Tables Already Exist)

If you already have tables but `image_frame` column is missing:

1. **Open Supabase SQL Editor**
2. **Run Quick Fix**:
   ```
   Open file: redoan-portfolio/add-image-frame-column.sql
   Copy content
   Paste into SQL Editor
   Click "Run"
   ```

---

## 🧪 Test if Database is Working

### Test 1: Check Browser Console

1. Open your site: http://localhost:3000/me
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Look for messages:
   - ❌ "Using default data" = Tables don't exist
   - ✅ No errors = Database connected!

### Test 2: Check Network Tab

1. Edit something in `/me` admin panel
2. Click "Save"
3. Open DevTools → Network tab
4. Look for requests to `supabase.co`
5. **Check status**:
   - ❌ 404 = Table doesn't exist
   - ❌ 400 = Column missing
   - ✅ 200 or 201 = Success!

### Test 3: Check Supabase Table Editor

1. Edit Hero section in admin
2. Click Save
3. Go to Supabase → Table Editor
4. Click "hero" table
5. **Do you see your changes?**
   - ✅ Yes = Database working!
   - ❌ No = Tables not created yet

---

## 📊 Quick Diagnosis

Run this checklist:

```
□ Supabase credentials in .env.local are correct
  - NEXT_PUBLIC_SUPABASE_URL=https://eesglowlwuwthbiatzxk.supabase.co
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=(your key)

□ Opened Supabase dashboard and logged in
  https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk

□ Checked "Table Editor" - Do tables exist?
  □ hero
  □ about
  □ skills
  □ projects
  □ services
  □ testimonials
  □ site_settings

□ If NO tables → Run supabase-schema.sql

□ If YES tables → Check if data appears when you query them

□ Restarted dev server after running SQL
  npm run dev
```

---

## 🎯 Expected Behavior After Setup

### BEFORE Running SQL (Current):
```
1. Edit content in /me admin → Click Save
2. See "Success" toast message
3. Refresh page
4. ❌ Changes LOST (back to default)
5. Console shows: "Using default data"
```

### AFTER Running SQL (Goal):
```
1. Edit content in /me admin → Click Save
2. See "Success" toast message
3. Refresh page
4. ✅ Changes PERSIST!
5. Console shows: No errors
6. Supabase Table Editor shows your data
```

---

## 🐛 Common Issues

### Issue 1: "relation 'public.hero' does not exist"
**Solution**: Run `supabase-schema.sql`

### Issue 2: "Could not find the 'image_frame' column"
**Solution**: Run `add-image-frame-column.sql`

### Issue 3: Changes save but don't appear on refresh
**Solution**: 
- Clear browser cache (Ctrl+Shift+R)
- Check if data is in Supabase Table Editor
- Restart dev server

### Issue 4: "Failed to save changes" error
**Check**:
1. Internet connection
2. Supabase credentials correct
3. Tables exist in database

---

## 📞 Quick Support Script

Copy this and run in browser console (F12):

```javascript
// Check if Supabase is configured
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

// Test connection
fetch('https://eesglowlwuwthbiatzxk.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'YOUR_ANON_KEY_HERE'
  }
})
.then(res => console.log('Supabase Status:', res.status))
.catch(err => console.error('Supabase Error:', err));
```

---

## ✅ Next Steps

1. **Run SQL schema** (5 minutes)
2. **Test saving** in admin panel
3. **Verify** changes persist
4. **Start customizing** your portfolio!

**Ready to run the SQL?** I can walk you through it step-by-step! 🚀
