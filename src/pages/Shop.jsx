import { useMemo, useState } from 'react'
import { Search, Snowflake, Clock, Store, Sparkles, ArrowRight, Plus, Percent } from 'lucide-react'
import { CATEGORIES, PRODUCTS, eur, perPerson, unitLabel } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Reveal } from '../components/Shell'
import { Countdown } from '../components/Offer'
import { useStore } from '../context/Store'

const HEAD = {
  todos: { t: 'Elige tu', em: 'producto', p: 'Todo lo que llega cada mañana a nuestras tres pescaderías.' },
  ofertas: { t: 'Ofertas', em: 'de la semana', p: 'Producto fresco con precio rebajado. Se renuevan cada semana y hasta fin de existencias.' },
  pescado: { t: 'Pescado', em: 'de lonja', p: 'Lubina, dorada, salmón y calamar, limpios y a tu gusto.' },
  marisco: { t: 'Marisco', em: 'del día', p: 'Gamba roja, cigala y pulpo, de las lonjas de Garrucha y Santa Pola.' },
  gourmet: { t: 'Selección', em: 'gourmet', p: 'Conservas artesanas y producto para regalar.' },
  preparados: { t: 'Cocina', em: 'de la casa', p: 'Listos para calentar: llegas a casa y a la mesa.' },
}

const PERKS = [
  [Snowflake, 'Cadena de frío', 'Del barco a tu bolsa, sin interrupciones'],
  [Clock, 'Listo en 2 horas', 'Pide online y recoge en tienda'],
  [Store, '3 pescaderías', 'Baza, Tíjola y Cortes de Baza'],
  [Sparkles, 'A tu gusto', 'Limpio, fileteado o para horno, sin coste'],
]

export default function ShopPage() {
  const { route, go, addToCart } = useStore()
  const cat = route.param === 'ofertas' || CATEGORIES.some((c) => c.id === route.param) ? route.param : 'todos'
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('destacados')
  const [today, setToday] = useState(false)
  const h = HEAD[cat]

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (cat === 'todos' || (cat === 'ofertas' ? p.offer : p.category === cat))
      && p.name.toLowerCase().includes(q.trim().toLowerCase())
      && (!today || p.stock === 'Disponible hoy'))
    if (sort === 'precio-asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') l = [...l].sort((a, b) => b.price - a.price)
    return l
  }, [cat, q, sort, today])

  const tabs = [{ id: 'todos', label: 'Todo' }, { id: 'ofertas', label: 'Ofertas' }, ...CATEGORIES]
  const offers = PRODUCTS.filter((p) => p.offer)
  const maxPct = Math.max(...offers.map((p) => p.offer.pct))
  const star = PRODUCTS.find((p) => p.id === 'gamba')
  const showStar = cat === 'todos' && !q && !today && sort === 'destacados'

  return (
    <>
      <section className="pagehead pagehead--shop" key={cat}>
        <div className="wrap">
          <span className="eyebrow eyebrow--light"><i /> Tienda online</span>
          <h1>{h.t} <em>{h.em}</em></h1>
          <p className="fade-in">{h.p}</p>
          {cat === 'ofertas' && <div className="offerhead"><span>Termina en</span><Countdown className="countdown--light" /></div>}
        </div>
      </section>

      <div className="perks">
        <div className="wrap perks__in">
          {PERKS.map(([Icon, t, d]) => (
            <div key={t}><Icon size={20} /><span><b>{t}</b><small>{d}</small></span></div>
          ))}
        </div>
      </div>

      <div className="filterbar">
        <div className="wrap filterbar__in">
          <div className="pills" role="tablist">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={cat === t.id} className={`${cat === t.id ? 'on' : ''} ${t.id === 'ofertas' ? 'pill--offer' : ''}`}
                onClick={() => (t.id === 'todos' ? go('tienda') : go('tienda', t.id))}>
                {t.label}<em>{t.id === 'todos' ? PRODUCTS.length : t.id === 'ofertas' ? offers.length : PRODUCTS.filter((p) => p.category === t.id).length}</em>
              </button>
            ))}
          </div>
          <div className="tools">
            <label className={`toggle ${today ? 'on' : ''}`}><input type="checkbox" checked={today} onChange={(e) => setToday(e.target.checked)} /><i /> Disponible hoy</label>
            <label className="search"><Search size={16} /><input placeholder="Buscar" value={q} onChange={(e) => setQ(e.target.value)} /></label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar">
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </div>

      <section className="wrap shopgrid">
        {showStar && (
          <Reveal className="promo">
            <span className="promo__ico"><Percent size={22} /></span>
            <div><b>Ofertas de la semana</b><small>Hasta -{maxPct}% en {offers.length} productos · termina el domingo</small></div>
            <Countdown className="countdown--light" />
            <a href="#/tienda/ofertas" className="btn btn--white btn--sm">Ver ofertas <ArrowRight size={14} /></a>
          </Reveal>
        )}
        {showStar && (
          <Reveal className="star">
            <div className="star__img"><img src={star.img} alt={star.full} /></div>
            <div className="star__txt">
              <span className="demo-badge"><Sparkles size={13} /> Pescado del día</span>
              <h2>{star.full}</h2>
              <p>{star.long} {star.short}</p>
              <div className="star__row">
                <span className="star__price">{eur(star.price)}<small>{unitLabel(star)}</small></span>
                <span className="star__pp">≈ {eur(perPerson(star))} por persona</span>
              </div>
              <div className="row">
                <button className="btn btn--lg btn--white" onClick={() => addToCart({ id: star.id, amt: 500, prep: 'Crudo' })}><Plus size={18} /> Añadir 500 g</button>
                <a className="btn btn--lg btn--glass" href={`#/producto/${star.id}`}>Ver ficha <ArrowRight size={16} /></a>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid" key={cat + sort + q + today}>
          {list.map((p, i) => <ProductCard key={p.id} p={p} delay={(i % 3) * 60} />)}
        </div>
        {list.length === 0 && <p className="empty">No hay productos con esos filtros.</p>}
        {cat === 'ofertas' && <p className="offernote">Precios con descuento ya aplicados. Ofertas válidas hasta el domingo o fin de existencias. Se pueden combinar con tu preparación a medida sin coste.</p>}

        <Reveal className="shopcta">
          <div>
            <h3>¿No sabes qué elegir?</h3>
            <p>Dinos para qué ocasión es y te recomendamos cantidades.</p>
          </div>
          <a href="#/cocinar" className="btn btn--white">¿Qué vas a cocinar?</a>
          <a href="#/ia" className="btn btn--glass">Pregúntale al pescadero</a>
        </Reveal>
      </section>
    </>
  )
}
