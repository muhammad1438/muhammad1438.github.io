Awesome—here’s a practical, research-backed upgrade plan for a GitHub-based CV/website, with copy-paste snippets you can drop into your repo right now.

---

# 1) Pick the right “site engine” for you

**A. Keep it ultra-simple (static HTML only).**
Fastest and fine for a one-pager CV like the file I gave you. You can still add SEO/social tags and a print-to-PDF style. GitHub Pages will publish plain HTML without any build step. If you ever add a `.nojekyll` file, it simply disables Jekyll’s processing. ([GitHub Docs][1])

**B. Jekyll + a ready CV theme (zero-code structure).**

* **modern-resume-theme** — minimal CV layout that runs on GitHub Pages. Great if you want a clean resume quickly. ([GitHub][2])
* **al-folio** — academic-style site with publications, projects, and blog. Heavier than a pure CV, but perfect if you want an “academic homepage” with BibTeX-driven pubs. ([GitHub][3])
  GitHub Pages supports Jekyll and themes out of the box, and GitHub now recommends deploying Pages via **Actions** (lets you use any theme/plugin and other SSGs). ([GitHub Docs][4])

**C. Build with another static site generator (Hugo/Eleventy/Astro) and deploy with GitHub Actions.**
Pages can be published from any generator if you use a small workflow (example Actions exist for Hugo). ([GitHub Docs][5])

---

# 2) Make it discoverable (SEO + rich link previews)

**Add the Jekyll SEO Tag plugin** (if you use Jekyll). It injects canonical URLs, JSON-LD, Open Graph, etc., by adding `{% seo %}` in your layout and enabling the plugin. ([GitHub][6])

**Add Open Graph + Twitter Card tags** (works for any site).
Put these in `<head>` so links look great on LinkedIn/Twitter/Slack:

```html
<meta property="og:title" content="Dr. Muhammad Fahad Arshad — CV">
<meta property="og:description" content="Postdoctoral researcher in catalysis, hydrogen, CO₂ valorization.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR-DOMAIN/">
<meta property="og:image" content="https://YOUR-DOMAIN/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dr. Muhammad Fahad Arshad — CV">
<meta name="twitter:description" content="Postdoctoral researcher in catalysis, hydrogen, CO₂ valorization.">
<meta name="twitter:image" content="https://YOUR-DOMAIN/assets/og-image.jpg">
```

OG is documented at ogp.me; Twitter Cards are similar meta tags. ([Open Graph Protocol][7])

**Add structured data (Person via JSON-LD).**
Search engines understand your CV better with a `<script type="application/ld+json">` block:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Fahad Arshad",
  "jobTitle": "Post-Doctoral Researcher",
  "email": "mailto:m.fahad1448@gmail.com",
  "telephone": "+8618801225727",
  "sameAs": [
    "https://scholar.google.com/citations?user=fwiNZasAAAAJ",
    "https://orcid.org/0000-0003-1828-9458",
    "https://www.linkedin.com/in/mfahadarshad/"
  ],
  "url": "https://YOUR-DOMAIN/"
}
</script>
```

(Use schema.org Person; you can expand it easily.) ([Schema.org][8])

---

# 3) Content architecture that’s easy to update

If you go with Jekyll, put your resume content in a data file like `_data/resume.yml`, then loop over it in your layout. This keeps the HTML clean and makes updates painless. (Bonus: this also makes it easy to generate a one-page print and a long “portfolio” page from the same data.)

---

# 4) Publications & citations (great for academics)

* **Best**: use **jekyll-scholar** to generate publications from BibTeX (`_bibliography/references.bib`). Note: GitHub Pages doesn’t allow most custom Jekyll plugins *unless* you build with Actions (or build locally) and push the generated `_site`. ([GitHub][9])
* **Lightweight fallback**: use a Google Scholar CSV include that works on stock GitHub Pages. ([GitHub][10])

---

# 5) Performance & accessibility

* Run **Lighthouse** (Chrome DevTools → Lighthouse) and fix whatever it flags (core web vitals, SEO basics, etc.). Aim for mobile first. ([Chrome for Developers][11])
* Mark up structure with proper landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`), good contrast, keyboard focus states, and **alt** text. Use WCAG 2.2 quickref as your checklist; MDN’s landmark guidance is a nice companion. ([W3C][12])

---

# 6) Professional polish

