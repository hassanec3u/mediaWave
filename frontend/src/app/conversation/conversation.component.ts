import {Component, OnInit} from '@angular/core';
import {ConversationService} from '../service/conversationService';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationListComponent implements OnInit {
  conversations!: any[];
  selectedConversation!: any
  userId!: string;
  newParticipantId!: string;

  constructor(private conversationService: ConversationService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.loadConversations();

  }


  // Charge les conversations de l'utilisateur
  loadConversations() {
    console.log('loading conversations with user id:', this.userId);
    this.conversationService.getUserConversations(this.userId).subscribe((data) => {
      this.conversations = data;
    });
  }

  // Sélectionne une conversation pour afficher les messages
  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
  }

  startNewConversation() {
    if (this.newParticipantId) {
      this.conversationService.createConversation(this.userId, this.newParticipantId).subscribe(
        (newConversation) => {
          this.conversations.push(newConversation);
          this.newParticipantId = '';
        },
        (error) => {
          console.error('Erreur lors de la création de la conversation :', error);
        }
      );
    }
  }

}
