export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface AuthenticationData {
    id: string,
    role: USER_ROLES
}

export class User {
    constructor(
        protected id: string,
        protected name: string,
        protected email: string,
        protected password: string,
        protected role: USER_ROLES
    ) {}

    public getId() {
        return this.id;
    }
    public getName() {
        return this.name;
    }
    public getEmail() {
        return this.email;
    }
    public getPassword() {
        return this.password;
    }
    public getRole() {
        return this.role;
    }

    static toUserModel(data: any): User {
        return new User(data.id, data.name, data.email, data.password, data.role)
    }
}