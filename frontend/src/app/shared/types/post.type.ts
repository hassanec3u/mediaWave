import {Comment} from './comment.type';

export type Post = {
  id: string;
  title: string;
  content: string;
  postPicture?: string;
  postDate: Date;
  publisherName : string;
  image?: string;
  comments?: Comment[];
}
