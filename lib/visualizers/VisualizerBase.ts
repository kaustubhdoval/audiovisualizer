export interface VisualizerBase {
  init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
  update(audio: Float32Array | Uint8Array, dt: number): void;
  resize(width: number, height: number): void;
  destroy(): void;
}
