import { useState } from 'react'
import { ArrowRight, ArrowDown, Check, Minus, Plus, Calendar, MapPin, Users, Wallet, Sparkles, Phone, MessageCircle } from 'lucide-react'
import BgVideo from '../components/Video'
import { Reveal } from '../components/Shell'
import { eur } from '../data/products'

export const EVENTS = [
  { id: 'Celebraciones', n: '01', img: '/img/ev-vino.jpg', pos: '50% 50%', note: 'Bodas, aniversarios, comuniones', pax: '20 – 150 personas' },
  { id: 'Eventos de empresa', n: '02', img: '/img/ev-mesa.jpg', pos: '30% 40%', note: 'Cenas de equipo, clientes, inauguraciones', pax: '10 – 200 personas' },
  { id: 'Reuniones familiares', n: '03', img: '/img/ev-sunset.jpg', pos: '50% 50%', note: 'Mariscadas y mesas largas', pax: '6 – 30 personas' },
  { id: 'Cumpleaños', n: '04', img: '/img/ev-ostras2.jpg', pos: '50% 60%', note: 'Un homenaje con sabor a mar', pax: '8 – 40 personas' },
]

const PACKS = [
  { id: 'Íntimo', from: 18, pax: '6 – 12 personas', img: '/img/ev-ostras.jpg', items: ['Ostras y mejillones de roca', 'Gamba roja a la plancha', 'Pescado del día al horno', 'Montaje y emplatado'] },
  { id: 'Celebración', from: 32, pax: '12 – 40 personas', img: '/img/ev-mariscada.jpg', hot: true, items: ['Mariscada de lonja a la mesa', 'Cigala y bogavante', 'Pulpo y gamba de Garrucha', 'Cortador de pescado en directo', 'Camareros y menaje'] },
  { id: 'Gran evento', from: 55, pax: '40 – 200 personas', img: '/img/ev-pack3.jpg', items: ['Showcooking de marisco', 'Barra de ostras y crudos', 'Menú degustación a medida', 'Equipo completo y logística', 'Coordinador de evento'] },
]

const STEPS = [
  ['Nos cuentas tu idea', 'Fecha, personas, lugar y el ambiente que buscas.'],
  ['Diseñamos la propuesta', 'Menú y presupuesto cerrados en 24 horas.'],
  ['Compramos en lonja', 'Elegimos a primera hora, el mismo día del evento.'],
  ['Servimos en tu mesa', 'Montaje, servicio y recogida. Tú solo disfrutas.'],
]

function verdict(perPax) {
  if (perPax < 25) return ['Esencial', 'Pescado de temporada y entrantes de marisco.']
  if (perPax < 45) return ['Selección', 'Mariscada de lonja con gamba, pulpo y pescado.']
  return ['Premium', 'Cigala, bogavante, ostras y servicio completo.']
}

