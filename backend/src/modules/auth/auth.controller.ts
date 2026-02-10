import type { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service.js';

export default class AuthController {
  /**
   * Jei su email ir password
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const auth = await AuthService.login(email, password);

      res.status(200).json(auth);
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password } = req.body;

      const auth = await AuthService.login(username, password);

      res.status(200).json(auth);
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password } = req.body;

      const auth = await AuthService.login(username, password);

      res.status(200).json(auth);
    } catch (error) {
      next(error);
    }
  }
}
