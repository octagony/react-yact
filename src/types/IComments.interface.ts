import { COMMENT_POSITION_END, COMMENT_POSITION_START } from '@/utils/constants';

export interface ITreeNodeLike<TChild = unknown> {
  id: string | number;
  children?: readonly TChild[];
}

export interface IWalkMeta {
  depth: number;
  parentId: string | number | null;
  index: number;
  isLast: boolean;
}

export interface IFlatNode<T> extends IWalkMeta {
  node: T;
  hasChildren: boolean;
  descendantCount: number;
}

export interface IFlattenOptions<T> {
  isCollapsed?: (node: T, meta: IWalkMeta) => boolean;
  maxDepth?: number;
}

export type TCommentPosition = typeof COMMENT_POSITION_START | typeof COMMENT_POSITION_END;

export interface IRemoveResult<T> {
  nodes: T[];
  removed: T | null;
  parentId: string | number | null;
}

export interface ICommentAuthor {
  id: string | number;
  name: string;
  avatarUrl?: string;
  flair?: string;
  isOp?: boolean;
}

export interface ICommentNode {
  id: string | number;
  author: ICommentAuthor;
  content: string;
  createdAt: string | number | Date;
  editedAt?: string | number | Date | null;
  score?: number;
  children?: ICommentNode[];
}
