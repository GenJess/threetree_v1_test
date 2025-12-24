
import React, { useState, useRef, useEffect } from 'react';
import { architecturalChat } from '../services/gemini';
import { ChatMessage } from '../types';
import { GlassPane } from './GlassPane';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Architectural Intelligence Online. How may I assist your spatial conceptualization?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await architecturalChat(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Error processing inquiry.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'The nexus connection is unstable. Please retry.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <GlassPane className="h-full flex flex-col p-6 max-w-2xl mx-auto rounded-xl">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="text-[#00f0ff] mono text-xs tracking-[4px] uppercase">Architectural_Intelligence_v3.0</h2>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded ${m.role === 'user' ? 'bg-white/10 border border-white/20' : 'bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-white/90'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#00f0ff]/10 px-4 py-2 rounded text-[#00f0ff] mono text-[10px] animate-pulse">
              ANALYZING_SPATIAL_DATA...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ENTER QUERY (e.g. 'Optimize flow in a polymer museum')"
          className="flex-1 bg-black/40 border border-white/10 px-4 py-3 text-sm mono text-[#00f0ff] focus:outline-none focus:border-[#00f0ff] transition-colors"
        />
        <button 
          onClick={handleSend}
          className="bg-white/10 hover:bg-[#00f0ff]/20 px-6 py-3 mono text-xs border border-white/20 hover:border-[#00f0ff] transition-all"
        >
          SEND
        </button>
      </div>
    </GlassPane>
  );
};
