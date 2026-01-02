import type { VisualizerBase } from "./VisualizerBase";

export class FrequencyBarsVisualizer implements VisualizerBase {
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private numBars = 32;

  init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  update(audio: Float32Array | Uint8Array, dt: number) {
    const { ctx, width, height } = this;
    // Clamp the number of bars to the number of available audio bins (min 1)
    const bars = Math.max(1, Math.min(this.numBars, audio.length));
    ctx.clearRect(0, 0, width, height);
    const binSize = Math.floor(audio.length / bars);
    const barWidth = width / bars;
    for (let i = 0; i < bars; i++) {
      let sum = 0;
      let count = 0;
      for (
        let j = i * binSize;
        j < (i + 1) * binSize && j < audio.length;
        j++
      ) {
        sum += audio[j];
        count++;
      }
      const avg = count > 0 ? sum / count : 0;
      const value = avg / 255;
      const barHeight = value * height;
      ctx.fillStyle = `hsl(${(i / bars) * 240}, 80%, 60%)`;
      ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  destroy() {}
}
