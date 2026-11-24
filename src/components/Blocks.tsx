import type { Block } from "../data/types"

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "h1") return null
        if (block.type === "h2" || block.type === "h3" || block.type === "h4") {
          const Tag = block.type
          return (
            <div key={index} className="pt-4">
              <hr className="rule mb-3" />
              <Tag className="text-navy text-2xl md:text-3xl">{block.text}</Tag>
            </div>
          )
        }
        if (block.type === "p") {
          return <p key={index}>{block.text}</p>
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === "img") {
          return (
            <img
              key={index}
              src={block.src}
              alt={block.alt || "Escola Jeitinho de Criança"}
              className="w-full rounded-md object-cover"
              loading="lazy"
            />
          )
        }
        if (block.type === "iframe") {
          return (
            <iframe
              key={index}
              src={block.src}
              title={block.title || "Conteúdo da Escola Jeitinho de Criança"}
              className="aspect-video min-h-[280px] w-full rounded-md border-0 md:min-h-[420px]"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr; fullscreen"
              allowFullScreen
            />
          )
        }
        return null
      })}
    </div>
  )
}
