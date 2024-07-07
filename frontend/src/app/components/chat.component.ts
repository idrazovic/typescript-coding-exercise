import { AsyncPipe, NgForOf } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";

import { MessageComponent } from "../components/message.component";
import { MessageService } from "../services/message.service";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        AsyncPipe,
        MessageComponent
    ],
    template: `
    <div>
    @for (message of messages(); track message.text) {
        <app-message [message]="message" [no]="$index"></app-message>
    }
    </div>
  `,
})
export class ChatComponent implements OnInit {
    private messagesService = inject(MessageService);

    messages = this.messagesService.loadedMessages;

    ngOnInit() {
        this.messagesService.all();
    }
}