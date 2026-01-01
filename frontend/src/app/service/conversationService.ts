import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conversation} from '../shared/types/conversation.type';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private readonly apiUrl = 'http://localhost:8080/conversation';

  constructor(private readonly http: HttpClient) {
  }

  getUserConversations(userId: string): Observable<any> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  createConversation(otherMemberId: any): Observable<any> {
    return this.http.post<Conversation>(`${this.apiUrl}`, {otherMemberId});
  }
}
