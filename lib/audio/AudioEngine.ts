export class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Float32Array | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private bufferSize = 2048;

  async init(): Promise<void> {
    if (this.ctx) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = this.bufferSize;
    this.dataArray = new Float32Array(this.analyser.fftSize);
    this.source = this.ctx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
  }

  getSamples(): Float32Array {
    if (!this.analyser || !this.dataArray) return new Float32Array(0);
    this.analyser.getFloatTimeDomainData(this.dataArray);
    return this.dataArray;
  }

  getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(0);
    const arr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(arr);
    return arr;
  }

  destroy() {
    this.ctx?.close();
    this.ctx = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
  }
}
