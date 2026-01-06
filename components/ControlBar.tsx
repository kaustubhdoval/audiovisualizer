"use client";
import type { VisualizerId } from "../types/audio";

type Props = {
  visualizer: VisualizerId;
  setVisualizer: (id: VisualizerId) => void;
};

export default function ControlBar({ visualizer, setVisualizer }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(20,20,30,0.95)",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
        height: "80px",
      }}
    >
      <select
        value={visualizer}
        onChange={(e) => setVisualizer(e.target.value as VisualizerId)}
        style={{
          fontSize: 18,
          padding: "0.5rem 1rem",
          borderRadius: 6,
          backgroundColor: "rgba(20,20,30,0.95)",
        }}
      >
        <option value="waveform">Waveform</option>
        <option value="frequencyBars">Bars</option>
      </select>
    </div>
  );
}
