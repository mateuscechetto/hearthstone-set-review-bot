import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-record-chat',
    templateUrl: './record-chat.component.html',
    styleUrls: ['./record-chat.component.scss'],
    standalone: true,
    imports: [ButtonModule, NgIf]
})
export class RecordChatComponent implements OnInit {

  @Output() onRecordChat: EventEmitter<any> = new EventEmitter<any>();
  @Output() onStopRecording: EventEmitter<any> = new EventEmitter<any>();

  isRecording: boolean = false;

  recordChatButtonLabel: 'Record Chat' | 'Recording...' = 'Record Chat';

  // counter: number = 6;
  // counterString: string = '0:06';

  // counterSubscription!: Subscription;

  ngOnInit(): void {
  }

  recordChat() {
    this.isRecording = true;
    this.updateChatButtonLabel();
    this.onRecordChat.emit(true);

    // this.resetCounter();
  }

  stopRecording() {
    this.isRecording = false;
    this.updateChatButtonLabel();
    this.onStopRecording.emit(true);

    // if (this.counterSubscription) {
    //   this.counterSubscription.unsubscribe();
    // }
  }

  private updateChatButtonLabel() {
    this.recordChatButtonLabel = this.isRecording ? 'Recording...' : 'Record Chat';
  }

  // private resetCounter() {
  //   this.counter = 6;
  //   this.updateCounter();
  //   if (this.counterSubscription) {
  //     this.counterSubscription.unsubscribe();
  //   }
  //   this.counterSubscription = interval(1000).subscribe(
  //     () =>  this.updateCounter()
  //   );
  // }

  // private updateCounter() {
  //   this.counterString = this.stringfyTime(this.counter);
  //   if (this.counter > 0) {
  //     this.counter--;
  //   } else if (this.counter == 0) {
  //     this.stopRecording();
  //   }
  // }

  // private stringfyTime(seconds: number): string{
  //   let remainder = seconds % 60;
  //   return `${(seconds / 60) >> 0}:${remainder < 10 ? '0'+ remainder : remainder}`;
  // }

  // ngOnDestroy(): void {
  //   this.counterSubscription.unsubscribe();
  // }

}
