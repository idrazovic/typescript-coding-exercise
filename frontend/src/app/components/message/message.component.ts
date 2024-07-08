import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-message',
    standalone: true,
    templateUrl: './message.component.html',
    imports: [
        NgClass
    ]
})
export class MessageComponent {
    @Input({ required: true }) message: any;
    @Input() no: any;
}