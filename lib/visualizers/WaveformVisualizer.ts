import type { VisualizerBase } from "./VisualizerBase";

export class WaveformVisualizer implements VisualizerBase {
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;

  init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  update(audio: Float32Array, dt: number) {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let i = 0; i < audio.length; i++) {
      const x = (i / (audio.length - 1)) * width;
      const y = (1 - (audio[i] + 1) / 2) * height;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#00e0ff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  destroy() {}
}
