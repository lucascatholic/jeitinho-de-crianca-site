export type Block =
  | { type: "h1" | "h2" | "h3" | "h4" | "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; src: string; alt: string }
  | { type: "iframe"; src: string; title: string }

export type PageKind = "home" | "page" | "lp" | "category" | "post"

export type PostGroup = "brincadeira" | "historia" | "noticia" | null

export type PageData = {
  path: string
  kind: PageKind
  title: string
  description: string
  h1: string
  group: PostGroup
  cardTitle: string | null
  image: string | null
  date: string | null
  order: number
  slugStatus: string
  blocks: Block[]
}

export type SiteData = {
  pages: PageData[]
}