**Custom domain + HTTPS** (e.g., `fahadarshad.dev`).
Set a CNAME and point DNS to GitHub Pages in repo → Settings → Pages. Enforce HTTPS once DNS resolves. ([GitHub Docs][13])

**Analytics without cookies**: add **Plausible** with one script tag (privacy-friendly). ([Plausible Analytics][14])

**Contact form on a static site**: use **Formspree** (works on GitHub Pages, no server). ([DEV Community][15])

**One-click PDF export**: keep great print CSS (what you already have), and optionally auto-generate a fresh PDF on every push with a Puppeteer GitHub Action. ([GitHub][16])

---

# 7) Copy-paste upgrades (snippets)

## A) GitHub Actions workflow (build anything → deploy to Pages)

`.github/workflows/pages.yml`

```yaml
name: Build and Deploy CV
on:
  push:
    branches: [ "main" ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # If using Jekyll + custom plugins:
      - uses: ruby/setup-ruby@v1
        with: { ruby-version: '3.2' }
      - run: |
          bundle install
          bundle exec jekyll build -d _site
      # If using Hugo, replace the 3 lines above with a Hugo build step.
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site
  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

(Official Pages + custom workflows flow.) ([GitHub Docs][5])

## B) Jekyll SEO Tag (in `_config.yml` + layout)

`_config.yml`

```yml
title: "Dr. Muhammad Fahad Arshad — CV"
url: "https://YOUR-DOMAIN"
plugins:
  - jekyll-seo-tag
