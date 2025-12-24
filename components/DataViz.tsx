
import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GlassPane } from './GlassPane';

interface DataVizProps {
  stats: {
    sustainability: number;
    efficiency: number;
    aesthetics: number;
    innovation: number;
  };
}

export const DataViz: React.FC<DataVizProps> = ({ stats }) => {
  const data = useMemo(() => [
    { subject: 'Sustainability', A: stats.sustainability },
    { subject: 'Efficiency', A: stats.efficiency },
    { subject: 'Aesthetics', A: stats.aesthetics },
    { subject: 'Innovation', A: stats.innovation },
    { subject: 'Density', A: 75 }, // Mock
  ], [stats]);

  return (
    <GlassPane className="h-full w-full flex flex-col p-6 rounded-2xl">
      <h3 className="mono text-[10px] text-[#00f0ff] mb-4 tracking-widest uppercase">Structural_Analysis_Chart</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <Radar
              name="Structure"
              dataKey="A"
              stroke="#00f0ff"
              fill="#00f0ff"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map(d => (
          <div key={d.subject} className="flex flex-col">
            <span className="text-[8px] mono text-white/30">{d.subject}</span>
            <span className="text-xs mono text-[#00f0ff]">{d.A}%</span>
          </div>
        ))}
      </div>
    </GlassPane>
  );
};
