# ⚠️ IMPORTANT: Run This SQL First!

## 🔴 You're seeing errors because theme columns don't exist yet

---

## ✅ Quick Fix (2 minutes)

### Step 1: Open Supabase SQL Editor
**Click this link**: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk

Then:
1. Click **"SQL Editor"** (left sidebar)
2. Click **"New Query"** (top right button)

### Step 2: Copy This SQL

Open the file `add-theme-column.sql` and copy everything, OR copy this:

```sql
-- Add theme settings to site_settings table

ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS theme_preset TEXT DEFAULT 'gold-orange',
ADD COLUMN IF NOT EXISTS custom_primary TEXT DEFAULT '#f59e0b',
ADD COLUMN IF NOT EXISTS custom_accent TEXT DEFAULT '#f97316';

UPDATE public.site_settings 
SET theme_preset = 'gold-orange',
    custom_primary = '#f59e0b',
    custom_accent = '#f97316'
WHERE theme_preset IS NULL;

SELECT id, theme_preset, custom_primary, custom_accent 
FROM public.site_settings;
```

### Step 3: Paste & Run
1. Paste the SQL into the editor
2. Click **"Run"** (or press Ctrl+Enter)
3. Wait for **"Success ✔"** message

### Step 4: Refresh Your Admin Panel
1. Go back to: http://localhost:3000/me
2. Go to Settings tab
3. ✅ Theme selector now works!

---

## 🎯 What This Does

Adds 3 new columns to your `site_settings` table:
- `theme_preset` - Stores selected theme ID
- `custom_primary` - Primary color hex code
- `custom_accent` - Accent color hex code

---

## 🚨 Current Error

```
Could not find the 'custom_accent' column of 'site_settings' in the schema cache
```

**Translation**: The theme columns don't exist yet. Run the SQL above to create them!

---

## ✅ After Running SQL

You'll be able to:
- ✅ Select from 10 theme presets
- ✅ Use custom colors
- ✅ Save theme to database
- ✅ Apply instantly across entire portfolio

---

**Go run the SQL now!** It takes 30 seconds! 🚀
