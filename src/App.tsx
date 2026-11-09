/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { PrivacyBanner } from './components/PrivacyBanner';
import { RingkasanView } from './components/RingkasanView';
import { SopJaringanView } from './components/SopJaringanView';
import { DataSyncModal } from './components/DataSyncModal';
import { PrintableSummary } from './components/PrintableSummary';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import {
  SipelkaRawRecord,
  FilterState,
} from './types/sipelka';
import {
  loadDefaultSipelkaDataset,
  calculateRingkasan,
  fetchGoogleSheetData,
  STORAGE_KEY_GSHEET_URL,
  STORAGE_KEY_GSHEET_AUTOSYNC,
  STORAGE_KEY_GSHEET_INTERVAL,
} from './data/sipelkaParser';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'sop_jaringan'>('ringkasan');
  const [records, setRecords] = useState<SipelkaRawRecord[]>([]);
  const [datasetName, setDatasetName] = useState<string>('Data SIPELKA Kabupaten Nagekeo');
  const [lastUpdated, setLastUpdated] = useState<string>('27 Okt 2026, 12:17 WITA');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessAnim, setSyncSuccessAnim] = useState<boolean>(false);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  // Google Sheet integration state (persisted across sessions via localStorage)
  const [connectedSheetUrl, setConnectedSheetUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_GSHEET_URL) || '';
    } catch {
      return '';
    }
  });

  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_GSHEET_AUTOSYNC) === 'true';
    } catch {
      return false;
    }
  });

  const [syncIntervalMinutes, setSyncIntervalMinutes] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GSHEET_INTERVAL);
      return stored ? Number(stored) : 5;
    } catch {
      return 5;
    }
  });

  const [filters, setFilters] = useState<FilterState>({
    tahun: 'semua',
    kecamatan: 'semua',
    kategori: 'semua',
  });

  // 1-Click Quick Sync: Immediately pull from connected Google Sheet or load latest public dataset
  const handleQuickSync = useCallback(async () => {
    setIsSyncing(true);
    setNotificationBanner(null);

    try {
      const targetUrl = connectedSheetUrl || (typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY_GSHEET_URL) : '');

      if (targetUrl) {
        // Fetch live from connected Google Sheet
        const { records: sheetRecords, count } = await fetchGoogleSheetData(targetUrl);
        if (sheetRecords && sheetRecords.length > 0) {
          setRecords(sheetRecords);
          setDatasetName('Google Sheet SIPELKA (Live)');
          const timeStr = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WITA';
          setLastUpdated(timeStr);
          setSyncSuccessAnim(true);
          setNotificationBanner(`Sinkronisasi Berhasil: ${count} data kasus terbaru dari Google Sheet telah dimuat.`);
          setTimeout(() => setSyncSuccessAnim(false), 2500);
          setTimeout(() => setNotificationBanner(null), 4500);
          return;
        }
      }

      // If no Google Sheet linked yet, fetch from the attached SIPELKA public file
      const loaded = await loadDefaultSipelkaDataset();
      if (loaded && loaded.length > 0) {
        setRecords(loaded);
        setDatasetName('Data SIPELKA Terhubung');
        const timeStr = new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WITA';
        setLastUpdated(timeStr);
        setSyncSuccessAnim(true);
        setNotificationBanner(`Data berhasil disinkronkan (${loaded.length} arsip kasus). Untuk menyambungkan Google Sheet langsung, klik tombol ikon roda gigi.`);
        setTimeout(() => setSyncSuccessAnim(false), 2500);
        setTimeout(() => setNotificationBanner(null), 4500);
      }
    } catch (err) {
      console.error('Quick sync error:', err);
      // If fetching the connected Google Sheet failed, prompt the modal so the user can fix the URL
      setIsSyncModalOpen(true);
      setNotificationBanner(`Gagal menyinkronkan Google Sheet: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSyncing(false);
    }
  }, [connectedSheetUrl]);

  // Initial load
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      try {
        const savedUrl = localStorage.getItem(STORAGE_KEY_GSHEET_URL);
        if (savedUrl) {
          try {
            const { records: sheetRecords } = await fetchGoogleSheetData(savedUrl);
            if (sheetRecords && sheetRecords.length > 0) {
              setRecords(sheetRecords);
              setDatasetName('Google Sheet SIPELKA (Live)');
              setLastUpdated(
                new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }) + ' WITA'
              );
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Could not load from Google Sheet on init, falling back to local file:', e);
          }
        }

        const loaded = await loadDefaultSipelkaDataset();
        if (loaded && loaded.length > 0) {
          setRecords(loaded);
          setDatasetName('Data SIPELKA Aktif (/Data_SIPELKA)');
          setLastUpdated(
            new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) + ' WITA'
          );
        }
      } catch (err) {
        console.error('Error initializing SIPELKA data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    initData();
  }, []);

  // Periodic Auto-Sync Timer when enabled
  useEffect(() => {
    if (!isAutoSyncEnabled || !connectedSheetUrl) return;

    const intervalMs = Math.max(syncIntervalMinutes, 1) * 60 * 1000;
    const timerId = setInterval(() => {
      handleQuickSync();
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [isAutoSyncEnabled, connectedSheetUrl, syncIntervalMinutes, handleQuickSync]);

  // Compute calculated metrics
  const ringkasan = useMemo(() => {
    return calculateRingkasan(records, filters);
  }, [records, filters]);

  const handleConnectGoogleSheet = async (
    url: string,
    autoSync: boolean,
    intervalMinutes: number
  ) => {
    const { records: sheetRecords, count } = await fetchGoogleSheetData(url);
    if (!sheetRecords || sheetRecords.length === 0) {
      throw new Error('Tidak ada data valid yang dapat dibaca dari spreadsheet.');
    }

    setRecords(sheetRecords);
    setConnectedSheetUrl(url);
    setIsAutoSyncEnabled(autoSync);
    setSyncIntervalMinutes(intervalMinutes);
    setDatasetName('Google Sheet SIPELKA (Live)');
    setLastUpdated(
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WITA (Tersambung)'
    );

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY_GSHEET_URL, url);
      localStorage.setItem(STORAGE_KEY_GSHEET_AUTOSYNC, String(autoSync));
      localStorage.setItem(STORAGE_KEY_GSHEET_INTERVAL, String(intervalMinutes));
    } catch (e) {
      console.warn('Could not save Google Sheet settings to localStorage', e);
    }

    setNotificationBanner(`Google Sheet SIPELKA berhasil terhubung (${count} kasus). Cukup klik "Sinkronisasi Data" kapan saja untuk sinkronisasi instan!`);
    setTimeout(() => setNotificationBanner(null), 5000);
  };

  const handleDataUpdated = (newRecords: SipelkaRawRecord[], sourceName: string) => {
    setRecords(newRecords);
    setDatasetName(`Unggahan: ${sourceName}`);
    setLastUpdated(
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WITA'
    );
  };

  const handleReloadDefault = async () => {
    try {
      localStorage.removeItem(STORAGE_KEY_GSHEET_URL);
      localStorage.removeItem(STORAGE_KEY_GSHEET_AUTOSYNC);
    } catch {}
    setConnectedSheetUrl('');
    setIsAutoSyncEnabled(false);

    const loaded = await loadDefaultSipelkaDataset();
    setRecords(loaded);
    setDatasetName('Data SIPELKA Terhubung');
    setLastUpdated(
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WITA'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Header with 1-Click Instant Sync button and quick call links */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickSync={handleQuickSync}
        onOpenSyncSettings={() => setIsSyncModalOpen(true)}
        onPrint={handlePrint}
        totalKasus={ringkasan.totalKasus}
        lastUpdated={lastUpdated}
        isSyncing={isSyncing}
        syncSuccessAnim={syncSuccessAnim}
      />

      {/* Floating notification alert on sync */}
      {notificationBanner && (
        <div className="bg-emerald-800 text-white text-xs px-4 py-2 text-center font-medium shadow-md transition-all animate-fadeIn flex items-center justify-center gap-2">
          <span>{notificationBanner}</span>
          <button
            onClick={() => setNotificationBanner(null)}
            className="text-emerald-200 hover:text-white underline ml-2 text-[11px]"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Privacy Notice Banner */}
      <PrivacyBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8 print:p-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium text-slate-500">Memuat data SIPELKA Nagekeo...</p>
          </div>
        ) : (
          <>
            {activeTab === 'ringkasan' ? (
              <RingkasanView
                ringkasan={ringkasan}
                filters={filters}
                onFilterChange={setFilters}
                rawRecordsCount={records.length}
                activeDatasetName={datasetName}
              />
            ) : (
              <SopJaringanView />
            )}
          </>
        )}
      </main>

      {/* Print-only template for official executive reports */}
      <PrintableSummary
        ringkasan={ringkasan}
        filters={filters}
        dateStr={new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      />

      {/* Footer with extra bottom padding for mobile navigation bar */}
      <div className="pb-16 md:pb-0">
        <Footer />
      </div>

      {/* Dedicated Bottom Navigation Bar for Android & iPhone with 1-Click Sync */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickSync={handleQuickSync}
        totalKasus={ringkasan.totalKasus}
        isSyncing={isSyncing}
        syncSuccessAnim={syncSuccessAnim}
      />

      {/* Data Synchronization & Google Sheet Auto-Sync Modal */}
      <DataSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onDataUpdated={handleDataUpdated}
        onReloadDefault={handleReloadDefault}
        currentRecordsCount={records.length}
        currentDatasetName={datasetName}
        onConnectGoogleSheet={handleConnectGoogleSheet}
        connectedSheetUrl={connectedSheetUrl}
        isAutoSyncEnabled={isAutoSyncEnabled}
        syncIntervalMinutes={syncIntervalMinutes}
      />
    </div>
  );
}
