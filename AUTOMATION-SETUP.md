# 🚀 Word of the Day - Full Automation Setup

## What This Does
- Automatically generates a new Word of the Day post every day
- Auto-posts to Instagram (hands-off!)
- Uses Make.com (free) to schedule and post

---

## 📋 Quick Setup (30 minutes)

### Step 1: Test the Generator
```bash
cd "/Users/brody/Desktop/Word of the day"
node generate-daily-post.js
```

This creates `daily-post.html` with today's word!

---

### Step 2: Set Up Make.com (Free Account)

1. **Create Account**: Go to [make.com](https://www.make.com) and sign up (FREE)

2. **Create New Scenario**:
   - Click "Create a new scenario"
   - Add these modules:

#### Module 1: Schedule
- Search for "Schedule"
- Choose "Schedule" module
- Set to run **every day at 9am** (or whenever you want)

#### Module 2: HTTP Request
- Search for "HTTP"
- Choose "Make a request"
- URL: Your server endpoint (see Step 3 below)
- Method: GET

#### Module 3: Instagram
- Search for "Instagram"
- Choose "Create a Photo Post"
- Connect your Instagram Business account
- Image URL: From previous step
- Caption: "Word of the Day ✨ #vocabulary #wordoftheday #learning"

---

### Step 3: Hosting Options

You need to host the script online so Make.com can run it daily:

#### Option A: Use Render.com (FREE & EASIEST)
1. Go to [render.com](https://render.com)
2. Sign up for free
3. Click "New +" → "Web Service"
4. Connect your GitHub (or upload files)
5. Deploy!
6. You'll get a URL like `https://your-app.onrender.com`

#### Option B: Use Vercel (FREE)
1. Go to [vercel.com](https://vercel.com)
2. Deploy the folder
3. Get your URL

---

### Step 4: Convert Instagram to Business Account

1. Open Instagram app
2. Go to Settings → Account
3. Switch to Professional Account
4. Choose "Business"
5. Connect to Facebook Page (create one if needed)

---

### Step 5: Connect Everything in Make.com

1. Schedule triggers daily at 9am
2. Calls your hosted script URL
3. Gets the generated image
4. Posts to Instagram automatically

**Test it**: Click "Run once" in Make.com to test!

---

## 🎯 Alternative: Generate 30 Posts at Once

If you don't want to use Make.com, I can create a script that generates 30 posts at once. Then you upload them all to Instagram's scheduler (one-time setup).

---

## 📝 Adding More Words

Edit `generate-daily-post.js` and add more words to the `words` array:

```javascript
{
    word: "Your Word",
    pronunciation: "yor · werd",
    partOfSpeech: "noun",
    definition: "Definition here.",
    example: "Example sentence here."
}
```

---

## ❓ Need Help?

**Common Issues:**
- **Instagram won't connect**: Make sure it's a Business account
- **Script not running**: Check Node.js is installed
- **Image not posting**: Check image URL is accessible

---

## 🎉 Once Set Up

**You're done!** Every day at 9am:
1. Script generates new word
2. Creates beautiful post
3. Auto-posts to Instagram
4. You do NOTHING! 🙌

Sit back and watch the engagement grow! 📈✨
