import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import config from '../../config/config.js';
import ApiError from '../../shared/errors/api.errors.js';

export default class TokenService {
  static generateTokens(payload: JwtPayload) {
    const accessToken = jwt.sign(payload, config.jwt.jwtAccess, {
      expiresIn: config.jwt.jwtAccessExpires as StringValue,
    });

    const refreshToken = jwt.sign(payload, config.jwt.jwtRefresh, {
      expiresIn: config.jwt.jwtRefreshExpires as StringValue,
    });

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, config.jwt.jwtAccess);

      return userData as JwtPayload;
    } catch (error) {
      throw ApiError.Unauthorized('Invalid token');
    }
  }

  static validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, config.jwt.jwtRefresh);

      return userData as JwtPayload;
    } catch (error) {
      console.log('validateRefreshToken: ', error);
      return null;
    }
  }
}
