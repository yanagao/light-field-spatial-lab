import { AppState, type LabDefinition } from "../types";

export const labs: LabDefinition[] = [
  {
    id: "ai",
    state: AppState.AI_DOCUMENT_STATE,
    name: "AI LAB",
    title: "Frontend development workbench",
    physics: "frontend development workbench",
    color: "#8fc7ff"
  },
  {
    id: "craft",
    state: AppState.CRAFT_MATERIAL_STATE,
    name: "CRAFT LAB",
    title: "DIY projects and finished works",
    physics: "diy projects and finished works",
    color: "#ffc16b"
  },
  {
    id: "life",
    state: AppState.LIFE_MEMORY_STATE,
    name: "LIFE LAB",
    title: "Daily life records",
    physics: "daily life records",
    color: "#b8d6c3"
  }
];

export const articles = [
  {
    id: "requirement-breakdown",
    section: "工程笔记",
    title: "把模糊需求拆成可落地的前端方案",
    summary: "从目标、页面状态、组件边界和风险点入手，把一句需求整理成可以推进的开发计划。",
    tags: ["需求拆解", "组件设计", "交付节奏"],
    readTime: "8 分钟"
  },
  {
    id: "interaction-states",
    section: "界面质量",
    title: "交互状态与边界用例清单",
    summary: "记录加载、空态、错误态、hover、移动端适配等细节，避免界面只在理想数据下好看。",
    tags: ["交互状态", "响应式", "质量检查"],
    readTime: "10 分钟"
  },
  {
    id: "component-abstraction",
    section: "组件实践",
    title: "组件抽象不要早于真实重复",
    summary: "在业务页面里先看清变化规律，再提炼 props、组合方式和样式边界，让复用服务于维护。",
    tags: ["组件实践", "组件抽象", "维护性"],
    readTime: "6 分钟"
  },
  {
    id: "frontend-memory",
    section: "工作流",
    title: "给长期项目留下可继续的上下文",
    summary: "用清晰的提交、注释、文档和检查项保存决策，让下一次接手时不用重新考古。",
    tags: ["工程习惯", "文档", "协作"],
    readTime: "9 分钟"
  }
];

export const materials = [
  {
    id: "fused-glass",
    type: "玻璃",
    title: "熔融玻璃小样",
    medium: "透明色片、窑烧弯折、边缘光",
    image: "materials/glass-field.svg"
  },
  {
    id: "copper-wire",
    type: "金属线",
    title: "铜线信号编织",
    medium: "退火铜线、焊点、投影关系",
    image: "materials/wire-field.svg"
  },
  {
    id: "woven-fabric",
    type: "织物",
    title: "柔光织物实验",
    medium: "棉布、半透明线、手工张力",
    image: "materials/fabric-field.svg"
  },
  {
    id: "paper-ash",
    type: "纸",
    title: "灰纸索引",
    medium: "压纹纸、石墨、轻微烧灼痕迹",
    image: "materials/paper-field.svg"
  },
  {
    id: "resin-node",
    type: "树脂",
    title: "树脂记忆节点",
    medium: "透明树脂、嵌入碎片、琥珀色光感",
    image: "materials/resin-field.svg"
  },
  {
    id: "stone-wire",
    type: "石头",
    title: "石头线路物件",
    medium: "河石、金属线走向、浅槽刻痕",
    image: "materials/stone-field.svg"
  }
];

export const memories = [
  {
    id: "m-01",
    date: "2026.06.30",
    time: "07:18",
    title: "早晨桌边的一道光",
    note: "还没开始计划之前，桌沿那条窄窄的光线先把房间安静地分好了层次。",
    drift: 0
  },
  {
    id: "m-02",
    date: "2026.06.24",
    time: "23:42",
    title: "深夜改完的一张图",
    note: "真正有用的不是那张图本身，而是它终于对齐之后，脑子里短暂安静下来的瞬间。",
    drift: 38
  },
  {
    id: "m-03",
    date: "2026.05.19",
    time: "16:06",
    title: "材料小样变成了一张地图",
    note: "铜线和布料比普通矩形更像注意力的路径，手上的东西忽然有了结构。",
    drift: -22
  },
  {
    id: "m-04",
    date: "2026.04.03",
    time: "09:51",
    title: "火车窗边的几行记录",
    note: "时间线不应该只是堆叠，它更像距离：有的靠近，有的已经在雾里。",
    drift: 56
  }
];
