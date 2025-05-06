#!/bin/bash

set -e

echo "📦 Installing root dev dependencies..."
npm install -D husky

echo "🔐 Initializing husky in root..."
npx husky install

echo "🔧 Adding pre-commit hook for backend & frontend lint..."
npx husky add .husky/pre-commit "npm run lint:all"
chmod +x .husky/pre-commit

echo "🧠 Adding lint:all script to root package.json..."

# Adds "lint:all" if not present in root package.json
node <<EOF
const fs = require('fs');
const path = './package.json';

if (fs.existsSync(path)) {
  const pkg = JSON.parse(fs.readFileSync(path, 'utf-8'));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["lint:all"] = "npm --prefix backend run lint && npm --prefix frontend run lint";
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
  console.log("✅ Updated root package.json with 'lint:all' script.");
} else {
  console.warn("⚠️  No root package.json found. Skipping script injection.");
}
EOF

echo "✅ Husky monorepo setup complete!"
