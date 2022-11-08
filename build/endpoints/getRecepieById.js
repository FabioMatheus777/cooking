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
exports.getRecepieById = void 0;
const RecepiesDatabase_1 = require("../data/RecepiesDatabase");
const Authenticator_1 = require("../services/Authenticator");
function getRecepieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = req.headers.authorization;
            const authenticator = new Authenticator_1.Authenticator();
            const tokenData = authenticator.getTokenData(token);
            const recepieDB = new RecepiesDatabase_1.RecepiesDatabase();
            if (!tokenData) {
                res.statusCode = 401;
                throw new Error("Não autorizado, token inválido");
            }
            if (!id) {
                res.statusCode = 400;
                throw new Error("Não existe esse ID");
            }
            const recepieId = yield recepieDB.getUserById(id);
            res.status(200).send({
                id: recepieId.id,
                title: recepieId.title,
                description: recepieId.description,
                date: recepieId.date
            });
        }
        catch (error) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message });
            }
            else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message });
            }
        }
    });
}
exports.getRecepieById = getRecepieById;
//# sourceMappingURL=getRecepieById.js.map