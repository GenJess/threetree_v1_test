
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { GlassPane } from './components/GlassPane';
import { SpecimenGallery } from './components/SpecimenGallery';
import { AIAssistant } from './components/AIAssistant';
import { ConceptGenerator } from './components/ConceptGenerator';
import { DataViz } from './components/DataViz';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('INDEX');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial load for "tech" vibe
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#050508] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#00f0ff] animate-[loading_2s_infinite]" />
          </div>
          <span className="text-[10px] tracking-[5px] text-[#00f0ff] uppercase animate-pulse">Syncing Stratum...</span>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#050508] text-white relative overflow-hidden perspective-[2000px]">
      {/* Background elements */}
      <div className="ambient-mesh fixed inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,40,1)_0%,transparent_60%),conic-gradient(from_0deg_at_50%_50%,#000_0deg,#111_120deg,#001f3f_240deg,#000_360deg)] z-[-2] blur-[80px]" />
      <div className="scanlines fixed inset-0 pointer-events-none z-[999] opacity-30" />

      {/* Main Layout */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr_1fr] grid-rows-[15vh_1fr_15vh] gap-6 p-10 preserve-3d">
        
        {/* Top Left: Logo/Meta */}
        <GlassPane className="col-start-1 row-start-1 translate-z-12 rotate-x-[10deg] flex flex-col justify-center p-6 rounded-sm">
          <span className="text-[10px] text-[#00f0ff]/70 mono tracking-[3px] uppercase">Architectural ID: 90X</span>
          <h1 className="text-4xl italic font-light serif leading-none mt-1 mix-blend-overlay">VITREOUS<br/>STRATUM</h1>
          <span className="text-[8px] text-[#00f0ff]/50 mono mt-2 tracking-[1px]">POLYMER SPACES // DEPTH_MAP_V2</span>
        </GlassPane>

        {/* Center: Main Display Area */}
        <div className="col-start-1 md:col-start-2 row-start-1 row-end-4 preserve-3d transition-all duration-1000">
          {view === 'INDEX' && <SpecimenGallery />}
          {view === 'AI_CHAT' && <AIAssistant />}
          {view === 'LAB' && <ConceptGenerator />}
          {view === 'ANALYTICS' && (
             <div className="h-full flex flex-col gap-6">
                <DataViz stats={{ sustainability: 85, efficiency: 92, aesthetics: 78, innovation: 95 }} />
             </div>
          )}
          {view === 'WORKS' && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-6xl font-light serif italic mb-4">ARCHIVE_01</h2>
              <p className="max-w-md mono text-xs text-white/40 leading-relaxed">
                A repository of realized spatial constructs. Access restricted to tier-2 designers. 
                Use the AI interface to request specific documentation.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar: Control Monolith */}
        <nav className="col-start-1 md:col-start-3 row-start-2 row-end-3 translate-z-20 -rotate-y-[15deg] flex flex-col justify-center">
          <GlassPane className="flex flex-col rounded-3xl p-2 gap-1 border-white/5">
            {[
              { label: 'INDEX', key: 'INDEX', id: '01' },
              { label: 'WORKS', key: 'WORKS', id: '02' },
              { label: 'AI_LAB', key: 'LAB', id: '03' },
              { label: 'AI_CHAT', key: 'AI_CHAT', id: '04' },
              { label: 'METRICS', key: 'ANALYTICS', id: '05' },
            ].map((n) => (
              <button
                key={n.key}
                onClick={() => setView(n.key as AppView)}
                className={`
                  group text-right p-6 transition-all duration-300 rounded-2xl
                  ${view === n.key ? 'bg-white/10 text-[#00f0ff]' : 'hover:bg-white/5 hover:pr-10 text-white/50'}
                `}
              >
                <span className="block text-[8px] opacity-40 mono mb-1">{n.id}</span>
                <span className="text-lg mono tracking-widest">{n.label}</span>
              </button>
            ))}
          </GlassPane>
        </nav>

        {/* Bottom Left: Distortion Lens / Interaction Point */}
        <div className="col-start-1 row-start-3 self-center justify-self-center">
          <GlassPane 
            className="w-40 h-40 rounded-full flex items-center justify-center text-center p-4 cursor-pointer translate-z-32 animate-[breathe_8s_infinite_ease-in-out] hover:scale-110 active:scale-95 transition-transform"
            onClick={() => setView(view === 'AI_CHAT' ? 'INDEX' : 'AI_CHAT')}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 backdrop-blur-3xl hue-rotate-90" />
            <span className="relative text-[10px] text-white/60 mono leading-tight">
              {view === 'AI_CHAT' ? 'CLOSE_NEXUS' : 'ENTER_VOID'}
            </span>
          </GlassPane>
        </div>

        {/* Decorative Status Bar (Bottom Right) */}
        <GlassPane className="col-start-3 row-start-3 self-end p-4 flex items-center justify-between rounded-sm translate-z-10 rotate-x-[-10deg]">
           <div className="flex flex-col">
             <span className="text-[8px] text-white/30 mono">LATENCY: 14MS</span>
             <span className="text-[8px] text-[#00f0ff] mono">STABLE</span>
           </div>
           <div className="h-8 w-px bg-white/10 mx-4" />
           <div className="text-[10px] mono text-white/50">
             V.8.4.11
           </div>
        </GlassPane>

      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translateZ(128px) scale(1); }
          50% { transform: translateZ(128px) scale(1.05); }
        }
        .preserve-3d { transform-style: preserve-3d; }
        .serif { font-family: 'Space Grotesk', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
