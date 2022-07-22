export class User {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(v: string) {
        this._email = v;
    }

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
    }

    constructor({
        id,
        name,
        email,
        password,
    }: {
        id: string;
        name: string;
        email: string;
        password: string;
    }) {
        this._id = id;
        this._email = email;
        this._name = name;
        this._password = password;
    }
}
