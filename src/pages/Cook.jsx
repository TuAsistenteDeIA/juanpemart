import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, ShoppingBag, ArrowRight, MessageCircle, RotateCcw, Fish, Shell, Sparkles, Clock, ChefHat, Check, Sun, CalendarDays, CalendarCheck, ShieldCheck } from 'lucide-react'
import { OCCASIONS, LOCALES } from '../data/content'
import { recipeOf } from '../data/recipes'
import { getProduct, fmtAmt, priceOf, basePriceOf, eur } from '../data/products'
import { useStore } from '../context/Store'
import { ChefAvatar } from '../components/Chef'
import Money from '../components/Money'

// Redondea a múltiplos de 50 g, mínimo 250 g
const grams = (perPax, people) => Math.max(250, Math.round((perPax * people) / 50) * 50)

const STYLES = [
  { id: 'pescado', label: 'Pescado', note: 'Lubina, dorada, salmón…', Icon: Fish, cat: 'pescado' },
  { id: 'marisco', label: 'Marisco', note: 'Gamba, pulpo, cigala…', Icon: Shell, cat: 'marisco' },
  { id: 'todo', label: 'De todo un poco', note: 'Lo mejor de cada lonja', Icon: Sparkles },
]
const WHEN = [
  { id: 'hoy', label: 'Hoy', note: 'Con lo que ha llegado esta mañana', Icon: Sun },
  { id: 'manana', label: 'Mañana', note: 'Me da margen para pedir', Icon: CalendarDays },
  { id: 'finde', label: 'Este fin de semana', note: 'Lo reservo con tiempo', Icon: CalendarCheck },
]
const ALLERGIES = [
  { id: 'ninguna', label: 'Ninguna', note: 'Se puede con todo', ex: [] },
  { id: 'crustaceos', label: 'Crustáceos', note: 'Gamba, cigala…', ex: ['gamba', 'cigala'] },
  { id: 'moluscos', label: 'Moluscos', note: 'Pulpo, calamar…', ex: ['pulpo', 'calamar'] },
  { id: 'pescado', label: 'Pescado', note: 'Lubina, dorada, salmón…', ex: ['lubina', 'dorada', 'salmon'] },
]
const STEPS = ['Ocasión', 'Personas', 'Cuándo', 'Gustos', 'Menú']

// Lo que diría Juan de cada producto: por qué lo recomienda y cómo cocinarlo (tiempos y temperaturas reales)
const NOTES = {
  lubina: { why: 'Carne blanca, fina y jugosa. Una pieza de 1,2 kg da para unas tres raciones.', tip: 'horno a 200 °C, unos 20-25 minutos por kilo, con un par de cortes en el lomo. Está lista cuando el ojo se vuelve blanco y el lomo se separa con un tenedor.' },
  dorada: { why: 'Sabor suave que gusta a todos. Una dorada de ración (unos 400 g) por persona.', tip: 'horno a 200 °C, 18-20 minutos si es de ración, regándola a mitad de cocción con su propio jugo. En parrilla, 6-7 minutos por lado con la brasa ya hecha.' },
  salmon: { why: 'Se hace rápido y no lleva espinas: ración de lomo limpia.', tip: 'plancha o sartén bien caliente, 3-4 minutos por el lado de la piel y 1-2 por el otro. Fuera del fuego cuando el centro aún esté rosado.' },
  calamar: { why: 'Tierno y dulce; sirve para plancha o para freír.', tip: 'plancha muy caliente, minuto y medio por lado y la sal al final. Pasados 3 minutos se vuelve gomoso.' },
  gamba: { why: 'Abre la comida con sabor a mar y se hace en cuatro minutos.', tip: 'plancha muy caliente, unos 2 minutos por lado con sal gorda, sin pelar: el sabor está en la cabeza.' },
  pulpo: { why: 'Da mucho juego y se puede dejar hecho de antes. Lo preparo cocido para que solo tengáis que cortarlo.', tip: 'si lo cocéis en casa, unos 40 minutos por kilo en agua hirviendo; pinchado con un cuchillo debe entrar sin resistencia. Reposa 10 minutos en su caldo antes de cortarlo.' },
  cigala: { why: 'Es el capricho: unas dos piezas por persona de entrante bastan para que se acuerden.', tip: 'a la plancha, 1-2 minutos por lado; si la cocéis, 2-3 minutos en agua muy salada. Más tiempo y se queda seca.' },
}
// Tamaño medio de una pieza, para decir cuántas piezas son
const PIECE = { lubina: [1200, 'pieza', 'piezas'], dorada: [400, 'dorada', 'doradas'], calamar: [250, 'calamar', 'calamares'], gamba: [45, 'gamba', 'gambas'], pulpo: [1800, 'pulpo', 'pulpos'], cigala: [90, 'cigala', 'cigalas'] }
export const pieceText = (id, amt) => {
  const pc = PIECE[id]
  if (!pc) return ''
  const n = Math.max(1, Math.round(amt / pc[0]))
  const big = id === 'lubina' || id === 'pulpo'
  return `≈ ${n} ${n === 1 ? pc[1] : pc[2]}${big ? ` de ~${fmtAmt(getProduct(id), Math.round(amt / n / 50) * 50)}` : ''}`
}

