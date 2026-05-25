import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Activity,
  Layers,
  Wifi,
  Settings2
} from 'lucide-react';

export default function Header({
  isPlaying,
  onTogglePlay,
  onReset,
  connectionStatus,
  simulationSpeed,
  onSpeedChange,
  totalNodesCount,
  activeNodesCount
}) {
  return (
    <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0 z-10">
      {/* Left section: App Branding */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-lg bg-indigo-600/20 border border-indigo-500 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
          <Cpu className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              HRM-Studio
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900">
              v1.2.4-Beta
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Hierarchical Reasoning Visualizer & Dynamic Debugger
          </p>
        </div>
      </div>

      {/* Middle section: Real-time Controls */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-4 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-1 border-r border-slate-800 pr-2">
          <button
            onClick={onTogglePlay}
            className={`px-4 py-1.5 rounded-lg flex items-center space-x-2 text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>PAUSE AGENT</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>RESUME AGENT</span>
              </>
            )}
          </button>
          
          <button
            onClick={onReset}
            title="Reset Simulation Node Tree"
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Simulation Speed Slider */}
        <div className="flex items-center space-x-2 text-xs font-mono px-1">
          <span className="text-slate-500">TICK RATE:</span>
          <input
            type="range"
            min="1"
            max="5"
            value={simulationSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <span className="text-indigo-400 font-semibold w-8">{simulationSpeed}x</span>
        </div>

        {/* Metrics Pill counters */}
        <div className="hidden md:flex items-center space-x-3 text-xs border-l border-slate-800 pl-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-slate-400">Nodes: {totalNodesCount}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-400">Active: {activeNodesCount}</span>
          </div>
        </div>
      </div>

      {/* Right section: System Health Status */}
      <div className="flex items-center space-x-3">
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-mono text-xs ${
          connectionStatus === 'Connected'
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
            : 'bg-rose-950/40 text-rose-400 border-rose-900/50'
        }`}>
          <Wifi className="h-3.5 w-3.5" />
          <span className="hidden sm:inline font-bold uppercase tracking-wider">HRM-WEBSOCKET:</span>
          <span className="font-semibold">{connectionStatus}</span>
        </div>
      </div>
    </header>
  );
}