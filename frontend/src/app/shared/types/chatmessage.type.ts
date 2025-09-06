export type ChatMessage = {
  _id?: string;
  content: string;
  receiverId: string;
  conversationId : string;
  createdAt ?: string;
  read?: boolean;
};
