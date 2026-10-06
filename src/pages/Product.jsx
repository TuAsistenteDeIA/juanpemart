import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, MapPin, Snowflake, Users, MessageCircle, ShoppingBag, Clock, ChefHat, UtensilsCrossed } from 'lucide-react'
import { AMOUNTS, PREPS, PRODUCTS, defaultAmt, defaultPrep, fmtAmt, getProduct, priceOf, basePriceOf, salePrice, eur, unitLabel } from '../data/products'
import { Countdown } from '../components/Offer'
import { recipeOf, recipesWith } from '../data/recipes'
import { useStore } from '../context/Store'
import Money from '../components/Money'
import ProductCard from '../components/ProductCard'
import { Reveal } from '../components/Shell'

export default function ProductPage() {
  const { route, addToCart, addMany, go } = useStore()
  const p = getProduct(route.param) || PRODUCTS[0]
  const r = recipeOf(p.id)
  const [amt, setAmt] = useState(defaultAmt(p))
  const [prep, setPrep] = useState(defaultPrep(p))
  const [view, setView] = useState(0)
  const [added, setAdded] = useState(false)
  const [bought, setBought] = useState(false)

  // Vistas de la galería: la foto del producto y el plato de su receta
  const views = [
    { label: 'Producto', src: p.img, s: 1, o: p.pos || '50% 50%' },
    ...(r ? [{ label: 'En tu mesa', src: r.img, s: 1, o: '50% 50%', recipe: true }] : []),
  ]

  const price = priceOf(p, amt)
  const people = p.portion ? Math.max(1, Math.round(amt / p.portion)) : null
  const preps = PREPS[p.category]
  const others = recipesWith(p.id).filter((x) => x.id !== r?.id)
  const pairs = PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category).slice(0, 3)
  const recLines = r ? r.ingredients.filter((i) => i.pid).map((i) => ({ id: i.pid, amt: i.amt, prep: i.prep })) : []
  const recTotal = recLines.reduce((n, l) => n + priceOf(getProduct(l.id), l.amt), 0)

  const add = () => {
    addToCart({ id: p.id, amt, prep })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }
  const buyRecipe = () => { addMany(recLines, 'Ingredientes de la receta añadidos'); setBought(true); setTimeout(() => setBought(false), 1800) }

  return (
    <>
      <div className="wrap pdp">
        <a href="#/tienda" className="back"><ArrowLeft size={16} /> Volver a la tienda</a>

        <div className="pdp__grid">
          <div className="gallery">
            <div className="gallery__main">
              {views.map((v, i) => (
                <img key={i} src={v.src} alt={v.recipe ? r.name : p.full} className={i === view ? 'on' : ''}
                  style={{ transform: `scale(${v.s})`, transformOrigin: v.o, objectPosition: v.recipe ? '50% 50%' : (p.pos || '50% 50%') }} />
              ))}
              {p.badge && views[view].label === 'Producto' && <span className="tag">{p.badge}</span>}
              {views[view].recipe && (
                <a className="gallery__recipe" href={`#/receta/${r.id}`}>
                  <UtensilsCrossed size={16} />
                  <span><small>Receta · {r.time} min</small><b>{r.name}</b></span>
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
            <div className="gallery__thumbs">
              {views.map((v, i) => (
                <button key={v.label} className={i === view ? 'on' : ''} onClick={() => setView(i)} aria-label={v.label}>
                  <img src={v.src} alt="" style={{ transform: `scale(${v.s})`, transformOrigin: v.o }} />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__info">
            <span className="eyebrow">{p.category}</span>
            <h1>{p.full}</h1>
            <p className="pdp__lead">{p.long}</p>
            <ul className="facts">
              <li><MapPin size={15} /> {p.origin}</li>
              <li className={p.stock === 'Disponible hoy' ? 'ok' : 'low'}><Clock size={15} /> {p.stock}</li>
              <li><Snowflake size={15} /> Cadena de frío</li>
            </ul>
            {p.offer && (
              <div className="offerbox">
                <span className="offerbox__pct">-{p.offer.pct}%</span>
                <div><b>Oferta de la semana</b><small>Antes {eur(p.price)}{unitLabel(p)} · ahora {eur(salePrice(p))}{unitLabel(p)}</small></div>
                <Countdown />
              </div>
            )}

            <div className="opt">
              <h4>Cantidad</h4>
              <div className="seg">
                {AMOUNTS[p.unit].map(([v, l]) => (
                  <button key={v} className={amt === v ? 'on' : ''} onClick={() => setAmt(v)}>{l}</button>
                ))}
              </div>
              {people && <p className="hint"><Users size={14} /><span>Para unas <b>{people} {people === 1 ? 'persona' : 'personas'}</b>. {p.tips}</span></p>}
              {!people && <p className="hint">{p.tips}</p>}
            </div>

            <div className="opt">
              <h4>{p.category === 'pescado' ? '¿Cómo la quieres?' : p.category === 'marisco' ? '¿Cómo lo quieres?' : 'Presentación'}</h4>
              <div className="radios">
                {preps.map(([l, d]) => (
                  <label key={l} className={prep === l ? 'on' : ''}>
                    <input type="radio" name="prep" checked={prep === l} onChange={() => setPrep(l)} />
                    <span className="radio__dot">{prep === l && <Check size={12} />}</span>
                    <span><b>{l}</b><small>{d}</small></span>
                  </label>
                ))}
              </div>
            </div>

            <div className="buybox">
              <div>
                <small>{fmtAmt(p, amt)} · {prep.toLowerCase()}</small>
                <Money value={price} className="buybox__price" />
                <em>{p.offer ? <><s>{eur(basePriceOf(p, amt))}</s> · ahorras {eur(basePriceOf(p, amt) - price)} · </> : null}{eur(salePrice(p))}{unitLabel(p)}</em>
              </div>
              <button className={`btn btn--lg ${added ? 'btn--ok' : ''}`} onClick={added ? () => go('carrito') : add}>
                {added ? <><Check size={18} /> Añadido · ver pedido</> : <><ShoppingBag size={18} /> Añadir al pedido</>}
              </button>
            </div>
            <a href="#/whatsapp" className="link wa-link"><MessageCircle size={16} /> ¿Dudas? Pregunta al pescadero por WhatsApp</a>
          </div>
        </div>
      </div>

      {r && (
        <section className="wrap sec-sm">
          <Reveal className="cook-feature">
            <a className="cook-feature__img" href={`#/receta/${r.id}`}>
              <img src={r.img} alt={r.name} loading="lazy" />
              <span className="cook-feature__tag"><UtensilsCrossed size={14} /> Cocínalo en casa</span>
            </a>
            <div className="cook-feature__body">
              <span className="eyebrow">Receta con {p.name.toLowerCase()}</span>
              <h2>{r.name}</h2>
              <p>{r.intro}</p>
              <div className="meta"><span><Clock size={15} /> {r.time} min</span><span><ChefHat size={15} /> {r.level}</span><span><Users size={15} /> {r.people} personas</span></div>
              <ul className="cook-feature__ing">
                {r.ingredients.slice(0, 5).map((i, k) => <li key={k} className={i.pid ? 'linked' : ''}>{i.pid ? <a href={`#/producto/${i.pid}`}>{i.text}</a> : i.text}</li>)}
              </ul>
              <div className="row">
                <a href={`#/receta/${r.id}`} className="btn btn--lg">Ver receta <ArrowRight size={16} /></a>
                <button className={`btn btn--lg btn--ghost ${bought ? 'btn--ok' : ''}`} onClick={buyRecipe}>
                  {bought ? <><Check size={16} /> Añadido</> : <>Comprar ingredientes · {eur(recTotal)}</>}
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {others.length > 0 && (
        <section className="wrap sec-sm">
          <Reveal className="section__head"><span className="eyebrow">Más ideas con {p.name.toLowerCase()}</span><h2>Otras recetas</h2></Reveal>
          <div className="rgrid rgrid--sm">{others.map((x) => <RecipeMini key={x.id} r={x} />)}</div>
        </section>
      )}

      <section className="wrap sec-sm" style={{ paddingBottom: 100 }}>
        <Reveal className="section__head"><span className="eyebrow">Combina con</span><h2>Para completar tu mesa</h2></Reveal>
        <div className="grid">{pairs.map((x, i) => <ProductCard key={x.id} p={x} delay={i * 70} />)}</div>
      </section>
    </>
  )
}

export function RecipeMini({ r }) {
  return (
    <a href={`#/receta/${r.id}`} className="rmini">
      <img src={r.img} alt="" loading="lazy" />
      <div><b>{r.name}</b><span>{r.time} min · {r.level}</span></div>
    </a>
  )
}
