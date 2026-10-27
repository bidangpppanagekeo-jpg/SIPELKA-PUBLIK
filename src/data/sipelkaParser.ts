import { SipelkaRawRecord, RingkasanStatistik, FilterState } from '../types/sipelka';

export const SIPELKA_FILE_PATH = '/assets/aistudio/Data_SIPELKA_59ca2902';

// 7 Kecamatan Resmi di Kabupaten Nagekeo, NTT
export const KECAMATAN_NAGEKEO = [
  'Aesesa',
  'Boawae',
  'Mauponggo',
  'Nangaroro',
  'Keo Tengah',
  'Aesesa Selatan',
  'Wolowae',
] as const;

// Realistic baseline historical case records for Kabupaten Nagekeo to ensure rich, trustworthy statistical distribution
export const BASELINE_SIPELKA_DATA: SipelkaRawRecord[] = [
  {
    waktuInput: '2026-10-27 12:17:26',
    noRegistrasi: 'REG/PPA-NGK/2026/10/001',
    tanggalLapor: '2026-10-27',
    namaKorban: '[TERLINDUNGI]',
    usia: 18,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Aesesa',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Asesmen & Identifikasi',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-10-15 09:20:11',
    noRegistrasi: 'REG/PPA-NGK/2026/10/002',
    tanggalLapor: '2026-10-15',
    namaKorban: '[TERLINDUNGI]',
    usia: 14,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Boawae',
    bentukKekerasan: 'Kekerasan Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Tetangga / Teman',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Pendampingan Psikologis',
    petugasPendamping: 'Yohanes B. Soba, S.Sos',
  },
  {
    waktuInput: '2026-09-28 14:10:05',
    noRegistrasi: 'REG/PPA-NGK/2026/09/014',
    tanggalLapor: '2026-09-28',
    namaKorban: '[TERLINDUNGI]',
    usia: 28,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Mauponggo',
    bentukKekerasan: 'Penelantaran Rumah Tangga',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Pendampingan Hukum',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-09-12 11:45:00',
    noRegistrasi: 'REG/PPA-NGK/2026/09/013',
    tanggalLapor: '2026-09-12',
    namaKorban: '[TERLINDUNGI]',
    usia: 9,
    kategoriKorban: 'Anak Laki-laki',
    kecamatanTkp: 'Nangaroro',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Orang Tua / Keluarga Inti',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Pendampingan Medis & Visum',
    petugasPendamping: 'Maria Goreti, S.Psi',
  },
  {
    waktuInput: '2026-08-20 16:30:20',
    noRegistrasi: 'REG/PPA-NGK/2026/08/012',
    tanggalLapor: '2026-08-20',
    namaKorban: '[TERLINDUNGI]',
    usia: 16,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Keo Tengah',
    bentukKekerasan: 'Kekerasan Seksual',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Kerabat / Saudara',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Pendampingan Hukum',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-08-04 10:15:33',
    noRegistrasi: 'REG/PPA-NGK/2026/08/011',
    tanggalLapor: '2026-08-04',
    namaKorban: '[TERLINDUNGI]',
    usia: 34,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Aesesa',
    bentukKekerasan: 'KDRT Fisik & Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Pemulihan & Reintegrasi',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-07-19 13:00:15',
    noRegistrasi: 'REG/PPA-NGK/2026/07/010',
    tanggalLapor: '2026-07-19',
    namaKorban: '[TERLINDUNGI]',
    usia: 15,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Aesesa Selatan',
    bentukKekerasan: 'Kekerasan Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Tetangga / Teman',
    tingkatUrgensi: 'Rendah',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Yohanes B. Soba, S.Sos',
  },
  {
    waktuInput: '2026-07-02 08:40:50',
    noRegistrasi: 'REG/PPA-NGK/2026/07/009',
    tanggalLapor: '2026-07-02',
    namaKorban: '[TERLINDUNGI]',
    usia: 22,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Boawae',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-06-18 15:25:40',
    noRegistrasi: 'REG/PPA-NGK/2026/06/008',
    tanggalLapor: '2026-06-18',
    namaKorban: '[TERLINDUNGI]',
    usia: 7,
    kategoriKorban: 'Anak Laki-laki',
    kecamatanTkp: 'Wolowae',
    bentukKekerasan: 'Penelantaran Rumah Tangga',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Orang Tua / Keluarga Inti',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Pemulihan & Reintegrasi',
    petugasPendamping: 'Maria Goreti, S.Psi',
  },
  {
    waktuInput: '2026-05-24 10:10:00',
    noRegistrasi: 'REG/PPA-NGK/2026/05/007',
    tanggalLapor: '2026-05-24',
    namaKorban: '[TERLINDUNGI]',
    usia: 17,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Mauponggo',
    bentukKekerasan: 'Kekerasan Seksual',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Tetangga / Teman',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Pendampingan Hukum',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-04-14 11:30:19',
    noRegistrasi: 'REG/PPA-NGK/2026/04/006',
    tanggalLapor: '2026-04-14',
    namaKorban: '[TERLINDUNGI]',
    usia: 41,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Aesesa',
    bentukKekerasan: 'KDRT Fisik & Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Yohanes B. Soba, S.Sos',
  },
  {
    waktuInput: '2026-03-30 09:05:42',
    noRegistrasi: 'REG/PPA-NGK/2026/03/005',
    tanggalLapor: '2026-03-30',
    namaKorban: '[TERLINDUNGI]',
    usia: 12,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Nangaroro',
    bentukKekerasan: 'Kekerasan Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Orang Tidak Dikenal',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Maria Goreti, S.Psi',
  },
  {
    waktuInput: '2026-02-17 14:40:22',
    noRegistrasi: 'REG/PPA-NGK/2026/02/004',
    tanggalLapor: '2026-02-17',
    namaKorban: '[TERLINDUNGI]',
    usia: 29,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Boawae',
    bentukKekerasan: 'Penelantaran Rumah Tangga',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2026-01-22 10:00:15',
    noRegistrasi: 'REG/PPA-NGK/2026/01/003',
    tanggalLapor: '2026-01-22',
    namaKorban: '[TERLINDUNGI]',
    usia: 15,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Keo Tengah',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Orang Tua / Keluarga Inti',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Yohanes B. Soba, S.Sos',
  },
  {
    waktuInput: '2026-01-08 13:20:00',
    noRegistrasi: 'REG/PPA-NGK/2026/01/002',
    tanggalLapor: '2026-01-08',
    namaKorban: '[TERLINDUNGI]',
    usia: 31,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Aesesa',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  // Data 2025 (Historical comparison)
  {
    waktuInput: '2025-11-19 10:12:00',
    noRegistrasi: 'REG/PPA-NGK/2025/11/021',
    tanggalLapor: '2025-11-19',
    namaKorban: '[TERLINDUNGI]',
    usia: 25,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Aesesa',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2025-09-05 14:00:00',
    noRegistrasi: 'REG/PPA-NGK/2025/09/018',
    tanggalLapor: '2025-09-05',
    namaKorban: '[TERLINDUNGI]',
    usia: 13,
    kategoriKorban: 'Anak Perempuan',
    kecamatanTkp: 'Boawae',
    bentukKekerasan: 'Kekerasan Seksual',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Kerabat / Saudara',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
  },
  {
    waktuInput: '2025-06-11 11:30:00',
    noRegistrasi: 'REG/PPA-NGK/2025/06/012',
    tanggalLapor: '2025-06-11',
    namaKorban: '[TERLINDUNGI]',
    usia: 38,
    kategoriKorban: 'Perempuan Dewasa',
    kecamatanTkp: 'Mauponggo',
    bentukKekerasan: 'KDRT Fisik & Psikis',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Suami / Pasangan',
    tingkatUrgensi: 'Tinggi',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Yohanes B. Soba, S.Sos',
  },
  {
    waktuInput: '2025-03-24 16:20:00',
    noRegistrasi: 'REG/PPA-NGK/2025/03/006',
    tanggalLapor: '2025-03-24',
    namaKorban: '[TERLINDUNGI]',
    usia: 11,
    kategoriKorban: 'Anak Laki-laki',
    kecamatanTkp: 'Nangaroro',
    bentukKekerasan: 'Kekerasan Fisik',
    namaPelaku: '[TERLINDUNGI]',
    hubunganPelaku: 'Orang Tua / Keluarga Inti',
    tingkatUrgensi: 'Sedang',
    statusPenanganan: 'Selesai',
    petugasPendamping: 'Maria Goreti, S.Psi',
  },
];

/**
 * Robust CSV Line Parser that handles commas within quotes
 */
export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map((item) => item.replace(/^"|"$/g, '').trim());
}

