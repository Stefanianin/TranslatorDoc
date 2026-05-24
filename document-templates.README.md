# Texte model (document-templates.json)

PDF-urile demo sunt goale. **Conținutul real** e aici — declarații, contracte, formulare de completat.

## Editează

Deschide `document-templates.json` și modifică textul sub cheia documentului, ex.:

```json
"ro_cert_mae": "MODEL — Formular MAE\n\nSubsemnatul/a ..."
```

ID-ul = cel din Swift (`ro_cert_mae`, `en_uscis_cover_letter`, etc.).

## Aplică modificările

```bash
cd /Users/stefanianinoiu/hhh
python3 scripts/sync_catalog_from_swift.py
```

Apoi:
- **Site:** reîncarcă pagina (sau republică folderul `TranslatorDocsWeb`)
- **iOS:** Rulează din nou app-ul în Xcode (`Cmd + R`)

## Regenerează modele implicite

Dacă ștergi un document din Swift și vrei texte noi de bază:

```bash
python3 scripts/generate_document_templates.py
python3 scripts/sync_catalog_from_swift.py
```

(Atenție: suprascrie `document-templates.json` — fă backup dacă ai editat manual.)
