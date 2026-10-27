import React from 'react';
import { Shield, PhoneCall, RefreshCw, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: 'ringkasan' | 'sop_jaringan';
  setActiveTab: (tab: 'ringkasan' | 'sop_jaringan') => void;
  onOpenSync: () => void;
  onPrint: () => void;
  totalKasus: number;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSync,
  onPrint,
  totalKasus,
  lastUpdated,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md print:static print:bg-white print:text-black print:border-b-2 print:border-black">
      {/* Top emergency announcement bar */}
      <div className="bg-emerald-900/90 border-b border-emerald-800/60 px-3 sm:px-6 py-1.5 text-[11px] sm:text-xs text-emerald-100 flex items-center justify-between gap-2 print:hidden">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
          <span className="font-semibold text-emerald-200 truncate">
            LAYANAN DARURAT 24 JAM
          </span>
          <span className="text-emerald-400 hidden sm:inline">·</span>
          <span className="text-emerald-200/80 hidden sm:inline truncate">
            Kerahasiaan Terjamin (UU TPKS)
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 font-medium">
          <a
            href="tel:081239288722"
            className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors bg-emerald-800/80 px-2 py-0.5 rounded"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span className="font-bold">0812-3928-8722</span>
          </a>
          <span className="text-emerald-400/60 hidden md:inline">|</span>
          <span className="text-emerald-200 hidden md:inline">SAPA 129</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-md border border-emerald-500/30 flex-shrink-0">
              <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-400 truncate">
                <span>KABUPATEN NAGEKEO</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">Dinas PMDP3A</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 truncate">
                <span>SIPELKA PUBLIK</span>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Data Resmi
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Sistem Informasi PPA · Bidang PPPA Dinas PMDP3A
              </p>
            </div>
          </div>

          {/* Action buttons (optimized for touch on Android & iPhone) */}
          <div className="flex items-center gap-1.5 sm:gap-2 print:hidden overflow-x-auto no-scrollbar pt-1 sm:pt-0">
            <button
              onClick={onOpenSync}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-colors whitespace-nowrap min-h-[36px]"
              title="Perbarui atau unggah file CSV SIPELKA terbaru"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Sinkronisasi Data</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-colors whitespace-nowrap min-h-[36px]"
              title="Cetak Ringkasan Eksekutif Resmi"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Cetak</span>
            </button>

            <a
              href="https://wa.me/6281239288722?text=Halo%20Bidang%20PPPA%20Dinas%20PMDP3A%20Kabupaten%20Nagekeo,%20saya%20membutuhkan%20informasi%20layanan%20pengaduan%20kekerasan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap min-h-[36px]"
            >
              <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Lapor / Hotline</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation - Full responsive with horizontal scroll and safe touch targets */}
        <div className="mt-3 sm:mt-5 border-t border-slate-800 pt-2.5 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 print:hidden">
          <nav className="flex space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto" aria-label="Tabs Navigasi">
            <button
              onClick={() => setActiveTab('ringkasan')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                activeTab === 'ringkasan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-800'
              }`}
            >
              <span>1. Ringkasan Data</span>
              <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-semibold ${activeTab === 'ringkasan' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {totalKasus}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sop_jaringan')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                activeTab === 'sop_jaringan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-800'
              }`}
            >
              <span>2. SOP & JARINGAN</span>
              <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-semibold ${activeTab === 'sop_jaringan' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                12 Mitra
              </span>
            </button>
          </nav>

          <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Update: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
