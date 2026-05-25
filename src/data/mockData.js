export const initialNodes = [
  {
    id: "root",
    label: "Architect Microservices Suite",
    tier: "strategic",
    status: "active",
    timescale: "100 - 500 Steps",
    description: "Establish core architecture, schemas, and high-frequency real-time event pipeline with automated integration checks.",
    progress: 45,
    parentId: null
  },
  {
    id: "t1",
    label: "Establish Distributed Database Schema",
    tier: "tactical",
    status: "success",
    timescale: "10 - 50 Steps",
    description: "Define schema migration patterns, setup partition keys for high scaling, and verify database latency constraints.",
    progress: 100,
    parentId: "root"
  },
  {
    id: "t2",
    label: "Design Event Brokers & Streaming",
    tier: "tactical",
    status: "active",
    timescale: "15 - 40 Steps",
    description: "Setup scalable pub/sub clusters for resilient state synchronization between core agent components.",
    progress: 30,
    parentId: "root"
  },
  {
    id: "t3",
    label: "Orchestrate End-to-End Test Matrix",
    tier: "tactical",
    status: "pending",
    timescale: "20 - 60 Steps",
    description: "Automated chaos-engineering integration matrix with performance profiling rules.",
    progress: 0,
    parentId: "root"
  },
  {
    id: "o1_1",
    label: "Write PostgreSQL migrations & schema",
    tier: "operational",
    status: "success",
    timescale: "1 - 5 Steps",
    description: "Produce verified SQL schema files and initial multi-tenant indexes config.",
    progress: 100,
    parentId: "t1"
  },
  {
    id: "o1_2",
    label: "Benchmark replica connection pooling",
    tier: "operational",
    status: "success",
    timescale: "2 - 8 Steps",
    description: "Execute synthetic 5000 write/sec loads with database middleware connection pooling rules.",
    progress: 100,
    parentId: "t1"
  },
  {
    id: "o2_1",
    label: "Configure Kafka / Redpanda Cluster setup",
    tier: "operational",
    status: "active",
    timescale: "1 - 5 Steps",
    description: "Deploy local cluster with replica factor of 3 and transactional production rules enabled.",
    progress: 60,
    parentId: "t2"
  },
  {
    id: "o2_2",
    label: "Write pub/sub dynamic failover adapters",
    tier: "operational",
    status: "pending",
    timescale: "3 - 10 Steps",
    description: "Implement defensive exponential backoff retry mechanisms to deal with cluster degradation.",
    progress: 0,
    parentId: "t2"
  },
  {
    id: "o3_1",
    label: "Construct Docker Compose configuration matrix",
    tier: "operational",
    status: "pending",
    timescale: "2 - 5 Steps",
    description: "Synthesize local orchestration files that spin up brokers, PostgreSQL nodes, and mock clients.",
    progress: 0,
    parentId: "t3"
  }
];

export const initialTemplates = {
  strategic: `# Strategic Reasoning Loop Template
# Aimed at high-level goal decomposition and task structural planning.

[CONTEXT]
You are a senior systems architect coordinating long-term objectives.

[INSTRUCTIONS]
1. Break down major goal into mutually exclusive tactical components.
2. Prioritize components that minimize overall integration friction.
3. Keep goals abstract yet structured with explicit timescale targets.

[FORMAT CONSTRAINT]
Only emit JSON structure conforming to the HRM-Strategic schema.`, 

  tactical: `# Tactical Reasoning & Episode Planning Template
# Mid-term goal formulation focused on dependency resolution.

[CONTEXT]
You are a technical manager handling high-efficiency execution steps.

[INSTRUCTIONS]
1. Analyze current strategic milestones and evaluate outstanding operational metrics.
2. Emit highly scoped executable subtasks containing success constraints.
3. Identify failure paths and defensive branching requirements.`, 

  operational: `# Operational Task Execution Template
# Immediate command generation and interactive tool invocation.

[CONTEXT]
You are an autonomic systems execution agent with direct tool integration interfaces.

[INSTRUCTIONS]
1. Run tools with target parameters in sequential order.
2. Parse stdout/stderr. If failure is detected, surface structural stack back to the Tactical Layer.
3. Output crisp status statements for visual state renderers.`
};

export const mockLogs = [
  { timestamp: "14:32:01", level: "SYSTEM", message: "Initializing HRM-Studio connection hook..." },
  { timestamp: "14:32:02", level: "WEBSOCKET", message: "WS Protocol upgraded. Listening on port :8080/stream" },
  { timestamp: "14:32:04", level: "STRATEGIC", message: "Goal Decomposed: 'Architect Microservices Suite' mapped to 3 tactical sub-goals." },
  { timestamp: "14:32:07", level: "TACTICAL", message: "Validating DB schema dependencies... All strategic parent tasks verified." },
  { timestamp: "14:32:09", level: "OPERATIONAL", message: "Executing: 'npm run test:migrations' - STDOUT [12 passing, 0 failing, 45ms]" },
  { timestamp: "14:32:12", level: "TACTICAL", message: "Strategic node t1 marked 'SUCCESS'. Transitioning attention focus to: Event Brokers." },
  { timestamp: "14:32:15", level: "OPERATIONAL", message: "Spinning up Docker containers for Redpanda Cluster... Pulling image target config." },
  { timestamp: "14:32:18", level: "SYSTEM", message: "HRM execution paused by client override. Awaiting human confirmation for sub-goal prune." }
];