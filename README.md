# Documente traducători — site web

**Catalog gratuit de modele** pentru traducători autorizați: declarații, contracte, formulare și ghiduri în **română, engleză, franceză, germană, italiană, spaniolă și maghiară**. Peste 70 de documente cu **text de copiat**, fără PDF-uri goale.

Companion web al app-ului iOS **TranslatorDocs** — același catalog, vizibil în browser.

> Texte gata de lipit în GitHub / Netlify: vezi **[DESCRIERE.md](./DESCRIERE.md)**.

## Deschide local (pe Mac)

```bash
cd /Users/stefanianinoiu/hhh/TranslatorDocsWeb
python3 -m http.server 8080
```

Deschide în browser: **http://localhost:8080**

> Dublu-click pe `index.html` poate eșua la încărcarea `catalog.json` din cauza restricțiilor browserului — de aceea e mai bine cu serverul de mai sus.

## Actualizează catalogul după modificări în Swift

```bash
cd /Users/stefanianinoiu/hhh
python3 scripts/sync_catalog_from_swift.py
```

### Texte model (conținut real)

Editează `/Users/stefanianinoiu/hhh/document-templates.json`, apoi:

```bash
cd /Users/stefanianinoiu/hhh
python3 scripts/sync_catalog_from_swift.py
```

Site-ul afișează textul complet + buton **Copiază textul**. PDF-ul rămâne opțional (demo gol).

## Publică pe internet

### Varianta A — GitHub Pages (gratuit)

1. Creează un repo pe GitHub (ex. `documente-traducatori`).
2. Încarcă conținutul folderului `TranslatorDocsWeb` în **root** (doar fișierele din interior: `index.html`, `styles.css`, `app.js`, `catalog.json`).
3. Pe GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Branch: `main`, folder: **`/ (root)`** → Save.
5. După 1–2 minute site-ul e la:  
   `https://<user>.github.io/<repo>/`

**Notă:** routing-ul folosește hash (`#/lang/romana`) — funcționează bine pe GitHub Pages fără configurare extra.

### Varianta B — Netlify (gratuit, drag & drop)

1. Mergi la [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Trage folderul `TranslatorDocsWeb` în pagină.
3. Primești un URL gen `https://random-name.netlify.app`.
4. Opțional: **Domain settings** → domeniu personalizat.

### Varianta C — Cloudflare Pages

1. Conectează repo-ul GitHub la Cloudflare Pages.
2. Build command: *(gol)*  
   Output directory: `/` (rădăcina repo-ului cu fișierele HTML).

### PDF-uri proprii pe site

- Pune fișierele în `TranslatorDocsWeb/pdfs/` și în `catalog.json` setează  
  `"url": "pdfs/ro_mae_traducere_legalizata.pdf"` (cale relativă).
- Sau hostează PDF-urile pe S3 / Google Drive (link direct HTTPS) și pune URL-ul complet în `url`.

## Structură

```
TranslatorDocsWeb/
  index.html      — pagină principală
  styles.css      — stiluri
  app.js          — navigare (hash routes)
  catalog.json    — date (74 documente, 7 limbi)
  README.md       — acest fișier
```
h
main / root
Domeniu recomandat

tradufy.app
tradufy.ro
tradufydocs.com
tradufy.net
Bonus idei pentru Tradufy

Dark mode
Export PDF
Favorite documents
AI translator helper
OCR document scanner
iCloud sync
Multi-language switcher

