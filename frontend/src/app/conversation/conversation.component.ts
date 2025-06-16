import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConversationService} from '../service/conversationService';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationListComponent implements OnInit {
  conversations!: any[];
  userId!: string;
  newParticipantName!: string;
  @Output() conversationSelected = new EventEmitter<any>();

  constructor(private conversationService: ConversationService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.loadConversations();

  }


  // Charge les conversations de l'utilisateur
  loadConversations() {
    this.conversationService.getUserConversations(this.userId).subscribe((data) => {
      this.conversations = data;
    });
  }

  getOtherParticipant(participants: any[]): any {
    console.log('participants', participants);
    const res = participants.find((participant) => participant._id !== this.userId);
    return res;
  }

  // Sélectionne une conversation pour afficher les messages
  selectConversation(conversation: any) {
    this.conversationSelected.emit(conversation);
  }

  startNewConversation() {
    if (this.newParticipantName) {
      this.conversationService.createConversation(this.userId, this.newParticipantName).subscribe(
        (newConversation) => {
          this.conversations.push(newConversation);
          this.newParticipantName = '';
        },
        (error) => {
          console.error('Erreur lors de la création de la conversation :', error);
        }
      );
    }
  }

}