```

In your HTML layout, inside `<head>`:

```liquid
{% raw %}{% seo %}{% endraw %}
```

([jekyll.github.io][17])

## C) JSON-LD Person (drop into `<head>` even without Jekyll)

(Use the script snippet from section 2.) ([Schema.org][8])

## D) Social previews (OG + Twitter)

(Use the meta tags from section 2.) ([Open Graph Protocol][7])

---

# 8) Suggested roadmap for your repo

1. **Keep your current clean single-file CV** but add:

   * SEO tag block (or raw meta if staying pure HTML), JSON-LD Person, OG/Twitter, and a tall 1200×630 OG image. ([Open Graph Protocol][7])
2. **Publish on a custom domain** and turn on HTTPS. ([GitHub Docs][13])
3. **Add a contact form via Formspree** (no backend). ([DEV Community][15])
4. **Run Lighthouse** and fix any accessibility/SEO issues it reports. ([Chrome for Developers][11])
5. If you want an **academic homepage**, migrate to **al-folio** or add **jekyll-scholar** via the Actions workflow so publications auto-render from BibTeX. ([GitHub][3])
6. Optional: **auto-generate a PDF** on each push with a Puppeteer action. ([GitHub][16])

If you like, I can generate:

* a ready-to-use `pages.yml` workflow for your exact setup,
* a minimal `_config.yml` (with `jekyll-seo-tag`), and
* the `<head>` block (JSON-LD + OG/Twitter) wired to your links.

[1]: https://docs.github.com/articles/using-a-static-site-generator-other-than-jekyll?utm_source=chatgpt.com "What is GitHub Pages? - GitHub Docs"
[2]: https://github.com/sproogen/modern-resume-theme?utm_source=chatgpt.com "GitHub - sproogen/modern-resume-theme: A modern static resume template ..."
[3]: https://github.com/alshedivat/al-folio?utm_source=chatgpt.com "GitHub - alshedivat/al-folio: A beautiful, simple, clean, and ..."
[4]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?utm_source=chatgpt.com "Adding a theme to your GitHub Pages site using Jekyll"
[5]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages?utm_source=chatgpt.com "Using custom workflows with GitHub Pages"
[6]: https://github.com/jekyll/jekyll-seo-tag?utm_source=chatgpt.com "GitHub - jekyll/jekyll-seo-tag: A Jekyll plugin to add metadata tags ..."
[7]: https://ogp.me/?utm_source=chatgpt.com "The Open Graph protocol"
[8]: https://schema.org/?utm_source=chatgpt.com "Schema.org - Schema.org"
[9]: https://github.com/inukshuk/jekyll-scholar?utm_source=chatgpt.com "GitHub - inukshuk/jekyll-scholar: jekyll extensions for the blogging ..."
[10]: https://github.com/cmccomb/google-scholar-for-github-pages?utm_source=chatgpt.com "GitHub - cmccomb/google-scholar-for-github-pages: This is a Jekyll ..."
[11]: https://developer.chrome.com/docs/lighthouse/?utm_source=chatgpt.com "Lighthouse | Chrome for Developers"
[12]: https://www.w3.org/WAI/WCAG22/quickref/?utm_source=chatgpt.com "How to Meet WCAG (Quickref Reference)"
[13]: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site?utm_source=chatgpt.com "Managing a custom domain for your GitHub Pages site"
[14]: https://plausible.io/docs/integration-guides?utm_source=chatgpt.com "Installation guides | Plausible docs - Plausible Analytics"
[15]: https://dev.to/charalambosioannou/create-a-static-webpage-with-a-contact-form-on-github-pages-3532?utm_source=chatgpt.com "Create a static webpage with a contact form on Github pages"
[16]: https://github.com/arthur-jaouen/html2pdf-action?utm_source=chatgpt.com "Convert HTML documents to PDF using Puppeteer - GitHub"
[17]: https://jekyll.github.io/jekyll-seo-tag/?utm_source=chatgpt.com "About Jekyll SEO Tag"
Short answer: yes—let’s wire your GitHub Pages CV to real DOI links and auto-refresh your publications & citation counts. The trick is: don’t rely on scraping Google Scholar (it has no public API); instead, use open bibliographic APIs (OpenAlex, Crossref, optional Semantic Scholar) and schedule a GitHub Action to rebuild your publications list regularly. Google Scholar can still be linked for humans to click, but data sync should come from those APIs. ([Google for Developers][1])

---

# What we can & can’t automate

* **Can automate (recommended):**

  * Pull your works by **ORCID** from **OpenAlex**, including titles, venues, years, DOIs, OA links, and **cited_by_count**. ([docs.openalex.org][2])
  * For each DOI, look up metadata and a canonical landing **URL** in **Crossref** (and **is-referenced-by-count** as a Crossref citation metric). ([GitHub][3])
  * Resolve DOIs via **doi.org** (redirects to the publisher page). ([DOI][4])
  * (Optional) Enrich with **Semantic Scholar** fields (requires a free API key). ([api.semanticscholar.org][5])
  * Rebuild your publications section on a **schedule** with GitHub Actions (daily/weekly). ([GitHub Docs][6])

* **Can’t/shouldn’t automate directly:**

  * **Google Scholar scraping.** There’s no official public API, and automated queries can be blocked; so treat your Scholar page as a human-clickable link, not a data source. ([Google for Developers][1])

---

# Architecture (works with your existing Pages site)

1. **Data fetch (build-time):** Python script grabs works from OpenAlex using your **ORCID (0000-0003-1828-9458)**, validates/enriches each with Crossref, and writes a JSON + an HTML fragment.

2. **Scheduled update:** GitHub Action runs weekly (or daily), commits any diffs as a PR so you can review changes. ([GitHub][7])

3. **Display:** Your `index.html` includes the generated HTML (or loops over the JSON). For plain HTML sites, the fragment approach is simplest.

---

# Files to add

## 1) `scripts/update_publications.py` (drop into your repo)

```python
#!/usr/bin/env python3
import json, os, re, time, urllib.parse, pathlib, sys
from datetime import datetime
import requests

ORCID = "0000-0003-1828-9458"
OPENALEX_BASE = "https://api.openalex.org"
CROSSREF_BASE = "https://api.crossref.org/works/"
HEADERS = {"User-Agent": "cv-updater/1.0 (mailto:m.fahad1448@gmail.com)"}

OUT_JSON = pathlib.Path("data/publications.json")
OUT_HTML = pathlib.Path("data/publications.html")
MANUAL = pathlib.Path("data/manual_overrides.json")  # optional, create if needed

def openalex_works(orcid):
    # filter by author ORCID; page through results
    url = f"{OPENALEX_BASE}/works?filter=authorships.author.orcid:{orcid}&per_page=200&sort=publication_year:desc"
    works = []
    while url:
        r = requests.get(url, headers=HEADERS, timeout=60)
        r.raise_for_status()
        data = r.json()
        works.extend(data.get("results", []))
        url = data.get("meta", {}).get("next_page_url")
    return works

