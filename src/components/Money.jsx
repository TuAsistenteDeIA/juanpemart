import { useEffect, useRef, useState } from 'react'
import { eur } from '../data/products'

// Precio que "rueda" suavemente hasta el nuevo valor
export default function Money({ value, className = '' }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const a = from.current, b = value, t0 = performance.now(), dur = 450
    let raf
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - k, 3)
      setShown(a + (b - a) * e)
      if (k < 1) raf = requestAnimationFrame(tick)
      else from.current = b
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); from.current = value }
  }, [value])
  return <span className={`money ${className}`}>{eur(shown)}</span>
}
