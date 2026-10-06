import BgVideo from '../components/Video'
import { ArrowRight, MessageCircle, Anchor, ShieldCheck, Truck, Clock, ChevronDown, Utensils, Users, PartyPopper, Flame, Sparkles } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Reveal } from '../components/Shell'
import { ChefAvatar } from '../components/Chef'
import { LonjaSection } from './Lonja'
import { SocialSection } from './Social'
import { RecipeCard } from './Recipes'
import { RECIPES, OCCASIONS } from '../data/content'

const CATS = [
  { id: 'pescado', label: 'Pescado', note: 'De la lonja, cada mañana', img: '/img/cat-pescado.jpg', pos: '50% 50%' },
  { id: 'marisco', label: 'Marisco', note: 'Gamba, cigala y más', img: '/img/cat-marisco.jpg', pos: '50% 40%' },
  { id: 'gourmet', label: 'Gourmet', note: 'Conservas y selección', img: '/img/cat-gourmet.jpg', pos: '50% 50%' },
]

const WORDS = ['Pescado', 'Marisco', 'Gourmet', 'Lonja de Garrucha', 'Lonja de Motril', 'Lonja de Santa Pola', 'Desde 1996']

export default function HomePage() {
  return (
    <>
      <section className="g-hero">
        <BgVideo src="/video/home.mp4" poster="/video/home-poster.jpg" className="g-hero__video" rate={0.85} />
        <div className="g-hero__shade" />
        <div className="wrap g-hero__in">
          <span className="eyebrow eyebrow--light"><i /> Baza · Tíjola · Cortes de Baza</span>
          <h1>
            <span className="line"><span>Del mar</span></span>
            <span className="line"><span><em>a tu</em> mesa.</span></span>
          </h1>
          <div className="g-hero__row">
            <p className="lead lead--light">Pescado y marisco seleccionado para llevar el mejor sabor del mar a tu mesa.</p>
            <div className="g-hero__btns">
              <a href="#/tienda" className="btn btn--lg btn--white">Comprar ahora <ArrowRight size={18} /></a>
              <a href="#/whatsapp" className="btn btn--lg btn--glass"><MessageCircle size={18} /> Pedir por WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="g-hero__stats wrap">
          {[['1996', 'familia pescadera'], ['3', 'pescaderías'], ['Cada día', 'producto de lonja'], ['100%', 'frescura garantizada']].map(([b, t]) => (
            <div key={t}><b>{b}</b><span>{t}</span></div>
          ))}
          <ChevronDown size={20} className="g-hero__arrow" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}<Anchor size={16} /></span>)}
        </div>
      </div>

      <section className="wrap cats2">
        {CATS.map((c, i) => (
          <Reveal key={c.id} delay={i * 90} className="cat2wrap">
            <a href={`#/tienda/${c.id}`} className="cat2">
              <img src={c.img} alt="" loading="lazy" style={{ objectPosition: c.pos }} />
              <span className="cat2__shade" />
              <span className="cat2__n">0{i + 1}</span>
              <span className="cat2__txt"><b>{c.label}</b><small>{c.note}</small></span>
              <span className="cat2__go"><ArrowRight size={20} /></span>
            </a>
          </Reveal>
        ))}
      </section>

      <section id="descubre" className="wrap section">
        <Reveal className="section__head">
          <span className="eyebrow">Selección de hoy</span>
          <h2>Descubre nuestro producto</h2>
          <a href="#/tienda" className="link">Ver toda la tienda <ArrowRight size={16} /></a>
        </Reveal>
        <div className="grid">
          {['lubina', 'gamba', 'pulpo', 'salmon', 'calamar', 'cigala'].map((id) => PRODUCTS.find((p) => p.id === id)).map((p, i) => <ProductCard key={p.id} p={p} delay={(i % 3) * 70} />)}
        </div>
      </section>

      <section className="cookband">
        <div className="wrap cookband__in">
          <Reveal className="cookband__copy">
            <span className="chefhello"><ChefAvatar size={64} /><span><small>Juan, tu pescadero</small><b>«Cuéntame la ocasión y te digo qué llevar»</b></span></span>
            <h2>¿Qué vas a <em>cocinar</em>?</h2>
            <p>Una conversación de dos minutos: la ocasión, cuántos sois y qué os apetece. Juan calcula cantidades y os explica cómo cocinarlo.</p>
            <div className="row">
              <a href="#/cocinar" className="btn btn--lg">Hablar con Juan <ArrowRight size={18} /></a>
              <a href="#/ia" className="btn btn--lg btn--ghost">🐟 Pregúntale al pescadero</a>
            </div>
          </Reveal>
          <div className="cookband__occ">
            {OCCASIONS.map((o, i) => {
              const Icon = [Utensils, Users, PartyPopper, Flame, Sparkles][i]
              return (
                <Reveal key={o.id} delay={i * 70}>
                  <a href="#/cocinar" className="occchip"><Icon size={22} /><b>{o.label}</b><small>{o.people} personas</small></a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <LonjaSection compact />

      <section className="gt">
        <img className="gt__bg" src="/img/gt.jpg" alt="" loading="lazy" />
        <div className="gt__shade" />
        <Reveal className="wrap gt__in">
          <span className="eyebrow eyebrow--light"><i /> JuanPemart Gourmet</span>
          <h2>Tu evento. <em>Nosotros nos encargamos del mar.</em></h2>
          <p>Mariscadas, cenas de empresa y celebraciones con producto de lonja, cocina y servicio completo.</p>
          <div className="gt__chips">
            {['Celebraciones', 'Eventos de empresa', 'Reuniones familiares', 'Cumpleaños'].map((c) => <a key={c} href="#/gourmet">{c}</a>)}
          </div>
          <div className="gt__cta">
            <a href="#/gourmet" className="btn btn--lg btn--white">Solicitar propuesta <ArrowRight size={18} /></a>
            <a href="#/whatsapp" className="btn btn--lg btn--glass"><MessageCircle size={18} /> Hablar por WhatsApp</a>
          </div>
        </Reveal>
      </section>

      <section className="wrap section">
        <Reveal className="section__head">
          <span className="eyebrow">Recetas</span>
          <h2>Inspírate y cocina</h2>
          <a href="#/recetas" className="link">Ver todas las recetas <ArrowRight size={16} /></a>
        </Reveal>
        <div className="rgrid">{RECIPES.slice(0, 3).map((r, i) => <RecipeCard key={r.id} r={r} delay={i * 70} />)}</div>
      </section>

      <SocialSection compact />

      <section className="wrap promises">
        {[
          [ShieldCheck, 'Frescura garantizada', 'Selección diaria en lonja y control en cada local.'],
          [Clock, 'Listo para recoger', 'Haz tu pedido y recógelo en tu pescadería.'],
          [Truck, 'A casa, en frío', 'Reparto refrigerado en la comarca.'],
        ].map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 80} className="promise">
            <span><Icon size={22} /></span>
            <h4>{t}</h4>
            <p>{d}</p>
          </Reveal>
        ))}
      </section>

    </>
  )
}
