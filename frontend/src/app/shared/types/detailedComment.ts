export type detailedComment = {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  post: string;
  content: string;
}
