import { getProduct, fmtAmt } from './products'
import { LOCALES } from './content'

export const FREE_FROM = 60
export const DELIVERY = 4.5

// Pedido de ejemplo para enseñar la función cuando el carrito está vacío
export const SAMPLE = [
  { key: 's1', id: 'lubina', amt: 1000, prep: 'Limpia', qty: 1 },
  { key: 's2', id: 'gamba', amt: 500, prep: 'Crudo', qty: 1 },
  { key: 's3', id: 'pulpo', amt: 1000, prep: 'Crudo', qty: 1 },
]

export function orderLines(cart) {
  return cart.map((l) => {
    const p = getProduct(l.id)
    const q = l.qty > 1 ? `${l.qty} × ` : ''
    return `${q}${fmtAmt(p, l.amt)} ${p.name}`
  })
}

// Preparación: "Lubina limpia." — una frase por producto con preparación distinta de la básica
export function prepLines(cart) {
  return cart
    .filter((l) => !['Entera', 'Crudo', 'Tal cual', 'Para hoy'].includes(l.prep))
    .map((l) => `${getProduct(l.id).name} ${l.prep.toLowerCase()}.`)
}

export function buildMessage(cart, opts, total) {
  const local = LOCALES.find((x) => x.id === opts.local)
  const prep = prepLines(cart)
  return [
    'Hola, quiero realizar este pedido:',
    '',
    ...orderLines(cart),
    ...(prep.length ? ['', 'Preparación:', ...prep] : []),
    ...(opts.note ? ['', `Nota: ${opts.note}`] : []),
    '',
    opts.mode === 'recoger' ? `Recojo en ${local.name}.` : 'Entrega a domicilio.',
    `Total aproximado: ${total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`,
  ].join('\n')
}
