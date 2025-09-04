import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userService';
import { User } from '../shared/types/user.type';

@Component({
  selector: 'app-friend',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit {
  myId: string = '';
  searchResults: User[] = [];
  friends: User[] = [];
  pendingRequests: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.myId = this.userService.getUserId();
    this.loadFriends();
    this.loadPendingRequests();
  }

  search(query: string): void {
    this.userService.searchUsers(query).subscribe(users => {
      this.searchResults = users
      console.log(users);
    });
  }
  sendFriendRequest(friendId: string): void {
    this.userService.sendFriendRequest(friendId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
      alert("Demande d'ami envoyée");
      this.searchResults = [];

    });
  }

  acceptFriend(friendId: string): void {
    this.userService.acceptFriend( friendId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  refuseFriend(friendId: string): void {
    this.userService.refuseFriend(friendId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  removeFriend(friendId: string ): void {
    this.userService.removeFriend(friendId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  private loadFriends(): void {
    this.userService.getFriends(this.myId).subscribe(friends => {
      this.friends = friends;
    });
  }

  private loadPendingRequests(): void { 
    this.userService.getPendingRequests(this.myId).subscribe(requests => {
      this.pendingRequests = requests;
    });
  }

}
