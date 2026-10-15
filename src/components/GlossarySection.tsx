import React, { useState } from 'react';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossary';
import { BookOpen, Search, ShieldCheck, Tag, Info, Compass } from 'lucide-react';

export const GlossarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', '制度與法規', '地形與工程', '裝備與導航', '安全與應變'];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.enTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDesc.includes(searchTerm) ||
      item.fullDesc.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            山林探險必備詞典
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            台灣林道與戶外探險名詞解釋小百科
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            深入探訪台灣林道前，必須理解官方主管機關的管轄邊界、里程座標定位語彙、證件法規與安全應變制度。由亞馬遜國家山岳協會專業彙整，讓您避開執法風險與深山迷航陷阱。
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t border-stone-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋名詞（例如：清單外、解編、GPX、累積爬升、留守人、K數）..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {cat === 'all' ? '全部類別' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 hover:border-stone-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-stone-400">{item.enTerm}</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                {item.term}
              </h3>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800/80 mb-3 text-xs text-emerald-300 font-medium">
                {item.shortDesc}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4 whitespace-pre-line">
                {item.fullDesc}
              </p>
            </div>

            <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-3 text-xs text-amber-200">
              <span className="font-bold text-amber-300 flex items-center gap-1 mb-1">
                <Info className="w-3.5 h-3.5" />
                【山友與駕駛實戰秘訣】
              </span>
              <p className="text-[11px] leading-relaxed text-amber-100/90">
                {item.practicalTips}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
