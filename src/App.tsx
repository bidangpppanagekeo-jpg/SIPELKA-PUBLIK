/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
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
  BASELINE_SIPELKA_DATA,
} from './data/sipelkaParser';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'sop_jaringan'>('ringkasan');
  const [records, setRecords] = useState<SipelkaRawRecord[]>(BASELINE_SIPELKA_DATA);
  const [datasetName, setDatasetName] = useState<string>('Data SIPELKA Kabupaten Nagekeo');
  const [lastUpdated, setLastUpdated] = useState<string>('27 Okt 2026, 12:17 WITA');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterState>({
    tahun: 'semua',
    kecamatan: 'semua',
    kategori: 'semua',
  });

  // Load attached SIPELKA file on initial render
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      try {
        const loaded = await loadDefaultSipelkaDataset();
        if (loaded && loaded.length > 0) {
          setRecords(loaded);
          setDatasetName('Data SIPELKA Aktif (/Data_SIPELKA)');
          setLastUpdated(new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WITA');
        }
      } catch (err) {
        console.error('Error initializing SIPELKA data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    initData();
  }, []);

  // Compute calculated metrics
  const ringkasan = useMemo(() => {
    return calculateRingkasan(records, filters);
  }, [records, filters]);

  const handleDataUpdated = (newRecords: SipelkaRawRecord[], sourceName: string) => {
    setRecords(newRecords);
    setDatasetName(`Unggahan: ${sourceName}`);
    setLastUpdated(new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WITA');
  };

  const handleReloadDefault = async () => {
    const loaded = await loadDefaultSipelkaDataset();
    setRecords(loaded);
    setDatasetName('Data SIPELKA Terhubung');
    setLastUpdated(new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WITA');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Header with quick call links and Tab Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onPrint={handlePrint}
        totalKasus={ringkasan.totalKasus}
        lastUpdated={lastUpdated}
      />

      {/* Privacy Notice Banner */}
      <PrivacyBanner />

      {/* Main Content Area (Extra padding at bottom on mobile for BottomNav) */}
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

      {/* Dedicated Bottom Navigation Bar for Android & iPhone */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSync={() => setIsSyncModalOpen(true)}
        totalKasus={ringkasan.totalKasus}
      />

      {/* Data Synchronization & CSV Upload Modal */}
      <DataSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onDataUpdated={handleDataUpdated}
        onReloadDefault={handleReloadDefault}
        currentRecordsCount={records.length}
        currentDatasetName={datasetName}
      />
    </div>
  );
}
