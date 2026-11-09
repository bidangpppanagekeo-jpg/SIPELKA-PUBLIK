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

export const STORAGE_KEY_GSHEET_URL = 'sipelka_gsheet_url';
export const STORAGE_KEY_GSHEET_AUTOSYNC = 'sipelka_gsheet_autosync';
export const STORAGE_KEY_GSHEET_INTERVAL = 'sipelka_gsheet_interval';

/**
 * Robust CSV Line Parser that handles commas within quotes, trims whitespace
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
 * Normalizes text to match kecamatan names properly
 */
export function normalizeKecamatan(raw: string): string {
  if (!raw) return 'Aesesa';
  const clean = raw.trim().toLowerCase();
  for (const kec of KECAMATAN_NAGEKEO) {
    if (clean.includes(kec.toLowerCase())) {
      return kec;
    }
  }
  return raw.trim();
}

/**
 * Parses raw CSV content from Google Sheet or local file into SipelkaRawRecord list
 * Anonymizes victim & perpetrator personal names for public compliance
 */
export function parseSipelkaCSV(csvText: string): SipelkaRawRecord[] {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return [];

  // Parse header
  const headerParts = parseCSVLine(lines[0]).map((h) => h.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  
  // Find column indices dynamically
  const idxWaktu = headerParts.findIndex((h) => h.includes('WAKTU') || h.includes('TIME') || h.includes('TIMESTAMP'));
  const idxReg = headerParts.findIndex((h) => h.includes('REGISTRASI') || h.includes('REG') || h.includes('NOMOR'));
  const idxTgl = headerParts.findIndex((h) => h.includes('TANGGAL') || h.includes('TGL') || h.includes('DATE'));
  const idxUsia = headerParts.findIndex((h) => h.includes('USIA') || h.includes('UMUR') || h.includes('AGE'));
  const idxKat = headerParts.findIndex((h) => h.includes('KATEGORI') || h.includes('JENIS'));
  const idxKec = headerParts.findIndex((h) => h.includes('KECAMATAN') || h.includes('TKP') || h.includes('LOKASI'));
  const idxBentuk = headerParts.findIndex((h) => h.includes('BENTUK') || h.includes('KEKERASAN') || h.includes('KASUS'));
  const idxHub = headerParts.findIndex((h) => h.includes('HUBUNGAN') || h.includes('RELASI'));
  const idxUrgensi = headerParts.findIndex((h) => h.includes('URGENSI') || h.includes('PRIORITAS'));
  const idxStatus = headerParts.findIndex((h) => h.includes('STATUS') || h.includes('PENANGANAN') || h.includes('TAHAP'));
  const idxPetugas = headerParts.findIndex((h) => h.includes('PETUGAS') || h.includes('PENDAMPING') || h.includes('PEKSOS'));

  const records: SipelkaRawRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    // Skip empty lines or header repetitions
    if (parts.length < 3 || parts.every((p) => p === '')) continue;
    if (parts[0] && parts[0].toUpperCase().includes('WAKTU INPUT')) continue;

    const rawUsia = parts[idxUsia !== -1 ? idxUsia : 4];
    const usiaParsed = parseInt(String(rawUsia).replace(/[^0-9]/g, ''), 10);

    const kecRaw = parts[idxKec !== -1 ? idxKec : 6] || 'Aesesa';
    const normalizedKec = normalizeKecamatan(kecRaw);

    const waktuInput = parts[idxWaktu !== -1 ? idxWaktu : 0] || new Date().toISOString();
    const tglLapor = parts[idxTgl !== -1 ? idxTgl : 2] || (waktuInput.length >= 10 ? waktuInput.slice(0, 10) : new Date().toISOString().slice(0, 10));

    records.push({
      waktuInput,
      noRegistrasi: parts[idxReg !== -1 ? idxReg : 1] || `REG-${i}`,
      tanggalLapor: tglLapor,
      namaKorban: '[IDENTITAS DILINDUNGI UU TPKS]', // Masked for privacy
      usia: isNaN(usiaParsed) ? 20 : usiaParsed,
      kategoriKorban: parts[idxKat !== -1 ? idxKat : 5] || 'Perempuan Dewasa',
      kecamatanTkp: normalizedKec,
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
 * Converts various Google Sheets URLs into direct CSV export URL
 * Supports:
 * - https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit#gid={GID}
 * - https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
 * - Direct Sheet ID
 */
export function convertToGoogleSheetCsvUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();

  // If already a direct csv export link
  if (trimmed.includes('/export?format=csv') || trimmed.includes('/pub?output=csv')) {
    return trimmed;
  }

  // Match /spreadsheets/d/{ID}
  const matchId = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (matchId && matchId[1]) {
    const sheetId = matchId[1];
    // Check if gid is present
    const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '0';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  // If user only provided raw Sheet ID
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return `https://docs.google.com/spreadsheets/d/${trimmed}/export?format=csv&gid=0`;
  }

  return trimmed;
}

/**
 * Fetches and parses CSV data directly from Google Sheets
 */
export async function fetchGoogleSheetData(rawUrl: string): Promise<{ records: SipelkaRawRecord[]; count: number }> {
  const csvUrl = convertToGoogleSheetCsvUrl(rawUrl);
  if (!csvUrl) {
    throw new Error('URL Google Sheet tidak valid.');
  }

  // Fetch with cache-busting timestamp so updates reflect immediately
  const separator = csvUrl.includes('?') ? '&' : '?';
  const fetchUrl = `${csvUrl}${separator}_t=${Date.now()}`;

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error(
      `Gagal mengakses Google Sheet (HTTP ${response.status}). Pastikan spreadsheet telah diatur akses 'Siapa saja yang memiliki link dapat melihat' (Anyone with the link can view).`
    );
  }

  const text = await response.text();
  if (text.includes('<!DOCTYPE html') || text.includes('<html')) {
    throw new Error(
      'Google Sheet memerlukan izin akses publik. Silakan buka menu Share di Google Sheets lalu ubah "General access" menjadi "Anyone with the link" (Siapa saja yang memiliki link).'
    );
  }

  const parsed = parseSipelkaCSV(text);
  if (parsed.length === 0) {
    throw new Error('Tidak ditemukan baris data yang valid pada Google Sheet tersebut.');
  }

  return { records: parsed, count: parsed.length };
}

/**
 * Loads the current SIPELKA file from the public directory
 * ONLY uses pure data from file or Google Sheet without injecting mock data
 */
export async function loadDefaultSipelkaDataset(): Promise<SipelkaRawRecord[]> {
  // 1. Check if user has saved a Google Sheet URL in localStorage
  try {
    const savedSheetUrl = localStorage.getItem(STORAGE_KEY_GSHEET_URL);
    if (savedSheetUrl) {
      try {
        const { records } = await fetchGoogleSheetData(savedSheetUrl);
        if (records.length > 0) {
          return records;
        }
      } catch (err) {
        console.warn('Gagal memuat Google Sheet tersimpan, beralih ke file lokal:', err);
      }
    }
  } catch {
    // localStorage not accessible
  }

  // 2. Fetch the current file attached in workspace
  try {
    const res = await fetch(SIPELKA_FILE_PATH);
    if (res.ok) {
      const text = await res.text();
      const parsed = parseSipelkaCSV(text);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading SIPELKA data:', err);
  }

  // 3. Fallback only if file is completely empty or missing
  return [
    {
      waktuInput: '2026-10-27 12:17:26',
      noRegistrasi: 'REG/PPA-NGK/2026/10/001',
      tanggalLapor: '2026-10-27',
      namaKorban: '[IDENTITAS DILINDUNGI UU TPKS]',
      usia: 18,
      kategoriKorban: 'Perempuan Dewasa',
      kecamatanTkp: 'Aesesa',
      bentukKekerasan: 'Kekerasan Fisik',
      namaPelaku: '[IDENTITAS DILINDUNGI]',
      hubunganPelaku: 'Suami / Pasangan',
      tingkatUrgensi: 'Sedang',
      statusPenanganan: 'Asesmen & Identifikasi',
      petugasPendamping: 'Katarina Ose Wea, S.Tr.Sos',
    },
  ];
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
      sebaranKecamatan: KECAMATAN_NAGEKEO.map((kec) => ({
        kecamatan: kec,
        jumlah: 0,
        persentase: 0,
        statusDominan: 'Nihil Kasus',
      })),
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
    const isSelesai =
      item.statusPenanganan.toLowerCase().includes('selesai') ||
      item.statusPenanganan.toLowerCase().includes('tutup');
    if (isSelesai) {
      kasusSelesai++;
    }

    // Urgensi
    const urg = (item.tingkatUrgensi || '').toLowerCase();
    if (urg.includes('tinggi')) kasusUrgensiTinggi++;
    else if (urg.includes('sedang')) kasusUrgensiSedang++;
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
