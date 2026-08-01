const imageMap = import.meta.glob('/src/assets/images/**/*.{jpeg,jpg,JPG,png,gif,webp,svg,ico}', {
  eager: true,
  query: '?url',
})

function localImage(path) {
  const key = `/src/assets/images${path}`
  const val = imageMap[key]
  if (!val) return path
  return typeof val === 'string' ? val : val.default || path
}

// Sab images isi ek function se resolve hoti hain:
//  - Absolute URL (http/https) → jaisa hai waise hi (backend/images aise aayenge)
//  - Local bundled asset path  → Vite ke hashed URL me convert
// Backend ready hone par bas data me absolute URLs aa jayenge, yahan kuch nahi badlega.
export function img(path) {
  if (!path) return path
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  if (path.startsWith('http')) return path
  return localImage(path)
}
