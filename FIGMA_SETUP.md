# Figma Tokens Studio Setup Guide

This guide will walk you through setting up Tokens Studio in Figma and exporting your design tokens.

## Step 1: Install Tokens Studio Plugin

1. Open Figma (desktop app or web)
2. Open any Figma file (or create a new one)
3. Go to **Plugins** → **Browse plugins in Community**
4. Search for **"Tokens Studio for Figma"**
5. Click **Install** on the official plugin by Jan Six
6. The plugin is now installed and ready to use

## Step 2: Open Tokens Studio Plugin

1. In your Figma file, go to **Plugins** → **Tokens Studio for Figma**
2. The Tokens Studio interface will open in a sidebar

## Step 3: Create Your Design Tokens

### Option A: Start from Scratch

1. In the Tokens Studio sidebar, you'll see different token categories:
   - **Color** - Colors, gradients, shadows
   - **Spacing** - Padding, margins, gaps
   - **Typography** - Font families, sizes, weights
   - **Border Radius** - Corner radius values
   - **Sizing** - Width, height values
   - **Opacity** - Transparency values
   - And more...

2. Click on a category (e.g., **Color**)
3. Click the **+** button to add a new token
4. Give it a name (e.g., `primary`, `secondary`)
5. Set the value (e.g., `#0066FF` for a color)
6. Repeat for all your design tokens

### Option B: Use Pre-built Sets

1. Tokens Studio comes with pre-built token sets
2. You can import them or use them as templates
3. Customize them to match your design system

## Step 4: Organize Your Tokens

Tokens Studio uses a hierarchical structure. For example:

```
Color
  └── Primary
      ├── Base (#0066FF)
      ├── Light (#3399FF)
      └── Dark (#0052CC)
  └── Secondary
      └── Base (#6C757D)

Spacing
  ├── XS (4px)
  ├── SM (8px)
  ├── MD (16px)
  ├── LG (24px)
  └── XL (32px)
```

## Step 4.5: Apply Tokens to Figma Elements

Now that you have tokens created, here's how to apply them to your rectangle (or any Figma element):

### Method 1: Using Tokens Studio Plugin (Recommended)

1. **Select your rectangle** in Figma
2. **Open Tokens Studio plugin** (Plugins → Tokens Studio for Figma)
3. In the plugin sidebar, you'll see sections for different properties:
   - **Fill** - For background colors
   - **Stroke** - For border colors
   - **Border Radius** - For corner radius
   - **Spacing** - For padding/margins
   - **Typography** - For text properties
4. **Click on "Fill"** (or the property you want to change)
5. **Select your color token** from the dropdown (e.g., `color.primary.base`)
6. The rectangle will now use that token!

### Method 2: Using Figma's Native Color Picker

1. **Select your rectangle**
2. In the right sidebar, click on the **Fill** color swatch
3. Look for a **"Link"** or **"Token"** icon (usually near the color picker)
4. Click it to open the token selector
5. Choose your color token from the list

### Method 3: Direct Token Binding

1. **Select your rectangle**
2. In the right sidebar, find the **Fill** section
3. Click the **"..."** menu (three dots) next to the fill color
4. Select **"Link to token"** or **"Use token"**
5. Browse and select your token (e.g., `color.primary.base`)

### Applying Multiple Token Properties

You can apply tokens to multiple properties at once:

- **Fill**: Background color token
- **Stroke**: Border color token  
- **Corner Radius**: Border radius token
- **Effects**: Shadow tokens (if you have them)

**Example workflow:**
1. Select your rectangle
2. Open Tokens Studio plugin
3. Set **Fill** → `color.primary.base`
4. Set **Border Radius** → `borderRadius.md`
5. Set **Stroke** → `color.primary.dark` (optional)

### Benefits of Using Tokens

✅ **Consistency**: All elements using the same token will update together  
✅ **Easy Updates**: Change the token value once, all elements update automatically  
✅ **Design System**: Maintain a single source of truth for your design values

### Troubleshooting Token Application

**Token not showing in dropdown?**
- Make sure you've created the token in Tokens Studio first
- Refresh the plugin or restart Figma
- Check that the token type matches the property (e.g., color token for fill)

