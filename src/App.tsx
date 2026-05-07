/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Target, 
  Layers, 
  Palette, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Code2, 
  Figma, 
  Image as ImageIcon,
  MousePointer2,
  Share2,
  Workflow,
  Sparkles,
  Zap,
  Layout,
  Terminal,
  ArrowRight,
  X,
  Maximize2,
  Grid
} from 'lucide-react';

// --- Types ---
interface PageProps {
  id: number;
}

// --- Components ---

const ImagePlaceholder = ({ label, className = "" }: { label: string, className?: string }) => (
  <div 
    onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { label, img: '' } }))}
    className={`relative bg-slate-50 border border-dashed border-slate-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4 min-h-[200px] group cursor-zoom-in transition-all hover:border-blue-300 hover:shadow-lg ${className}`}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
    <ImageIcon className="w-10 h-10 text-slate-300 mb-2 group-hover:text-blue-500 transition-colors" />
    <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">{label}</span>
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
      <Sparkles className="w-4 h-4 text-blue-500" />
    </div>
  </div>
);

const Card = ({ children, title, icon: Icon, className = "" }: { children: React.ReactNode, title?: string, icon?: any, className?: string, key?: any }) => (
  <div className={`bg-white border border-slate-200 rounded-none p-6 shadow-sm transition-all hover:shadow-md ${className}`}>
    {title && (
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
        <h3 className="text-3xl font-medium uppercase tracking-widest text-slate-900">{title}</h3>
      </div>
    )}
    <div className="border-t border-slate-50 pt-4 mt-auto">
      {children}
    </div>
  </div>
);

const PromptBlock = ({ children, className = "", textClassName = "text-xl" }: { children: React.ReactNode, className?: string, textClassName?: string }) => (
  <div className={`flex flex-col bg-slate-50/50 border border-slate-100 rounded-2xl p-8 ${className}`}>
    <div className="inline-flex items-center self-start bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest mb-6 shadow-xl shadow-blue-600/20 px-8 py-2.5 text-sm">
      PROMPT 提示词
    </div>
    <div className={`${textClassName} font-medium text-slate-700 leading-[1.6] whitespace-pre-wrap`}>
      {children}
    </div>
  </div>
);

