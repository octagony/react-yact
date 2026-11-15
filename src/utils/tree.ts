import { IFlatNode, IFlattenOptions, ITreeNodeLike, IWalkMeta } from '@/types/IComments.interface';

export function walkTree<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  visitor: (node: T, meta: IWalkMeta) => boolean | void,
): void {
  const visit = (list: readonly T[], depth: number, parentId: string | number | null): void => {
    list.forEach((node, index) => {
      const meta: IWalkMeta = {
        depth,
        parentId,
        index,
        isLast: index === list.length - 1,
      };

      const skipChildren = visitor(node, meta) === false;
      const children = node.children;

      if (!skipChildren && children?.length) {
        visit(children, depth + 1, node.id);
      }
    });
  };

  visit(nodes, 0, null);
}

export function countNodes<T extends ITreeNodeLike<T>>(nodes: readonly T[]): number {
  let total = 0;

  walkTree(nodes, () => {
    total += 1;
  });

  return total;
}

export function countDescendants<T extends ITreeNodeLike<T>>(node: T): number {
  return countNodes(node.children ?? []);
}

export function getTreeDepth<T extends ITreeNodeLike<T>>(nodes: readonly T[]): number {
  let max = 0;

  walkTree(nodes, (_, meta) => {
    if (meta.depth + 1 > max) {
      max = meta.depth + 1;
    }
  });

  return max;
}

export function findPath<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  id: string | number,
): T[] {
  for (const node of nodes) {
    if (node.id === id) {
      return [node];
    }

    const children = node.children;

    if (children?.length) {
      const nested = findPath(children, id);

      if (nested.length) {
        return [node, ...nested];
      }
    }
  }
  return [];
}

export function findNode<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  id: string | number,
): T | null {
  const path = findPath(nodes, id);
  return path.length ? path[path.length - 1] : null;
}

export function getParentId<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  id: string | number,
): string | number | null {
  const path = findPath(nodes, id);
  return path.length > 1 ? path[path.length - 2].id : null;
}

export function flattenTree<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  options: IFlattenOptions<T> = {},
): IFlatNode<T>[] {
  const { isCollapsed, maxDepth } = options;
  const flat: IFlatNode<T>[] = [];

  walkTree(nodes, (node, meta) => {
    const children = node.children ?? [];
    flat.push({
      ...meta,
      node,
      hasChildren: children.length > 0,
      descendantCount: countDescendants(node),
    });

    if (isCollapsed?.(node, meta)) {
      return false;
    }

    if (maxDepth !== undefined && meta.depth + 1 >= maxDepth) {
      return false;
    }

    return undefined;
  });

  return flat;
}

export function collectIds<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  predicate?: (node: T, meta: IWalkMeta) => boolean,
): Array<string | number> {
  const ids: Array<string | number> = [];

  walkTree(nodes, (node, meta) => {
    if (!predicate || predicate(node, meta)) {
      ids.push(node.id);
    }
  });

  return ids;
}

export function collectCollapsibleIds<T extends ITreeNodeLike<T>>(
  nodes: readonly T[],
  minDepth = 0,
): Array<string | number> {
  return collectIds(
    nodes,
    (node, meta) => meta.depth >= minDepth && Boolean(node.children?.length),
  );
}

export function toggleId(
  ids: readonly [string | number],
  id: string | number,
): Array<string | number> {
  return ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
}
