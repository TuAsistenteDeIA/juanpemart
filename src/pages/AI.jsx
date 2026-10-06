import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react'
import { getProduct, fmtAmt, priceOf, eur } from '../data/products'
import { useStore } from '../context/Store'
import { ChefAvatar } from '../components/Chef'

const EXAMPLE = 'Somos 8 personas y tenemos 60 € para una comida.'
const CHIPS = [EXAMPLE, 'Una cena especial para 2 con marisco', '¿Cómo sé si un pescado es fresco?', '¿Qué pescado va bien al horno?']

const round50 = (g) => Math.max(250, Math.round(g / 50) * 50)

// Respuesta simulada (no hay IA real): interpreta personas y presupuesto con expresiones simples.
function reply(text) {
  const t = text.toLowerCase()
  const people = +(t.match(/(\d+)\s*(personas|pax|comensales)/)?.[1] || 0)
  const budget = +(t.match(/(\d+)\s*(€|euros?)/)?.[1] || 0)

  if (people || budget) {
    const n = people || Math.max(2, Math.round(budget / 8))
    const b = budget || n * 9
    const lubina = round50((b * 0.6) / getProduct('lubina').price * 1000)
    const gamba = round50((b * 0.4) / getProduct('gamba').price * 1000)
    const plan = [
      { id: 'lubina', amt: lubina, prep: 'Para horno' },
      { id: 'gamba', amt: gamba, prep: 'Crudo' },
    ]
    const total = plan.reduce((s, l) => s + priceOf(getProduct(l.id), l.amt), 0)
    return {
      text: `Para ${n} personas con ${eur(b)} te recomiendo una combinación de lubina al horno y gambas a la plancha. Calcularía aproximadamente ${fmtAmt(getProduct('lubina'), lubina)} de lubina (unos ${Math.round(lubina / n)} g por persona) y ${fmtAmt(getProduct('gamba'), gamba)} de gambas de entrante. Total estimado: ${eur(total)}${total <= b ? ', dentro de tu presupuesto' : ''}. Te la dejamos limpia y lista para el horno.`,
      plan, total,
    }
  }
  if (/fresc/.test(t)) return { text: 'Tres señales: ojo brillante y abombado, agallas de un rojo vivo y carne firme que recupera al presionar con el dedo. Además debe oler a mar, nunca a amoniaco. En JuanPemart lo revisamos pieza a pieza cada mañana.' }
  if (/horno/.test(t)) return { text: 'Para horno te recomiendo lubina o dorada: carne jugosa que no se seca. Una pieza de 1 kg da para 3 personas. Te la preparamos abierta y limpia, lista para hornear.', plan: [{ id: 'lubina', amt: 1000, prep: 'Para horno' }], total: priceOf(getProduct('lubina'), 1000) }
  if (/(2|dos) personas|rom[aá]ntic|pareja|especial/.test(t)) {
    const plan = [{ id: 'cigala', amt: 500, prep: 'Crudo' }, { id: 'salmon', amt: 400, prep: 'Fileteada' }]
    return { text: 'Para una cena especial de dos: cigalas a la plancha de entrante y un lomo de salmón al horno con limón. Elegante, rápido y sin complicaciones.', plan, total: plan.reduce((s, l) => s + priceOf(getProduct(l.id), l.amt), 0) }
  }
  return { text: 'Cuéntame cuántas personas sois, el presupuesto y la ocasión, y te preparo una propuesta con cantidades. Por ejemplo: “Somos 6 y queremos gastar 50 €”.' }
}

function Typed({ text, onDone, onTick }) {
  const words = text.split(' ')
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= words.length) { onDone?.(); return }
    onTick?.()
    const t = setTimeout(() => setN(n + 1), 28)
    return () => clearTimeout(t)
  }, [n])
  return <>{words.slice(0, n).join(' ')}</>
}

export default function AIPage() {
  const { addMany, go } = useStore()
  const [msgs, setMsgs] = useState([{ who: 'bot', text: '¡Hola! Soy el pescadero de JuanPemart 🐟 Dime cuántos sois, qué presupuesto tenéis o qué os apetece, y te preparo la compra.', done: true }])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef(null)

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [msgs, typing])

  const ask = (text) => {
    if (!text.trim() || busy) return
    setBusy(true)
    setMsgs((m) => [...m, { who: 'me', text, done: true }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { who: 'bot', ...reply(text), done: false }])
    }, 1200)
  }
  const finish = () => { setMsgs((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, done: true } : x))); setBusy(false) }

  // Reproduce el ejemplo una vez para que la demo "cobre vida" al entrar
  useEffect(() => {
    const t = setTimeout(() => ask(EXAMPLE), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="wrap ai">
      <div className="ai__side">
        <span className="demo-badge"><Sparkles size={13} /> Demo · próxima funcionalidad</span>
        <h1>🐟 Pregúntale<br />al <em>pescadero</em></h1>
        <p>Un asistente que conoce el producto de hoy, calcula cantidades y las convierte en un pedido en segundos.</p>
        <ul className="ai__feats">
          <li><b>Cantidades exactas</b><span>Según personas y presupuesto.</span></li>
          <li><b>Producto de hoy</b><span>Solo lo que hay disponible.</span></li>
          <li><b>Pedido en un toque</b><span>Directo a tu carrito o WhatsApp.</span></li>
        </ul>
        <p className="ai__note">Maqueta visual: las respuestas son simuladas. En la siguiente fase se conectará a una IA real con el catálogo y los precios de JuanPemart.</p>
      </div>

      <div className="chat">
        <div className="chat__bar"><ChefAvatar size={44} ring={false} /><div><b>El pescadero</b><small><i /> en línea</small></div></div>
        <div className="chat__body">
          {msgs.map((m, i) => (
            <div key={i} className={`msg msg--${m.who}`}>
              <div className="msg__bubble">
                {m.who === 'bot' && !m.done ? <Typed text={m.text} onDone={finish} onTick={() => end.current?.scrollIntoView({ block: 'nearest' })} /> : m.text}
              </div>
              {m.who === 'bot' && m.done && m.plan && (
                <div className="plan">
                  {m.plan.map((l) => {
                    const p = getProduct(l.id)
                    return (
                      <div key={l.id}><img src={p.img} alt="" /><span><b>{p.name}</b>{fmtAmt(p, l.amt)} · {l.prep}</span><em>{eur(priceOf(p, l.amt))}</em></div>
                    )
                  })}
                  <div className="plan__total"><span>Total estimado</span><b>{eur(m.total)}</b></div>
                  <div className="plan__cta">
                    <button className="btn btn--sm btn--ghost" onClick={() => go('tienda')}>Ver productos <ArrowRight size={14} /></button>
                    <button className="btn btn--sm" onClick={() => addMany(m.plan, 'Propuesta añadida al pedido')}><ShoppingBag size={14} /> Añadir al pedido</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {typing && <div className="msg msg--bot"><div className="msg__bubble dots"><i /><i /><i /></div></div>}
          <div ref={end} />
        </div>
        <div className="chat__chips">{CHIPS.map((c) => <button key={c} onClick={() => ask(c)} disabled={busy}>{c}</button>)}</div>
        <form className="chat__in" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta…" />
          <button aria-label="Enviar" disabled={busy || !input.trim()}><Send size={18} /></button>
        </form>
      </div>
    </section>
  )
}
