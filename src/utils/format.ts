import {
  IRelativeTimeOptions,
  TDateInput,
  TDateNumeric,
  TDateStyle,
  TPluralForms,
} from '@/types/IDate.interface';
import { DATE_NUMERIC_AUTO, DATE_STYLE_LONG, UNIT_STEPS } from './constants';

export function toDate(value: TDateInput): Date {
  return value instanceof Date ? value : new Date(value);
}

function localeKey(locale: string | string[] | undefined): string {
  if (!locale) {
    return 'default';
  }

  return Array.isArray(locale) ? locale.join('|') : locale;
}

const relativeFormatters = new Map<string, Intl.RelativeTimeFormat>();

function getRelativeFormatter(
  locale: string | string[] | undefined,
  style: TDateStyle,
  numeric: TDateNumeric,
): Intl.RelativeTimeFormat {
  const key = `${localeKey(locale)}|${style}|${numeric}`;
  let formatter = relativeFormatters.get(key);

  if (!formatter) {
    formatter = new Intl.RelativeTimeFormat(locale, { style, numeric });
    relativeFormatters.set(key, formatter);
  }

  return formatter;
}

export function formatRelativeTime(value: TDateInput, options: IRelativeTimeOptions = {}): string {
  const {
    locale,
    now = Date.now(),
    style = DATE_STYLE_LONG,
    numeric = DATE_NUMERIC_AUTO,
    nowThresholdSeconds = 45,
  } = options;

  const timestamp = toDate(value).getTime();
  if (Number.isNaN(timestamp)) {
    return '';
  }

  const seconds = Math.round((timestamp - now) / 1000);
  const formatter = getRelativeFormatter(locale, style, numeric);

  if (Math.abs(seconds) < nowThresholdSeconds) {
    return formatter.format(0, 'second');
  }

  for (const [unit, step] of UNIT_STEPS) {
    if (Math.abs(seconds) >= step) {
      return formatter.format(Math.round(seconds / step), unit);
    }
  }

  return formatter.format(seconds, 'second');
}

const pluralRules = new Map<string, Intl.PluralRules>();

export function pluralize(count: number, forms: TPluralForms, locale?: string | string[]): string {
  const key = localeKey(locale);
  let rules = pluralRules.get(key);

  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRules.set(key, rules);
  }

  return forms[rules.select(count)] ?? forms.other;
}

export function getInitials(name: string, max = 2): string {
  const cleaned = name.trim().replace(/^u\//i, '').replace(/^@/, '');

  const parts = cleaned.split(/[\s._-]+/).filter(Boolean);

  if (!parts.length) {
    return '?';
  }

  return parts
    .slice(0, Math.max(1, max))
    .map((part) => Array.from(part)[0] ?? '')
    .join('')
    .toUpperCase();
}
