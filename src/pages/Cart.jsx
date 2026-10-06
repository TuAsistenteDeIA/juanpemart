import { Minus, Plus, Trash2, Truck, Store, MessageCircle, ArrowRight, ShoppingBag, Truck as Van } from 'lucide-react'
import { getProduct, fmtAmt, eur } from '../data/products'
import { LOCALES } from '../data/content'
import { DELIVERY, FREE_FROM } from '../data/order'
import { useStore, linePrice } from '../context/Store'
import Money from '../components/Money'

export default function CartPage() {
  const { cart, setQty, total, saving, opts, setOpts, go } = useStore()
  const ship = opts.mode === 'domicilio' && total < FREE_FROM && total > 0 ? DELIVERY : 0
  const left = Math.max(0, FREE_FROM - total)

  if (!cart.length) {
    return (
      <section className="wrap emptystate">
        <span className="emptystate__ico"><ShoppingBag size={44} /></span>
        <span className="eyebrow">Tu pedido</span>
        <h1>Aún no hay nada<br /><em>en tu pedido</em></h1>
        <p>Empieza por lo más fresco del día o deja que te recomendemos.</p>
        <div className="row">
          <a href="#/tienda" className="btn btn--lg">Ir a la tienda <ArrowRight size={18} /></a>
          <a href="#/cocinar" className="btn btn--lg btn--ghost">¿Qué vas a cocinar?</a>
        </div>
      </section>
    )
  }

  return (
    <section className="wrap cart">
      <header className="cart__head"><span className="eyebrow">Tu pedido</span><h1>Casi listo</h1></header>

      <div className="cart__grid">
        <div className="cart__lines">
          <div className={`freebar ${left === 0 ? 'done' : ''}`}>
            <Van size={18} />
            <div>
              <b>{left === 0 ? '¡Envío gratis a domicilio!' : `Te faltan ${eur(left)} para el envío gratis`}</b>
              <i><span style={{ width: `${Math.min(100, (total / FREE_FROM) * 100)}%` }} /></i>
            </div>
          </div>

          {cart.map((l) => {
            const p = getProduct(l.id)
            return (
              <article key={l.key} className="cline">
                <a href={`#/producto/${p.id}`}><img src={p.img} alt="" /></a>
                <div className="cline__info">
                  <b>{p.full}</b>
                  <span>{fmtAmt(p, l.amt)} · {l.prep}</span>
                  <div className="qty">
                    <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Menos"><Minus size={14} /></button>
                    <output>{l.qty}</output>
                    <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Más"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="cline__price">
                  <Money value={linePrice(l)} />
                  <button onClick={() => setQty(l.key, 0)} aria-label="Quitar"><Trash2 size={16} /></button>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="summary">
          <h3>Resumen</h3>
          <div className="seg seg--full">
            <button className={opts.mode === 'recoger' ? 'on' : ''} onClick={() => setOpts({ ...opts, mode: 'recoger' })}><Store size={15} /> Recoger</button>
            <button className={opts.mode === 'domicilio' ? 'on' : ''} onClick={() => setOpts({ ...opts, mode: 'domicilio' })}><Truck size={15} /> A domicilio</button>
          </div>
          {opts.mode === 'recoger' && (
            <select value={opts.local} onChange={(e) => setOpts({ ...opts, local: e.target.value })} className="sel">
              {LOCALES.map((x) => <option key={x.id} value={x.id}>Recoger en {x.name}</option>)}
            </select>
          )}
          <dl>
            <div><dt>Productos</dt><dd>{eur(total)}</dd></div>
            {saving > 0.005 && <div className="saving"><dt>Ahorro en ofertas</dt><dd>-{eur(saving)}</dd></div>}
            <div><dt>Envío</dt><dd>{opts.mode === 'recoger' ? 'Gratis' : ship ? eur(ship) : 'Gratis'}</dd></div>
            <div className="sum"><dt>Total aprox.</dt><dd><Money value={total + ship} /></dd></div>
          </dl>
          <small>El precio final se confirma al pesar tu pedido.</small>
          <button className="btn btn--lg wa-btn" onClick={() => go('whatsapp')}><MessageCircle size={18} /> Pedir por WhatsApp</button>
          <a href="#/tienda" className="link" style={{ justifySelf: 'center' }}>Seguir comprando</a>
        </aside>
      </div>
    </section>
  )
}
