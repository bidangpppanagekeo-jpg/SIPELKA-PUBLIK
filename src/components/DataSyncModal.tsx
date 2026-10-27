import React, { useState } from 'react';
import { X, UploadCloud, RefreshCw, CheckCircle2, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { parseSipelkaCSV } from '../data/sipelkaParser';
import { SipelkaRawRecord } from '../types/sipelka';

interface DataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: (newRecords: SipelkaRawRecord[], sourceName: string) => void;
  onReloadDefault: () => void;
  currentRecordsCount: number;
  currentDatasetName: string;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({
  isOpen,
  onClose,
  onDataUpdated,
  onReloadDefault,
  currentRecordsCount,
  currentDatasetName,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setErrorMsg('Harap unggah file berformat .csv dari sistem ekspor SIPELKA.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Sinkronisasi Data SIPELKA</h3>
            <p className="text-xs text-slate-500">Pembaruan file dataset pengaduan kekerasan perempuan & anak</p>
          </div>
        </div>

        {/* Current status card */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-600">
            <span>Koneksi Sumber Data:</span>
            <span className="font-semibold text-slate-900">{currentDatasetName}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Status Sinkronisasi:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aktif & Terhubung</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Jumlah Arsip Kasus:</span>
            <span className="font-bold text-slate-900">{currentRecordsCount} Kasus</span>
          </div>
        </div>

        {/* Upload box */}
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
            <strong>Jaminan Kerahasiaan UU TPKS:</strong> File yang diunggah langsung diproses secara agregat di peramban (browser).
            Nama korban dan pelaku otomatis disaring dan tidak akan pernah ditampilkan pada portal publik.
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
