import {User} from './user.type';

export type Conversation = {
  id: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  lastMessage: string | null;
}
