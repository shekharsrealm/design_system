# Design Tokens Sync POC

A Proof of Concept for syncing design tokens from Figma (via Tokens Studio plugin) to GitHub and automatically transforming them to JSON.

## Architecture Overview

```
Figma + Tokens Studio Plugin
    ↓
GitHub Repository (tokens/*.json)
    ↓
GitHub Actions Workflow
    ↓
Transformer (Style Dictionary)
    ↓
Transformed JSON (output/)
```

## Features

- 🔄 Automatic token synchronization via GitHub Actions
- 🔀 Token transformation using Style Dictionary
- 📦 Multiple output formats (JSON, CSS variables)
- 🎨 Support for Tokens Studio format

## Setup

### 1. Prerequisites

- Node.js 20+
- GitHub repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Figma Tokens Studio Setup

📖 **For detailed step-by-step instructions, see [FIGMA_SETUP.md](./FIGMA_SETUP.md)**

Quick steps:
1. Install the [Tokens Studio for Figma](https://www.figma.com/community/plugin/843461159747178946) plugin
2. Open the plugin in Figma and create your design tokens
3. Export tokens to JSON format from the plugin
4. Place the exported JSON file(s) in the `tokens/` directory
5. Commit and push to GitHub

## Usage

### Manual Token Transformation

```bash
npm run transform
```

This will:
- Read tokens from `tokens/*.json`
- Transform them using Style Dictionary
- Output to `output/` directory

### Test Transformer

```bash
npm test
```

## Directory Structure

```
design_tokens/
├── .github/
│   └── workflows/
│       └── sync-tokens.yml    # GitHub Actions workflow
├── tokens/                     # Source tokens from Figma/Tokens Studio
│   └── tokens.json
├── transformers/
│   └── index.js               # Token transformation logic
├── scripts/
│   └── test-transformer.js    # Test script
├── output/                     # Generated files (gitignored)
│   ├── tokens.json            # Flat token structure
│   ├── tokens-nested.json     # Nested token structure
│   └── css/
│       └── tokens.css         # CSS variables
├── package.json
└── README.md
```

## Workflow Automation

The GitHub Actions workflow (`sync-tokens.yml`) automatically:

1. **Triggers on:**
   - Push to `main` branch when `tokens/**` files change
   - Manual workflow dispatch
   - Daily schedule (2 AM UTC)

2. **Executes:**
   - Installs dependencies
   - Transforms tokens
   - Commits transformed files (if triggered manually or by schedule)

## Token Format

Tokens should follow the [Tokens Studio format](https://docs.tokens.studio/):

```json
{
  "$schema": "https://schemas.tokens.studio/tokens",
  "color": {
    "primary": {
      "base": { "value": "#0066FF", "type": "color" }
    }
  },
  "spacing": {
    "md": { "value": "16px", "type": "spacing" }
  }
}
```

## Output Formats

The transformer generates:

1. **`tokens.json`**: Flat structure for easy consumption
   ```json
   {
     "color.primary.base": {
       "value": "#0066FF",
       "type": "color"
     }
   }
   ```

2. **`tokens-nested.json`**: Nested structure preserving hierarchy

3. **`css/tokens.css`**: CSS custom properties
   ```css
   :root {
     --color-primary-base: #0066FF;
     --spacing-md: 16px;
   }
   ```

## Integration with Figma Tokens Studio

### Option 1: Automated GitHub Sync (Recommended) ⭐

**Set up automatic sync from Figma to GitHub:**

📖 **See [GITHUB_SYNC_SETUP.md](./GITHUB_SYNC_SETUP.md) for detailed instructions**

Quick setup:
1. Create a GitHub Personal Access Token (with `repo` permissions)
2. In Tokens Studio plugin → **Sync** tab → Connect to GitHub
3. Enter repository details and token
4. Enable auto-sync or sync on export
5. When you export tokens from Figma, they automatically push to GitHub!

**Benefits:**
- ✅ Automatic sync - no manual steps
- ✅ Direct integration with Tokens Studio
- ✅ Triggers GitHub Actions workflow automatically
- ✅ Version controlled in GitHub

### Option 2: Manual Export
1. Open your Figma file
2. Run Tokens Studio plugin
3. Export tokens as JSON
4. Save to `tokens/` directory
5. Commit and push to GitHub

### Option 3: Figma API Integration (Advanced)

For custom automation, see `scripts/fetch-from-figma.js` (requires additional setup).

## Troubleshooting

### Transformer Errors
- Verify token JSON files are valid
- Check that tokens follow Tokens Studio format
- Ensure `tokens/` directory exists

### GitHub Actions Fails
- Check workflow logs for specific errors
- Ensure Node.js version is compatible

## Next Steps

Potential enhancements:
- [ ] Figma API integration for automatic token fetching
- [ ] Support for more output formats (SCSS, LESS, etc.)
- [ ] Token validation and linting
- [ ] Versioning and changelog generation
- [ ] Multi-environment support (dev, staging, prod)

## License

MIT

