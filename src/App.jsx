import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ReasoningTree from './components/ReasoningTree.jsx';
import Sidebar from './components/Sidebar.jsx';
import ConsoleLog from './components/ConsoleLog.jsx';
import { initialNodes, initialTemplates, mockLogs } from './data/mockData.js';

export default function App() {
  // Core States
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState('root');
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(2);
  const [connectionStatus, setConnectionStatus] = useState('Connected');
  const [logs, setLogs] = useState(mockLogs);
  const [templates, setTemplates] = useState(initialTemplates);

  // Simulated WebSockets background workflow stream
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Advance operational tasks progress
      setNodes((prevNodes) => {
        let modified = false;
        const nextNodes = prevNodes.map((node) => {
          // Only mutate dynamic active or pending nodes randomly
          if (node.status === 'active' && node.progress < 100) {
            modified = true;
            const nextProgress = Math.min(node.progress + Math.floor(Math.random() * 15) + 5, 100);
            const isComplete = nextProgress === 100;
            return {
              ...node,
              progress: nextProgress,
              status: isComplete ? 'success' : 'active'
            };
          } 
          return node;
        });

        // If node became successful, activate its siblings or start a pending node
        if (modified) {
          const hasPending = nextNodes.some(n => n.status === 'pending');
          if (hasPending) {
            const pendingNode = nextNodes.find(n => n.status === 'pending');
            if (pendingNode) {
              // Activate the first pending sibling node
              pendingNode.status = 'active';
              pendingNode.progress = 10;
              
              // Add log corresponding to new simulation activity
              setLogs((prevLogs) => [
                {
                  timestamp: new Date().toTimeString().split(' ')[0],
                  level: pendingNode.tier.toUpperCase(),
                  message: `Auto-scheduler promoted node '${pendingNode.label}' to dynamic ACTIVE state.`
                },
                ...prevLogs
              ]);
            }
          }
        }

        return nextNodes;
      });

    }, 4500 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  // 1. Play / Pause Sim
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'SYSTEM',
        message: isPlaying ? 'Decomposition evaluation loop PAUSED.' : 'Decomposition evaluation loop RESUMED.'
      },
      ...prev
    ]);
  };

  // 2. Clear Console logs
  const handleClearLogs = () => {
    setLogs([]);
  };

  // 3. Reset Simulation Tree to original defaults
  const handleResetSimulation = () => {
    setNodes(initialNodes);
    setSelectedNodeId('root');
    setLogs([
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'SYSTEM',
        message: 'Re-initialized clean database hierarchy layout node tree.'
      },
      ...mockLogs
    ]);
  };

  // 4. Update Node Details via Inspector
  const handleUpdateNode = (id, updatedFields) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, ...updatedFields } : node))
    );
    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'SYSTEM',
        message: `Steering override applied to node '${id}': Modified fields.`
      },
      ...prev
    ]);
  };

  // 5. Prune Branch Action (Prunes selected node & all its descendants)
  const handlePruneNode = (id) => {
    // Identify all children of target node recursive
    const findDescendants = (parentId, currentList) => {
      const children = currentList.filter((n) => n.parentId === parentId);
      let list = [...children];
      children.forEach((child) => {
        list = [...list, ...findDescendants(child.id, currentList)];
      });
      return list;
    };

    const targetNode = nodes.find((n) => n.id === id);
    if (!targetNode) return;

    const descendants = findDescendants(id, nodes);
    const pruneIds = [id, ...descendants.map((d) => d.id)];

    setNodes((prev) =>
      prev.map((node) =>
        pruneIds.includes(node.id) ? { ...node, status: 'pruned', progress: 0 } : node
      )
    );

    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'SYSTEM',
        message: `Pruning reasoning branch from root node '${targetNode.label}' & its sub-goals.`
      },
      ...prev
    ]);
  };

  // 6. Dynamic Injection of Sub-goals under a parent
  const handleAddSubgoal = (parentId) => {
    const parent = nodes.find((n) => n.id === parentId);
    if (!parent) return;

    // Create unique child operational node
    const uniqueId = `op_sub_${Math.floor(Math.random() * 1000)}`;
    const newSubnode = {
      id: uniqueId,
      label: `Injected: Mitigate ${parent.label.slice(0, 16)}...`,
      tier: 'operational',
      status: 'active',
      timescale: '1 - 3 Steps',
      description: 'Human steered interactive goal override created mid-simulation run to address immediate concerns.',
      progress: 0,
      parentId: parentId
    };

    setNodes((prev) => [...prev, newSubnode]);
    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'STRATEGIC',
        message: `Dynamic steering node injected under target parent '${parent.id}'` 
      },
      ...prev
    ]);
  };

  // 7. Hot reload Prompt updates
  const handleUpdateTemplates = (updatedTemplates) => {
    setTemplates(updatedTemplates);
    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'WEBSOCKET',
        message: 'Prompt template matrix successfully hot-reloaded into target prompt evaluation engines.'
      },
      ...prev
    ]);
  };

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const activeNodesCount = nodes.filter((n) => n.status === 'active').length;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Global studio head controls and status indicator line */}
      <Header
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onReset={handleResetSimulation}
        connectionStatus={connectionStatus}
        simulationSpeed={simulationSpeed}
        onSpeedChange={setSimulationSpeed}
        totalNodesCount={nodes.length}
        activeNodesCount={activeNodesCount}
      />

      {/* Main Workspace Frame split into Interactive Canvas and inspector sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Interactive node visualizer graph */}
        <ReasoningTree
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onPruneNode={handlePruneNode}
          onAddSubgoal={handleAddSubgoal}
        />

        {/* Sidebar for Inspector details / Prompt configuration */}
        <Sidebar
          selectedNode={selectedNode}
          templates={templates}
          onUpdateNode={handleUpdateNode}
          onUpdateTemplates={handleUpdateTemplates}
        />
      </div>

      {/* Real-time Streaming Event Console drawer */}
      <ConsoleLog logs={logs} onClear={handleClearLogs} />
    </div>
  );
}