def crossref_by_doi(doi):
    # Crossref returns metadata including URL and is-referenced-by-count
    r = requests.get(CROSSREF_BASE + urllib.parse.quote(doi), headers=HEADERS, timeout=60)
    if r.status_code == 404:
        return {}
    r.raise_for_status()
    return r.json().get("message", {})

def doi_to_publisher_url(doi):
    # doi.org will redirect in browser; here we prefer Crossref URL when available
    return f"https://doi.org/{doi}"

def best_link_from_openalex(work):
    # Prefer publisher landing page if present; fallback to OA landing/pdf
    loc = (work.get("primary_location") or {}) or {}
    landing = (loc.get("landing_page_url") or
               (work.get("best_oa_location") or {}).get("landing_page_url"))
    pdf = (work.get("best_oa_location") or {}).get("pdf_url")
    return landing or pdf

def normalize_authors(work):
    authors = []
    for a in work.get("authorships", []):
        person = a.get("author") or {}
        authors.append(person.get("display_name"))
    return [x for x in authors if x]

def clean_text(s):
    return re.sub(r"\s+", " ", s or "").strip()

def build_record(work, overrides):
    doi = (work.get("doi") or "").replace("https://doi.org/", "")
    cr = crossref_by_doi(doi) if doi else {}
    title = clean_text(work.get("title") or cr.get("title", [None])[0])
    year = work.get("publication_year") or (cr.get("issued", {}).get("date-parts", [[None]])[0][0])
    venue = (work.get("primary_location") or {}).get("source", {}).get("display_name") \
            or (cr.get("container-title") or [None])[0]
    url = overrides.get("links", {}).get(doi) if overrides else None
    if not url:
        url = cr.get("URL") or best_link_from_openalex(work) or (doi_to_publisher_url(doi) if doi else None)

    return {
        "title": title,
        "year": year,
        "venue": venue,
        "doi": doi or None,
        "url": url,
        "openalex_id": work.get("id"),
        "cited_by_openalex": work.get("cited_by_count"),
        "cited_by_crossref": cr.get("is-referenced-by-count"),
        "authors": normalize_authors(work),
        "updated": datetime.utcnow().isoformat(timespec="seconds") + "Z"
    }

def to_html(records):
    lines = []
    lines.append('<ol class="pub-list">')
    for r in records:
        parts = []
        if r["authors"]:
            parts.append(", ".join(r["authors"]))
        if r["year"]:
            parts.append(f"({r['year']})")
        title = r["title"] or "Untitled"
        if r["url"]:
            title_html = f'<a href="{r["url"]}" target="_blank" rel="noopener">{title}</a>'
        else:
            title_html = title
        if r["venue"]:
            parts.append(f"<em>{r['venue']}</em>")
        doi_html = f' <a href="https://doi.org/{r["doi"]}">doi:{r["doi"]}</a>' if r.get("doi") else ""
        cites = r.get("cited_by_openalex") or r.get("cited_by_crossref")
        cite_html = f' <span class="cites">· citations: {cites}</span>' if cites is not None else ""
        lines.append(f"<li>{title_html} — {' '.join(parts)}{doi_html}{cite_html}</li>")
    lines.append("</ol>")
    return "\n".join(lines)

def main():
    overrides = {}
    if MANUAL.exists():
        with open(MANUAL, "r", encoding="utf-8") as f:
            overrides = json.load(f)

    works = openalex_works(ORCID)
    records = [build_record(w, overrides) for w in works]
    # Keep only items with a title and year
    records = [r for r in records if r["title"] and r["year"]]

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)

    html = to_html(records)
    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Wrote {len(records)} records to {OUT_JSON} and {OUT_HTML}")

if __name__ == "__main__":
    main()
```

> Notes
> • OpenAlex filter by **author ORCID** and fields like **cited_by_count** are documented. ([docs.openalex.org][8])
> • Crossref works endpoint, sorting and **is-referenced-by-count** are documented. ([GitHub][3])
> • DOI links via **doi.org** resolve to publisher pages. ([DOI][4])

---

## 2) Minimal HTML hook (put where you want publications to show)

```html
<section class="card">
  <h2>Publications (auto-updated)</h2>
  <!-- This file is generated by the scheduled Action -->
  <!-- If you don’t use Jekyll, just include it with an iframe OR paste its contents during build -->
  <div id="pubs">
    <!-- build step will inline data/publications.html into your index.html -->
  </div>
