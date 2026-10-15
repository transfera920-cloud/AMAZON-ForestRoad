/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { FORESTRY_ROADS } from './data/forestryRoads';
import { ForestryRoad, FilterState } from './types/forestryRoad';
import { Header } from './components/Header';
import { StatSummaryCards } from './components/StatSummaryCards';
import { FilterBar } from './components/FilterBar';
import { RoadCard } from './components/RoadCard';
import { RoadDetailModal } from './components/RoadDetailModal';
import { SafetyPlanModal } from './components/SafetyPlanModal';
import { GlossarySection } from './components/GlossarySection';
import { FaqSection } from './components/FaqSection';
import { SafetyDisclaimer } from './components/SafetyDisclaimer';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import {
  Compass,
  Mountain,
  Download,
  Shield,
  FileText,
  Activity,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'database' | 'safetyPlan' | 'glossary' | 'faq' | 'seo'>('database');
  const [selectedRoadForDetail, setSelectedRoadForDetail] = useState<ForestryRoad | null>(null);
  const [selectedRoadForSafety, setSelectedRoadForSafety] = useState<ForestryRoad | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    branch: 'all',
    status: 'all',
    elevationBand: 'all',
    difficulty: 'all',
    vehicle: 'all',
    permitOnly: 'all',
    sortBy: 'update',
  });

  // Inject Schema.org JSON-LD structured data into document head
  useEffect(() => {
    const existingScript = document.getElementById('json-ld-schema');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            'name': '台灣林道通行狀況資料庫',
            'applicationCategory': 'OutdoorsApplication',
            'operatingSystem': 'All',
            'description': '亞馬遜國家山岳協會專屬台灣林道即時路況查詢平台，收錄全台林道開放狀態、車行里程、GPX軌跡下載與留守單安全工具。',
            'publisher': {
              '@type': 'Organization',
              'name': '亞馬遜國家山岳協會'
            }
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': '台灣林道通行狀況要如何查詢最準確？官方巡查與山友即時回報有何差異？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': '查詢台灣林道通行狀況最精確的作法是官方定期巡查公告加上社群即時路況回報雙重比對。亞馬遜國家山岳協會整合了林保署最新巡查時戳與山友驗證正確率，提供最新車行K數。'
                }
              },
              {
                '@type': 'Question',
                'name': '進入台灣林道需要申請入山證或入園證嗎？哪裡可以查到免申請名單？',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': '取決於林道是否座落於山地經常管制區或國家公園生態保護區。在亞馬遜國家山岳協會資料庫中可直接透過免申請標籤篩選無需繁瑣證件即可出發的林道路線。'
                }
              }
            ]
          }
        ]
      });
      document.head.appendChild(script);
    }
  }, []);

  // Filtered and sorted roads
  const filteredRoads = useMemo(() => {
    return FORESTRY_ROADS.filter((road) => {
      // Search query matches name, aliases, branch, or highlights
      if (filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase().trim();
        const nameMatch = road.name.toLowerCase().includes(query);
        const aliasMatch = road.aliases?.some((a) => a.toLowerCase().includes(query)) || false;
        const branchMatch = road.branch.toLowerCase().includes(query);
        const highlightMatch = road.highlights.some((h) => h.toLowerCase().includes(query));
        const noteMatch = road.statusNote.toLowerCase().includes(query);
        if (!nameMatch && !aliasMatch && !branchMatch && !highlightMatch && !noteMatch) {
          return false;
        }
      }

      // Branch filter
      if (filter.branch !== 'all' && road.branch !== filter.branch) {
        return false;
      }

      // Status filter
      if (filter.status !== 'all' && road.status !== filter.status) {
        return false;
      }

      // Elevation band filter
      if (filter.elevationBand !== 'all' && road.elevationBand !== filter.elevationBand) {
        return false;
      }

      // Difficulty level filter
      if (filter.difficulty !== 'all' && road.difficultyLevel.toString() !== filter.difficulty) {
        return false;
      }

      // Vehicle filter
      if (filter.vehicle !== 'all') {
        const vehicleKey = filter.vehicle as keyof typeof road.vehicles;
        if (road.vehicles[vehicleKey] === 'impassable') {
          return false;
        }
      }

      // Permit requirement filter
      if (filter.permitOnly === 'free') {
        if (road.permitsRequired.mountainEntry || road.permitsRequired.parkEntry) {
          return false;
        }
      } else if (filter.permitOnly === 'needPermit') {
        if (!road.permitsRequired.mountainEntry && !road.permitsRequired.parkEntry) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'update') {
        return b.lastInspectedDate.localeCompare(a.lastInspectedDate);
      }
      if (filter.sortBy === 'length') {
        return b.totalLengthKm - a.totalLengthKm;
      }
      if (filter.sortBy === 'elevation') {
        return b.maxElevationM - a.maxElevationM;
      }
      if (filter.sortBy === 'difficulty') {
        return b.difficultyLevel - a.difficultyLevel;
      }
      return 0;
    });
  }, [filter]);

  const handleOpenSafetyPlan = (road: ForestryRoad) => {
    setSelectedRoadForSafety(road);
    setShowSafetyModal(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSafetyPlanModal={() => {
          setSelectedRoadForSafety(FORESTRY_ROADS[0]);
          setShowSafetyModal(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section with Official SEO H1 & Copy */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 p-6 sm:p-10 mb-8 shadow-2xl">
          {/* Subtle topographic background accent */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Brand Authority Tag */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                亞馬遜國家山岳協會官方平台
              </span>
              <span className="text-xs text-stone-400">
                林業及自然保育署 8 大分署 · 每日巡查同步
              </span>
            </div>

            {/* H1 SEO Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              台灣林道通行狀況資料庫
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                即時路況查詢 · GPX軌跡免費下載 · 中高海拔產業道路
              </span>
            </h1>

            {/* Introductory Text (approx 150-200 chars/words with key SEO terms) */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl mb-6">
              歡迎使用亞馬遜國家山岳協會打造的「台灣林道通行狀況資料庫」。本平台全面收錄農業部林業及自然保育署各分署轄管林道、清單外中高海拔農路與解編山徑，每日即時更新全台林道開放狀態與最新巡查里程。無論您是越野四驅車主、機車騎士、登山客或單車騎士，皆可在此一鍵查詢最精確的林道路況、崩塌管制點與通報電話，並免費下載官方標準林道 GPX 軌跡檔。結合即時天氣風險與線上留守單安全工具，助您做好全自主風險評估，平安暢遊台灣壯麗山林！
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('database');
                  window.scrollTo({ top: 460, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                即刻查詢全台林道路況
              </button>

              <button
                onClick={() => {
                  setSelectedRoadForSafety(FORESTRY_ROADS[0]);
                  setShowSafetyModal(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm border border-stone-700 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                線上填寫入山留守單
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className="px-4 py-2.5 rounded-xl bg-teal-950/60 hover:bg-teal-900/60 text-teal-300 font-medium text-xs sm:text-sm border border-teal-800/60 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                檢視 SEO 策略架構
              </button>
            </div>
          </div>
        </section>

        {/* Tab 1: Database View */}
        {activeTab === 'database' && (
          <>
            {/* Status Statistics Summary Cards */}
            <StatSummaryCards
              roads={FORESTRY_ROADS}
              selectedStatus={filter.status}
              onSelectStatus={(status) => setFilter((prev) => ({ ...prev, status }))}
            />

            {/* Filter Bar */}
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              totalMatches={filteredRoads.length}
            />

            {/* Forest Roads Cards Grid */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>全台林道詳細路況清冊</span>
                  <span className="text-xs font-normal text-stone-400">
                    （共 {filteredRoads.length} 條符合條件路線）
                  </span>
                </h2>
              </div>

              {filteredRoads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRoads.map((road) => (
                    <RoadCard
                      key={road.id}
                      road={road}
                      onOpenDetailModal={setSelectedRoadForDetail}
                      onOpenSafetyPlan={handleOpenSafetyPlan}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center text-stone-400">
                  <Mountain className="w-12 h-12 mx-auto text-stone-600 mb-3" />
                  <p className="text-base font-semibold text-stone-200 mb-1">
                    未找到符合當前篩選條件的林道路線
                  </p>
                  <p className="text-xs text-stone-400 mb-4">
                    請嘗試清除關鍵字搜尋或放寬分署、難度或車輛適配限制。
                  </p>
                  <button
                    onClick={() =>
                      setFilter({
                        searchQuery: '',
                        branch: 'all',
                        status: 'all',
                        elevationBand: 'all',
                        difficulty: 'all',
                        vehicle: 'all',
                        permitOnly: 'all',
                        sortBy: 'update',
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                  >
                    重設所有篩選條件
                  </button>
                </div>
              )}
            </section>

            {/* Integrated Glossary & FAQ Sections for complete SEO cluster on homepage */}
            <GlossarySection />
            <FaqSection />
            <SafetyDisclaimer />
          </>
        )}

        {/* Tab 2: Safety Plan Generator Tool */}
        {activeTab === 'safetyPlan' && (
          <div className="space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-white">
                  亞馬遜國家山岳協會 · 戶外探險留守單專區
                </h2>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                進入高山林道與野營環境，無手機通訊死角多。留守單是一旦隊伍發生翻車、土石流受困或失聯時，平地留守人向消防搜救單位啟動搜救的唯一核心憑據。
              </p>
              <button
                onClick={() => {
                  setSelectedRoadForSafety(FORESTRY_ROADS[0]);
                  setShowSafetyModal(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-stone-950" />
                立即打開留守單線上填寫視窗
              </button>
            </div>
            <SafetyDisclaimer />
          </div>
        )}

        {/* Tab 3: Glossary Section */}
        {activeTab === 'glossary' && (
          <>
            <GlossarySection />
            <SafetyDisclaimer />
          </>
        )}

        {/* Tab 4: FAQ Section */}
        {activeTab === 'faq' && (
          <>
            <FaqSection />
            <SafetyDisclaimer />
          </>
        )}

        {/* Tab 5: SEO Architecture Inspector */}
        {activeTab === 'seo' && (
          <SeoInspectorModal />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold">
              亞
            </div>
            <div>
              <p className="font-bold text-stone-200">
                亞馬遜國家山岳協會 (Amazon Mountain Association)
              </p>
              <p className="text-[11px] text-stone-400">
                台灣最專業、最即時的林道通行狀況與安全資訊平台
              </p>
            </div>
          </div>
          <div className="text-center md:text-right text-[11px] text-stone-400">
            <p>資料每日對接農業部林業及自然保育署各分署公告 ＆ 山友社群通報</p>
            <p className="mt-0.5">山區活動請遵循「無痕山林 (LNT)」原則，守護台灣美麗珍貴之森林生態</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedRoadForDetail && (
        <RoadDetailModal
          road={selectedRoadForDetail}
          onClose={() => setSelectedRoadForDetail(null)}
          onOpenSafetyPlan={handleOpenSafetyPlan}
        />
      )}

      {showSafetyModal && (
        <SafetyPlanModal
          initialRoad={selectedRoadForSafety}
          allRoads={FORESTRY_ROADS}
          onClose={() => setShowSafetyModal(false)}
        />
      )}
    </div>
  );
}
