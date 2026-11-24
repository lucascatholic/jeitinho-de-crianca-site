import { Link } from "react-router"
import type { PageData } from "../data/types"
import { site } from "../data/site"
import { HERO, YOUTUBE_URL } from "../site"

const HOME_NEWS = [
  "/semana-das-criancas-dia-das-fantasias-na-escola-jeitinho-de-crianca/",
  "/semana-das-criancas-dia-dos-cabelos-malucos-na-escola-jeitinho-de-crianca/",
  "/adaptacao-no-bercario-quanto-tempo-dura-o-choro-e-quando-se-preocupar/",
  "/blog-por-que-escolas-tatuape-custam-mais-caro/",
] as const

const REVIEWS = [
  ["Escola Maravilhosa! Super recomendo! Meus filhos foram felizes nela e eu também!", "Ana"],
  ["Escola acolhedora, organizada, que tratam as crianças com carinho e respeito! Meus filhos vão e voltam felizes!", "Andressa Moraes Lopes"],
  ["Melhor escola da região. Mega humanizado, não me imagino com a minha filha em outra escola.", "Renan Colferai"],
  ["Ótima escola, profissionais comprometidos com o cuidado e educação dos pequenos! Deixo meu príncipe todos os dias com a certeza de que vai estar em boas mãos!", "Marcela Hellmeister"],
  ["Escola boa, profissionais atenciosos e dedicados!", "Renato Bertuolo"],
  ["Meu filho ama tanto a escola que muitas vezes não quer ir embora. Não tem melhor avaliação do que a dele.", "Christiane Bertoldo"],
  ["Acho que toda mãe tem medo na hora de colocar o filho na escola, mas depois de muito pesquisar, visitar todo tipo de escola na região, a que ganhou meu coração foi a Jeitinho de Criança. Faz quase 1 mês que meu pequeno está frequentando a escola e estou vendo ele se desenvolver muito mais nesse tempo. Agradeço o carinho que as diretoras e professores têm conosco.", "Helena Reizauskas"],
  ["Há mais de cinco anos confio e admiro a dedicação de toda a equipe Jeitinho de Criança. Meus dois filhos estão lá desde os 5 meses de idade, e todas as etapas, desde o leite materno, depois as papinhas, os primeiros passinhos e as primeiras letrinhas, sempre foram divididas com grande alegria entre nós. Vocês são extensão da minha casa. Obrigado de coração!", "Elaine Padilha"],
  ["O lugar que deixo meu filho e saio com o coração tranquilo todos os dias. Profissionais super especiais que além de talentosos são muito humanos, cuidam das nossas crianças com muito amor e carinho.", "Juliana Castro"],
] as const

const HIGHLIGHTS = [
  "1.600 m² de área, incluindo parque, horta e jardim",
  "Ampla quadra poliesportiva",
  "Salas ambiente, que permitem a circulação pela escola a cada atividade desenvolvida",
  "Metodologia inspirada em diversas linhas educacionais, em que a criança aprende brincando, sempre motivada a interagir, questionar, planejar, sugerir, solucionar problemas e superar dificuldades",
  "Atividades extracurriculares como ballet, futebol, judô, funcional kids e inglês, entre outras",
]

function byPath(path: string) {
  return site.pages.find((page) => page.path === path)
}

function excerpt(page: PageData) {
  const paragraph = page.blocks.find((block) => block.type === "p" && block.text.length > 40)
  if (!paragraph || paragraph.type !== "p") return page.description
  return paragraph.text.length > 140 ? `${paragraph.text.slice(0, 140).trim()}…` : paragraph.text
}

