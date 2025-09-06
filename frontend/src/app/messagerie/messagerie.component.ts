import { Component } from '@angular/core';
import {Conversation} from '../shared/types/conversation.type';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css'
})
export class MessagerieComponent {
  selectedConversation!: Conversation ;

  onConversationSelected(conversation: Conversation) {
    this.selectedConversation = conversation;
  }
}
