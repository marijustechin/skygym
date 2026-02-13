import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

type ScryptParams = { N: number; r: number; p: number };

@Injectable()
export class PasswordService {
  private readonly scrypt = promisify(_scrypt) as (
    password: string | Buffer,
    salt: string | Buffer,
    keylen: number,
    options: ScryptParams,
  ) => Promise<Buffer>;

  private readonly KEY_LENGTH = 64;
  private readonly SALT_LENGTH = 16;

  private readonly DEFAULT_PARAMS: ScryptParams = {
    N: 16384,
    r: 8,
    p: 1,
  };

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(this.SALT_LENGTH);
    const derivedKey = await this.scrypt(
      password,
      salt,
      this.KEY_LENGTH,
      this.DEFAULT_PARAMS,
    );

    return [
      'scrypt',
      this.DEFAULT_PARAMS.N,
      this.DEFAULT_PARAMS.r,
      this.DEFAULT_PARAMS.p,
      salt.toString('base64'),
      derivedKey.toString('base64'),
    ].join('$');
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const parts = storedHash.split('$');
    if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

    const [, Nstr, rstr, pstr, saltB64, hashB64] = parts;

    const N = Number(Nstr);
    const r = Number(rstr);
    const p = Number(pstr);

    if (![N, r, p].every(Number.isInteger)) return false;
    if (N < 16384 || r < 8 || p < 1) return false;

    const salt = Buffer.from(saltB64, 'base64');
    const originalHash = Buffer.from(hashB64, 'base64');

    if (salt.length === 0 || originalHash.length === 0) return false;

    const derivedKey = await this.scrypt(password, salt, originalHash.length, {
      N,
      r,
      p,
    });

    return timingSafeEqual(originalHash, derivedKey);
  }
}
