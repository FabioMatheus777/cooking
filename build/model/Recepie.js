"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recepie = void 0;
class Recepie {
    constructor(id, title, description, date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getDate() {
        return this.date;
    }
    static toRecepiesModel(data) {
        return new Recepie(data.id, data.name, data.email, data.password);
    }
}
exports.Recepie = Recepie;
//# sourceMappingURL=Recepie.js.map