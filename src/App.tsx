import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router"
import { redirects } from "./data/redirects"
import { site } from "./data/site"
import { Layout } from "./components/Layout"
import { PageView } from "./components/PageView"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Routed() {
  const location = useLocation()
  const path =
    location.pathname === "/"
      ? "/"
      : location.pathname.endsWith("/")
        ? location.pathname
        : `${location.pathname}/`
  const page = site.pages.find((item) => item.path === path)
  if (page) return <PageView page={page} />
  const target = redirects[path] || redirects[location.pathname]
  if (target) return <Navigate to={target} replace />
  if (path !== location.pathname) return <Navigate to={`${path}${location.search}${location.hash}`} replace />
  return <NotFound />
}

function NotFound() {
  return (
    <section className="mx-auto max-w-site px-4 py-20">
      <h1 className="font-display text-4xl text-navy">Página não encontrada</h1>
      <p className="mt-4">
        O endereço não faz parte do site da Escola Jeitinho de Criança. Volte para a página inicial ou fale com a secretaria.
      </p>
      <a href="/" className="btn btn-gold mt-6">
        Ir para o início
      </a>
    </section>
  )
}

export function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<Routed />} />
      </Routes>
    </Layout>
  )
}
