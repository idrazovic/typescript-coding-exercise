import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message, MessageInterface } from '../models/message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    httpClient = inject(HttpClient);
    
    private readonly baseUrl = 'http://127.0.0.1:3000/messages';

    private messages = signal<Message[]>([]);

    loadedMessages = this.messages.asReadonly();

    async all() {
        const res = await fetch(this.baseUrl);
        const data: { messages: Message[] } = await res.json();
        const messages = data.messages.map((message: any) => {
            const status = message.user === JSON.parse(localStorage.getItem('userId') as string) ? 'sent' : 'received';
            return new Message(message.text, status)
        });
        this.messages.set([...messages]);
    }

    async send(text: string) {
        const res = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token') as string),
            },
            body: JSON.stringify({ text }),
        });
        const data: { message: MessageInterface } = await res.json();

        const messageStatus = res.status === 201 ? data.message.status = 'sent' : data.message.status = 'failed';
        const message = new Message(data.message.text, messageStatus)
        this.add(message);
    }

    add(message: Message) {
        this.messages.update(previousMessages => [...previousMessages, message]);
    }
}