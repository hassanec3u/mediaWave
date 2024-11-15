import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environments";
import {Message} from 'postcss';

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

  connect() {
    this.socket = io(this.backendUrl);

    //Aficher l'adresse du serveur
    console.log('Connecté au serveur WebSocket:', this.backendUrl);

    this.socket.on('message', (message: Message) => {
      console.log('Nouveau message reçu via WebSocket:', message);
      this.messageSubject.next(message);
    });
  }

  // Déconnexion des WebSockets
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }




  // Emission d'un nouveau message vers le backend
  sendMessage(message: any) {
    return this.http.post(`${this.backendUrl}/message`, message);
  }

  // Observable pour recevoir des messages
  getMessageObservable() {
    return this.messageSubject.asObservable();
  }



  getMessageHistory = (senderId: string, recipientId: string) => {
    return this.http.get<any[]>(`${this.backendUrl}/message/${senderId}/${recipientId}`);
  }
}
