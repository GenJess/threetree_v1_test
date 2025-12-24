
import React from 'react';
import { Specimen } from '../types';
import { GlassPane } from './GlassPane';

const SPECIMENS: Specimen[] = [
  { id: '1', title: 'POLYMER_V01', type: 'Residential', image: 'https://picsum.photos/seed/arch1/800/600', description: 'Fluid living spaces using translucent resins.' },
  { id: '2', title: 'STRATUM_HUB', type: 'Commercial', image: 'https://picsum.photos/seed/arch2/800/600', description: 'A multi-layered urban intersection.' },
  { id: '3', title: 'VITREOUS_DOME', type: 'Cultural', image: 'https://picsum.photos/seed/arch3/800/600', description: 'Atmospheric dome for digital art exhibitions.' },
  { id: '4', title: 'RESIN_FLOW', type: 'Landscape', image: 'https://picsum.photos/seed/arch4/800/600', description: 'Erosion-inspired park system.' },
];

export const SpecimenGallery: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-12 gap-4 preserve-3d">
      <div className="col-start-5 col-end-7 row-start-1 row-end-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)] -translate-z-20 border-none" />
      
      {SPECIMENS.map((s, i) => {
        const placements = [
          "col-start-1 col-end-4 row-start-2 row-end-6 -rotate-y-[5deg] -translate-z-5",
          "col-start-3 col-end-7 row-start-5 row-end-8 rotate-y-[10deg] translate-z-10",
          "col-start-2 col-end-5 row-start-7 row-end-11 rotate-x-[10deg] translate-z-2",
          "col-start-4 col-end-6 row-start-1 row-end-3 -translate-z-10"
        ];
        
        return (
          <GlassPane key={s.id} className={`${placements[i % placements.length]} group cursor-pointer hover:z-50 hover:scale-105 hover:translate-z-24 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]`}>
            <div className="absolute inset-0 z-0">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 px-3 py-1 text-[10px] text-[#00f0ff] mono tracking-widest uppercase">
                {s.title} // {s.type}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </GlassPane>
        );
      })}
    </div>
  );
};
