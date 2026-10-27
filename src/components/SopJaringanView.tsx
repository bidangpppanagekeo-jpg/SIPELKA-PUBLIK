import React, { useState } from 'react';
import {
  SOP_TERPADU_STEPS,
  MITRA_JARINGAN_NAGEKEO,
  PRINSIP_LAYANAN,
} from '../data/sopJaringanData';
import {
  ShieldCheck,
  PhoneCall,
  Clock,
  UserCheck,
  FileText,
  Building,
  ExternalLink,
  MapPin,
  Send,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Search,
} from 'lucide-react';

export const SopJaringanView: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [mitraCategoryFilter, setMitraCategoryFilter] = useState<string>('semua');
  const [searchMitra, setSearchMitra] = useState<string>('');

  // Form pengaduan / konsultasi state
  const [namaPelapor, setNamaPelapor] = useState('');
  const [kontakPelapor, setKontakPelapor] = useState('');
  const [kecamatanPelapor, setKecamatanPelapor] = useState('Aesesa');
  const [pesanKonsultasi, setPesanKonsultasi] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeStepData = SOP_TERPADU_STEPS.find((s) => s.nomor === selectedStep) || SOP_TERPADU_STEPS[0];

  const handlePrevStep = () => {
    setSelectedStep((prev) => (prev > 1 ? prev - 1 : SOP_TERPADU_STEPS.length));
  };

  const handleNextStep = () => {
    setSelectedStep((prev) => (prev < SOP_TERPADU_STEPS.length ? prev + 1 : 1));
  };

  const filteredMitra = MITRA_JARINGAN_NAGEKEO.filter((m) => {
    if (mitraCategoryFilter !== 'semua' && m.kategori !== mitraCategoryFilter) {
      return false;
    }
    if (searchMitra.trim() !== '') {
      const q = searchMitra.toLowerCase();
      return (
        m.namaInstansi.toLowerCase().includes(q) ||
        m.peran.toLowerCase().includes(q) ||
        m.alamat.toLowerCase().includes(q) ||
        m.kecamatan.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSubmitKonsultasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kontakPelapor || !pesanKonsultasi) return;
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-16 md:pb-6">
      {/* SECTION 1: STANDAR OPERASIONAL PROSEDUR (SOP) */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Bagian 1 · Alur Penanganan Baku</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
            Standar Operasional Prosedur (SOP) Penanganan Terpadu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Alur baku penanganan kasus kekerasan terhadap perempuan dan anak di Kabupaten Nagekeo
          </p>
        </div>

        {/* Step Progression Buttons (Touch-optimized for Android & iPhone) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {SOP_TERPADU_STEPS.map((step) => {
            const isActive = step.nomor === selectedStep;
            return (
              <button
                key={step.nomor}
                onClick={() => setSelectedStep(step.nomor)}
                className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all flex flex-col justify-between min-h-[58px] sm:min-h-[64px] active:scale-[0.98] ${
                  isActive
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/40'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[11px] font-black w-6 h-6 rounded-md flex items-center justify-center ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    0{step.nomor}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate ml-1">{step.estimasiWaktu}</span>
                </div>
                <div className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-emerald-950' : 'text-slate-800'}`}>
                  {step.singkatan}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-slate-50/90 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-200">
            <div>
              <div className="text-[11px] sm:text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
                Tahap 0{activeStepData.nomor} Dari 06
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                {activeStepData.judul}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium self-start sm:self-center">
              <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Estimasi: <strong>{activeStepData.estimasiWaktu}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeStepData.deskripsi}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Pelaksana & Penanggung Jawab:</span>
              </div>
              <p className="text-xs text-slate-700 font-medium pl-6">
                {activeStepData.penanggungJawab}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pt-1.5 border-t border-slate-100">
                <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Output Layanan Resmi:</span>
              </div>
              <p className="text-xs text-slate-700 font-medium pl-6">
                {activeStepData.outputLayanan}
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hak Korban yang Dijamin:</span>
              </div>
              <ul className="space-y-1.5 pl-2 text-xs text-slate-600">
                {activeStepData.hakKorban.map((hak, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <span>{hak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Prev / Next Step Buttons for Easy Thumb Tapping */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <button
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors min-h-[38px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tahap Sebelumnya</span>
            </button>
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors min-h-[38px]"
            >
              <span>Tahap Selanjutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prinsip Layanan Terpadu */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            4 Prinsip Mutlak Layanan Perlindungan Nagekeo
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRINSIP_LAYANAN.map((prinsip, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{prinsip.judul}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal pl-5">
                  {prinsip.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: JARINGAN MITRA RUJUKAN KABUPATEN NAGEKEO */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Building className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Bagian 2 · Direktori Mitra Terpadu</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
              Jaringan Mitra Layanan Rujukan Terpadu Nagekeo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Daftar instansi, fasilitas kesehatan, penegak hukum, dan posko layanan ramah anak
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari puskesmas, polres, alamat..."
              value={searchMitra}
              onChange={(e) => setSearchMitra(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[42px]"
            />
          </div>
        </div>

        {/* Filter Kategori Mitra (Swipeable pills for mobile) */}
        <div className="overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 min-w-max">
            {[
              { id: 'semua', label: 'Semua Mitra' },
              { id: 'Pemerintah & UPTD', label: 'UPTD & Dinas' },
              { id: 'Aparat Penegak Hukum', label: 'Aparat Penegak Hukum' },
              { id: 'Layanan Medis', label: 'Fasilitas Kesehatan' },
              { id: 'Hotline Nasional', label: 'Hotline Bebas Pulsa' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setMitraCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[36px] active:scale-95 ${
                  mitraCategoryFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direktori Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredMitra.map((mitra) => (
            <div
              key={mitra.id}
              className="border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 bg-white"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-800 truncate pr-2">{mitra.kategori}</span>
                  <span className="flex-shrink-0">Kec. {mitra.kecamatan}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {mitra.namaInstansi}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{mitra.peran}</p>

                <div className="pt-2 space-y-1 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{mitra.alamat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{mitra.jamOperasional}</span>
                  </div>
                  {mitra.pic && (
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>PIC: {mitra.pic}</span>
                    </div>
                  )}
                </div>

                {/* Fasilitas */}
                <div className="pt-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Fasilitas Unggulan:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {mitra.fasilitas.map((fas, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {fas}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons (Touch-friendly 44px+ height on Android/iPhone) */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${mitra.kontakTelepon.replace(/[^0-9]/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg transition-colors min-h-[42px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                  <span className="truncate">{mitra.kontakTelepon}</span>
                </a>

                {mitra.kontakWhatsapp && (
                  <a
                    href={`https://wa.me/${mitra.kontakWhatsapp}?text=Halo%20${encodeURIComponent(
                      mitra.namaInstansi
                    )},%20saya%20membutuhkan%20informasi%20layanan%20pengaduan%20kekerasan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg transition-colors min-h-[42px]"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {filteredMitra.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-400 text-xs">
              Tidak ada mitra jaringan yang cocok dengan pencarian "{searchMitra}".
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: FORMULIR PENGADUAN & KONSULTASI RAHASIA DARING */}
      <section className="bg-slate-900 text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-800">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-400">
              Saluran Pengaduan & Pendampingan Rahasia
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
              Butuh Pendampingan atau Ingin Melaporkan Kejadian?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Anda tidak sendirian. Formulir ini terhubung langsung secara tertutup dengan Pekerja Sosial (Peksos)
              dan Tim UPTD PPA Dinas PMDP3A Kabupaten Nagekeo. Identitas Anda dijamin kerahasiaannya.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-5 sm:p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Laporan / Permohonan Konsultasi Diterima</h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed max-w-lg mx-auto">
                Tim Pendamping UPTD PPA Kabupaten Nagekeo akan segera menindaklanjuti dan menghubungi kontak Anda
                secara hati-hati dan tertutup. Untuk situasi darurat yang mengancam nyawa, segera hubungi Hotline:
                <strong> 0812-3928-8722</strong> atau <strong>110 (Polres Nagekeo)</strong>.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setPesanKonsultasi('');
                }}
                className="text-xs text-emerald-400 underline font-medium hover:text-white pt-1"
              >
                Kirim Pengaduan Baru Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitKonsultasi} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama / Inisial (Boleh Samaran / Anonim)
                  </label>
                  <input
                    type="text"
                    value={namaPelapor}
                    onChange={(e) => setNamaPelapor(e.target.value)}
                    placeholder="Contoh: Anonim / Warga Mbay"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nomor WhatsApp / Telepon Aktif <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={kontakPelapor}
                    onChange={(e) => setKontakPelapor(e.target.value)}
                    placeholder="0812xxxxxxx"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kecamatan Domisili / TKP di Kabupaten Nagekeo
                </label>
                <select
                  value={kecamatanPelapor}
                  onChange={(e) => setKecamatanPelapor(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                >
                  <option value="Aesesa">Kecamatan Aesesa (Mbay)</option>
                  <option value="Boawae">Kecamatan Boawae</option>
                  <option value="Mauponggo">Kecamatan Mauponggo</option>
                  <option value="Nangaroro">Kecamatan Nangaroro</option>
                  <option value="Keo Tengah">Kecamatan Keo Tengah</option>
                  <option value="Aesesa Selatan">Kecamatan Aesesa Selatan</option>
                  <option value="Wolowae">Kecamatan Wolowae</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Uraian Singkat Kebutuhan / Dugaan Kejadian <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={pesanKonsultasi}
                  onChange={(e) => setPesanKonsultasi(e.target.value)}
                  placeholder="Ceritakan secara ringkas hal yang dihadapi, bantuan apa yang diharapkan (konseling medis, visum, bantuan hukum, atau perlindungan aman)..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 self-start sm:self-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Enkripsi privasi terjamin · Tidak ada data dipublikasikan</span>
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors min-h-[46px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan Pengaduan Rahasia</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
