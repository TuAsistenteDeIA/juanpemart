import { useState } from 'react'
import { LogOut, RotateCcw, Heart, Package } from 'lucide-react'
import { useStore } from '../context/Store'
import { getProduct, fmtAmt, priceOf, eur } from '../data/products'

const ORDERS = [
  { id: '#1042', date: '28 sep', lines: [{ id: 'lubina', amt: 1500, prep: 'Para horno' }, { id: 'gamba', amt: 500, prep: 'Crudo' }] },
  { id: '#1031', date: '14 sep', lines: [{ id: 'pulpo', amt: 1000, prep: 'Cocido' }] },
]

export default function AccountPage() {
  const { user, setUser, addMany } = useStore()
  const [name, setName] = useState('')

  if (!user) {
    return (
      <section className="wrap login">
        <div className="login__card">
          <span className="eyebrow">Mi cuenta</span>
          <h1>Tus pedidos,<br /><em>siempre a mano</em></h1>
          <p>Repite tu compra habitual en un toque y guarda tu pescadería favorita.</p>
          <form onSubmit={(e) => { e.preventDefault(); setUser(name.trim() || 'Cliente') }}>
            <input placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Correo electrónico" type="email" />
            <button className="btn btn--lg">Entrar a la demo</button>
          </form>
          <small>Demo visual: no se guarda ningún dato.</small>
        </div>
      </section>
    )
  }

  return (
    <section className="wrap acct">
      <header><span className="eyebrow">Mi cuenta</span><h1>Hola, <em>{user}</em></h1>
        <button className="link" onClick={() => setUser(null)}><LogOut size={15} /> Salir</button></header>
      <div className="acct__grid">
        <div className="acct__box">
          <h3><Package size={18} /> Pedidos anteriores</h3>
          {ORDERS.map((o) => {
            const total = o.lines.reduce((n, l) => n + priceOf(getProduct(l.id), l.amt), 0)
            return (
              <article key={o.id} className="order">
                <div><b>{o.id} · {o.date}</b>
                  <span>{o.lines.map((l) => `${fmtAmt(getProduct(l.id), l.amt)} ${getProduct(l.id).name}`).join(' · ')}</span></div>
                <em>{eur(total)}</em>
                <button className="btn btn--sm btn--ghost" onClick={() => addMany(o.lines, 'Pedido repetido')}><RotateCcw size={14} /> Repetir</button>
              </article>
            )
          })}
        </div>
        <div className="acct__box">
          <h3><Heart size={18} /> Tu pescadería favorita</h3>
          <p>Baza · Av. José de Mora, 19</p>
          <h3 style={{ marginTop: 22 }}>Avisos</h3>
          <p>Te avisamos por WhatsApp cuando llegue gamba roja de Garrucha.</p>
        </div>
      </div>
    </section>
  )
}
