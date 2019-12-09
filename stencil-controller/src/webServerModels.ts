export class User {
    constructor(public name: string) {}
}

export class Message {
    constructor(public from: User, public content: string) {}
}