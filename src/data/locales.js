// Las 6 pescaderías de JuanPemart. Nombres, direcciones y descripciones: web oficial (pescadosjuanpemart.com/locales).
// Horarios y coordenadas: aproximados, solo para la demo.
const WEEK = [
  { d: [1, 2, 3, 4, 5], r: [['08:00', '14:30'], ['17:30', '20:00']] },
  { d: [6], r: [['08:00', '14:30']] },
]

export const LOCALES = [
  {
    id: 'alamillos', name: 'Baza · Calle Alamillos', short: 'Calle Alamillos', town: 'Baza', province: 'Granada',
    tag: 'El segundo local que abrimos', img: '/img/loc-alamillos.jpg',
    desc: 'El segundo local que abrimos, donde muchos clientes nos acompañan desde hace más de 20 años.',
    address: 'Calle Alamillos, Baza (Granada)', tel: '958 73 53 57', lat: 37.4935, lon: -2.7748,
    schedule: WEEK, map: { x: 40, y: 26 }, query: 'Calle Alamillos, Baza, Granada',
  },
  {
    id: 'mora', name: 'Baza · Av. José de Mora', short: 'Av. José de Mora, 19', town: 'Baza', province: 'Granada',
    tag: 'Amplio y céntrico', img: '/img/loc-baza.jpg',
    desc: 'Un espacio céntrico, amplio y con gran variedad de producto fresco cada día.',
    address: 'Av. José de Mora, 19, 18800 Baza (Granada)', tel: '958 73 53 57', lat: 37.4896, lon: -2.7726,
    schedule: WEEK, map: { x: 52, y: 37 }, query: 'Avenida José de Mora 19, 18800 Baza, Granada',
  },
  {
    id: 'monjas', name: 'Baza · Calle de las Monjas', short: 'Calle de las Monjas', town: 'Baza', province: 'Granada',
    tag: 'Cercanía de barrio', img: '/img/loc-monjas.jpg',
    desc: 'La cercanía de barrio que nos conecta con nuestros clientes más fieles.',
    address: 'Calle de las Monjas, Baza (Granada)', tel: '958 73 53 57', lat: 37.4912, lon: -2.7769,
    schedule: WEEK, map: { x: 34, y: 45 }, query: 'Calle de las Monjas, Baza, Granada',
  },
  {
    id: 'ferial', name: 'Baza · Recinto Ferial', short: 'Recinto Ferial', town: 'Baza', province: 'Granada',
    tag: 'Fiestas y celebraciones', img: '/img/loc-ferial.jpg', seasonal: true,
    desc: 'Un punto de encuentro en las fiestas y celebraciones de la ciudad.',
    address: 'Recinto Ferial, Baza (Granada)', tel: '958 73 53 57', lat: 37.4838, lon: -2.7633,
    schedule: [], map: { x: 64, y: 47 }, query: 'Recinto Ferial, Baza, Granada',
  },
  {
    id: 'tijola', name: 'Tíjola', short: 'Carrera de la Virgen del Socorro, 47', town: 'Tíjola', province: 'Almería',
    tag: 'Valle del Almanzora', img: '/img/loc-tijola.jpg',
    desc: 'Nuestra pescadería en el Valle del Almanzora, con el producto de la lonja cada mañana.',
    address: 'Calle Carrera de la Virgen del Socorro, 47, 04880 Tíjola (Almería)', tel: '958 73 53 57', lat: 37.3697, lon: -2.4531,
    schedule: [{ d: [2, 3, 4, 6], r: [['08:30', '14:30']] }, { d: [5], r: [['08:30', '14:30'], ['17:30', '20:00']] }],
    map: { x: 84, y: 72 }, query: 'Calle Carrera de la Virgen del Socorro 47, 04880 Tíjola, Almería',
  },
  {
    id: 'cortes', name: 'Cortes de Baza', short: 'C/ Rosales, 6', town: 'Cortes de Baza', province: 'Granada',
    tag: 'Comercio local', img: '/img/loc-cortes.jpg',
    desc: 'Comercio local que ofrece calidad y frescura.',
    address: 'C/ Rosales, 6, 18814 Cortes de Baza (Granada)', tel: '958 73 53 57', lat: 37.4833, lon: -2.8167,
    schedule: [{ d: [1, 2, 3, 4, 5, 6], r: [['09:00', '14:00']] }], map: { x: 16, y: 52 }, query: 'Calle Rosales 6, 18814 Cortes de Baza, Granada',
  },
]

export const TOWNS = ['Baza', 'Tíjola', 'Cortes de Baza']

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const mins = (t) => +t.slice(0, 2) * 60 + +t.slice(3)

// Estado "ahora": abierto / cerrado, con la próxima apertura
export function openStatus(l, now = new Date()) {
  if (l.seasonal) return { open: false, text: 'Solo en feria y fiestas' }
  const m = now.getHours() * 60 + now.getMinutes()
  const today = l.schedule.find((s) => s.d.includes(now.getDay()))
  const cur = today?.r.find(([a, b]) => m >= mins(a) && m < mins(b))
  if (cur) return { open: true, text: `Abierto · cierra a las ${cur[1]}` }
  const next = today?.r.find(([a]) => m < mins(a))
  if (next) return { open: false, text: `Cerrado · abre a las ${next[0]}` }
  for (let i = 1; i <= 7; i++) {
    const day = (now.getDay() + i) % 7
    const s = l.schedule.find((x) => x.d.includes(day))
    if (s) return { open: false, text: `Cerrado · abre ${i === 1 ? 'mañana' : DAYS[day].toLowerCase()} a las ${s.r[0][0]}` }
  }
  return { open: false, text: 'Cerrado' }
}

// Horario legible: "Lun – Vie 08:00 – 14:30 · 17:30 – 20:00"
export function hoursRows(l) {
  if (l.seasonal) return [['Feria y fiestas', 'Consultar fechas']]
  const rng = (d) => (d.length > 2 && d.every((x, i) => i === 0 || x === d[i - 1] + 1) ? `${DAYS[d[0]]} – ${DAYS[d[d.length - 1]]}` : d.map((x) => DAYS[x]).join(', '))
  return l.schedule.map((s) => [rng(s.d), s.r.map(([a, b]) => `${a} – ${b}`).join(' · ')])
}