const FILL = { lubina: [400, 'Para horno'], dorada: [400, 'Limpia'], salmon: [170, 'Fileteada'], calamar: [150, 'Limpia'], gamba: [120, 'Crudo'], pulpo: [170, 'Cocido'], cigala: [180, 'Crudo'] }
const CAND = { pescado: ['lubina', 'dorada', 'salmon', 'calamar'], marisco: ['gamba', 'pulpo', 'cigala'], todo: ['lubina', 'gamba', 'salmon', 'pulpo', 'calamar'] }

// Menú recomendado: la base de la ocasión, ajustada a gustos, alergias y disponibilidad real
export function buildMenu(occ, people, style, allergy, when) {
  const excl = ALLERGIES.find((a) => a.id === allergy)?.ex || []
  const cat = STYLES.find((s) => s.id === style)?.cat
  const notes = []
  let items = occ.items.map(([pid, perPax, prep]) => ({ pid, perPax, prep })).filter((i) => !excl.includes(i.pid))
  if (cat) items = items.filter((i) => getProduct(i.pid).category === cat)
  // Lo que va "bajo pedido" no llega para hoy: se cambia por algo de la lonja de la mañana
  if (when === 'hoy') {
    items = items.flatMap((i) => {
      const p = getProduct(i.pid)
      if (p.stock !== 'Bajo pedido') return [i]
      notes.push(`la ${p.name.toLowerCase()} la pido a lonja con un día de antelación, así que para hoy no puedo prometértela`)
      return []
    })
  }
  const ok = (id) => !excl.includes(id) && !items.some((i) => i.pid === id) && !(when === 'hoy' && getProduct(id).stock === 'Bajo pedido')
  for (const id of CAND[cat || 'todo']) {
    if (items.length >= 2) break
    if (ok(id)) items.push({ pid: id, perPax: FILL[id][0], prep: FILL[id][1] })
  }
  if (notes.length && items.some((i) => i.pid === 'gamba')) notes[0] += '; la compenso con gamba roja, que viene de la lonja de esta mañana'
  return { notes, items: items.map((i) => ({ id: i.pid, amt: grams(i.perPax, people), prep: i.prep, perPax: i.perPax })) }
}

// Una línea del chef: aparece escribiéndose palabra a palabra
function ChefLine({ text, onDone }) {
  const words = text.split(' ')
  const [n, setN] = useState(0)
  const fired = useRef(false)
  useEffect(() => {
    if (n >= words.length) {
      if (!fired.current) { fired.current = true; onDone?.() }
      return
    }
    const t = setTimeout(() => setN(n + 1), 24)
    return () => clearTimeout(t)
  }, [n])
  return <>{words.slice(0, n).join(' ')}{n < words.length && <i className="caret" />}</>
}

