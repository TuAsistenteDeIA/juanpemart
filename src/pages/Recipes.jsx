import { useState } from 'react'
import { Clock, ChefHat, Users, ArrowRight, ArrowLeft, ShoppingBag, Check } from 'lucide-react'
import { RECIPES } from '../data/content'
import { getProduct, fmtAmt, priceOf, salePrice, eur, unitLabel } from '../data/products'
import { useStore } from '../context/Store'
import { Reveal } from '../components/Shell'
import Money from '../components/Money'

export function RecipeCard({ r, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <a href={`#/receta/${r.id}`} className="rcard">
        <div className="rcard__img">
          <img src={r.img} alt="" loading="lazy" />
          <span className="rcard__with">
            {r.ingredients.filter((i) => i.pid).slice(0, 3).map((i) => <img key={i.pid} src={getProduct(i.pid).img} alt={getProduct(i.pid).name} title={getProduct(i.pid).name} />)}
            <b>Con {r.ingredients.filter((i) => i.pid).map((i) => getProduct(i.pid).name.toLowerCase()).slice(0, 2).join(' y ')}</b>
          </span>
        </div>
        <div className="rcard__body">
          <h3>{r.name}</h3>
          <div className="meta"><span><Clock size={14} /> {r.time} min</span><span><ChefHat size={14} /> {r.level}</span><span><Users size={14} /> {r.people}</span></div>
          <span className="btn btn--sm btn--ghost">Ver receta <ArrowRight size={14} /></span>
        </div>
      </a>
    </Reveal>
  )
}

export default function RecipesPage() {
  const { route } = useStore()
  const r = RECIPES.find((x) => x.id === route.param)
  const [level, setLevel] = useState('Todas')
  if (r) return <RecipeDetail r={r} />
  const list = RECIPES.filter((x) => level === 'Todas' || x.level === level)
  return (
    <>
      <section className="pagehead pagehead--rec">
        <div className="wrap">
          <span className="eyebrow eyebrow--light"><i /> Recetas</span>
          <h1>Inspírate <em>y cocina</em></h1>
          <p>Recetas de la casa conectadas con el producto de la tienda: lees, compras los ingredientes y a cocinar.</p>
        </div>
      </section>
      <div className="filterbar">
        <div className="wrap filterbar__in">
          <div className="pills">{['Todas', 'Fácil', 'Media'].map((l) => <button key={l} className={level === l ? 'on' : ''} onClick={() => setLevel(l)}>{l}</button>)}</div>
        </div>
      </div>
      <section className="wrap sec-sm" style={{ paddingBottom: 110 }}>
        <div className="rgrid" key={level}>{list.map((x, i) => <RecipeCard key={x.id} r={x} delay={(i % 3) * 70} />)}</div>
      </section>
    </>
  )
}

function RecipeDetail({ r }) {
  const { addMany } = useStore()
  const [done, setDone] = useState(false)
  const star = getProduct(r.product)
  const lines = r.ingredients.filter((i) => i.pid).map((i) => ({ id: i.pid, amt: i.amt, prep: i.prep }))
  const total = lines.reduce((n, l) => n + priceOf(getProduct(l.id), l.amt), 0)
  const buy = () => { addMany(lines, 'Ingredientes añadidos al pedido'); setDone(true); setTimeout(() => setDone(false), 1800) }

  return (
    <>
      <section className="rhero">
        <img src={r.img} alt="" />
        <div className="rhero__shade" />
        <div className="wrap rhero__in">
          <a href="#/recetas" className="back back--light"><ArrowLeft size={16} /> Todas las recetas</a>
          <h1>{r.name}</h1>
          <div className="meta meta--light"><span><Clock size={15} /> {r.time} min</span><span><ChefHat size={15} /> {r.level}</span><span><Users size={15} /> {r.people} personas</span></div>
        </div>
      </section>

      <section className="wrap rdet">
        <div className="rdet__main">
          <p className="rdet__intro">{r.intro}</p>
          {star && (
            <a href={`#/producto/${star.id}`} className="starprod">
              <img src={star.img} alt={star.full} style={{ objectPosition: star.pos || '50% 50%' }} />
              <span><small>Producto protagonista</small><b>{star.full}</b><em>{eur(salePrice(star))}{unitLabel(star)}{star.offer ? ` · -${star.offer.pct}%` : ''} · {star.stock}</em></span>
              <ArrowRight size={18} />
            </a>
          )}
          <h3>Preparación</h3>
          <ol className="steps">{r.steps.map((s, i) => <li key={i}><span>{i + 1}</span><p>{s}</p></li>)}</ol>
        </div>

        <aside className="shopbox">
          <h3>Ingredientes</h3>
          <ul>
            {r.ingredients.map((i, k) => {
              const p = i.pid && getProduct(i.pid)
              return (
                <li key={k} className={p ? 'linked' : ''}>
                  {p ? <a href={`#/producto/${p.id}`}><img src={p.img} alt="" /><span><b>{i.text}</b><small>{fmtAmt(p, i.amt)} · {i.prep}</small></span><em>{eur(priceOf(p, i.amt))}</em></a>
                    : <span className="pantry"><i /> {i.text}</span>}
                </li>
              )
            })}
          </ul>
          <div className="shopbox__total"><span>Producto fresco</span><Money value={total} /></div>
          <button className={`btn btn--lg ${done ? 'btn--ok' : ''}`} onClick={buy}>{done ? <><Check size={18} /> Añadido</> : <><ShoppingBag size={18} /> Comprar ingredientes</>}</button>
          <small>Lo de despensa lo pones tú. Nosotros, el mar.</small>
        </aside>
      </section>
    </>
  )
}

