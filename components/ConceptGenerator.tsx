
import React, { useState } from 'react';
import { generateArchitecturalConcept } from '../services/gemini';
import { GlassPane } from './GlassPane';

export const ConceptGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);
    try {
      const res = await generateArchitecturalConcept(prompt);
      setImage(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <GlassPane className="p-8 flex flex-col justify-center gap-6 rounded-2xl">
        <h2 className="text-3xl font-light italic serif tracking-tighter text-white/90">GENERATE_CONCEPT</h2>
        <p className="text-sm text-white/40 leading-relaxed mb-4">
          Visualizing the unbuilt. Enter a spatial description to manifest a high-fidelity architectural rendering.
        </p>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your vision (e.g., 'Floating residential towers over a bioluminescent lake, glass and white polymer facade')"
          className="w-full h-40 bg-black/50 border border-white/10 p-4 mono text-[#00f0ff] focus:outline-none focus:border-[#00f0ff] resize-none"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/30 border border-[#00f0ff]/40 py-4 mono text-[#00f0ff] tracking-widest text-sm transition-all"
        >
          {loading ? 'VISUALIZING_LAYER_DATA...' : 'INITIALIZE_RENDER'}
        </button>
      </GlassPane>

      <div className="flex items-center justify-center">
        {image ? (
          <GlassPane className="w-full aspect-video rounded-2xl group relative">
            <img src={image} className="w-full h-full object-cover" alt="Generated architectural concept" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
               <a href={image} download="concept.png" className="bg-[#00f0ff] text-black px-6 py-2 mono text-xs font-bold">EXPORT_SPECIMEN</a>
            </div>
          </GlassPane>
        ) : (
          <div className="w-full aspect-video border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 mono text-xs animate-pulse">
            {loading ? 'COMPILING_VOXELS...' : 'WAITING_FOR_INPUT_SIGNAL'}
          </div>
        )}
      </div>
    </div>
  );
};
