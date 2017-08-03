interface Path2DConstructor {
  new (): Path2D;
  new (d: string): Path2D;
  new (path: Path2D): Path2D;
  prototype: Path2D;
}
declare var Path2D: Path2DConstructor;