export default function GourmetPage() {
  const [f, setF] = useState({ type: 'Celebraciones', date: '', people: 20, place: '', budget: 900, name: '', phone: '', pack: '' })
  const [sent, setSent] = useState(false)
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))
  const perPax = Math.round(f.budget / f.people)
  const [vTitle, vText] = verdict(perPax)
  const ok = f.name.trim() && f.phone.trim().length >= 6

  const toForm = (pack) => {
    if (pack) set('pack', pack)
    document.getElementById('propuesta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* HERO */}
      <section className="g-hero">
        <BgVideo src="/video/gourmet.mp4" poster="/video/gourmet-poster.jpg" className="g-hero__video" rate={0.8} />
        <div className="g-hero__shade" />
        <div className="wrap g-hero__in">
          <span className="eyebrow eyebrow--light"><i /> JuanPemart Gourmet · Eventos</span>
          <h1>
            <span className="line"><span>Tu evento.</span></span>
            <span className="line"><span><em>Nosotros</em> nos</span></span>
            <span className="line"><span>encargamos del mar.</span></span>
          </h1>
          <div className="g-hero__row">
            <p className="lead lead--light">Producto de lonja, cocina y servicio para celebraciones que se recuerdan. Del puerto a tu mesa, el mismo día.</p>
            <button className="btn btn--lg btn--white" onClick={() => toForm()}>Solicitar propuesta <ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="g-hero__stats wrap">
          {[['+25', 'años de oficio'], ['6 – 200', 'comensales'], ['24 h', 'propuesta cerrada'], ['100%', 'producto de lonja']].map(([b, s]) => (
            <div key={s}><b>{b}</b><span>{s}</span></div>
          ))}
          <ArrowDown size={20} className="g-hero__arrow" />
        </div>
      </section>

      {/* TIPOS DE EVENTO */}
      <section className="wrap g-events">
        <Reveal className="g-head">
          <span className="eyebrow">Qué celebras</span>
          <h2>Cada ocasión,<br /><em>su mar.</em></h2>
        </Reveal>
        <div className="cats2 g-cats">
          {EVENTS.map((e, i) => (
            <Reveal key={e.id} delay={i * 90} className="cat2wrap">
              <button className="cat2" onClick={() => { set('type', e.id); toForm() }}>
                <img src={e.img} alt="" loading="lazy" style={{ objectPosition: e.pos }} />
                <span className="cat2__shade" />
                <span className="cat2__n">{e.n}</span>
                <span className="cat2__txt"><b>{e.id}</b><small>{e.note}</small><small className="pax">{e.pax}</small></span>
                <span className="cat2__go"><ArrowRight size={20} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section className="g-steps">
        <div className="wrap">
          <Reveal className="g-head g-head--light">
            <span className="eyebrow eyebrow--light"><i /> Cómo lo hacemos</span>
            <h2>Tú eliges el momento.<br /><em>Nosotros, el mar.</em></h2>
          </Reveal>
          <div className="g-steps__grid">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="g-step">
                <span className="g-step__n">0{i + 1}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROPUESTAS */}
      <section className="wrap g-packs">
        <Reveal className="g-head">
          <span className="eyebrow">Propuestas</span>
          <h2>Elige un punto de partida.<br /><em>Lo afinamos contigo.</em></h2>
        </Reveal>
        <div className="g-packs__grid">
          {PACKS.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} className="packwrap">
              <article className={`pack ${p.hot ? 'pack--hot' : ''}`}>
                <div className="pack__img"><img src={p.img} alt="" loading="lazy" />{p.hot && <span className="tag"><Sparkles size={12} /> La más pedida</span>}</div>
                <div className="pack__body">
                  <h3>{p.id}</h3>
                  <span className="pack__pax"><Users size={14} /> {p.pax}</span>
                  <div className="pack__price"><small>desde</small> {eur(p.from)}<small>/persona</small></div>
                  <ul>{p.items.map((it) => <li key={it}><Check size={15} />{it}</li>)}</ul>
                  <button className={`btn ${p.hot ? 'btn--white' : ''}`} onClick={() => toForm(p.id)}>Pedir esta propuesta <ArrowRight size={16} /></button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="propuesta" className="g-form">
        <img className="g-form__bg" src="/img/ev-form.jpg" alt="" loading="lazy" />
        <div className="g-form__shade" />
        <div className="wrap g-form__grid">
          <Reveal className="g-form__intro">
            <span className="eyebrow eyebrow--light"><i /> Solicitar propuesta</span>
            <h2>Cuéntanos tu evento.<br /><em>Te respondemos en 24 h.</em></h2>
            <p>Sin compromiso. Te enviamos menú, presupuesto cerrado y las opciones de servicio.</p>
            <a href="tel:958735357" className="g-form__tel"><Phone size={16} /> 958 73 53 57</a>
            <a href="#/whatsapp" className="g-form__tel"><MessageCircle size={16} /> Prefiero WhatsApp</a>
          </Reveal>

          <div className="glass g-card">
            {sent ? (
              <div className="g-ok">
                <span className="g-ok__tick"><Check size={34} /></span>
                <h3>¡Propuesta solicitada!</h3>
                <p>Gracias, {f.name.split(' ')[0]}. Preparamos tu <b>{f.pack ? `pack ${f.pack}` : f.type.toLowerCase()}</b> para <b>{f.people} personas</b> y te llamamos al <b>{f.phone}</b> en menos de 24 horas.</p>
                <button className="btn btn--white" onClick={() => setSent(false)}>Editar solicitud</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); ok && setSent(true) }}>
                <label className="fl">Tipo de evento</label>
                <div className="chips">
                  {EVENTS.map((e) => (
                    <button type="button" key={e.id} className={f.type === e.id ? 'on' : ''} onClick={() => set('type', e.id)}>{e.id}</button>
                  ))}
                </div>

                <div className="fgrid">
                  <div>
                    <label className="fl"><Calendar size={13} /> Fecha</label>
                    <input type="date" value={f.date} onChange={(e) => set('date', e.target.value)} />
                  </div>
                  <div>
                    <label className="fl"><Users size={13} /> Personas</label>
                    <div className="stepper">
                      <button type="button" aria-label="Menos" onClick={() => set('people', Math.max(2, f.people - (f.people > 20 ? 5 : 1)))}><Minus size={16} /></button>
                      <output>{f.people}</output>
                      <button type="button" aria-label="Más" onClick={() => set('people', Math.min(300, f.people + (f.people >= 20 ? 5 : 1)))}><Plus size={16} /></button>
                    </div>
                  </div>
                </div>

                <label className="fl"><MapPin size={13} /> Ubicación</label>
                <input type="text" placeholder="Localidad o finca" value={f.place} onChange={(e) => set('place', e.target.value)} />

                <label className="fl"><Wallet size={13} /> Presupuesto aproximado <b className="bud">{eur(f.budget)}</b></label>
                <input type="range" min="200" max="8000" step="50" value={f.budget} onChange={(e) => set('budget', +e.target.value)} style={{ '--p': `${((f.budget - 200) / 7800) * 100}%` }} />
                <div className="verdict" key={vTitle}>
                  <b>≈ {eur(perPax)} / persona · {vTitle}</b>
                  <span>{vText}</span>
                </div>

                <div className="fgrid">
                  <div><label className="fl">Nombre</label><input type="text" placeholder="Tu nombre" value={f.name} onChange={(e) => set('name', e.target.value)} /></div>
                  <div><label className="fl">Teléfono</label><input type="tel" placeholder="6xx xxx xxx" value={f.phone} onChange={(e) => set('phone', e.target.value)} /></div>
                </div>
                {f.pack && <div className="packtag">Pack elegido: <b>{f.pack}</b> <button type="button" onClick={() => set('pack', '')}>quitar</button></div>}

                <button className="btn btn--lg btn--white g-submit" disabled={!ok}>Solicitar propuesta <ArrowRight size={18} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