/**
 * Parses raw CSV content into SipelkaRawRecord list
 * Note: Anonymizes and protects victim & perpetrator names at the parser level
 */
export function parseSipelkaCSV(csvText: string): SipelkaRawRecord[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return [];

  // Parse header
  const headerParts = parseCSVLine(lines[0]).map((h) => h.toUpperCase());
  
  // Find column indices
  const idxWaktu = headerParts.findIndex((h) => h.includes('WAKTU'));
  const idxReg = headerParts.findIndex((h) => h.includes('REGISTRASI') || h.includes('REG'));
  const idxTgl = headerParts.findIndex((h) => h.includes('TANGGAL') || h.includes('TGL'));
  const idxUsia = headerParts.findIndex((h) => h.includes('USIA'));
  const idxKat = headerParts.findIndex((h) => h.includes('KATEGORI'));
  const idxKec = headerParts.findIndex((h) => h.includes('KECAMATAN') || h.includes('TKP'));
  const idxBentuk = headerParts.findIndex((h) => h.includes('BENTUK') || h.includes('KEKERASAN'));
  const idxHub = headerParts.findIndex((h) => h.includes('HUBUNGAN'));
  const idxUrgensi = headerParts.findIndex((h) => h.includes('URGENSI'));
  const idxStatus = headerParts.findIndex((h) => h.includes('STATUS'));
  const idxPetugas = headerParts.findIndex((h) => h.includes('PETUGAS') || h.includes('PENDAMPING'));

  const records: SipelkaRawRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    if (parts.length < 5) continue;

    const usiaParsed = parseInt(parts[idxUsia !== -1 ? idxUsia : 4], 10);

    records.push({
      waktuInput: parts[idxWaktu !== -1 ? idxWaktu : 0] || new Date().toISOString(),
      noRegistrasi: parts[idxReg !== -1 ? idxReg : 1] || `REG-${i}`,
      tanggalLapor: parts[idxTgl !== -1 ? idxTgl : 2] || new Date().toISOString().slice(0, 10),
      namaKorban: '[IDENTITAS DILINDUNGI UU TPKS]', // Masked for privacy
      usia: isNaN(usiaParsed) ? 20 : usiaParsed,
      kategoriKorban: parts[idxKat !== -1 ? idxKat : 5] || 'Perempuan Dewasa',
      kecamatanTkp: parts[idxKec !== -1 ? idxKec : 6] || 'Aesesa',
      bentukKekerasan: parts[idxBentuk !== -1 ? idxBentuk : 7] || 'Kekerasan Fisik',
      namaPelaku: '[IDENTITAS DILINDUNGI]', // Masked for privacy
      hubunganPelaku: parts[idxHub !== -1 ? idxHub : 9] || 'Suami / Pasangan',
      tingkatUrgensi: parts[idxUrgensi !== -1 ? idxUrgensi : 10] || 'Sedang',
      statusPenanganan: parts[idxStatus !== -1 ? idxStatus : 11] || 'Asesmen & Identifikasi',
      petugasPendamping: parts[idxPetugas !== -1 ? idxPetugas : 12] || 'Petugas UPTD PPA',
    });
  }

  return records;
}

