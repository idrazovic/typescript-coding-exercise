import { NgIf, NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { Message } from "../models/message";
import { MessageService } from "../services/message.service";
import { MessageComponent } from "./message.component";

@Component({
    selector: 'app-create-message',
    standalone: true,
    providers: [MessageService],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MessageComponent,
        NgIf,
        NgClass,
    ],
    template: `
    <div *ngIf="! message.empty()">
      <app-massage [message]="message" no="preview"></app-massage>
    </div>
    <form (ngSubmit)="onSubmit()">
      <label class="mt-4">
        <div>Write Message</div>
        <textarea class="block w-full" required name="text" [(ngModel)]="message.text"></textarea>
      </label>

      <button type="submit"
          [disabled]="message.status === 'pending'"
          class="pointer bg-blue-400 py-2 px-4 mt-2 w-full"
          [ngClass]="{'bg-gray-400': message.status === 'pending'}"
      >Send</button>
    </form>
  `,
    styles: ``
})
export class CreateMessageComponent {
    message: Message = new Message('', 'draft');
    private messageService: MessageService;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    async onSubmit() {
        this.message.status = 'pending';
        const res = await fetch('http://127.0.0.1:3000/messages/send', {
            method: 'GET',
            body: JSON.stringify({ text: this.message.text }),
        });
        res.status === 204 ? this.message.status = 'sent' : this.message.status = 'failed';
        await this.messageService.add(this.message);
        this.message = new Message('', 'draft');
    }
}