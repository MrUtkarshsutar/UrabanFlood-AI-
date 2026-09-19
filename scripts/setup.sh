#!/usr/bin/env bash
# ==============================================================================
# UrbanFlood AI - Rapid Setup Script for Linux/macOS/WSL
# ==============================================================================

set -e

echo "🌊 Initializing UrbanFlood AI Environment Setup..."

# 1. Check Python & Node
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ Node.js / npm is required but not installed. Aborting." >&2; exit 1; }

# 2. Setup .env file
if [ ! -f ".env" ]; then
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
fi

# 3. Create Python Virtual Environment
if [ ! -d ".venv" ]; then
    echo "🐍 Creating Python virtual environment in .venv..."
    python3 -m venv .venv
fi

echo "📦 Activating virtual environment and installing backend & AI dependencies..."
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
pip install -r ai/requirements.txt

# 4. Install Frontend Dependencies
echo "⚛️ Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ UrbanFlood AI workspace successfully configured!"
echo "👉 To start the backend: source .venv/bin/activate && uvicorn backend.app.main:app --reload"
echo "👉 To start the frontend: cd frontend && npm run dev"
