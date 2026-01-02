"use client";
import { useEffect, useRef } from "react";
import { AudioEngine } from "../lib/audio/AudioEngine";
import type { VisualizerBase } from "../lib/visualizers/VisualizerBase";
import type { VisualizerId } from "../types/audio";

import { WaveformVisualizer } from "../lib/visualizers/WaveformVisualizer";
import { FrequencyBarsVisualizer } from "../lib/visualizers/FrequencyBarsVisualizer";

const visualizerMap: Record<VisualizerId, () => VisualizerBase> = {
  waveform: () => new WaveformVisualizer(),
  frequencyBars: () => new FrequencyBarsVisualizer(),
};

type Props = {
  visualizer: VisualizerId;
};

export default function VisualizerCanvas({ visualizer }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AudioEngine>(null);
  const visRef = useRef<VisualizerBase>(null);
  const rafRef = useRef<number>(null);

  useEffect(() => {
    let running = true;
    let last = performance.now();

    const setup = async () => {
      engineRef.current = new AudioEngine();
      await engineRef.current.init();
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      visRef.current = visualizerMap[visualizer]();
      visRef.current.init(canvas, ctx);

      const loop = (now: number) => {
        if (!running) return;
        const dt = (now - last) / 1000;
        last = now;

        let samples;
        if (visualizer === "frequencyBars") {
          samples = engineRef.current!.getFrequencyData(); // Uint8Array
        } else {
          samples = engineRef.current!.getSamples(); // Float32Array
        }
        visRef.current!.update(samples, dt);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    };

    setup();

    const handleResize = () => {
      const canvas = canvasRef.current!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      visRef.current?.resize(canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      running = false;
      rafRef.current && cancelAnimationFrame(rafRef.current);
      visRef.current?.destroy();
      engineRef.current?.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [visualizer]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "90vh",
        display: "block",
      }}
      tabIndex={-1}
    />
  );
}
