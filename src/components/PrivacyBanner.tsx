import React from 'react';
import { Lock, EyeOff, ShieldCheck, FileCheck } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">
              Prinsip Perlindungan Privasi & Kerahasiaan Identitas (UU No. 12/2022 & UU No. 35/2014):
            </span>{' '}
            Sesuai mandat peraturan perundang-undangan, portal publik ini hanya menyajikan{' '}
            <strong className="text-emerald-800">Ringkasan Statistik Agregat</strong> dan{' '}
            <strong className="text-emerald-800">SOP & Jaringan Layanan Rujukan</strong>. Nama korban, nama pelaku,
            dan nomor registrasi detail internal dilindungi penuh untuk menjaga martabat serta keselamatan korban.
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium flex-shrink-0 pl-9 md:pl-0">
          <div className="flex items-center gap-1.5 text-slate-700">
            <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
            <span>Identitas Terenkripsi</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resmi Dinas PMDP3A Nagekeo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