</section>
```

If you’re using plain HTML, the Action below can **inline** `data/publications.html` into `index.html` (simple string replacement), or you can just copy the generated HTML into your page once.

---

## 3) (Optional) Manual overrides

Create `data/manual_overrides.json` for special links or title fixes:

```json
{
  "links": {
    "10.1002/kin.21708": "https://onlinelibrary.wiley.com/doi/10.1002/kin.21708"
  }
}
```

---

## 4) GitHub Action to auto-refresh weekly and open a PR

`.github/workflows/publications.yml`

```yaml
name: Refresh publications
on:
  schedule:
    - cron: "0 6 * * 1"   # every Monday 06:00 UTC
  workflow_dispatch: {}
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - name: Install deps
        run: python -m pip install --upgrade pip requests
      - name: Update publications
        run: python scripts/update_publications.py

      # (Optional) inline the generated HTML into index.html between markers
      - name: Inline publications into index.html
        run: |
          START="<!-- PUBS:START -->"
          END="<!-- PUBS:END -->"
          PUBS=$(cat data/publications.html | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')
          perl -0777 -pe "s/${START}.*?${END}/${START}\n${PUBS}\n${END}/s" -i index.html

      - name: Create PR with changes
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: "chore(pubs): auto-refresh publications"
          title: "Auto-refresh publications"
          body: "This PR updates publications.json/html from OpenAlex/Crossref."
          branch: "auto/refresh-pubs"
          delete-branch: true
```

This uses cron-scheduled Actions and creates a PR when your publications or counts change. ([GitHub Docs][6])

---

# How this “intelligent” setup behaves

* **Real links:** Every item uses Crossref’s `URL` when available; otherwise we fall back to the best OpenAlex OA/publisher link, or `https://doi.org/<doi>` to resolve. ([GitHub][3])
* **Citation counts:** We display **OpenAlex `cited_by_count`** (consistent and fast); optionally also show Crossref `is-referenced-by-count`. Counts will differ from Google Scholar (different coverage). ([docs.openalex.org][9])
* **No scraping risk:** We keep a normal “View my Google Scholar” link for humans, but all data comes from public APIs. ([Google Scholar][10])
* **Fails safe:** If an API is down, your site still builds; previous JSON/HTML remains.

---

## Optional upgrades

* **Swap to Jekyll + `jekyll-scholar`** and generate the list from a BibTeX file produced by the script. This needs building via Actions (custom Jekyll plugin) instead of stock Pages. ([GitHub][11])
* **Add Semantic Scholar enrichments** (fields like influential citations) if you add a free API key. ([api.semanticscholar.org][5])

---

If you want, I can tailor these snippets to your current repo layout (e.g., add the inlining markers into your `index.html` for you and prefill with your Scholar/ORCID links).

[1]: https://developers.google.com/apis-explorer?utm_source=chatgpt.com "Google APIs Explorer | Google for Developers"
[2]: https://docs.openalex.org/api-entities/authors "Authors | OpenAlex technical documentation"
[3]: https://github.com/CrossRef/rest-api-doc "GitHub - CrossRef/rest-api-doc: Documentation for Crossref's REST API. For questions or suggestions, see https://community.crossref.org/"
[4]: https://www.doi.org/doi-handbook/HTML/doi-resolvers.html?utm_source=chatgpt.com "DOI Identifier / Resolution Services > DOI Resolvers"
[5]: https://api.semanticscholar.org/api-docs/graph?utm_source=chatgpt.com "Academic Graph API - Semantic Scholar"
[6]: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows?utm_source=chatgpt.com "Events that trigger workflows - GitHub Docs"
[7]: https://github.com/peter-evans/create-pull-request?utm_source=chatgpt.com "GitHub - peter-evans/create-pull-request: A GitHub action to create a ..."
[8]: https://docs.openalex.org/api-entities/works/filter-works "Filter works | OpenAlex technical documentation"
[9]: https://docs.openalex.org/api-entities/works/work-object "Work object | OpenAlex technical documentation"
[10]: https://scholar.google.com/intl//scholar/about.html?utm_source=chatgpt.com "About Google Scholar"
[11]: https://github.com/inukshuk/jekyll-scholar?utm_source=chatgpt.com "GitHub - inukshuk/jekyll-scholar: jekyll extensions for the blogging ..."
