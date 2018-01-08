export function isEmpty(obj) {
  if (!obj) return true

  if (Array.isArray(obj) && obj.length === 0) return true
  if (Object.keys(obj).length === 0) return true

  return false
}
