const { Router } = require("express")

const SessionsController = require("../controllers/SessionsController")

const sessionsController = new SessionsController()

const sessinoRoutes = Router()

sessinoRoutes.post("/", sessionsController.create)

module.exports = sessinoRoutes