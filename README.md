# HRM-Studio (Hierarchical Reasoning Visualizer & Debugger)

An interactive, real-time playground and visual debugger designed to inspect, steer, and understand Hierarchical Reasoning Models (HRM). Instead of parsing thousands of lines of terminal logs, HRM-Studio represents complex goal-decomposition trees as interactive, color-coded node graphs across multiple timescales.

## Key Features

1. **Dynamic Hierarchical Graph**: Visualizes high-level strategic objectives down to short-term operational steps using an animated canvas.
2. **Human-In-The-Loop Steering**: Real-time tools to pause execution, prune failing branches, inject new sub-goals, and mutate status/priority properties mid-run.
3. **Multi-Timescale Reasoning Tiers**:
   - **Tier 1 (Strategic)**: Long-term milestones (e.g., architectural goals).
   - **Tier 2 (Tactical)**: Medium-term episodic decisions (e.g., component designs).
   - **Tier 3 (Operational)**: Immediate tool calls, execution prompts, and bash scripts.
4. **Prompt Template Sandbox**: Edit system instructions for any of the active tiers and hot-reload them into active reasoning loops.
5. **WebSocket Simulation Terminal**: A diagnostic drawer simulating live event feeds from your backend HRM instance.