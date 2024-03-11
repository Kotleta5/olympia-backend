import { User } from "../interfaces/types";
import UserManagementService from "../services/user.management.service";
import { Request, Response } from 'express';

export class UserManagementController {
  userManagementService = new UserManagementService();

  async getUserData(_: Request, res: Response): Promise<void> {
    try {
      const userAccounts = await this.userManagementService.getUserData();
      res.status(200).json(userAccounts).end();
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async register(req: Request<{}, {}, User>, res: Response): Promise<void> {
    try {
      const user = req.body;
      if (!this.validateUser(user)) {
        res.status(400).json({ error: "Bad Request" }).end();
      } else {
        await this.userManagementService.register(user);
        res.status(200).send({ message: "success" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Registration failed" }).end();
    }
  }

  validateUser(user: User): boolean {
    if (!user.username && user.username === "" ||
      !user.password && user.password === "" ||
      !user.role &&
      !(user.role === "admin" || user.role === "judger")) {
      console.error("Bad request!");
      return false;
    }
    return true;
  }
}

export default new UserManagementController();