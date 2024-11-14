import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'http://localhost:3000/conversation';

  constructor(private http: HttpClient) {}

  getUserConversations(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  createConversation(userId1: string, userId2: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userId1, userId2 });
  }
}
