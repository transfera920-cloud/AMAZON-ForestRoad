import React, { useState } from 'react';
import { ForestryRoad, Waypoint } from '../types/forestryRoad';
import { downloadGpxFile } from '../utils/gpxGenerator';
import {
  X,
  MapPin,
  Compass,
  Download,
  FileText,
  Radio,
  Phone,
  AlertTriangle,
  Calendar,
  ExternalLink,
  Shield,
  Activity,
  CheckCircle2,
  Car,
  Bike,
  Footprints
} from 'lucide-react';

interface RoadDetailModalProps {
  road: ForestryRoad | null;
  onClose: () => void;
  onOpenSafetyPlan: (road: ForestryRoad) => void;
}

export const RoadDetailModal: React.FC<RoadDetailModalProps> = ({
  road,
  onClose,
  onOpenSafetyPlan,
}) => {
  if (!road) return null;

  const [activePoint, setActivePoint] = useState<Waypoint | null>(null);

  // SVG dimensions
  const width = 600;
  const height = 220;
  const padding = { top: 30, right: 30, bottom: 40, left: 55 };

  const minEle = Math.min(...road.waypoints.map(w => w.elevation));
  const maxEle = Math.max(...road.waypoints.map(w => w.elevation));
  const eleSpan = maxEle - minEle || 1;
  const maxKm = road.waypoints[road.waypoints.length - 1]?.km || road.totalLengthKm || 1;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const pointsCoords = road.waypoints.map((wp) => {
    const x = padding.left + (wp.km / maxKm) * chartWidth;
    const y = padding.top + chartHeight - ((wp.elevation - minEle) / eleSpan) * chartHeight;
    return { ...wp, x, y };
  });

  const polylineStr = pointsCoords.map(p => `${p.x},${p.y}`).join(' ');
  const areaStr = `${padding.left},${height - padding.bottom} ${polylineStr} ${padding.left + chartWidth},${height - padding.bottom}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-6 text-stone-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                {road.branch}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                最新巡查: {road.lastInspectedDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {road.name} 全線海拔剖面與里程地標
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Elevation Profile Chart */}
          <div className="bg-stone-950 rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="font-bold text-stone-200 text-sm sm:text-base flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  高程變化曲線剖面圖（互動檢視）
                </h4>
                <p className="text-xs text-stone-400">
                  可將滑鼠懸停於節點查看各 K 數標記、海拔高程與手機通訊覆蓋狀態
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-stone-400">最低: <b className="text-stone-200">{minEle}m</b></span>
                <span className="text-stone-400">最高: <b className="text-emerald-400">{maxEle}m</b></span>
                <span className="text-stone-400">爬升: <b className="text-amber-400">+{road.cumulativeAscentM}m</b></span>
              </div>
            </div>

            {/* SVG Profile Chart */}
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-64 overflow-visible">
                {/* Horizontal elevation grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = padding.top + chartHeight * (1 - ratio);
                  const eleVal = Math.round(minEle + ratio * eleSpan);
                  return (
                    <g key={i}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={padding.left + chartWidth}
                        y2={y}
                        stroke="#292524"
                        strokeDasharray="4,4"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 4}
                        fill="#78716c"
                        fontSize="10"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {eleVal}m
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area under Curve */}
                <polygon
                  points={areaStr}
                  fill="url(#elevationGradient)"
                  opacity="0.35"
                />

                {/* Elevation Line */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylineStr}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Waypoint Markers */}
                {pointsCoords.map((pt, i) => {
                  const isHovered = activePoint?.name === pt.name;
                  return (
                    <g
                      key={i}
                      className="cursor-pointer group"
                      onMouseEnter={() => setActivePoint(pt)}
                      onClick={() => setActivePoint(pt)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 7 : pt.isControlPoint ? 5 : 4}
                        fill={pt.isControlPoint ? '#F59E0B' : '#10B981'}
                        stroke="#1c1917"
                        strokeWidth="2"
                        className="transition-all"
                      />
                      <text
                        x={pt.x}
                        y={height - padding.bottom + 18}
                        fill="#a8a29e"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {pt.km}K
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hovered Tooltip Preview */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 mt-2 min-h-12 flex flex-wrap items-center justify-between gap-3 text-xs">
              {activePoint ? (
                <>
                  <div>
                    <span className="font-bold text-emerald-400 text-sm mr-2">{activePoint.name}</span>
                    <span className="text-stone-300 font-mono mr-3">里程: {activePoint.km}K ｜ 海拔: {activePoint.elevation}m</span>
                    <span className="text-stone-400">{activePoint.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${activePoint.hasCellSignal ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                      {activePoint.hasCellSignal ? '📡 有行動通訊訊號' : '❌ 無通訊死角'}
                    </span>
                    {activePoint.isControlPoint && (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
                        ⚠️ 管制/檢查哨
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-stone-500 italic">點選或懸停上方剖面點，即可檢視該 K 數地標詳情。</span>
              )}
            </div>
          </div>

          {/* Full Milestones Table */}
          <div>
            <h4 className="font-bold text-stone-200 text-sm mb-2.5">
              全線各 K 數重要地標、水源與管制點清單
            </h4>
            <div className="overflow-x-auto rounded-xl border border-stone-800 bg-stone-950">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/80 text-stone-400 font-semibold">
                    <th className="py-2.5 px-3">里程 (K)</th>
                    <th className="py-2.5 px-3">地標 / 節點名稱</th>
                    <th className="py-2.5 px-3">海拔高程</th>
                    <th className="py-2.5 px-3">WGS84 座標</th>
                    <th className="py-2.5 px-3">手機收訊</th>
                    <th className="py-2.5 px-3">路況備註與管制說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-mono">
                  {road.waypoints.map((wp, i) => (
                    <tr key={i} className="hover:bg-stone-900/60 transition-colors">
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{wp.km}K</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-stone-200">
                        {wp.name}
                        {wp.isControlPoint && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                            管制點
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-stone-300">{wp.elevation} m</td>
                      <td className="py-2.5 px-3 text-stone-400 text-[11px]">{wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}</td>
                      <td className="py-2.5 px-3">
                        {wp.hasCellSignal ? (
                          <span className="text-emerald-400 text-[11px]">有信號</span>
                        ) : (
                          <span className="text-stone-500 text-[11px]">無收訊</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-sans text-stone-300 text-[11px]">{wp.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Safety and Administration Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left box: Emergency contacts */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <h5 className="font-bold text-stone-200 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                官方管轄單位與路況通報聯絡
              </h5>
              <p className="text-xs text-stone-400 mb-2">
                主管機關：<span className="text-stone-200 font-medium">{road.branch}（{road.dispatchOffice}）</span>
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${road.officialPhone.replace(/-/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  撥打 {road.officialPhone}
                </a>
                <a
                  href={road.cwbWeatherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition-colors flex items-center gap-1 border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  氣象署山區預報
                </a>
              </div>
            </div>

            {/* Right box: Disaster Risk Analysis */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <h5 className="font-bold text-stone-200 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                <Activity className="w-4 h-4 text-rose-400" />
                水土保持與邊坡崩塌潛勢分析
              </h5>
              <p className="text-xs text-stone-300 leading-relaxed mb-2">
                {road.hazardsSummary}
              </p>
              <a
                href={road.disasterInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2"
              >
                查詢農業部農村水保署土石流觀測資料
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-400">
            亞馬遜國家山岳協會提醒：山區午後氣候瞬息萬變，強降雨時切勿強行涉水。
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSafetyPlan(road);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-stone-950" />
              帶入戶外留守單
            </button>
            <button
              onClick={() => downloadGpxFile(road)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              下載 GPX 軌跡檔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
