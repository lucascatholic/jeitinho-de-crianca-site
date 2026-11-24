# Escola Jeitinho de Criança

Site da Escola Jeitinho de Criança, berçário e educação infantil na Rua Itapeti, 721, Tatuapé, São Paulo. Texto em português do Brasil. Endereço público: [jeitinhodecrianca.com.br](https://jeitinhodecrianca.com.br/).

O conteúdo segue o pacote de 24/11/2026 (páginas ao vivo de agosto a novembro de 2026). Não há preços.

## Como rodar

```bash
npm install
npm run dev
npm run build
```

`npm run build` gera `dist/` com um HTML por rota e confere as 35 páginas. Sem navegador headless.

## Ligar ao Lovable e ao GitHub

O projeto é Vite, React, TypeScript, Tailwind e React Router, com `src/`, `public/`, `index.html` e `npm run build` gerando `dist/`.

1. Crie o repositório GitHub a partir deste projeto.
2. No Lovable, conecte esse repositório. O Lovable publica o resultado de `npm run build`.
3. Não troque o build: o pré-render das rotas está dentro de `npm run build`.

## Apontar o domínio

1. No host (Lovable, Netlify, Vercel ou Apache), adicione `jeitinhodecrianca.com.br` e o `www`.
2. No DNS, aponte o apex e o `www` para o destino que o host indicar. Não apague MX se o e-mail continuar no domínio.
3. O canonical de cada página é `https://jeitinhodecrianca.com.br` + o caminho, com barra no final.
4. Os 301 estão em `public/_redirects` (Netlify), `vercel.json` (Vercel) e `public/.htaccess` (Apache). O roteador React repete as mesmas regras quando o host entrega o `index.html`.

Telefone (11) 2941-9222. WhatsApp (11) 94134-9222. Contato e trabalhe conosco abrem o WhatsApp. Não há backend.

## Checagem

`npm run build` passou com **35/35**. Sitemap só com essas rotas. Nenhum HTML contém `R$`.

## Ajustes em relação ao zip

- `redirects.json` tinha 237 regras. Uma delas mandava `/pesquisa-2022/` para a home, mas essa página está em `routes.json`. Ela foi retirada para a página continuar no ar. Ficaram **236** redirects.
- Onze regras de `/courses/...` apontavam para `/category/atividades/`, que não existe mais. O destino passou a ser `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/`.
- Nenhuma rota ao vivo é origem de redirect. Todo destino existe.
- Os 15 posts de julho (brincadeiras, histórias e notícias de 2020) saíram do site. As URLs deles estão nos redirects e caem em `/category/noticias/`.
- Posts com `slug_status: not_found` usam o caminho sugerido. Não são URLs históricas confirmadas:
  - `/semana-das-criancas-dia-dos-esportes-na-escola-jeitinho-de-crianca/`
  - `/da-horta-para-a-cozinha-uma-experiencia-cheia-de-descobertas/`
  - `/cha-literario-na-escola-jeitinho-de-crianca/`
  - `/mensagem-do-maternal-i-para-as-mamaes/`
  - `/feliz-dia-das-maes/`
  - `/as-criancas-aprendem-muito-atraves-da-imaginacao/`
  - `/post-instagram-dco2thnfqnc/` entrou só com as cinco fotos. O pacote não tinha título nem texto utilizáveis, então a página se chama Registros da escola.
- Os posts sem data no pacote (esportes, horta, chá literário e o álbum de fotos) ficam no blog depois dos posts datados de 14 e 15/10/2026 e antes de setembro, porque fazem parte da mesma leva de outubro.

## Rotas

- `/` — Berçário e Educação Infantil no Tatuapé | Escola Jeitinho de Criança
- `/bercario-tatuape-analia-franco-mooca/` — Jeitinho de Criança | Berçário no Tatuapé, Anália Franco e Mooca
- `/escola-educacao-infantil-no-tatuape-mooca-carrao/` — Jeitinho de Criança | Escola de Educação Infantil no Tatuapé
- `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` — Jeitinho de Criança | Escola, Atividades e Recreação no Tatuapé
- `/contato-escola-no-tatuape-sao-paulo/` — Jeitinho de Criança | Contato, Telefone, Whatsapp e Endereço
- `/escola-infantil-na-zona-leste-de-sao-paulo/` — Escola Infantil na Zona Leste de São Paulo
- `/trabalhe-conosco/` — Vagas de emprego em escola no Tatuapé
- `/blog/` — Blog | Jeitinho de Criança
- `/tour-virtual/` — Tour Virtual 360 | Berçário e Escola Jeitinho de Criança
- `/material-escolar/` — Material Escolar | Jeitinho de Criança
- `/lp/` — Landing Pages | Jeitinho de Criança
- `/lp/sobre-a-escola/` — Sobre a Escola | Jeitinho de Criança
- `/lp/bercario/` — Berçário | 2024 | Jeitinho de Criança
- `/lp/bercario-2025/` — Berçário | 2025 | Jeitinho de Criança
- `/lp/educacao-infantil/` — Educação Infantil | 2024 | Jeitinho de Criança
- `/lp/educacao-infantil-2025/` — Educação Infantil | 2025 | Jeitinho de Criança
- `/lp/valores-de-investimento/` — Valores de Investimento | Jeitinho de Criança
- `/ig/` — Instagram | Jeitinho de Criança
- `/pesquisa-2022/` — Pesquisa 2022 | Jeitinho de Criança
- `/category/noticias/` — Notícias | Jeitinho de Criança
- `/semana-das-criancas-dia-das-fantasias-na-escola-jeitinho-de-crianca/` — Semana das Crianças: dia das fantasias na Escola Jeitinho de Criança
- `/semana-das-criancas-dia-dos-cabelos-malucos-na-escola-jeitinho-de-crianca/` — Semana das Crianças: dia dos cabelos malucos na Escola Jeitinho de Criança
- `/adaptacao-no-bercario-quanto-tempo-dura-o-choro-e-quando-se-preocupar/` — Adaptação no berçário: quanto tempo dura o choro e quando se preocupar?
- `/blog-por-que-escolas-tatuape-custam-mais-caro/` — Por que algumas escolas da mesma região de São Paulo custam mais caro que outras?
- `/matricula-bercario-educacao-infantil-tatuape-2027/` — Berçário e Educação Infantil no Tatuapé: quando matricular para 2027 e o que perguntar antes de decidir
- `/arraia-da-jeitinho-de-crianca-festa-junina-mais-aguardada-do-ano/` — Arraiá da Jeitinho de Criança: a Festa Junina mais aguardada do ano
- `/10-mil-seguidores-obrigado-escola-jeitinho-de-crianca/` — 10 mil seguidores: obrigado por crescer junto com a Escola Jeitinho de Criança
- `/o-que-as-familias-sentem-pela-escola-jeitinho-de-crianca/` — O que as famílias sentem pela Escola Jeitinho de Criança
- `/semana-das-criancas-dia-dos-esportes-na-escola-jeitinho-de-crianca/` — Semana das Crianças: dia dos esportes na Escola Jeitinho de Criança (caminho sugerido, não histórico)
- `/da-horta-para-a-cozinha-uma-experiencia-cheia-de-descobertas/` — Da horta para a cozinha, uma experiência cheia de descobertas (caminho sugerido, não histórico)
- `/cha-literario-na-escola-jeitinho-de-crianca/` — Chá Literário na Escola Jeitinho de Criança (caminho sugerido, não histórico)
- `/post-instagram-dco2thnfqnc/` — Registros da Escola Jeitinho de Criança (caminho sugerido, não histórico)
- `/mensagem-do-maternal-i-para-as-mamaes/` — Nossos pequenos do maternal I também têm uma mensagem para as mamães (caminho sugerido, não histórico)
- `/feliz-dia-das-maes/` — Feliz Dia das Mães! (caminho sugerido, não histórico)
- `/as-criancas-aprendem-muito-atraves-da-imaginacao/` — Você sabia? As crianças aprendem muito através de sua imaginação (caminho sugerido, não histórico)

## Posts no blog e em Notícias, do mais novo ao mais antigo

- `/o-que-as-familias-sentem-pela-escola-jeitinho-de-crianca/` — 2026-11-09 — O que as famílias sentem pela Escola Jeitinho de Criança
- `/10-mil-seguidores-obrigado-escola-jeitinho-de-crianca/` — 2026-10-30 — 10 mil seguidores: obrigado por crescer junto com a Escola Jeitinho de Criança
- `/arraia-da-jeitinho-de-crianca-festa-junina-mais-aguardada-do-ano/` — 2026-10-29 — Arraiá da Jeitinho de Criança: a Festa Junina mais aguardada do ano
- `/semana-das-criancas-dia-das-fantasias-na-escola-jeitinho-de-crianca/` — 2026-10-15 — Semana das Crianças: dia das fantasias na Escola Jeitinho de Criança
- `/semana-das-criancas-dia-dos-cabelos-malucos-na-escola-jeitinho-de-crianca/` — 2026-10-14 — Semana das Crianças: dia dos cabelos malucos na Escola Jeitinho de Criança
- `/semana-das-criancas-dia-dos-esportes-na-escola-jeitinho-de-crianca/` — sem data no pacote — Semana das Crianças: dia dos esportes na Escola Jeitinho de Criança
- `/da-horta-para-a-cozinha-uma-experiencia-cheia-de-descobertas/` — sem data no pacote — Da horta para a cozinha, uma experiência cheia de descobertas
- `/cha-literario-na-escola-jeitinho-de-crianca/` — sem data no pacote — Chá Literário na Escola Jeitinho de Criança
- `/post-instagram-dco2thnfqnc/` — sem data no pacote — Registros da escola
- `/adaptacao-no-bercario-quanto-tempo-dura-o-choro-e-quando-se-preocupar/` — 2026-09-08 — Adaptação no berçário: quanto tempo dura o choro e quando se preocupar?
- `/blog-por-que-escolas-tatuape-custam-mais-caro/` — 2026-09-01 — Por que algumas escolas da mesma região de São Paulo custam mais caro que outras?
- `/matricula-bercario-educacao-infantil-tatuape-2027/` — 2026-08-15 — Berçário e Educação Infantil no Tatuapé: quando matricular para 2027 e o que perguntar antes de decidir
- `/as-criancas-aprendem-muito-atraves-da-imaginacao/` — 2023-05-24 — Você sabia? As crianças aprendem muito através de sua imaginação
- `/feliz-dia-das-maes/` — 2023-05-14 — Feliz Dia das Mães!
- `/mensagem-do-maternal-i-para-as-mamaes/` — 2023-05-12 — Nossos pequenos do maternal I também têm uma mensagem para as mamães

## Redirects 301

| De | Para |
| --- | --- |
| `/category/atividades/bercario/page/2/` | `/category/noticias/` |
| `/category/atividades/jardim-i/page/2/` | `/category/noticias/` |
| `/category/atividades/jardim-ii/page/2/` | `/category/noticias/` |
| `/category/atividades/maternal-i/page/2/` | `/category/noticias/` |
| `/category/atividades/maternal-i/page/3/` | `/category/noticias/` |
| `/category/atividades/maternal-ii/page/2/` | `/category/noticias/` |
| `/category/atividades/mini-maternal/page/2/` | `/category/noticias/` |
| `/category/atividades/page/2/` | `/category/noticias/` |
| `/category/atividades/page/3/` | `/category/noticias/` |
| `/category/atividades/page/4/` | `/category/noticias/` |
| `/category/atividades/page/6/` | `/category/noticias/` |
| `/category/blog/brincadeiras/page/2/` | `/category/noticias/` |
| `/category/blog/historias/page/2/` | `/category/noticias/` |
| `/lesson-category/bercario/` | `/category/noticias/` |
| `/lesson-category/bercario/page/3/` | `/category/noticias/` |
| `/lesson-category/jardim-i/` | `/category/noticias/` |
| `/lesson-category/jardim-ii/` | `/category/noticias/` |
| `/lesson-category/maternal-i/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/2/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/3/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/4/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/40/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/5/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/6/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/7/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/8/` | `/category/noticias/` |
| `/lesson-category/maternal-i/page/9/` | `/category/noticias/` |
| `/lesson-category/maternal-ii/` | `/category/noticias/` |
| `/lesson-category/maternal-ii/page/2/` | `/category/noticias/` |
| `/lesson-category/maternal-ii/page/3/` | `/category/noticias/` |
| `/lesson-category/maternal-ii/page/30/` | `/category/noticias/` |
| `/lesson-category/maternal-ii/page/4/` | `/category/noticias/` |
| `/lesson-category/mini-maternal/` | `/category/noticias/` |
| `/index.php/` | `/` |
| `/index.php/atividade-infantil-tatuape-analia-franco/` | `/` |
| `/index.php/atividades-para-criancas-tatuape-analia-franco-mooca/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades-para-criancas-tatuape-analia-franco-mooca/ballet/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades-para-criancas-tatuape-analia-franco-mooca/capoeira/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades-para-criancas-tatuape-analia-franco-mooca/ingles/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades/ballet/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades/capoeira/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/atividades/ingles/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/alimentacao/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/brinquedoteca/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/fraldario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/lactario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/sala-de-estimulacao/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/sala-do-soninho/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/shantala/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco-mooca/solario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario-tatuape-analia-franco/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/alimentacao/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/brinquedoteca/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/fraldario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/lactario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/sala-de-estimulacao/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/sala-do-soninho/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/shantala/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/bercario/solario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/index.php/component/users/` | `/` |
| `/index.php/contato-escola-tatuape-analia-franco/` | `/contato-escola-no-tatuape-sao-paulo/` |
| `/index.php/contato/` | `/contato-escola-no-tatuape-sao-paulo/` |
| `/index.php/educacao-infantil-tatuape-analia-franco/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/artes/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/culinaria/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/danca/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/educacao-fisica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/jardinagem-e-horta/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/musica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/parque/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/sala-de-linguagem/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/educacao-infantil/sala-de-matematica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escola-educacao-infantil-escolinha-tatuape-analia-franco-mooca/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/artes/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/culinaria/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/danca/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/educacao-fisica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/jardinagem-e-horta/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/musica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/parque/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/sala-de-linguagem/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/escolinha-educacao-infantil-no-tatuape/sala-de-matematica/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/index.php/informacoes-bebes-e-criancas/` | `/` |
| `/index.php/informacoes-bebes-e-criancas/item/amamentacao-dez-10-dicas-para-amamentar/` | `/` |
| `/index.php/informacoes-bebes-e-criancas/item/criancas-com-menos-de-6-anos-nao-podem-ser-matriculadas-no-ensino-fundamental-reafirma-o-stj/` | `/` |
| `/index.php/informacoes-bebes-e-criancas/item/dia-mundial-da-agua/` | `/` |
| `/index.php/informacoes-bebes-e-criancas/item/habitos-orais-nocivos/` | `/` |
| `/index.php/informacoes-bebes-e-criancas/item/quantas-horas-seu-filho-precisa-dormir-por-dia/` | `/` |
| `/index.php/proposta-pedagogica/` | `/lp/sobre-a-escola/` |
| `/index.php/quem-somos/` | `/lp/sobre-a-escola/` |
| `/courses/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/2021-jardim-i/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/2021-jardim-ii/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/2021-maternal-i/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/2021-maternal-ii/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/bercario/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/jardim-i/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/jardim-ii/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/maternal-i/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/maternal-ii/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/courses/mini-maternal/` | `/atividades-e-recreacao-para-criancas-tatuape-analia-franco-mooca/` |
| `/lp/bercario-2022/` | `/lp/bercario-2025/` |
| `/lp/bercario-2023/` | `/lp/bercario-2025/` |
| `/lp/educacao-infantil-2022/` | `/lp/educacao-infantil-2025/` |
| `/lp/educacao-infantil-2023/` | `/lp/educacao-infantil-2025/` |
| `/bercario-e-educacao-infantil-no-tatuape/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/bercario-no-tatuape-analia-franco-mooca/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/caixa-de-tesouro/` | `/category/noticias/` |
| `/comunicado-03-abril-2020/` | `/category/noticias/` |
| `/escola-educacao-infantil-no-tatuape-analia-franco-mooca/` | `/escola-educacao-infantil-no-tatuape-mooca-carrao/` |
| `/eventos/2017-festa-junina-para-criancas-no-tatuape/` | `/category/noticias/` |
| `/formatura-2020/` | `/category/noticias/` |
| `/rematricula-edi2021-trnc/` | `/category/noticias/` |
| `/categoria-produto/material-escolar-2020/` | `/material-escolar/` |
| `/categoria-produto/material-escolar-2021/` | `/material-escolar/` |
| `/sobre/` | `/lp/sobre-a-escola/` |
| `/bercario/` | `/bercario-tatuape-analia-franco-mooca/` |
| `/educacao-infantil/` | `/lp/educacao-infantil/` |
| `/contato/` | `/contato-escola-no-tatuape-sao-paulo/` |
| `/noticias/` | `/category/noticias/` |
| `/rdgf_integrations/tour-360/` | `/tour-virtual/` |
| `/tour-360/` | `/tour-virtual/` |
| `/10-brincadeiras-para-fazer-em-casa-com-criancas-de-2-a-3-anos/` | `/category/noticias/` |
| `/12-brincadeiras-para-tornar-a-pascoa-divertida-para-criancas-dentro-de-casa/` | `/category/noticias/` |
| `/a-casa-sonolenta/` | `/category/noticias/` |
| `/a-corda-magina/` | `/category/noticias/` |
| `/a-formiga-e-o-gafanhoto/` | `/category/noticias/` |
| `/a-grande-boca-do-sapo/` | `/category/noticias/` |
| `/a-historia-do-tatu/` | `/category/noticias/` |
| `/a-poluicao-tem-solucao/` | `/category/noticias/` |
| `/acerte-o-copo/` | `/category/noticias/` |
| `/alfabeto/` | `/category/noticias/` |
| `/atividade-de-circuito/` | `/category/noticias/` |
| `/atividades-para-as-criancas-durante-a-quarentena-do-coronavirus-covid-19/` | `/category/noticias/` |
| `/atividades-que-estimulam-a-coordenacao-motora-do-seu-bebe/` | `/category/noticias/` |
| `/brincadeira-arremesso-com-os-pes/` | `/category/noticias/` |
| `/brincadeira-bexiga-sensorial/` | `/category/noticias/` |
| `/brincadeira-brincando-com-funil/` | `/category/noticias/` |
| `/brincadeira-brincando-de-empilhar/` | `/category/noticias/` |
| `/brincadeira-coordenacao-motora/` | `/category/noticias/` |
| `/brincadeira-desenho-com-furinhos/` | `/category/noticias/` |
| `/brincadeira-desgrude-o-palito/` | `/category/noticias/` |
| `/brincadeira-do-jacare/` | `/category/noticias/` |
| `/brincadeira-equilibrando-a-bolinha/` | `/category/noticias/` |
| `/brincadeira-que-tal-rasgar-papel/` | `/category/noticias/` |
| `/brincadeira-rede-de-brinquedo/` | `/category/noticias/` |
| `/brincando-com-a-caixa-de-sapato/` | `/category/noticias/` |
| `/brincando-com-canudo/` | `/category/noticias/` |
| `/brincando-com-palitos/` | `/category/noticias/` |
| `/brincar-com-escorredor-de-macarrao/` | `/category/noticias/` |
| `/brincar-com-pregadores/` | `/category/noticias/` |
| `/caca-bolinhas/` | `/category/noticias/` |
| `/caixa-musical/` | `/category/noticias/` |
| `/carimbo-com-tinta/` | `/category/noticias/` |
| `/carrinho/` | `/category/noticias/` |
| `/centopeia-numerica/` | `/category/noticias/` |
| `/cinco-sentidos/` | `/category/noticias/` |
| `/como-fazer-massinha-de-modelar-caseira/` | `/category/noticias/` |
| `/coordenacao-motora-2/` | `/category/noticias/` |
| `/coordenacao-motora-3/` | `/category/noticias/` |
| `/cor-amarela/` | `/category/noticias/` |
| `/cor-azul/` | `/category/noticias/` |
| `/cor-verde/` | `/category/noticias/` |
| `/cor-vermelha-2/` | `/category/noticias/` |
| `/cor-vermelha/` | `/category/noticias/` |
| `/cores-2/` | `/category/noticias/` |
| `/cores-3/` | `/category/noticias/` |
| `/dicas-de-brincadeiras/` | `/category/noticias/` |
| `/douglas-quer-um-abraco/` | `/category/noticias/` |
| `/educacao-fisica-vamos-praticar/` | `/category/noticias/` |
| `/elefantinho/` | `/category/noticias/` |
| `/emocoes/` | `/category/noticias/` |
| `/encontros-vocalicos/` | `/category/noticias/` |
| `/experiencia-do-feijao/` | `/category/noticias/` |
| `/experiencia/` | `/category/noticias/` |
| `/forma-geometrica-quadrado/` | `/category/noticias/` |
| `/formas-geometricas-2/` | `/category/noticias/` |
| `/formas-geometricas-3/` | `/category/noticias/` |
| `/funcional-kids/` | `/category/noticias/` |
| `/futebol-vamos-treinar/` | `/category/noticias/` |
| `/garrafa-sensorial/` | `/category/noticias/` |
| `/historia-as-dez-corujinhas/` | `/category/noticias/` |
| `/historia-do-pedro/` | `/category/noticias/` |
| `/historia-do-peixe-pixote/` | `/category/noticias/` |
| `/historia-maria-vai-com-as-outras/` | `/category/noticias/` |
| `/historia-o-livro-do-planeta-terra/` | `/category/noticias/` |
| `/historia-peludinho/` | `/category/noticias/` |
| `/imitando-os-bichinhos/` | `/category/noticias/` |
| `/indiozinho/` | `/category/noticias/` |
| `/ingles-cante-com-a-teacher/` | `/category/noticias/` |
| `/jogo-da-memoria/` | `/category/noticias/` |
| `/jogo-do-caminho/` | `/category/noticias/` |
| `/lavar-as-maos/` | `/category/noticias/` |
| `/minha-conta/lost-password/` | `/category/noticias/` |
| `/modelando-os-numerais/` | `/category/noticias/` |
| `/musica-notas-musicais/` | `/category/noticias/` |
| `/musica-ritmos-lentos-e-rapidos/` | `/category/noticias/` |
| `/numerais-4/` | `/category/noticias/` |
| `/numerais-5/` | `/category/noticias/` |
| `/numerais-6/` | `/category/noticias/` |
| `/numeros/` | `/category/noticias/` |
| `/o-coelho-e-a-tartaruga/` | `/category/noticias/` |
| `/o-gato-que-nao-podia-ir-passear/` | `/category/noticias/` |
| `/o-jacarezinho-egoista/` | `/category/noticias/` |
| `/o-leao-e-o-rato/` | `/category/noticias/` |
| `/o-reino-das-letras-felizes/` | `/category/noticias/` |
| `/o-segredo-da-bruxinha/` | `/category/noticias/` |
| `/pescaria-com-espumadeira/` | `/category/noticias/` |
| `/pintura-com-barbante/` | `/category/noticias/` |
| `/qual-a-cor-do-amor/` | `/category/noticias/` |
| `/que-tal-brincar-com-agua/` | `/category/noticias/` |
| `/reciclagem-de-esponjas-de-limpeza-no-tatuape/` | `/category/noticias/` |
| `/rosquear-garrafas/` | `/category/noticias/` |
| `/seres-vivos-e-nao-vivos/` | `/category/noticias/` |
| `/trabalhando-o-alfabeto-atraves-da-forca/` | `/category/noticias/` |
| `/treino-com-a-tesoura/` | `/category/noticias/` |
| `/uma-historia-de-pascoa/` | `/category/noticias/` |
| `/vamos-carimbar/` | `/category/noticias/` |
| `/vamos-pintar-a-caixa/` | `/category/noticias/` |
| `/vogais-3/` | `/category/noticias/` |
| `/vogais-cursivas/` | `/category/noticias/` |
| `/vogal-a/` | `/category/noticias/` |
| `/category/blog/brincadeiras/` | `/category/noticias/` |
| `/category/blog/historias/` | `/category/noticias/` |
| `/category/atividades/` | `/category/noticias/` |
| `/category/atividades/bercario/` | `/category/noticias/` |
| `/category/atividades/mini-maternal/` | `/category/noticias/` |
| `/category/atividades/maternal-i/` | `/category/noticias/` |
| `/category/atividades/maternal-ii/` | `/category/noticias/` |
| `/category/atividades/jardim-i/` | `/category/noticias/` |
| `/category/atividades/jardim-ii/` | `/category/noticias/` |

