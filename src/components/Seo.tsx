import type { PageData } from "../data/types"
import { OG_IMAGE, PHONE_TEL, SITE } from "../site"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["School", "LocalBusiness"],
  name: "Escola Jeitinho de Criança",
  description:
    "Berçário e educação infantil no Tatuapé, São Paulo, desde 1997. Atende bebês e crianças dos 4 meses aos 6 anos.",
  url: `${SITE}/`,
  image: `${SITE}${OG_IMAGE}`,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Itapeti, 721",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "03324-002",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.550508,
    longitude: -46.566591,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.instagram.com/escolajeitinhodecrianca/",
    "https://facebook.com/jeitinhodecrianca",
    "https://www.youtube.com/user/escolajeitinho",
  ],
}

export function Seo({ page }: { page: PageData }) {
  const canonical = `${SITE}${page.path}`
  const image = `${SITE}${page.path === "/" ? OG_IMAGE : page.image || OG_IMAGE}`
  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Escola Jeitinho de Criança" />
      <meta property="og:type" content={page.kind === "post" ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />
      {page.path === "/" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </>
  )
}