export default function CookPage() {
  const { addMany, go, opts } = useStore()
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(false)
  const [step, setStep] = useState(null) // occasion | people | when | style | allergy | plan | done
  const [people, setPeople] = useState(6)
  const [menu, setMenu] = useState([])
  const ctx = useRef({}) // respuestas dadas hasta ahora
  const epoch = useRef(0)
  const uid = useRef(0)
  const endRef = useRef(null)
  const started = useRef(false)

  // El chef habla: puntos suspensivos, luego el texto escrito. Devuelve una promesa que se resuelve al terminar.
  const say = (text, gap = 700) => {
    const e = epoch.current
    return new Promise((resolve) => {
      setTyping(true)
      setTimeout(() => {
        if (e !== epoch.current) return
        setTyping(false)
        setLog((l) => [...l, { id: ++uid.current, who: 'chef', text, resolve }])
      }, gap)
    })
  }
  const push = (entry) => setLog((l) => [...l, { id: ++uid.current, ...entry }])
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const alive = (e) => e === epoch.current

  const start = async () => {
    const e = ++epoch.current
    ctx.current = {}
    setLog([]); setStep(null); setMenu([])
    await say('¡Buenas! Soy Juan, vuestro pescadero de toda la vida. Os ayudo a decidir qué comprar, cuánto y cómo cocinarlo, sin sobras ni faltas.', 500)
    await say('Para empezar: ¿qué vais a cocinar?', 500)
    // ?chefdemo=celebracion,6,hoy,todo,ninguna reproduce el recorrido completo solo (para revisarlo o enseñarlo)
    const demo = new URLSearchParams(location.search).get('chefdemo')
    if (demo && alive(e)) {
      const [oid, ppl, w, sty, al] = demo.split(',')
      const o = OCCASIONS.find((x) => x.id === oid) || OCCASIONS[2]
      await chooseOccasion(o)
      await choosePeople(+ppl || o.people)
      await chooseWhen(WHEN.find((x) => x.id === w) || WHEN[0])
      await chooseStyle(STYLES.find((s) => s.id === sty) || STYLES[2])
      await chooseAllergy(ALLERGIES.find((a) => a.id === al) || ALLERGIES[0])
      return
    }
    if (alive(e)) setStep('occasion')
  }
  useEffect(() => { if (!started.current) { started.current = true; start() } }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [log, typing, step])

  const chooseOccasion = async (o) => {
    const e = epoch.current
    setStep(null); ctx.current.occ = o; setPeople(o.people)
    push({ who: 'me', text: o.label })
    await say(`${o.label}, ¡buena elección! ${o.chef}.`)
    await say('¿Cuántos vais a sentaros a la mesa?', 400)
    if (alive(e)) setStep('people')
  }
  const choosePeople = async (n = people) => {
    const e = epoch.current
    setStep(null); setPeople(n); ctx.current.n = n
    push({ who: 'me', text: `Somos ${n}` })
    await say(`Perfecto, ${n} personas. ¿Para cuándo lo queréis? Te lo pregunto porque no todo se compra igual: hay producto de la lonja de esta mañana y cosas que pido con un día de antelación.`)
    if (alive(e)) setStep('when')
  }
  const chooseWhen = async (w) => {
    const e = epoch.current
    setStep(null); ctx.current.when = w.id
    push({ who: 'me', text: w.label })
    await say({
      hoy: 'Para hoy trabajo con lo que ha llegado de la lonja esta mañana: pescado del día y poco más.',
      manana: 'Para mañana, perfecto: me da margen para pedir lo que haga falta y elegir las mejores piezas.',
      finde: 'Para el fin de semana lo ideal es cerrarlo con un par de días: así os cojo lo mejor de la lonja y os lo dejo preparado.',
    }[w.id])
    await say('¿Y qué os apetece más: pescado, marisco o un poco de todo?', 400)
    if (alive(e)) setStep('style')
  }
  const chooseStyle = async (st) => {
    const e = epoch.current
    setStep(null); ctx.current.style = st.id
    push({ who: 'me', text: st.label })
    await say('Una pregunta importante antes de pesar nada: ¿hay alguna alergia o intolerancia en la mesa?', 600)
    if (alive(e)) setStep('allergy')
  }
  const chooseAllergy = async (a) => {
    const e = epoch.current
    setStep(null); ctx.current.allergy = a.id
    push({ who: 'me', text: a.id === 'ninguna' ? 'Ninguna alergia' : `Alergia a ${a.label.toLowerCase()}` })
    if (a.id !== 'ninguna') {
      await say('Anotado: lo dejo fuera del menú. Te aviso de que en el mostrador manejamos todo el producto junto, así que si es una alergia grave consúltalo con nosotros antes de recoger el pedido.', 800)
    }
    await recommend(e)
  }

  const recommend = async (e) => {
    const { occ, n, when, style, allergy } = ctx.current
    const { items: m, notes } = buildMenu(occ, n, style, allergy, when)
    if (!m.length) {
      await say('Con esas condiciones me quedo sin nada que ofreceros. Probemos otra cosa: ¿qué os apetece, entonces?', 700)
      if (alive(e)) setStep('style')
      return
    }
    setMenu(m)
    await say('Déjame hacer la cuenta con la libreta del mostrador…', 600)
    for (const note of notes) await say(`Una cosa: ${note}.`, 800)
    const fish = m.some((x) => ['lubina', 'dorada'].includes(x.id))
    await say(
      fish
        ? `Para ${n} personas: del pescado entero cuento unos 400 g por persona, porque con cabeza y espina se queda en unos 150 g de carne limpia, que es una ración de verdad. Esto es lo que os prepararía:`
        : `Para ${n} personas, cuento ración de ${m.length > 2 ? 'varios platos' : 'plato principal'} sin pasarnos. Esto es lo que os prepararía:`,
      500,
    )
    if (!alive(e)) return
    push({ who: 'chef', kind: 'plan', menu: m, people: n })
    await wait(600)
    // Dos trucos de cocina, de los productos que más pesan en el menú
    const top = [...m].sort((a, b) => priceOf(getProduct(b.id), b.amt) - priceOf(getProduct(a.id), a.amt)).slice(0, 2)
    for (const t of top) await say(`Truco para ${getProduct(t.id).name.toLowerCase()}: ${NOTES[t.id]?.tip}`, 900)
    await say({
      hoy: 'Hasta que lo cocinéis, en la parte más fría de la nevera y, si puedes, sobre hielo. Sácalo unos 20 minutos antes de cocinarlo y sécalo bien con papel: así dora y no hierve.',
      manana: 'Mañana lo tenéis recién preparado. Guárdalo tapado en la parte más fría de la nevera (entre 0 y 4 °C) y cocínalo ese mismo día; el pescado fresco no aguanta más de uno o dos.',
      finde: 'Lo preparo el mismo día que lo recojáis. En casa, a la nevera y a cocinarlo en 24 horas; y el marisco ya cocido, nunca junto al crudo.',
    }[when], 900)
    const r = recipeOf(m[0].id)
    if (r) {
      await say('Y para cocinarlo, os propongo esta receta, que sale redonda con lo que os llevo:', 700)
      if (!alive(e)) return
      push({ who: 'chef', kind: 'recipe', recipe: r })
      await wait(400)
    }
    await say('¿Qué os parece? Si queréis, lo añado a vuestro pedido y os lo dejo preparado.', 700)
    if (alive(e)) setStep('plan')
  }

  const addMenu = async () => {
    const e = epoch.current
    const local = LOCALES.find((l) => l.id === opts.local) || LOCALES[0]
    setStep(null)
    push({ who: 'me', text: 'Añadir recomendación' })
    addMany(menu.map(({ id, amt, prep }) => ({ id, amt, prep })), 'Recomendación del chef añadida al pedido')
    await say('¡Hecho! Ya lo tenéis en el pedido, preparado como hemos hablado.', 600)
    await say({
      hoy: `Si lo confirmáis antes de las 12:00, lo tenéis listo en la pescadería de ${local.name} a partir de las 13:00.`,
      manana: `Os lo dejo apartado en la pescadería de ${local.name} para mañana, desde las 9:00. Os aviso por WhatsApp cuando esté listo.`,
      finde: `Os lo dejo apartado en la pescadería de ${local.name} para el sábado por la mañana. Os aviso por WhatsApp cuando esté listo.`,
    }[ctx.current.when], 600)
    await say('Cuando queráis, lo cerramos por WhatsApp. ¡Que aproveche!', 500)
    if (alive(e)) setStep('done')
  }
  const changePeople = async () => {
    const e = epoch.current
    setStep(null)
    push({ who: 'me', text: 'Quiero cambiar el número de personas' })
    await say('Sin problema. ¿Cuántos seréis ahora?', 500)
    if (alive(e)) { ctx.current.redo = true; setStep('people') }
  }
  // Tras cambiar el número de personas se repite la recomendación con el resto de respuestas
  const redoPeople = async () => {
    const e = epoch.current
    const n = people
    ctx.current.redo = false; ctx.current.n = n; setStep(null)
    push({ who: 'me', text: `Ahora somos ${n}` })
    await say(`Entendido, ${n} personas. Rehago la cuenta.`, 600)
    await recommend(e)
  }
  const confirmPeople = () => (ctx.current.redo ? redoPeople() : choosePeople())

  const idxMap = { occasion: 0, people: 1, when: 2, style: 3, allergy: 3, plan: 4, done: 4 }
  const c = ctx.current
  const stepIdx = idxMap[step] ?? (c.allergy ? 4 : c.style || c.when ? 3 : c.n ? 2 : c.occ ? 1 : 0)

  return (
    <section className="wrap chefpage">
      <aside className="chefside">
        <div className="chefside__card">
          <div className="chefside__avatar"><ChefAvatar size={168} /></div>
          <span className="eyebrow">Tu guía en la pescadería</span>
          <h1>¿Qué vas <br />a <em>cocinar</em>?</h1>
          <p>Juan lleva desde 1996 detrás del mostrador. Cuéntale la ocasión y él te dice qué llevar, cuánto y cómo cocinarlo.</p>
          <ol className="chefsteps">
            {STEPS.map((s, i) => (
              <li key={s} className={i < stepIdx ? 'done' : i === stepIdx ? 'now' : ''}><i>{i < stepIdx ? <Check size={12} /> : i + 1}</i>{s}</li>
            ))}
          </ol>
          <small className="chefside__note">Maqueta visual: las recomendaciones son simuladas y se calculan con los productos y precios de la demo.</small>
        </div>
      </aside>

      <div className="chefchat">
        <header className="chefchat__bar">
          <ChefAvatar size={44} ring={false} />
          <div><b>Juan, tu pescadero</b><small><i /> en el mostrador</small></div>
          {log.length > 1 && <button className="chefchat__reset" onClick={start} aria-label="Empezar de nuevo"><RotateCcw size={15} /> Empezar de nuevo</button>}
        </header>

        <div className="chefchat__body">
          {log.map((m) => <Entry key={m.id} m={m} />)}
          {typing && (
            <div className="cmsg cmsg--chef"><ChefAvatar size={34} ring={false} /><div className="cmsg__bubble dots"><i /><i /><i /></div></div>
          )}

          {step && (
            <div className="chefreply" key={step}>
              {step === 'occasion' && (
                <div className="occopts">
                  {OCCASIONS.map((o) => (
                    <button key={o.id} onClick={() => chooseOccasion(o)}>
                      <img src={o.img} alt="" loading="lazy" /><span className="occopts__shade" /><b>{o.label}</b>
                    </button>
                  ))}
                </div>
              )}
              {step === 'people' && (
                <div className="peoplepick">
                  <div className="stepper stepper--light">
                    <button onClick={() => setPeople(Math.max(1, people - 1))} aria-label="Menos"><Minus size={16} /></button>
                    <output>{people} <small>personas</small></output>
                    <button onClick={() => setPeople(Math.min(40, people + 1))} aria-label="Más"><Plus size={16} /></button>
                  </div>
                  <button className="btn btn--lg" onClick={confirmPeople}>Somos {people} <ArrowRight size={16} /></button>
                </div>
              )}
              {step === 'when' && (
                <div className="stylepick">
                  {WHEN.map((w) => <button key={w.id} onClick={() => chooseWhen(w)}><w.Icon size={22} /><b>{w.label}</b><small>{w.note}</small></button>)}
                </div>
              )}
              {step === 'style' && (
                <div className="stylepick">
                  {STYLES.map((s) => <button key={s.id} onClick={() => chooseStyle(s)}><s.Icon size={22} /><b>{s.label}</b><small>{s.note}</small></button>)}
                </div>
              )}
              {step === 'allergy' && (
                <div className="stylepick stylepick--4">
                  {ALLERGIES.map((a) => <button key={a.id} onClick={() => chooseAllergy(a)}><ShieldCheck size={22} /><b>{a.label}</b><small>{a.note}</small></button>)}
                </div>
              )}
              {step === 'plan' && (
                <div className="planactions">
                  <button className="btn btn--lg" onClick={addMenu}><ShoppingBag size={18} /> Añadir recomendación</button>
                  <button className="btn btn--lg btn--ghost" onClick={changePeople}>Cambiar personas</button>
                  <button className="btn btn--lg btn--ghost" onClick={start}>Empezar de nuevo</button>
                </div>
              )}
              {step === 'done' && (
                <div className="planactions">
                  <button className="btn btn--lg" onClick={() => go('carrito')}><ShoppingBag size={18} /> Ver mi pedido</button>
                  <button className="btn btn--lg wa-btn" onClick={() => go('whatsapp')}><MessageCircle size={18} /> Pedir por WhatsApp</button>
                  <button className="btn btn--lg btn--ghost" onClick={start}>Otra comida</button>
                </div>
              )}
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>
    </section>
  )
}

function Entry({ m }) {
  if (m.who === 'me') return <div className="cmsg cmsg--me"><div className="cmsg__bubble">{m.text}</div></div>
  if (m.kind === 'plan') return <PlanCard menu={m.menu} people={m.people} />
  if (m.kind === 'recipe') return <RecipeCard r={m.recipe} />
  return (
    <div className="cmsg cmsg--chef">
      <ChefAvatar size={34} ring={false} />
      <div className="cmsg__bubble"><ChefLine text={m.text} onDone={m.resolve} /></div>
    </div>
  )
}

function PlanCard({ menu }) {
  const total = menu.reduce((n, l) => n + priceOf(getProduct(l.id), l.amt), 0)
  const base = menu.reduce((n, l) => n + basePriceOf(getProduct(l.id), l.amt), 0)
  return (
    <div className="plancard">
      {menu.map((l, i) => {
        const p = getProduct(l.id)
        const pcs = pieceText(l.id, l.amt)
        return (
          <article key={l.id} style={{ animationDelay: `${i * 120}ms` }}>
            <img src={p.img} alt="" style={{ objectPosition: p.pos || '50% 50%' }} />
            <div>
              <b>{p.name} · {fmtAmt(p, l.amt)}</b>
              <span className="plancard__prep">{l.prep}{pcs ? ` · ${pcs}` : ''}{p.offer ? ` · oferta -${p.offer.pct}%` : ''}</span>
              <p>{l.perPax} g por persona{l.id === 'pulpo' && l.prep === 'Cocido' ? ' (≈ 100 g ya cocido)' : ''}. {NOTES[l.id]?.why}</p>
            </div>
            <em>{eur(priceOf(p, l.amt))}</em>
          </article>
        )
      })}
      <footer>
        <span>Total aproximado{base - total > 0.005 && <small> · ahorras {eur(base - total)}</small>}</span>
        <Money value={total} />
      </footer>
    </div>
  )
}

function RecipeCard({ r }) {
  return (
    <a href={`#/receta/${r.id}`} className="chefrecipe">
      <img src={r.img} alt={r.name} loading="lazy" />
      <div>
        <small>Receta del chef</small>
        <b>{r.name}</b>
        <span><Clock size={14} /> {r.time} min <ChefHat size={14} /> {r.level}</span>
        <i>Ver receta <ArrowRight size={14} /></i>
      </div>
    </a>
  )
}
