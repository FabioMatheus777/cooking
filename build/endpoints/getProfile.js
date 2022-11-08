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
exports.getProfile = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const authenticator = new Authenticator_1.Authenticator();
            const tokenData = authenticator.getTokenData(token);
            const userDB = new UserDatabase_1.UserDatabase();
            console.log(token);
            const user = yield userDB.getUserById(tokenData.id);
            if (!tokenData) {
                res.statusCode = 401;
                throw new Error("Não autorizado, token inválido");
            }
            if (!user) {
                res.statusCode = 400;
                throw new Error("Usuário não existe");
            }
            res.status(200).send({
                id: user.getId(),
                email: user.getEmail(),
                role: user.getRole()
            });
        }
        catch (error) {
            res.status(res.statusCode).send({ message: error.sqlMessage || error.message });
        }
    });
}
exports.getProfile = getProfile;
//# sourceMappingURL=getProfile.js.map