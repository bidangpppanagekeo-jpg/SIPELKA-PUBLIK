import React from 'react';
import { RingkasanStatistik, FilterState } from '../types/sipelka';

interface PrintableSummaryProps {
  ringkasan: RingkasanStatistik;
  filters: FilterState;
  dateStr: string;
}

export const PrintableSummary: React.FC<PrintableSummaryProps> = ({
  ringkasan,
  filters,
  dateStr,
}) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-serif max-w-4xl mx-auto space-y-6">
      {/* Official Government Letterhead (KOP SURAT) */}
      <div className="text-center border-b-4 border-double border-black pb-4">
        <h3 className="text-sm uppercase tracking-widest font-bold">
          PEMERINTAH KABUPATEN NAGEKEO
        </h3>
        <h2 className="text-lg uppercase tracking-wide font-black">
          DINAS PMDP3A
        </h2>
        <p className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider">
          (Dinas Pemberdayaan Masyarakat dan Desa, Pemberdayaan Perempuan dan Perlindungan Anak)
        </p>
        <p className="text-xs italic text-gray-700 mt-0.5">
          Kompleks Civic Center Mbay, Kelurahan Lape, Kecamatan Aesesa, Kabupaten Nagekeo, Nusa Tenggara Timur
        </p>
        <p className="text-xs text-gray-700">
          Laman Resmi SIPELKA · Email: bidangpppanagekeo@gmail.com · Hotline Pengaduan: 0812-3928-8722
        </p>
      </div>

      {/* Document Title */}
      <div className="text-center space-y-1">
        <h4 className="text-base font-bold uppercase underline">
          LEMBAR RINGKASAN DATA STATISTIK PENANGANAN KASUS PPA
        </h4>
        <p className="text-xs text-gray-600">
          Nomor Publikasi: REKAP/PPA-NGK/{new Date().getFullYear()}/PUB · Tanggal Cetak: {dateStr}
        </p>
      </div>

      {/* Privacy Notice Notice */}
      <div className="text-xs border border-gray-400 p-2.5 bg-gray-50 text-justify leading-relaxed">
        <strong>Pemberitahuan Kerahasiaan (UU No. 12/2022 & UU No. 35/2014):</strong> Sesuai undang-undang,
        lembar publikasi ini HANYA menyajikan ringkasan data statistik agregat, persentase bentuk kekerasan, dan sebaran
        kecamatan. Identitas perseorangan (nama korban, pelaku, dan alamat spesifik) dilindungi secara hukum.
      </div>

      {/* Summary KPI Matrix */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="border border-black p-2">
          <div className="text-[10px] uppercase font-bold text-gray-600">Total Kasus</div>
          <div className="text-xl font-bold mt-1">{ringkasan.totalKasus}</div>
        </div>
        <div className="border border-black p-2">
          <div className="text-[10px] uppercase font-bold text-gray-600">Kasus Selesai</div>
          <div className="text-xl font-bold mt-1">{ringkasan.kasusSelesai} ({ringkasan.tingkatPenyelesaianPersen}%)</div>
        </div>
        <div className="border border-black p-2">
          <div className="text-[10px] uppercase font-bold text-gray-600">Korban Anak</div>
          <div className="text-xl font-bold mt-1">{ringkasan.totalAnak}</div>
        </div>
        <div className="border border-black p-2">
          <div className="text-[10px] uppercase font-bold text-gray-600">Perempuan Dewasa</div>
          <div className="text-xl font-bold mt-1">{ringkasan.totalDewasa}</div>
        </div>
      </div>

      {/* Sebaran Wilayah 7 Kecamatan */}
      <div className="space-y-1">
        <h5 className="text-xs font-bold uppercase">1. Rekapitulasi Kasus Berdasarkan Kecamatan (Kab. Nagekeo)</h5>
        <table className="w-full text-xs border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100 border border-black">
              <th className="border border-black p-1 text-left">No.</th>
              <th className="border border-black p-1 text-left">Nama Kecamatan</th>
              <th className="border border-black p-1 text-right">Jumlah Kasus</th>
              <th className="border border-black p-1 text-right">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {ringkasan.sebaranKecamatan.map((kec, i) => (
              <tr key={kec.kecamatan} className="border border-black">
                <td className="border border-black p-1 text-left">{i + 1}</td>
                <td className="border border-black p-1 text-left">Kecamatan {kec.kecamatan}</td>
                <td className="border border-black p-1 text-right">{kec.jumlah}</td>
                <td className="border border-black p-1 text-right">{kec.persentase}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bentuk Kekerasan */}
      <div className="space-y-1">
        <h5 className="text-xs font-bold uppercase">2. Rekapitulasi Berdasarkan Bentuk Kekerasan</h5>
        <table className="w-full text-xs border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100 border border-black">
              <th className="border border-black p-1 text-left">No.</th>
              <th className="border border-black p-1 text-left">Bentuk Kekerasan</th>
              <th className="border border-black p-1 text-right">Jumlah Kasus</th>
              <th className="border border-black p-1 text-right">Proporsi</th>
            </tr>
          </thead>
          <tbody>
            {ringkasan.distribusiBentukKekerasan.map((b, i) => (
              <tr key={b.bentuk} className="border border-black">
                <td className="border border-black p-1 text-left">{i + 1}</td>
                <td className="border border-black p-1 text-left">{b.bentuk}</td>
                <td className="border border-black p-1 text-right">{b.jumlah}</td>
                <td className="border border-black p-1 text-right">{b.persentase}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Signatures */}
      <div className="pt-8 grid grid-cols-2 text-xs">
        <div>
          <p>Mengetahui,</p>
          <p className="font-bold">Kepala Dinas PMDP3A Kabupaten Nagekeo</p>
          <div className="h-16"></div>
          <p className="font-bold underline">___________________________</p>
          <p>NIP. .....................................................</p>
        </div>
        <div className="text-right">
          <p>Mbay, {dateStr}</p>
          <p className="font-bold">Petugas Pendamping / Pekerja Sosial</p>
          <div className="h-16"></div>
          <p className="font-bold underline">Katarina Ose Wea, S.Tr.Sos</p>
          <p>Pengelola Layanan SIPELKA</p>
        </div>
      </div>
    </div>
  );
};
