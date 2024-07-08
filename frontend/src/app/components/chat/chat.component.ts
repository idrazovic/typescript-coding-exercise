import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";

import { MessageComponent } from "../message/message.component";
import { MessageService } from "../../services/message.service";
import { CreateMessageComponent } from "../create-message/create-message.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    imports: [
        AsyncPipe,
        MessageComponent,
        CreateMessageComponent
    ],
})
export class ChatComponent implements OnInit {
    private messagesService = inject(MessageService);

    messages = this.messagesService.loadedMessages;

    ngOnInit() {
        this.messagesService.all();
    }
}