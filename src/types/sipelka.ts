/**
 * Types for SIPELKA Public Portal (Kabupaten Nagekeo)
 */

export interface SipelkaRawRecord {
  waktuInput: string;
  noRegistrasi: string;
  tanggalLapor: string;
  namaKorban: string; // Strictly internal - NEVER rendered in public UI
  usia: number;
  kategoriKorban: 'Perempuan Dewasa' | 'Anak Perempuan' | 'Anak Laki-laki' | 'Lansia / Disabilitas' | string;
  kecamatanTkp: 'Aesesa' | 'Boawae' | 'Mauponggo' | 'Nangaroro' | 'Keo Tengah' | 'Aesesa Selatan' | 'Wolowae' | string;
  bentukKekerasan: 'Kekerasan Fisik' | 'Kekerasan Psikis' | 'Kekerasan Seksual' | 'Penelantaran Rumah Tangga' | 'Eksploitasi' | 'KDRT Fisik & Psikis' | string;
  namaPelaku: string; // Strictly internal - NEVER rendered in public UI
  hubunganPelaku: 'Suami / Pasangan' | 'Orang Tua / Keluarga Inti' | 'Kerabat / Saudara' | 'Tetangga / Teman' | 'Orang Tidak Dikenal' | 'Majikan / Lingkungan Kerja' | string;
  tingkatUrgensi: 'Tinggi' | 'Sedang' | 'Rendah' | string;
  statusPenanganan: 'Pengaduan Diterima' | 'Asesmen & Identifikasi' | 'Pendampingan Medis & Visum' | 'Pendampingan Hukum' | 'Pendampingan Psikologis' | 'Pemulihan & Reintegrasi' | 'Selesai' | string;
  petugasPendamping: string;
}

export interface RingkasanStatistik {
  totalKasus: number;
  totalAnak: number;
  totalDewasa: number;
  tingkatPenyelesaianPersen: number;
  kasusSelesai: number;
  kasusDalamProses: number;
  kasusUrgensiTinggi: number;
  kasusUrgensiSedang: number;
  kasusUrgensiRendah: number;

  distribusiBentukKekerasan: {
    bentuk: string;
    jumlah: number;
    persentase: number;
  }[];

  distribusiKategoriKorban: {
    kategori: string;
    jumlah: number;
    persentase: number;
  }[];

  sebaranKecamatan: {
    kecamatan: string;
    jumlah: number;
    persentase: number;
    statusDominan: string;
  }[];

  distribusiKelompokUsia: {
    rentang: string;
    jumlah: number;
    persentase: number;
  }[];

  distribusiHubunganPelaku: {
    hubungan: string;
    jumlah: number;
    persentase: number;
  }[];

  distribusiStatusPenanganan: {
    status: string;
    jumlah: number;
    persentase: number;
    tahapIndex: number;
  }[];

  trenBulanan: {
    bulan: string;
    jumlah: number;
  }[];
}

export interface FilterState {
  tahun: string;
  kecamatan: string;
  kategori: string;
}

export interface SopStep {
  nomor: number;
  judul: string;
  singkatan: string;
  deskripsi: string;
  estimasiWaktu: string;
  penanggungJawab: string;
  outputLayanan: string;
  hakKorban: string[];
}

export interface MitraJaringan {
  id: string;
  namaInstansi: string;
  kategori: 'Pemerintah & UPTD' | 'Aparat Penegak Hukum' | 'Layanan Medis' | 'Layanan Psikososial' | 'Hotline Nasional';
  peran: string;
  alamat: string;
  kecamatan: string;
  kontakTelepon: string;
  kontakWhatsapp?: string;
  email?: string;
  jamOperasional: string;
  pic?: string;
  fasilitas: string[];
  keterangan: string;
}
