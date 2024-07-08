import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";

import { MessageComponent } from "../components/message.component";
import { MessageService } from "../services/message.service";
import { CreateMessageComponent } from "./create-message.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        AsyncPipe,
        MessageComponent,
        CreateMessageComponent
    ],
    template: `
    <div class="mb-6">
        <h1 class="text-2xl my-8">Chat App</h1>
        @for (message of messages(); track message.text) {
            <app-message [message]="message" [no]="$index"></app-message>
        }
    </div>
    <app-create-message></app-create-message>
  `,
})
export class ChatComponent implements OnInit {
    private messagesService = inject(MessageService);

    messages = this.messagesService.loadedMessages;

    ngOnInit() {
        this.messagesService.all();
    }
}