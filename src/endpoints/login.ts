import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { AuthenticationData, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422)
                .send("insira corretamente todas informações");
        }

        const userDB = new UserDatabase()
        const user = await userDB.findUserByEmail(email);


        if (!user) {
            res.status(409)
                .send("usuario já cadastrado!")
        }

        const hashManager = new HashManager();
        const passwordIsCorrect = await hashManager.compare(password, user.getPassword());

        if (!passwordIsCorrect) {
            res.status(401).send("email ou senha incorretos")
        }
        // const newUser = new User( email, password);
        // await userDB.createUser(newUser);


        const authenticator = new Authenticator();
        const token = authenticator.generate({ id: user.getId(), role: user.getRole() })

        res.status(200).send({message:"login bem sucedido", token })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}