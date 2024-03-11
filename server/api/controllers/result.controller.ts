import ResultService from "../services/result.service";
import { Request, Response } from 'express';

export class ResultController {
  resultService = new ResultService();

  async fullData(_: Request, res: Response): Promise<void> {
    try {
      const fullData = await this.resultService.fullData();
      res.status(200).json(fullData).end();
    } catch (err) {
      res.status(500).json({ error: err.message }).end();
    }
  }

  async topThreeAthletes(req: Request, res: Response): Promise<void> {
    try {
      const topAthletes = await this.resultService.topThreeAthletes(req.params.sport);
      res.status(200).json(topAthletes).end();
    } catch (err) {
      res.status(500).json({ error: err.message }).end();
    }
  }

  async fullResults(req: Request, res: Response): Promise<void> {
    try {
      const fullResults = await this.resultService.fullResults(req.params.sport, req.params.gender);
      res.status(200).json(fullResults).end();
    } catch (err) {
      res.status(500).json({ error: err.message }).end();
    }
  }

  async medalists(_: Request, res: Response): Promise<void> {
    try {
      const medalists = await this.resultService.medalists();
      res.status(200).json(medalists).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async countries(_: Request, res: Response): Promise<void> {
    try {
      const countries = await this.resultService.countries();
      res.status(200).json(countries).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async countryMedals(_: Request, res: Response): Promise<void> {
    try {
      const countries = await this.resultService.countryMedals();
      res.status(200).json(countries).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ResultController();