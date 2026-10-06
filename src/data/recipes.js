// Recetas ficticias para la demo. Cada ingrediente con `pid` enlaza con un producto de la tienda.
export const RECIPES = [
  {
    id: 'lubina-al-horno', product: 'lubina', name: 'Lubina al horno con patatas', time: 25, level: 'Fácil', people: 2, img: '/img/r-lubina-al-horno.jpg',
    intro: 'La receta de domingo: patatas panaderas, limón y una lubina que se cocina sola.',
    ingredients: [
      { pid: 'lubina', amt: 1000, prep: 'Para horno', text: '1 lubina de 1 kg' },
      { text: '2 patatas medianas' }, { text: '1 limón' }, { text: 'Aceite de oliva, sal y perejil' },
    ],
    steps: ['Precalienta el horno a 200 °C y corta las patatas en rodajas finas.', 'Coloca las patatas en la bandeja con aceite y sal; hornea 15 minutos.', 'Pon la lubina encima (con un par de cortes en el lomo), riega con aceite y limón y hornea 20-25 minutos más. Está lista cuando el ojo se vuelve blanco.', 'Sirve con perejil picado y un chorrito de aceite crudo.'],
  },
  {
    id: 'dorada-al-horno', product: 'dorada', name: 'Dorada al horno con limón', time: 30, level: 'Fácil', people: 2, img: '/img/r-dorada-al-horno.jpg',
    intro: 'Piel dorada, carne jugosa y mucho limón. Una receta de restaurante en casa.',
    ingredients: [
      { pid: 'dorada', amt: 1000, prep: 'Limpia', text: '2 doradas de ración (1 kg)' },
      { text: '2 limones' }, { text: 'Un chorrito de vino blanco' }, { text: 'Tomillo, aceite y sal' },
    ],
    steps: ['Seca bien las doradas, sazona y rellénalas con rodajas de limón y tomillo.', 'Colócalas en una bandeja con aceite y un chorrito de vino blanco.', 'Hornea 18-20 minutos a 200 °C, regando a mitad de cocción con su jugo.', 'Sirve con el jugo de la bandeja y limón fresco.'],
  },
  {
    id: 'gambas-al-ajillo', product: 'gamba', name: 'Gambas al ajillo', time: 15, level: 'Fácil', people: 4, img: '/img/r-gambas-al-ajillo.jpg',
    intro: 'Cinco ingredientes y diez minutos de fuego. El aroma lo hace todo.',
    ingredients: [
      { pid: 'gamba', amt: 500, prep: 'Pelado', text: '500 g de gamba roja' },
      { text: '4 dientes de ajo' }, { text: '1 guindilla' }, { text: 'Aceite de oliva virgen extra' }, { text: 'Perejil fresco' },
    ],
    steps: ['Dora el ajo laminado y la guindilla en abundante aceite a fuego suave.', 'Sube el fuego, añade las gambas con sal y saltea 2 minutos.', 'Termina con perejil y sirve en la misma cazuela, con pan.'],
  },
  {
    id: 'pulpo-brasa', product: 'pulpo', name: 'Pulpo a la brasa con patata', time: 90, level: 'Media', people: 4, img: '/img/r-pulpo-a-la-gallega.jpg',
    intro: 'Cocción lenta, un golpe de brasa y pimentón. El pulpo que se pide dos veces.',
    ingredients: [
      { pid: 'pulpo', amt: 1500, prep: 'Crudo', text: '1,5 kg de pulpo' },
      { text: '3 patatas' }, { text: 'Pimentón dulce y picante' }, { text: 'Sal gorda y aceite de oliva' },
    ],
    steps: ['Asusta el pulpo (sumérgelo y sácalo tres veces del agua hirviendo) y cuécelo unos 40 minutos por kilo, hasta que un cuchillo entre sin resistencia; déjalo reposar 10 minutos en su caldo.', 'Cuece las patatas en esa misma agua unos 20 minutos.', 'Marca las patas en la plancha o la brasa 2-3 minutos por lado.', 'Sirve sobre las patatas con sal gorda, pimentón y aceite generoso.'],
  },
  {
    id: 'salmon-calabacin', product: 'salmon', name: 'Salmón al horno con calabacín', time: 30, level: 'Fácil', people: 2, img: '/img/r-salmon-calabacin.jpg',
    intro: 'Ligero, rápido y muy completo: salmón dorado con calabacín asado.',
    ingredients: [
      { pid: 'salmon', amt: 500, prep: 'Fileteada', text: '2 lomos de salmón (500 g)' },
      { text: '1 calabacín' }, { text: 'Mostaza antigua y limón' }, { text: 'Aceite, sal y eneldo' },
    ],
    steps: ['Corta el calabacín en rodajas y ásalo 10 minutos a 200 °C.', 'Unta el salmón con mostaza, sal y limón.', 'Añade el salmón a la bandeja y hornea 12 minutos más.', 'Sirve con eneldo y un hilo de aceite.'],
  },
  {
    id: 'calamares-fritos', product: 'calamar', name: 'Calamares fritos con limón', time: 20, level: 'Fácil', people: 2, img: '/img/r-calamares-fritos.jpg',
    intro: 'Crujientes por fuera, tiernos por dentro. El truco: aceite muy caliente y poco tiempo.',
    ingredients: [
      { pid: 'calamar', amt: 500, prep: 'Limpia', text: '500 g de calamar en anillas' },
      { text: 'Harina de trigo y un poco de harina de garbanzo' }, { text: 'Aceite de oliva para freír' }, { text: 'Limón y sal en escamas' },
    ],
    steps: ['Seca las anillas y pásalas por harina sacudiendo el exceso.', 'Fríe en aceite a 190 °C por tandas, 1 minuto y medio.', 'Escurre sobre papel, sala y sirve al instante con limón.'],
  },
  {
    id: 'cigalas-plancha', product: 'cigala', name: 'Cigalas a la plancha', time: 15, level: 'Fácil', people: 2, img: '/img/r-cigalas-plancha.jpg',
    intro: 'Marisco de lujo sin complicaciones: plancha, sal y limón.',
    ingredients: [
      { pid: 'cigala', amt: 500, prep: 'Crudo', text: '500 g de cigalas' },
      { text: 'Sal gorda' }, { text: 'Limón' }, { text: 'Aceite de oliva y perejil' },
    ],
    steps: ['Calienta la plancha al máximo con un hilo de aceite.', 'Cocina las cigalas 2 minutos por lado con sal gorda.', 'Sirve con limón, perejil picado y un chorrito de aceite.'],
  },
  {
    id: 'tosta-sardinillas', product: 'sardinillas', name: 'Tosta de sardinillas con alioli', time: 10, level: 'Fácil', people: 2, img: '/img/r-tosta-sardinillas.jpg',
    intro: 'El aperitivo perfecto: pan crujiente, alioli y sardinillas en su aceite.',
    ingredients: [
      { pid: 'sardinillas', amt: 2, prep: 'Tal cual', text: '2 latas de sardinillas' },
      { text: 'Pan de masa madre' }, { text: 'Alioli suave' }, { text: 'Limón y pimienta' },
    ],
    steps: ['Tuesta las rebanadas de pan y úntalas con alioli.', 'Coloca las sardinillas escurridas encima.', 'Termina con ralladura de limón y pimienta recién molida.'],
  },
  {
    id: 'sardinas-tomate', product: 'sardinas', name: 'Sardinas con tomate y cebolla', time: 10, level: 'Fácil', people: 2, img: '/img/r-sardinas-plancha.jpg',
    intro: 'Fresca y mediterránea: sardinas gruesas sobre tomate y cebolla morada.',
    ingredients: [
      { pid: 'sardinas', amt: 2, prep: 'Tal cual', text: '2 latas de sardinas gruesas' },
      { text: '2 tomates maduros' }, { text: 'Media cebolla morada' }, { text: 'Aceite, vinagre y sal' },
    ],
    steps: ['Pica el tomate y la cebolla y aliña con aceite, vinagre y sal.', 'Coloca las sardinas encima sin romperlas.', 'Deja reposar 5 minutos y sirve con pan.'],
  },
  {
    id: 'paella-recien-hecha', product: 'paella', name: 'Paella de marisco, como recién hecha', time: 15, level: 'Fácil', people: 2, img: '/img/r-paella.jpg',
    intro: 'Nuestra paella ya viene cocinada. Estos toques la dejan como recién sacada del fuego.',
    ingredients: [
      { pid: 'paella', amt: 1, prep: 'Para hoy', text: '1 paella de marisco para 2' },
      { text: 'Un poco de caldo de pescado' }, { text: '1 limón' }, { text: 'Perejil fresco' },
    ],
    steps: ['Calienta una paellera o sartén ancha a fuego medio.', 'Añade la paella con un chorrito de caldo y remueve suavemente 8 minutos.', 'Deja reposar 3 minutos tapada con un paño y sirve con limón.'],
  },
  {
    id: 'croquetas-gamba', product: 'croquetas', name: 'Croquetas de gamba con ensalada', time: 15, level: 'Fácil', people: 4, img: '/img/r-croquetas-gamba.jpg',
    intro: 'Cremosas por dentro, crujientes por fuera. Doce croquetas para compartir.',
    ingredients: [
      { pid: 'croquetas', amt: 1, prep: 'Para hoy', text: '12 croquetas de gamba' },
      { text: 'Aceite de oliva para freír' }, { text: 'Ensalada de lombarda' }, { text: 'Perejil picado' },
    ],
    steps: ['Fríe las croquetas en aceite a 180 °C hasta que doren.', 'Escurre sobre papel absorbente.', 'Sirve con la ensalada aliñada y perejil.'],
  },
  {
    id: 'arroz-marisco', product: 'gamba', name: 'Arroz caldoso de marisco', time: 50, level: 'Media', people: 4, img: '/img/x-paella.jpg',
    intro: 'Un arroz meloso con fondo de cabezas de gamba. El plato de las ocasiones.',
    ingredients: [
      { pid: 'gamba', amt: 500, prep: 'Crudo', text: '500 g de gamba roja' },
      { pid: 'calamar', amt: 500, prep: 'Limpia', text: '500 g de calamar' },
      { pid: 'cigala', amt: 500, prep: 'Crudo', text: '500 g de cigala' },
      { text: '300 g de arroz bomba' }, { text: 'Sofrito de tomate, ajo y pimiento' },
    ],
    steps: ['Haz un fumet con las cabezas y cáscaras de gamba.', 'Sofríe el calamar con el sofrito y nacara el arroz.', 'Cubre con el fumet caliente y cuece 16 minutos.', 'Añade gambas y cigalas los últimos 3 minutos y reposa.'],
  },
]

export const getRecipe = (id) => RECIPES.find((r) => r.id === id)
// Receta "protagonista" de un producto (la que se muestra en su foto de plato)
export const recipeOf = (pid) => RECIPES.find((r) => r.product === pid && r.id !== 'arroz-marisco') || RECIPES.find((r) => r.product === pid)
// Todas las recetas que usan el producto
export const recipesWith = (pid) => RECIPES.filter((r) => r.ingredients.some((i) => i.pid === pid))
