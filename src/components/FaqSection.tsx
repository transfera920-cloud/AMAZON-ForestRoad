import React, { useState } from 'react';
import { FAQ_ITEMS, FaqItem } from '../data/faq';
import { HelpCircle, ChevronDown, ChevronUp, Tag, ShieldAlert } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ['all', '路況查詢', '證件申請', '車輛裝備', '安全與急難'];

  const filteredFaqs = FAQ_ITEMS.filter((faq) =>
    activeCategory === 'all' ? true : faq.category === activeCategory
  );

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            常見問題與專家解答
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            台灣林道通行狀況常見問題 (FAQ)
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            彙整廣大山友、越野騎士、四驅休旅車主最常詢問的林道通行疑難雜症。從林保署最新路況巡查機制、入山證申請規定、深山無訊號通訊求救，到豪雨封閉標準，一站解答。
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pt-4 border-t border-stone-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat === 'all' ? '全部問題 (8題)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => toggleOpen(faq.id)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-stone-850 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-emerald-400 font-black text-sm sm:text-base mt-0.5">
                    Q{index + 1}.
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 block mb-1">
                      【{faq.category}】
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="p-1 rounded-lg bg-stone-800 text-stone-400 flex-shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80 bg-stone-950/60">
                  <p className="mb-3 whitespace-pre-line text-stone-200">
                    {faq.answer}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-850">
                    <span className="text-[11px] text-stone-500 mr-1 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> 相關搜尋詞：
                    </span>
                    {faq.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
