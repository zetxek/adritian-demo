# Theme Content Synchronization

## Overview

This demo repository automatically syncs content, translations, and configurations from the [adritian-free-hugo-theme](https://github.com/zetxek/adritian-free-hugo-theme) repository to ensure that preview PRs accurately demonstrate new features.

## How It Works

There are two complementary workflows for syncing content:

### 1. Automatic Sync (auto-sync-content.yml)

When a PR is created or updated in this repository with theme module changes:

1. **Detects Module Update**: Workflow triggers when `go.mod` is updated in a preview PR
2. **Extracts Theme Version**: Parses the theme commit SHA from the pseudo-version
3. **Checks for New Content**: Compares theme's i18n and content files with demo repo
4. **Syncs if Needed**: Automatically copies new files in a second commit
5. **Adds Comment**: Notifies PR reviewers about the synced content

This works **without requiring any changes to the theme repository**.

### 2. Manual/Dispatch Sync (sync-theme-content.yml)

For more control, the theme repository can explicitly trigger content sync:

1. **First Commit**: Theme's workflow updates Hugo module version in `go.mod` and `go.sum`
2. **Triggers Content Sync**: Dispatches a `repository_dispatch` event to this demo repository
3. **Second Commit**: This repository's workflow copies:
   - i18n translation files (e.g., `ar.yaml`, `he.yaml`)
   - Example content from `exampleSite/content/` (language-specific files)
   - Configuration examples for documentation

### What Gets Synced

#### i18n Files
All language files from `theme/i18n/*.yaml` are copied to the demo's `i18n/` directory. This includes:
- New language translations
- Updates to existing translations

#### Content Files
Language-specific content files from `theme/exampleSite/content/` are synced:
- Home page variations (e.g., `home.ar.md`, `home.he.md`)
- Translated blog posts, projects, etc.
- Base files (like `home.md`) are NOT overwritten to preserve demo customizations

#### Configuration Examples
If the theme includes new language configurations in `exampleSite/hugo.toml`, these are extracted and saved to `.github/docs/language-config-example.toml` for reference.

## Manual Sync

### Using GitHub Actions UI

1. Go to Actions → Sync Theme Content  
2. Click "Run workflow"
3. Enter the branch name and theme branch
4. Click "Run workflow"

### Using GitHub CLI

```bash
gh workflow run sync-theme-content.yml \
  -f branch=theme-update/pr-341 \
  -f theme_branch=copilot/add-rtl-support-to-theme
```

### Automatic Sync

The `auto-sync-content.yml` workflow runs automatically on preview PRs when `go.mod` is updated. No manual action is required.

## Integration with Theme Repository (Optional)

The automatic sync workflow (`auto-sync-content.yml`) works without any changes to the theme repository. However, for more explicit control, the theme repository can optionally trigger the manual sync workflow:

```yaml
- name: Trigger content sync in demo repo
  uses: peter-evans/repository-dispatch@v2
  with:
    token: ${{ secrets.CI_TOKEN }}
    repository: zetxek/adritian-demo
    event-type: sync-theme-content
    client-payload: |
      {
        "branch": "theme-update/pr-${{ steps.pr.outputs.pr_number }}",
        "theme_ref": "${{ github.sha }}",
        "theme_branch": "${{ github.head_ref }}"
      }
```

The `branch` field specifies which branch in the adritian-demo repository to sync content to.

## Benefits

1. **Complete Feature Demonstration**: Preview PRs show both code changes AND content changes
2. **Language Support**: New language translations are automatically available in the demo
3. **Separate Commits**: Theme module updates and content sync are in separate commits for clarity
4. **Non-Destructive**: Only syncs new files and language variants, preserving demo customizations

## Example

For PR #385 in the theme repository (adding RTL support):
- **Commit 1**: Updates `go.mod` to reference the new theme version
- **Commit 2**: Adds `i18n/ar.yaml`, `i18n/he.yaml`, and `content/home/home.ar.md`, `content/home/home.he.md`

This allows reviewers to test the RTL feature with actual Arabic and Hebrew content on the Vercel preview deployment.
