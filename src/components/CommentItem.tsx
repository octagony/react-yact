import type { CSSProperties } from 'react';
import { useCommentTreeConfig } from '@/context/CommentTreeContext';
import { ICommentItemProps } from '@/types/IComments.interface';
import { countDescendants, DEFAULT_THREAD_PALETTE, pickByDepth } from '@/utils';

export function CommentItem({ comment, depth, collapsed, onToggle }: ICommentItemProps) {
  const config = useCommentTreeConfig();
  const children = comment.children ?? [];
  const canCollapse = config.collapsible && children.length > 0;
  const hiddenCount = countDescendants(comment);

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
          aria-label={collapsed.has(comment.id) ? config.labels.expand : config.labels.collapse}
          onClick={() => canCollapse && onToggle(comment.id)}
        />
      )}

      <div className="yact-main">
        {collapsed.has(comment.id) ? (
          (config.renderCollapsed?.(comment, hiddenCount) ?? (
            <div className="yact-collapsed">
              {canCollapse && (
                <button
                  type="button"
                  className="yact-toggle"
                  onClick={() => onToggle(comment.id)}
                  aria-label={config.labels.expand}
                >
                  +
                </button>
              )}
              <span className="yact-author">{comment.author.name}</span>
              <span className="yact-hidden">{config.labels.hiddenReplies(hiddenCount)}</span>
            </div>
          ))
        ) : (
          <>
            <div className="yact-head">
              {canCollapse && (
                <button
                  type="button"
                  className="yact-toggle"
                  onClick={() => onToggle(comment.id)}
                  aria-label={config.labels.collapse}
                >
                  −
                </button>
              )}

              {config.renderAvatar?.(comment)}

              <span className="yact-author">{comment.author.name}</span>

              {config.renderMeta?.(comment)}
            </div>

            <div className="yact-content">{config.renderContent?.(comment) ?? comment.content}</div>

            {config.renderActions && (
              <div className="yact-actions">{config.renderActions(comment)}</div>
            )}

            {children.length > 0 && (
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
