#!/bin/bash
# Documente traducători — sincronizează texte + catalog web, apoi deschide Xcode.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "→ Sincronizez document-templates.json (app + site)…"
python3 scripts/sync_catalog_from_swift.py

echo "→ Deschid TranslatorDocs în Xcode…"
open "$ROOT/TranslatorDocs/TranslatorDocs.xcodeproj"

echo ""
echo "Gata. În Xcode: alege Team la Signing, simulator iPhone, apoi Cmd + R."
