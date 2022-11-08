export interface RecepiesAuthenticationData {
    id: string,
}

export class Recepie {
    constructor(
        protected id: string,
        protected title: string,
        protected description: string,
        protected date: Date,
    ) { }

    public getId() {
        return this.id;
    }
    public getTitle() {
        return this.title;
    }
    public getDescription() {
        return this.description;
    }
    public getDate() {
        return this.date;
    }

    static toRecepiesModel(data: any): Recepie {
        return new Recepie(data.id, data.name, data.email, data.password)
    }
}