import React from 'react';
import { Zap, Terminal, Eye, Cpu, Radio, ShieldCheck } from 'lucide-react';

export const MarqueeTape: React.FC = () => {
  const items = [
    { label: 'AIR-GAPPED OPTICAL STREAMS', icon: Radio },
    { label: '1D DEEP CONVNET NLP', icon: Cpu },
    { label: 'CUSTOMTKINTER DESKTOP', icon: Terminal },
    { label: 'COMPUTER VISION APERTURE', icon: Eye },
    { label: 'REED-SOLOMON PARITY FRAMES', icon: ShieldCheck },
    { label: 'VERIFIED REPOSITORIES ONLY', icon: Zap },
    { label: 'CS & ENGINEERING // KOKRAJHAR', icon: Terminal },
    { label: 'ZERO MARKETING FLUFF', icon: Zap },
  ];

  return (
    <div className="w-full bg-[#141413] border-y-2 border-[#141413] py-2.5 overflow-hidden select-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
      <div className="marquee-container flex items-center">
        <div className="marquee-content flex items-center gap-8 text-xs font-mono font-bold text-[#D7FF3F] tracking-wider uppercase">
          {items.concat(items).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 whitespace-nowrap px-2 group cursor-default transition-transform hover:scale-110"
              >
                <Icon className="w-3.5 h-3.5 text-[#F04828] group-hover:rotate-45 transition-transform" />
                <span className="hover:text-white transition-colors">{item.label}</span>
                <span className="text-[#FAF6EE]/40" aria-hidden="true">
                  //
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
