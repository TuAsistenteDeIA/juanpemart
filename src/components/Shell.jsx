import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Home, Store, ShoppingBag, MessageCircle, User, Phone, MapPin, AtSign, Menu, X, ArrowUpRight } from 'lucide-react'
import { useStore } from '../context/Store'

export const Logo = ({ light }) => (
  <a href="#/inicio" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Pescados JuanPemart">
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="var(--blue)" />
      <path d="M6 22c4-5 7-5 11 0s7 5 11 0 4-3 6-3" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9 28c4-4 7-4 11 0s7 4 11 0" fill="none" stroke="var(--sand)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
    <span>
      <b>Juan<i>Pemart</i></b>
      <small>Pescados desde 1996</small>
    </span>
  </a>
)

// Aparición suave al hacer scroll
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold: 0.12 },
    )
    ref.current && io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

const NAV = [
  ['inicio', 'Inicio'], ['tienda', 'Tienda'], ['cocinar', 'Qué cocinar'],
  ['recetas', 'Recetas'], ['gourmet', 'Gourmet'], ['locales', 'Locales'],
]

export function Header() {
  const { route, count, bump, go } = useStore()
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(() => location.search.includes('menu')) // ?menu abre el cajón (para revisión)
  const key = `${route.page}/${route.param || ''}`
  const prevKey = useRef(key)
  useEffect(() => { if (prevKey.current !== key) { prevKey.current = key; setMenu(false) } }, [key])
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const dark = ['inicio', 'gourmet', 'tienda', 'recetas', 'receta', 'locales', 'lonja'].includes(route.page) && !solid
  return (
    <header className={`header ${solid ? 'is-solid' : ''} ${dark ? 'on-dark' : ''}`}>
      <div className="wrap header__in">
        <Logo light={dark} />
        <nav className="nav" aria-label="Principal">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#/${id}`} className={route.page === id ? 'on' : ''}>{label}</a>
          ))}
          <a href="#/ia" className={`nav__ia ${route.page === 'ia' ? 'on' : ''}`}>Pregunta al pescadero</a>
        </nav>
        <div className="header__tools">
          <button className="cartbtn" onClick={() => go('carrito')} aria-label={`Pedido, ${count} productos`}>
            <ShoppingBag size={20} />
            {count > 0 && <span key={bump} className="cartbtn__n">{count}</span>}
          </button>
          <button className="cartbtn menubtn" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-expanded={menu}><Menu size={22} /></button>
        </div>
      </div>
      {createPortal(<MobileMenu open={menu} onClose={() => setMenu(false)} route={route} />, document.body)}
    </header>
  )
}

const MENU = [
  ['inicio', 'Inicio'], ['tienda', 'Tienda'], ['tienda/ofertas', 'Ofertas de la semana'], ['cocinar', '¿Qué vas a cocinar?'],
  ['recetas', 'Recetas'], ['gourmet', 'Gourmet · Eventos'], ['locales', 'Nuestras pescaderías'], ['lonja', 'De la lonja a tu mesa'],
  ['redes', 'Redes'], ['ia', 'Pregúntale al pescadero'],
]

// Menú completo para móvil: la barra inferior solo tiene 5 accesos
function MobileMenu({ open, onClose, route }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [open, onClose])
  const cur = `${route.page}${route.param ? '/' + route.param : ''}`
  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <nav className="drawer__panel" aria-label="Menú">
        <div className="drawer__top">
          <Logo light />
          <button className="drawer__x" onClick={onClose} aria-label="Cerrar menú"><X size={22} /></button>
        </div>
        <ul>
          {MENU.map(([id, label], i) => (
            <li key={id} style={{ transitionDelay: `${open ? 60 + i * 35 : 0}ms` }}>
              <a href={`#/${id}`} className={cur === id || (id === 'tienda' && route.page === 'producto') ? 'on' : ''} tabIndex={open ? 0 : -1}>
                <span>{String(i + 1).padStart(2, '0')}</span>{label}<ArrowUpRight size={18} />
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer__foot">
          <a href="tel:958735357" tabIndex={open ? 0 : -1}><Phone size={16} /> 958 73 53 57</a>
          <a href="#/whatsapp" className="drawer__wa" tabIndex={open ? 0 : -1}><MessageCircle size={16} /> Pedir por WhatsApp</a>
        </div>
      </nav>
    </div>
  )
}

export function MobileNav() {
  const { route, count, go } = useStore()
  const items = [
    ['inicio', Home, 'Inicio'], ['tienda', Store, 'Tienda'], ['carrito', ShoppingBag, 'Carrito'],
    ['whatsapp', MessageCircle, 'WhatsApp'], ['cuenta', User, 'Cuenta'],
  ]
  return (
    <>
      <a className="fab" href="#/whatsapp"><MessageCircle size={18} /> Pedir por WhatsApp</a>
      <nav className="tabbar" aria-label="Navegación móvil">
        {items.map(([id, Icon, label]) => (
          <button key={id} className={route.page === id ? 'on' : ''} onClick={() => go(id)}>
            <span className="tabbar__ico"><Icon size={21} />{id === 'carrito' && count > 0 && <em>{count}</em>}</span>
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Logo light />
          <p>Pescado y marisco seleccionado en las lonjas de Garrucha, Motril y Santa Pola. Familia pescadera en Baza desde 1996.</p>
        </div>
        <div>
          <h4>Explorar</h4>
          {[...NAV.slice(1), ['lonja', 'De la lonja a tu mesa'], ['redes', 'Redes']].map(([id, l]) => <a key={id} href={`#/${id}`}>{l}</a>)}
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="tel:958735357"><Phone size={14} /> 958 73 53 57</a>
          <a href="#/whatsapp"><MessageCircle size={14} /> 607 40 82 99</a>
          <a href="#/locales"><MapPin size={14} /> Baza · Tíjola · Cortes de Baza</a>
          <a href="#/redes"><AtSign size={14} /> @pescadosjuanpemart</a>
        </div>
      </div>
      <div className="wrap footer__legal">
        <span>© 2026 Pescados JuanPemart</span>
        <span>Demo de rediseño · datos ficticios</span>
      </div>
    </footer>
  )
}
