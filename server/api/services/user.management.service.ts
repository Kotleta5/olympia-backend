import { knex } from "./database.service";
import { User } from "../interfaces/types";
import * as argon2 from "argon2";

export default class UserManagementService {
  async getUserData(): Promise<User[]> {
    try {
      const userAccounts = await knex<User>('user_account').select().where({ role: 'judger' });
      const newUserAccounts: User[] = userAccounts.map((user: User) => {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          role: user.role
        }
      });
      return newUserAccounts;
    } catch (err) {
      throw new Error(err);
    }
  };

  async register(user: User): Promise<void> {
    const storedUser = await this.findUserByUsername(user.username);
    if (storedUser) {
      throw new Error('User already exist');
    }
    const hashedPassword = await argon2.hash(user.password);

    return await knex<User>('user_account')
      .insert({
        username: user.username,
        password: hashedPassword,
        role: user.role
      });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await knex<User>('user_account').select().where({ username: username }).first();
  }
}