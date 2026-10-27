import React from 'react';
import { BarChart3, ShieldCheck, PhoneCall, RefreshCw } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'ringkasan' | 'sop_jaringan';
  setActiveTab: (tab: 'ringkasan' | 'sop_jaringan') => void;
  onOpenSync: () => void;
  totalKasus: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSync,
  totalKasus,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white shadow-2xl transition-all"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
      aria-label="Navigasi Bawah Ponsel"
    >
      <div className="grid grid-cols-3 items-center px-2 py-1 max-w-md mx-auto">
        {/* Tab 1: Ringkasan */}
        <button
          onClick={() => {
            setActiveTab('ringkasan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all min-h-[48px] ${
            activeTab === 'ringkasan'
              ? 'text-emerald-400 font-bold bg-slate-800/80 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <BarChart3 className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-emerald-600 text-white text-[9px] font-black rounded-full leading-none">
              {totalKasus}
            </span>
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Ringkasan</span>
        </button>

        {/* Tab 2: SOP & Jaringan */}
        <button
          onClick={() => {
            setActiveTab('sop_jaringan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all min-h-[48px] ${
            activeTab === 'sop_jaringan'
              ? 'text-emerald-400 font-bold bg-slate-800/80 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight">SOP & Mitra</span>
        </button>

        {/* Emergency WhatsApp / Call Action */}
        <a
          href="https://wa.me/6281239288722?text=Halo%20Bidang%20PPPA%20Dinas%20PMDP3A%20Kabupaten%20Nagekeo,%20saya%20membutuhkan%20informasi%20layanan%20pengaduan%20kekerasan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all min-h-[48px] shadow-sm active:scale-95"
        >
          <PhoneCall className="w-5 h-5 text-white animate-pulse" />
          <span className="text-[11px] mt-1 tracking-tight">Hotline 24 Jam</span>
        </a>
      </div>
    </nav>
  );
};
