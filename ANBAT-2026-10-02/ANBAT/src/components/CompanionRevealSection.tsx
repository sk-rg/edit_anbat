/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  VisitorGuideBadge,
  Language,
  Creature,
  SummonedCreatureStamp
} from '../types';
import { CREATURES } from '../data/creatures';
import { LANDMARKS } from '../data/landmarks';
import { UI_TRANSLATIONS, getLocalizedLandmark } from '../data/translations';
import { CreatureSvg } from './CreatureSvg';
import { storageService } from '../services/storageService';
import {
  playStampSound,
  playSuccessChime,
  playLegendarySummonChime
} from '../utils/audio';
import {
  Sparkles,
  Award,
  Crown,
  Download,
  Share2,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Check,
  Edit3,
  BookmarkCheck,
  Compass,
  MessageSquare,
  MapPin,
  Clock,
  RotateCcw
} from 'lucide-react';

interface CompanionRevealSectionProps {
  language: Language;
  activeBadge: VisitorGuideBadge | null;
  visitedLandmarks: string[];
  onBadgeUpdated: (badge: VisitorGuideBadge) => void;
  onProceedToMap: () => void;
  onProceedToChat: () => void;
  onOpenSatchel: () => void;
  onOpenCollectionModal?: () => void;
}

export const CompanionRevealSection: React.FC<CompanionRevealSectionProps> = ({
  language,
  activeBadge,
  visitedLandmarks,
  onBadgeUpdated,
  onProceedToMap,
  onProceedToChat,
  onOpenSatchel,
  onOpenCollectionModal
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Active creature lookup
  const creatureId = activeBadge?.creatureId || 'ibex';
  const creature: Creature = CREATURES[creatureId] || CREATURES['ibex'];

  // Guide name state
  const [guideName, setGuideName] = useState<string>(
    activeBadge?.customName || (isAr ? `${creature.nameAr.split(' ')[0]} البتراوي` : `Companion ${creature.nameEn.split(' ')[0]}`)
  );
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // Hidden canvas for downloading badge
  const downloadCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync guide name if activeBadge changes
  useEffect(() => {
    if (activeBadge?.customName) {
      setGuideName(activeBadge.customName);
    } else {
      setGuideName(isAr ? `${creature.nameAr.split(' ')[0]} البتراوي` : `Companion ${creature.nameEn.split(' ')[0]}`);
    }
  }, [activeBadge, creature, isAr]);

  // Save custom guide name
  const handleSaveName = () => {
    setIsEditingName(false);
    playStampSound();
    if (activeBadge) {
      const updated: VisitorGuideBadge = {
        ...activeBadge,
        customName: guideName.trim() || activeBadge.customName
      };
      storageService.saveVisitorBadge(updated);
      onBadgeUpdated(updated);
    }
  };

  // Play audio sound
  const handlePlayVoice = () => {
    if (creature.rarity === 'Legendary' || creature.rarity === 'Sacred') {
      playLegendarySummonChime();
    } else {
      playSuccessChime();
    }
  };

  // Copy share text
  const handleCopyShare = () => {
    const shareText = isAr
      ? `🏛️ قابلت رفيقي ودليلي الأثري النبطي "${guideName}" (${creature.nameAr}) في بترا عبر تطبيق أنباط! انضم إليّ في مسار الاستكشاف.`
      : `🏛️ I met my Nabataean companion guide "${guideName}" (${creature.nameEn}) in Petra with ANBAT! Join my exploration.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    }
  };

  // Download high-res PNG badge
  const handleDownloadBadge = () => {
    const canvas = downloadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 800;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 800);
    bgGradient.addColorStop(0, '#7A2E1D');
    bgGradient.addColorStop(0.35, '#933D2A');
    bgGradient.addColorStop(0.75, '#561E12');
    bgGradient.addColorStop(1, '#331C16');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 600, 800);

    // Gold borders
    ctx.strokeStyle = '#C8963E';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 560, 760);

    ctx.strokeStyle = '#FAF5ED';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, 544, 744);

    // Inner parchment card
    ctx.fillStyle = '#FAF5ED';
    ctx.fillRect(40, 150, 520, 600);

    // Header title
    ctx.fillStyle = '#C8963E';
    ctx.font = 'bold 26px serif';
    ctx.textAlign = 'center';
    ctx.fillText('ANBAT • NABATAEAN OFFICIAL BADGE', 300, 75);

    ctx.fillStyle = '#FAF5ED';
    ctx.font = '14px sans-serif';
    ctx.fillText('سلطة إقليم البترا التنموي السياحي • شارة الدليل المعتمد', 300, 110);

    // Medallion circle
    ctx.fillStyle = '#E8DCC9';
    ctx.beginPath();
    ctx.arc(300, 260, 85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#C8963E';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Emoji / Icon
    ctx.font = '72px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(creature.icon, 300, 285);

    // Names
    ctx.fillStyle = '#7A2E1D';
    ctx.font = 'bold 28px serif';
    ctx.fillText(guideName, 300, 390);

    ctx.fillStyle = '#C8963E';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`${creature.nameAr} • ${creature.nameEn}`, 300, 425);

    ctx.fillStyle = '#1F6E68';
    ctx.font = '14px sans-serif';
    ctx.fillText(creature.titleAr, 300, 455);

    // Rarity
    ctx.fillStyle = '#7A2E1D';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`★ الرتبة النبطية: ${creature.rarity.toUpperCase()} (+${activeBadge?.rarityRoll || 250} XP)`, 300, 495);

    // Lore snippet
    ctx.fillStyle = '#331C16';
    ctx.font = '13px sans-serif';
    ctx.fillText(creature.loreAr.substring(0, 58) + '...', 300, 545);

    // Date & Serial
    ctx.fillStyle = '#888888';
    ctx.font = '11px monospace';
    ctx.fillText(`STAMP ID: ANB-${creature.id.toUpperCase()}-2026`, 300, 680);
    ctx.fillText(new Date().toLocaleDateString(isAr ? 'ar-JO' : 'en-US'), 300, 705);

    // Download PNG
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ANBAT-Guide-${creature.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  // If no guide has been drawn yet
  if (!activeBadge) {
    return (
      <div
        className="bg-[#FAF5ED] rounded-2xl border border-[#C8963E]/40 p-6 md:p-12 shadow-xl mb-12 text-center text-[#331C16]"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="w-20 h-20 rounded-full bg-[#7A2E1D] text-[#F6EEE1] flex items-center justify-center mx-auto mb-4 border-2 border-[#C8963E] shadow-md">
          <Sparkles className="w-10 h-10 text-[#FDE68A] animate-pulse" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-[#7A2E1D] mb-2">
          {isAr ? 'جعبة المستكشف بانتظار الفتح' : 'Your Explorer Satchel Awaits'}
        </h2>
        <p className="text-xs md:text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
          {isAr
            ? 'لم تستدعِ دليلك الأثري بعد. عد إلى الخطوة الأولى وافتح جعبة المستكشف لتطلق الدخان السحري وتستدعي دليلك وتميمتك المباركة.'
            : 'You haven’t summoned your guide yet. Return to Step 1 and open the explorer satchel to summon your companion.'}
        </p>
        <button
          onClick={onOpenSatchel}
          className="bg-[#7A2E1D] hover:bg-[#632416] text-[#F6EEE1] font-bold text-sm px-6 py-3 rounded-xl shadow-md transition inline-flex items-center gap-2 cursor-pointer border border-[#C8963E]/40"
        >
          <Sparkles className="w-4 h-4 text-[#FDE68A]" />
          <span>{isAr ? 'افتح جعبة المستكشف الآن (الخطوة 1)' : 'Open Explorer Satchel (Step 1)'}</span>
        </button>
      </div>
    );
  }

  // Find starting landmark name
  const landmarkObj = LANDMARKS.find(l => l.id === activeBadge.startingLandmarkId) || LANDMARKS[0];
  const landmarkName = getLocalizedLandmark(landmarkObj, language).name;

  return (
    <div
      className="bg-[#FAF5ED] rounded-2xl border border-[#C8963E]/35 p-4 sm:p-6 md:p-8 shadow-xl mb-12 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Hidden canvas for downloading badge */}
      <canvas ref={downloadCanvasRef} className="hidden" />

      {/* Top Step Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C8963E]/20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold flex items-center justify-center shadow-xs">
              2
            </span>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-[#7A2E1D]">
              {isAr ? 'لقاء الدليل النبطي • شارة الجواز المعتمدة' : 'Meet Your Companion Guide • Official Badge'}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#561E12]/80 mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'مبارك استدعاء دليلك الأثري! استعرض سماته المباركة، خصص اسمه، واستعد للانطلاق إلى خريطة مسارات بترا.'
              : 'Your Nabataean companion has answered the call. Review its sacred traits and prepare for your canyon journey.'}
          </p>
        </div>

        {/* Action button to open collection gallery */}
        {onOpenCollectionModal && (
          <button
            onClick={onOpenCollectionModal}
            className="self-start md:self-auto bg-white hover:bg-stone-100 text-[#7A2E1D] font-bold text-xs px-4 py-2 rounded-xl shadow-xs border border-[#C8963E]/50 transition flex items-center gap-1.5 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4 text-[#C8963E]" />
            <span>{isAr ? 'عرض مجموعة الأختام والتمائم' : 'Summoned Collection'}</span>
          </button>
        )}
      </div>

      {/* Main Guide Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Companion Medallion & Avatar Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#331C16] via-[#4A2016] to-[#25100B] rounded-2xl p-6 text-center text-[#F6EEE1] border-2 border-[#C8963E] shadow-xl relative overflow-hidden flex flex-col items-center">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8963E]/20 via-transparent to-transparent pointer-events-none" />

          {/* Rarity Tag */}
          <div className="relative z-10 mb-3">
            <span
              className={`text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border shadow-sm ${
                creature.rarity === 'Legendary'
                  ? 'bg-amber-500 text-stone-900 border-amber-300 ring-2 ring-amber-400/50'
                  : creature.rarity === 'Sacred'
                  ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400/50'
                  : creature.rarity === 'Rare'
                  ? 'bg-blue-600 text-white border-blue-300'
                  : 'bg-stone-700 text-stone-200 border-stone-500'
              }`}
            >
              ★ {isAr ? (creature.rarity === 'Legendary' ? 'أسطوري' : creature.rarity === 'Sacred' ? 'مقدس' : creature.rarity === 'Rare' ? 'نادر' : 'شائع') : creature.rarity}
            </span>
          </div>

          {/* Medallion Presentation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-44 h-44 rounded-full p-2 bg-gradient-to-b from-[#C8963E] via-[#7A2E1D] to-[#331C16] border-2 border-[#FDE68A] shadow-2xl mb-4"
          >
            <div className="w-full h-full rounded-full bg-[#1F0C08] border-2 border-[#C8963E]/60 flex items-center justify-center p-3 relative overflow-hidden">
              <CreatureSvg type={creature.svgArtKey} className="w-28 h-28 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
            </div>
            <button
              onClick={handlePlayVoice}
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#C8963E] hover:bg-[#d8a64e] text-[#331C16] flex items-center justify-center shadow-lg border border-white cursor-pointer transition active:scale-95"
              title={isAr ? 'الاستماع لصوت الدليل' : 'Listen to creature voice'}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Guide Name Display / Edit */}
          <div className="relative z-10 w-full mb-3">
            {isEditingName ? (
              <div className="flex items-center gap-1.5 justify-center max-w-xs mx-auto">
                <input
                  type="text"
                  value={guideName}
                  onChange={e => setGuideName(e.target.value)}
                  className="bg-white text-stone-900 px-3 py-1.5 rounded-lg text-sm font-bold border-2 border-[#C8963E] focus:outline-none w-full"
                  maxLength={25}
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-heading font-extrabold text-2xl text-[#FDE68A]">
                  {guideName}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-stone-400 hover:text-white p-1 rounded transition cursor-pointer"
                  title={isAr ? 'تعديل اسم الدليل' : 'Edit guide name'}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <p className="text-xs text-amber-300/90 font-medium mt-0.5">
              {isAr ? creature.nameAr : creature.nameEn}
            </p>
            <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
              {isAr ? creature.titleAr : creature.titleEn}
            </p>
          </div>

          {/* Quick Buttons below avatar */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-[#C8963E]/30 w-full text-xs">
            <button
              onClick={handleDownloadBadge}
              className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-bold py-1.5 px-3 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل الشارة PNG' : 'Download PNG'}</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="bg-white/10 hover:bg-white/20 text-[#F6EEE1] border border-white/20 font-bold py-1.5 px-3 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedNotice ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Lore, Sacred Traits, and Algorithm Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          {/* Historical Chronicle & Archetype Lore */}
          <div className="bg-white p-5 rounded-xl border border-[#E8DCC9] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A2E1D] flex items-center gap-2 mb-2 pb-1 border-b border-[#E8DCC9]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'الرواية والتوثيق الأثري النبطي' : 'Archaeological & Historical Chronicle'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#331C16] leading-relaxed">
              {isAr ? creature.loreAr : creature.loreEn}
            </p>
          </div>

          {/* Sacred Traits List */}
          <div className="bg-white p-5 rounded-xl border border-[#E8DCC9] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A2E1D] flex items-center gap-2 mb-2 pb-1 border-b border-[#E8DCC9]">
              <Crown className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'السمات النبطية الموروثة' : 'Nabataean Sacred Traits'}</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {creature.traits.map((trait, idx) => (
                <span
                  key={idx}
                  className="bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8963E]" />
                  <span>{trait}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Explainable Algorithm Breakdown */}
          <div className="bg-[#FAF5ED] p-4 rounded-xl border border-[#C8963E]/40 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#7A2E1D] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C8963E]" />
                <span>{isAr ? 'معادلة الاستدعاء التفسيرية' : 'Explainable Algorithm Breakdown'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                ✓ موثق ومعتمد
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#C8963E]" />
                <span>{isAr ? 'معلم البداية:' : 'Starting Point:'}</span>
                <strong className="text-stone-900">{landmarkName}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#C8963E]" />
                <span>{isAr ? 'وقت اليوم:' : 'Time of Day:'}</span>
                <strong className="text-stone-900">
                  {isAr
                    ? activeBadge.timeOfDay === 'Morning'
                      ? 'الصباح الباكر'
                      : activeBadge.timeOfDay === 'Afternoon'
                      ? 'الظهيرة'
                      : 'المساء والليل'
                    : activeBadge.timeOfDay}
                </strong>
              </div>
            </div>
          </div>

          {/* Step Actions: Next to Map (Step 3), Ask Guide (Step 4), or Return to Satchel (Step 1) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary Action: Go to Step 3: Petra Map */}
            <button
              id="btn-proceed-to-map"
              onClick={onProceedToMap}
              className="flex-1 bg-[#7A2E1D] hover:bg-[#632416] active:scale-[0.98] text-[#F6EEE1] font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-[#C8963E]/40"
            >
              <span>{isAr ? 'الانطلاق إلى خريطة بترا (الخطوة 3) →' : 'Explore Petra Map (Step 3) →'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Secondary Action: Ask Guide */}
            <button
              onClick={onProceedToChat}
              className="bg-[#1F6E68] hover:bg-[#185551] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'اسأل الدليل 💬' : 'Ask Guide 💬'}</span>
            </button>

            {/* Back to Step 1 */}
            <button
              onClick={onOpenSatchel}
              className="bg-white hover:bg-stone-50 text-stone-700 border border-[#E8DCC9] font-medium text-xs py-3 px-3.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
              title={isAr ? 'العودة لفتح جعبة المستكشف واستدعاء تميمة أخرى' : 'Back to Explorer Satchel'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAr ? 'استدعاء آخر' : 'Re-summon'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
