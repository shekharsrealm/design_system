# GitHub Sync Setup Guide

This guide will help you set up automatic synchronization from Figma Tokens Studio to GitHub, so that when you export tokens from Figma, they automatically update in your GitHub repository.

## Overview

There are two main approaches:
1. **Tokens Studio GitHub Sync** (Recommended) - Direct sync from Tokens Studio plugin to GitHub
2. **Figma API Integration** - Automated fetching using Figma API

## Method 1: Tokens Studio GitHub Sync (Recommended)

Tokens Studio has a built-in feature to sync directly to GitHub repositories.

### Prerequisites

1. A GitHub repository (this one)
2. A GitHub Personal Access Token (PAT) with repo permissions
3. Tokens Studio plugin installed in Figma

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name (e.g., "Figma Tokens Sync")
4. Select scopes:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (if you want to trigger workflows)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Set Up GitHub Sync in Tokens Studio

1. **Open Tokens Studio plugin** in Figma
2. Go to the **"Sync"** tab
3. Look for **"GitHub"** or **"Repository"** section
4. Click **"Connect to GitHub"** or **"Add Repository"**
5. Enter your repository details:
   - **Repository URL**: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
   - Or format: `YOUR_USERNAME/YOUR_REPO_NAME`
   - **Branch**: `main` (or your default branch)
   - **Path**: `tokens/tokens.json` (where tokens will be saved)
   - **Token**: Paste your GitHub Personal Access Token
6. Click **"Save"** or **"Connect"**

### Step 3: Configure Sync Settings

In Tokens Studio sync settings:

1. **File Path**: Set to `tokens/tokens.json` (or your preferred path)
2. **Commit Message**: Customize if needed (e.g., "chore: update design tokens from Figma")
3. **Auto-sync**: Enable if you want automatic syncing
4. **Sync on Export**: Enable to sync whenever you export

### Step 4: Test the Sync

1. Make a change to a token in Tokens Studio
2. Click **"Sync"** or **"Push to GitHub"** in the Sync tab
3. Check your GitHub repository - the `tokens/tokens.json` file should be updated
4. The GitHub Actions workflow will automatically trigger and transform the tokens

### Step 5: Enable Auto-Sync (Optional)

For automatic syncing:

1. In Tokens Studio Sync settings, enable **"Auto-sync"**
2. Or enable **"Sync on Export"** - tokens will sync whenever you export
3. Changes will automatically push to GitHub

## Method 2: Figma API Integration (Alternative)

If Tokens Studio GitHub sync doesn't work for you, you can use the Figma API.

### Step 1: Get Figma Access Token

1. Go to Figma → Settings → Account
2. Scroll to **"Personal access tokens"**
3. Click **"Create a new personal access token"**
4. Give it a name and create
5. Copy the token

### Step 2: Set Up GitHub Secrets

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `FIGMA_ACCESS_TOKEN`: Your Figma personal access token
   - `FIGMA_FILE_KEY`: Your Figma file key (found in the file URL)

### Step 3: Use the Fetch Script

We'll create a script that fetches tokens from Figma API. See `scripts/fetch-from-figma.js` for implementation.

## Workflow After Sync

Once tokens are synced to GitHub:

1. ✅ Tokens are pushed to `tokens/tokens.json`
2. ✅ GitHub Actions workflow triggers automatically (on push to `tokens/**`)
3. ✅ Tokens are transformed using Style Dictionary
4. ✅ Transformed files are generated in `output/` directory

## Troubleshooting

### GitHub Sync Not Working

**"Authentication failed"**
- Verify your GitHub Personal Access Token is correct
- Make sure the token has `repo` permissions
- Check if the token has expired

**"Repository not found"**
- Verify the repository URL/name is correct
- Make sure the token has access to the repository
- Check if the repository is private (token needs access)

**"Permission denied"**
- Ensure the token has write permissions
- Check if the branch name is correct
- Verify the file path is correct

**"Sync button not visible"**
- Make sure you're in the "Sync" tab
- Check if you have the latest version of Tokens Studio
- Try restarting the plugin

### Tokens Not Updating in GitHub

1. Check if the sync actually completed (look for success message)
2. Verify the file path in sync settings matches your repository structure
3. Check GitHub repository for the latest commit
4. Look at GitHub Actions logs to see if workflow triggered

### Workflow Not Triggering

1. Verify the workflow file is in `.github/workflows/`
2. Check if the path filter is correct (`tokens/**`)
3. Make sure you're pushing to the correct branch (`main`)
4. Check GitHub Actions tab for any errors

## Best Practices

1. **Use a dedicated GitHub account or token** for automation
2. **Set meaningful commit messages** in sync settings
3. **Enable branch protection** on main branch (require PR reviews)
4. **Monitor sync activity** regularly
5. **Keep tokens organized** - use consistent file naming

## Security Considerations

- ⚠️ **Never commit GitHub tokens** to the repository
- ⚠️ **Use fine-grained tokens** with minimal permissions
- ⚠️ **Rotate tokens regularly**
- ⚠️ **Use environment-specific tokens** for different environments

## Next Steps

After setting up sync:

1. ✅ Test the sync by making a token change
2. ✅ Verify the workflow runs successfully
3. ✅ Check the transformed output files
4. ✅ Set up notifications for sync failures (optional)

## Resources

- [Tokens Studio GitHub Sync Documentation](https://docs.tokens.studio/sync/github)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Figma API Documentation](https://www.figma.com/developers/api)

