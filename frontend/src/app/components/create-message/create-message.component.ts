import { NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { Message } from "../../models/message";
import { MessageService } from "../../services/message.service";
import { MessageComponent } from "../message/message.component";

@Component({
    selector: 'app-create-message',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MessageComponent,
        NgIf,
        NgClass,
    ],
    templateUrl: './create-message.component.html',
})
export class CreateMessageComponent {
    messageService = inject(MessageService);

    message: Message = new Message('', 'draft');

    async onSubmit() {
        this.message.status = 'pending';
        const res = await this.messageService.send(this.message.text);
        this.message = new Message('', 'draft');
    }
}