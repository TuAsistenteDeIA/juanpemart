import { Plus, Check, MapPin, ArrowRight, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../context/Store'
import { AMOUNTS, eur, defaultAmt, defaultPrep, fmtAmt, perPerson, priceOf } from '../data/products'
import { recipeOf } from '../data/recipes'
import { Reveal } from './Shell'
import { Price, OfferBadge } from './Offer'

export default function ProductCard({ p, delay = 0, feature }) {
  const { addToCart, go } = useStore()
  const [done, setDone] = useState(false)
  const [amt, setAmt] = useState(defaultAmt(p))
  const low = p.stock !== 'Disponible hoy'
  const pp = perPerson(p)
  const r = recipeOf(p.id)

  const add = (e) => {
    e.stopPropagation()
    addToCart({ id: p.id, amt, prep: defaultPrep(p) })
    setDone(true)
    setTimeout(() => setDone(false), 1400)
  }
  const pick = (e, v) => { e.stopPropagation(); setAmt(v) }

  return (
    <Reveal delay={delay} className={feature ? 'pwrap--feature' : ''}>
      <article className={`pcard ${feature ? 'pcard--feature' : ''}`} onClick={() => go('producto', p.id)}>
        <div className="pcard__img">
          <img className="pcard__main" src={p.img} alt={p.full} loading="lazy" style={{ objectPosition: p.pos || '50% 50%' }} />
          {r && <img className="pcard__alt" src={r.img} alt={`${r.name}: receta con ${p.name.toLowerCase()}`} loading="lazy" />}
          {p.offer ? <OfferBadge p={p} /> : p.badge && <span className="tag">{p.badge}</span>}
          <span className={`stockpill ${low ? 'stockpill--low' : ''}`}><i />{p.stock}</span>
          {r && <span className="pcard__altlbl"><UtensilsCrossed size={12} /> En tu mesa</span>}
          <div className="pcard__amts" onClick={(e) => e.stopPropagation()}>
            {AMOUNTS[p.unit].slice(0, 3).map(([v, l]) => (
              <button key={v} className={amt === v ? 'on' : ''} onClick={(e) => pick(e, v)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="pcard__body">
          <div className="pcard__top">
            <h3>{p.name}</h3>
            <Price p={p} />
          </div>
          <p>{p.short}</p>
          <div className="pcard__meta">
            <span><MapPin size={13} /> {p.origin}</span>
            {pp && <span>≈ {eur(pp)} / persona</span>}
          </div>
          {r && (
            <a className="pcard__recipe" href={`#/receta/${r.id}`} onClick={(e) => e.stopPropagation()}>
              <img src={r.img} alt="" loading="lazy" />
              <span><small>Receta · {r.time} min · {r.level}</small><b>{r.name}</b></span>
              <ArrowRight size={16} />
            </a>
          )}
          <div className="pcard__foot">
            <span className="pcard__total"><small>{fmtAmt(p, amt)}</small><b>{eur(priceOf(p, amt))}</b></span>
            <button className={`btn btn--sm ${done ? 'btn--ok' : ''}`} onClick={add}>
              {done ? <><Check size={15} /> Añadido</> : <><Plus size={15} /> Añadir</>}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
