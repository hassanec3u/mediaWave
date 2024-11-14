import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../service/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Message } from '../shared/types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  senderId: string = '';
  @Input() selectedConversation: any;
  private messageSubscription: Subscription | undefined;

  constructor(private messageService: MessageService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.senderId = this.cookieService.get('userId');
    this.loadMessageHistory();

    // S'abonner aux nouveaux messages
    this.messageService.listenForMessages();

    // S'abonne aux messages en temps réel
    this.messageSubscription = this.messageService
      .getMessageObservable()
      .subscribe((message) => {
        // Ajouter un nouveau message à la liste des messages
        if (
          message.receiverId === this.senderId ||
          message.senderId === this.senderId
        ) {
          this.messages.push(message);
        }
      });

    // Charger l'historique des messages au début
    this.loadMessageHistory();
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageService.disconnect();
    }
  }

  sendMessage(content: string) {
    if (content.trim()) {
      const message: Message = {
        content: content,
        senderId: this.senderId,
        receiverId: this.selectedConversation[1],
      };
      this.messageService.sendMessage(message); // Envoi du message via le service
      this.newMessage = ''; // Réinitialise la zone de texte
    }
  }

  loadMessageHistory() {
    if (this.selectedConversation) {
      const receiverId = this.selectedConversation[1]; // ID de la conversation cible
      this.messageService
        .getMessageHistory(this.senderId, receiverId)
        .subscribe((messages) => {
          this.messages = messages;
        });
    }
  }

  // Fonction pour fermer la conversation active
  closeChat() {
    this.selectedConversation = null;
  }
}
