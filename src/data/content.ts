import { AppState, type LabDefinition } from "../types";

export const labs: LabDefinition[] = [
  {
    id: "ai",
    state: AppState.AI_DOCUMENT_STATE,
    name: "AI LAB",
    title: "Light becomes structure",
    physics: "frontend development workbench",
    color: "#8fc7ff"
  },
  {
    id: "craft",
    state: AppState.CRAFT_MATERIAL_STATE,
    name: "CRAFT LAB",
    title: "Light becomes material",
    physics: "diy projects and finished works",
    color: "#ffc16b"
  },
  {
    id: "life",
    state: AppState.LIFE_MEMORY_STATE,
    name: "LIFE LAB",
    title: "Light becomes time",
    physics: "daily life records",
    color: "#b8d6c3"
  }
];

export const articles = [
  {
    id: "latent-briefing",
    section: "Runtime Notes",
    title: "Turning ambiguous product requests into structured implementation plans",
    summary:
      "A repeatable method for converting loose objectives into staged technical decisions, risks, and build checkpoints.",
    tags: ["planning", "systems", "ai workflow"],
    readTime: "8 min"
  },
  {
    id: "eval-grids",
    section: "Evaluation",
    title: "Designing small evaluation grids for agentic interfaces",
    summary:
      "How to build compact test surfaces that reveal reasoning drift, tool failure modes, and hidden state assumptions.",
    tags: ["evals", "agents", "qa"],
    readTime: "11 min"
  },
  {
    id: "prompt-field",
    section: "Knowledge",
    title: "Prompt fields as operating constraints, not prose decorations",
    summary:
      "A documentation pattern for keeping prompts grounded in runtime behavior, measurable intent, and explicit boundaries.",
    tags: ["prompting", "docs", "architecture"],
    readTime: "6 min"
  },
  {
    id: "interface-memory",
    section: "Interface",
    title: "Memory surfaces for long-running personal systems",
    summary:
      "A practical taxonomy for what should be remembered, forgotten, compressed, or made visible in a personal AI lab.",
    tags: ["memory", "ux", "personal systems"],
    readTime: "9 min"
  }
];

export const materials = [
  {
    id: "fused-glass",
    type: "glass",
    title: "Fused Glass Study",
    medium: "translucent sheets, kiln bend, edge light",
    image: "materials/glass-field.svg"
  },
  {
    id: "copper-wire",
    type: "wire",
    title: "Copper Signal Loom",
    medium: "annealed wire, solder points, shadow map",
    image: "materials/wire-field.svg"
  },
  {
    id: "woven-fabric",
    type: "fabric",
    title: "Soft Diffusion Cloth",
    medium: "cotton, translucent thread, hand tension",
    image: "materials/fabric-field.svg"
  },
  {
    id: "paper-ash",
    type: "paper",
    title: "Ash Paper Index",
    medium: "burnished paper, graphite, pressed air",
    image: "materials/paper-field.svg"
  },
  {
    id: "resin-node",
    type: "resin",
    title: "Resin Memory Node",
    medium: "clear resin, embedded fragments, amber cast",
    image: "materials/resin-field.svg"
  },
  {
    id: "stone-wire",
    type: "stone",
    title: "Stone Circuit Object",
    medium: "river stone, wire route, shallow groove",
    image: "materials/stone-field.svg"
  }
];

export const memories = [
  {
    id: "m-01",
    date: "2026.06.30",
    time: "07:18",
    title: "Morning light on the desk edge",
    note: "A narrow line of light made the room feel measured before anything was planned.",
    drift: 0
  },
  {
    id: "m-02",
    date: "2026.06.24",
    time: "23:42",
    title: "Late diagram after a long call",
    note: "The useful part of the system was not the diagram, but the silence after it finally fit.",
    drift: 38
  },
  {
    id: "m-03",
    date: "2026.05.19",
    time: "16:06",
    title: "A material sample became a map",
    note: "Wire and fabric made a better model of attention than another rectangle ever could.",
    drift: -22
  },
  {
    id: "m-04",
    date: "2026.04.03",
    time: "09:51",
    title: "Notes from a train window",
    note: "The timeline should feel like distance, not a stack.",
    drift: 56
  }
];
