/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { getStepTitle } from '../data/translations';
import {
  TICKET_CATEGORIES,
  TicketCategory,
  quoteTickets,
  HOTELS,
  HOTEL_TIERS,
  HotelTier,
  TRANSPORT_OPTIONS,
  TOUR_COMPANIES
} from '../data/visitPlanning';
import { Ticket, Hotel, Bus, Compass, Minus, Plus, IdCard, Info, MapPin, Clock, Star, Languages } from 'lucide-react';

interface VisitPlannerSectionProps {
  language: Language;
}

type PlannerTab = 'tickets' | 'hotels' | 'transport' | 'tours';

const Counter: React.FC<{
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, hint, value, min, max, onChange }) => (
  <div className="flex items-center justify-between gap-3 bg-[#FAF5ED] border border-[#E8DCC9] rounded-lg px-3 py-2">
    <div>
      <div className="text-xs font-semibold text-[#331C16]">{label}</div>
      {hint && <div className="text-[10px] text-stone-500">{hint}</div>}
    </div>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-7 h-7 rounded-md bg-white border border-[#C8963E]/40 text-[#7A2E1D] flex items-center justify-center disabled:opacity-40 cursor-pointer"
        aria-label="-"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-bold text-[#331C16]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-7 h-7 rounded-md bg-[#7A2E1D] text-[#F6EEE1] flex items-center justify-center disabled:opacity-40 cursor-pointer"
        aria-label="+"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export const VisitPlannerSection: React.FC<VisitPlannerSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  const jod = (n: number) => (isAr ? `${n} د.أ` : `${n} JOD`);

  const [activeTab, setActiveTab] = useState<PlannerTab>('tickets');

  // Ticket calculator
  const [category, setCategory] = useState<TicketCategory>('jordanian');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [staysOvernight, setStaysOvernight] = useState(true);
  const [days, setDays] = useState<1 | 2 | 3>(1);

  // Hotels filter
  const [hotelTier, setHotelTier] = useState<HotelTier | 'all'>('all');

  const quote = quoteTickets({ category, adults, children, staysOvernight, days });
  const categoryInfo = TICKET_CATEGORIES.find(c => c.id === category)!;
  const visibleHotels = hotelTier === 'all' ? HOTELS : HOTELS.filter(h => h.tier === hotelTier);

  const tabs: { id: PlannerTab; icon: React.ComponentType<{ className?: string }>; en: string; ar: string }[] = [
    { id: 'tickets', icon: Ticket, en: 'Tickets', ar: 'التذاكر' },
    { id: 'hotels', icon: Hotel, en: 'Hotels', ar: 'الفنادق' },
    { id: 'transport', icon: Bus, en: 'Transport', ar: 'التنقل' },
    { id: 'tours', icon: Compass, en: 'Tour companies', ar: 'شركات السياحة' }
  ];

  return (
    <div className="bg-[#FAF5ED] rounded-xl border border-[#C8963E]/30 p-5 md:p-7 shadow-md mb-8">
      {/* Title */}
      <div className="mb-5 pb-4 border-b border-[#C8963E]/20">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold flex items-center justify-center">
            0
          </span>
          <h2 className="font-heading font-bold text-xl md:text-2xl text-[#7A2E1D]">{getStepTitle(0, language)}</h2>
        </div>
        <p className="text-xs md:text-sm text-[#561E12]/80 mt-1">
          {isAr
            ? 'احسب سعر تذكرتك، واختر فندقك، واعرف كيف توصل وتتنقل، وتعرّف على شركات السياحة.'
            : 'Work out your ticket price, pick a hotel, see how to get there and around, and find a tour company.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`visit-tab-${tab.id}`}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#7A2E1D] text-[#F6EEE1] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-[#FAF5ED] border border-[#E8DCC9]'
            }`}
          >
            <tab.icon className="w-4 h-4 text-[#C8963E]" />
            <span>{isAr ? tab.ar : tab.en}</span>
          </button>
        ))}
      </div>

      {/* ---------------- Tickets ---------------- */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#E8DCC9] shadow-sm space-y-4">
            <div>
              <span className="block text-xs font-semibold text-[#331C16] mb-2">
                {isAr ? 'فئة الزائر' : 'Visitor category'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TICKET_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition cursor-pointer ${
                      category === c.id
                        ? 'bg-[#7A2E1D] text-[#F6EEE1] border-[#7A2E1D]'
                        : 'bg-[#FAF5ED] text-[#331C16] border-[#E8DCC9] hover:border-[#C8963E]'
                    }`}
                  >
                    {isAr ? c.labelAr : c.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {category === 'foreigner' && (
              <div className="space-y-3">
                <div>
                  <span className="block text-xs font-semibold text-[#331C16] mb-2">
                    {isAr ? 'هل تبيت ليلة على الأقل في الأردن؟' : 'Are you staying at least one night in Jordan?'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[true, false].map(option => (
                      <button
                        key={String(option)}
                        type="button"
                        onClick={() => setStaysOvernight(option)}
                        className={`py-2 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          staysOvernight === option
                            ? 'bg-[#1F6E68] text-white border-[#1F6E68]'
                            : 'bg-[#FAF5ED] text-[#331C16] border-[#E8DCC9] hover:border-[#C8963E]'
                        }`}
                      >
                        {option
                          ? isAr ? 'نعم، أبيت في الأردن' : 'Yes, staying overnight'
                          : isAr ? 'لا، زيارة يوم واحد' : 'No, day trip only'}
                      </button>
                    ))}
                  </div>
                </div>

                {staysOvernight && (
                  <div>
                    <span className="block text-xs font-semibold text-[#331C16] mb-2">
                      {isAr ? 'مدة التذكرة' : 'Ticket duration'}
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {([1, 2, 3] as const).map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDays(d)}
                          className={`py-2 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                            days === d
                              ? 'bg-[#1F6E68] text-white border-[#1F6E68]'
                              : 'bg-[#FAF5ED] text-[#331C16] border-[#E8DCC9] hover:border-[#C8963E]'
                          }`}
                        >
                          {isAr ? (d === 1 ? 'يوم واحد' : d === 2 ? 'يومان' : '3 أيام') : `${d} day${d > 1 ? 's' : ''}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Counter
                label={isAr ? 'البالغون' : 'Adults'}
                hint={isAr ? '12 سنة فما فوق' : '12 years and older'}
                value={adults}
                min={1}
                max={50}
                onChange={setAdults}
              />
              <Counter
                label={isAr ? 'الأطفال' : 'Children'}
                hint={isAr ? 'أقل من 12 سنة – مجاناً' : 'Under 12 – free'}
                value={children}
                min={0}
                max={50}
                onChange={setChildren}
              />
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-5 space-y-3">
            <div id="ticket-quote" className="bg-white rounded-xl border-2 border-[#C8963E]/60 p-5 shadow-sm">
              <div className="text-xs font-bold text-[#7A2E1D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-[#C8963E]" />
                {isAr ? 'سعر التذاكر' : 'Ticket price'}
              </div>
              <div className="space-y-1.5 text-xs text-[#331C16]">
                <div className="flex justify-between">
                  <span>
                    {isAr ? `بالغون × ${adults}` : `Adults × ${adults}`} ({jod(quote.unitPriceJod)})
                  </span>
                  <span className="font-semibold">{jod(quote.totalJod)}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>{isAr ? `أطفال × ${children}` : `Children × ${children}`}</span>
                    <span>{isAr ? 'مجاناً' : 'Free'}</span>
                  </div>
                )}
              </div>
              <div className="flex items-end justify-between border-t border-[#E8DCC9] mt-3 pt-3">
                <span className="text-sm font-bold text-[#331C16]">{isAr ? 'الإجمالي' : 'Total'}</span>
                <span className="text-3xl font-black text-[#7A2E1D]">{jod(quote.totalJod)}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E8DCC9] p-4 text-xs text-[#331C16] space-y-2">
              <div className="flex items-start gap-2">
                <IdCard className="w-4 h-4 text-[#1F6E68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">{isAr ? 'الوثيقة المطلوبة على البوابة' : 'Document required at the gate'}</span>
                  <span>{isAr ? categoryInfo.documentAr : categoryInfo.documentEn}</span>
                </div>
              </div>
              {category === 'foreigner' && staysOvernight && days > 1 && (
                <div className="flex items-start gap-2 text-stone-600">
                  <Info className="w-4 h-4 text-[#C8963E] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تذاكر اليومين والثلاثة أيام تُستخدم بأيام متتالية.' : 'Two- and three-day tickets must be used on consecutive days.'}</span>
                </div>
              )}
              {category === 'jordanian_mother' && (
                <div className="flex items-start gap-2 text-stone-600">
                  <Info className="w-4 h-4 text-[#C8963E] shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'يُرجى التأكد من السعر في مكتب التذاكر عند الوصول.'
                      : 'Please confirm this price at the ticket office on arrival.'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Hotels ---------------- */}
      {activeTab === 'hotels' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {[{ id: 'all' as const, labelEn: 'All', labelAr: 'الكل' }, ...HOTEL_TIERS].map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setHotelTier(tier.id)}
                className={`px-3 py-1 rounded-full font-semibold transition cursor-pointer ${
                  hotelTier === tier.id
                    ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {isAr ? tier.labelAr : tier.labelEn}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {visibleHotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-xl border border-[#E8DCC9] p-4 space-y-2 hover:border-[#C8963E] transition">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#331C16] leading-snug">{isAr ? hotel.nameAr : hotel.nameEn}</h3>
                  {hotel.stars && (
                    <span className="flex items-center gap-0.5 shrink-0" aria-label={`${hotel.stars} stars`}>
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C8963E] text-[#C8963E]" />
                      ))}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#1F6E68] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {isAr ? hotel.areaAr : hotel.areaEn} • {isAr ? hotel.distanceAr : hotel.distanceEn}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(isAr ? hotel.featuresAr : hotel.featuresEn).map(feature => (
                    <span key={feature} className="text-[10px] bg-[#FAF5ED] border border-[#E8DCC9] text-stone-700 px-1.5 py-0.5 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-black text-[#7A2E1D] pt-1">{isAr ? hotel.priceAr : hotel.priceEn}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Transport ---------------- */}
      {activeTab === 'transport' && (
        <div className="space-y-5">
          {([
            { group: 'toPetra', en: 'Getting to Petra', ar: 'الوصول إلى البترا' },
            { group: 'insidePetra', en: 'Getting around inside Petra', ar: 'التنقل داخل البترا' }
          ] as const).map(section => (
            <div key={section.group}>
              <h3 className="font-bold text-sm text-[#7A2E1D] mb-2">{isAr ? section.ar : section.en}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {TRANSPORT_OPTIONS.filter(t => t.group === section.group).map(option => (
                  <div key={option.id} className="bg-white rounded-xl border border-[#E8DCC9] p-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{option.icon}</span>
                      <h4 className="font-bold text-xs md:text-sm text-[#331C16]">{isAr ? option.nameAr : option.nameEn}</h4>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">{isAr ? option.detailAr : option.detailEn}</p>
                    <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                      <span className="text-[#1F6E68] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {isAr ? option.durationAr : option.durationEn}
                      </span>
                      <span className="font-bold text-[#7A2E1D]">{isAr ? option.priceAr : option.priceEn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- Tour companies ---------------- */}
      {activeTab === 'tours' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {TOUR_COMPANIES.map(company => (
            <div key={company.id} className="bg-white rounded-xl border border-[#E8DCC9] p-4 space-y-2 hover:border-[#C8963E] transition">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{company.icon}</span>
                <h3 className="font-bold text-sm text-[#331C16] leading-snug">{isAr ? company.nameAr : company.nameEn}</h3>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">{isAr ? company.servicesAr : company.servicesEn}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#1F6E68] font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {isAr ? company.durationAr : company.durationEn}
                </span>
                <span className="flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  {isAr ? company.languagesAr : company.languagesEn}
                </span>
              </div>
              <div className="text-sm font-black text-[#7A2E1D] pt-1">{isAr ? company.priceAr : company.priceEn}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
