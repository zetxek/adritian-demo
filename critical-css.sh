#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "Starting critical-css"

# Check if critical package exists
if [ ! -f "./node_modules/critical/cli.js" ]; then
    echo "Error: critical package not found at ./node_modules/critical/cli.js"
    echo "Please make sure to run 'npm install' before running this script"
    exit 1
fi

# Ensure the assets/css directory exists
mkdir -p ./assets/css

# Run critical CSS generator
./node_modules/critical/cli.js public/index.html --base public > ./assets/css/critical.css

echo "Done running critical-css"
