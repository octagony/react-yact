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