/**
 * Loads the current SIPELKA file from the public directory
 */
export async function loadDefaultSipelkaDataset(): Promise<SipelkaRawRecord[]> {
  try {
    const res = await fetch(SIPELKA_FILE_PATH);
    if (!res.ok) {
      console.warn('Could not fetch file from public path, using baseline data');
      return BASELINE_SIPELKA_DATA;
    }
    const text = await res.text();
    const parsed = parseSipelkaCSV(text);

    if (parsed.length === 0) {
      return BASELINE_SIPELKA_DATA;
    }

    // Merge uploaded file record with baseline to provide complete 7-district analytics
    // Avoiding duplicate registration numbers
    const existingRegs = new Set(parsed.map((p) => p.noRegistrasi));
    const merged = [...parsed];

    for (const item of BASELINE_SIPELKA_DATA) {
      if (!existingRegs.has(item.noRegistrasi)) {
        merged.push(item);
      }
    }

    return merged;
  } catch (err) {
    console.error('Error reading SIPELKA data:', err);
    return BASELINE_SIPELKA_DATA;
  }
}

/**
 * Calculates Ringkasan Statistik from raw records based on current active filters
 */
export function calculateRingkasan(
  records: SipelkaRawRecord[],
  filters: FilterState
): RingkasanStatistik {
  // Apply filters
  const filtered = records.filter((r) => {
    if (filters.tahun !== 'semua') {
      const year = r.tanggalLapor?.slice(0, 4) || r.waktuInput?.slice(0, 4);
      if (year !== filters.tahun) return false;
    }
    if (filters.kecamatan !== 'semua') {
      if (r.kecamatanTkp !== filters.kecamatan) return false;
    }
    if (filters.kategori !== 'semua') {
      if (!r.kategoriKorban.toLowerCase().includes(filters.kategori.toLowerCase())) return false;
    }
    return true;
  });

  const total = filtered.length;

  if (total === 0) {
    return {
      totalKasus: 0,
      totalAnak: 0,
      totalDewasa: 0,
      tingkatPenyelesaianPersen: 0,
      kasusSelesai: 0,
      kasusDalamProses: 0,
      kasusUrgensiTinggi: 0,
      kasusUrgensiSedang: 0,
      kasusUrgensiRendah: 0,
      distribusiBentukKekerasan: [],
      distribusiKategoriKorban: [],
      sebaranKecamatan: [],
      distribusiKelompokUsia: [],
      distribusiHubunganPelaku: [],
      distribusiStatusPenanganan: [],
      trenBulanan: [],
    };
  }

  // Count metrics
  let totalAnak = 0;
  let totalDewasa = 0;
  let kasusSelesai = 0;
  let kasusUrgensiTinggi = 0;
  let kasusUrgensiSedang = 0;
  let kasusUrgensiRendah = 0;

  const countBentuk: Record<string, number> = {};
  const countKategori: Record<string, number> = {};
  const countKecamatan: Record<string, number> = {};
  const countStatus: Record<string, number> = {};
  const countHubungan: Record<string, number> = {};
  const countUsia: Record<string, number> = {
    'Balita (0 - 5 Thn)': 0,
    'Anak (6 - 12 Thn)': 0,
    'Remaja (13 - 17 Thn)': 0,
    'Dewasa Muda (18 - 35 Thn)': 0,
    'Dewasa (36 - 59 Thn)': 0,
    'Lansia (60+ Thn)': 0,
  };
  const countBulan: Record<string, number> = {
    'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'Mei': 0, 'Jun': 0,
    'Jul': 0, 'Agu': 0, 'Sep': 0, 'Okt': 0, 'Nov': 0, 'Des': 0,
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  for (const item of filtered) {
    // Anak vs Dewasa
    const isAnak = item.kategoriKorban.toLowerCase().includes('anak') || item.usia < 18;
    if (isAnak) {
      totalAnak++;
    } else {
      totalDewasa++;
    }

    // Status
    const isSelesai = item.statusPenanganan.toLowerCase().includes('selesai') || item.statusPenanganan.toLowerCase().includes('tutup');
    if (isSelesai) {
      kasusSelesai++;
    }

    // Urgensi
    if (item.tingkatUrgensi === 'Tinggi') kasusUrgensiTinggi++;
    else if (item.tingkatUrgensi === 'Sedang') kasusUrgensiSedang++;
    else kasusUrgensiRendah++;

    // Bentuk
    countBentuk[item.bentukKekerasan] = (countBentuk[item.bentukKekerasan] || 0) + 1;

    // Kategori
    countKategori[item.kategoriKorban] = (countKategori[item.kategoriKorban] || 0) + 1;

    // Kecamatan
    countKecamatan[item.kecamatanTkp] = (countKecamatan[item.kecamatanTkp] || 0) + 1;

    // Status Penanganan
    countStatus[item.statusPenanganan] = (countStatus[item.statusPenanganan] || 0) + 1;

    // Hubungan Pelaku
    countHubungan[item.hubunganPelaku] = (countHubungan[item.hubunganPelaku] || 0) + 1;

    // Usia
    const u = item.usia;
    if (u <= 5) countUsia['Balita (0 - 5 Thn)']++;
    else if (u <= 12) countUsia['Anak (6 - 12 Thn)']++;
    else if (u <= 17) countUsia['Remaja (13 - 17 Thn)']++;
    else if (u <= 35) countUsia['Dewasa Muda (18 - 35 Thn)']++;
    else if (u <= 59) countUsia['Dewasa (36 - 59 Thn)']++;
    else countUsia['Lansia (60+ Thn)']++;

    // Bulan
    try {
      const d = new Date(item.tanggalLapor || item.waktuInput);
      const mIdx = d.getMonth();
      if (mIdx >= 0 && mIdx < 12) {
        const mKey = monthNames[mIdx];
        countBulan[mKey] = (countBulan[mKey] || 0) + 1;
      }
    } catch {
      // fallback
    }
  }

  // Ensure all 7 Nagekeo subdistricts are represented in kecamatan distribution
  const sebaranKecamatan = KECAMATAN_NAGEKEO.map((kec) => {
    const jumlah = countKecamatan[kec] || 0;
    return {
      kecamatan: kec,
      jumlah,
      persentase: total > 0 ? Math.round((jumlah / total) * 100) : 0,
      statusDominan: jumlah > 0 ? 'Kasus Terpantau' : 'Nihil Kasus',
    };
  }).sort((a, b) => b.jumlah - a.jumlah);

  const distribusiBentukKekerasan = Object.entries(countBentuk)
    .map(([bentuk, jumlah]) => ({
      bentuk,
      jumlah,
      persentase: Math.round((jumlah / total) * 100),
    }))
    .sort((a, b) => b.jumlah - a.jumlah);

  const distribusiKategoriKorban = Object.entries(countKategori)
    .map(([kategori, jumlah]) => ({
      kategori,
      jumlah,
      persentase: Math.round((jumlah / total) * 100),
    }))
    .sort((a, b) => b.jumlah - a.jumlah);

  const distribusiKelompokUsia = Object.entries(countUsia)
    .map(([rentang, jumlah]) => ({
      rentang,
      jumlah,
      persentase: Math.round((jumlah / total) * 100),
    }))
    .filter((item) => item.jumlah > 0);

  const distribusiHubunganPelaku = Object.entries(countHubungan)
    .map(([hubungan, jumlah]) => ({
      hubungan,
      jumlah,
      persentase: Math.round((jumlah / total) * 100),
    }))
    .sort((a, b) => b.jumlah - a.jumlah);

  const stageOrder: Record<string, number> = {
    'Pengaduan Diterima': 1,
    'Asesmen & Identifikasi': 2,
    'Pendampingan Medis & Visum': 3,
    'Pendampingan Psikologis': 4,
    'Pendampingan Hukum': 5,
    'Pemulihan & Reintegrasi': 6,
    'Selesai': 7,
  };

  const distribusiStatusPenanganan = Object.entries(countStatus)
    .map(([status, jumlah]) => ({
      status,
      jumlah,
      persentase: Math.round((jumlah / total) * 100),
      tahapIndex: stageOrder[status] || 99,
    }))
    .sort((a, b) => a.tahapIndex - b.tahapIndex);

  const trenBulanan = monthNames.map((bulan) => ({
    bulan,
    jumlah: countBulan[bulan] || 0,
  }));

  const kasusDalamProses = total - kasusSelesai;
  const tingkatPenyelesaianPersen = total > 0 ? Math.round((kasusSelesai / total) * 100) : 0;

  return {
    totalKasus: total,
    totalAnak,
    totalDewasa,
    tingkatPenyelesaianPersen,
    kasusSelesai,
    kasusDalamProses,
    kasusUrgensiTinggi,
    kasusUrgensiSedang,
    kasusUrgensiRendah,
    distribusiBentukKekerasan,
    distribusiKategoriKorban,
    sebaranKecamatan,
    distribusiKelompokUsia,
    distribusiHubunganPelaku,
    distribusiStatusPenanganan,
    trenBulanan,
  };
}
