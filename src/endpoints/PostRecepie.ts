import { Request, Response } from "express";
import { RecepiesDatabase } from "../data/RecepiesDatabase";
import { Recepie } from "../model/Recepie";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";

export async function postRecepie (req:Request, res:Response){
    try {

        const token = req.headers.authorization as string
        
        const {title, description} = req.body
        
        const authenticator = new Authenticator();

        const tokenData = authenticator.getTokenData(token);


        if(!title || !description) {
            res.status(422)
            .send("insira corretamente todas informações");
        }

        const recepieDB = new RecepiesDatabase();

        const idGenerator = new IdGenerator();

        const id = idGenerator.generate();

        const date = new Date();

        const newRecepie = new Recepie(id, title, description, date);
        await recepieDB.createRecepie(newRecepie);

        res.status(201).send({message: "Receita criada com sucesso!"})
    } catch (error:any) {
        res.status(500).send(error.message)
    }
}