import type { CSSProperties } from 'react';
import { useCommentTreeConfig } from '@/context/CommentTreeContext';
import { countDescendants, DEFAULT_THREAD_PALETTE, pickByDepth } from '@/utils';
import { ICommentItemProps } from '@/types/ICommentItem.interface';
import { ICommentSlotContext } from '@/types/ICommentTree.interface';

export function CommentItem({ comment, depth, collapsed, onToggle }: ICommentItemProps) {
  const config = useCommentTreeConfig();
  const children = comment.children ?? [];
  const isCollapsed = collapsed.has(comment.id);
  const hasChildren = children.length > 0;
  const canCollapse = config.collapsible && children.length > 0;
  const hiddenCount = countDescendants(comment);

  const ctx: ICommentSlotContext = {
    depth,
    isCollapsed,
    hasChildren,
    hiddenCount,
    config,
    toggle: () => onToggle(comment.id),
  };

  const hasHead =
    canCollapse ||
    Boolean(
      config.renderAvatar ||
      config.renderAuthor ||
      config.renderTimestamp ||
      config.renderScore ||
      config.renderMeta,
    );

  const threadColor = config.rainbowThreads
    ? pickByDepth(depth, DEFAULT_THREAD_PALETTE)
    : 'var(--yact-line, currentColor)';

  const itemStyle = {
    '--yact-depth': String(depth),
    '--yact-indent': `${config.indent}px`,
    '--yact-thread': threadColor,
  } as CSSProperties;

  return (
    <li className="yact-item" style={itemStyle}>
      {config.showThreadLines && (
        <button
          type="button"
          className="yact-rail"
          disabled={!canCollapse}
          aria-label={isCollapsed ? config.labels.expand : config.labels.collapse}
          onClick={ctx.toggle}
        />
      )}

      <div className="yact-main">
        {isCollapsed ? (
          (config.renderCollapsed?.(comment, ctx) ?? (
            <div className="yact-collapsed">
              {canCollapse && (
                <button
                  type="button"
                  className="yact-toggle"
                  onClick={ctx.toggle}
                  aria-label={config.labels.expand}
                >
                  +
                </button>
              )}
              {config.renderAuthor?.(comment, ctx)}
              <span className="yact-hidden">{config.labels.hiddenReplies(hiddenCount)}</span>
            </div>
          ))
        ) : (
          <>
            {hasHead && (
              <div className="yact-head">
                {canCollapse && (
                  <button
                    type="button"
                    className="yact-toggle"
                    onClick={ctx.toggle}
                    aria-label={config.labels.collapse}
                  >
                    −
                  </button>
                )}
                {config.renderAvatar?.(comment, ctx)}
                {config.renderAuthor?.(comment, ctx)}
                {config.renderTimestamp?.(comment, ctx)}
                {config.renderScore?.(comment, ctx)}
                {config.renderMeta?.(comment, ctx)}
              </div>
            )}

            <div className="yact-content">
              {config.renderContent?.(comment, ctx) ?? comment.content}
            </div>

            {config.renderActions && (
              <div className="yact-actions">{config.renderActions(comment, ctx)}</div>
            )}

            {hasChildren && (
              <ul className="yact-children">
                {children.map((child) => (
                  <CommentItem
                    key={child.id}
                    comment={child}
                    depth={depth + 1}
                    collapsed={collapsed}
                    onToggle={onToggle}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </li>
  );
}
