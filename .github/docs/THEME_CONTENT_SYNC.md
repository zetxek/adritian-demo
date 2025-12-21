# Theme Content Synchronization

## Overview

This demo repository automatically syncs content, translations, and configurations from the [adritian-free-hugo-theme](https://github.com/zetxek/adritian-free-hugo-theme) repository to ensure that preview PRs accurately demonstrate new features.

## How It Works

### Workflow Integration

When a PR is created in the theme repository (e.g., PR #385 adding RTL support), the theme's `update-demo-pr.yml` workflow:

1. **First Commit**: Updates the Hugo module version in `go.mod` and `go.sum`
2. **Triggers Content Sync**: Dispatches a `repository_dispatch` event to this demo repository
3. **Second Commit**: This repository's `sync-theme-content.yml` workflow copies:
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

You can manually trigger content sync for an existing PR:

```bash
gh workflow run sync-theme-content.yml \
  -f pr_number=341 \
  -f theme_branch=copilot/add-rtl-support-to-theme
```

Or via the GitHub Actions UI:
1. Go to Actions → Sync Theme Content
2. Click "Run workflow"
3. Enter the PR number and theme branch
4. Click "Run workflow"

## Integration with Theme Repository

The theme repository should trigger this workflow by dispatching an event after creating/updating the preview PR:

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
        "theme_branch": "${{ github.head_ref }}",
        "pr_number": "${{ steps.pr.outputs.pr_number }}"
      }
```

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
