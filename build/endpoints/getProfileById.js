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
exports.getProfileById = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
function getProfileById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = req.headers.authorization;
            const authenticator = new Authenticator_1.Authenticator();
            const tokenData = authenticator.getTokenData(token);
            const userDB = new UserDatabase_1.UserDatabase();
            console.log(tokenData);
            if (!tokenData) {
                res.statusCode = 401;
                throw new Error("Não autorizado, token inválido");
            }
            if (!id) {
                res.statusCode = 400;
                throw new Error("Não existe esse ID");
            }
            const userId = yield userDB.getUserById(id);
            console.log(userId);
            res.status(200).send({
                id: userId.id,
                email: userId.email,
                role: userId.role
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
exports.getProfileById = getProfileById;
//# sourceMappingURL=getProfileById.js.map