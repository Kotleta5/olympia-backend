import { User } from "../interfaces/types";
import AuthService from "../services/auth.service"
import { Request, Response } from 'express';

export class AuthController {
  authService = new AuthService();
  async register(req: Request<{}, {}, User>, res: Response): Promise<void> {
    try {
      const user = req.body;
      if (!this.validateUser(user)) {
        res.status(400).json({ error: "Bad Request" }).end();
      } else {
        const token = await this.authService.register(user);
        res.status(200).send({ token });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Registration failed" }).end();
    }
  }
  validateUser(user: User): boolean {
    if (!user.username || typeof user.username !== "string" ||
      !user.password || typeof user.password !== "string") {
      return false;
    }
    return true;
  }
}

export default new AuthController();