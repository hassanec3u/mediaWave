import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
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
export class MessageComponent implements OnChanges, OnDestroy {

  messages: ChatMessage[] = [];

  newMessage: string = '';

  senderId: string = '';

  @Input() selectedConversation!: Conversation;

  private messageSub?: Subscription;

  private readonly messageSubscription: Subscription | undefined;

  constructor(private readonly messageService: MessageService, private readonly cookieService: CookieService) {
  }

  ngOnChanges() {
    if (!this.selectedConversation) return;

    this.senderId = this.cookieService.get('userId');

    // Charger l’historique REST
    this.loadMessageHistory();

    // Se connecter au broker WS et s’abonner
    this.messageService.connect();
    this.messageService.subscribeConversation(this.selectedConversation.id);

    // Se réabonner au flux
    this.messageSub?.unsubscribe();
    this.messageSub = this.messageService.getMessageObservable().subscribe((msg) => {
      if (msg && msg.conversationId === this.selectedConversation.id) {
        this.messages.push(msg);
      }
      //log message
      console.log('Received message via WebSocket:', msg);
    });
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
      this.messageService.sendMessage(chatMessage).subscribe((chatMessage) => {
          this.newMessage = '';
        }
      );
    }
  }


  loadMessageHistory() {
    if (this.selectedConversation) {

      this.messageService.getMessageHistory(this.selectedConversation.id).subscribe((messages: ChatMessage[]) => {
        this.messages = messages.slice().reverse()
      });
    }
  }
}
