import { Request, Response } from 'express';
import AuthService from "../services/auth.service";

export class AuthController {
  authService = new AuthService();

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      this.validateCredentials(req.body.username, req.body.password);
      const authentication = await this.authService.authenticate(req.body.username, req.body.password);
      res.status(200).json(authentication);
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: err.message }).end();
    }
  }

  async isAuthenticated(_: Request, res: Response): Promise<void> {
    res.status(200).json({ isAuthenticated: true });
  }

  private validateCredentials(username: string, password: string): void {
    if (!username || username.length <= 0 || !password || password.length <= 0) {
      throw new Error("invalid credentials");
    }
  }
}

export default new AuthController();