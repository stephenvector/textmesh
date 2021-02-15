export interface Box {
  x: number;
  y: number;
  content: string;
  width: number;
  height: number;
}

export type Boxes = Record<string, Box>;
