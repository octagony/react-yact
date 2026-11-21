import { ICommentTreeConfig } from "@/types/IComments.interface";
import { formatRelativeTime } from "@/utils/format";

export const COMMENT_POSITION_START = 'start';
export const COMMENT_POSITION_END = 'end';

export const DATE_STYLE_LONG = 'long';
export const DATE_STYLE_SHORT = 'short';
export const DATE_STYLE_NARROW = 'narrow';

export const DATE_NUMERIC_ALWAYS = 'always';
export const DATE_NUMERIC_AUTO = 'auto';

export const YACT_THEME_LIGHT = 'light';
export const YACT_THEME_DARK = 'dark';

export const YACT_DENSITY_COMPACT = 'compact';
export const YACT_DENSITY_COZY = 'cozy';
export const YACT_DENSITY_ROOMY = 'roomy';

export const UNIT_STEPS: ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

export const DEFAULT_THREAD_PALETTE: readonly string[] = [
  '#4d7cff',
  '#ff5c9d',
  '#ffb020',
  '#3ddc97',
  '#22d3ee',
  '#a78bfa',
];

export const DEFAULT_CONFIG: ICommentTreeConfig = {
  theme: 'dark',
  density: 'cozy',
  accent: '#4d7cff',
  indent: 22,
  maxDepth: 8,
  fontSize: 14,
  showThreadLines: true,
  rainbowThreads: false,
  collapsible: true,
  autoCollapseDepth: 0,
  formatTime: formatRelativeTime,
  labels: {
    op: 'OP',
    edited: 'edited',
    collapse: 'Collapse thread',
    expand: 'Expand thread',
    depthLimit: 'depth limit',
    hiddenReplies: (count: number | string) => `${count} hidden ${count === 1 ? 'reply' : 'replies'}`,
  },
};