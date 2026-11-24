#!/usr/bin/env python3
"""Rebuild site data and redirects from the source zip extract."""
import json
import re
import shutil
from pathlib import Path

SRC = Path("/tmp/jeitinho-src/jeitinho-site-source")
ROOT = Path(__file__).resolve().parents[1]
ATIVIDADES = "/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/"

# Undated Instagram posts sit in the October 2026 cluster, newest first after the dated ones.
SORT_DATE = {
    "/semana-das-criancas-dia-dos-esportes-na-escola-jeitinho-de-crianca/": "2026-10-13",
    "/da-horta-para-a-cozinha-uma-experiencia-cheia-de-descobertas/": "2026-10-12",
    "/cha-literario-na-escola-jeitinho-de-crianca/": "2026-10-11",
    "/post-instagram-dco2thnfqnc/": "2026-10-10",
}

PRICE_LINE = re.compile(
    r"^(preço:?|preco:?|parcela mensal|quantidade|\[valor sob consulta na visita\]|valores 20\d\d.*|valor da reserva.*|\*?\s*valor mensal.*)$",
    re.I,
)
PRICE_INLINE = re.compile(r"R\$\s*[\d.]+(?:,\d{2})?")
HASH = re.compile(r"(?:^|\s)#[\wÀ-ÿ]+")
SKIP = {"continue lendo", "leia mais", "veja mais", "todos", "notícias", "noticias", "categoria:", "blog"}


def clean(text: str) -> str:
    text = text.replace("\xa0", " ").replace("\u200b", "")
    text = HASH.sub(" ", text)
    text = PRICE_INLINE.sub("", text)
    text = re.sub(r"\s+", " ", text).strip(" |")
    return text.strip()


def is_price(line: str) -> bool:
    if PRICE_LINE.match(line):
        return True
    if "R$" in line and len(PRICE_INLINE.sub("", line).strip(" .,-")) < 8:
        return True
    return False


def blocks_from_body(body: str, h1: str):
    lines = []
    for raw in body.splitlines():
        line = clean(raw)
        if not line or is_price(line):
            continue
        if line.lower() in SKIP:
            continue
        if line == h1:
            continue
        lines.append(line)
    blocks = []
    for index, line in enumerate(lines):
        nxt = lines[index + 1] if index + 1 < len(lines) else ""
        heading = (
            len(line) <= 72
            and not line.endswith((".", "!", "?", "…", ":"))
            and line.count(" ") <= 10
            and (len(nxt) > len(line) or not nxt)
        )
        block = {"type": "h2" if heading else "p", "text": line}
        if blocks and blocks[-1] == block:
            continue
        blocks.append(block)
    return blocks


