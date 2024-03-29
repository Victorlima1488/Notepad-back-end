const { hash, compare } = require('bcryptjs')

const sqlConnection = require('../database/sqlite')

const AppError = require('../utils/AppError')

class UserController {
    async createUser(request, response){

        const { name, email, password } = request.body
        
        const database = await sqlConnection()
        
        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUsersExists){
            throw new AppError("Este e-mail já está em uso")
        }

        const hashedPassword = await hash(password, 8)

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

        return response.status(201).json()
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body
        
        const {id} = request.params

        const database = await sqlConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        if(!user){
            throw new AppError("Usuário não encontrado.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.")
        }

        if(password && !old_password){
            throw new AppError("Você precisa informa a senha antiga.")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        )

        return response.status(200).json()
    }
}

module.exports = UserController