import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct, priceOf, basePriceOf } from '../data/products'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

// Router mínimo basado en hash: #/tienda/pescado, #/producto/lubina ...
const parse = () => {
  const [, page = 'inicio', param] = window.location.hash.split('/')
  return { page: page || 'inicio', param }
}

export function StoreProvider({ children }) {
  const [route, setRoute] = useState(parse)
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  const [bump, setBump] = useState(0)
  const [user, setUser] = useState(null)
  const [opts, setOpts] = useState({ mode: 'recoger', local: 'mora', note: '' })

  useEffect(() => {
    const on = () => {
      setRoute(parse())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const go = useCallback((page, param) => {
    window.location.hash = param ? `/${page}/${param}` : `/${page}`
  }, [])

  const say = useCallback((text) => setToast({ id: Date.now(), text }), [])

  // line: { id, amt, prep } · amt = gramos (kg) o unidades (ud)
  const addToCart = useCallback((line, quiet) => {
    setCart((c) => {
      const key = `${line.id}-${line.amt}-${line.prep || ''}`
      const found = c.find((l) => l.key === key)
      if (found) return c.map((l) => (l.key === key ? { ...l, qty: l.qty + (line.qty || 1) } : l))
      return [...c, { ...line, key, qty: line.qty || 1 }]
    })
    setBump((b) => b + 1)
    if (!quiet) say(`${getProduct(line.id).name} añadido al pedido`)
  }, [say])

  const addMany = useCallback((lines, msg) => {
    lines.forEach((l) => addToCart(l, true))
    say(msg || `${lines.length} productos añadidos al pedido`)
  }, [addToCart, say])

  const setQty = useCallback((key, qty) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))))
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const value = useMemo(
    () => ({
      route, go, cart, setCart, addToCart, addMany, setQty, toast, say, bump, user, setUser, opts, setOpts,
      count: cart.reduce((n, l) => n + l.qty, 0),
      total: cart.reduce((n, l) => n + linePrice(l), 0),
      saving: cart.reduce((n, l) => n + (basePriceOf(getProduct(l.id), l.amt) - priceOf(getProduct(l.id), l.amt)) * l.qty, 0),
    }),
    [route, go, cart, addToCart, addMany, setQty, toast, say, bump, user, opts],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const linePrice = (l) => priceOf(getProduct(l.id), l.amt) * l.qty