**Token applied but color not changing?**
- Verify the token has a valid color value
- Check if there are any overrides on the element
- Try removing and reapplying the token

**Can't find the token link option?**
- Some Figma versions have different UI
- Use Method 1 (Tokens Studio plugin) - it's the most reliable
- Make sure you're using the latest version of Tokens Studio

**Token changes don't update in Figma? (IMPORTANT)**

This is a common issue! When you change a token value in Tokens Studio, Figma elements don't automatically update. Here's how to fix it:

#### ⚠️ If Token Reference Works But Value Doesn't Update

If Figma recognizes when you switch from `primary` to `secondary` token, but doesn't update when you change the `primary` color value, try these solutions:

#### Solution 1: Sync to Figma Variables (RECOMMENDED - Most Reliable)

Tokens Studio works best when synced to Figma's native Variables feature:

1. **In Tokens Studio plugin**, look for a **"Sync"** tab or button
2. Click on **"Sync"** or **"Sync to Figma Variables"**
3. This will create Figma Variables from your tokens
4. **Re-apply the token** to your rectangle (it will now use the Figma Variable)
5. Now when you change the token value and sync again, the rectangle will update automatically

**Steps in detail:**
- Open Tokens Studio → Go to **"Sync"** tab
- Click **"Sync to Figma Variables"** or **"Push to Figma"**
- Wait for sync to complete
- Select your rectangle
- In the Fill color picker, you should now see **Variables** option
- Select your token from Variables (it will show as a variable, not just a color)
- Now when you change the token and sync again, it will update!

#### Solution 2: Use "Apply" Mode with Re-selection

1. **Change your token value** in Tokens Studio
2. Go to **"Apply"** tab/mode in Tokens Studio
3. **Select your rectangle** (important: select it while in Apply mode)
4. The plugin should show the current token applied
5. Click **"Apply"** or **"Update"** button
6. The rectangle should update

#### Solution 3: Remove and Re-apply Token

1. Select your rectangle
2. In Figma's right sidebar, click the **Fill** color
3. **Remove the token** (set it to a regular color or "None")
4. **Re-apply the token** from Tokens Studio plugin
5. The new token value should now be applied

#### Solution 4: Check Token Binding Type

The issue might be that the token is applied as a **static value** instead of a **live reference**:

1. Select your rectangle
2. In the right sidebar, click the **Fill** color swatch
3. Check if you see:
   - **"Variable"** or **"Token"** indicator → Good! It's a live reference
   - Just a color value → Bad! It's a static copy
4. If it's static, remove it and re-apply using Tokens Studio plugin

#### Solution 5: Use Figma Variables Directly

If sync isn't working, use Figma's native Variables:

1. In Tokens Studio, click **"Sync to Figma Variables"**
2. In Figma, go to **Local Variables** (right sidebar, Variables icon)
3. You should see your tokens as Variables
4. Select your rectangle
5. Click Fill → Select **"Variables"** tab
6. Choose your color variable
7. Now when you update the Variable in Figma, it updates automatically!

#### Solution 6: Check for Overrides

1. Select your rectangle
2. Look for a **purple dot** or **"Override"** indicator in the right sidebar
3. If you see it, the element has a local override
4. Click the override and choose **"Reset"** or **"Remove override"**
5. Re-apply the token

#### Why This Happens

