import ServerRouter from 'api/helpers/ServerRouter'
import PartySubscriptionsController from 'api/controllers/PartySubscriptionsController'
import BirthDatesController from 'api/controllers/BirthDatesController'
import VipController from 'api/controllers/VipController'
import InstallationsController from 'api/controllers/InstallationsController'

  new ServerRouter(req, res, next)
    .post('/party-subscriptions', PartySubscriptionsController, 'create')
