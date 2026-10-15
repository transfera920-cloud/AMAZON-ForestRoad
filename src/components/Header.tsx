import React from 'react';
import { Compass, Shield, Mountain, FileText, HelpCircle, Code2, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeTab: 'database' | 'safetyPlan' | 'glossary' | 'faq' | 'seo';
  setActiveTab: (tab: 'database' | 'safetyPlan' | 'glossary' | 'faq' | 'seo') => void;
  onOpenSafetyPlanModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSafetyPlanModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
      {/* Top emergency & authority bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/50 px-4 py-1.5 text-xs text-emerald-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-100">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              官方同步認證
            </span>
            <span>整合林業及自然保育署 8 大分署巡查資料庫 ＆ 清單外高山農路</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <a href="tel:0800000930" className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>林務局救災通報專線: 0800-000-930</span>
            </a>
            <span className="hidden sm:inline text-emerald-500">|</span>
            <span className="hidden sm:inline">緊急報案: 112 / 119</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('database')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-500/30 group-hover:scale-105 transition-transform">
            <Mountain className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                亞馬遜國家山岳協會
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-stone-400 tracking-wide">
              台灣林道通行狀況資料庫 · Taiwan Forestry Road Explorer
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-full">
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            林道路況資料庫
          </button>

          <button
            onClick={() => setActiveTab('safetyPlan')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'safetyPlan'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            留守單線上產生器
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            名詞解釋小百科
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            常見問題 FAQ
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              activeTab === 'seo'
                ? 'bg-teal-700 text-white border-teal-500 shadow-md'
                : 'text-teal-300 border-teal-800/60 hover:bg-teal-950/50'
            }`}
          >
            <Code2 className="w-4 h-4 text-teal-300" />
            SEO 專家架構檢驗
          </button>
        </nav>
      </div>
    </header>
  );
};
