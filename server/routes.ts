import { Application } from 'express';
import nocache from 'nocache';
import resultController from './api/controllers/result.controller';
import authController from './api/controllers/auth.controller';
import userManagementController from './api/controllers/user.management.controller';
import athleteManagementController from './api/controllers/athlete.management.controller';
import { json } from 'express';
import { verifyTokenForAdminRole, verifyTokenForJudgerRole } from './api/middlewares/auth.middleware';
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

    app.get(
      '/api/countryMedals',
      resultController.countryMedals.bind(resultController)
    )

    app.post(
      '/api/register',
      verifyTokenForAdminRole,
      userManagementController.register.bind(userManagementController)
    )

    app.post(
      '/api/authenticate',
      authController.authenticate.bind(authController)
    )

    app.get(
      '/api/isAuthenticated',
      verifyTokenForJudgerRole,
      authController.isAuthenticated.bind(authController)
    )

    app.get(
      '/api/userAccounts',
      verifyTokenForAdminRole,
      userManagementController.getUserData.bind(userManagementController)
    )

    app.get(
      '/api/fullData',
      verifyTokenForJudgerRole,
      resultController.fullData.bind(resultController)
    )

    app.patch(
      '/api/updateResult',
      verifyTokenForJudgerRole,
      athleteManagementController.updateResult.bind(athleteManagementController)
    )
  };
}

