import { useEffect, useState } from 'react'
import { Percent } from 'lucide-react'
import { eur, salePrice, unitLabel } from '../data/products'

// Precio de un producto: si tiene oferta, muestra el precio rebajado y el anterior tachado
export function Price({ p }) {
  if (!p.offer) return <span className="price">{eur(p.price)}<small>{unitLabel(p)}</small></span>
  return (
    <span className="price price--sale">
      <b>{eur(salePrice(p))}</b><small>{unitLabel(p)}</small>
      <s>{eur(p.price)}</s>
    </span>
  )
}

export const OfferBadge = ({ p }) => p.offer && <span className="offerbadge"><Percent size={12} /> -{p.offer.pct}%</span>

// Las ofertas se renuevan cada semana: terminan el domingo a las 23:59
const nextSunday = () => {
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7))
  d.setHours(23, 59, 59, 0)
  return d
}

export function useCountdown() {
  const [left, setLeft] = useState(() => nextSunday() - new Date())
  useEffect(() => {
    const t = setInterval(() => setLeft(nextSunday() - new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const mins = Math.max(0, Math.floor(left / 60000))
  return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 }
}

export function Countdown({ className = '' }) {
  const { d, h, m } = useCountdown()
  return (
    <span className={`countdown ${className}`} aria-label={`Termina en ${d} días, ${h} horas y ${m} minutos`}>
      <i><b>{d}</b>días</i><i><b>{String(h).padStart(2, '0')}</b>horas</i><i><b>{String(m).padStart(2, '0')}</b>min</i>
    </span>
  )
}
