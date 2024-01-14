const { Router } = require("express");

const useRouter = Router()

require("../middlewares/ensureAuthenticated")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const UserController = require("../controllers/UserController");

const userController = new UserController()

useRouter.post('/', userController.createUser) 
useRouter.put('/', ensureAuthenticated, userController.update)

module.exports = useRouter