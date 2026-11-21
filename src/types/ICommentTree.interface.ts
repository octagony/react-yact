import { YACT_THEME_DARK, YACT_THEME_LIGHT } from '@/utils/constants';
import { ReactNode } from 'react';
import { ICommentNode } from '@/types/IComments.interface';

export type TCommentThreeTheme = typeof YACT_THEME_LIGHT | typeof YACT_THEME_DARK;
export type TCommentThreeDensity = 'compact' | 'cozy' | 'roomy';

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
  fontFamily: string;
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

export interface ICommentTreeProps extends ICommentTreeOverrides {
  comments: readonly ICommentNode[];
  className?: string;
  collapsedIds?: readonly (string | number)[];
  defaultCollapsedIds?: readonly (string | number)[];
  onCollapsedChange?: (ids: (string | number)[]) => void;
}

export interface ICommentSlotContext {
  depth: number;
  isCollapsed: boolean;
  hasChildren: boolean;
  hiddenCount: number;
  config: ICommentTreeConfig;
  toggle: () => void;
}

export type TCommentSlot = (comment: ICommentNode, ctx: ICommentSlotContext) => ReactNode;

export interface ICommentTreeSlots {
  renderAvatar?: TCommentSlot;
  renderAuthor?: TCommentSlot;
  renderTimestamp?: TCommentSlot;
  renderScore?: TCommentSlot;
  renderMeta?: TCommentSlot;
  renderContent?: TCommentSlot;
  renderActions?: TCommentSlot;
  renderCollapsed?: TCommentSlot;
  renderEmpty?: () => ReactNode;
}
