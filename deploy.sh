#!/bin/bash
# Deployment script with automatic cache busting
# Updates version parameters in HTML files using git commit hash

# Get the short git commit hash
VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "1.0.0")

echo "🚀 Deploying with version: $VERSION"

# Update version in index.html
if [ -f "index.html" ]; then
    # Update styles.css version
    sed -i '' "s/styles\.css?v=[^\"']*/styles.css?v=$VERSION/" index.html
    # Update app.js version
    sed -i '' "s/app\.js?v=[^\"']*/app.js?v=$VERSION/" index.html
    echo "✅ Updated index.html asset versions"
fi

# Stage the updated files
git add index.html

echo "✨ Version update complete!"
echo ""
echo "Next steps:"
echo "  1. git commit -m 'Deploy version $VERSION'"
echo "  2. git push origin main"
echo ""
echo "Note: GitHub Pages may take a few minutes to update"
