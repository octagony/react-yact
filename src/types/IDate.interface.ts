import {
  DATE_NUMERIC_ALWAYS,
  DATE_NUMERIC_AUTO,
  DATE_STYLE_LONG,
  DATE_STYLE_NARROW,
  DATE_STYLE_SHORT,
} from '@/utils/constants';

export type TDateInput = Date | string | number;
export type TDateStyle =
  typeof DATE_STYLE_LONG | typeof DATE_STYLE_SHORT | typeof DATE_STYLE_NARROW;
export type TDateNumeric = typeof DATE_NUMERIC_ALWAYS | typeof DATE_NUMERIC_AUTO;

export interface IRelativeTimeOptions {
  locale?: string;
  now?: number;
  style?: TDateStyle;
  numeric?: TDateNumeric;
  nowThresholdSeconds?: number;
}

export type TPluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
