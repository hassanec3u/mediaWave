import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

  private readonly messageSubscription: Subscription | undefined;

  constructor(private readonly messageService: MessageService, private readonly cookieService: CookieService) {
  }

  ngOnChanges() {

    this.senderId = this.cookieService.get('userId');
    this.loadMessageHistory();
  }


  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
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
          console.log('MessageType envoyé avec succès :', chatMessage);
          this.newMessage = '';
          this.messages.push(chatMessage);
        }
      );
    }
  }


  loadMessageHistory() {
    if (this.selectedConversation) {

      this.messageService.getMessageHistory(this.selectedConversation.id).subscribe((messages: ChatMessage[]) => {
        console.log("les msgs " + messages);
        this.messages = messages.slice().reverse()
      });
    }
  }
}
