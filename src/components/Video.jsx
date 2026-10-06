import { useEffect, useRef } from 'react'

// Vídeo de fondo: silenciado, en bucle, sin controles. Con prefers-reduced-motion se queda en el póster.
export default function BgVideo({ src, poster, className = '', rate = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.playbackRate = rate
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      return
    }
    // Pausa fuera de pantalla para ahorrar batería en móvil
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.05 })
    io.observe(v)
    return () => io.disconnect()
  }, [rate])
  return (
    <video ref={ref} className={`bgvideo ${className}`} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
  )
}
