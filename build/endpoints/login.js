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
exports.login = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(422)
                    .send("insira corretamente todas informações");
            }
            const userDB = new UserDatabase_1.UserDatabase();
            const user = yield userDB.findUserByEmail(email);
            if (!user) {
                res.status(409)
                    .send("usuario já cadastrado!");
            }
            const hashManager = new HashManager_1.HashManager();
            const passwordIsCorrect = yield hashManager.compare(password, user.getPassword());
            if (!passwordIsCorrect) {
                res.status(401).send("email ou senha incorretos");
            }
            const authenticator = new Authenticator_1.Authenticator();
            const token = authenticator.generate({ id: user.getId(), role: user.getRole() });
            res.status(200).send({ message: "login bem sucedido", token });
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map