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
      this.searchResults = users.filter(user =>
        user._id !== this.myId && !this.friends.some(friend => friend._id === user._id)
      );
    });
  }
  sendFriendRequest(userId: string): void {
    this.userService.sendFriendRequest(this.myId,userId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
      alert("Demande d'ami envoyée");
      this.searchResults = [];

    });
  }

  acceptFriend(userId: string): void {
    this.userService.acceptFriend(this.myId, userId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  refuseFriend(userId: string): void {
    this.userService.refuseFriend(this.myId, userId).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  removeFriend(friendIdToRemove: string ): void {
    this.userService.removeFriend(this.myId,friendIdToRemove).subscribe(() => {
      this.loadFriends();
      this.loadPendingRequests();
    });
  }

  private loadFriends(): void {
    this.userService.getFriends(this.myId).subscribe(friends => {
      this.friends = friends;
    });
  }

  private loadPendingRequests(): void { // Nouvelle méthode
    this.userService.getPendingRequests(this.myId).subscribe(requests => {
      this.pendingRequests = requests;
    });
  }

}
