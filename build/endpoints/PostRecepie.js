"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecepie = void 0;
const RecepiesDatabase_1 = require("../data/RecepiesDatabase");
const Recepie_1 = require("../model/Recepie");
const Authenticator_1 = require("../services/Authenticator");
const idGenerator_1 = require("../services/idGenerator");
function postRecepie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const { title, description } = req.body;
            const authenticator = new Authenticator_1.Authenticator();
            const tokenData = authenticator.getTokenData(token);
            if (!title || !description) {
                res.status(422)
                    .send("insira corretamente todas informações");
            }
            const recepieDB = new RecepiesDatabase_1.RecepiesDatabase();
            const idGenerator = new idGenerator_1.IdGenerator();
            const id = idGenerator.generate();
            const date = new Date();
            const newRecepie = new Recepie_1.Recepie(id, title, description, date);
            yield recepieDB.createRecepie(newRecepie);
            res.status(201).send({ message: "Receita criada com sucesso!" });
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.postRecepie = postRecepie;
//# sourceMappingURL=PostRecepie.js.map