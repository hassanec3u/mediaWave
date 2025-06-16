import { Component } from '@angular/core';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css'
})
export class MessagerieComponent {
  selectedConversation: any = null;

  onConversationSelected(conversation: any) {
    this.selectedConversation = conversation;
  }
}
