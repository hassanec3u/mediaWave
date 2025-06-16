export type Message = {
  _id?: string;
  content: string;
  senderId: {
    _id: string;
    username: string;
  };
  receiverId: {
    _id: string;
    username: string;
  };
  read?: boolean;
};
