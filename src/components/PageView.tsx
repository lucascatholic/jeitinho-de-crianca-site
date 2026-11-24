import { Link } from "react-router"
import type { PageData } from "../data/types"
import { site } from "../data/site"
import { MAPS_EMBED, PHONE_DISPLAY, PHONE_TEL, TOUR_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../site"
import { Blocks } from "./Blocks"
import { ContactForm, JobForm } from "./Forms"
import { HomePage } from "./HomePage"
import { Seo } from "./Seo"

const LP_LINKS = [
  ["/lp/sobre-a-escola/", "Sobre a escola"],
  ["/lp/bercario/", "Berçário"],
  ["/lp/educacao-infantil/", "Educação infantil"],
  ["/lp/bercario-2025/", "Berçário, referência recente"],
  ["/lp/educacao-infantil-2025/", "Educação infantil, referência recente"],
  ["/lp/valores-de-investimento/", "Estrutura e períodos"],
] as const

export function PageView({ page }: { page: PageData }) {
  return (
    <>
      <Seo page={page} />
      {page.path === "/" ? <HomePage /> : <Inner page={page} />}
    </>
  )
}

function Inner({ page }: { page: PageData }) {
  return (
    <>
      <section className="bg-navy px-4 py-10 text-white">
        <div className="mx-auto max-w-site">
          <p className="font-display text-sm text-petrol">Escola Jeitinho de Criança · Tatuapé</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold text-white md:text-5xl">{page.h1}</h1>
        </div>
      </section>
      <div className="mx-auto grid max-w-site gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article>
          {page.path === "/blog/" || page.path === "/category/noticias/" ? <PostGrid /> : null}
          {page.path === "/lp/" ? <LpIndex /> : null}
          {page.path === "/tour-virtual/" ? <Tour /> : null}
          {page.path !== "/blog/" && page.path !== "/category/noticias/" && page.path !== "/lp/" && page.path !== "/tour-virtual/" ? (
            <Blocks blocks={page.blocks} />
          ) : null}
          {page.path === "/contato-escola-no-tatuape-sao-paulo/" ? (
            <div className="mt-8 space-y-6">
              <ContactForm />
              <iframe
                title="Mapa da Escola Jeitinho de Criança na Rua Itapeti"
                src={MAPS_EMBED}
                className="h-72 w-full rounded-md border-0"
                loading="lazy"
              />
            </div>
          ) : null}
          {page.path === "/trabalhe-conosco/" ? (
            <div className="mt-8">
              <JobForm />
            </div>
          ) : null}
          {page.path === "/escola-infantil-na-zona-leste-de-sao-paulo/" ? (
            <iframe
              title="Mapa da Escola Jeitinho de Criança"
              src={MAPS_EMBED}
              className="mt-6 h-72 w-full rounded-md border-0"
              loading="lazy"
            />
          ) : null}
        </article>
        <aside className="h-fit rounded-md bg-mist p-5">
          <h2 className="text-lg text-navy">Visite a escola</h2>
          <p className="mt-2 text-sm">Rua Itapeti, 721, Tatuapé, São Paulo. Segunda a sexta, 7h às 19h.</p>
          <p className="mt-2 text-sm">
            <a className="font-semibold text-navy" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </p>
          <a href={WHATSAPP_URL} className="btn btn-petrol mt-4 w-full" target="_blank" rel="noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link to="/tour-virtual/" className="btn btn-gold mt-3 w-full">
            Tour 360°
          </Link>
        </aside>
      </div>
    </>
  )
}

function Tour() {
  return (
    <div className="space-y-4">
      <p>
        Conheça agora, em um tour virtual interativo 360°, os espaços do berçário e da escola de educação infantil Jeitinho de Criança.
      </p>
      <iframe
        src={TOUR_URL}
        title="Tour virtual 360° da Escola Jeitinho de Criança"
        className="h-[70vh] min-h-[420px] w-full rounded-md border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr; fullscreen"
        allowFullScreen
      />
    </div>
  )
}

function PostGrid() {
  const posts = site.pages
    .filter((page) => page.kind === "post")
    .slice()
    .sort((a, b) => a.order - b.order)
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <Link key={post.path} to={post.path} className="overflow-hidden rounded-md border border-slate-200">
          {post.image ? <img src={post.image} alt="" className="h-44 w-full object-cover" /> : null}
          <span className="block p-4">
            {post.date ? <span className="text-xs uppercase tracking-wide text-neutral-500">{formatDate(post.date)}</span> : null}
            <span className="mt-1 block font-display text-lg font-bold text-navy">{post.cardTitle || post.h1}</span>
            <span className="mt-2 block text-sm">{post.description}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-")
  if (!day) return iso
  return `${day}/${month}/${year}`
}

function LpIndex() {
  return (
    <div className="space-y-6">
      <p>
        Estas páginas reúnem a apresentação da Jeitinho de Criança para famílias que estão conhecendo o berçário e a educação infantil no Tatuapé. A escola fica na Rua Itapeti, 721, atende bebês a partir de 4 meses e crianças até cerca de 6 anos, de segunda a sexta, das 7h às 19h.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {LP_LINKS.map(([href, label]) => (
          <li key={href}>
            <Link to={href} className="block rounded-md border border-slate-200 p-4 font-display font-bold text-navy hover:border-petrol">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

