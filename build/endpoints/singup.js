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
exports.singup = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const User_1 = require("../model/User");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const idGenerator_1 = require("../services/idGenerator");
function singup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                res.status(422)
                    .send("insira corretamente todas informações");
            }
            const userDB = new UserDatabase_1.UserDatabase();
            const user = yield userDB.findUserByEmail(email);
            if (user) {
                res.status(409)
                    .send("usuario já cadastrado!");
            }
            const idGenerator = new idGenerator_1.IdGenerator();
            const id = idGenerator.generate();
            const hashManager = new HashManager_1.HashManager();
            const hashPassword = yield hashManager.hash(password);
            const newUser = new User_1.User(id, name, email, hashPassword, role);
            yield userDB.createUser(newUser);
            const payload = {
                id: newUser.getId(),
                role: newUser.getRole()
            };
            const authenticator = new Authenticator_1.Authenticator();
            const token = authenticator.generate(payload);
            console.log(token);
            res.status(200).send({ token });
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.singup = singup;
//# sourceMappingURL=singup.js.map