import { CommentTreeProvider, useCommentTreeConfig } from '@/context/CommentTreeContext';
import { ICommentTreeProps } from '@/types/IComments.interface';
import { DENSITY_PRESETS } from '@/utils/constants';
import { useMemo } from 'react';

function CommentTreeRoot({ comments, className }: ICommentTreeProps) {
  const config = useCommentTreeConfig();
  const preset = DENSITY_PRESETS[config.density];

  const rootStyle = useMemo<Record<string, string>>(
    () => ({
      '--yact-accent': config.accent,
      '--yact-gap': `${preset.gap}px`,
      '--yact-pad': `${preset.pad}px`,
      '--yact-avatar': `${preset.avatar}px`,
      '--yact-font-size': `${config.fontSize * preset.scale}px`,
      '--yact-font':
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }),
    [config.accent, config.fontSize, preset],
  );

  return (
    <div
      className={className ? `yact ${className}` : 'yact'}
      data-yact-theme={config.theme}
      style={rootStyle}
    >
      {comments.length === 0 ? (
        <div className="yact-empty">No comments yet.</div>
      ) : (
        <ul className="yact-list"></ul>
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
