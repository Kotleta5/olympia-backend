import { Application } from 'express';
import nocache from 'nocache';
import resultController from './api/controllers/result.controller';
import authController from './api/controllers/auth.controller';
import { json } from 'express';
export default function routes(): (app: Application) => void {

  return (app: Application) => {
    app.use(nocache());
    app.use(json());
    app.get(
      '/api/topThreeAtheltes/:sport',
      resultController.topThreeAthletes.bind(resultController)
    );

    app.get(
      '/api/fullResults/:sport/:gender',
      resultController.fullResults.bind(resultController)
    );

    app.get(
      '/api/medalTable',
      resultController.medalists.bind(resultController)
    );

    app.get(
      '/api/countries',
      resultController.countries.bind(resultController)
    );

    app.post(
      '/api/register',
      authController.register.bind(authController)
    )

    app.post(
      '/api/authenticate',
      authController.register.bind(authController)
    )
  };
}

