import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environments";
import {Message} from '../shared/types/message';

@Injectable({
  providedIn: 'root',
})


export class MessageService {
  private socket: Socket;
  private messageSubject = new Subject<any>();
  private backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;


  constructor(private http: HttpClient,) {
    this.socket = io(environment.backend);
  }

  // S'abonner aux nouveaux messages
  listenForMessages() {
    this.socket.on('message', (message: any) => {
      this.messageSubject.next(message);
    });
  }

  // Emission d'un nouveau message vers le backend
  sendMessage(message: Message) {
    return this.http.post(`${this.backendUrl}/message`, message).subscribe();
  }

  // Observable pour recevoir des messages
  getMessageObservable() {
    return this.messageSubject.asObservable();
  }

  // Déconnexion du WebSocket
  disconnect() {
    this.socket.disconnect();
  }

  getMessageHistory = (senderId: string, recipientId: string) => {
    return this.http.get<any[]>(`${this.backendUrl}/message/${senderId}/${recipientId}`);
  }
}
