import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConversationService} from '../../service/conversationService';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../shared/types/user.type';
import {UserService} from '../../service/userService';
import {Conversation} from '../../shared/types/conversation.type';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationListComponent implements OnInit {
  conversations!: Conversation[];
  userId!: string;
  newParticipantName!: string;

  // Recherche
  selectedFriendId: string | null = null;

  // Données amis
  friends: User[] = [];
  filteredFriends: User[] = [];
  showSuggestions = false;
  showNoMatch = false;

  @Output() conversationSelected = new EventEmitter<Conversation>();

  constructor(private readonly conversationService: ConversationService,
              private cookieService: CookieService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.loadConversations();

    this.userService.getFriends().subscribe((friends) => {
      this.friends = friends;
    });
  }

  onInputChange(): void {
    const term = (this.newParticipantName || '').trim().toLowerCase();
    this.showNoMatch = false;
    this.selectedFriendId = null;

    if (!term) {
      this.filteredFriends = [];
      this.showSuggestions = false;
      return;
    }

    this.filteredFriends = this.friends
      .filter(f => f.username?.toLowerCase().includes(term))
      .slice(0, 10);

    this.showSuggestions = true;
    this.showNoMatch = this.filteredFriends.length === 0;
  }

  onEnter(event: Event): void {
    if (this.filteredFriends.length > 0) {
      event.preventDefault();
      this.selectFriend(this.filteredFriends[0]);
    }
  }

  selectFriend(friend: User): void {
    this.newParticipantName = friend.username || '';
    this.selectedFriendId = friend.id;
    this.showSuggestions = false;
    this.showNoMatch = false;
  }

  onInputBlur(): void {
    setTimeout(() => this.showSuggestions = false, 100);
  }


  loadConversations() {
    this.conversationService.getUserConversations(this.userId).subscribe((data) => {
      //log each conversation
      this.conversations = data;
    });
  }

  getOtherParticipant(participants: User[]): User {
    return <User>participants.find((participant) => participant.id !== this.userId);
  }

  selectConversation(conversation: Conversation) {
    this.conversationSelected.emit(conversation);
  }

  startNewConversation() {
    if (this.newParticipantName) {
      this.conversationService.createConversation(this.selectedFriendId).subscribe(
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