export function HomePage() {
  return (
    <>
      <section
        className="relative flex min-h-[70vh] items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO})` }}
      >
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-site px-4 py-16 text-center text-white drop-shadow-md">
          <p className="font-display text-4xl font-bold md:text-6xl">Educação com afeto</p>
          <p className="mt-3 font-display text-xl md:text-3xl">Desde 1997 fazendo a diferença na educação</p>
          <p className="mt-2 text-base md:text-lg">Conheça nosso método de ensino.</p>
          <div className="mx-auto mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-wide">Até 18 meses</p>
              <Link to="/bercario-tatuape-analia-franco-mooca/" className="btn btn-petrol mt-2 w-full">
                Berçário
              </Link>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide">De 18 meses a 5 anos</p>
              <Link to="/escola-educacao-infantil-no-tatuape-mooca-carrao/" className="btn btn-petrol mt-2 w-full">
                Educação Infantil
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-site items-center gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <hr className="rule mb-4" />
          <h1 className="text-lg font-semibold text-navy md:text-xl">
            Berçário e Escola de Educação Infantil no Tatuapé
          </h1>
          <p className="mt-2 font-display text-4xl font-bold text-navy md:text-5xl">Escola Jeitinho de Criança</p>
          <p className="mt-4 text-lg">
            Educação com afeto. Localizada no Tatuapé, próxima aos bairros do Anália Franco, Carrão e Mooca, na Zona Leste de São Paulo, desde 1997, a Escola Jeitinho de Criança tem a proposta de fazer a diferença na primeira infância do seu filho, afinal, é a fase mais importante para o desenvolvimento, quando as experiências vividas serão levadas para o resto da vida.
          </p>
          <p className="mt-4">
            A Escola Jeitinho de Criança, referência em berçário e educação infantil no Tatuapé e região, entende que cada criança é única e tem o seu jeitinho. Por isso trabalha com o conceito de individualidade, respeitando seu tempo e suas restrições, em um ambiente lúdico e acolhedor para bebês e crianças, dos 4 meses aos 6 anos de idade.
          </p>
        </div>
        <div className="grid gap-4">
          <img src="/images/shantala-no-analia-franco.jpg" alt="Shantala no berçário da Jeitinho de Criança" className="rounded-md object-cover" />
          <img src="/images/sala-de-aula-escola-tatuape.jpg" alt="Sala de aula da educação infantil no Tatuapé" className="rounded-md object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-site items-stretch gap-6 px-4 pb-14 md:grid-cols-3">
        <div className="md:col-span-2">
          <iframe
            className="aspect-video w-full rounded-md"
            src={YOUTUBE_URL}
            title="Conheça a Escola Jeitinho de Criança"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex flex-col justify-center bg-navy p-6 text-white">
          <h2 className="font-display text-xl text-gold">Conheça a nossa escola</h2>
          <p className="mt-3 text-lg">
            Neste vídeo, você pode conhecer um pouco mais de perto o berçário e a escola de educação infantil Jeitinho de Criança.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-site items-center gap-8 px-4 pb-14 md:grid-cols-2">
        <ul className="space-y-4">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="border-t-4 border-petrol pt-3 font-display text-lg font-semibold text-navy md:text-xl">
              {item}
            </li>
          ))}
        </ul>
        <div className="grid gap-4">
          <img src="/images/escola-educacao-infantil-tatuape.jpg" alt="Escola de educação infantil no Tatuapé" className="rounded-md" />
          <img src="/images/horta-infantil-no-tatuape-sp.jpg" alt="Horta da escola no Tatuapé" className="rounded-md" />
        </div>
      </section>

      <section className="bg-mist py-10 text-center">
        <Link to="/tour-virtual/" className="btn btn-gold text-base">
          Tour 360°
        </Link>
      </section>

      <section className="mx-auto max-w-site px-4 py-14">
        <h2 className="font-display text-3xl text-navy">O que estão falando sobre a escola</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {REVIEWS.map(([text, name]) => (
            <figure key={name} className="rounded-md border border-slate-200 p-4">
              <blockquote className="text-[15px]">{text}</blockquote>
              <figcaption className="mt-3 font-display text-sm font-bold text-navy">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <PostBand title="Notícias" more="/category/noticias/" moreLabel="Ver as notícias" paths={HOME_NEWS} />
    </>
  )
}

function PostBand({
  title,
  more,
  moreLabel,
  paths,
  muted = false,
}: {
  title: string
  more: string
  moreLabel: string
  paths: readonly string[]
  muted?: boolean
}) {
  return (
    <section className={muted ? "bg-mist py-12" : "py-12"}>
      <div className="mx-auto max-w-site px-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-navy">{title}</h2>
          <Link to={more} className="font-display text-sm font-bold text-navy underline decoration-petrol">
            {moreLabel}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => {
            const page = byPath(path)
            if (!page) return null
            return (
              <Link key={path} to={path} className="group overflow-hidden rounded-md bg-white shadow-sm">
                {page.image ? (
                  <img src={page.image} alt="" className="h-36 w-full object-cover" />
                ) : null}
                <span className="block p-3 font-display text-sm font-bold text-navy group-hover:text-petrol">
                  {page.cardTitle || page.h1}
                </span>
                <span className="block px-3 pb-4 text-sm">{excerpt(page)}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
