// Comprueba que no haya fotos repetidas en la web.
//  1) Cada archivo de /img y /video se referencia una sola vez en src/.
//  2) Dos archivos referenciados no tienen el mismo contenido visual (hash perceptual dHash).
// Uso: node scripts/check-images.mjs
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
const files = walk(join(root, 'src')).filter((f) => /\.(jsx?|css)$/.test(f))

const refs = new Map() // ruta -> [archivo:linea]
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/\/(?:img|video)\/[A-Za-z0-9_.-]+\.(?:jpg|jpeg|png|webp|mp4)/g)) {
      if (!refs.has(m[0])) refs.set(m[0], [])
      refs.get(m[0]).push(`${f.replace(root, '').replace(/\\/g, '/')}:${i + 1}`)
    }
  })
}

let problems = 0
const warn = (msg) => { problems++; console.log('✗', msg) }

// 1) Referencias únicas y archivos existentes
for (const [p, where] of refs) {
  if (!existsSync(join(root, 'public', p))) warn(`No existe ${p} (${where[0]})`)
  if (where.length > 1) warn(`${p} se usa ${where.length} veces:\n    ${where.join('\n    ')}`)
}

// 2) Duplicados por contenido (idénticos o la misma foto con otro nombre/recorte)
const imgs = [...refs.keys()].filter((p) => /\.(jpe?g|png|webp)$/.test(p))
const dhash = (p) => {
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', join(root, 'public', p), '-vf', 'scale=9:8,format=gray', '-f', 'rawvideo', '-'], { maxBuffer: 1e6 })
  let bits = ''
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += buf[y * 9 + x] > buf[y * 9 + x + 1] ? '1' : '0'
  return bits
}
const hashes = imgs.map((p) => ({ p, md5: createHash('md5').update(readFileSync(join(root, 'public', p))).digest('hex'), d: dhash(p) }))
for (let i = 0; i < hashes.length; i++) {
  for (let j = i + 1; j < hashes.length; j++) {
    const a = hashes[i], b = hashes[j]
    if (a.md5 === b.md5) { warn(`Archivos idénticos: ${a.p} = ${b.p}`); continue }
    let dist = 0
    for (let k = 0; k < 64; k++) if (a.d[k] !== b.d[k]) dist++
    if (dist <= 6) warn(`Fotos casi idénticas (distancia ${dist}): ${a.p} ~ ${b.p}`)
  }
}

console.log(`\n${refs.size} archivos referenciados · ${imgs.length} imágenes comparadas · ${problems ? problems + ' problema(s)' : 'sin repeticiones ✔'}`)
process.exit(problems ? 1 : 0)
