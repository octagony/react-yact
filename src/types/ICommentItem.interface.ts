import { ICommentNode } from '@/types/IComments.interface';

export interface ICommentItemProps {
  comment: ICommentNode;
  depth: number;
  collapsed: ReadonlySet<string | number>;
  onToggle: (id: string | number) => void;
}
