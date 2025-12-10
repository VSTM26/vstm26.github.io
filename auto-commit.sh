#!/bin/bash

echo "Auto-committing changes to git..."

# Add all changes
git add .

# Get current timestamp
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Commit with timestamp
git commit -m "Auto-commit: $timestamp"

# Push to remote (uncomment the next line if you want to auto-push)
git push origin master

echo "Changes committed successfully!"
