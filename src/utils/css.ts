import { IHueGradientOptions, TCssVarMap } from '@/types/ICSS.interface';

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

export function toCssVars(map: TCssVarMap, prefix = 'yact'): Record<string, string> {
  const style: Record<string, string> = {};
  for (const [key, value] of Object.entries(map)) {
    if (value === null || value === undefined || value === '') {
      continue;
    }

    const name = key.startsWith('--') ? key : `--${prefix}-${toKebab(key)}`;

    style[name] = String(value);
  }
  return style;
}

export function stringToHue(seed: string | number): number {
  const text = String(seed);

  let hash = 0;

  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  return hash % 360;
}

export function hueGradient(seed: string | number, options: IHueGradientOptions = {}): string {
  const { angle = 140, spread = 44, saturation = 78, lightness = 62 } = options;

  const hue = stringToHue(seed);

  const second = (hue + spread) % 360;

  return `linear-gradient(${angle}deg, hsl(${hue} ${saturation}% ${lightness + 7}%), hsl(${second} ${saturation}% ${lightness - 7}%))`;
}

export function pickByDepth<T>(depth: number, palette: readonly T[]): T {
  //TODO: Maybe set default value
  if (!palette.length) {
    throw new RangeError('[react-yact] pickByDepth: palette must not be empty');
  }

  const index = ((Math.trunc(depth) % palette.length) + palette.length) % palette.length;
  return palette[index];
}
