import { useState, type ReactNode } from "react"
import { Link, NavLink } from "react-router"
import {
  ADDRESS,
  GOOGLE_MAPS_URL,
  LOGO,
  MAPS_EMBED,
  MENU,
  PHONE_DISPLAY,
  PHONE_TEL,
  WAZE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "../site"

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2"
      >
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="shrink-0" aria-label="Jeitinho de Criança, página inicial">
            <img
              src={LOGO}
              alt="Jeitinho de Criança"
              width={307}
              height={50}
              className="h-9 w-auto md:h-12"
            />
          </Link>
          <nav className="hidden items-center gap-4 lg:flex" aria-label="Principal">
            {MENU.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-display text-[13px] font-semibold ${isActive ? "text-petrol" : "text-navy hover:text-petrol"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 xl:flex">
            <Social />
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-navy/15 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Abrir menu</span>
            <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        {open ? (
          <div id="menu-mobile" className="border-t border-slate-100 bg-navy px-4 py-6 lg:hidden">
            <nav className="flex flex-col items-center gap-4" aria-label="Mobile">
              {MENU.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-lg font-semibold text-white"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <div className="bg-navy px-4 py-5 text-white">
        <p className="text-center font-display text-lg font-bold md:text-2xl">Matrículas abertas</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <Link to="/bercario-tatuape-analia-franco-mooca/" className="btn btn-outline">
            Berçário
          </Link>
          <Link to="/escola-educacao-infantil-no-tatuape-mooca-carrao/" className="btn btn-outline">
            Educação Infantil
          </Link>
        </div>
      </div>

      <main id="conteudo">{children}</main>

      <footer className="bg-navy text-white">
        <div className="mx-auto grid max-w-site gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-lg text-gold">Saiba mais</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link to="/" className="hover:text-gold">Home</Link></li>
              <li><Link to="/bercario-tatuape-analia-franco-mooca/" className="hover:text-gold">Berçário</Link></li>
              <li><Link to="/escola-educacao-infantil-no-tatuape-mooca-carrao/" className="hover:text-gold">Educação Infantil</Link></li>
              <li><Link to="/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/" className="hover:text-gold">Atividades</Link></li>
              <li><Link to="/blog/" className="hover:text-gold">Blog</Link></li>
              <li><Link to="/escola-infantil-na-zona-leste-de-sao-paulo/" className="hover:text-gold">Localização</Link></li>
              <li><Link to="/trabalhe-conosco/" className="hover:text-gold">Trabalhe conosco</Link></li>
              <li><Link to="/contato-escola-no-tatuape-sao-paulo/" className="hover:text-gold">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg text-gold">Onde estamos</h2>
            <p className="mt-3 text-sm leading-relaxed">{ADDRESS}</p>
            <p className="mt-2 text-sm">
              <a className="underline decoration-gold/70" href={WAZE_URL} target="_blank" rel="noreferrer">Vá com Waze</a>
              <br />
              <a className="underline decoration-gold/70" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Vá com Google Maps</a>
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-gold">Entre em contato</h2>
            <p className="mt-3 text-sm">Segunda a sexta | 7h às 19h</p>
            <p className="text-sm">
              Telefone: <a className="underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </p>
            <p className="text-sm">
              WhatsApp: <a className="underline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{WHATSAPP_DISPLAY}</a>
            </p>
            <div className="mt-3">
              <Social />
            </div>
          </div>
          <div>
            <iframe
              title="Mapa da Escola Jeitinho de Criança na Rua Itapeti, 721, Tatuapé"
              src={MAPS_EMBED}
              className="h-48 w-full rounded border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="bg-[#121a30] px-4 py-4 text-center text-sm text-white/80">
          Copyright 2026 - Escola Jeitinho de Criança
        </div>
      </footer>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-display text-sm font-bold text-white shadow-lg"
        aria-label="Chamar no WhatsApp para agendar uma visita"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
        </svg>
        <span className="hidden sm:inline">Agende uma visita</span>
      </a>
    </div>
  )
}

function Social() {
  const items = [
    {
      label: "Facebook",
      href: "https://facebook.com/jeitinhodecrianca",
      path: "M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/escolajeitinhodecrianca/",
      path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.2 7.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/user/escolajeitinho",
      path: "M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3z",
    },
  ]
  return (
    <ul className="flex gap-2">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-petrol text-navy"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
              <path d={item.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
