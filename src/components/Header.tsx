import React from 'react';
import { Shield, PhoneCall, RefreshCw, Printer, AlertTriangle } from 'lucide-react';

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
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm print:static print:bg-white print:text-black print:border-b-2 print:border-black">
      {/* Top emergency announcement bar */}
      <div className="bg-emerald-900/80 border-b border-emerald-800/60 px-4 py-1.5 text-xs text-emerald-100 flex flex-wrap items-center justify-between gap-2 print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-emerald-200">LAYANAN DARURAT PPA KABUPATEN NAGEKEO 24 JAM</span>
          <span className="text-emerald-300 hidden sm:inline">·</span>
          <span className="text-emerald-300/90 hidden sm:inline">Kerahasiaan Terjamin Sesuai UU No. 12/2022 (UU TPKS)</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a
            href="tel:081239288722"
            className="flex items-center gap-1.5 font-semibold text-emerald-200 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hotline: 0812-3928-8722</span>
          </a>
          <span className="text-emerald-400 hidden md:inline">|</span>
          <span className="text-emerald-300 hidden md:inline">SAPA Nasional: 129</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-md shadow-emerald-950/40 border border-emerald-500/30 flex-shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                  PEMERINTAH KABUPATEN NAGEKEO
                </span>
                <span className="text-slate-500 text-xs hidden sm:inline">·</span>
                <span className="text-xs text-slate-300 hidden sm:inline">Dinas PMDP3A</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                SIPELKA PUBLIK
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Data Resmi
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Sistem Informasi Perlindungan Perempuan & Anak · Bidang PPPA Dinas PMDP3A
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-2 print:hidden">
            <button
              onClick={onOpenSync}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Perbarui atau unggah file CSV SIPELKA terbaru"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Sinkronisasi Data SIPELKA</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Cetak Ringkasan Eksekutif Resmi"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Cetak Ringkasan</span>
            </button>

            <a
              href="https://wa.me/6281239288722?text=Halo%20Bidang%20PPPA%20Dinas%20PMDP3A%20Kabupaten%20Nagekeo,%20saya%20membutuhkan%20informasi%20layanan%20pengaduan%20kekerasan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Lapor / Konsultasi Cepat</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation - HANYA Ringkasan dan SOP & JARINGAN */}
        <div className="mt-5 border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <nav className="flex space-x-2" aria-label="Tabs Navigasi">
            <button
              onClick={() => setActiveTab('ringkasan')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'ringkasan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span>1. Ringkasan Data SIPELKA</span>
              <span className={`text-xs px-2 py-0.5 rounded ${activeTab === 'ringkasan' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {totalKasus} Kasus
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sop_jaringan')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'sop_jaringan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span>2. SOP & JARINGAN Layanan</span>
              <span className={`text-xs px-2 py-0.5 rounded ${activeTab === 'sop_jaringan' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                12 Mitra Terpadu
              </span>
            </button>
          </nav>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Status Data: Terhubung</span>
            <span aria-hidden="true">·</span>
            <span>Update: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
