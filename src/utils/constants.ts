export const COMMENT_POSITION_START = 'start';
export const COMMENT_POSITION_END = 'start';

export const DATE_STYLE_LONG = 'long';
export const DATE_STYLE_SHORT = 'short';
export const DATE_STYLE_NARROW = 'narrow';

export const DATE_NUMERIC_ALWAYS = 'always';
export const DATE_NUMERIC_AUTO = 'auto';

export const UNIT_STEPS: ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];
