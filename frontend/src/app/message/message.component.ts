import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {Message} from '../shared/types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  senderId: string = '';
  @Input() conversation!: any;
  private messageSubscription: Subscription | undefined;

  constructor(private messageService: MessageService, private cookieService: CookieService) {
  }

  ngOnInit() {

    this.senderId = this.cookieService.get('userId');
    this.loadMessageHistory();

    // S'abonner aux nouveaux messages
    this.messageService.listenForMessages();

    // Abonnement aux messages en temps réel
    this.messageSubscription = this.messageService.getMessageObservable().subscribe((message) => {
      this.messages.push(message);
    });
    this.loadMessageHistory();
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageService.disconnect();
    }
  }

  // Envoi d'un message
  sendMessage(content: string) {
    if (this.newMessage.trim()) {
      const message: Message = {
        content: content,
        senderId: this.senderId,
        receiverId: this.conversation[1],
        createdAt: new Date()
      };
      this.messageService.sendMessage(message);
      this.newMessage = '';
    }
  }

  loadMessageHistory() {
    this.messageService.getMessageHistory(this.senderId, this.conversation[1]).subscribe((messages) => {
      this.messages = messages;
    });
  }
}
