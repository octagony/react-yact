import { ICommentTreeConfig, ICommentTreeProviderProps } from '@/types/IComments.interface';
import { DEFAULT_CONFIG } from '@/utils/constants';
import { createContext, useContext, useMemo } from 'react';

const CommentTreeContext = createContext<ICommentTreeConfig>(DEFAULT_CONFIG);

export function CommentTreeProvider({ children, ...overrides }: ICommentTreeProviderProps) {
  const config = useMemo<ICommentTreeConfig>(() => {
    const merged = { ...DEFAULT_CONFIG, ...overrides };

    if (overrides.labels) {
      merged.labels = { ...DEFAULT_CONFIG.labels, ...overrides.labels };
    }

    return merged;
  }, [overrides]);

  return <CommentTreeContext.Provider value={config}>{children}</CommentTreeContext.Provider>;
}

export function useCommentTreeConfig(): ICommentTreeConfig {
  return useContext(CommentTreeContext);
}
