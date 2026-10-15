import React from 'react';
import { FilterState, ForestryBranch, ElevationBand } from '../types/forestryRoad';
import { Search, RotateCcw, SlidersHorizontal, Mountain, Car, CheckSquare, ShieldCheck } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
}

const BRANCHES: { label: string; value: string }[] = [
  { label: '全部分署單位', value: 'all' },
  { label: '南投分署', value: '南投分署' },
  { label: '新竹分署', value: '新竹分署' },
  { label: '臺中分署', value: '臺中分署' },
  { label: '花蓮分署', value: '花蓮分署' },
  { label: '宜蘭分署', value: '宜蘭分署' },
  { label: '屏東分署', value: '屏東分署' },
  { label: '嘉義分署', value: '嘉義分署' },
  { label: '臺東分署', value: '臺東分署' },
  { label: '清單外 / 地方公所道路', value: '清單外/地方道路' },
];

const ELEVATIONS: { label: string; value: string }[] = [
  { label: '全部海拔帶', value: 'all' },
  { label: '低海拔 (< 1,000m)', value: 'low' },
  { label: '中海拔 (1,000m ~ 2,000m)', value: 'mid' },
  { label: '高海拔 (2,000m ~ 3,000m)', value: 'high' },
  { label: '超高海拔 (> 3,000m)', value: 'alpine' },
];

const DIFFICULTIES: { label: string; value: string }[] = [
  { label: '全部難度', value: 'all' },
  { label: '1級 (休旅平整)', value: '1' },
  { label: '2級 (輕度碎石)', value: '2' },
  { label: '3級 (越野挑戰)', value: '3' },
  { label: '4級 (極限險路)', value: '4' },
  { label: '5級 (荒廢斷橋/步行)', value: '5' },
];

const VEHICLES: { label: string; value: string }[] = [
  { label: '所有交通工具', value: 'all' },
  { label: '汽車 / 高底盤 4WD', value: 'car4wd' },
  { label: '機車 / 越野二輪', value: 'motorcycle' },
  { label: '自行車 / 登山單車', value: 'bicycle' },
  { label: '步行徒步', value: 'hiking' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  totalMatches,
}) => {
  const handleReset = () => {
    setFilter({
      searchQuery: '',
      branch: 'all',
      status: 'all',
      elevationBand: 'all',
      difficulty: 'all',
      vehicle: 'all',
      permitOnly: 'all',
      sortBy: 'update',
    });
  };

  const isFiltered =
    filter.searchQuery !== '' ||
    filter.branch !== 'all' ||
    filter.status !== 'all' ||
    filter.elevationBand !== 'all' ||
    filter.difficulty !== 'all' ||
    filter.vehicle !== 'all' ||
    filter.permitOnly !== 'all';

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
      {/* Search and primary controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="搜尋林道名稱、關鍵字、地標（如：丹大、郡大、七彩湖、望鄉、霞喀羅、桶後）..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setFilter((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              清除
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 whitespace-nowrap hidden sm:inline">排序：</span>
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-3 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="update">官方最新巡查排序</option>
            <option value="length">總長度 (長至短)</option>
            <option value="elevation">最高海拔 (高至低)</option>
            <option value="difficulty">路況難度 (高至低)</option>
          </select>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 text-xs transition-colors whitespace-nowrap border border-stone-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重設條件</span>
            </button>
          )}
        </div>
      </div>

      {/* Multi-criteria dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Branch */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
            主管分署
          </label>
          <select
            value={filter.branch}
            onChange={(e) => setFilter((prev) => ({ ...prev, branch: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-emerald-500 focus:outline-none"
          >
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Elevation Band */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
            海拔高度帶
          </label>
          <select
            value={filter.elevationBand}
            onChange={(e) => setFilter((prev) => ({ ...prev, elevationBand: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-emerald-500 focus:outline-none"
          >
            {ELEVATIONS.map((el) => (
              <option key={el.value} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
            路況難度 (1-5級)
          </label>
          <select
            value={filter.difficulty}
            onChange={(e) => setFilter((prev) => ({ ...prev, difficulty: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-emerald-500 focus:outline-none"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
            交通工具適配
          </label>
          <select
            value={filter.vehicle}
            onChange={(e) => setFilter((prev) => ({ ...prev, vehicle: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-emerald-500 focus:outline-none"
          >
            {VEHICLES.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        {/* Permit requirement */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
            許可證要求
          </label>
          <select
            value={filter.permitOnly}
            onChange={(e) => setFilter((prev) => ({ ...prev, permitOnly: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">全部許可狀態</option>
            <option value="free">免申請（自由進出）</option>
            <option value="needPermit">需申請（入山/入園/特許）</option>
          </select>
        </div>

        {/* Match count display */}
        <div className="flex flex-col justify-end">
          <div className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="text-stone-400">符合條件</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {totalMatches} <span className="text-[11px] text-stone-400">條</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
