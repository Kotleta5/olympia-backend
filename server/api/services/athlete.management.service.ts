import { FullData, UpdateResult } from "../interfaces/types";
import { knex } from "./database.service"

export default class AthleteManagementService {
  async updateResult(updateResult: UpdateResult): Promise<number> {
    try {
      await knex<FullData>('athletes').where('id', updateResult.id)
        .update('result', updateResult.result)
      return updateResult.id;
    } catch (error) {
      console.error(error);
      throw new Error(`Couldn't update result with the id: ${updateResult.id}`);
    }
  }
}