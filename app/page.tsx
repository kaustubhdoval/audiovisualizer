"use client";
import { useState } from "react";
import VisualizerCanvas from "./VisualizerCanvas";
import ControlBar from "../components/ControlBar";
import type { VisualizerId } from "../types/audio";

export default function Page() {
  const [visualizer, setVisualizer] = useState<VisualizerId>("waveform");
  return (
    <>
      <VisualizerCanvas visualizer={visualizer} />
      <ControlBar visualizer={visualizer} setVisualizer={setVisualizer} />
    </>
  );
}
