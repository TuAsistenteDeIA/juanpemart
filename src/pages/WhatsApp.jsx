import { useState } from 'react'
import { Check, CheckCheck, ExternalLink, Send, Phone, Video, ArrowLeft } from 'lucide-react'
import { useStore, linePrice } from '../context/Store'
import { SAMPLE, buildMessage } from '../data/order'
import { LOCALES } from '../data/content'
import { WHATSAPP, eur } from '../data/products'

export default function WhatsAppPage() {
  const { cart, opts, setOpts, total } = useStore()
  const demo = cart.length === 0
  const lines = demo ? SAMPLE : cart
  const sum = demo ? SAMPLE.reduce((n, l) => n + linePrice(l), 0) : total
  const msg = buildMessage(lines, opts, sum)
  const [stage, setStage] = useState('draft') // draft → sending → sent → reply
  const hhmm = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

  const send = () => {
    setStage('sending')
    setTimeout(() => setStage('sent'), 700)
    setTimeout(() => setStage('reply'), 2400)
  }

  return (
    <section className="wrap wa">
      <div className="wa__copy">
        <a href="#/carrito" className="back"><ArrowLeft size={16} /> Volver al pedido</a>
        <span className="eyebrow">Pedido por WhatsApp</span>
        <h1>Tu pedido,<br /><em>en una conversación</em></h1>
        <p>Sin registros ni formularios. Revisamos tu pedido, lo preparamos como tú quieras y te avisamos cuando esté listo.</p>

        <div className="wa__opts">
          <label>Entrega</label>
          <div className="seg">
            <button className={opts.mode === 'recoger' ? 'on' : ''} onClick={() => setOpts({ ...opts, mode: 'recoger' })}>Recoger en tienda</button>
            <button className={opts.mode === 'domicilio' ? 'on' : ''} onClick={() => setOpts({ ...opts, mode: 'domicilio' })}>A domicilio</button>
          </div>
          {opts.mode === 'recoger' && (
            <select className="sel" value={opts.local} onChange={(e) => setOpts({ ...opts, local: e.target.value })}>
              {LOCALES.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          )}
          <label>Notas para el pescadero</label>
          <textarea rows={2} placeholder="Ej.: sin espinas, para cocer hoy…" value={opts.note} onChange={(e) => setOpts({ ...opts, note: e.target.value })} />
        </div>

        {demo && <p className="demo-note">Mostrando un pedido de ejemplo. <a href="#/tienda">Añade productos</a> para generar el tuyo.</p>}

        <div className="wa__cta">
          <button className="btn btn--lg wa-btn" disabled={stage !== 'draft'} onClick={send}>
            <Send size={18} /> {stage === 'draft' ? 'Enviar pedido' : 'Pedido enviado'}
          </button>
          <a className="link" target="_blank" rel="noreferrer" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`}>
            Abrir en WhatsApp real <ExternalLink size={14} />
          </a>
        </div>
        <small className="muted">En la demo, «Enviar pedido» solo simula el envío.</small>
      </div>

      <div className="phone">
        <div className="phone__bar">
          <span className="av">JP</span>
          <div><b>Pescados JuanPemart</b><small>{stage === 'sending' ? 'escribiendo…' : 'en línea'}</small></div>
          <Video size={18} /><Phone size={18} />
        </div>
        <div className="phone__chat">
          <div className="bubble out">
            <pre>{msg}</pre>
            <span className="meta">{hhmm} {stage === 'draft' ? '' : stage === 'sending' ? <Check size={14} /> : <CheckCheck size={14} className={stage === 'reply' ? 'read' : ''} />}</span>
          </div>
          {stage === 'reply' && (
            <div className="bubble in pop-in">
              <p>¡Recibido! 🐟 Estamos preparando tu pedido. Total aproximado <b>{eur(sum)}</b>. Te avisamos en unos minutos.</p>
              <span className="meta">{hhmm}</span>
            </div>
          )}
        </div>
        <div className="phone__in"><span>Escribe un mensaje</span><Send size={18} /></div>
      </div>
    </section>
  )
}
