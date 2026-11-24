#!/usr/bin/env python3
"""Clean extracted content and write SEO redirect files.

Not part of `npm run build`. Run again only if the archive extract is refreshed.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
raw = json.loads(Path("/tmp/jeitinho/site.json").read_text())

FINAL = [p["path"] for p in raw["pages"]]
FINAL_SET = set(FINAL)

POST_IMAGES = {
    "/brincadeira-coordenacao-motora/": "/images/coordenacao-motora-4e2725da.jpeg",
    "/brincadeira-desgrude-o-palito/": "/images/brincadeira-desgrude-o-palito-1796cdba.jpeg",
    "/brincadeira-desenho-com-furinhos/": "/images/desenho-com-furinhos-a622e2b2.jpeg",
    "/brincadeira-equilibrando-a-bolinha/": "/images/equilibrando-a-bolinha-66c36ce7.jpeg",
    "/brincadeira-bexiga-sensorial/": "/images/boliche-para-criancas-1024x1024.jpg",
    "/historia-maria-vai-com-as-outras/": "/images/maria-vai-com-as-outras-16x9-01-a02701cd.jpeg",
    "/historia-as-dez-corujinhas/": "/images/as-dez-corujinhas-16x9-01-a6d5ccf6.jpeg",
    "/historia-o-livro-do-planeta-terra/": "/images/planeta-terra-01-46e5c896.jpeg",
    "/a-historia-do-tatu/": "/images/a-historia-do-tatu-16x9-01-407b0d0a.jpeg",
    "/historia-peludinho/": "/images/boca-do-coelho-1024x1024.jpg",
    "/10-brincadeiras-para-fazer-em-casa-com-criancas-de-2-a-3-anos/": "/images/brincadeiras-em-casa-para-criancas-2-3-anos-158ca843.jpeg",
    "/atividades-que-estimulam-a-coordenacao-motora-do-seu-bebe/": "/images/coordenacao-motora-do-bebe-01-3d6fecb3.jpeg",
    "/12-brincadeiras-para-tornar-a-pascoa-divertida-para-criancas-dentro-de-casa/": "/images/brincadeiras-de-pascoa-para-criancas-62b6f7a5.jpeg",
    "/atividades-para-as-criancas-durante-a-quarentena-do-coronavirus-covid-19/": "/images/atividades-para-criancas-scaled-e1584978463218-b476240a.jpeg",
    "/reciclagem-de-esponjas-de-limpeza-no-tatuape/": "/images/horta-infantil-no-tatuape-sp.jpg",
}

PRICE_LINE = re.compile(
    r"parcela mensal|valor mensal|anuidade|valores 20|preço|preco",
    re.I,
)


def trim(text: str, limit: int = 158) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(".,;:")
    return cut + "."


def first_paragraph(page) -> str:
    for block in page["blocks"]:
        if block["type"] == "p" and len(block["text"]) > 40:
            return block["text"]
    return ""


def clean_iframe(src: str) -> str:
    if "youtube.com" in src or "youtu.be" in src:
        return "https://www.youtube.com/embed/2uIfTfjyxCk?rel=0"
    if "klapty.com" in src:
        return "https://www.klapty.com/tour/tunnel/hE40uciGEm"
    if "google.com/maps" in src:
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.499199479611!2d-46.56659074900191!3d-23.550508184613168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5e8fd7ab2365%3A0x21b0f286a8b3843f!2sEscola%20Jeitinho%20de%20Crian%C3%A7a%20-%20Ber%C3%A7%C3%A1rio%20e%20Educa%C3%A7%C3%A3o%20Infantil!5e0!3m2!1spt-PT!2sbr!4v1629078295464!5m2!1spt-PT!2sbr"
    return re.sub(r"\s+", "", src)


def drop_price_blocks(blocks):
    cleaned = []
    for block in blocks:
        if block["type"] in {"h1", "h2", "h3", "h4", "p"} and PRICE_LINE.search(block["text"]):
            continue
        if block["type"] == "ul":
            items = [item for item in block["items"] if not PRICE_LINE.search(item) and "R$" not in item]
            if not items:
                continue
            block = {**block, "items": items}
        if block["type"] == "iframe":
            block = {**block, "src": clean_iframe(block["src"])}
        cleaned.append(block)
    return cleaned


MANUAL = {
    "/ig/": {
        "h1": "Instagram",
        "description": "Fotos, recados e o dia a dia da Escola Jeitinho de Criança no Instagram, no Facebook e no YouTube.",
        "blocks": [
            {"type": "h1", "text": "Instagram"},
            {
                "type": "p",
                "text": "O dia a dia da Escola Jeitinho de Criança aparece nos canais oficiais: momentos das turmas, recados para as famílias e um pouco do que acontece na Rua Itapeti.",
            },
            {
                "type": "p",
                "text": "A página antiga reunia os conteúdos recentes do Facebook, do Instagram e do YouTube. Os perfis continuam no ar.",
            },
            {
                "type": "ul",
                "items": [
                    "Instagram: instagram.com/escolajeitinhodecrianca",
                    "Facebook: facebook.com/jeitinhodecrianca",
                    "YouTube: youtube.com/user/escolajeitinho",
                ],
            },
        ],
    },
    "/pesquisa-2022/": {
        "h1": "Pesquisa 2022",
        "description": "Pesquisa com as famílias da Escola Jeitinho de Criança. O formulário de 2022 não está mais no ar. Fale com a escola pelo WhatsApp.",
        "blocks": [
            {"type": "h1", "text": "Pesquisa 2022"},
            {
                "type": "p",
                "text": "Em 2022 a escola abriu uma pesquisa para as famílias contarem como estava a experiência dos filhos no berçário e na educação infantil.",
            },
            {
                "type": "p",
                "text": "O formulário original não pôde ser recuperado com o site. Ele aparecia apenas como uma tela de carregamento no arquivo. Não há respostas publicadas aqui.",
            },
            {
                "type": "p",
                "text": "Se você quer falar sobre adaptação, rotina ou matrícula, chame a equipe pelo WhatsApp ou pelo telefone. O atendimento é de segunda a sexta, das 7h às 19h.",
            },
        ],
    },
    "/material-escolar/": {
        "h1": "Material escolar",
        "description": "Material escolar da Escola Jeitinho de Criança, no Tatuapé. A lista de cada turma é enviada pela equipe, pelo WhatsApp.",
        "blocks": [
            {"type": "h1", "text": "Material escolar"},
            {
                "type": "p",
                "text": "A lista de material muda conforme a turma, do berçário ao Jardim 2. Agenda escolar e apostilas, estas a partir do Maternal 1, fazem parte do que a escola orienta no começo do ano.",
            },
            {
                "type": "p",
                "text": "Para irmãos em turmas diferentes, a equipe separa o que vale para cada uma. A lista atualizada é passada diretamente pela escola.",
            },
            {
                "type": "ul",
                "items": [
                    "Berçário",
                    "Mini Maternal",
                    "Maternal 1",
                    "Maternal 2",
                    "Jardim 1",
                    "Jardim 2",
                ],
            },
            {
                "type": "p",
                "text": "Chame no WhatsApp, diga a turma e peça a lista do ano. O telefone da secretaria é (11) 2941-9222.",
            },
        ],
    },
    "/lp/": {
        "h1": "Conheça a escola",
        "description": "Páginas de apresentação da Escola Jeitinho de Criança: berçário e educação infantil no Tatuapé, desde 1997.",
        "blocks": [
            {"type": "h1", "text": "Conheça a escola"},
            {
                "type": "p",
                "text": "Estas páginas reúnem a apresentação da Jeitinho de Criança para famílias que estão conhecendo o berçário e a educação infantil no Tatuapé.",
            },
            {
                "type": "p",
                "text": "A escola fica na Rua Itapeti, 721, atende bebês a partir de 4 meses e crianças até cerca de 6 anos, de segunda a sexta, das 7h às 19h.",
            },
        ],
    },
    "/blog/": {
        "description": "Brincadeiras, histórias e notícias da Escola Jeitinho de Criança, berçário e educação infantil no Tatuapé.",
    },
    "/category/noticias/": {
        "description": "Notícias e ideias de atividades da Escola Jeitinho de Criança para famílias do Tatuapé e da Zona Leste.",
    },
    "/lp/valores-de-investimento/": {
        "description": "Como é o berçário e a educação infantil na Jeitinho de Criança, no Tatuapé. Condições de investimento sob consulta com a escola.",
    },
    "/lp/educacao-infantil/": {
        "description": "Educação infantil na Jeitinho de Criança, dos 18 meses aos 5 anos, com parque, horta, quadra e atividades no Tatuapé.",
    },
    "/lp/educacao-infantil-2025/": {
        "description": "Educação infantil na Jeitinho de Criança para crianças de 18 meses a 5 anos, na Rua Itapeti, no Tatuapé.",
    },
    "/lp/bercario/": {
        "description": "Berçário da Jeitinho de Criança até 18 meses, com estimulação, lactário, fraldário e dormitório no Tatuapé.",
    },
    "/lp/bercario-2025/": {
        "description": "Berçário da Jeitinho de Criança para bebês até 18 meses, na Rua Itapeti, 721, Tatuapé.",
    },
}

INVESTMENT_NOTE = {
    "type": "p",
    "text": "As condições de investimento são explicadas pela equipe, numa conversa, de acordo com a turma e o período. Chame no WhatsApp para agendar uma visita.",
}

pages = []
for page in raw["pages"]:
    page["blocks"] = drop_price_blocks(page["blocks"])
    manual = MANUAL.get(page["path"], {})
    if "blocks" in manual:
        page["blocks"] = manual["blocks"]
    if "h1" in manual:
        page["h1"] = manual["h1"]
    if page["path"] in {
        "/lp/valores-de-investimento/",
        "/lp/educacao-infantil/",
        "/lp/educacao-infantil-2025/",
        "/lp/bercario/",
        "/lp/bercario-2025/",
    }:
        page["blocks"].append(INVESTMENT_NOTE)
    if page["path"] in POST_IMAGES:
        page["image"] = POST_IMAGES[page["path"]]
    desc = manual.get("description") or page["description"]
    bad = (
        not desc
        or "Carregando" in desc
        or "Veja também" in desc
        or desc.startswith("Conteúdos recentes")
        or "Parcela" in desc
        or "R$" in desc
        or len(desc) < 50
    )
    if page["path"] == "/brincadeira-coordenacao-motora/":
        bad = True
    if bad:
        para = first_paragraph(page)
        desc = para or page["h1"] + ". Escola Jeitinho de Criança, berçário e educação infantil no Tatuapé."
    page["description"] = trim(desc)
    # titles: drop a duplicated brand suffix already handled; keep as-is if sensible
    if page["title"].endswith("| Jeitinho de Criança") is False and page["path"] != "/":
        if "Jeitinho" not in page["title"]:
            page["title"] = f"{page['title']} | Jeitinho de Criança"
    pages.append(page)

assert len(pages) == 35
blob = json.dumps(pages, ensure_ascii=False)
if "R$" in blob or "#" in blob:
    raise SystemExit("price or hashtag leaked into content")

site_ts = (
    'import type { SiteData } from "./types"\n\n'
    "export const site: SiteData = "
    + json.dumps({"pages": pages}, ensure_ascii=False, indent=2)
    + "\n"
)
(ROOT / "src/data/site.ts").write_text(site_ts)

# Redirects from archived internal links plus known legacy paths.
archived = set()
pages_dir = Path("/tmp/jeitinho/pages")
if pages_dir.exists():
    for html in pages_dir.glob("*.html"):
        text = html.read_text(errors="replace")
        for href in re.findall(r'href="(?:https?:)?(?://(?:www\.)?jeitinhodecrianca\.com\.br)?(/[^"#?]*)"', text, re.I):
            if href.startswith("//"):
                continue
            path = href if href.endswith("/") else href + "/"
            if path.startswith("/wp-") or "feed" in path and path not in {"/feed/", "/comments/feed/"}:
                continue
            archived.add(path)

extra = {
    "/feed/",
    "/comments/feed/",
    "/tour-360/",
    "/bercario-no-tatuape-analia-franco-mooca/",
    "/bercario-e-educacao-infantil-no-tatuape/",
    "/atividade-de-circuito/",
    "/alfabeto/",
    "/brincadeira-do-jacare/",
    "/brincando-com-a-caixa-de-sapato/",
    "/brincando-com-palitos/",
    "/centopeia-numerica/",
    "/numerais-6/",
    "/carimbo-com-tinta/",
    "/cores-2/",
    "/cores-3/",
    "/coordenacao-motora-3/",
    "/category/atividades/",
    "/category/atividades/bercario/",
    "/category/atividades/mini-maternal/",
    "/category/atividades/maternal-i/",
    "/category/atividades/maternal-ii/",
    "/category/atividades/jardim-i/",
    "/category/atividades/jardim-ii/",
    "/category/blog/brincadeiras/",
    "/category/blog/historias/",
    "/category/blog/brincadeiras/page/2/",
    "/category/blog/historias/page/2/",
    "/index.php/",
    "/home/",
    "/contato/",
    "/bercario/",
    "/educacao-infantil/",
    "/atividades/",
}
archived |= extra

BERCARIO = "/bercario-tatuape-analia-franco-mooca/"
EDUCACAO = "/escola-educacao-infantil-no-tatuape-mooca-carrao/"
ATIVIDADES = "/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/"
CONTATO = "/contato-escola-no-tatuape-sao-paulo/"
BLOG = "/blog/"
NOTICIAS = "/category/noticias/"


def target_for(path: str) -> str:
    specific = {
        "/tour-360/": "/tour-virtual/",
        "/bercario-no-tatuape-analia-franco-mooca/": BERCARIO,
        "/bercario-e-educacao-infantil-no-tatuape/": "/",
        "/bercario/": BERCARIO,
        "/educacao-infantil/": EDUCACAO,
        "/atividades/": ATIVIDADES,
        "/contato/": CONTATO,
        "/home/": "/",
        "/index.php/": "/",
        "/feed/": BLOG,
        "/comments/feed/": BLOG,
        "/atividade-de-circuito/": ATIVIDADES,
    }
    if path in specific:
        return specific[path]
    if path.startswith("/category/noticias"):
        return NOTICIAS
    if path.startswith("/category/blog"):
        return BLOG
    if path.startswith("/category/atividades"):
        return ATIVIDADES
    if path.startswith("/lp/"):
        return "/lp/"
    return BLOG


redirects = {}
for path in sorted(archived):
    if path in FINAL_SET or path == "/":
        continue
    dest = target_for(path)
    if dest == path or dest not in FINAL_SET:
        continue
    redirects[path] = dest

# slashless variants of every final route and every legacy path
slashless = {}
for path in list(FINAL_SET) + list(redirects):
    if path == "/":
        continue
    bare = path.rstrip("/")
    if bare in redirects or bare + "/" in FINAL_SET and bare + "/" == path:
        slashless[bare] = path if path in FINAL_SET else redirects[path]
    else:
        slashless[bare] = path if path in FINAL_SET else redirects.get(path, path)
# fix: bare of a final path should go to the final path
for path in FINAL_SET:
    if path == "/":
        continue
    slashless[path.rstrip("/")] = path
for path, dest in redirects.items():
    slashless[path.rstrip("/")] = dest

merged = {}
merged.update(redirects)
for src, dest in slashless.items():
    if src + "/" == dest or src not in FINAL_SET:
        if src != dest and not (src + "/" in FINAL_SET and dest != src + "/" and src + "/" == dest):
            pass
        if dest != src and src not in FINAL_SET and (src + "/") not in FINAL_SET:
            merged[src] = dest
        elif (src + "/") in FINAL_SET and dest == src + "/":
            merged[src] = dest

# drop identity and anything that points at a non-route
clean = {}
for src, dest in merged.items():
    if src == dest or not dest or dest not in FINAL_SET:
        continue
    if src in FINAL_SET or (src + "/") in FINAL_SET and dest != src + "/":
        # slashless finals are not in FINAL_SET; full finals must not be redirected away
        if src in FINAL_SET:
            continue
    if src in FINAL_SET:
        continue
    clean[src] = dest

lines = sorted(clean.items(), key=lambda item: item[0])
print(f"redirects {len(lines)}")

redirects_ts = (
    "export const redirects: Record<string, string> = "
    + json.dumps(dict(lines), ensure_ascii=False, indent=2)
    + "\n"
)
(ROOT / "src/data/redirects.ts").write_text(redirects_ts)

public = ROOT / "public"
public.mkdir(exist_ok=True)
netlify = []
ht = [
    "RewriteEngine On",
    "RewriteBase /",
    "RewriteCond %{HTTPS} !=on",
    "RewriteRule ^ https://jeitinhodecrianca.com.br%{REQUEST_URI} [R=301,L]",
    "RewriteCond %{HTTP_HOST} ^www\\.jeitinhodecrianca\\.com\\.br$ [NC]",
    "RewriteRule ^ https://jeitinhodecrianca.com.br%{REQUEST_URI} [R=301,L]",
]
vercel = []
for src, dest in lines:
    net_from = src if src.startswith("/") else "/" + src
    # Netlify: paths without trailing slash are written as-is
    netlify.append(f"{net_from} {dest} 301")
    pattern = src.lstrip("/")
    if pattern.endswith("/"):
        pattern = pattern[:-1] + "/?"
    ht.append(f"RewriteRule ^{pattern}$ {dest} [R=301,L]")
    vercel.append({"source": src if src.endswith("/") or "/" not in src[1:] else src, "destination": dest, "permanent": True})

# normalize vercel sources: express-style. A source of /foo (no slash) is fine.
# Sources ending with slash: vercel wants /old-path
fixed_vercel = []
seen_sources = set()
for src, dest in lines:
    source = src.rstrip("/") or "/"
    if source in seen_sources:
        continue
    seen_sources.add(source)
    fixed_vercel.append({"source": source, "destination": dest, "permanent": True})

netlify.append("/* /index.html 200")
(public / "_redirects").write_text("\n".join([
    "http://jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
    "http://www.jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
    "https://www.jeitinhodecrianca.com.br/* https://jeitinhodecrianca.com.br/:splat 301!",
    *netlify,
    "",
]))

ht.append("RewriteCond %{REQUEST_FILENAME} !-f")
ht.append("RewriteCond %{REQUEST_URI} !/$")
ht.append("RewriteRule ^(.+)$ /$1/ [R=301,L]")
ht.append("RewriteCond %{REQUEST_FILENAME} !-f")
ht.append("RewriteCond %{REQUEST_FILENAME} !-d")
ht.append("RewriteRule ^ index.html [L]")
(public / ".htaccess").write_text("\n".join(ht) + "\n")

vercel_doc = {
    "trailingSlash": True,
    "redirects": [
        {
            "source": "/:path*",
            "has": [{"type": "host", "value": "www.jeitinhodecrianca.com.br"}],
            "destination": "https://jeitinhodecrianca.com.br/:path*",
            "permanent": True,
        },
        *fixed_vercel,
    ],
}
(ROOT / "vercel.json").write_text(json.dumps(vercel_doc, ensure_ascii=False, indent=2) + "\n")

sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path in FINAL:
    sitemap.append("  <url>")
    sitemap.append(f"    <loc>https://jeitinhodecrianca.com.br{path}</loc>")
    sitemap.append("  </url>")
sitemap.append("</urlset>")
(public / "sitemap.xml").write_text("\n".join(sitemap) + "\n")
(public / "robots.txt").write_text(
    "User-agent: *\nAllow: /\n\nSitemap: https://jeitinhodecrianca.com.br/sitemap.xml\n"
)

icon = public / "images/apple-touch-icon.png"
if icon.exists():
    (public / "favicon.png").write_bytes(icon.read_bytes())
    (public / "apple-touch-icon.png").write_bytes(icon.read_bytes())

(ROOT / "scripts/redirect-count.txt").write_text(str(len(lines)) + "\n")
print("site pages", len(pages))
