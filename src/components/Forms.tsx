import { useState, type FormEvent } from "react"
import { JOBS, WHATSAPP_DISPLAY } from "../site"

function openWhatsApp(text: string) {
  const url = `https://wa.me/5511941349222?text=${encodeURIComponent(text)}`
  window.open(url, "_blank", "noopener,noreferrer")
}

export function ContactForm() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    openWhatsApp(
      `Olá! Meu nome é ${nome}. Telefone: ${telefone}. ${mensagem || "Gostaria de agendar uma visita."}`,
    )
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md bg-mist p-5 md:p-7">
      <h2 className="text-2xl text-navy">Escreva para a escola</h2>
      <p className="text-sm">
        A mensagem abre no WhatsApp {WHATSAPP_DISPLAY}. Não há envio por servidor.
      </p>
      <label className="block text-sm font-normal">
        Seu nome
        <input
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
        />
      </label>
      <label className="block text-sm font-normal">
        Telefone
        <input
          required
          value={telefone}
          onChange={(event) => setTelefone(event.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
          inputMode="tel"
        />
      </label>
      <label className="block text-sm font-normal">
        Mensagem
        <textarea
          required
          value={mensagem}
          onChange={(event) => setMensagem(event.target.value)}
          rows={5}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
        />
      </label>
      <button type="submit" className="btn btn-gold">
        Enviar pelo WhatsApp
      </button>
      {sent ? <p className="text-sm">Abrimos o WhatsApp com a sua mensagem.</p> : null}
    </form>
  )
}

export function JobForm() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [cargo, setCargo] = useState(JOBS[0])
  const [mensagem, setMensagem] = useState("")
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    openWhatsApp(
      `Currículo para a Jeitinho de Criança. Nome: ${nome}. E-mail: ${email}. Telefone: ${telefone}. Cargo: ${cargo}. ${mensagem} Vou enviar o currículo neste chat.`,
    )
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md bg-mist p-5 md:p-7">
      <h2 className="text-2xl text-navy">Envie seu currículo</h2>
      <p className="text-sm">
        O envio abre uma conversa no WhatsApp. Anexe o currículo por lá. A vaga em aberto na página original era a de professor de inglês para a educação infantil, com aulas duas vezes por semana, de manhã e à tarde, entre 8h e 17h. Formação desejada: Pedagogia e/ou Magistério, com inglês fluente.
      </p>
      <label className="block text-sm font-normal">
        Seu nome
        <input required value={nome} onChange={(event) => setNome(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
      </label>
      <label className="block text-sm font-normal">
        E-mail
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
      </label>
      <label className="block text-sm font-normal">
        Seu telefone
        <input required value={telefone} onChange={(event) => setTelefone(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
      </label>
      <label className="block text-sm font-normal">
        Cargo
        <select value={cargo} onChange={(event) => setCargo(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-display">
          {JOBS.map((job) => (
            <option key={job}>{job}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-normal">
        Mensagem
        <textarea value={mensagem} onChange={(event) => setMensagem(event.target.value)} rows={4} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" placeholder="Conte um pouco da sua experiência" />
      </label>
      <button type="submit" className="btn btn-gold">Continuar no WhatsApp</button>
      {sent ? <p className="text-sm">Abrimos o WhatsApp para você enviar o currículo.</p> : null}
    </form>
  )
}
