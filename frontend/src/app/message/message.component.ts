import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {Message} from '../shared/types/message';
import colors from 'tailwindcss/colors';

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

    // Connecter le service WebSocket
    this.messageService.connect();


    // S'abonne aux messages en temps réel
    this.messageSubscription = this.messageService
      .getMessageObservable()
      .subscribe((message) => {
        console.log('Nouveau message reçu via Observable:', message);
        // Ajouter un nouveau message à la liste des messages
        if (message.receiverId === this.senderId || message.senderId === this.senderId) {
        message = { ...message, senderName: message.senderId.username, receiverName: message.receiverId.username };
          this.messages.push(message);
        }
      });
  }

  ngOnChanges() {
    if (this.selectedConversation) {
      this.loadMessageHistory();
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageService.disconnect();
    }
  }

  getOtherParticipant(participants: any[]): any {
    return participants.find((participant) => participant._id !== this.senderId);
  }

  sendMessage(content: string) {
    if (content.trim() && this.selectedConversation) {
      const receiver = this.getOtherParticipant(this.selectedConversation.participants);

      const payload = {
        senderId: this.senderId,
        receiverId: receiver._id,
        content: content.trim(),
      };

      // Envoyer le message via le service
      this.messageService.sendMessage(payload).subscribe(
        (response) => {
          console.log('Message envoyé avec succès :', response);
          this.newMessage = '';
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du message :', error);
        }
      );
    }
  }


  loadMessageHistory() {
    if (this.selectedConversation) {
      const receiverId = this.getOtherParticipant(this.selectedConversation.participants)._id;

      this.messageService.getMessageHistory(this.senderId, receiverId).subscribe((messages: Message[]) => {

        this.messages = messages.map((message) => ({
          ...message,
          senderName: message.senderId.username,
          receiverName: message.receiverId.username,
        }));
      });
    }
  }


  closeChat() {
    this.selectedConversation = null;
  }
}
