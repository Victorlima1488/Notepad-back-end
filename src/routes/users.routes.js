const { Router } = require("express");
const AppError = require("../utils/AppError");

const useRouter = Router()

function myMiddleware(request, response, next) {

    const { name } = request.body

    if(!name){
        throw new AppError("O nome é obrigatório.")
    }

    next()
}

const UserController = require("../controllers/UserController");

const userController = new UserController()

useRouter.post('/', myMiddleware, userController.createUser) 
useRouter.put('/:id', userController.update)

module.exports = useRouter