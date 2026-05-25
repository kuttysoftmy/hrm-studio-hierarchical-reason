import React from 'react';
import { Terminal, Send, SquareCheck, Info, X } from 'lucide-react';

export default function ConsoleLog({ logs, onClear }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'SYSTEM': return 'text-amber-400';
      case 'STRATEGIC': return 'text-purple-400';
      case 'TACTICAL': return 'text-indigo-400';
      case 'OPERATIONAL': return 'text-teal-400';
      case 'WEBSOCKET': return 'text-pink-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col shrink-0 overflow-hidden font-mono text-[11px]">
      {/* Console toolbar header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-slate-900/50">
        <div className="flex items-center space-x-2 text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold tracking-widest text-[10px]">LIVE HRM STREAM & AGENT DEVIATIONS</span>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
        >
          [CLEAR CONSOLE]
        </button>
      </div>

      {/* Stream body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 select-text">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 leading-relaxed hover:bg-slate-900/40 py-0.5 px-1 rounded transition-all">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`font-semibold shrink-0 uppercase tracking-wide text-[10px] px-1 bg-slate-900 rounded border border-slate-800/40 ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-slate-300 font-medium">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}