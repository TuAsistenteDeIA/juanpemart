import { useEffect, useRef, useState } from 'react'
import { Anchor, ArrowRight } from 'lucide-react'
import { LONJA } from '../data/content'

// Sección reutilizable: se usa en la Home y en #/lonja
export function LonjaSection({ standalone, compact }) {
  const [seen, setSeen] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen((s) => Math.max(s, +e.target.dataset.i + 1))),
      { threshold: 0.35 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const pct = Math.max(0, (seen - 1) / (LONJA.length - 1)) * 100

  return (
    <section className={`lonja ${standalone ? 'lonja--page' : ''} ${compact ? 'lonja--compact' : ''}`}>
      <div className="wrap">
        <header className="lonja__head">
          <span className="eyebrow eyebrow--light"><i /> Trazabilidad</span>
          <h2>De la lonja<br /><em>a tu mesa</em></h2>
          <p>Cada mañana, el mismo recorrido. Del subastador a tu plato en menos de seis horas.</p>
        </header>

        <div className="track" style={{ '--pct': `${pct}%` }}>
          <div className="track__line"><i /><span className="track__fish"><Anchor size={16} /></span></div>
          <ol>
            {LONJA.map((s, i) => (
              <li key={s.title} data-i={i} ref={(el) => (refs.current[i] = el)} className={i < seen ? 'in' : ''} style={{ transitionDelay: `${i * 60}ms` }}>
                {compact
                  ? <div className="stop__time">{s.t}</div>
                  : <div className="stop__img"><img src={s.img} alt="" loading="lazy" /><span>{s.t}</span></div>}
                <div className="stop__dot" />
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                {i < LONJA.length - 1 && <ArrowRight className="stop__arrow" size={18} />}
              </li>
            ))}
          </ol>
        </div>
        {compact && <a href="#/lonja" className="btn btn--white lonja__more">Ver el recorrido completo <ArrowRight size={16} /></a>}
      </div>
    </section>
  )
}

export default function LonjaPage() { return <LonjaSection standalone /> }
