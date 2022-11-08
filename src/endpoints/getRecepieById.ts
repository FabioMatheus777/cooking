import { Request, Response } from "express"
import { RecepiesDatabase } from "../data/RecepiesDatabase"
import { AuthenticationData } from "../model/User"
import { Authenticator } from "../services/Authenticator"

export async function getRecepieById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id
        const token = req.headers.authorization as string
        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token) as AuthenticationData
        const recepieDB = new RecepiesDatabase()

        // console.log(tokenData)


        if (!tokenData) {
            res.statusCode = 401
            throw new Error("Não autorizado, token inválido")
        }
        if (!id) {
            res.statusCode = 400
            throw new Error("Não existe esse ID")
        }
        const recepieId = await recepieDB.getUserById(id)

        res.status(200).send({
            id: recepieId.id,
            title: recepieId.title,
            description: recepieId.description,
            date: recepieId.date
        })

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send({ message: error.message })
        } else {
            res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
        }
    }
}