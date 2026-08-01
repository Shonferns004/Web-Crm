const imageMap = import.meta.glob('/src/assets/images/**/*.{jpeg,jpg,JPG,png,gif,webp,svg,ico}', {
  eager: true,
  query: '?url',
})

export function img(path) {
  const key = `/src/assets/images${path}`
  const val = imageMap[key]
  if (!val) return path
  return typeof val === 'string' ? val : val.default || path
}
