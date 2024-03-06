import * as argon2 from "argon2";
import { error } from "console";
import { User } from "../interfaces/types";
import knex from "knex";

export default class AuthService {

  async register(user: User): Promise<void> {
    
    const hashedPassword = await argon2.hash(user.password);
    console.log(hashedPassword);
    console.log(hashedPassword.length);
    // saveUser(user);

    // return await knex<User>('users')
    // .insert({
    //   username: "ignore@example.com",
    //   password: hashedPassword,
    //   role: ""
    // })
  }

  async authenticate(user: User): Promise<string> {
    // passwordFromDb = findPasswordByUsername(username);
    try {
      if (await argon2.verify("", user.password)) {
        return "";
      };
    } catch (err) {
      console.error(err);
    }
    throw error;
  }

}