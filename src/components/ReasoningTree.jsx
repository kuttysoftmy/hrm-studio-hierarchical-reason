import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  PauseCircle,
  Play,
  Maximize2,
  Minimize2,
  Eye,
  Lock
} from 'lucide-react';

export default function ReasoningTree({
  nodes,
  selectedNodeId,
  onSelectNode,
  onPruneNode,
  onAddSubgoal
}) {
  const [scale, setScale] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Canvas Panning Handlers
  const handleMouseDown = (e) => {
    if (e.target.closest('.node-card')) return; // ignore dragging if clicked on node
    setIsDraggingCanvas(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCanvas) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.6));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.6));
  const resetZoom = () => { setScale(1.0); setPan({ x: 0, y: 0 }); };

  // Group nodes by tier to arrange coordinates hierarchically
  const strategicNodes = nodes.filter(n => n.tier === 'strategic');
  const tacticalNodes = nodes.filter(n => n.tier === 'tactical');
  const operationalNodes = nodes.filter(n => n.tier === 'operational');

  // Form dynamic coordinate grids for nodes so we can render custom SVG paths
  const getNodeCoords = (nodeId) => {
    const sIndex = strategicNodes.findIndex(n => n.id === nodeId);
    if (sIndex !== -1) {
      return { x: 450 + sIndex * 350, y: 80 };
    }

    const tIndex = tacticalNodes.findIndex(n => n.id === nodeId);
    if (tIndex !== -1) {
      return { x: 180 + tIndex * 330, y: 280 };
    }

    const oIndex = operationalNodes.findIndex(n => n.id === nodeId);
    if (oIndex !== -1) {
      return { x: 100 + oIndex * 240, y: 520 };
    }

    return { x: 200, y: 200 };
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          border: 'border-indigo-500 shadow-neon-blue bg-indigo-950/80',
          badge: 'bg-indigo-500 text-white animate-pulse',
          text: 'text-indigo-300'
        };
      case 'success':
        return {
          border: 'border-emerald-500 shadow-neon-emerald bg-slate-900/90',
          badge: 'bg-emerald-600 text-emerald-100',
          text: 'text-emerald-400'
        };
      case 'failed':
        return {
          border: 'border-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] bg-slate-900/95',
          badge: 'bg-rose-600 text-rose-100',
          text: 'text-rose-400'
        };
      case 'pruned':
        return {
          border: 'border-slate-800 opacity-40 bg-slate-950/90',
          badge: 'bg-slate-700 text-slate-300',
          text: 'text-slate-500'
        };
      default:
        return {
          border: 'border-slate-700 bg-slate-900/80',
          badge: 'bg-slate-800 text-slate-400',
          text: 'text-slate-400'
        };
    }
  };

  return (
    <div className="relative flex-1 bg-slate-950 overflow-hidden h-full flex flex-col">
      {/* Grid Canvas Overlay info */}
      <div className="absolute top-3 left-4 z-10 bg-slate-900/85 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center space-x-4 pointer-events-none">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-purple-600 inline-block"></span>
          <span>STRATEGIC (TIER 1)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block"></span>
          <span>TACTICAL (TIER 2)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-teal-500 inline-block"></span>
          <span>OPERATIONAL (TIER 3)</span>
        </div>
      </div>

      {/* Navigation & Controls Overlay */}
      <div className="absolute top-3 right-4 z-10 flex items-center space-x-2">
        <button
          onClick={zoomIn}
          className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center font-bold text-lg hover:bg-slate-800 transition-all"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center font-bold text-lg hover:bg-slate-800 transition-all"
        >
          -
        </button>
        <button
          onClick={resetZoom}
          className="px-2 h-8 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-400 hover:text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-all"
        >
          RESET SCALE
        </button>
      </div>

      {/* Interactive Drag & Zoom Canvas */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 relative cursor-grab bg-grid-pattern transition-transform duration-75 select-none ${
          isDraggingCanvas ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Actual scaling workspace wrapper */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0px 0px'
          }}
          className="absolute top-0 left-0 w-[2000px] h-[1200px] pointer-events-auto transition-transform duration-75"
        >
          {/* SVG Connection Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
              </marker>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {nodes.map((node) => {
              if (!node.parentId) return null;
              const parent = nodes.find(n => n.id === node.parentId);
              if (!parent) return null;

              const start = getNodeCoords(parent.id);
              const end = getNodeCoords(node.id);

              // Offset so connections join bottom-center to top-center of boxes
              const startX = start.x + 130;
              const startY = start.y + 110;
              const endX = end.x + 110;
              const endY = end.y;

              // Midpoint calculation for neat cubic bezier routes
              const midY = (startY + endY) / 2;
              const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

              const isActiveLine = node.status === 'active' || parent.status === 'active';

              return (
                <g key={`edge-${node.id}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isActiveLine ? 'url(#activeGradient)' : '#334155'}
                    strokeWidth={isActiveLine ? '2.5' : '1.5'}
                    strokeDasharray={node.status === 'pending' ? '4,4' : 'none'}
                    className={isActiveLine ? 'animate-pulse' : ''}
                  />
                  {/* Tiny status point indicator on active branches */}
                  {isActiveLine && (
                    <circle r="4.5" fill="#10b981">
                      <animateMotion dur="3s" repeatCount="indefinite" path={pathD} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes Container */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {nodes.map((node) => {
              const coords = getNodeCoords(node.id);
              const styles = getStatusStyle(node.status);
              const isSelected = selectedNodeId === node.id;
              
              return (
                <div
                  key={node.id}
                  style={{
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                  }}
                  onClick={() => onSelectNode(node.id)}
                  className={`node-card absolute w-[260px] p-3.5 rounded-xl border-2 pointer-events-auto cursor-pointer transition-all duration-200 ${
                    styles.border
                  } ${isSelected ? 'ring-2 ring-indigo-400 scale-[1.03] z-20 bg-slate-900' : 'z-10'}`}
                >
                  {/* Header: Timescale Badge & Execution Status */}
                  <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400 font-semibold">{node.timescale}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${styles.badge}`}>
                      {node.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-bold text-xs text-slate-100 line-clamp-1 mb-1">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3.5">
                    {node.description}
                  </p>

                  {/* Footer Stats & Actions */}
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 mt-1.5">
                    {/* Dynamic Progress indicator */}
                    <div className="flex items-center space-x-2 flex-1 mr-3">
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${node.status === 'failed' ? 'bg-rose-500' : 'bg-indigo-500'}`}
                          style={{ width: `${node.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">
                        {node.progress}%
                      </span>
                    </div>

                    {/* Steering Quick Controls for Interactive Agent Debugging */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSubgoal(node.id);
                        }}
                        disabled={node.status === 'pruned' || node.status === 'success'}
                        className="p-1 text-indigo-400 hover:text-indigo-200 hover:bg-indigo-950/50 rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
                        title="Add Operational Sub-Goal (Steering)"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPruneNode(node.id);
                        }}
                        disabled={node.status === 'pruned'}
                        className="p-1 text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
                        title="Prune Node & Descedants"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Hierarchy Tier indicator strip */}
                  <div className={`absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full ${
                    node.tier === 'strategic'
                      ? 'bg-purple-500'
                      : node.tier === 'tactical'
                      ? 'bg-indigo-500'
                      : 'bg-teal-500'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}