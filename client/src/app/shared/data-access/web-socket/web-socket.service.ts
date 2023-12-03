import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // socket!: Socket;
  // readonly url: string = 'ws://localhost:5000';

  // constructor() { }

  // connect(cardName: string = 'Embrace of Nature', roomName: string = 'molino_hs') {
  //   this.socket = io(this.url);
  //   this.record(cardName, roomName);
  // }

  // record(cardName: string, roomName: string) {
  //   this.socket.emit('record', cardName, roomName);
  // }

  // listen(eventName: string) {
  //   return new Observable((subscriber) => {
  //     this.socket.on(eventName, (data: any) => {
  //       subscriber.next(data);
  //     })
  //   })
  // }

  // emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }

}
