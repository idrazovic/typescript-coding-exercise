export interface MessageInterface {
    text: string;
    status: string;
}

export class Message implements MessageInterface {
    text;
    status: string;
    constructor(message: string, status: string) {
        this.text = message;
        this.status = status;
    }

    empty() {
        return this.text === '';
    }
}