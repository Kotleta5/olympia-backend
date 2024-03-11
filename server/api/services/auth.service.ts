import * as argon2 from "argon2";
import UserManagementService from "./user.management.service";
import '../../common/env'
const jwt = require('jsonwebtoken');

export default class AuthService {
  userManagementService: UserManagementService = new UserManagementService();

  async authenticate(username: string, password: string): Promise<any> {
    try {
      const userFromDb = await this.userManagementService.findUserByUsername(username);
      if (!userFromDb) {
        throw new Error("authentication failed");
      }
      await argon2.verify(userFromDb?.password ?? "", password ?? "");
      const token = jwt.sign({ role: userFromDb.role }, process.env.JWT_SECRET, { 'expiresIn': '1h' });
      return { token: token, role: userFromDb.role };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}