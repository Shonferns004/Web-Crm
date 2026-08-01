import jwt from 'jsonwebtoken';
import { config } from '../config';
import type { AuthUser } from '../types';

export interface AccessTokenPayload extends AuthUser {
  sub: string;
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  familyId: string;
}

export function signAccessToken(user: AuthUser): string {
  const payload: AccessTokenPayload = { ...user, sub: user.id, type: 'access' };
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpires as jwt.SignOptions['expiresIn'],
  });
}

export function signRefreshToken(userId: string, familyId: string): string {
  const payload: RefreshTokenPayload = { sub: userId, type: 'refresh', familyId };
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpires as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.jwt.accessSecret) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as RefreshTokenPayload;
}
