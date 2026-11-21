export { CommentTree } from '@/components/CommentTree';

export { CommentTreeProvider, useCommentTreeConfig } from '@/context/CommentTreeContext';

export { DEFAULT_CONFIG } from '@/utils/constants';

export type { ICommentTreeProviderProps } from '@/types/ICommentTree.interface';

export type { ICommentAuthor, ICommentNode } from '@/types/IComments.interface';

export type {
  TCommentTreeTheme,
  TCommentTreeDensity,
  TCommentSlot,
  ICommentSlotContext,
  ICommentTreeSlots,
  ICommentTreeConfig,
  ICommentTreeOverrides,
  ICommentTreeProps,
} from '@/types/ICommentTree.interface';

export * from '@/utils';
