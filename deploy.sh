#!/bin/bash
# Deployment script with automatic cache busting
# Updates version parameters in HTML files using git commit hash

# Get the short git commit hash
VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "1.0.0")

echo "🚀 Deploying with version: $VERSION"

# Compile lang.js from TSV sources
echo "🔧 Compiling lang.js..."
python3 bin/compile_lang.py || { echo "❌ lang.js compilation failed"; exit 1; }

# Compile SASS
echo "🎨 Compiling SASS..."
sass assets/scss/styles.scss static/css/styles.css || { echo "❌ SASS compilation failed"; exit 1; }

# Update version in index.html
if [ -f "index.html" ]; then
    # Update styles.css version
    sed -i '' "s/styles\.css?v=[^\"']*/styles.css?v=$VERSION/" index.html
    # Update lang.js version
    sed -i '' "s/lang\.js?v=[^\"']*/lang.js?v=$VERSION/" index.html
    # Update app.js version
    sed -i '' "s/app\.js?v=[^\"']*/app.js?v=$VERSION/" index.html
    echo "✅ Updated index.html asset versions"
fi

# Update APP_VERSION constant in app.js
if [ -f "js/app.js" ]; then
    sed -i '' "s/const APP_VERSION = '[^']*'/const APP_VERSION = '$VERSION'/" js/app.js
    echo "✅ Updated APP_VERSION in js/app.js"
fi

# Stage the updated files
git add index.html static/js/app.js static/js/lang.js

echo "✨ Version update complete!"
echo ""
echo "Next steps:"
echo "  1. git commit -m 'Deploy version $VERSION'"
echo "  2. git push origin main"
echo ""
echo "Note: GitHub Pages may take a few minutes to update"
