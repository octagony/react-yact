export interface ICommentAuthor {
  id: string | number;
  name: string;
  avatarUrl?: string;
}

export interface ICommentNode {
  id: string | number;
  author: ICommentAuthor;
  content: string;
  createdAt: string | number | Date;
  children?: ICommentNode[];
}