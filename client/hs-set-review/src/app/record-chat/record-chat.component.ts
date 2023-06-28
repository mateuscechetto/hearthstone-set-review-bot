import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-record-chat',
  templateUrl: './record-chat.component.html',
  styleUrls: ['./record-chat.component.scss']
})
export class RecordChatComponent implements OnInit {

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

    // this.resetCounter();
  }

  stopRecording() {
    this.isRecording = false;
    this.updateChatButtonLabel();

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
