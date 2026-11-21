import { useCallback, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { ICommentTreeProps } from '@/types/ICommentTree.interface';
import { CommentTreeProvider, useCommentTreeConfig } from '@/context/CommentTreeContext';
import { CommentItem } from '@/components/CommentItem';
import { collectCollapsibleIds } from '@/utils';

function CommentTreeRoot({
  comments,
  className,
  collapsedIds,
  defaultCollapsedIds,
  onCollapsedChange,
}: ICommentTreeProps) {
  const config = useCommentTreeConfig();

  const [internalCollapsed, setInternalCollapsed] = useState<readonly (string | number)[]>(() => {
    if (defaultCollapsedIds) {
      return defaultCollapsedIds;
    }

    if (config.autoCollapseDepth > 0) {
      return collectCollapsibleIds(comments, config.autoCollapseDepth);
    }

    return [];
  });

  const collapsed = collapsedIds ?? internalCollapsed;
  const collapsedSet = useMemo(() => new Set(collapsed), [collapsed]);

  const handleToggle = useCallback(
    (id: string | number) => {
      const next: (string | number)[] = collapsedSet.has(id)
        ? collapsed.filter((value) => value !== id)
        : [...collapsed, id];

      if (!collapsedIds) {
        setInternalCollapsed(next);
        onCollapsedChange?.(next);
      }
    },
    [collapsed, collapsedIds, collapsedSet, onCollapsedChange],
  );

  const rootStyle = {
    '--yact-accent': config.accent,
    '--yact-font-family': config.fontFamily,
    '--yact-font-size': `${config.fontSize}px`,
  } as CSSProperties;

  return (
    <div
      className={className ? `yact ${className}` : 'yact'}
      data-yact-theme={config.theme}
      data-yact-density={config.density}
      style={rootStyle}
    >
      {comments.length === 0 ? (
        (config.renderEmpty?.() ?? <div className="yact-empty">No comments yet.</div>)
      ) : (
        <ul className="yact-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              collapsed={collapsedSet}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export function CommentTree({
  comments,
  className,
  collapsedIds,
  defaultCollapsedIds,
  onCollapsedChange,
  ...configOverrides
}: ICommentTreeProps) {
  return (
    <CommentTreeProvider {...configOverrides}>
      <CommentTreeRoot
        comments={comments}
        className={className}
        collapsedIds={collapsedIds}
        defaultCollapsedIds={defaultCollapsedIds}
        onCollapsedChange={onCollapsedChange}
      />
    </CommentTreeProvider>
  );
}
