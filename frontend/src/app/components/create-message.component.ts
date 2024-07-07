import { NgIf, NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { Message } from "../models/message";
import { MessageService } from "../services/message.service";
import { MessageComponent } from "./message.component";

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
    template: `
    <div *ngIf="! message.empty()">
      <app-message [message]="message" no="preview"></app-message>
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

    constructor(private messageService: MessageService) { }

    async onSubmit() {
        this.message.status = 'pending';
        const res = await this.messageService.send(this.message.text);
        this.message = new Message('', 'draft');
    }
}