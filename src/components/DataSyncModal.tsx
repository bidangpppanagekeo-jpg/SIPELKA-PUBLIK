import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Link2,
  Table,
  Check,
  ExternalLink,
  HelpCircle,
  Clock,
} from 'lucide-react';
import {
  parseSipelkaCSV,
  fetchGoogleSheetData,
  STORAGE_KEY_GSHEET_URL,
  STORAGE_KEY_GSHEET_AUTOSYNC,
  STORAGE_KEY_GSHEET_INTERVAL,
} from '../data/sipelkaParser';
import { SipelkaRawRecord } from '../types/sipelka';

interface DataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: (newRecords: SipelkaRawRecord[], sourceName: string) => void;
  onReloadDefault: () => void;
  currentRecordsCount: number;
  currentDatasetName: string;
  onConnectGoogleSheet: (url: string, autoSync: boolean, intervalMinutes: number) => Promise<void>;
  connectedSheetUrl: string;
  isAutoSyncEnabled: boolean;
  syncIntervalMinutes: number;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({
  isOpen,
  onClose,
  onDataUpdated,
  onReloadDefault,
  currentRecordsCount,
  currentDatasetName,
  onConnectGoogleSheet,
  connectedSheetUrl,
  isAutoSyncEnabled,
  syncIntervalMinutes,
}) => {
  const [activeSyncTab, setActiveSyncTab] = useState<'gsheet' | 'upload'>('gsheet');
  const [sheetInputUrl, setSheetInputUrl] = useState(connectedSheetUrl || '');
  const [autoSyncToggle, setAutoSyncToggle] = useState(isAutoSyncEnabled);
  const [intervalVal, setIntervalVal] = useState(syncIntervalMinutes || 5);
  const [isConnecting, setIsConnecting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  if (!isOpen) return null;

  const handleConnectSheet = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!sheetInputUrl.trim()) {
      setErrorMsg('Masukkan URL atau ID Google Sheet SIPELKA.');
      return;
    }

    setIsConnecting(true);
    try {
      await onConnectGoogleSheet(sheetInputUrl.trim(), autoSyncToggle, intervalVal);
      setSuccessMsg(`Berhasil terhubung secara otomatis ke Google Sheet SIPELKA!`);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setErrorMsg('Harap unggah file berformat .csv dari ekspor SIPELKA.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseSipelkaCSV(text);

        if (parsed.length === 0) {
          setErrorMsg('File CSV tidak memiliki baris data yang valid atau format kolom tidak sesuai.');
          return;
        }

        onDataUpdated(parsed, file.name);
        setSuccessMsg(`Berhasil memuat ${parsed.length} baris data SIPELKA baru.`);
        setTimeout(() => {
          onClose();
        }, 1500);
      } catch (err) {
        setErrorMsg('Gagal memproses file CSV: ' + (err instanceof Error ? err.message : String(err)));
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 sm:space-y-5 relative my-auto max-h-[92vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Sinkronisasi Data SIPELKA</h3>
            <p className="text-xs text-slate-500">Hubungkan Google Sheet atau perbarui dataset SIPELKA</p>
          </div>
        </div>

        {/* Current status card */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-600">
            <span>Koneksi Sumber Data:</span>
            <span className="font-semibold text-slate-900 truncate max-w-[220px]" title={currentDatasetName}>
              {currentDatasetName}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Status Sinkronisasi:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aktif {isAutoSyncEnabled ? `(Otomatis setiap ${syncIntervalMinutes} mnt)` : '(Manual)'}</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Jumlah Arsip Kasus:</span>
            <span className="font-bold text-slate-900">{currentRecordsCount} Kasus</span>
          </div>
        </div>

        {/* Switch between Google Sheets and Manual Upload */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSyncTab('gsheet')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSyncTab === 'gsheet'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-4 h-4 text-emerald-600" />
            <span>Koneksi Google Sheet (Otomatis)</span>
          </button>
          <button
            onClick={() => setActiveSyncTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSyncTab === 'upload'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-slate-500" />
            <span>Unggah File CSV</span>
          </button>
        </div>

        {activeSyncTab === 'gsheet' ? (
          /* Google Sheet Connector Section */
          <form onSubmit={handleConnectSheet} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  URL Spreadsheet Google Sheet SIPELKA:
                </label>
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Cara Hubungkan Sheet</span>
                </button>
              </div>
              <div className="relative">
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit#gid=0"
                  value={sheetInputUrl}
                  onChange={(e) => setSheetInputUrl(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Salin tautan Google Sheet SIPELKA Anda langsung dari bilah browser.
              </p>
            </div>

            {/* Quick 3-Step Guide Toggle */}
            {showGuide && (
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs space-y-1.5 text-emerald-950">
                <div className="font-bold text-emerald-900">3 Langkah Cepat Izin Google Sheet:</div>
                <ol className="list-decimal pl-4 space-y-1 text-[11px] text-emerald-900/90 leading-relaxed">
                  <li>Buka Google Sheet data SIPELKA Anda di browser.</li>
                  <li>Klik tombol <strong>"Share" (Bagikan)</strong> di pojok kanan atas.</li>
                  <li>Pada bagian <em>General access</em>, ubah menjadi <strong>"Anyone with the link" (Siapa saja yang memiliki link)</strong> dengan peran Viewer. Lalu salin tautannya ke kotak di atas.</li>
                </ol>
              </div>
            )}

            {/* Auto-Sync Options */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Sinkronisasi Otomatis di Latar Belakang</span>
                  <span className="text-[11px] text-slate-500">
                    Aplikasi akan mengecek data terbaru dari Google Sheet secara berkala tanpa reload manual
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncToggle}
                  onChange={(e) => setAutoSyncToggle(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
              </label>

              {autoSyncToggle && (
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-xs">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-600 font-medium">Interval Pengecekan:</span>
                  <select
                    value={intervalVal}
                    onChange={(e) => setIntervalVal(Number(e.target.value))}
                    className="text-xs font-semibold bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value={1}>Setiap 1 Menit (Realtime)</option>
                    <option value={5}>Setiap 5 Menit (Rekomendasi)</option>
                    <option value={15}>Setiap 15 Menit</option>
                    <option value={30}>Setiap 30 Menit</option>
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isConnecting}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-60 min-h-[42px]"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menghubungkan ke Google Sheet...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Simpan & Sinkronkan Sekarang</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Manual CSV Upload Section */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
            }`}
            onClick={() => {
              const input = document.getElementById('sipelka-file-input');
              input?.click();
            }}
          >
            <input
              id="sipelka-file-input"
              type="file"
              accept=".csv,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-800">
              Klik untuk pilih file atau tarik file CSV SIPELKA ke sini
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Format: CSV ekspor SIPELKA (Waktu Input, No. Registrasi, Kecamatan, Bentuk Kekerasan, dll.)
            </p>
          </div>
        )}

        {/* Feedback message */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Privacy reassurance */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Jaminan Kerahasiaan UU TPKS:</strong> Data yang ditarik dari Google Sheet otomatis diproses secara agregat.
            Nama korban dan pelaku disaring dan dilindungi sehingga tidak akan pernah terekspos di portal publik.
          </span>
        </div>

        {/* Footer buttons */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => {
              onReloadDefault();
              setSuccessMsg('Berhasil memuat ulang data default SIPELKA Nagekeo.');
              setTimeout(() => onClose(), 1200);
            }}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium underline"
          >
            Muat Ulang Data Bawaan
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
