import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { SkillItem } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const categories = ['All', 'Programming', 'Web', 'Data', 'Tools', 'AI'];

  const filteredCategories =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.skillCategories
      : PORTFOLIO_DATA.skillCategories.filter((c) => c.category === selectedCategory);

  const toggleSkill = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <section id="expertise" className="py-14 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-6 sm:pb-8 border-b border-black/[0.06]">
          <div>
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#86868B] block mb-2 sm:mb-3">
              02 // TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em]">
              Tools I work with.
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-[14px] sm:text-[15px] text-[#6E6E73] max-w-md font-normal leading-relaxed">
            Organized across functional domains. Each tool is applied with a focus on code readability, mathematical intuition, and modular architecture.
          </p>
        </div>

        {/* Minimalist Responsive Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10" role="tablist" aria-label="Skill categories">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 min-h-[38px] text-[12px] sm:text-[13px] font-medium rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] flex items-center ${
                  isSelected
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#EAEAEA] border border-black/[0.04]'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="bg-[#FFFFFF] border border-black/[0.07] rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:border-black/[0.14] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-2.5 py-0.5 rounded-full font-medium">
                    {group.category}
                  </span>
                  <span className="text-[11px] text-[#86868B] font-mono">
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight mb-2">
                  {group.title}
                </h3>

                <p className="text-[12.5px] sm:text-[13px] text-[#6E6E73] leading-relaxed mb-5 sm:mb-6">
                  {group.description}
                </p>
              </div>

              {/* Skills List inside Category */}
              <div className="space-y-2 pt-4 border-t border-black/[0.04]">
                {group.items.map((skill: SkillItem) => {
                  const isExpanded = expandedSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      className="rounded-xl border border-black/[0.03] bg-[#FAFAFA] transition-all overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSkill(skill.name)}
                        className="w-full text-left p-3 min-h-[44px] flex items-center justify-between hover:bg-black/[0.02] transition-colors cursor-pointer gap-2"
                        aria-expanded={isExpanded}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span className="text-[13.5px] sm:text-[14px] font-medium text-[#1D1D1F] break-words">
                              {skill.name}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FFFFFF] border border-black/[0.05] text-[#6E6E73] shrink-0">
                              {skill.level}
                            </span>
                          </div>
                          {skill.note && (
                            <p className="text-[11.5px] sm:text-[12px] text-[#86868B] mt-0.5 break-words">
                              {skill.note}
                            </p>
                          )}
                        </div>

                        <span className="text-[#86868B] p-1 shrink-0 flex items-center justify-center">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {isExpanded && skill.practicalApplication && (
                        <div className="px-3 pb-3 pt-1 border-t border-black/[0.04] bg-[#FFFFFF] text-[12px] sm:text-[12.5px] text-[#424245] leading-relaxed animate-in fade-in duration-200">
                          <p className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#0071E3] mb-1">
                            Practical Application
                          </p>
                          <p className="break-words">{skill.practicalApplication}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Footnote */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between text-[12.5px] sm:text-[13px] text-[#6E6E73] gap-3">
          <div className="flex items-start sm:items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5 sm:mt-0" />
            <p className="break-words">
              <strong className="font-medium text-[#1D1D1F]">Active Research Focus:</strong> Neural network weight initialization, statistical inference benchmarks, and low-latency data structures.
            </p>
          </div>
          <span className="font-mono text-[11px] text-[#86868B] shrink-0">Catalog Updated: 2025–26</span>
        </div>
      </div>
    </section>
  );
};
