import { Heart, MessageCircle, Bookmark, ArrowRight, Play } from 'lucide-react'
import { POSTS } from '../data/content'
import { useStore } from '../context/Store'
import { Reveal } from '../components/Shell'

export function SocialSection({ standalone, compact }) {
  const { go } = useStore()
  if (compact) {
    return (
      <section className="wrap social social--compact">
        <Reveal className="socialband">
          <div className="socialband__top">
            <span className="av av--lg">JP</span>
            <div><b>@pescadosjuanpemart</b><small>12,4 mil seguidores · 860 publicaciones</small></div>
          </div>
          <h2>Sigue el sabor <em>del mar</em></h2>
          <p>Producto fresco cada mañana, recetas, consejos y novedades. Cada publicación te lleva directo al producto, a la receta o al pedido.</p>
          <ul>{POSTS.map((p) => <li key={p.id}>{p.kind}</li>)}</ul>
          <a href="#/redes" className="btn btn--lg btn--white">Ver las publicaciones <ArrowRight size={16} /></a>
        </Reveal>
      </section>
    )
  }
  return (
    <section className={`wrap social ${standalone ? 'social--page' : ''}`}>
      <Reveal className="social__head">
        <div>
          <span className="eyebrow">Redes</span>
          <h2>Sigue el sabor <em>del mar</em></h2>
        </div>
        <div className="profile">
          <span className="av av--lg">JP</span>
          <div><b>@pescadosjuanpemart</b><small>12,4 mil seguidores · 860 publicaciones</small></div>
          <a className="btn btn--sm" href="#/redes">Seguir</a>
        </div>
      </Reveal>

      <div className="igrid">
        {POSTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 70}>
            <article className="ipost">
              <div className="ipost__img">
                <img src={p.img} alt="" loading="lazy" />
                <span className="ipost__kind">{p.kind}</span>
                {p.kind === 'Receta' && <span className="ipost__play"><Play size={16} fill="currentColor" /></span>}
              </div>
              <div className="ipost__body">
                <div className="ipost__act"><Heart size={18} /><MessageCircle size={18} /><Bookmark size={18} className="r" /></div>
                <small>{p.likes.toLocaleString('es-ES')} me gusta</small>
                <p><b>pescadosjuanpemart</b> {p.caption}</p>
                <button className="btn btn--sm" onClick={() => go(...p.to)}>{p.cta} <ArrowRight size={14} /></button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="social__note">Simulación: cada publicación enlaza con producto, receta o pedido de la web.</p>
    </section>
  )
}

export default function SocialPage() { return <div style={{ paddingTop: 'calc(var(--head) + 40px)', paddingBottom: 100 }}><SocialSection standalone /></div> }
