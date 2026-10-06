// Contenido ficticio para la demo (direcciones, horarios y cifras de ejemplo).

export { RECIPES } from './recipes'

// ── ¿Qué vas a cocinar? ── g por persona; items escalan con el número de personas ────────
export const OCCASIONS = [
  { id: 'cena2', chef: "Una cena para dos pide poco producto, pero muy bueno", label: 'Cena para 2', people: 2, img: '/img/occ-cena2.jpg', phrase: 'Somos 2 y queremos una cena tranquila.', items: [['salmon', 170, 'Fileteada'], ['gamba', 120, 'Crudo']] },
  { id: 'familiar', chef: "En la mesa familiar mandan las raciones generosas y los platos para compartir", label: 'Comida familiar', people: 5, img: '/img/occ-familiar.jpg', phrase: 'Somos 5 en familia y queremos una comida de domingo.', items: [['lubina', 400, 'Para horno'], ['calamar', 150, 'Limpia'], ['gamba', 80, 'Crudo']] },
  { id: 'celebracion', chef: "Para celebrar, un pescado al horno en el centro de la mesa y algo de marisco para abrir boca", label: 'Celebración', people: 6, img: '/img/occ-celebracion.jpg', phrase: 'Somos 6 personas y queremos preparar una comida especial.', items: [['lubina', 400, 'Para horno'], ['gamba', 120, 'Crudo'], ['pulpo', 170, 'Cocido']] },
  { id: 'barbacoa', chef: "El mar a la brasa es otra liga: plancha bien caliente y poco tiempo", label: 'Barbacoa', people: 8, img: '/img/occ-barbacoa.jpg', phrase: 'Somos 8 y vamos a hacer una barbacoa de mar.', items: [['dorada', 400, 'Limpia'], ['gamba', 150, 'Para plancha'], ['calamar', 120, 'Para plancha']] },
  { id: 'especial', chef: "Para una cena especial, producto de lujo y sin complicaciones", label: 'Cena especial', people: 4, img: '/img/occ-especial.jpg', phrase: 'Somos 4 y queremos sorprender con algo de lujo.', items: [['cigala', 180, 'Crudo'], ['gamba', 100, 'Crudo'], ['lubina', 350, 'Fileteada']] },
]

export { LOCALES } from './locales'

// ── De la lonja a tu mesa ──────────────────────────────────────────────────────────────
export const LONJA = [
  { t: '04:30', title: 'Lonja', text: 'Subasta en Garrucha, Motril y Santa Pola. El producto llega con el barco.', img: '/img/lonja-1.jpg' },
  { t: '06:00', title: 'Selección', text: 'Elegimos pieza a pieza: ojo brillante, agallas rojas, carne firme.', img: '/img/lonja-2.jpg' },
  { t: '07:30', title: 'Preparación', text: 'Limpiado, fileteado y cortes a medida en cada pescadería.', img: '/img/lonja-3.jpg' },
  { t: '08:30', title: 'Transporte', text: 'Cadena de frío sin interrupciones hasta Baza, Tíjola y Cortes.', img: '/img/lonja-4.jpg' },
  { t: '09:00', title: 'Tu mesa', text: 'Recógelo en tienda o te lo llevamos a casa, fresco del día.', img: '/img/lonja-5.jpg' },
]

// ── Redes sociales (simulación Instagram) ──────────────────────────────────────────────
export const POSTS = [
  { id: 1, kind: 'Producto fresco', img: '/img/soc-1.jpg', likes: 482, caption: 'Lubina de Motril recién llegada. Hoy se va rápido 🐟', cta: 'Ver producto', to: ['producto', 'lubina'] },
  { id: 2, kind: 'Receta', img: '/img/soc-2.jpg', likes: 913, caption: 'Arroz caldoso de marisco: la receta completa en la web.', cta: 'Ver receta', to: ['receta', 'arroz-marisco'] },
  { id: 3, kind: 'Consejos', img: '/img/soc-3.jpg', likes: 356, caption: 'Cómo saber si una gamba es fresca: 3 señales.', cta: 'Ver receta', to: ['receta', 'gambas-al-ajillo'] },
  { id: 4, kind: 'Gourmet', img: '/img/soc-4.jpg', likes: 1204, caption: 'Tu próxima celebración, con ostras y mucho mar.', cta: 'Pedir', to: ['gourmet'] },
  { id: 5, kind: 'Novedades', img: '/img/soc-5.jpg', likes: 640, caption: 'Nuevas croquetas de gamba, hechas cada mañana.', cta: 'Ver producto', to: ['producto', 'croquetas'] },
  { id: 6, kind: 'Pescadería', img: '/img/soc-6.jpg', likes: 777, caption: 'Detrás del mostrador: el equipo de Baza al amanecer.', cta: 'Pedir', to: ['whatsapp'] },
]
