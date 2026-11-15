import { IRemoveResult, ITreeNodeLike, TCommentPosition } from '@/types/IComments.interface';
import { COMMENT_POSITION_START, COMMENT_POSITION_END } from '@/utils/constants';
import { findPath } from '@/utils/tree';

export function updateNode<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  id: string | number,
  updater: (node: T) => T,
): T[] {
  const walk = (list: readonly T[]): readonly T[] => {
    let changed = false;

    const next = list.map((node): T => {
      if (node.id === id) {
        changed = true;
        return updater(node);
      }

      const children = node.children;
      if (!children?.length) {
        return node;
      }

      const nextChildren = walk(children);
      if (nextChildren === children) {
        return node;
      }

      changed = true;

      return { ...node, children: nextChildren } as T;
    });

    return changed ? next : list;
  };
  return [...walk(nodes)];
}

export function insertChild<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  parentId: string | number,
  child: T,
  position: TCommentPosition = COMMENT_POSITION_END,
): T[] {
  return updateNode(nodes, parentId, (parent) => {
    const existing = parent.children ?? [];
    const children =
      position === COMMENT_POSITION_START ? [child, ...existing] : [...existing, child];

    return { ...parent, children } as T;
  });
}

export function removeNode<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  id: string | number,
): IRemoveResult<T> {
  const path = findPath(nodes, id);

  if (!path.length) {
    return { nodes: [...nodes], removed: null, parentId: null };
  }

  const removed = path[path.length - 1];
  const parentId = path.length > 1 ? path[path.length - 2].id : null;

  if (parentId === null) {
    return { nodes: nodes.filter((node) => node.id !== id), removed, parentId };
  }

  const next = updateNode(
    nodes,
    parentId,
    (parent) =>
      ({
        ...parent,
        children: (parent.children ?? []).filter((child) => child.id !== id),
      }) as T,
  );

  return { nodes: next, removed, parentId };
}

export function restoreNode<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  node: T,
  parentId: string | number | null,
  position: TCommentPosition = COMMENT_POSITION_START,
): T[] {
  if (parentId === null) {
    return position === COMMENT_POSITION_START ? [node, ...nodes] : [...nodes, node];
  }

  return insertChild(nodes, parentId, node, position);
}
