import * as argon2 from 'argon2';
import { randomBytes } from 'node:crypto';

export async function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically random 14-character password
 * containing upper/lowercase, digits and a symbol.
 */
export function generateRandomPassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%^&*';
  const all = upper + lower + digits + symbols;

  const bytes = randomBytes(14);
  const chars: string[] = [];
  for (let i = 0; i < 14; i += 1) {
    chars.push(all[bytes[i] % all.length]);
  }
  // Guarantee at least one of each class.
  chars[0] = upper[bytes[0] % upper.length];
  chars[1] = lower[bytes[1] % lower.length];
  chars[2] = digits[bytes[2] % digits.length];
  chars[3] = symbols[bytes[3] % symbols.length];

  // Fisher–Yates shuffle using random bytes.
  const idx = randomBytes(14);
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = idx[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}
