import React, { useState, useEffect } from 'react';
import {
  Layers,
  Settings,
  ShieldAlert,
  Sparkles,
  Save,
  Plus,
  HelpCircle,
  Play,
  CheckCircle,
  Edit3,
  FolderGit,
  Flame
} from 'lucide-react';

export default function Sidebar({
  selectedNode,
  templates,
  onUpdateNode,
  onUpdateTemplates
}) {
  const [activeTab, setActiveTab] = useState('inspector');
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeDesc, setNodeDesc] = useState('');
  const [nodeStatus, setNodeStatus] = useState('pending');
  const [nodeProgress, setNodeProgress] = useState(0);

  const [strategicPrompt, setStrategicPrompt] = useState('');
  const [tacticalPrompt, setTacticalPrompt] = useState('');
  const [operationalPrompt, setOperationalPrompt] = useState('');

  // Synchronize state with inputs
  useEffect(() => {
    if (selectedNode) {
      setNodeLabel(selectedNode.label);
      setNodeDesc(selectedNode.description);
      setNodeStatus(selectedNode.status);
      setNodeProgress(selectedNode.progress);
    }
  }, [selectedNode]);

  useEffect(() => {
    if (templates) {
      setStrategicPrompt(templates.strategic);
      setTacticalPrompt(templates.tactical);
      setOperationalPrompt(templates.operational);
    }
  }, [templates]);

  const handleSaveNode = (e) => {
    e.preventDefault();
    if (!selectedNode) return;
    onUpdateNode(selectedNode.id, {
      label: nodeLabel,
      description: nodeDesc,
      status: nodeStatus,
      progress: Number(nodeProgress)
    });
  };

  const handleSaveTemplates = () => {
    onUpdateTemplates({
      strategic: strategicPrompt,
      tactical: tacticalPrompt,
      operational: operationalPrompt
    });
  };

  return (
    <div className="w-full lg:w-[420px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 overflow-hidden h-[400px] lg:h-auto">
      {/* Tabs list */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-mono">
        <button
          onClick={() => setActiveTab('inspector')}
          className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'inspector'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/40'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          NODE INSPECTOR
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'prompts'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/40'
          }`}
        >
          <Settings className="h-3.5 w-3.5" />
          PROMPT TEMPLATES
        </button>
      </div>

      {/* Main panel scroll container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === 'inspector' ? (
          selectedNode ? (
            <form onSubmit={handleSaveNode} className="space-y-4">
              {/* Header metadata */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 tracking-wider">
                    NODE ID: {selectedNode.id}
                  </span>
                  <h5 className="text-xs text-slate-400 capitalize font-medium mt-0.5">
                    Reasoning Tier: <b className="text-indigo-300">{selectedNode.tier}</b>
                  </h5>
                </div>
                <span className="text-slate-500 font-mono text-xs">
                  {selectedNode.timescale}
                </span>
              </div>

              {/* Inputs section */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={nodeLabel}
                    onChange={(e) => setNodeLabel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-100 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Execution Strategy / Details
                  </label>
                  <textarea
                    rows={3}
                    value={nodeDesc}
                    onChange={(e) => setNodeDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-300 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Status
                    </label>
                    <select
                      value={nodeStatus}
                      onChange={(e) => setNodeStatus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-100 font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                      <option value="pruned">Pruned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Progress
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={nodeProgress}
                      onChange={(e) => setNodeProgress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Steering Controls Alert Box */}
              <div className="bg-indigo-950/20 border border-indigo-900/50 p-3 rounded-lg flex items-start gap-2 text-[11px] text-indigo-300">
                <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wide block mb-0.5">Human Steering Override Active</span>
                  Updating fields directly mutates active state structures. The agent will adapt its tree branch to comply next dynamic tick.
                </div>
              </div>

              {/* Save Node Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Save className="h-3.5 w-3.5" />
                <span>APPLY STEERING PARAMETERS</span>
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 mt-8">
              <div className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                <Layers className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  No Node Selected
                </h4>
                <p className="text-[11px] text-slate-500 max-w-[240px] mt-1">
                  Click on any reasoning node in the hierarchy view to inspect properties, prune its lineage, or force state modifications.
                </p>
              </div>
            </div>
          )
        ) : (
          // Prompt Templates Editor Tab
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                TIERED AGENT PROMPTS
              </h3>
              <button
                onClick={handleSaveTemplates}
                className="text-[10px] bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5"
              >
                <Save className="w-3 h-3" />
                <span>HOT-RELOAD TEMPLATES</span>
              </button>
            </div>

            {/* Strategic Prompt Textarea */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-purple-400 font-bold uppercase">[TIER 1] STRATEGIC OBJECTIVES</span>
                <span className="text-slate-500">Global Target</span>
              </div>
              <textarea
                rows={4}
                value={strategicPrompt}
                onChange={(e) => setStrategicPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10.5px] font-mono text-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Tactical Prompt Textarea */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-indigo-400 font-bold uppercase">[TIER 2] TACTICAL EPISODES</span>
                <span className="text-slate-500">Decision Logic</span>
              </div>
              <textarea
                rows={4}
                value={tacticalPrompt}
                onChange={(e) => setTacticalPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10.5px] font-mono text-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Operational Prompt Textarea */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-teal-400 font-bold uppercase">[TIER 3] OPERATIONAL ACTIONS</span>
                <span className="text-slate-500">Tool Executions</span>
              </div>
              <textarea
                rows={4}
                value={operationalPrompt}
                onChange={(e) => setOperationalPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10.5px] font-mono text-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Notice Footer */}
            <p className="text-[10px] text-slate-500 leading-relaxed italic bg-slate-950 p-2.5 rounded border border-slate-800/60">
              Hot-reloading changes immediate prompt configurations. Dynamic WebSocket loops automatically re-evaluate active nodes under current instructions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}