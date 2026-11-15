export type TCssVarValue = string | number | null | undefined;

export type TCssVarMap = Record<string, TCssVarValue>;

export interface IHueGradientOptions {
  angle?: number;
  spread?: number;
  saturation?: number;
  lightness?: number;
}
