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
            # Highlight the main author (Muhammad Fahad Arshad)
            highlighted_authors = []
            for author in r["authors"]:
                if "Arshad" in author and "Fahad" in author:
                    highlighted_authors.append(f"<strong>{author}</strong>")
                else:
                    highlighted_authors.append(author)
            parts.append(", ".join(highlighted_authors))
        if r["year"]:
            parts.append(f"({r['year']})")
        title = r["title"] or "Untitled"
        if r["url"]:
            title_html = f'<a href="{r["url"]}" target="_blank" rel="noopener">{title}</a>'
        else:
            title_html = title
        if r["venue"]:
            parts.append(f"<em>{r['venue']}</em>")
        doi_html = f' <a href="https://doi.org/{r["doi"]}" target="_blank" rel="noopener">doi:{r["doi"]}</a>' if r.get("doi") else ""
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