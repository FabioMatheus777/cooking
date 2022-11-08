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
exports.RecepiesDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class RecepiesDatabase extends BaseDatabase_1.BaseDatabase {
    createRecepie(recepies) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("cookenu_recepies")
                    .insert({
                    id: recepies.getId(),
                    title: recepies.getTitle(),
                    description: recepies.getDescription(),
                    date: recepies.getDate()
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recepie = yield BaseDatabase_1.BaseDatabase.connection("cookenu_recepies")
                .select("*")
                .where({ id });
            return recepie[0];
        });
    }
    catch(error) {
        throw new Error(error.sqlMessage || error.message);
    }
}
exports.RecepiesDatabase = RecepiesDatabase;
//# sourceMappingURL=RecepiesDatabase.js.map