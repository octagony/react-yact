import {
  COMMENT_POSITION_END,
  COMMENT_POSITION_START,
  YACT_THEME_DARK,
  YACT_THEME_LIGHT,
} from '@/utils/constants';
import { ReactNode } from 'react';

export type TCommentThreeTheme = typeof YACT_THEME_LIGHT | typeof YACT_THEME_DARK;
export type TCommentThreeDensity = 'compact' | 'cozy' | 'roomy';

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

export interface ICommentTreeSlots {
  renderAvatar?: (comment: ICommentNode) => ReactNode;
  renderMeta?: (comment: ICommentNode) => ReactNode;
  renderContent?: (comment: ICommentNode) => ReactNode;
  renderActions?: (comment: ICommentNode) => ReactNode;
  renderCollapsed?: (comment: ICommentNode, hiddenCount: number) => ReactNode;
  renderEmpty?: () => ReactNode;
}

export interface ICommentTreeConfig extends ICommentTreeSlots {
  theme: TCommentThreeTheme;
  density: TCommentThreeDensity;
  accent: string;
  indent: number;
  maxDepth: number;
  fontSize: number;
  showThreadLines: boolean;
  rainbowThreads: boolean;
  collapsible: boolean;
  autoCollapseDepth: number;
  formatTime: (date: Date) => string;
  labels: {
    op: string;
    edited: string;
    collapse: string;
    expand: string;
    depthLimit: string;
    hiddenReplies: (count: number) => string;
  };
}

export type ICommentTreeOverrides = Partial<ICommentTreeConfig>;

export interface ICommentTreeProviderProps extends ICommentTreeOverrides {
  children: ReactNode;
}
