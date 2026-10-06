import { useMemo, useRef, useState } from 'react'
import { MapPin, Phone, Clock, Navigation, Crosshair, Check, Store } from 'lucide-react'
import { LOCALES, TOWNS, openStatus, hoursRows } from '../data/locales'
import { useStore } from '../context/Store'
import { Reveal } from '../components/Shell'

const km = (a, b) => {
  const R = 6371, rad = (x) => (x * Math.PI) / 180
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}
const dist = (d) => (d < 1 ? `${Math.round(d * 1000 / 50) * 50} m` : `${d < 10 ? d.toFixed(1).replace('.', ',') : Math.round(d)} km`)

export default function LocalesPage() {
  const { say, setOpts, opts } = useStore()
  const [sel, setSel] = useState('mora')
  const [town, setTown] = useState('Todas')
  const [openNow, setOpenNow] = useState(false)
  const [where, setWhere] = useState(null) // { d: {id: km}, near: id, real: bool }
  const [busy, setBusy] = useState(false)
  const cards = useRef({})

  const status = useMemo(() => Object.fromEntries(LOCALES.map((l) => [l.id, openStatus(l)])), [])
  let list = LOCALES.filter((l) => (town === 'Todas' || l.town === town) && (!openNow || status[l.id].open))
  if (where) list = [...list].sort((a, b) => where.d[a.id] - where.d[b.id])
  const cur = LOCALES.find((l) => l.id === sel) || LOCALES[0]

  const choose = (id, scroll) => {
    setSel(id)
    if (scroll) cards.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const locate = () => {
    setBusy(true)
    const done = (pos, real) => {
      const d = Object.fromEntries(LOCALES.map((l) => [l.id, km(pos, l)]))
      const near = Object.entries(d).sort((a, b) => a[1] - b[1])[0][0]
      setWhere({ d, near, real }); setTown('Todas'); setSel(near); setBusy(false)
      say(`Tu pescadería más cercana: ${LOCALES.find((l) => l.id === near).name}`)
    }
    // Sin permiso o sin geolocalización: la demo parte del centro de Baza
    const fallback = () => done({ lat: 37.4905, lon: -2.7735 }, false)
    if (!navigator.geolocation) return fallback()
    navigator.geolocation.getCurrentPosition((p) => done({ lat: p.coords.latitude, lon: p.coords.longitude }, true), fallback, { timeout: 6000 })
  }

  const gmaps = (l, dir) => `https://www.google.com/maps/${dir ? 'dir/?api=1&destination=' : 'search/?api=1&query='}${encodeURIComponent(l.query)}`
  const count = (t) => (t === 'Todas' ? LOCALES.length : LOCALES.filter((l) => l.town === t).length)

  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow eyebrow--light"><i /> Nuestras pescaderías</span>
          <h1>Tu pescadería <em>más cercana</em></h1>
          <p>Cuatro en Baza, una en Tíjola y otra en Cortes de Baza. El mismo producto de lonja y el mismo trato en todas.</p>
          <div className="locstats">
            <span><b>6</b> pescaderías</span><span><b>3</b> localidades</span><span><b>2</b> provincias</span>
          </div>
          <button className="btn btn--white btn--lg" onClick={locate} disabled={busy}><Crosshair size={18} /> {busy ? 'Buscando…' : 'Encuentra la más cercana'}</button>
        </div>
      </section>

      <div className="filterbar">
        <div className="wrap filterbar__in">
          <div className="pills">
            {['Todas', ...TOWNS].map((t) => (
              <button key={t} className={town === t ? 'on' : ''} onClick={() => setTown(t)}>{t}<em>{count(t)}</em></button>
            ))}
          </div>
          <label className={`toggle ${openNow ? 'on' : ''}`}><input type="checkbox" checked={openNow} onChange={(e) => setOpenNow(e.target.checked)} /><i /> Abiertas ahora</label>
        </div>
      </div>

      <section className="wrap locs">
        <div className="map" aria-label="Mapa esquemático de las pescaderías">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dbeaff" /><stop offset="1" stopColor="#b9d6ff" /></linearGradient></defs>
            <rect width="100" height="100" fill="#f3efe4" />
            <path d="M62 100 C 66 82, 80 80, 100 74 L100 100 Z" fill="url(#sea)" />
            <g stroke="#fff" strokeWidth=".9" fill="none" strokeLinecap="round"><path d="M0 62 C 25 50, 35 42, 46 38 S 70 52, 84 72" /><path d="M16 52 C 28 46, 38 42, 46 38" /><path d="M46 38 C 52 22, 60 10, 70 0" /></g>
            <g stroke="#e6d5b8" strokeWidth=".35" fill="none"><path d="M0 20 C 20 25, 40 15, 60 22 S 90 28, 100 20" /><path d="M0 86 C 20 80, 30 92, 50 88" /><path d="M10 0 C 14 30, 8 60, 14 100" /></g>
          </svg>
          <span className="maptown" style={{ left: '50%', top: '16%' }}>BAZA</span>
          <span className="maptown" style={{ left: '8%', top: '62%' }}>CORTES DE BAZA</span>
          <span className="maptown" style={{ left: '78%', top: '82%' }}>TÍJOLA</span>
          {LOCALES.map((l) => {
            const visible = list.some((x) => x.id === l.id)
            return (
              <button key={l.id} className={`pin ${sel === l.id ? 'on' : ''} ${where?.near === l.id ? 'near' : ''} ${visible ? '' : 'dim'}`}
                style={{ left: `${l.map.x}%`, top: `${l.map.y}%` }} onClick={() => choose(l.id, true)} aria-label={l.name}>
                <span className="pin__dot"><MapPin size={14} /></span>
                <span className="pin__lbl">{l.short}</span>
              </button>
            )
          })}
          <div className="map__card" key={cur.id}>
            <b>{cur.name}</b>
            <span>{cur.address}</span>
            <a className="btn btn--sm" href={gmaps(cur)} target="_blank" rel="noreferrer"><MapPin size={14} /> Ver en mapa</a>
          </div>
        </div>

        <div className="loclist">
          {where && !where.real && <p className="demo-note">No hemos podido usar tu ubicación; mostramos las distancias desde el centro de Baza.</p>}
          {list.length === 0 && <p className="empty">Ninguna pescadería abierta en este momento con ese filtro.</p>}
          {list.map((l, i) => {
            const st = status[l.id]
            const mine = opts.local === l.id
            return (
              <Reveal key={l.id} delay={i * 60}>
                <article ref={(el) => (cards.current[l.id] = el)} className={`loc ${sel === l.id ? 'on' : ''}`} onClick={() => choose(l.id)}>
                  <img src={l.img} alt="" loading="lazy" />
                  <div className="loc__body">
                    <div className="loc__top">
                      <h3>{l.town === 'Baza' ? l.short.replace(/, 19$/, '') : l.town}</h3>
                      {where?.near === l.id && <span className="chip">Más cercana</span>}
                      {where && <span className="chip chip--soft">A {dist(where.d[l.id])}</span>}
                    </div>
                    <small>{l.town === 'Baza' ? `Baza · ${l.tag}` : `${l.province} · ${l.tag}`}</small>
                    <span className={`status ${st.open ? 'status--open' : ''}`}><i />{st.text}</span>
                    <p><MapPin size={15} /> {l.address}</p>
                    <p className="loc__desc">{l.desc}</p>
                    <ul className="hours">
                      {hoursRows(l).map(([d, h]) => <li key={d}><Clock size={14} /><b>{d}</b> {h}</li>)}
                      <li className="hours__note">Horario orientativo de la demo</li>
                    </ul>
                    <div className="loc__act">
                      <a href={`tel:${l.tel.replace(/\s/g, '')}`} className="btn btn--sm btn--ghost" onClick={(e) => e.stopPropagation()}><Phone size={14} /> {l.tel}</a>
                      <a href={gmaps(l, true)} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost" onClick={(e) => e.stopPropagation()}><Navigation size={14} /> Cómo llegar</a>
                      <a href={gmaps(l)} target="_blank" rel="noreferrer" className="btn btn--sm" onClick={(e) => e.stopPropagation()}>Ver en mapa</a>
                    </div>
                    <button className={`pickup ${mine ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); setOpts({ ...opts, mode: 'recoger', local: l.id }); say(`Recogerás en ${l.name}`) }}>
                      {mine ? <><Check size={15} /> Tu pescadería de recogida</> : <><Store size={15} /> Recoger mis pedidos aquí</>}
                    </button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
