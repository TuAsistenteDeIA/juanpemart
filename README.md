# Pescados JuanPemart · Demo de rediseño

Demo visual navegable de la nueva web de Pescados JuanPemart (React + Vite). No usa backend: todos los datos son de ejemplo.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist
npm run check:images   # comprueba que ninguna foto se repite
```

## Despliegue en Netlify

- Build command: `npm run build` · Publish directory: `dist` (ya definido en `netlify.toml`).
- Node 22 (también en `netlify.toml`).
- La navegación usa rutas con `#` (`#/tienda`, `#/producto/lubina`…), así que no necesita reglas de reescritura.

## Estructura

- `src/pages` · una página por sección (Home, Tienda, Producto, Carrito, WhatsApp, Cocinar, IA, Recetas, Gourmet, Locales, Lonja, Redes, Cuenta).
- `src/data` · productos, recetas, locales y contenidos de ejemplo.
- `public/img`, `public/video` · fotos y vídeos de stock (Unsplash, Pexels, Pixabay). Sustituir por material propio antes de la entrega.
- `scripts/check-images.mjs` · verificador de fotos repetidas.

## Parámetros de revisión

- `?static` → sin animaciones (para capturas).
- `?menu` → abre el menú móvil.
- `?chefdemo=celebracion,6,hoy,todo,ninguna` → reproduce solo el recorrido de «¿Qué vas a cocinar?».

## Datos reales y datos de ejemplo

Reales (de pescadosjuanpemart.com): nombres y direcciones de los 6 locales, teléfono 958 73 53 57.
De ejemplo: horarios, precios, ofertas, recetas, publicaciones de redes y cifras.