const CollapsiblePrompt = ({ title, content, image }: { title: string, content?: string, image?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-2 w-full">
      <motion.div 
        layout
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left transition-all hover:bg-white/40 group"
        >
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-blue-600 tracking-tight">{title}</span>
            {!isOpen && (
              <span className="text-[12px] text-slate-400 truncate max-w-[200px] mt-0.5 font-light italic">
                {content ? `${content.slice(0, 35)}...` : '点击展开查看内容'}
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${isOpen ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white/50 border-slate-200 text-slate-400 group-hover:bg-white group-hover:border-slate-300 shadow-sm'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-5 pb-5 pt-1 border-t border-slate-50/50">
                {content && (
                  <div className="bg-white/50 rounded-2xl p-4 text-[13px] text-slate-600 leading-relaxed font-light whitespace-pre-wrap selection:bg-blue-100 italic border border-slate-100/30">
                    {content}
                  </div>
                )}
                {image && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100/50 cursor-zoom-in" onClick={(e) => {
                    e.stopPropagation();
                    const event = new CustomEvent('open-lightbox', { detail: { img: image, label: title } });
                    window.dispatchEvent(event);
                  }}>
                    <img src={image} alt={title} className="w-full h-auto" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- Pages ---

const Page1 = () => (
  <div className="h-full flex flex-col justify-center items-center px-16 md:px-32 relative overflow-hidden bg-[#f0f9f6]">
    {/* High-fidelity mesh gradient background - Crystalline & Clear palette */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Mint Crystal Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['-10%', '5%', '-10%'],
          y: ['-5%', '10%', '-5%'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[100vw] h-[100vw] bg-[#99f6e4] blur-[140px] rounded-full"
      />
      
      {/* Clear Yellow Light */}
      <motion.div 
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['0%', '10%', '0%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#fef9c3] blur-[160px] rounded-full"
      />
      
      {/* Sky Blue Depth */}
      <motion.div 
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] right-[10%] w-[90vw] h-[90vw] bg-[#bae6fd] blur-[180px] rounded-full"
      />
    </div>

    {/* The signature large white elliptical "surface" with soft glow/feathered edge */}
    <motion.div 
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[42%] w-[200vw] aspect-square bg-white rounded-[100%] z-5"
      style={{
        boxShadow: `
          0 -20px 40px rgba(255, 255, 255, 0.8),
          0 -40px 80px rgba(255, 255, 255, 0.4),
          0 -60px 120px rgba(255, 255, 255, 0.2)
        `,
        filter: 'blur(0.5px)'
      }}
    />

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1 }}
      className="relative z-10 text-center flex flex-col items-center"
    >
      <div className="flex flex-col items-center mb-14">
        <div className="w-12 h-[1px] bg-slate-900/10 mb-6" />
        <span className="text-[11px] font-bold text-slate-400 tracking-[0.7em] uppercase">Executive Slide V.10</span>
      </div>
      
      <h1 className="text-[7.5vw] font-light leading-[1.05] tracking-tighter text-slate-900 mb-12">
        AI如何重构<br />
        <span className="text-slate-400">我的设计工作流</span>
      </h1>

      <div className="flex flex-col items-center gap-5 mt-16">
        <div className="flex items-center gap-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Presenter</span>
          <div className="h-[1px] w-8 bg-slate-100" />
          <span className="text-2xl font-light tracking-tight text-slate-800">如意</span>
        </div>
      </div>
    </motion.div>

    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
      <div className="w-[1px] h-12 bg-gradient-to-b from-slate-200 to-transparent" />
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">猫耳FM</span>
    </div>
  </div>
);

const Page2 = () => (
  <div className="h-full p-10 md:p-14 flex flex-col bg-white">
    <header className="mb-12">
      <div className="h-[2px] w-12 bg-blue-600 mb-4"></div>
      <h2 className="text-6xl font-light tracking-tight text-slate-900 mb-2">工作流拆分</h2>
      <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em]">Workflow Decomposition</span>
    </header>
    
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1">
      {[
        { title: "需求分析", icon: Target, items: ["活动目标", "产品原型图", "玩法机制"] },
        { title: "情绪板构建", icon: Palette, items: ["视觉参考搜集", "对齐原画", "提炼视觉关键词", "关键页面框架"] },
        { title: "主视觉", icon: Zap, items: ["原画协作", "主页面多轮评审", "最终确认", "动效协作"] },
        { title: "视觉资产交付", icon: Share2, items: ["切图标注", "组件化搭建", "资源位延展"] },
        { title: "视觉走查", icon: CheckCircle2, items: ["核对前端还原度", "活动结束复盘"] },
      ].map((step, idx) => (
        <Card key={idx} title={step.title} icon={step.icon} className="flex flex-col h-full border-t-2 border-t-blue-600 border-x-slate-100 border-b-slate-100">
          <div className="flex-1">
            <ul className="space-y-4">
              {step.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base leading-relaxed text-slate-500 group">
                  <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 flex justify-between items-center text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span>Stage 0{idx + 1}</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Page3 = () => (
  <div className="h-full p-10 md:p-14 flex flex-col bg-white">
    <header className="mb-12">
      <div className="h-[2px] w-12 bg-blue-600 mb-4"></div>
      <h2 className="text-6xl font-light tracking-tight text-slate-900 mb-2">优化方向回顾</h2>
      <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em]">Optimization & Problem Solving</span>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        {
          title: "需求分析阶段",
          problem: "运营/设计双方未达成一致就进入执行，导致后期多轮返。",
          solution: "在未收到明确的、经过双方一致同意的方案（核心文案、主次功能点）之前，拒绝进入实质性的视觉输出阶段。"
        },
        {
          title: "情绪板构建阶段",
          problem: "仅与运营确定了模糊的方向，未锁定核心主题关键词与视觉参考的具体锚点，风格在执行阶段才发现发生偏差。",
          solution: "明确追问并提炼运营的“参考锚点”。比如必须明确对方看中的是某张图的构图、明暗色调，还是特定的材质细节？以图文对照的形式二次确认。"
        },
        {
          title: "主视觉协作",
          problem: "原画/设计/运营三方在沟通中信息存在一定理解差异，锁定方向有偏差，所有风险积压到终稿。",
          solution: "将工作流变为“多节点切面确认”。\n\n• 结构确认：组织三方校验。\n• 定调确认：AI跑图未拆分态。\n• 成稿确认：最终精细化。"
        }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col border border-slate-100 p-10 bg-slate-50/30">
             <h3 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-10 uppercase tracking-widest leading-tight">{item.title}</h3>
             
             <div className="mb-10">
                <div className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500" /> 存在问题
                </div>
                <p className="text-xl leading-relaxed text-slate-500 font-light">{item.problem}</p>
             </div>

             <div className="mt-auto pt-10 border-t border-slate-200/50">
                <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600" /> 优化方向
                </div>
                <p className="text-xl leading-relaxed text-slate-900 whitespace-pre-wrap font-medium">{item.solution}</p>
             </div>
        </div>
      ))}
    </div>
  </div>
);

const Page4 = () => (
  <div className="h-full p-10 md:p-14 flex flex-col bg-white">
    <header className="mb-12">
      <div className="h-[2px] w-12 bg-blue-600 mb-4"></div>
      <h2 className="text-6xl font-light tracking-tight text-slate-900 mb-2">各阶段修改窗口</h2>
      <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em]">Modification Compliance</span>
    </header>

    <div className="flex-1 overflow-hidden border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-10 py-8 text-lg font-bold text-slate-500 uppercase tracking-widest">Phase / 阶段</th>
            <th className="px-10 py-8 text-lg font-bold text-slate-500 uppercase tracking-widest">Approval Window / 修改窗口</th>
            <th className="px-10 py-8 text-lg font-bold text-red-500 uppercase tracking-widest">Cost of Overruns / 代价</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { phase: "风格方案阶段", window: "选定前可自由调整", cost: "重新生成，重新排期" },
            { phase: "框架/主视觉阶段", window: "确认前小于3轮反馈", cost: "影响后续所有页面" },
            { phase: "总页面阶段", window: "完成后统一走查", cost: "逐页零散反馈会打乱切图节奏" },
            { phase: "Figma交付后", window: "仅接受标注错误修正", cost: "视觉改动需重新走PS→Figma流程" },
          ].map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-10 py-10">
                <span className="text-slate-900 font-medium text-xl">{row.phase}</span>
              </td>
              <td className="px-10 py-10">
                <span className="text-slate-500 text-lg italic">{row.window}</span>
              </td>
              <td className="px-10 py-10">
                <span className="text-red-500/80 text-lg font-bold uppercase tracking-tighter">{row.cost}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Page5 = () => (
  <div className="h-full bg-[#f8f9fa] flex flex-col justify-center items-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center z-10"
    >
      <div className="mb-6 flex justify-center">
        <div className="w-12 h-[2px] bg-blue-600" />
      </div>
      <h2 className="text-9xl font-light tracking-tighter text-slate-900 mb-2 uppercase">
        设计工作-SOP
      </h2>
      <p className="text-2xl text-slate-500 font-light mb-6">AI辅助设计全流程规范 v1.0</p>
      <p className="text-sm text-slate-400 font-bold tracking-[0.6em] uppercase">AI-ASSISTED DESIGN STANDARD V1.0</p>
    </motion.div>
    
    <div className="absolute bottom-32 w-full px-20 md:px-32">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 z-0" />
        {[null, 'Check A', null, 'Check B', null, null, 'Check C', null, null].map((point, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full border border-white ${point ? 'bg-blue-600 scale-125 shadow-sm' : 'bg-slate-300'}`} />
            <div className="h-8 flex items-center justify-center">
              {point && (
                <span className="mt-4 text-xs font-bold tracking-widest uppercase text-blue-600">
                  {point}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Page6 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 01</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">需求承接与信息收集</h2>
      </div>
      <div className="h-10 w-10 flex items-center justify-center border border-slate-200 shrink-0">
        <Target className="text-slate-400 w-4 h-4" />
      </div>
    </div>

    <div className="max-w-4xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
        需求对齐清单 / Project Scoping Checklist <div className="h-[1px] flex-1 bg-slate-100" />
      </h3>
      
      <div className="flex flex-col gap-10">
        {[
          "Axure/墨刀/figma产品原型图",
          "核心文案已定稿（标题/按钮/说明文字）",
          "内容清单：总状态、弹窗、榜单、资源位",
          "是否含原画/动效需求",
          "上线时间节点（倒推各阶段截止时间）"
        ].map((item, idx) => (
          <div key={idx} className="flex gap-10 group items-center">
            <span className="text-slate-200 font-light text-5xl group-hover:text-blue-600 transition-colors w-16">0{idx+1}</span>
            <p className="text-3xl text-slate-600 leading-tight border-b border-transparent group-hover:border-slate-300 pb-2 transition-all">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Page7 = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const wireframe = { id: 'ref', img: 'https://raw.githubusercontent.com/topvinci-art/images/refs/heads/main/20260505024451028.png' };
  const concepts = [
    { id: 'a', style: '方案A', bgColor: 'bg-emerald-50/50', borderColor: 'border-emerald-100', img: 'https://raw.githubusercontent.com/topvinci-art/images/refs/heads/main/20260505024451011.png' },
    { id: 'b', style: '方案B', bgColor: 'bg-amber-50/50', borderColor: 'border-amber-100', img: 'https://raw.githubusercontent.com/topvinci-art/images/refs/heads/main/20260505024450984.png' },
    { id: 'c', style: '方案C', bgColor: 'bg-rose-50/50', borderColor: 'border-rose-100', img: 'https://raw.githubusercontent.com/topvinci-art/images/refs/heads/main/image%2015.png' },
  ];

  const allGalleryItems = [wireframe, ...concepts];

  return (
    <div className="h-full p-10 md:p-16 flex flex-col bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
        <div>
          <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 02</span>
          <h2 className="text-6xl font-light text-slate-900 tracking-tight">Prompt工程 — 生成视觉方案</h2>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</div>
            <div className="text-sm font-bold text-green-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI GENERATING...
            </div>
          </div>
          <Sparkles className="text-blue-500 w-8 h-8 opacity-20" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Control Panel / Input */}
        <div className="col-span-4 border-r border-slate-100 flex flex-col overflow-hidden bg-slate-50/20">
          <div className="p-8 space-y-8 flex-1 overflow-auto">
            {/* Logic Block */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Prompt 4 段式结构</h3>
              </div>
              <div className="bg-white border text-slate-500 border-slate-200 rounded-xl p-4 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Terminal className="w-12 h-12" />
                </div>
                <p className="text-xs font-mono leading-relaxed relative z-10">
                  [活动定义] + [视觉要素] + <br/>
                  [活动风格] + [⽬标⽤户/具体对标游戏]
                </p>
              </div>
            </section>
            
            {/* Input Block */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Input String</h3>
              </div>
              <PromptBlock className="shadow-sm border-slate-200">
                根据图1这个原型图,完成h5玩法活动设计.{"\n"}
                采用民国风的设计{"\n"}
                配色:朱红色,金色,墨绿色{"\n"}
                元素:8/90年代歌舞厅的舞台设计{"\n"}
                标题字做特殊设计{"\n"}
                风格:二次元游戏,民国二次元游戏UI{"\n"}
                主要受众为二次元/乙女游戏/女性向群体.
              </PromptBlock>
            </section>

            {/* Reference Block */}
            <section>
               <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">原型图</h3>
              </div>
              <motion.div 
                layoutId={wireframe.id}
                onClick={() => setSelectedId(wireframe.id)}
                className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all h-48"
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
                  <span className="text-[10px] font-bold text-slate-400 uppercase bg-white/80 backdrop-blur-sm self-start px-2 py-1 rounded-full border border-slate-100">Fig.01 Wireframe</span>
                  <div className="flex justify-center flex-1 items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="text-slate-400 w-5 h-5" />
                  </div>
                </div>
                <motion.img 
                  layoutId={`img-${wireframe.id}`}
                  src={wireframe.img} 
                  alt="Wireframe Reference"
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 [image-rendering:-webkit-optimize-contrast]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </section>
          </div>
          

        </div>

        {/* Right Output Area */}
        <div className="col-span-8 flex flex-col p-10 bg-slate-50/30 overflow-auto">
          <div className="flex items-center gap-4 mb-10">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">GPT-image v2.0</h4>
            <div className="h-[1px] flex-1 bg-slate-200" />
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                <Grid className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {concepts.map((item, idx) => (
              <motion.div 
                key={item.id} 
                layoutId={item.id}
                onClick={() => setSelectedId(item.id)}
                className="flex flex-col cursor-pointer group"
              >
                <div className="relative mb-4">
                   <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">#00{idx + 1}</span>
                    <span className={`text-sm font-bold uppercase tracking-widest truncate flex items-center gap-1.5 ${item.style === '方案C' ? 'text-red-500' : 'text-slate-900'}`}>
                      {item.style}
                      {item.style === '方案C' && <span className="text-red-500">☑️</span>}
                    </span>
                  </div>
                  
                  <div className={`w-full aspect-[3/4] ${item.bgColor} border ${item.borderColor} rounded-[2rem] shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 flex items-center justify-center relative p-6 overflow-hidden`}>
                    {/* Decorative Grid BG */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    
                    <motion.img 
                      layoutId={`img-${item.id}`}
                      src={item.img} 
                      alt={item.style}
                      className="max-w-full max-h-full object-contain relative z-10 [image-rendering:-webkit-optimize-contrast]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none" />
                  </div>
                </div>
                

              </motion.div>
            ))}
          </div>

          {/* Modal / Lightbox */}
          <AnimatePresence>
            {selectedId && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                onClick={() => setSelectedId(null)}
              >
                <motion.div 
                  layoutId={selectedId}
                  className="bg-white rounded-[2.5rem] shadow-2xl h-[85vh] max-h-[90vh] w-auto relative flex items-center justify-center p-6 group/modal"
                  onClick={(e) => e.stopPropagation()}
                >
                   <motion.img 
                    layoutId={`img-${selectedId}`}
                    src={allGalleryItems.find(c => c.id === selectedId)?.img} 
                    className="h-full w-auto max-w-[85vw] object-contain rounded-[1.5rem]"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Page7_5 = () => {
  const cases = [
    {
      prototype: "https://raw.githubusercontent.com/topvinci-art/images/main/20260506150748284.png",
      generated: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507125734291.png",
      mainPrompt: "将图2的视觉风格应用于图1框架内容的组件"
    },
    {
      prototype: "https://raw.githubusercontent.com/topvinci-art/images/main/20260506150846992.png",
      generated: "https://raw.githubusercontent.com/topvinci-art/images/main/20260506151001931.png",
      mainPrompt: "将图2的视觉风格应用于图1框架内容的组件"
    },
    {
      prototype: "https://raw.githubusercontent.com/topvinci-art/images/main/20260506151023852.png",
      generated: "https://raw.githubusercontent.com/topvinci-art/images/main/20260506151042753.png",
      mainPrompt: "根据图2的视觉风格应用于图1框架内容的组件,\n异形弹窗样式采用民国风舞台的设计,png\n比例:375*589\n配色:朱红色,金色,墨绿色\n元素:8/90年代歌舞厅的舞台设计\n风格:二次元游戏,民国二次元游戏UI\n边缘清晰,纯白色背景方便后期抠图。"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ url: string, label: string } | null>(null);

  const nextCase = () => setActiveIndex((prev) => (prev + 1) % cases.length);
  const prevCase = () => setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);

  const current = cases[activeIndex];

  return (
    <div className="h-full p-10 md:p-16 bg-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 z-0 pointer-events-none" />
      
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
        <div>
          <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 02</span>
          <h2 className="text-6xl font-light text-slate-900 tracking-tight">Prompt工程 — 生成视觉方案</h2>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-4 shrink-0 mt-8">
          <button 
            onClick={prevCase}
            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-blue-600"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center text-slate-300 font-mono text-sm tracking-widest px-2">
            0{activeIndex + 1} / 0{cases.length}
          </div>
          <button 
            onClick={nextCase}
            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-blue-600"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 items-stretch">
        {/* Left: Images Frame */}
        <motion.div 
          key={`case-left-${activeIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-50/80 backdrop-blur-sm rounded-[3.5rem] border border-slate-100 p-8 shadow-inner"
        >
          <div className="grid grid-cols-2 gap-8 h-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className="text-xs font-mono text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">#REF</span>
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest truncate">原型图</span>
              </div>
              <motion.div 
                layoutId={`ref-img-${activeIndex}`}
                className="flex-1 rounded-[2.5rem] overflow-hidden border border-white bg-white shadow-sm flex items-center justify-center group cursor-pointer" 
                onClick={() => setSelectedImage({ url: current.prototype, label: '原型图' })}>
                 <motion.img 
                   layoutId={`img-ref-${activeIndex}`}
                   src={current.prototype} 
                   alt="Prototype" 
                   className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className="text-xs font-mono text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">#GEN</span>
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest truncate">生成图</span>
              </div>
              <motion.div 
                layoutId={`gen-img-${activeIndex}`}
                className="flex-1 rounded-[2.5rem] overflow-hidden border border-white bg-white shadow-sm flex items-center justify-center group cursor-pointer" 
                onClick={() => setSelectedImage({ url: current.generated, label: '生成图' })}>
                 <motion.img 
                   layoutId={`img-gen-${activeIndex}`}
                   src={current.generated} 
                   alt="Generated" 
                   className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right: Prompt Module */}
        <motion.div 
          key={`case-right-${activeIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            视觉方案生成提示词 / PROMPT
          </div>

          <PromptBlock className="flex-1" textClassName="text-3xl">
            {current.mainPrompt}
          </PromptBlock>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              layoutId={selectedImage.label === '原型图' ? `ref-img-${activeIndex}` : `gen-img-${activeIndex}`}
              className="bg-white rounded-[2.5rem] shadow-2xl h-[80vh] w-auto max-w-[90vw] relative flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
               <motion.img 
                layoutId={selectedImage.label === '原型图' ? `img-ref-${activeIndex}` : `img-gen-${activeIndex}`}
                src={selectedImage.url} 
                className="h-full w-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page8 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 03</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">视觉方案选定</h2>
      </div>
      <div className="h-14 flex items-center px-8 rounded-full bg-pink-500 text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(242,74,46,0.3)] shrink-0">
        <Target className="w-5 h-5 mr-3" /> 卡点A — 视觉风格锁定
      </div>
    </div>

    <div className="max-w-4xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
        Workflow Checklist <div className="h-[1px] flex-1 bg-slate-100" />
      </h3>
      
      <div className="flex flex-col gap-10">
        {[
          "将 2-3 个方案整理成对比图",
          "发给需求方，附简短说明",
          "收集反馈，确认选定方案"
        ].map((item, idx) => (
          <div key={idx} className="flex gap-10 group items-center">
            <span className="text-slate-200 font-light text-5xl group-hover:text-pink-500 transition-colors w-16">0{idx+1}</span>
            <p className="text-3xl text-slate-600 leading-tight border-b border-transparent group-hover:border-slate-300 pb-2 transition-all">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="inline-flex items-center gap-6 text-red-600 bg-red-50 p-6 border-l-[4px] border-red-600 shadow-xl shadow-red-100/20">
          <AlertCircle className="w-6 h-6" />
          <span className="text-2xl font-bold uppercase tracking-wide italic">
            *明确告知：风格锁定后，主视觉大改需重新排期
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Page9 = () => {
  const cases = [
    {
      selected: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507142207534.png",
      gallery: [
        { label: '背景', img: 'https://raw.githubusercontent.com/topvinci-art/images/main/20260507135937629.png', id: 'c1-bg' },
        { label: '标题字/装饰', img: 'https://raw.githubusercontent.com/topvinci-art/images/main/20260507140018866.png', id: 'c1-title' },
        { label: '组件', img: 'https://raw.githubusercontent.com/topvinci-art/images/main/20260507140031296.png', id: 'c1-comp' },
        { label: '单独生成组件', img: 'https://raw.githubusercontent.com/topvinci-art/images/main/20260507140042840.png', id: 'c1-extra' }
      ],
      prompts: [
        "将主视觉中间的大背景模块组件拆分出来,不带任何文字",
        "将图中每个模块组件拆解为单独的 UI 资源。要求：所有组件去掉文字，保持当前设计，高细节纹理，背景统一为纯黑以便切图。",
        "将主视觉中间的标题/装饰元素单独拆分出来,不要任何文字",
        "根据主视觉风格，生成系列UI组件资源，包含：按钮/背景框；颜色：墨绿、朱红、黄、米白。要求：所有组件去掉文字，同层级按钮组件大小保持统一。背景统一为纯黑以便切图。"
      ]
    },
    {
      selected: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507141627199.png",
      gallery: [
        { label: '组件', img: 'https://raw.githubusercontent.com/topvinci-art/images/main/20260507141657657.png', id: 'c2-comp' }
      ],
      prompts: [
        "将图中每个组件拆解为单独的 UI 资源。包含以下独立元素：1.一个无文字的大背景外框组件(左右下角玫瑰装饰保留) 2.一个无文字的卡片背景组件(保留框内模糊场景,不要金属外框,1:1) 3.一个无文字按钮(确认合成的按钮)。 4.一个分割线装饰(合成数量左右的装饰) 5.一个关闭按钮 6.两个打勾按钮(一个灰色,一个金色) 要求：所有组件去掉文字，保持当前设计，高细节纹理，背景统一为纯黑以便切图。"
      ]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ url: string, label: string, id: string } | null>(null);
  
  const current = cases[activeIndex];
  const nextCase = () => setActiveIndex((prev) => (prev + 1) % cases.length);
  const prevCase = () => setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);

  return (
    <div className="h-full p-10 md:p-14 flex flex-col bg-white overflow-hidden relative">
      <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6 shrink-0 relative z-10">
        <div>
          <span className="text-slate-400 font-bold text-xs tracking-[0.4em] uppercase mb-2 block">Stage 04</span>
          <h2 className="text-5xl font-light text-slate-900 tracking-tight">组件拆分与质量处理</h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            <button 
              onClick={prevCase}
              className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-blue-600"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center text-slate-300 font-mono text-sm tracking-widest px-1">
              0{activeIndex + 1} / 0{cases.length}
            </div>
            <button 
              onClick={nextCase}
              className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-blue-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <Layers className="text-slate-200 w-8 h-8 shrink-0" />
        </div>
      </div>

      {/* Top Section: Images */}
      <motion.div 
        key={`images-${activeIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-stretch gap-8 mb-8 shrink-0 h-[32%] min-h-0"
      >
        {/* Left: Selected Concept */}
        <div className="w-[30%] flex flex-col gap-3 min-h-0">
          <div className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Target className="w-3 h-3 text-blue-500" />
            选定方案
          </div>
          <motion.div 
            layoutId={`main-concept-p9-${activeIndex}`}
            onClick={() => setSelectedImage({ url: current.selected, label: '选定方案', id: `main-concept-p9-${activeIndex}` })}
            className="flex-1 bg-slate-50 rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm flex items-center justify-center p-3 cursor-pointer group"
          >
            <motion.img 
              layoutId={`img-main-concept-p9-${activeIndex}`}
              src={current.selected} 
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Center: Arrow */}
        <div className="flex items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shadow-inner">
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* Right: Gallery Grid */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          <div className={`grid ${current.gallery.length === 1 ? 'grid-cols-1 w-[25%]' : 'grid-cols-4'} gap-3 h-full`}>
            {current.gallery.map((item, idx) => (
              <div key={`${item.id}-${activeIndex}`} className="flex flex-col gap-2 min-h-0">
                <div className="text-sm font-bold text-slate-400 text-center uppercase tracking-widest truncate shrink-0">{item.label}</div>
                <motion.div 
                  layoutId={`${item.id}-${activeIndex}`}
                  onClick={() => setSelectedImage({ url: item.img, label: item.label, id: `${item.id}-${activeIndex}` })}
                  className="flex-1 bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all p-2 flex items-center justify-center group cursor-pointer"
                >
                  <motion.img 
                    layoutId={`img-${item.id}-${activeIndex}`}
                    src={item.img} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Section: Prompts */}
      <div className="flex gap-12 w-full pt-2 pb-10 mt-auto">
        <motion.div 
          key={`prompts-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`grid ${current.prompts.length === 1 ? 'grid-cols-1 w-[55%]' : 'grid-cols-2'} gap-x-8 gap-y-20 flex-1`}
        >
          {current.prompts.map((prompt, pIdx) => {
            const colors = ['text-blue-500', 'text-emerald-500', 'text-amber-500', 'text-rose-500'];
            const bgColors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
            const titles = ['背景拆分Prompt', '组件Prompt', '标题/装饰拆分Prompt', '单独生成组件Prompt'];
            
            // If Case 2 (activeIndex 1) and only one prompt, use specific title
            const title = (activeIndex === 1 && current.prompts.length === 1) ? '组件拆分Prompt' : titles[pIdx];
            const colorClass = colors[pIdx % colors.length];
            const bgColorClass = bgColors[pIdx % bgColors.length];

            return (
              <div key={pIdx} className="flex flex-col gap-2 w-full min-h-0">
                <div className={`text-sm font-bold ${colorClass} uppercase tracking-widest px-1 flex items-center gap-1.5 shrink-0`}>
                  <div className={`w-1 h-1 ${bgColorClass} rounded-full`} /> {title}
                </div>
                <PromptBlock className="flex-1 p-4" textClassName="text-base leading-relaxed">
                  {prompt}
                </PromptBlock>
              </div>
            );
          })}
        </motion.div>

        {/* Vertical Summary Table - Fixed Position */}
        <div className="w-[280px] shrink-0 flex flex-col gap-0 border-l border-slate-100 pl-12 self-end pb-12">
          <div className="bg-red-500 text-white text-[11px] font-bold px-4 py-2.5 self-start rounded-t-lg tracking-[0.2em] uppercase shadow-lg shadow-red-500/20">
            组件Bug处理
          </div>
          <div className="flex flex-col border border-slate-100 bg-slate-50/50 rounded-r-2xl rounded-bl-2xl overflow-hidden shadow-sm backdrop-blur-sm">
            {[
              { text: "透明背景无杂色/虚边", checked: true },
              { text: "清晰度达标", checked: true },
              { text: "颜色与整体一致", checked: true },
              { text: "图形比例正确无变形", checked: true },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`px-5 py-3.5 text-sm font-bold flex items-center justify-between border-b border-white hover:bg-white transition-all duration-300 group last:border-0 ${item.checked ? 'text-slate-700' : 'text-slate-400'}`}
              >
                 <span className="leading-tight">{item.text}</span>
                 {item.checked && <span className="text-red-500 font-serif text-lg transform group-hover:scale-125 transition-transform">☑️</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              layoutId={selectedImage.id}
              className="bg-white rounded-[2rem] shadow-2xl h-[75vh] w-auto max-w-[85vw] relative flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
               <motion.img 
                layoutId={`img-${selectedImage.id}`}
                src={selectedImage.url} 
                className="h-full w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page10 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 05</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">PS页面组装（主视觉）</h2>
      </div>
      <div className="h-14 flex items-center px-8 rounded-full bg-pink-500 text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(242,74,46,0.3)] shrink-0">
        <Zap className="w-5 h-5 mr-3" /> 卡点B — 主视觉确认
      </div>
    </div>

    <div className="max-w-4xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
        Workflow Checklist <div className="h-[1px] flex-1 bg-slate-100" />
      </h3>
      
      <div className="flex flex-col gap-8 mb-12">
        {[
          "将AI生成素材在PS中完整搭建",
          "需求方确认 (运营/产品确认后才进入下一阶段)",
        ].map((item, idx) => (
          <div key={idx} className="flex gap-10 group items-center">
            <span className="text-slate-200 font-light text-5xl group-hover:text-pink-500 transition-colors w-16">0{idx+1}</span>
            <p className="text-3xl text-slate-600 leading-tight border-b border-transparent group-hover:border-slate-300 pb-2 transition-all">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-600" />
          此节点变更原则：
        </div>
        <div className="border border-slate-200 overflow-hidden rounded-xl">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-10 py-6 text-lg font-bold text-slate-500 uppercase tracking-widest">变更内容</th>
              <th className="px-10 py-6 text-lg font-bold text-slate-500 uppercase tracking-widest">处理方式</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { content: "文字/颜色微调", method: "当轮消化", color: "text-slate-900" },
              { content: "局部布局调整", method: "评估工作量，告知影响", color: "text-slate-500" },
              { content: "整体风格推翻", method: "重新排期，走变更流程", color: "text-red-500" },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-8">
                  <span className="text-slate-900 font-medium text-2xl">{row.content}</span>
                </td>
                <td className="px-10 py-8">
                  <span className={`${row.color} text-xl font-medium`}>{row.method}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
);

const Page11 = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const galleryItems = [
    { id: 'p11-1', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507145000624.png", label: "玩法页面1" },
    { id: 'p11-2', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507145016783.png", label: "玩法页面2" },
    { id: 'p11-3', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507145030500.png", label: "榜单" },
    { id: 'p11-4', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507144931082.png", label: "弹窗" },
    { id: 'p11-5', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507145042680.png", label: "小窗" },
    { id: 'p11-6', img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260507145056872.png", label: "Banner" }
  ];

  return (
    <div className="h-full p-10 md:p-16 flex flex-col bg-white">
      <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
        <div>
          <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 06</span>
          <h2 className="text-6xl font-light text-slate-900 tracking-tight">完整页面搭建</h2>
        </div>
        <div className="h-14 flex items-center px-8 rounded-full bg-pink-500 text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(242,74,46,0.3)] shrink-0">
          <Zap className="w-5 h-5 mr-3" /> 卡点C — 完整页面/弹窗/资源位确认
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="max-w-4xl mb-12">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            Workflow Checklist <div className="h-[1px] flex-1 bg-slate-100" />
          </h3>
          
          <div className="flex flex-col gap-10">
            {[
              "所有页面完成后截图给产品/运营方确认",
              "再次确认页面是否有缺漏（空数据态、加载态）"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-10 group items-center">
                <span className="text-slate-200 font-light text-5xl group-hover:text-pink-500 transition-colors w-16">0{idx+1}</span>
                <p className="text-3xl text-slate-600 leading-tight border-b border-transparent group-hover:border-slate-300 pb-2 transition-all">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="inline-flex items-center gap-6 text-red-600 bg-red-50 p-6 border-l-[4px] border-red-600 shadow-xl shadow-red-100/20">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <span className="text-2xl font-bold uppercase tracking-wide italic">此节点后仅接受标注错误修正</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-3">
              <span className="text-lg font-bold text-slate-400 uppercase tracking-widest text-center truncate px-1">{item.label}</span>
              <motion.div 
                layoutId={item.id}
                onClick={() => setSelectedId(item.id)}
                className="aspect-[3/4] bg-slate-50 border border-slate-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all group relative"
              >
                <motion.img 
                  layoutId={`img-${item.id}`}
                  src={item.img} 
                  className="w-full h-full object-contain p-1" 
                  referrerPolicy="no-referrer" 
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={selectedId}
              className="bg-white rounded-3xl shadow-2xl h-[90vh] w-auto max-w-[90vw] relative flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
               <motion.img 
                layoutId={`img-${selectedId}`}
                src={galleryItems.find(item => item.id === selectedId)?.img} 
                className="h-full w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page12 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 07</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">图层规范整理与切图</h2>
      </div>
    </div>

    <div className="max-w-4xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
        Workflow Checklist <div className="h-[1px] flex-1 bg-slate-100" />
      </h3>
      
      <div className="flex flex-col gap-10">
        {[
          { main: "删除所有隐藏的废弃图层" },
          { main: "合并不需要单独切图的装饰元素" },
          { main: "按命名规范检查并修正所有切图图层名称", sub: "（设计开发的项目命名：全小写，下划线分隔，无中文无空格）" },
          { main: "建立PSD图层组结构，与页面区块对应" }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-10 group items-start">
            <span className="text-slate-200 font-light text-5xl group-hover:text-pink-500 transition-colors w-16 leading-none">0{idx+1}</span>
            <div className="border-b border-transparent group-hover:border-slate-300 pb-2 transition-all flex-1">
              <p className="text-3xl text-slate-600 leading-tight">{item.main}</p>
              {item.sub && (
                <p className="text-lg text-slate-400 mt-2 font-light">{item.sub}</p>
              )}
              
              {/* Branch for Hierachy Index under Item 04 */}
              {idx === 3 && (
                <div className="mt-12 ml-6 border-l-2 border-slate-100 pl-10 relative py-2">
                  <div className="absolute top-0 left-0 w-8 h-[2px] bg-slate-100 -translate-x-full mt-6" />
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-8">
                    Layer Hierarchy Reference
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {[
                      "主标题",
                      "固定背景/头图",
                      "顶部导航 / 二级导航栏",
                      "组件板块（背景）",
                      "组件内容（文案/容器/装饰）",
                      "交互元素层（按钮/图标）",
                      "文字层（标题/正文/说明）",
                      "装饰元素层（光效/粒子/底纹）"
                    ].map((text, hIdx) => (
                      <div key={hIdx} className="flex gap-4 items-center group/h">
                        <span className="text-pink-500 font-mono text-sm tracking-tighter opacity-40 group-hover/h:opacity-100 transition-opacity">
                          [{String(hIdx + 1).padStart(2, '0')}]
                        </span>
                        <p className="text-base text-slate-500 font-light group-hover/h:text-slate-900 transition-colors">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Page13 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 08</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">PSD → Figma 导入与交付</h2>
      </div>
      <div>
      </div>
    </div>

    <div className="max-w-4xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
        Workflow Checklist <div className="h-[1px] flex-1 bg-slate-100" />
      </h3>
      
      <div className="flex flex-col gap-10">
        {[
          "使用 PSD to Figma 插件导入",
          "检查导入结果：字体、颜色、间距行距是否正确",
          "调整还原细节（重点检查：圆角、阴影、渐变）",
          "设置页面固定板块子母组件方便后续批量改动",
          "分享Figma文件链接",
          "字体文件打包或标注字体名称+字重",
          "涉及原画/动效的活动另外确认素材交付时间。"
        ].map((item, idx) => (
          <div key={idx} className="flex gap-10 group items-center">
            <span className="text-slate-200 font-light text-5xl group-hover:text-pink-500 transition-colors w-16">0{idx+1}</span>
            <p className="text-3xl text-slate-600 leading-tight border-b border-transparent group-hover:border-slate-300 pb-2 transition-all">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Page14 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-white">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Stage 09</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">视觉走查 & 上线维护</h2>
      </div>
      <Clock className="text-slate-200 w-8 h-8 shrink-0 mt-8" />
    </div>

    <div className="grid grid-cols-2 gap-10">
        {[
          { label: "还原度核查", desc: "对照Figma稿截图比对，标注所有偏差点（间距/字号/色值）" },
          { label: "边界情况", desc: "检查长文案截断、空数据态、加载态是否有设计方案" },
          { label: "高质量Prompt记录", desc: "注明效果评级：A/B" },
          { label: "活动结束复盘", desc: "收集运营侧反馈，记录视觉调整历史/流程问题，沉淀优化sop" },
        ].map((item, idx) => (
          <Card key={idx} className="p-12 flex flex-col justify-center border-slate-200 relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-slate-50 font-black text-6xl group-hover:text-blue-50 transition-colors">0{idx+1}</div>
             <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.label}</h3>
             <p className="text-base text-slate-500 leading-relaxed">{item.desc}</p>
          </Card>
        ))}
    </div>
  </div>
);

const Page15 = () => (
  <div className="h-full p-10 md:p-16 flex flex-col bg-slate-50/50">
    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 h-[160px]">
      <div>
        <span className="text-slate-400 font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Ongoing Updates</span>
        <h2 className="text-6xl font-light text-slate-900 tracking-tight">Prompt模板库（持续更新）</h2>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 overflow-auto bg-white p-10 border border-slate-200 shadow-sm">
      <div className="bg-slate-50 border border-slate-200 shadow-inner flex items-center justify-center p-4 relative overflow-hidden group">
        <img 
          src="https://raw.githubusercontent.com/topvinci-art/images/refs/heads/main/image%2015.png" 
          alt="Prompt Template Preview" 
          className="w-full h-full object-contain [image-rendering:-webkit-optimize-contrast] relative z-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
           <div className="border border-slate-100 p-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Activity Type</span>
              <span className="text-sm font-bold text-slate-900">直播玩法 / Live Feature</span>
           </div>
           <div className="border border-slate-100 p-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Style tags</span>
              <span className="text-sm font-bold text-slate-900">8/90s 民国风</span>
           </div>
        </div>

        <PromptBlock>
           [根据图1这个原型图,完成h5玩法活动设计.{"\n"}
           采用民国风的设计{"\n"}
           配色:朱红色,金色,墨绿色{"\n"}
           元素:8/90年代歌舞厅的舞台设计{"\n"}
           标题字做特殊设计{"\n"}
           风格:二次元游戏,民国二次元游戏UI{"\n"}
           主要受众为二次元/乙女游戏/女性向群体.]
        </PromptBlock>

        <div className="mt-auto pt-10 flex items-center justify-between border-t border-slate-100">
           <div className="flex items-center gap-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">效果评分</div>
              <span className="text-sm font-bold text-blue-600">[4分]</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <div key={star} className={`w-3 h-3 rounded-full ${star <= 4 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                ))}
              </div>
           </div>
           <div className="text-[11px] text-slate-400 font-bold max-w-[200px] text-right">
              备注：[特别有效的关键词：指定场景，例如歌舞厅场景]
           </div>
        </div>
      </div>
    </div>
  </div>
);

const Page16 = () => (
  <div className="h-full bg-[#f8f9fa] flex flex-col justify-center items-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center z-10"
    >
      <div className="mb-6 flex justify-center">
        <div className="w-12 h-[2px] bg-blue-600" />
      </div>
      <h2 className="text-9xl font-light tracking-tighter text-slate-900 mb-6 uppercase">
        AI辅助案例
      </h2>
      <p className="text-sm text-slate-400 font-bold tracking-[0.6em] uppercase">CASE STUDIES & APPLICATIONS V1.0</p>
    </motion.div>
  </div>
);

const CasePage = ({ title, tool, prompt, themes, leftImage, rightImages, promptTextClassName, leftLabel, rightLabel, subLabel, subImages, extraContent, leftImageTitle, subImageLabels }: { 
  title: string, 
  tool: string, 
  prompt: string | React.ReactNode, 
  themes?: any,
  leftImage?: string,
  rightImages?: string[],
  promptTextClassName?: string,
  leftLabel?: string,
  rightLabel?: string,
  subLabel?: string,
  subImages?: string[],
  extraContent?: React.ReactNode,
  leftImageTitle?: string,
  subImageLabels?: string[]
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  
  const allImages: { id: string, url: string, label?: string }[] = [
    ...(leftImage ? [{ id: 'left-img', url: leftImage, label: leftImageTitle }] : []),
    ...(rightImages ? rightImages.map((url, i) => ({ id: `right-img-${i}`, url })) : []),
    ...(subImages ? subImages.map((url, i) => ({ id: `sub-img-${i}`, url, label: subImageLabels?.[i] })) : [])
  ];

  return (
    <div className="h-full p-10 md:p-16 bg-white flex flex-col font-sans relative overflow-hidden">
      <div className="flex justify-between items-end mb-12 border-b border-blue-100 pb-8">
        <h2 className="text-6xl font-light tracking-tight text-slate-900 leading-none">{title}</h2>
        <div className="flex gap-3">
          {tool.split(/[、,]/).map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#99f6e4]/30 via-[#fef9c3]/30 to-[#bae6fd]/30 backdrop-blur-xl border border-white rounded-full py-2 px-8 flex items-center justify-center shadow-sm">
              <span className="text-xl font-normal text-slate-500 tracking-tight">
                {item.trim()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-16 flex-1 overflow-hidden">
        <div className="col-span-4 flex flex-col pt-6 relative overflow-y-auto pr-4 scrollbar-hide">
           {leftLabel && (
             <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-6 border-b border-slate-100 pb-2">{leftLabel}</h4>
           )}
           <div className="mb-3">
              {typeof prompt === 'string' ? (
                <PromptBlock textClassName={promptTextClassName}>
                  {prompt}
                </PromptBlock>
              ) : (
                <div className="flex flex-col gap-2">
                  {prompt}
                </div>
              )}
           </div>

           {subLabel && (
             <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-3 border-b border-slate-100 pb-1 mt-2">{subLabel}</h4>
           )}
           
           {subImages && (
             <>
               <motion.div 
                 layoutId="sub-folder-bg"
                 onClick={() => setIsFolderOpen(true)}
                 className="bg-slate-50 border border-slate-100 rounded-[2rem] p-4 cursor-pointer hover:bg-slate-100 transition-colors mb-6 group/folder"
               >
                 <div className="grid grid-cols-2 gap-2 aspect-square">
                    {subImages.slice(0, 4).map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden relative shadow-sm ring-1 ring-black/5">
                        <motion.img 
                          layoutId={`folder-img-${idx}`}
                          src={img} 
                          className="w-full h-full object-cover transition-transform group-hover/folder:scale-110 duration-500" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                    ))}
                 </div>
                 <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collection</span>
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{subImages.length} ITEMS</span>
                 </div>
               </motion.div>

               <AnimatePresence>
                 {isFolderOpen && (
                   <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-20">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFolderOpen(false)}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                      />
                      
                      <motion.div 
                        layoutId="sub-folder-bg"
                        className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 w-full max-w-4xl relative z-10 shadow-2xl flex flex-col items-center pointer-events-none"
                      >
                         <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 pointer-events-auto overflow-y-auto max-h-[70vh] p-2 scrollbar-hide">
                           {subImages.map((img, idx) => (
                             <motion.div
                               key={idx}
                               layoutId={idx < 4 ? `folder-img-${idx}` : undefined}
                               onClick={() => setSelectedId(`sub-img-${idx}`)}
                               className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 cursor-pointer hover:scale-105 transition-transform relative group"
                             >
                                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                {subImageLabels && subImageLabels[idx] && (
                                  <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 shadow-sm transition-opacity group-hover:bg-white/90">
                                    <span className="text-[10px] font-bold text-slate-900 tracking-wider">
                                      {subImageLabels[idx]}
                                    </span>
                                  </div>
                                )}
                             </motion.div>
                           ))}
                         </div>
                         
                         <button 
                           onClick={() => setIsFolderOpen(false)}
                           className="mt-12 pointer-events-auto bg-black text-white hover:bg-slate-800 px-8 py-3 rounded-full font-bold tracking-widest text-xs transition-all shadow-xl flex items-center gap-2"
                         >
                            <X className="w-4 h-4" />
                            CLOSE FOLDER
                         </button>
                      </motion.div>
                   </div>
                 )}
               </AnimatePresence>
             </>
           )}

           {extraContent}

           {leftImage && (
             <div className="flex flex-col gap-4 mb-6">
               {leftImageTitle && (
                 <h4 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-2">{leftImageTitle}</h4>
               )}
               <motion.div 
                 layoutId="left-img"
                 onClick={() => setSelectedId('left-img')}
                 className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-all"
               >
                 <motion.img 
                   layoutId="img-left-img"
                   src={leftImage} 
                   alt="Reference" 
                   className="max-w-full h-auto object-contain" 
                   referrerPolicy="no-referrer" 
                 />
               </motion.div>
             </div>
           )}

           {themes && (
             <div className="mt-auto">
               <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-3 border-b border-slate-100 pb-2 text-left">5个主题，替换对应关键词</h4>
               <div className="flex flex-col gap-0.5">
                  {themes.map((t: any, i: number) => (
                     <div key={i} className="flex items-baseline gap-3 border-b border-slate-50/50 pb-0.5 text-wrap last:border-0">
                      <span className="text-[10px] font-mono text-blue-600 shrink-0">[{t.key}]</span>
                      <span className="text-[12px] font-light text-slate-800 truncate">{t.val}</span>
                    </div>
                  ))}
               </div>
             </div>
           )}
        </div>

        <div className={`col-span-8 flex flex-col pt-6 ${rightImages?.length === 1 ? 'overflow-hidden' : 'overflow-y-auto'} px-2 scrollbar-hide`}>
           {rightLabel && (
             <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-8 border-b border-slate-100 pb-2 shrink-0">{rightLabel}</h4>
           )}
           {rightImages ? (
             <div className={`${rightImages.length === 1 ? 'flex-1 min-h-0' : `grid ${rightImages.length === 3 ? 'grid-cols-3' : rightImages.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-6 h-full flex-1 min-h-0`}`}>
                {rightImages.map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    layoutId={`right-img-${idx}`}
                    onClick={() => setSelectedId(`right-img-${idx}`)}
                    className={`${rightImages.length === 1 ? 'h-full w-full' : (rightImages.length === 3 && idx === 0) ? 'col-span-2 row-span-2 h-full' : 'aspect-square'} bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden flex items-center justify-center p-4 cursor-pointer hover:shadow-xl transition-all`}
                  >
                     <motion.img 
                       layoutId={`img-right-img-${idx}`}
                       src={img} 
                       alt={`Asset ${idx}`} 
                       className="max-w-full max-h-full object-contain" 
                       referrerPolicy="no-referrer" 
                     />
                  </motion.div>
                ))}
             </div>
           ) : (
             <>
              <div className="grid grid-cols-2 gap-6 h-1/2">
                <ImagePlaceholder label="REF_LAYOUT_01" className="h-full bg-slate-50" />
                <ImagePlaceholder label="PROCESS_ASSET_01" className="h-full bg-slate-50" />
              </div>
              <ImagePlaceholder label="FINAL_COMPOSITION_STATIC" className="flex-1 bg-slate-50 border-slate-200" />
             </>
           )}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={selectedId}
              className="bg-white rounded-[2.5rem] shadow-2xl relative flex items-center justify-center p-4"
              style={{ maxWidth: '95vw', maxHeight: '92vh' }}
              onClick={(e) => e.stopPropagation()}
            >
               <motion.img 
                layoutId={`img-${selectedId}`}
                src={allImages.find(img => img.id === selectedId)?.url} 
                className="max-w-full max-h-[88vh] object-contain rounded-[1.5rem] block"
                referrerPolicy="no-referrer"
              />
              {allImages.find(img => img.id === selectedId)?.label && (
                <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {allImages.find(img => img.id === selectedId)?.label}
                  </span>
                </div>
              )}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page17 = () => <CasePage 
  title="Banner ｜ 主播活动" 
  tool="GPT、即梦" 
  leftLabel="GPT生成提示词"
  rightLabel="即梦生成背景图后合成"
  prompt={`乙女游戏风格的医院诊室。室内从晴到黄昏色调医疗场景为主。但环境明显是医疗空间。室内有一张纯白的白色诊疗床，铺有淡色一次性医用床垫；旁边还金属柱性的医疗器械架，上面放着听诊器、血压计、温度计，消毒棉片、医用托盘取物，墙面上贴有淡蓝色的挂号板、病历文件夹、体温记录本，边桌上放置着医疗器具盒。角落里有带轮子的点滴架（输液架）、体重计、消毒液瓶。
房间背景地面图，颜色光泽进入，写实光线根设，繁星搭配可见一些淡粉乙女游戏特有的梦幻光，装饰细节再一些温暖乙女游戏的浪漫有的梦幻感，是将现实医疗场景描绘成背景，面风信任、抱布支味、复杂乙女游戏增帧画成风格。`}
  promptTextClassName="text-base"
  themes={[
    { key: "医生男友", val: "诊室里的心跳泄露" },
    { key: "加班夜归", val: "设计师男友的甜蜜突袭" },
    { key: "专属频道", val: "大小姐的甜蜜调教日" },
    { key: "专属男友", val: "夜间陪护套餐" },
    { key: "冬夜约定", val: "心锁的钥匙只给你" },
  ]}
  leftImage="https://raw.githubusercontent.com/topvinci-art/images/main/20260505025736744.png"
  rightImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505025816610.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505025816630.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505025816651.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505025816666.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505025816690.png"
  ]}
/>;

const Page18 = () => <CasePage 
  title="H5 ｜ 秋日欢庆会" 
  tool="GPT、豆包" 
  leftLabel="Prompt-GPT生成提示词"
  subLabel="豆包生成素材"
  rightLabel="合成搭建"
  prompt={`一张感恩节主题的二次元插画海报，不带人物，中间留白区域用于标题，背景为温暖秋季色调。整体画面充满了感恩、团圆和丰收的氛围。

1. 视觉元素: 桌上摆放着丰盛的感恩节晚宴，包括金黄诱人的烤火鸡、南瓜派、丰富的浆果装饰。周围环绕着精美的礼盒、温暖的烛光、点缀其间的金色铃铛。
2. 颜色: 橙色、金色、棕色、酒红色。
3. 风格: 日系二次元插画风格，线条细腻，色彩明快。`}
  subImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031842606.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031856070.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031910078.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031923301.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031935653.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031831585.png"
  ]}
  rightImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505031945189.png"
  ]}
/>;

const Page19 = () => <CasePage 
  title="H5 ｜ 声音宝藏馆" 
  tool="GPT、MJ、Gemini" 
  leftLabel="Prompt-GPT生成提示词"
  subLabel="Gemini/MJ生成素材"
  rightLabel="合成搭建"
  prompt={<>
    <CollapsiblePrompt 
      title="MJ-植物提示词" 
      content="A large sweeping green palm frond, Areca palm leaf, acting as a foreground framing element, slightly out of focus with depth of field effect. Soft cinematic lighting, warm undertones. Exquisite 2D game Ul asset, Otome game style, Japanese thick painting style. Isolated on transparent background. --s 750 --niji 6" 
    />
    <CollapsiblePrompt 
      title="MJ-拱门素材提示词" 
      content="A vertical 2D game Ul frame for a leaderboard, Otome game style. The ornate header features a winged golden sun disk with the Eye of Horus made of glowing blue sapphire in the center, flanked by golden cobras. The side pillars are stylized lotus columns intertwined with glowing golden musical staves and floating notes. The bottom base has a golden scarab motif supporting the structure. The inner background area is a semi-transparent deep blue gradient with subtle ancient Egyptian papyrus texture, clean for text. Elegant, glowing accents, isolated on transparent background. --s 750 --niji 7" 
    />
    <CollapsiblePrompt 
      title="MJ-大海背景提示词" 
      content="A breathtaking landscape illustration in Otome game CG style, Japanese thick painting. Romantic sunset over a vast Egyptian desert. The sky is a dramatic gradient of fiery orange, rose pink, and deep royal blue with first stars appearing. Silhouettes of ancient pyramids and ruined temple columns are in the far distance. The undulating sand dunes are bathed in warm, golden hour light, casting long purple shadows. Magical, shimmering golden musical notes and flowing staves float in the air like sparkling dust. Ethereal, glowing blue and gold transparent lotus flowers made of light bloom across the sand. A sense of wonder, magic, and anticipation. Wide angle view, highly detailed, cinematic lighting. --niji 6 --ar 16:9 --s 750" 
    />
    <CollapsiblePrompt 
      title="Gemini-音乐钥匙提示词" 
      content="按照参考的原画风格，生成五把钥匙，分别是:国风/摇滚/说唱/R&B/民谣。 每把钥匙对应的主题色:摇滚-黄色、说唱蓝色、R&B紫色、国风橙色、民谣绿色" 
    />
  </>}
  subImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505034720003.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505034720039.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505034720108.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505034742978.png"
  ]}
  extraContent={
    <div className="mt-8 pt-4 border-t border-slate-100">
      <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-4">音乐钥匙参考图</h4>
      <div className="rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer hover:shadow-xl transition-all group/ref">
        <img 
          src="https://raw.githubusercontent.com/topvinci-art/images/main/20260505051211446.png" 
          alt="Music Key Reference"
          className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          onClick={() => {
            const event = new CustomEvent('open-lightbox', { 
              detail: { img: "https://raw.githubusercontent.com/topvinci-art/images/main/20260505051211446.png", label: "音乐钥匙参考图" } 
            });
            window.dispatchEvent(event);
          }}
        />
      </div>
    </div>
  }
  rightImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505034256455.png"
  ]}
/>;

const Page20 = () => <CasePage 
  title="H5 ｜ 星光小卖部" 
  tool="即梦、gemini、MJ、GPT" 
  leftLabel="Prompt-GPT生成提示词"
  subLabel="同一段提示词各AI效果图"
  rightLabel="合成搭建"
  leftImageTitle="参考图"
  leftImage="https://raw.githubusercontent.com/topvinci-art/images/main/20260505051658172.png"
  prompt={`春日街景，法式清新风格零食店立面，小型两层建筑，白色外墙搭配嫩粉色装饰线条，薄荷绿色木门与橱窗框架，拱形窗户，窗台摆满春日花朵，藤蔓植物沿墙生长。木质遮阳棚下是温馨的零食店橱窗，展示糖果罐、彩色零食包装、巧克力盒、薯片袋、零食礼盒。门口摆放花盆与花箱，街道干净明亮。
整体配色嫩粉色、白色、薄荷绿色为主，法式小镇氛围，春天阳光柔和洒落，空气感通透。
乙女游戏背景CG风格，日系视觉小说背景插画，高完成度背景美术，精致细腻线条，柔和光影，干净清新的色彩设计，梦幻氛围，高细节场景插画，画面稳定构图，适合作为恋爱游戏场景背景。
画面比例9:16`}
  subImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505051912803.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505051931568.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505051953590.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505052025652.png"
  ]}
  subImageLabels={["即梦", "Gemini", "MJ", "GPT"]}
  rightImages={[
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260505052050642.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260507142831971.png",
    "https://raw.githubusercontent.com/topvinci-art/images/main/20260507142848497.png"
  ]}
