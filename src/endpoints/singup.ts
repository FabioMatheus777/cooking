import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { AuthenticationData, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";

export async function singup (req:Request, res:Response){
    try {
        const {name, email, password, role} = req.body


        if(!name || !email || !password || !role) {
            res.status(422)
            .send("insira corretamente todas informações");
        }

        const userDB = new UserDatabase()
        const user = await userDB.findUserByEmail(email);


        if (user) {
            res.status(409)
            .send("usuario já cadastrado!")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        // console.log('sou o id', id)

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        // console.log(hashPassword)

        const newUser = new User(id, name, email, hashPassword, role);
        await userDB.createUser(newUser);

        const payload:AuthenticationData = {
            id: newUser.getId(),
            role: newUser.getRole()
        }
        const authenticator = new Authenticator();
        const token = authenticator.generate(payload)
        res.status(200).send({token})
    } catch (error:any) {
        res.status(500).send(error.message)
    }
}