There are two ways tokens can be applied:
1. **Static copy** - The color value is copied, not linked (doesn't update)
2. **Live reference** - The element references the token/variable (updates automatically)

Tokens Studio needs to sync to Figma Variables for live references to work properly.

#### Best Practice Workflow

1. Create tokens in Tokens Studio
2. **Sync to Figma Variables** (Sync tab → Sync to Figma Variables)
3. Apply tokens to elements (they'll use Figma Variables)
4. When you change a token value:
   - Update it in Tokens Studio
   - Click **"Sync to Figma Variables"** again
   - All elements using that variable will update automatically!

#### Troubleshooting Sync Issues

**"Sync" button not working?**
- Make sure you're in the **"Sync"** tab in Tokens Studio
- Try closing and reopening the plugin
- Check if you have the latest version of Tokens Studio

**Variables not appearing in Figma?**
- Make sure you've synced at least once
- Check Figma's Local Variables panel (right sidebar)
- Try syncing again

**Still not updating?**
- The token might be applied as a static value
- Remove the token completely and re-apply it after syncing to Variables
- Make sure you're selecting the token from the **Variables** section, not just the color picker

## Step 5: Export Tokens to JSON

### Option A: Export to GitHub (Recommended - Automatic Sync) ⭐

**Set up automatic sync to GitHub:**

📖 **See [GITHUB_SYNC_SETUP.md](../GITHUB_SYNC_SETUP.md) for full instructions**

Quick steps:
1. In Tokens Studio → **Sync** tab
2. Click **"Connect to GitHub"**
3. Enter your repository URL and GitHub token
4. Set file path to `tokens/tokens.json`
5. Enable **"Sync on Export"** or **"Auto-sync"**
6. Now when you export, tokens automatically push to GitHub!

### Option B: Manual Export

1. In the Tokens Studio sidebar, look for the **Export** or **Sync** section
2. Click on **Export** or **Download** (depending on plugin version)
3. Select **JSON** format
4. Choose what to export:
   - **All tokens** - Exports everything
   - **Selected tokens** - Exports only selected tokens
   - **Specific sets** - Exports specific token sets
5. Click **Download** or **Export**
6. Save the file (it will be a `.json` file)

## Step 6: Add Tokens to Your Project

1. Copy the downloaded JSON file
2. Place it in the `tokens/` directory of this project
3. Name it `tokens.json` (or any name ending in `.json`)
4. Commit and push to GitHub

Example file structure:
```
tokens/
  └── tokens.json  ← Your exported tokens from Figma
```

## Step 7: Verify Token Format

Your exported JSON should look something like this:

```json
{
  "$schema": "https://schemas.tokens.studio/tokens",
  "color": {
    "primary": {
      "base": {
        "value": "#0066FF",
        "type": "color"
      },
      "light": {
        "value": "#3399FF",
        "type": "color"
      }
    }
  },
  "spacing": {
    "md": {
      "value": "16px",
      "type": "spacing"
    }
  }
}
```

## Step 8: Test the Transformation

After adding your tokens:

```bash
npm run transform
```

This will generate transformed JSON files in the `output/` directory.

## Tips & Best Practices

### Token Naming
- Use clear, descriptive names
- Follow a consistent naming convention (e.g., camelCase or kebab-case)
- Group related tokens together

### Token Types
Make sure each token has the correct `type`:
- `color` - For colors
- `spacing` - For spacing values
- `fontSize` - For font sizes
- `fontFamily` - For font families
- `borderRadius` - For border radius
- `sizing` - For width/height values

### Token References
You can reference other tokens in Tokens Studio:
```json
{
  "color": {
    "primary": {
      "value": "#0066FF",
      "type": "color"
    },
    "button": {
      "value": "{color.primary}",
      "type": "color"
    }
  }
}
```

### Multiple Token Files
You can have multiple JSON files in the `tokens/` directory:
```
tokens/
  ├── colors.json
  ├── spacing.json
  └── typography.json
```

The transformer will process all `.json` files in the directory.

## Troubleshooting

### Plugin Not Found
- Make sure you're using the official "Tokens Studio for Figma" plugin
- Try refreshing Figma or restarting the app

### Export Button Not Visible
- Some versions of Tokens Studio use "Sync" instead of "Export"
- Look for a download or sync icon in the plugin interface

### JSON Format Issues
- Make sure the exported file is valid JSON
- You can validate it using a JSON validator online
- Check that all tokens have `value` and `type` properties

### Tokens Not Transforming
- Verify the JSON structure matches the Tokens Studio format
- Check that token types are correctly specified
- Run `npm test` to see detailed error messages

## Next Steps

Once your tokens are set up:
1. ✅ Export tokens from Figma
2. ✅ Add them to the `tokens/` directory
3. ✅ Run `npm run transform`
4. ✅ Check the `output/` directory for transformed files
5. ✅ Commit and push to trigger GitHub Actions

## Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Figma Community Plugin](https://www.figma.com/community/plugin/843461159747178946)
- [Design Tokens W3C Spec](https://tr.designtokens.org/format/)

