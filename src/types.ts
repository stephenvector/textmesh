export interface Box {
  x: number;
  y: number;
  content: string;
  width: number;
  height: number;
}

export type Boxes = Record<string, Box>;

export enum InteractionMode {
  Select = "select",
  Draw = "draw",
  Move = "move",
}
