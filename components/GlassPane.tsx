
import React from 'react';

interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassPane: React.FC<GlassPaneProps> = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/5 backdrop-blur-[12px] 
        border border-white/10 border-t-white/30 
        shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)]
        transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
        overflow-hidden relative
        ${className}
      `}
    >
      <div className="absolute top-0 left-5 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00f0ff]/30 to-transparent opacity-30" />
      {children}
    </div>
  );
};
