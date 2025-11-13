# Quick Start Guide

## Is the code ready? ✅ YES!

The code is **100% ready** to accept and process design tokens. Here's what you need to do:

## Step 1: Install Dependencies (One-time)

```bash
npm install
```

## Step 2: Add Your Tokens

### Option A: Manual (Quick Test)
1. Export tokens from Figma Tokens Studio
2. Save the JSON file to `tokens/tokens.json`
3. Run: `npm run transform`
4. Check `output/` directory for transformed files

### Option B: Automatic (Recommended)
1. Set up GitHub sync (see `GITHUB_SYNC_SETUP.md`)
2. Export tokens from Figma → Automatically syncs to GitHub
3. GitHub Actions transforms automatically

## Step 3: Verify It Works

```bash
# Test the transformer
npm test

# Or transform manually
npm run transform
```

## What Happens Automatically

Once tokens are in `tokens/` directory:

1. ✅ GitHub Actions detects the change (if pushed to GitHub)
2. ✅ Installs dependencies
3. ✅ Transforms tokens using Style Dictionary
4. ✅ Generates:
   - `output/tokens.json` (flat structure)
   - `output/tokens-nested.json` (nested structure)
   - `output/css/tokens.css` (CSS variables)

## That's It! 🎉

The code is ready. Just add your tokens and it will work!
