import React, { useState } from 'react';
import { ForestryRoad } from '../types/forestryRoad';
import { downloadGpxFile } from '../utils/gpxGenerator';
import {
  MapPin,
  Calendar,
  Compass,
  Phone,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Ban,
  HelpCircle,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Radio,
  FileText,
  Activity,
  Layers,
  Car,
  Bike,
  Footprints,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface RoadCardProps {
  road: ForestryRoad;
  onOpenDetailModal: (road: ForestryRoad) => void;
  onOpenSafetyPlan: (road: ForestryRoad) => void;
}

export const RoadCard: React.FC<RoadCardProps> = ({
  road,
  onOpenDetailModal,
  onOpenSafetyPlan,
}) => {
  const [copiedCoord, setCopiedCoord] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCoord(type);
    setTimeout(() => setCopiedCoord(null), 2000);
  };

  const getStatusBadge = () => {
    switch (road.status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            全線通行
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            部分封閉
          </span>
        );
      case 'regulated':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-950/90 text-blue-300 border border-blue-500/50 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            交通管制
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-sm">
            <Ban className="w-3.5 h-3.5 text-rose-400" />
            全線封閉
          </span>
        );
      case 'unconfirmed':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/90 text-purple-300 border border-purple-500/50 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            未確認
          </span>
        );
    }
  };

  const getDifficultyBadge = (level: number) => {
    const colors: Record<number, string> = {
      1: 'bg-emerald-900/60 text-emerald-200 border-emerald-600/50',
      2: 'bg-teal-900/60 text-teal-200 border-teal-600/50',
      3: 'bg-amber-900/60 text-amber-200 border-amber-600/50',
      4: 'bg-orange-900/60 text-orange-200 border-orange-600/50',
      5: 'bg-rose-900/60 text-rose-200 border-rose-600/50',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${colors[level] || 'bg-stone-800 text-stone-200'}`}>
        難度 {level} 級
      </span>
    );
  };

  const getVehicleBadge = (status: 'passable' | 'difficult' | 'impassable') => {
    switch (status) {
      case 'passable':
        return <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">可通行</span>;
      case 'difficult':
        return <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-medium">重度難行</span>;
      case 'impassable':
        return <span className="text-[11px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-medium">不可行</span>;
    }
  };

  // Generate mini elevation sparkline
  const minEle = Math.min(...road.waypoints.map(w => w.elevation));
  const maxEle = Math.max(...road.waypoints.map(w => w.elevation));
  const eleSpan = maxEle - minEle || 1;
  const sparklinePoints = road.waypoints.map((wp, i) => {
    const x = (i / (road.waypoints.length - 1 || 1)) * 140;
    const y = 32 - ((wp.elevation - minEle) / eleSpan) * 26;
    return `${x},${y}`;
  }).join(' ');

  return (
    <article className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 sm:p-6 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2.5 mb-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                {road.branch}
              </span>
              {getDifficultyBadge(road.difficultyLevel)}
              {road.permitsRequired.mountainEntry || road.permitsRequired.parkEntry ? (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" />
                  需辦證件
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                  免申請進入
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {road.name}
            </h3>
            {road.aliases && road.aliases.length > 0 && (
              <p className="text-xs text-stone-400 mt-0.5">
                別名：{road.aliases.join(' · ')}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            {getStatusBadge()}
            <div className="text-[11px] text-stone-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              <span>官方巡查：{road.lastInspectedDate}</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              社群正確率 {road.accuracyRate}% ({road.reportsCount}則驗證)
            </div>
          </div>
        </div>

        {/* Status Callout Note */}
        <div className="bg-stone-950/90 rounded-xl p-3 border border-stone-800 mb-4 text-xs text-stone-300 leading-relaxed">
          <span className="font-bold text-amber-400 mr-1.5">【最新路況通報】</span>
          {road.statusNote}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-xs">
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <span className="text-stone-400 block mb-0.5">林道總長度</span>
            <span className="font-mono text-base font-bold text-stone-100">
              {road.totalLengthKm} <span className="text-xs font-normal text-stone-400">km</span>
            </span>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <span className="text-stone-400 block mb-0.5">目前可通車至</span>
            <span className="font-mono text-base font-bold text-emerald-400">
              {road.passableUpToKm} <span className="text-xs font-normal text-stone-400">K</span>
            </span>
            <span className="text-[10px] text-stone-400 block truncate">
              {road.controlPointNote ? '設有檢查哨/管制' : '無中途鐵門'}
            </span>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <span className="text-stone-400 block mb-0.5">最高海拔 / 爬升</span>
            <span className="font-mono text-base font-bold text-stone-100">
              {road.maxElevationM} <span className="text-xs font-normal text-stone-400">m</span>
            </span>
            <span className="text-[10px] text-stone-400 block">
              + {road.cumulativeAscentM}m 累積爬升
            </span>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <span className="text-stone-400 block mb-0.5">行動通訊收訊點</span>
            <span className="font-mono text-base font-bold text-teal-400 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              {road.cellSignalSpotsCount} <span className="text-xs font-normal text-stone-400">處節點</span>
            </span>
            <span className="text-[10px] text-stone-400 block truncate">
              {road.cellSignalProviders[0] || '部分覆蓋'}
            </span>
          </div>
        </div>

        {/* WGS84 Coordinates Box with Copy */}
        <div className="bg-stone-950/70 border border-stone-800/90 rounded-xl p-3 mb-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-stone-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              WGS84 座標導航（點擊直接複製）
            </span>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${road.startCoord.lat},${road.startCoord.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
            >
              Google Maps 導航
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="flex items-center justify-between bg-stone-900/90 px-2.5 py-1.5 rounded-lg border border-stone-800">
              <div className="truncate">
                <span className="text-stone-400 mr-1.5">起點:</span>
                <span className="text-stone-200">{road.startCoord.lat.toFixed(4)}, {road.startCoord.lng.toFixed(4)}</span>
              </div>
              <button
                onClick={() => copyToClipboard(`${road.startCoord.lat},${road.startCoord.lng}`, 'start')}
                className="text-stone-400 hover:text-white p-1 rounded"
                title="複製座標"
              >
                {copiedCoord === 'start' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between bg-stone-900/90 px-2.5 py-1.5 rounded-lg border border-stone-800">
              <div className="truncate">
                <span className="text-stone-400 mr-1.5">終點:</span>
                <span className="text-stone-200">{road.endCoord.lat.toFixed(4)}, {road.endCoord.lng.toFixed(4)}</span>
              </div>
              <button
                onClick={() => copyToClipboard(`${road.endCoord.lat},${road.endCoord.lng}`, 'end')}
                className="text-stone-400 hover:text-white p-1 rounded"
                title="複製座標"
              >
                {copiedCoord === 'end' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Vehicles suitability bar */}
        <div className="border border-stone-800 rounded-xl p-3 mb-4 bg-stone-950/40">
          <span className="text-[11px] font-semibold text-stone-400 block mb-2">
            各類交通工具通行判定：
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="flex items-center justify-between bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-stone-400" />
                汽車/4WD
              </span>
              {getVehicleBadge(road.vehicles.car4wd)}
            </div>

            <div className="flex items-center justify-between bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-stone-400" />
                越野機車
              </span>
              {getVehicleBadge(road.vehicles.motorcycle)}
            </div>

            <div className="flex items-center justify-between bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-stone-400" />
                登山單車
              </span>
              {getVehicleBadge(road.vehicles.bicycle)}
            </div>

            <div className="flex items-center justify-between bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-stone-400" />
                徒步步行
              </span>
              {getVehicleBadge(road.vehicles.hiking)}
            </div>
          </div>
        </div>

        {/* Mini Elevation Profile & Sparkline preview */}
        <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-3 mb-4 flex items-center justify-between gap-4">
          <div className="flex-1 text-xs">
            <span className="text-[11px] font-semibold text-stone-400 block">
              海拔剖面特徵（{road.elevationBandLabel}）
            </span>
            <p className="text-stone-300 text-[11px] line-clamp-1 mt-0.5">
              {road.profileDescription}
            </p>
          </div>
          <div className="w-36 h-10 flex-shrink-0 bg-stone-900/90 rounded border border-stone-800 flex items-center justify-center px-1">
            <svg viewBox="0 0 140 36" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={sparklinePoints}
              />
            </svg>
          </div>
        </div>

        {/* Expandable details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-3 text-xs">
            {/* Hazards & Safety */}
            <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-3 text-rose-200">
              <div className="font-semibold flex items-center gap-1.5 text-rose-300 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                山區自然災害與地質風險特徵
              </div>
              <p className="leading-relaxed text-[11px] text-rose-200/90">
                {road.hazardsSummary}
              </p>
            </div>

            {/* Milestones preview */}
            <div className="bg-stone-950 rounded-xl p-3 border border-stone-800">
              <div className="font-semibold text-stone-300 mb-2">沿途代表性地標與管制點</div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {road.waypoints.map((wp, i) => (
                  <div key={i} className="flex items-center justify-between text-stone-300 border-b border-stone-900 pb-1 last:border-0 last:pb-0">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${wp.isControlPoint ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                      {wp.name}
                    </span>
                    <span className="text-stone-400">
                      {wp.elevation}m {wp.hasCellSignal ? '📡訊號良好' : '❌無收訊'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-1 text-center text-xs text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1 my-1 transition-colors"
        >
          <span>{isExpanded ? '收合沿線地標與災害風險' : '展開全線地標與災害風險說明'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-4 border-t border-stone-800/80 mt-2 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Official Phone Call */}
          <a
            href={`tel:${road.officialPhone.replace(/-/g, '')}`}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
            title={`撥打 ${road.dispatchOffice} 通報電話`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>通報電話: {road.officialPhone}</span>
          </a>

          {/* Disaster potential link */}
          <a
            href={road.disasterInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs border border-stone-800 transition-colors"
            title="水保署土石流與大規模崩塌防災資訊網"
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">水保署災害潛勢</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          {/* One-click Safety Leave Form */}
          <button
            onClick={() => onOpenSafetyPlan(road)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all"
            title="一鍵將此林道路線帶入戶外留守單產生器"
          >
            <FileText className="w-3.5 h-3.5 text-stone-950" />
            <span>帶入留守單</span>
          </button>

          {/* Download GPX Button */}
          <button
            onClick={() => downloadGpxFile(road)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50 transition-all"
            title="下載可匯入 Hikingbook / 綠野遊蹤 / Garmin 的標準 GPX 軌跡檔"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下載 GPX</span>
          </button>

          {/* Detailed Elevation Modal */}
          <button
            onClick={() => onOpenDetailModal(road)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <span>完整剖面</span>
          </button>
        </div>
      </div>
    </article>
  );
};
