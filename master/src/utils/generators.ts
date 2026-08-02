const UPPERCASE = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijkmnpqrstuvwxyz'
const DIGITS = '23456789'
const SYMBOLS = '!@#$%^&*_-+='

const USERNAME_PREFIXES = ['admin', 'master', 'crm', 'super', 'guardian']

const cryptoRandomInt = (maxExclusive: number): number => {
  const buffer = new Uint32Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0]! % maxExclusive
}

const pick = (set: string, count: number): string => {
  let out = ''
  for (let i = 0; i < count; i += 1) {
    out += set[cryptoRandomInt(set.length)] ?? ''
  }
  return out
}

const shuffle = (value: string): string => {
  const chars = value.split('')
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = cryptoRandomInt(i + 1)
    const tmp = chars[i]!
    chars[i] = chars[j]!
    chars[j] = tmp
  }
  return chars.join('')
}

export const generateUsername = (): string => {
  const prefix = USERNAME_PREFIXES[cryptoRandomInt(USERNAME_PREFIXES.length)] ?? 'admin'
  const year = new Date().getFullYear()
  return `${prefix}_${year}_${pick(DIGITS, 4)}`
}

export const generatePassword = (length = 14): string => {
  const required =
    pick(UPPERCASE, 1) + pick(LOWERCASE, 1) + pick(DIGITS, 1) + pick(SYMBOLS, 1)
  const rest = pick(
    UPPERCASE + LOWERCASE + DIGITS + SYMBOLS,
    Math.max(length - required.length, 0),
  )
  return shuffle(required + rest)
}
