import { UpdateResult } from "../interfaces/types";
import AthleteManagementService from "../services/athlete.management.service";
import { Request, Response } from 'express';

export class AthleteManagementController {
  athleteManagementService = new AthleteManagementService();

  async updateResult(req: Request, res: Response): Promise<void> {
    try {
      const updateResult: UpdateResult = req.body;
      this.validateUpdateResult(updateResult);
      const updateId = await this.athleteManagementService.updateResult(updateResult);
      res.status(200).json({ message: `successfully updated result with id ${updateId}` }).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  validateUpdateResult(updateResult: UpdateResult) {
    if (typeof updateResult.id !== 'number' && typeof updateResult.result !== 'number') {
      throw new Error("Bad Request");
    }
  }
}

export default new AthleteManagementController();