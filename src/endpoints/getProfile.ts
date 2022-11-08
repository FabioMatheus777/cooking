import { Request, Response } from "express"
import { UserDatabase } from "../data/UserDatabase"
import { AuthenticationData } from "../model/User"
import { Authenticator } from "../services/Authenticator"


export async function getProfile(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization! as string
        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token) as AuthenticationData
        const userDB = new UserDatabase()

        console.log(token)

        const user = await userDB.getUserById(tokenData.id)

        if (!tokenData) {
            res.statusCode = 401
            throw new Error("Não autorizado, token inválido")
        }
        if (!user) {
            res.statusCode = 400
            throw new Error("Usuário não existe")
        }
        res.status(200).send({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole()
        })

    } catch (error: any) {
        res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
    }
}