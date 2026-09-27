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

# Site titles (see #782): the theme builds <title> from .Site.Title, and the
# demo uses longer, per-language titles than the theme's exampleSite.
# Replaces the top-level title and sets title in each [languages.xx] block
# (inserted after its `label` line, replacing any existing title there).
awk -v q="'" '
  BEGIN {
    titles["en"] = "Demo site for Adritian - a high performance hugo theme by Adrián Moreno"
    titles["es"] = "Sitio demo de Adritian - un tema Hugo de alto rendimiento por Adrián Moreno"
    titles["fr"] = "Site de démonstration pour Adritian - un thème Hugo haute performance par Adrián Moreno"
    titles["ar"] = "موقع تجريبي لأدريتيان - قالب هوغو عالي الأداء من إنشاء أدريان مورينو"
    titles["he"] = "אתר דמו לאדריטיאן - תבנית הוגו בביצועים גבוהים מאת אדריאן מורנו"
    section = ""
  }
  /^\[/ {
    section = $0
    lang = ""
    if (match($0, /^\[languages\.[a-z-]+\]$/)) {
      lang = substr($0, 12, RLENGTH - 12)
    }
  }
  section == "" && /^title = / { print "title = \"" titles["en"] "\""; next }
  lang != "" && (lang in titles) && /^title = / { next }
  { print }
  lang != "" && (lang in titles) && /^label = / { print "title = " q titles[lang] q }
' "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"

# Example overrides (uncomment and adjust as needed):
#
# Override baseURL:
# sed -i "s|^baseURL = .*|baseURL = \"https://adritian-demo.vercel.app/\"|" "$CONFIG_FILE"
#
# Disable RSS:
# sed -i 's/^disableKinds = \[.*\]/disableKinds = ["footerSection", "RSS"]/' "$CONFIG_FILE"

echo "Config overrides applied to $CONFIG_FILE"
