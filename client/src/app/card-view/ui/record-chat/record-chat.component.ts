import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-record-chat',
  templateUrl: './record-chat.component.html',
  styleUrls: ['./record-chat.component.scss'],
  standalone: true,
  imports: [ButtonModule, NgIf],
})
export class RecordChatComponent {
  @Output() onRecordChat: EventEmitter<any> = new EventEmitter<any>();
  @Output() onStopRecording: EventEmitter<any> = new EventEmitter<any>();

  isRecording: boolean = false;

  recordChatButtonLabel: 'Record Chat' | 'Recording...' = 'Record Chat';

  recordChat() {
    this.isRecording = true;
    this.updateChatButtonLabel();
    this.onRecordChat.emit(true);
  }

  stopRecording() {
    this.isRecording = false;
    this.updateChatButtonLabel();
    this.onStopRecording.emit(true);
  }

  private updateChatButtonLabel() {
    this.recordChatButtonLabel = this.isRecording
      ? 'Recording...'
      : 'Record Chat';
  }
}
