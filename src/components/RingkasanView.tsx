import React from 'react';
import {
  RingkasanStatistik,
  FilterState,
} from '../types/sipelka';
import { KECAMATAN_NAGEKEO } from '../data/sipelkaParser';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertOctagon,
  FileText,
  MapPin,
  Calendar,
  Filter,
  RotateCcw,
  ShieldAlert,
  HeartHandshake,
  Activity,
} from 'lucide-react';

interface RingkasanViewProps {
  ringkasan: RingkasanStatistik;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  rawRecordsCount: number;
  activeDatasetName: string;
}

export const RingkasanView: React.FC<RingkasanViewProps> = ({
  ringkasan,
  filters,
  onFilterChange,
  rawRecordsCount,
  activeDatasetName,
}) => {
  const handleResetFilters = () => {
    onFilterChange({
      tahun: 'semua',
      kecamatan: 'semua',
      kategori: 'semua',
    });
  };

  const isFiltered =
    filters.tahun !== 'semua' ||
    filters.kecamatan !== 'semua' ||
    filters.kategori !== 'semua';

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 md:pb-6">
      {/* Title & Filter Bar (Mobile-optimized) */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
              <span>Dashboard Informasi Publik Terpadu</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
              Ringkasan Data Kasus Kekerasan Perempuan & Anak
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Data terintegrasi SIPELKA · Agregat statistik tanpa mengekspos data pribadi
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 self-start lg:self-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span className="truncate">Sumber: <strong>{activeDatasetName}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap font-medium text-slate-700">{rawRecordsCount} Arsip</span>
          </div>
        </div>

        {/* Filter Controls (Responsive Grid for Android & iPhone) */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Saring Data Berdasarkan:</span>
            </div>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 rounded-lg border border-rose-200 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Tahun Filter */}
            <div className="flex flex-col">
              <label htmlFor="filter-tahun" className="text-[11px] font-semibold text-slate-600 mb-1">
                Tahun Pelaporan
              </label>
              <select
                id="filter-tahun"
                value={filters.tahun}
                onChange={(e) => onFilterChange({ ...filters, tahun: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[42px]"
              >
                <option value="semua">Semua Periode Tahun</option>
                <option value="2026">Tahun Berjalan (2026)</option>
                <option value="2025">Tahun 2025</option>
              </select>
            </div>

            {/* Kecamatan Filter */}
            <div className="flex flex-col">
              <label htmlFor="filter-kecamatan" className="text-[11px] font-semibold text-slate-600 mb-1">
                Wilayah Kecamatan
              </label>
              <select
                id="filter-kecamatan"
                value={filters.kecamatan}
                onChange={(e) => onFilterChange({ ...filters, kecamatan: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[42px]"
              >
                <option value="semua">Semua Kecamatan (7 Wilayah)</option>
                {KECAMATAN_NAGEKEO.map((kec) => (
                  <option key={kec} value={kec}>
                    Kecamatan {kec}
                  </option>
                ))}
              </select>
            </div>

            {/* Kategori Korban */}
            <div className="flex flex-col">
              <label htmlFor="filter-kategori" className="text-[11px] font-semibold text-slate-600 mb-1">
                Kategori Korban
              </label>
              <select
                id="filter-kategori"
                value={filters.kategori}
                onChange={(e) => onFilterChange({ ...filters, kategori: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[42px]"
              >
                <option value="semua">Semua Kategori</option>
                <option value="anak">Korban Anak (Laki-laki & Perempuan)</option>
                <option value="perempuan dewasa">Perempuan Dewasa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Headline Metrics Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Kasus */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="truncate">Total Kasus</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {ringkasan.totalKasus}
            </div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-500 truncate">
              {ringkasan.kasusDalamProses} Proses · {ringkasan.kasusSelesai} Tuntas
            </div>
          </div>
        </div>

        {/* Tingkat Penyelesaian Layanan */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="truncate">Penyelesaian</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {ringkasan.tingkatPenyelesaianPersen}%
            </div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-500 truncate">
              {ringkasan.kasusSelesai} didampingi tuntas
            </div>
          </div>
        </div>

        {/* Demografi Korban Anak vs Dewasa */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="truncate">Korban Anak</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {ringkasan.totalAnak}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                ({ringkasan.totalKasus > 0 ? Math.round((ringkasan.totalAnak / ringkasan.totalKasus) * 100) : 0}%)
              </span>
            </div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-500 truncate">
              Dewasa: {ringkasan.totalDewasa} kasus
            </div>
          </div>
        </div>

        {/* Tingkat Urgensi Kasus */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="truncate">Urgensi Tinggi</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-2xl sm:text-3xl font-black text-rose-700 tracking-tight">
              {ringkasan.kasusUrgensiTinggi}
            </div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-500 truncate">
              Sedang: {ringkasan.kasusUrgensiSedang} · Rendah: {ringkasan.kasusUrgensiRendah}
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Distribusi Bentuk Kekerasan */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Bentuk Kekerasan yang Ditangani</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Berdasarkan data registrasi SIPELKA</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Total {ringkasan.totalKasus}</span>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {ringkasan.distribusiBentukKekerasan.map((item) => (
              <div key={item.bentuk}>
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                  <span className="truncate pr-2">{item.bentuk}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="font-bold text-slate-900">{item.jumlah} Kasus</span>
                    <span className="text-slate-400">({item.persentase}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.bentuk.toLowerCase().includes('seksual')
                        ? 'bg-rose-600'
                        : item.bentuk.toLowerCase().includes('fisik')
                        ? 'bg-amber-600'
                        : item.bentuk.toLowerCase().includes('kdrt')
                        ? 'bg-orange-600'
                        : item.bentuk.toLowerCase().includes('psikis')
                        ? 'bg-teal-600'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.max(item.persentase, 4)}%` }}
                  ></div>
                </div>
              </div>
            ))}

            {ringkasan.distribusiBentukKekerasan.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                Tidak ada data bentuk kekerasan untuk filter yang dipilih.
              </div>
            )}
          </div>
        </div>

        {/* Alur & Status Tahapan Penanganan */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Status Progres Tahapan Layanan</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Tahapan penanganan berjalan di UPTD PPA</p>
            </div>
            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {ringkasan.distribusiStatusPenanganan.map((st) => {
              const isFinished = st.status.toLowerCase().includes('selesai');
              return (
                <div key={st.status} className="p-2.5 sm:p-3 rounded-lg border border-slate-100 bg-slate-50/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 truncate pr-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isFinished ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                      <span className="truncate">{st.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="font-bold text-slate-900">{st.jumlah}</span>
                      <span className="text-slate-400 text-xs">({st.persentase}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFinished ? 'bg-emerald-600' : 'bg-amber-500'}`}
                      style={{ width: `${Math.max(st.persentase, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            {ringkasan.distribusiStatusPenanganan.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                Tidak ada data status untuk filter yang dipilih.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sebaran Wilayah 7 Kecamatan & Demografi Usia */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sebaran 7 Kecamatan se-Kabupaten Nagekeo */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-3 sm:mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Geografis Kasus</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                Sebaran Kasus per Kecamatan (Kabupaten Nagekeo)
              </h3>
            </div>
            <span className="text-xs text-slate-400">7 Kecamatan Wilayah Kerja</span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[320px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                  <th className="py-2 px-2 sm:px-3">Kecamatan TKP</th>
                  <th className="py-2 px-2 sm:px-3 text-center sm:text-left">Jumlah</th>
                  <th className="py-2 px-2 sm:px-3">Proporsi</th>
                  <th className="py-2 px-2 sm:px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ringkasan.sebaranKecamatan.map((kec) => (
                  <tr key={kec.kecamatan} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-2 sm:px-3 font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                      <span className="truncate">{kec.kecamatan}</span>
                    </td>
                    <td className="py-2.5 px-2 sm:px-3 font-bold text-slate-900 text-center sm:text-left">
                      {kec.jumlah} <span className="font-normal text-slate-400 hidden sm:inline">Kasus</span>
                    </td>
                    <td className="py-2.5 px-2 sm:px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 sm:w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${kec.persentase}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-500 font-medium text-[11px]">{kec.persentase}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 sm:px-3 text-right">
                      <span className={`text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${kec.jumlah > 0 ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {kec.statusDominan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribusi Usia & Hubungan Pelaku */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-5">
          {/* Kelompok Usia */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-bold text-slate-900 text-sm">Distribusi Usia Korban</h3>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-2">
              {ringkasan.distribusiKelompokUsia.map((usia) => (
                <div key={usia.rentang} className="text-xs">
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span className="truncate pr-1">{usia.rentang}</span>
                    <span className="font-bold text-slate-900 flex-shrink-0">{usia.jumlah} ({usia.persentase}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${Math.max(usia.persentase, 6)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hubungan Pelaku */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm">Hubungan Relasi Pelaku</h3>
              <ShieldAlert className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-1.5">
              {ringkasan.distribusiHubunganPelaku.slice(0, 4).map((rel) => (
                <div key={rel.hubungan} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50">
                  <span className="text-slate-700 font-medium truncate pr-1">{rel.hubungan}</span>
                  <span className="font-bold text-slate-900 flex-shrink-0">{rel.jumlah} ({rel.persentase}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tren Laporan Bulanan (Swipeable on small devices) */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Tren Pelaporan Kasus Per Bulan</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">Dinamika pelaporan pengaduan bulanan SIPELKA</p>
          </div>
          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </div>

        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2 pt-2 min-w-[340px]">
            {ringkasan.trenBulanan.map((m) => {
              const maxVal = Math.max(...ringkasan.trenBulanan.map((x) => x.jumlah), 1);
              const heightPercent = Math.round((m.jumlah / maxVal) * 100);
              return (
                <div key={m.bulan} className="flex flex-col items-center">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 mb-1">{m.jumlah}</span>
                  <div className="w-full max-w-[24px] sm:max-w-[28px] h-16 sm:h-20 bg-slate-100 rounded-t-md flex items-end overflow-hidden">
                    <div
                      className="w-full bg-emerald-600 rounded-t-md transition-all duration-500"
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1">{m.bulan}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Catatan Eksekutif Analisis Kebijakan PPPA Nagekeo */}
      <div className="bg-emerald-950 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-900">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-800/60 text-emerald-300 flex-shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-400">
              Analisis Kebijakan Publik · Bidang PPPA Nagekeo
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              Penguatan Layanan Responsif & Nol Toleransi Kekerasan
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Data SIPELKA mengindikasikan pentingnya kolaborasi lintas sektor antara aparat hukum, tenaga kesehatan, dan
              tokoh masyarakat adat. Penanganan di Kabupaten Nagekeo menitikberatkan pada perlindungan fisik darurat korban,
              pemberian bantuan hukum cuma-cuma, serta reintegrasi sosial untuk memastikan anak dapat kembali mengenyam
              pendidikan tanpa rasa takut atau trauma berkepanjangan.
            </p>
            <div className="pt-1.5 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-emerald-300 font-medium">
              <span>UU No. 12/2022 (TPKS)</span>
              <span aria-hidden="true">·</span>
              <span>UU No. 35/2014 (Perlindungan Anak)</span>
              <span aria-hidden="true">·</span>
              <span>Dinas PMDP3A Kabupaten Nagekeo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
