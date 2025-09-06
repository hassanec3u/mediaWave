import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {io, Socket} from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environments";
import {ChatMessage} from '../shared/types/chatmessage.type';

@Injectable({
  providedIn: 'root',
})


export class MessageService {
  private readonly socket: Socket;

  private readonly messageSubject = new Subject<any>();

  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;


  constructor(private readonly http: HttpClient,) {
    this.socket = io(environment.backend);
  }


  sendMessage(message: ChatMessage):Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.backendUrl}/message`, message);
  }

  getMessageHistory = (conversationId : string) => {
    return this.http.get<ChatMessage[]>(`${this.backendUrl}/message/history/${conversationId}`);
  }
}
