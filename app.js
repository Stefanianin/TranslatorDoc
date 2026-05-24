const app = document.getElementById("app");

/** @type {{ languages: any[], categories: any[], documents: any[], demoPdfUrl: string } | null} */
let catalog = null;

const langById = () => Object.fromEntries(catalog.languages.map((l) => [l.id, l]));
const catById = () => Object.fromEntries(catalog.categories.map((c) => [c.id, c]));

function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, "") || "";
  const parts = hash.split("/").filter(Boolean);
  if (parts.length === 0) return { view: "home" };
  if (parts[0] === "lang" && parts[1]) {
    if (parts[2]) return { view: "category", lang: parts[1], category: parts[2] };
    return { view: "language", lang: parts[1] };
  }
  return { view: "home" };
}

function nav(path) {
  location.hash = path.startsWith("#") ? path : `#${path}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function breadcrumb(items) {
  const links = items
    .map((item, i) => {
      if (i === items.length - 1) return `<span>${escapeHtml(item.label)}</span>`;
      return `<a href="${item.href}">${escapeHtml(item.label)}</a>`;
    })
    .join('<span aria-hidden="true"> › </span>');
  return `<nav class="breadcrumb" aria-label="Navigare">${links}</nav>`;
}

function renderHome() {
  const langs = catalog.languages;
  const cards = langs
    .map((lang) => {
      const count = catalog.documents.filter((d) => d.language === lang.id).length;
      return `
        <a class="card" href="#/lang/${lang.id}">
          <div class="card-row">
            <span class="card-flag">${lang.flag}</span>
            <span class="card-accent" style="background:${lang.color}"></span>
            <div class="card-body">
              <strong>${escapeHtml(lang.label)}</strong>
              <span>${escapeHtml(lang.subtitle)}</span>
            </div>
            <span class="card-meta">${count} doc.</span>
          </div>
        </a>`;
    })
    .join("");

  app.innerHTML = `
    <div class="hero">
      <h1>Bun venit</h1>
      <p>Catalog de <strong>74 de modele</strong> (declarații, contracte, tarife, ghiduri) în 7 limbi. Alege limba și categoria, copiază textul și completează câmpurile — fără PDF gol.</p>
    </div>
    <p class="section-title">Limbi</p>
    <ul class="card-list">${cards}</ul>`;
}

function renderLanguage(langId) {
  const lang = langById()[langId];
  if (!lang) return renderNotFound();

  const docs = catalog.documents.filter((d) => d.language === langId);
  const cats = catalog.categories.filter((c) =>
    docs.some((d) => d.category === c.id)
  );

  const cards = cats
    .map((cat) => {
      const count = docs.filter((d) => d.category === cat.id).length;
      return `
        <a class="card" href="#/lang/${langId}/${cat.id}">
          <div class="card-row">
            <span class="cat-icon" style="background:${cat.color}">${cat.icon}</span>
            <div class="card-body">
              <strong>${escapeHtml(cat.label)}</strong>
              <span>${escapeHtml(cat.subtitle)}</span>
            </div>
            <span class="card-meta">${count}</span>
          </div>
        </a>`;
    })
    .join("");

  app.innerHTML = `
    ${breadcrumb([
      { label: "Acasă", href: "#/" },
      { label: lang.label, href: `#/lang/${langId}` },
    ])}
    <div class="hero">
      <h1>${lang.flag} ${escapeHtml(lang.label)}</h1>
      <p>${escapeHtml(lang.subtitle)}</p>
    </div>
    <p class="section-title">Categorii</p>
    <ul class="card-list">${cards}</ul>`;
}

function renderCategory(langId, catId) {
  const lang = langById()[langId];
  const cat = catById()[catId];
  if (!lang || !cat) return renderNotFound();

  const docs = catalog.documents.filter(
    (d) => d.language === langId && d.category === catId
  );

  const cards = docs
    .map((doc) => {
      const text = doc.templateText || "";
      const preview = text ? escapeHtml(text.slice(0, 280) + (text.length > 280 ? "…" : "")) : escapeHtml(doc.description);
      const body = text
        ? `<pre class="doc-template" id="tpl-${escapeHtml(doc.id)}">${escapeHtml(text)}</pre>`
        : `<p>${escapeHtml(doc.description)}</p>`;
      return `
      <li class="doc-card">
        <h2>${escapeHtml(doc.title)}</h2>
        <p class="doc-desc">${preview}</p>
        ${body}
        <div class="doc-actions">
          ${
            text
              ? `<button type="button" class="btn btn-primary" data-copy="${escapeHtml(doc.id)}">Copiază textul</button>`
              : ""
          }
          <a class="btn btn-secondary" href="${escapeHtml(doc.url)}" target="_blank" rel="noopener" title="PDF demo gol — folosește textul de mai sus">
            PDF demo (opțional)
          </a>
        </div>
      </li>`;
    })
    .join("");

  app.innerHTML = `
    ${breadcrumb([
      { label: "Acasă", href: "#/" },
      { label: lang.label, href: `#/lang/${langId}` },
      { label: cat.label, href: `#/lang/${langId}/${catId}` },
    ])}
    <div class="hero">
      <h1>${cat.icon} ${escapeHtml(cat.label)}</h1>
      <p>${lang.flag} ${escapeHtml(lang.label)} — ${escapeHtml(cat.subtitle)}</p>
    </div>
    <ul class="card-list">${cards}</ul>`;

  app.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-copy");
      const el = document.getElementById(`tpl-${id}`);
      const t = el?.textContent ?? "";
      navigator.clipboard?.writeText(t).then(() => {
        btn.textContent = "Copiat!";
        setTimeout(() => { btn.textContent = "Copiază textul"; }, 1500);
      });
    });
  });
}

function renderNotFound() {
  app.innerHTML = `<p class="error">Pagina nu există. <a href="#/">Înapoi acasă</a></p>`;
}

function render() {
  if (!catalog) return;
  const route = parseRoute();
  switch (route.view) {
    case "home":
      renderHome();
      break;
    case "language":
      renderLanguage(route.lang);
      break;
    case "category":
      renderCategory(route.lang, route.category);
      break;
    default:
      renderHome();
  }
  document.title =
    route.view === "home"
      ? "Documente traducători"
      : `Documente traducători — ${route.lang || ""}`;
}

async function init() {
  try {
    const res = await fetch("catalog.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    catalog = await res.json();
    render();
  } catch (e) {
    app.innerHTML = `<p class="error">Nu s-a putut încărca catalog.json. Rulează un server local (vezi README).<br><small>${escapeHtml(e.message)}</small></p>`;
  }
}

window.addEventListener("hashchange", render);
init();
