# 🐛 Debug: Why Changes Don't Persist

## Step-by-Step Debugging

### 1. Check if Data is Actually Saving to Supabase

**In Supabase Dashboard:**
1. Go to: https://supabase.com/dashboard/project/eesglowlwuwthbiatzxk
2. Click **"Table Editor"**
3. Click on **"hero"** table
4. **Note the current heading value**

**In Admin Panel:**
1. Go to: http://localhost:3000/me
2. Edit Hero heading to something unique (e.g., "TEST 12345")
3. Click Save
4. See success toast?

**Back in Supabase:**
1. Refresh the "hero" table view
2. **Did the heading change to "TEST 12345"?**
   - ✅ YES = Data IS saving (issue is with loading)
   - ❌ NO = Data NOT saving (issue is with admin panel)

---

### 2. Check Browser Console During Save

1. Open: http://localhost:3000/me
2. Press **F12** → **Console** tab
3. Edit something and click Save
4. Look for:
   - ✅ "Success" messages
   - ❌ Red errors
   - Any Supabase API calls?

---

### 3. Check Network Tab During Save

1. Open: http://localhost:3000/me
2. Press **F12** → **Network** tab
3. Edit Hero section
4. Click Save
5. **Look for a request to supabase.co**
   - Click on the request
   - Check **Status Code**:
     - 200 = Success
     - 400 = Bad request (wrong data)
     - 404 = Table not found
     - 401 = Auth issue
   - Check **Response** tab - what does it say?

---

### 4. Check if Frontend is Fetching Data

1. Open: http://localhost:3000
2. Press **F12** → **Console** tab
3. Refresh page
4. Look for:
   - "Using default data" = Database fetch failed
   - No errors = Should be fetching from DB
5. Check **Network** tab:
   - Look for requests to supabase.co
   - Status 200 = Fetching successfully
   - Check Response - is it your data or default data?

---

### 5. Check if IDs Match

**This is often the issue!**

**In Supabase Table Editor:**
1. Open "hero" table
2. **Copy the `id` value** (it's a UUID like: 40dde106-793d-46d8-a04d-3f9ae0bd1fb1)

**In Browser Console:**
1. Go to: http://localhost:3000/me
2. Press F12 → Console
3. Type this and press Enter:
```javascript
// Check what ID the admin is using
fetch('http://localhost:3000/api/hero')
  .then(r => r.json())
  .then(d => console.log('Frontend data:', d))
  .catch(e => console.log('Error:', e));
```

**Do the IDs match?**
- ❌ NO = Admin is trying to update wrong ID!
- ✅ YES = IDs match, issue is elsewhere

---

## 🔧 Common Issues & Fixes

### Issue 1: Admin Updates Wrong ID
**Symptom**: Data saves in Supabase but different row
**Fix**: Admin needs to fetch correct ID on load

### Issue 2: RLS Policies Block Updates
**Symptom**: Save appears successful but data doesn't change
**Fix**: Check/update RLS policies

### Issue 3: Data Caching
**Symptom**: Data updates but old data shows
**Fix**: Hard refresh (Ctrl+Shift+R)

### Issue 4: Multiple Rows in Table
**Symptom**: Admin updates one row, frontend loads different row
**Fix**: Ensure only 1 row in hero/about tables

---

## 🧪 Quick Test Script

Run this in Browser Console (F12) on http://localhost:3000:

```javascript
// Test Supabase connection
import { supabase } from '@/lib/supabase';

// Check what data we're loading
supabase.from('hero').select('*').single()
  .then(res => {
    console.log('Hero Data:', res.data);
    console.log('Hero ID:', res.data?.id);
    console.log('Hero Heading:', res.data?.heading);
  });

// Check about data
supabase.from('about').select('*').single()
  .then(res => {
    console.log('About Data:', res.data);
    console.log('About ID:', res.data?.id);
  });
```

---

## 📋 Checklist - Report Back:

Please check these and tell me the results:

```
□ Edited Hero in admin → Clicked Save → Saw success toast
□ Checked Supabase Table Editor → Hero table → Data changed? YES/NO
□ Refreshed main site → Changes appeared? YES/NO
□ Browser console shows any errors? YES/NO (what errors?)
□ Network tab shows supabase.co requests? YES/NO
□ Status code of save request? (200, 400, 404, etc.)
□ How many rows in hero table? (should be 1)
□ How many rows in about table? (should be 1)
```

**Most Important Questions:**
1. When you save in admin, does the data ACTUALLY change in Supabase Table Editor?
2. When you refresh main site, do you see ANY network requests to supabase.co in Network tab?

Tell me the answers to these and I can pinpoint the exact issue! 🎯
