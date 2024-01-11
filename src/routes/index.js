const { Router } = require('express');

const userRoutes = require("./users.routes")
const noteRoutes = require("./notes.routes")
const tagsRouter = require("./tags.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", noteRoutes)
routes.use("/tags", tagsRouter)

module.exports = routes