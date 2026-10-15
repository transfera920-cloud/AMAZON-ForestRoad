import React from 'react';
import { AlertTriangle, ShieldAlert, CloudRain, PhoneCall, CheckCircle } from 'lucide-react';

export const SafetyDisclaimer: React.FC = () => {
  return (
    <section className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl text-stone-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            SAFETY ADVISORY & DISCLAIMER
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            亞馬遜國家山岳協會 · 安全提醒與法律免責聲明
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Official authority precedence */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            以主管機關現場最新公告為準
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            本平台所提供之通行狀態、車行里程、管制時段與路況評級，係整合農業部林業及自然保育署（林保署）各分署、地方鄉鎮公所及山友第一線回報資料。惟高山林道地質極端脆弱，若現場管制告示與本資料庫有所出入，請一律以「主管機關現場管制哨公文與鐵門警示」為最高法律準則。
          </p>
        </div>

        {/* Card 2: Monsoon & Typhoon precautions */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
            <CloudRain className="w-4 h-4 text-rose-400" />
            汛期與暴雨預警性封閉注意事項
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            每年 5 月至 11 月為台灣梅雨及颱風汛期。當中央氣象署發布豪雨特報，或林道集水區 24 小時累積雨量達 150mm～200mm 以上時，各林道常實施預警性封閉。強降雨期間切勿強行涉渡濁水溪、萬里溪等過水便道，嚴防溪水瞬間暴漲與順向坡大規模走山。
          </p>
        </div>

        {/* Card 3: Autonomous Outdoor Responsibility */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
            <AlertTriangle className="w-4 h-4 text-emerald-400" />
            全自主風險評估與留守制度
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            林道探險非一般公路兜風，使用者進入前應審慎評估個人駕駛技術、車輛越野機械體質、全地形AT輪胎狀況與隨車拖車帶脫困能力。嚴格要求出發前指派平地留守人並交付留守單，自負個人安全責任，並落實「無痕山林（Leave No Trace）」原則，帶走所有垃圾。
          </p>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-emerald-950/40 to-stone-950 p-4 rounded-2xl border border-emerald-900/60 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-emerald-300 block">
              山區緊急求救重要通報專線
            </span>
            <span className="text-stone-400">
              無手機訊號請撥打 112 ｜ 遇消防救難請撥打 119 ｜ 林務局山林救災 0800-000-930
            </span>
          </div>
        </div>

        <div className="text-[11px] text-stone-400 font-mono">
          版權所有 © 2026 亞馬遜國家山岳協會 (Amazon Mountain Association)
        </div>
      </div>
    </section>
  );
};
