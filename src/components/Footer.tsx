import React from 'react';
import { Shield, PhoneCall, Mail, MapPin, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">
                  SIPELKA KABUPATEN NAGEKEO
                </h4>
                <p className="text-[11px] text-slate-400">
                  Sistem Informasi Perlindungan Perempuan dan Anak · Nusa Tenggara Timur
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Portal publik resmi penanganan kekerasan berbasis gender dan kekerasan terhadap anak
              Dinas PMDP3A (Pemberdayaan Masyarakat dan Desa, Pemberdayaan Perempuan dan Perlindungan Anak) Kabupaten Nagekeo.
              Menyajikan Ringkasan Data Statistik dan Standar Operasional Prosedur (SOP) & Jaringan Layanan.
            </p>

            <div className="text-[11px] text-emerald-400 font-medium">
              Dilindungi oleh UU No. 12 Tahun 2022 (UU TPKS) & UU No. 35 Tahun 2014
            </div>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-2.5">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">
              Sekretariat & Posko Layanan
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>
                  Kompleks Civic Center Mbay, Kel. Lape, Kec. Aesesa, Kab. Nagekeo, NTT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:bidangpppanagekeo@gmail.com"
                  className="hover:text-emerald-300 transition-colors"
                >
                  bidangpppanagekeo@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-semibold">0812-3928-8722</span>
              </div>
            </div>
          </div>

          {/* Quick Emergency Numbers */}
          <div className="space-y-2.5">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">
              Nomor Tanggap Darurat
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li className="flex justify-between">
                <span>Unit PPA Polres Nagekeo:</span>
                <span className="text-white font-semibold">110 / (0386) 21110</span>
              </li>
              <li className="flex justify-between">
                <span>IGD RSUD Aeramo:</span>
                <span className="text-white font-semibold">(0386) 220012</span>
              </li>
              <li className="flex justify-between">
                <span>Hotline SAPA Nasional:</span>
                <span className="text-white font-semibold">129</span>
              </li>
              <li className="flex justify-between">
                <span>Puskesmas Danga (Mbay):</span>
                <span className="text-white font-semibold">0852-3911-2244</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Pemerintah Kabupaten Nagekeo · Bidang PPPA Dinas PMDP3A.</p>
          <div className="flex items-center gap-4">
            <span>Privasi Terjaga</span>
            <span aria-hidden="true">·</span>
            <span>Amanat UU TPKS</span>
            <span aria-hidden="true">·</span>
            <span>Nagekeo Ramah Perempuan & Anak</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
