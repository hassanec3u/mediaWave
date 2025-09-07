import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {io, Socket} from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environments";
import {ChatMessage} from '../shared/types/chatmessage.type';

import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})


export class MessageService {
  private readonly socket: Socket;

  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  private readonly messageSubject = new Subject<ChatMessage>();

  private stompClient?: Client;

  private readonly subscriptions = new Map<string, StompSubscription>();


  constructor(private readonly http: HttpClient,) {
    this.socket = io(environment.backend);
  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.backendUrl}/message`, message);
  }

  getMessageHistory = (conversationId: string) => {
    return this.http.get<ChatMessage[]>(`${this.backendUrl}/message/history/${conversationId}`);
  }

  getMessageObservable() {
    return this.messageSubject.asObservable();
  }

  connect(): void {
    if (this.stompClient?.active) return;

    const socketUrl = `${this.backendUrl}/ws`;
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(socketUrl) as any,
      reconnectDelay: 5000,
      debug: () => {
      } // ou console.log
    });

    this.stompClient.onConnect = () => {
      console.log('STOMP connected');
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();

    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
  }

  subscribeConversation(conversationId: string): void {
    if (!this.stompClient) {
      this.connect();
    }

    if (!this.stompClient?.connected) {
      this.stompClient!.onConnect = () => {
        console.log('STOMP connected, now subscribing to:', conversationId);
        this.subscribeConversation(conversationId);
      };
      return;
    }

    const key = `conv:${conversationId}`;
    if (this.subscriptions.has(key)) return;

    const destination = `/topic/conversations/${conversationId}`;
    const sub = this.stompClient!.subscribe(destination, (msg: IMessage) => {
      try {
        const payload = JSON.parse(msg.body) as ChatMessage;
        this.messageSubject.next(payload);
      } catch (e) {
        console.error('Invalid WS message', e, msg.body);
      }
    });
    this.subscriptions.set(key, sub);
  }
}
