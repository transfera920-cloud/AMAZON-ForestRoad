import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Search, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const SeoInspectorModal: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const schemaJsonLd = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://ais-pre-y7soux2x7uc7d5lwi45yh6-440065623013.asia-northeast1.run.app/#webapp",
      "name": "台灣林道通行狀況資料庫",
      "url": "https://ais-pre-y7soux2x7uc7d5lwi45yh6-440065623013.asia-northeast1.run.app",
      "applicationCategory": "OutdoorsApplication",
      "operatingSystem": "All",
      "description": "亞馬遜國家山岳協會專屬台灣林道即時路況查詢平台，收錄全台林道開放狀態、車行里程、GPX軌跡下載、海拔爬升與山區留守單安全工具。",
      "publisher": {
        "@type": "Organization",
        "name": "亞馬遜國家山岳協會",
        "logo": "https://ais-pre-y7soux2x7uc7d5lwi45yh6-440065623013.asia-northeast1.run.app/logo.png"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ais-pre-y7soux2x7uc7d5lwi45yh6-440065623013.asia-northeast1.run.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "台灣林道通行狀況要如何查詢最準確？官方巡查與山友即時回報有何差異？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "查詢台灣林道通行狀況最精確的作法是官方定期巡查公告加上社群即時路況回報雙重比對。亞馬遜國家山岳協會整合了林保署最新巡查時戳與山友驗證正確率，提供最新車行K數。"
          }
        },
        {
          "@type": "Question",
          "name": "進入台灣林道需要申請入山證或入園證嗎？哪裡可以查到免申請林道名單？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "取決於林道是否座落於山地經常管制區或國家公園生態保護區。在亞馬遜國家山岳協會資料庫中可直接透過「免申請」標籤篩選無需繁瑣證件即可出發的林道路線。"
          }
        },
        {
          "@type": "Question",
          "name": "走林道下載 GPX 軌跡有什麼好處？如何匯入手機登山導航 App？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "台灣深山林道多數盲彎無手機訊號，下載GPX軌跡檔後可在無訊號環境下透過手機內建GPS晶片（如Hikingbook、綠野遊蹤），直接將定位疊合在林道路線與管制點上。"
          }
        }
      ]
    }
  ]
}`;

  return (
    <section className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl text-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-950/80 text-teal-300 border border-teal-800/80 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            SEO 網站架構師專屬儀表板
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            SEO 核心架構、Meta 標籤與 Schema.org 建議
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            專為「亞馬遜國家山岳協會」設計之高權重 SEO 策略規格書，包含標題字元長度控制、關鍵字密度、錨文字與結構化資料。
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Title & Meta Tags */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              1. 頁面 Title & Meta Description 規格（精確字數與關鍵字控制）
            </h3>
            <button
              onClick={() => copyText(`<title>台灣林道通行狀況資料庫｜最新路況與GPX下載 - 亞馬遜國家山岳協會</title>\n<meta name="description" content="全台最即時台灣林道通行狀況查詢！收錄林保署所屬與清單外林道開放狀態、車行可達里程、GPX軌跡、天氣風險與留守單工具，助您安全探索山林。" />`, 'meta')}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1"
            >
              {copiedKey === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              複製 HTML 標籤
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-stone-400 text-[11px] mb-1 font-sans">
                <span>網頁標題 (Title Tag)</span>
                <span className="text-emerald-400">長度：34 字元（最佳限制 50–60 字元以內）</span>
              </div>
              <p className="text-emerald-300 font-bold">
                台灣林道通行狀況資料庫｜最新路況與GPX下載 - 亞馬遜國家山岳協會
              </p>
              <p className="text-[10px] text-stone-400 font-sans mt-1">
                ✓ 包含主關鍵字「台灣林道通行狀況」＋高點擊副關鍵字「最新路況與GPX下載」＋品牌名「亞馬遜國家山岳協會」
              </p>
            </div>

            <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-stone-400 text-[11px] mb-1 font-sans">
                <span>元說明 (Meta Description)</span>
                <span className="text-emerald-400">長度：72 中文字 / 144 字元（符合 150-160 字元限制）</span>
              </div>
              <p className="text-stone-200">
                全台最即時台灣林道通行狀況查詢！收錄林保署所屬與清單外林道開放狀態、車行可達里程、GPX軌跡、天氣風險與留守單工具，助您安全探索山林。
              </p>
              <p className="text-[10px] text-stone-400 font-sans mt-1">
                ✓ 精準置入「台灣林道通行狀況、開放狀態、GPX軌跡、天氣風險、留守單」等核心搜尋詞，兼具行動號召（CTA）
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Heading Hierarchy H1, H2, H3 */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
          <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            2. 語意化標題結構架構（H1 / H2 / H3 自然融入關鍵字）
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-amber-400 font-bold mr-2">&lt;H1&gt;</span>
              <span className="text-stone-200">台灣林道通行狀況即時資料庫與安全指南 - 亞馬遜國家山岳協會</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">全台林道開放狀態即時通報與動態統計</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">林道多維度篩選器：分署、海拔帶、難度與車輛適配</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">全台列管與清單外高山林道通行詳細清冊</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-10">
              <span className="text-emerald-400 font-bold mr-2">&lt;H3&gt;</span>
              <span className="text-stone-300">單條林道卡片：丹大林道、郡大林道、霞喀羅林道等實時路況與 GPX 軌跡</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">林道探險專有名詞小百科：清單外、解編、K數與GPX</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">台灣林道通行狀況常見問題 (FAQ)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 pl-6">
              <span className="text-teal-400 font-bold mr-2">&lt;H2&gt;</span>
              <span className="text-stone-200">山林安全提醒、汛期崩塌風險與免責聲明</span>
            </div>
          </div>
        </div>

        {/* Section 3: 5 Long-tail keywords recommendation */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
          <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            3. 精選 5 個高搜尋意圖長尾關鍵字（Long-Tail Keywords Blueprint）
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">長尾詞 1 · 意圖：導航/工具</span>
              <p className="font-bold text-stone-200 mb-1">「台灣林道GPX軌跡離線下載」</p>
              <span className="text-[11px] text-stone-400">鎖定尋找手機導航圖資之越野與登山族群</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">長尾詞 2 · 意圖：即時路況</span>
              <p className="font-bold text-stone-200 mb-1">「丹大林道最新通行路況二分所」</p>
              <span className="text-[11px] text-stone-400">極高搜尋量、常態落石封閉之高意圖關鍵詞</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">長尾詞 3 · 意圖：車輛裝備</span>
              <p className="font-bold text-stone-200 mb-1">「郡大林道一般轎車可以開上去嗎」</p>
              <span className="text-[11px] text-stone-400">解決百岳初學者底盤與接駁車痛點問答</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">長尾詞 4 · 意圖：行政法規</span>
              <p className="font-bold text-stone-200 mb-1">「免申請入山證的台灣林道推薦」</p>
              <span className="text-[11px] text-stone-400">週末臨時起意野營露營與二輪越野車友</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">長尾詞 5 · 意圖：安全自救</span>
              <p className="font-bold text-stone-200 mb-1">「登山林道留守單範本線上填寫」</p>
              <span className="text-[11px] text-stone-400">建立權威品牌忠誠度與安全防護公信力</span>
            </div>
          </div>
        </div>

        {/* Section 4: Internal Anchor Text Recommendations */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
          <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            4. 內部連結錨文字（Internal Anchor Text Strategy）建議
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-stone-400 block mb-1">林道卡片 ➔ 名詞解釋</span>
              <p className="text-stone-200 font-medium">
                錨文字建議：<span className="text-emerald-400">「什麼是清單外林道？」</span>、<span className="text-emerald-400">「林道難度分級標準」</span>
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                作用：將卡片中的專有屬性導向小百科，強化深度主題權威（Topic Cluster）。
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-stone-400 block mb-1">常見問答 ➔ 安全工具</span>
              <p className="text-stone-200 font-medium">
                錨文字建議：<span className="text-amber-400">「免費產生出發林道留守單」</span>、<span className="text-amber-400">「查詢水保署崩塌災害潛勢」</span>
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                作用：將高搜尋意圖的資訊搜尋流量（Informational）引導至高黏著互動工具（Tool Engagement）。
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Schema.org Structured Data */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              5. Schema.org 結構化資料代碼（WebApplication + FAQPage 複合圖譜）
            </h3>
            <button
              onClick={() => copyText(schemaJsonLd, 'jsonld')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono flex items-center gap-1"
            >
              {copiedKey === 'jsonld' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              複製 JSON-LD 代碼
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-64 whitespace-pre">
            {schemaJsonLd}
          </pre>
        </div>
      </div>
    </section>
  );
};
