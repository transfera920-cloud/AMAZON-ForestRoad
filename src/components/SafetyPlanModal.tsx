import React, { useState } from 'react';
import { ForestryRoad } from '../types/forestryRoad';
import { X, Copy, Check, Printer, Shield, FileText, Send, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface SafetyPlanModalProps {
  initialRoad: ForestryRoad | null;
  allRoads: ForestryRoad[];
  onClose: () => void;
}

export const SafetyPlanModal: React.FC<SafetyPlanModalProps> = ({
  initialRoad,
  allRoads,
  onClose,
}) => {
  const [selectedRoadId, setSelectedRoadId] = useState<string>(
    initialRoad?.id || allRoads[0]?.id || ''
  );
  const currentRoad = allRoads.find((r) => r.id === selectedRoadId) || initialRoad || allRoads[0];

  // Safety form fields
  const [teamName, setTeamName] = useState('亞馬遜山野探勘小隊');
  const [leaderName, setLeaderName] = useState('王大明');
  const [leaderPhone, setLeaderPhone] = useState('0912-345-678');
  const [memberCount, setMemberCount] = useState('4');
  const [memberDetails, setMemberDetails] = useState('隊員A(0911-xxx-xxx)、隊員B(0922-xxx-xxx)、隊員C(0933-xxx-xxx)');
  const [vehicleInfo, setVehicleInfo] = useState('Toyota Hilux 4WD / 車牌: ABC-1234');
  const [entryDate, setEntryDate] = useState('2026-10-18 06:00');
  const [exitDate, setExitDate] = useState('2026-10-19 17:00');
  const [deadlineDate, setDeadlineDate] = useState('2026-10-19 21:00 (逾時未報訊啟動119搜救)');
  const [stayHomeContact, setStayHomeContact] = useState('林留守 (配偶/家屬)');
  const [stayHomePhone, setStayHomePhone] = useState('0988-765-432');
  const [communicationEquip, setCommunicationEquip] = useState('中華電信手機*3、Garmin inReach 衛星通訊器*1、無線電頻率 144.430 MHz');
  const [emergencyPlan, setEmergencyPlan] = useState('遇大雨崩塌即於管制點前迴轉撤退；若車輛機械故障全體留守車旁勿單獨下切溪谷。');

  const [copied, setCopied] = useState(false);

  // Formatted Output for LINE & Safety Log
  const generateFormattedText = () => {
    return `【亞馬遜國家山岳協會 · 台灣林道入山留守單】
━━━━━━━━━━━━━━━━━━━
■ 預定路線：${currentRoad?.name || '自選林道路線'} (${currentRoad?.branch || ''})
■ 最新巡查參考：可通行至 ${currentRoad?.passableUpToKm || 0}K / 難度 ${currentRoad?.difficultyLevel || 0}級
■ 管轄通報單位：${currentRoad?.dispatchOffice || ''} (電話: ${currentRoad?.officialPhone || ''})

【隊伍資訊】
• 隊伍名稱：${teamName}
• 領隊姓名：${leaderName} (電話: ${leaderPhone})
• 人員總數：共 ${memberCount} 人
• 隊員名冊：${memberDetails}
• 行駛車輛：${vehicleInfo}

【時程規劃與報訊節點】
• 預計出發入山：${entryDate}
• 預計行程結束：${exitDate}
★ 搜救逾時警戒線：${deadlineDate}
（若超過此時間未收到隊伍安全回報，留守人應立即通報消防局 119 及水里/竹東/萬榮工作站）

【平地關鍵留守人】
• 留守人姓名：${stayHomeContact}
• 留守人電話：${stayHomePhone}

【通訊裝備與備援】
• 攜帶通訊：${communicationEquip}
• 緊急應變與撤退判定：${emergencyPlan}
━━━━━━━━━━━━━━━━━━━
※ 本單據由「亞馬遜國家山岳協會 - 台灣林道通行狀況資料庫」自動生成
※ 戶外活動有風險，出發前請再次確認天氣與官方即時路況`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFormattedText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-6 text-stone-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                台灣林道戶外探險 · 留守單線上產生器
              </h2>
              <p className="text-xs text-stone-400">
                出發前交給平地留守人的關鍵生命防線，支援一鍵複製至 LINE 轉發或列印紙本
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Target Forestry Road Selector */}
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <label className="block text-xs font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              第一步：選擇預定探訪之台灣林道（自動載入管轄單位與路況標記）
            </label>
            <select
              value={selectedRoadId}
              onChange={(e) => setSelectedRoadId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
            >
              {allRoads.map((road) => (
                <option key={road.id} value={road.id}>
                  {road.name}（{road.branch} - 通行至 {road.passableUpToKm}K / 難度 {road.difficultyLevel}級）
                </option>
              ))}
            </select>
            {currentRoad && (
              <div className="mt-2.5 text-xs text-stone-400 flex flex-wrap items-center gap-3">
                <span>管轄電話: <b className="text-stone-200">{currentRoad.officialPhone}</b></span>
                <span>收訊點: <b className="text-teal-400">{currentRoad.cellSignalSpotsCount} 處</b></span>
                <span>最高海拔: <b className="text-stone-200">{currentRoad.maxElevationM}m</b></span>
              </div>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team details */}
            <div className="space-y-3 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
              <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider text-amber-400">
                隊伍與車輛資料
              </h4>
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">隊伍名稱</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">領隊姓名</label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">領隊電話</label>
                  <input
                    type="text"
                    value={leaderPhone}
                    onChange={(e) => setLeaderPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">人員總數與名冊</label>
                <input
                  type="text"
                  value={memberDetails}
                  onChange={(e) => setMemberDetails(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">行駛車輛車牌與車型</label>
                <input
                  type="text"
                  value={vehicleInfo}
                  onChange={(e) => setVehicleInfo(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                />
              </div>
            </div>

            {/* Time & Safety contact */}
            <div className="space-y-3 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
              <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider text-amber-400">
                時程與搜救警戒線
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">預計入山出發時間</label>
                  <input
                    type="text"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">預計下山結束時間</label>
                  <input
                    type="text"
                    value={exitDate}
                    onChange={(e) => setExitDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-rose-400 font-semibold mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  搜救逾時警戒線（留守人報案基準時間）
                </label>
                <input
                  type="text"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-rose-900/60 text-rose-200 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">平地留守人</label>
                  <input
                    type="text"
                    value={stayHomeContact}
                    onChange={(e) => setStayHomeContact(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">留守人聯絡電話</label>
                  <input
                    type="text"
                    value={stayHomePhone}
                    onChange={(e) => setStayHomePhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">通訊裝備（衛星/手機/無線電）</label>
                <input
                  type="text"
                  value={communicationEquip}
                  onChange={(e) => setCommunicationEquip(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Formatted Text Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-300">
                留守單即時文字預覽（已最佳化排版，適合直接傳送至 LINE）
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已複製留守單！' : '一鍵複製傳送 LINE'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
              {generateFormattedText()}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-400">
            請將本留守單確實交付給留守人，並約定特定回報點（如到達登山口、抵達宿營地）。
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-stone-700"
            >
              <Printer className="w-4 h-4" />
              列印留守單
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              複製文字轉發留守人
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
