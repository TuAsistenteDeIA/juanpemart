// Datos ficticios para la demo. Precio por kg (unit 'kg') o por unidad (unit 'ud').
export const CATEGORIES = [
  { id: 'pescado', label: 'Pescado' },
  { id: 'marisco', label: 'Marisco' },
  { id: 'gourmet', label: 'Gourmet' },
  { id: 'preparados', label: 'Preparados' },
]

export const PREPS = {
  pescado: [
    ['Entera', 'Tal como sale de la lonja'],
    ['Limpia', 'Sin escamas ni vísceras'],
    ['Fileteada', 'Lomos listos para cocinar'],
    ['Para horno', 'Limpia y abierta, lista para hornear'],
  ],
  marisco: [
    ['Crudo', 'Fresco, sin tratar'],
    ['Cocido', 'Cocido en el punto justo'],
    ['Pelado', 'Limpio y listo para el plato'],
    ['Para plancha', 'Abierto o descabezado'],
  ],
  gourmet: [['Tal cual', 'En su lata o frasco'], ['Para regalo', 'Con estuche y tarjeta']],
  preparados: [['Para hoy', 'Listo para calentar'], ['Congelado', 'Para guardar']],
}

export const PRODUCTS = [
  {
    id: 'lubina', name: 'Lubina', full: 'Lubina fresca', category: 'pescado', unit: 'kg', price: 16.9,
    origin: 'Lonja de Motril', stock: 'Disponible hoy', img: '/img/lubina.jpg', badge: 'Fresco del día',
    short: 'Carne blanca, fina y jugosa. Ideal al horno o a la sal.',
    long: 'Seleccionada cuidadosamente para garantizar la máxima frescura.',
    tips: 'Una pieza de 1 kg da de comer a 2–3 personas.', portion: 400,
  },
  {
    id: 'dorada', offer: { pct: 15 }, name: 'Dorada', full: 'Dorada fresca', category: 'pescado', unit: 'kg', price: 14.9,
    origin: 'Lonja de Motril', stock: 'Disponible hoy', img: '/img/dorada.jpg',
    short: 'Sabor suave y carne delicada. La favorita para hacer a la sal.',
    long: 'Dorada de ración, de ojo brillante y piel plateada.',
    tips: 'Una dorada de ración (400 g) por persona.', portion: 400,
  },
  {
    id: 'gamba', name: 'Gamba roja', full: 'Gamba roja de Garrucha', category: 'marisco', unit: 'kg', price: 38.5,
    origin: 'Lonja de Garrucha', stock: 'Últimas unidades', img: '/img/gamba.jpg', pos: '50% 35%', badge: 'Lonja',
    short: 'Sabor intenso a mar. A la plancha, con sal gorda y nada más.',
    long: 'Capturada en aguas de Almería y subastada cada mañana en Garrucha.',
    tips: 'Calcula 100–150 g por persona como entrante.', portion: 120,
  },
  {
    id: 'pulpo', name: 'Pulpo', full: 'Pulpo de roca', category: 'marisco', unit: 'kg', price: 19.9,
    origin: 'Lonja de Santa Pola', stock: 'Disponible hoy', img: '/img/pulpo.jpg',
    short: 'Tierno y con carácter. Listo para cocer o ya cocido.',
    long: 'Pulpo de roca de tamaño mediano, perfecto para cocer entero.',
    tips: 'Pierde un 40 % al cocer: 1 kg crudo ≈ 600 g cocido.', portion: 200,
  },
  {
    id: 'salmon', offer: { pct: 10 }, name: 'Salmón', full: 'Salmón fresco', category: 'pescado', unit: 'kg', price: 21.9,
    origin: 'Noruega · Selección', stock: 'Disponible hoy', img: '/img/salmon.jpg',
    short: 'Lomos limpios y sin espinas, listos para plancha u horno.',
    long: 'Lomo de salmón fresco en corte limpio, sin espinas.',
    tips: 'Ración ideal: 150–180 g por persona.', portion: 170,
  },
  {
    id: 'calamar', offer: { pct: 20 }, name: 'Calamar', full: 'Calamar de potera', category: 'pescado', unit: 'kg', price: 17.5,
    origin: 'Lonja de Motril', stock: 'Disponible hoy', img: '/img/calamar.jpg',
    short: 'Blanco, firme y dulce. Para plancha, rebozado o en su tinta.',
    long: 'Calamar de potera, limpio y listo para cocinar.',
    tips: 'Plancha muy caliente y poco tiempo: 2 minutos por lado.', portion: 200,
  },
  {
    id: 'cigala', name: 'Cigala', full: 'Cigala de arrastre', category: 'marisco', unit: 'kg', price: 54.0,
    origin: 'Lonja de Santa Pola', stock: 'Bajo pedido', img: '/img/cigala.jpg', pos: '35% 40%', badge: 'Gourmet',
    short: 'La reina del marisco. Cocida o cruda, siempre memorable.',
    long: 'Cigala de calibre grande, para ocasiones especiales.',
    tips: 'Cuatro o cinco piezas por persona como plato principal.', portion: 150,
  },
  {
    id: 'sardinillas', name: 'Sardinillas', full: 'Sardinillas en aceite de oliva', category: 'gourmet', unit: 'ud', price: 6.9,
    origin: 'Conservera artesana · Galicia', stock: 'Disponible hoy', img: '/img/x-sardinas.jpg', badge: 'Conserva',
    short: 'Pequeñas, en aceite de oliva virgen extra. Para abrir y disfrutar.',
    long: 'Conserva artesanal elaborada a mano en pequeñas tandas.',
    tips: 'Sírvelas a temperatura ambiente sobre pan tostado.',
  },
  {
    id: 'sardinas', offer: { pct: 15 }, name: 'Sardinas gruesas', full: 'Sardinas gruesas en aceite', category: 'gourmet', unit: 'ud', price: 8.5,
    origin: 'Conservera artesana · Cantábrico', stock: 'Disponible hoy', img: '/img/x-latas.jpg',
    short: 'Piezas enteras y carnosas, curadas con paciencia.',
    long: 'Sardinas de temporada, conservadas en aceite de oliva virgen extra.',
    tips: 'Mejoran con el tiempo: guárdalas en lugar fresco.',
  },
  {
    id: 'paella', name: 'Paella de marisco', full: 'Paella de marisco para 2', category: 'preparados', unit: 'ud', price: 22.0,
    origin: 'Cocina JuanPemart', stock: 'Bajo pedido', img: '/img/x-paella2.jpg', badge: 'Listo para casa',
    short: 'Arroz, sofrito y marisco de lonja. Solo hay que calentar.',
    long: 'Paella preparada por nuestro equipo con marisco del día.',
    tips: 'Calienta 10 minutos en sartén ancha con un chorrito de caldo.',
  },
  {
    id: 'croquetas', offer: { pct: 10 }, name: 'Croquetas de gamba', full: 'Croquetas de gamba (12 uds)', category: 'preparados', unit: 'ud', price: 9.5,
    origin: 'Cocina JuanPemart', stock: 'Disponible hoy', img: '/img/x-croq.jpg',
    short: 'Bechamel cremosa y gamba de Garrucha. Doce unidades.',
    long: 'Croquetas caseras, rebozadas a mano.',
    tips: 'Fríe a 180 °C hasta que doren.',
  },
]

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export const AMOUNTS = {
  kg: [[500, '500 g'], [1000, '1 kg'], [1500, '1,5 kg'], [2000, '2 kg']],
  ud: [[1, '1 ud'], [2, '2 uds'], [4, '4 uds'], [6, '6 uds']],
}
export const defaultAmt = (p) => (p.unit === 'kg' ? 1000 : 1)
export const defaultPrep = (p) => PREPS[p.category][0][0]

export const fmtAmt = (p, v) => {
  if (p.unit === 'ud') return `${v} ${v === 1 ? 'ud' : 'uds'}`
  return v >= 1000 ? `${String(v / 1000).replace('.', ',')} kg` : `${v} g`
}
// Precio con oferta aplicada (si la tiene) y precio de catálogo
export const salePrice = (p) => (p.offer ? Math.round(p.price * (1 - p.offer.pct / 100) * 100) / 100 : p.price)
const per = (p, price, amt) => (p.unit === 'kg' ? price * (amt / 1000) : price * amt)
export const priceOf = (p, amt) => per(p, salePrice(p), amt)
export const basePriceOf = (p, amt) => per(p, p.price, amt)
export const perPerson = (p) => (p.portion ? (salePrice(p) * p.portion) / 1000 : null)
export const unitLabel = (p) => (p.unit === 'kg' ? '/kg' : '/ud')

export const WHATSAPP = '34607408299' // línea de pedidos (de la web actual)

export const eur = (n) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