def main():
    routes = json.loads((SRC / "routes.json").read_text())["routes"]
    posts = [r for r in routes if r["type"] == "post"]

    def sort_key(route):
        stamp = route.get("date") or SORT_DATE.get(route["path"]) or "1970-01-01"
        return stamp

    posts_sorted = sorted(posts, key=sort_key, reverse=True)
    order_of = {route["path"]: index for index, route in enumerate(posts_sorted)}

    img_out = ROOT / "public" / "images"
    img_out.mkdir(parents=True, exist_ok=True)
    for image in (SRC / "images").iterdir():
        if image.is_file():
            shutil.copy2(image, img_out / image.name)

    pages = []
    for route in routes:
        content_path = SRC / route["content_file"].replace(".md", ".json")
        content = json.loads(content_path.read_text())
        h1 = route.get("h1") or content.get("h1") or route["title"]
        title = route["title"]
        description = (route.get("meta_description") or content.get("meta_description") or "").strip()
        path = route["path"]
        if path == "/post-instagram-dco2thnfqnc/":
            title = "Registros da Escola Jeitinho de Criança"
            h1 = "Registros da escola"
            description = "Fotos da rotina na Escola Jeitinho de Criança, berçário e educação infantil no Tatuapé."
            body_blocks = []
        else:
            body_blocks = blocks_from_body(content.get("body") or "", h1)
        if not description:
            first = next((b["text"] for b in body_blocks if b["type"] == "p" and len(b["text"]) > 40), "")
            description = first or f"{h1}. Escola Jeitinho de Criança, no Tatuapé."
        description = clean(description)
        if len(description) > 220:
            description = description[:217].rsplit(" ", 1)[0].rstrip(".,;:") + "."
        images = content.get("images") or []
        featured = content.get("featured_image") or (images[0] if images else None)
        image = f"/images/{featured}" if featured else None
        for name in images:
            alt = h1
            body_blocks.append({"type": "img", "src": f"/images/{name}", "alt": alt})
        kind = "post" if route["type"] == "post" else route["type"]
        if kind not in {"page", "lp", "category", "post"}:
            kind = "page"
        pages.append(
            {
                "path": path,
                "kind": kind,
                "title": title,
                "description": description,
                "h1": h1,
                "group": "noticia" if route["type"] == "post" else None,
                "cardTitle": h1 if route["type"] == "post" else None,
                "image": image,
                "date": route.get("date"),
                "order": order_of.get(path, 100),
                "slugStatus": route.get("slug_status") or "",
                "blocks": body_blocks,
            }
        )

    # Keep titles from routes.json exactly (already set), except the photo post.
    blob = json.dumps(pages, ensure_ascii=False)
    if "R$" in blob:
        raise SystemExit("R$ ainda está no conteúdo")

    site_ts = (
        'import type { SiteData } from "./types"\n\n'
        "export const site: SiteData = "
        + json.dumps({"pages": pages}, ensure_ascii=False, indent=2)
        + "\n"
    )
    (ROOT / "src/data/site.ts").write_text(site_ts)

    live = {p["path"] for p in pages}
    raw = json.loads((SRC / "redirects.json").read_text())["redirects"]
    redirects = {}
    dropped = []
    retargeted = []
    for item in raw:
        source = item["from"]
        dest = item["to"]
        if source in live:
            dropped.append(item)
            continue
        if dest not in live:
            if dest == "/category/atividades/":
                dest = ATIVIDADES
                retargeted.append(source)
            else:
                raise SystemExit(f"destino inexistente: {item}")
        if dest not in live or source in live or source == dest:
            raise SystemExit(f"redirect inválido {source} -> {dest}")
        redirects[source] = dest

    (ROOT / "src/data/redirects.ts").write_text(
        "export const redirects: Record<string, string> = "
        + json.dumps(redirects, ensure_ascii=False, indent=2)
        + "\n"
    )

    public = ROOT / "public"
    netlify = [
        "http://jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
        "http://www.jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
        "https://www.jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
    ]
    ht = [
        "RewriteEngine On",
        "RewriteBase /",
        "RewriteCond %{HTTPS} !=on",
        "RewriteRule ^ https://jeitinhodecrianca.com.br%{REQUEST_URI} [R=301,L]",
        "RewriteCond %{HTTP_HOST} ^www\\.jeitinhodecrianca\\.com\\.br$ [NC]",
        "RewriteRule ^ https://jeitinhodecrianca.com.br%{REQUEST_URI} [R=301,L]",
    ]
    vercel_rules = [
        {
            "source": "/:path*",
            "has": [{"type": "host", "value": "www.jeitinhodecrianca.com.br"}],
            "destination": "https://jeitinhodecrianca.com.br/:path*",
            "permanent": True,
        }
    ]
    for source, dest in redirects.items():
        netlify.append(f"{source} {dest} 301")
        pattern = source.strip("/")
        ht.append(f"RewriteRule ^{pattern}/?$ {dest} [R=301,L]")
        vercel_rules.append({"source": source.rstrip("/") or "/", "destination": dest, "permanent": True})
    netlify.append("/* /index.html 200")
    (public / "_redirects").write_text("\n".join(netlify) + "\n")
    ht += [
        "RewriteCond %{REQUEST_FILENAME} !-f",
        "RewriteCond %{REQUEST_URI} !/$",
        "RewriteRule ^(.+)$ /$1/ [R=301,L]",
        "RewriteCond %{REQUEST_FILENAME} !-f",
        "RewriteCond %{REQUEST_FILENAME} !-d",
        "RewriteRule ^ index.html [L]",
    ]
    (public / ".htaccess").write_text("\n".join(ht) + "\n")
    (ROOT / "vercel.json").write_text(json.dumps({"trailingSlash": True, "redirects": vercel_rules}, ensure_ascii=False, indent=2) + "\n")

    locs = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for page in pages:
        locs.append("  <url>")
        locs.append(f"    <loc>https://jeitinhodecrianca.com.br{page['path']}</loc>")
        locs.append("  </url>")
    locs.append("</urlset>")
    (public / "sitemap.xml").write_text("\n".join(locs) + "\n")
    (public / "robots.txt").write_text("User-agent: *\nAllow: /\n\nSitemap: https://jeitinhodecrianca.com.br/sitemap.xml\n")

    print("pages", len(pages), "posts", len(posts_sorted), "redirects", len(redirects))
    print("dropped", dropped)
    print("retargeted", len(retargeted))
    print("POST ORDER")
    for page in sorted((p for p in pages if p["kind"] == "post"), key=lambda p: p["order"]):
        print(f"{page['order']:2} {page['date']} {page['slugStatus']:16} {page['path']}")


if __name__ == "__main__":
    main()
