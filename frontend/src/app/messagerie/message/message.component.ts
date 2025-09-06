import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {ChatMessage} from '../../shared/types/chatmessage.type';
import {User} from '../../shared/types/user.type';
import {Conversation} from '../../shared/types/conversation.type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {

  messages: ChatMessage[] = [];

  newMessage: string = '';

  senderId: string = '';

  @Input() selectedConversation!: Conversation;

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
        if (message.receiverId._id === this.senderId || message.senderId._id === this.senderId) {
          message = {...message, senderName: message.senderId.username, receiverName: message.receiverId.username};
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

  getOtherParticipant(participants: User[]): User {
    return <User>participants.find((participant) => participant.id !== this.senderId);
  }

  sendMessage(content: string) {

    if (content.trim() && this.selectedConversation) {
      const receiver = this.getOtherParticipant(this.selectedConversation.members);

      const chatMessage: ChatMessage = {
        receiverId: receiver.id,
        content: content.trim(),
        conversationId: this.selectedConversation.id,
      };

      // Envoyer le message via le service
      this.messageService.sendMessage(chatMessage).subscribe(
        (response) => {
          console.log('MessageType envoyé avec succès :', response);
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

      this.messageService.getMessageHistory(this.selectedConversation.id).subscribe((messages: ChatMessage[]) => {
        this.messages = messages;
      });
    }
  }
}