/>;

const Page21 = () => (
  <div className="h-full flex flex-col justify-center items-center px-16 md:px-32 relative overflow-hidden bg-[#f0f9f6]">
    {/* High-fidelity mesh gradient background - Crystalline & Clear palette */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Mint Crystal Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['-10%', '5%', '-10%'],
          y: ['-5%', '10%', '-5%'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[100vw] h-[100vw] bg-[#99f6e4] blur-[140px] rounded-full"
      />
      
      {/* Clear Yellow Light */}
      <motion.div 
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['0%', '10%', '0%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#fef9c3] blur-[160px] rounded-full"
      />
      
      {/* Sky Blue Depth */}
      <motion.div 
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] right-[10%] w-[90vw] h-[90vw] bg-[#bae6fd] blur-[180px] rounded-full"
      />
    </div>

    {/* The signature large white elliptical "surface" with soft glow/feathered edge */}
    <motion.div 
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[42%] w-[200vw] aspect-square bg-white rounded-[100%] z-5"
      style={{
        boxShadow: `
          0 -20px 40px rgba(255, 255, 255, 0.8),
          0 -40px 80px rgba(255, 255, 255, 0.4),
          0 -60px 120px rgba(255, 255, 255, 0.2)
        `,
        filter: 'blur(0.5px)'
      }}
    />

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1 }}
      className="relative z-10 text-center flex flex-col items-center"
    >
      <div className="flex flex-col items-center mb-14">
        <div className="w-12 h-[1px] bg-slate-900/10 mb-6" />
        <span className="text-[11px] font-bold text-slate-400 tracking-[0.7em] uppercase">猫耳FM 设计团队</span>
      </div>
      
      <h1 className="text-[8vw] font-light leading-[1.05] tracking-tighter text-slate-900 mb-12">
        感谢倾听
      </h1>

      <div className="flex flex-col items-center gap-5 mt-16">
        <div className="flex items-center gap-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Presenter</span>
          <div className="h-[1px] w-8 bg-slate-100" />
          <span className="text-2xl font-light tracking-tight text-slate-800">如意</span>
        </div>
      </div>
    </motion.div>

    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
      <div className="w-[1px] h-12 bg-gradient-to-b from-slate-200 to-transparent" />
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">The End</span>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [globalLightbox, setGlobalLightbox] = useState<{ img: string, label: string } | null>(null);
  const totalPages = 22;

  useEffect(() => {
    const handleOpenLightbox = (e: any) => setGlobalLightbox(e.detail);
    window.addEventListener('open-lightbox', handleOpenLightbox);
    return () => window.removeEventListener('open-lightbox', handleOpenLightbox);
  }, []);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextPage();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pages = [
    <Page1 />, <Page2 />, <Page3 />, <Page4 />, <Page5 />, 
    <Page6 />, <Page7 />, <Page7_5 />, <Page8 />, <Page9 />, <Page10 />,
    <Page11 />, <Page12 />, <Page13 />, <Page14 />, <Page15 />,
    <Page16 />, <Page17 />, <Page18 />, <Page19 />, <Page20 />, <Page21 />
  ];

  return (
    <div className="h-screen w-screen bg-[#F3F4F6] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden flex flex-col">
      {/* Top Banner UI */}
      <div className="h-12 bg-white border-b border-slate-200 flex items-center px-8 justify-between relative z-50">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200"></div>
          <span className="ml-4 text-xs font-bold text-slate-400 tracking-[0.4em] uppercase">AI_Design_Workflow_SOP_V1.1</span>
        </div>
        <div className="flex gap-6 text-sm font-bold text-slate-400 uppercase tracking-tighter">
          <span>Page {currentPage + 1} / {totalPages}</span>
          <span className="text-blue-600 opacity-60">Scale: Auto</span>
        </div>
      </div>

      {/* Vertical Page Slider Indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-2 group p-2">
        {pages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`group/dot relative flex items-center justify-center py-1`}
            aria-label={`Go to page ${idx + 1}`}
          >
            <div 
              className={`w-1 rounded-full transition-all duration-300 ease-out ${
                currentPage === idx 
                  ? 'h-6 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' 
                  : 'h-1.5 bg-slate-300 group-hover/dot:bg-slate-400 group-hover/dot:h-3'
              }`}
            />
            {/* Tooltip on hover */}
            <div className="absolute right-6 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-100 shadow-sm">
              PAGE {String(idx + 1).padStart(2, '0')}
            </div>
          </button>
        ))}
      </div>

      <main className="flex-1 relative z-10 flex items-center justify-center overflow-hidden p-4 md:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full max-w-[95vw] max-h-[92vh] shadow-[0_40px_120px_rgba(0,0,0,0.08)] bg-white border border-slate-100 ring-1 ring-slate-200/50"
          >
            {pages[currentPage]}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Footer Navigation Overlay */}
      <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/20 p-1.5 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] rounded-full">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-10 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="px-6 h-10 flex items-center gap-3 bg-slate-50/50 rounded-full border border-slate-100/50">
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(38,120,242,0.4)] animate-pulse" />
            <span className="text-xs font-bold text-slate-900 tracking-widest">
              {String(currentPage + 1).padStart(2, '0')}
              <span className="text-slate-300 mx-2 uppercase font-light">/</span>
              <span className="text-slate-400">{String(totalPages).padStart(2, '0')}</span>
            </span>
          </div>

          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-10 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
      </footer>

      {/* Global Lightbox for all other images */}
      <AnimatePresence>
        {globalLightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-10 cursor-zoom-out"
            onClick={() => setGlobalLightbox(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[95vh] max-w-[95vw] shadow-2xl rounded-3xl overflow-hidden bg-white/10 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={() => setGlobalLightbox(null)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="h-[90vh] w-auto aspect-[3/4] bg-slate-900/50 flex items-center justify-center relative rounded-2xl">
                 <div className="flex flex-col items-center gap-4 text-white/20">
                    <Layout className="w-24 h-24 stroke-[1]" />
                    <span className="text-sm font-bold tracking-[0.5em] uppercase">{globalLightbox.label}</span>
                 </div>
                 {/* In a real app, we'd show the actual image here. 
                     Since these are placeholders, we show a stylish mock-up. */}
                 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-pink-500/10" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
