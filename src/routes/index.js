const { Router } = require('express');

// Connection to routes

const userRoutes = require("./users.routes")
const noteRoutes = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", noteRoutes)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionRouter)

module.exports = routes