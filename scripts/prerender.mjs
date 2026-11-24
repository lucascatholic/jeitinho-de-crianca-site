import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const template = fs.readFileSync(path.join(root, "dist/index.html"), "utf8")
const serverFile = path.join(root, ".ssr/entry-server.js")
const { render } = await import(pathToFileURL(serverFile).href)

function splitHead(html) {
  let head = ""
  let body = html
  const tag = /^((?:<title>[\s\S]*?<\/title>|<meta\s[^>]*\/>|<link\s[^>]*\/>))/
  while (tag.test(body)) {
    const match = body.match(tag)
    head += `${match[1]}\n`
    body = body.slice(match[1].length)
  }
  return { head, body }
}

const siteSource = fs.readFileSync(path.join(root, "src/data/site.ts"), "utf8")
const paths = [...siteSource.matchAll(/"path": "([^"]+)"/g)].map((match) => match[1])
if (paths.length !== 35) {
  console.error(`Esperava 35 rotas, encontrei ${paths.length}`)
  process.exit(1)
}

const failures = []
for (const route of paths) {
  const { html } = render(route)
  const { head, body } = splitHead(html)
  const page = template.replace("<!--head-->", head).replace("<!--app-->", body)
  const file =
    route === "/"
      ? path.join(root, "dist/index.html")
      : path.join(root, "dist", route.slice(1), "index.html")
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)

  const problems = []
  if (!page.includes("<title>")) problems.push("title")
  if (!page.includes('name="description"')) problems.push("description")
  if (!page.includes(`rel="canonical" href="https://jeitinhodecrianca.com.br${route}"`)) problems.push("canonical")
  if (!page.includes('property="og:title"')) problems.push("og:title")
  if (!page.includes('property="og:description"')) problems.push("og:description")
  if (!page.includes('property="og:image"')) problems.push("og:image")
  if (page.includes("R$")) problems.push("preço")
  const h1 = page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  if (!h1 || h1[1].replace(/<[^>]+>/g, "").trim().length < 3) problems.push("h1 vazio")
  if (route === "/" && !page.includes("LocalBusiness")) problems.push("json-ld")
  if (route === "/" && !page.includes("School")) problems.push("json-ld school")
  if (problems.length) failures.push(`${route}: ${problems.join(", ")}`)
  else console.log(`OK ${route}`)
}

const sitemap = fs.readFileSync(path.join(root, "dist/sitemap.xml"), "utf8")
const locs = sitemap.match(/<loc>/g)?.length ?? 0
if (locs !== 35) failures.push(`sitemap com ${locs} URLs`)
for (const file of ["_redirects", ".htaccess", "robots.txt", "sitemap.xml"]) {
  if (!fs.existsSync(path.join(root, "dist", file))) failures.push(`dist/${file} ausente`)
}
if (!fs.existsSync(path.join(root, "vercel.json"))) failures.push("vercel.json ausente")

console.log(`ROUTE CHECK: ${paths.length - failures.length}/${paths.length}`)
if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
