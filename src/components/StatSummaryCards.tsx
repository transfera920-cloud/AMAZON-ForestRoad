import React from 'react';
import { ForestryRoad, RoadStatus } from '../types/forestryRoad';
import { CheckCircle2, AlertTriangle, Clock, Ban, HelpCircle, Layers } from 'lucide-react';

interface StatSummaryCardsProps {
  roads: ForestryRoad[];
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export const StatSummaryCards: React.FC<StatSummaryCardsProps> = ({
  roads,
  selectedStatus,
  onSelectStatus,
}) => {
  const counts = {
    all: roads.length,
    open: roads.filter(r => r.status === 'open').length,
    partial: roads.filter(r => r.status === 'partial').length,
    regulated: roads.filter(r => r.status === 'regulated').length,
    closed: roads.filter(r => r.status === 'closed').length,
    unconfirmed: roads.filter(r => r.status === 'unconfirmed').length,
  };

  const cards: {
    status: string;
    title: string;
    count: number;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      status: 'all',
      title: '收錄總數',
      count: counts.all,
      color: 'text-stone-100',
      bgColor: 'bg-stone-800/80',
      borderColor: 'border-stone-700',
      icon: <Layers className="w-5 h-5 text-stone-300" />,
      description: '全台林保署所屬與清單外高山農路',
    },
    {
      status: 'open',
      title: '全線通行',
      count: counts.open,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-600/50',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      description: '路面良好，一般車輛或SUV可抵達登山口',
    },
    {
      status: 'partial',
      title: '部分封閉',
      count: counts.partial,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-600/50',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      description: '前段可達指定K數，中後段崩壁或鋼便橋阻斷',
    },
    {
      status: 'regulated',
      title: '交通管制',
      count: counts.regulated,
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-600/50',
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      description: '特定時段放行、鐵門檢查哨或每日承載量限制',
    },
    {
      status: 'closed',
      title: '全線封閉',
      count: counts.closed,
      color: 'text-rose-400',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-600/50',
      icon: <Ban className="w-5 h-5 text-rose-400" />,
      description: '地質劇烈滑移已解編，嚴禁機動車輛駛入',
    },
    {
      status: 'unconfirmed',
      title: '未確認',
      count: counts.unconfirmed,
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40',
      borderColor: 'border-purple-600/50',
      icon: <HelpCircle className="w-5 h-5 text-purple-400" />,
      description: '天候劇變後待官方巡查或山友回報驗證中',
    },
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-stone-200 flex items-center gap-2">
          <span>全台林道通行即時動態統計</span>
          <span className="text-xs font-normal text-stone-400">
            （點擊卡片可快速篩選對應狀態林道）
          </span>
        </h2>
        <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full font-mono">
          即時巡查驗證率 97.4%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => {
          const isSelected = selectedStatus === card.status;
          return (
            <button
              key={card.status}
              onClick={() => onSelectStatus(card.status)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${card.bgColor} ${card.borderColor} ${
                isSelected
                  ? 'ring-2 ring-emerald-400 shadow-lg scale-[1.02]'
                  : 'hover:border-stone-500 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-300">
                  {card.title}
                </span>
                {card.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight mb-1 ${card.color}`}>
                {card.count}
                <span className="text-xs font-normal text-stone-400 ml-1">條</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-tight line-clamp-2">
                {card.description}
              </p>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
