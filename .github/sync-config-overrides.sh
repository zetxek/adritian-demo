#!/bin/bash
set -euo pipefail
# Demo-specific overrides for hugo.toml after syncing from theme's exampleSite.
#
# This script is run by the sync-theme-content workflow after copying
# the theme's exampleSite/hugo.toml. Add sed/awk commands here to
# adjust any values that should differ in the demo site.
#
# Usage: bash .github/sync-config-overrides.sh hugo.toml

CONFIG_FILE="${1:-hugo.toml}"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Configuration file '$CONFIG_FILE' not found."
  exit 1
fi

# Example overrides (uncomment and adjust as needed):
#
# Override baseURL:
# sed -i "s|^baseURL = .*|baseURL = \"https://adritian-demo.vercel.app/\"|" "$CONFIG_FILE"
#
# Disable RSS:
# sed -i 's/^disableKinds = \[.*\]/disableKinds = ["footerSection", "RSS"]/' "$CONFIG_FILE"

echo "Config overrides applied to $CONFIG_FILE"
