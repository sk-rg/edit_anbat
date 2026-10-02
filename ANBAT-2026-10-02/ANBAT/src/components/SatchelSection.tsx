/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Creature,
  Language,
  TimeOfDay,
  VisitorGuideBadge,
  SummonedCreatureStamp,
  CreatureRarity
} from '../types';
import { CREATURES, performSatchelGachaPull } from '../data/creatures';
import { LANDMARKS } from '../data/landmarks';
import { UI_TRANSLATIONS, getLocalizedLandmark } from '../data/translations';
import { CreatureSvg } from './CreatureSvg';
import { MagicSmokeCanvas } from './MagicSmokeCanvas';
import { storageService } from '../services/storageService';
import {
  playStampSound,
  playSuccessChime,
  playMagicSmokeSound,
  playLegendarySummonChime
} from '../utils/audio';
import {
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Check,
  Award,
  Crown,
  Download,
  ArrowRight,
  RefreshCw,
  Volume2,
  X,
  BookmarkCheck,
  Layers,
  Sparkle
} from 'lucide-react';

interface SatchelSectionProps {
  language: Language;
  visitedLandmarks: string[];
  activeBadge: VisitorGuideBadge | null;
  currentStep?: number;
  onBadgeCreated: (badge: VisitorGuideBadge) => void;
  onProceedToCompanion?: () => void;
  onProceedToMap: () => void;
  onProceedToChat: () => void;
}

export const SatchelSection: React.FC<SatchelSectionProps> = ({
  language,
  visitedLandmarks,
  activeBadge,
  currentStep = 1,
  onBadgeCreated,
  onProceedToCompanion,
  onProceedToMap,
  onProceedToChat
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const allLandmarksVisited = visitedLandmarks.length >= LANDMARKS.length;

  // Configuration controls (Classical Arabic)
  const [startingLandmark, setStartingLandmark] = useState<string>(LANDMARKS[0].id);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Morning');

  // Full-Screen Magic Smoke Overlay State (2.5 - 3 seconds anticipation)
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [summonPhase, setSummonPhase] = useState<'swirling' | 'revealed'>('swirling');
  const [wonSingleStamp, setWonSingleStamp] = useState<SummonedCreatureStamp | null>(null);

  // Dedicated Separate Collection Modal View State
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState<boolean>(false);
  const [collection, setCollection] = useState<SummonedCreatureStamp[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | CreatureRarity>('ALL');
  const [selectedStampForDetail, setSelectedStampForDetail] = useState<SummonedCreatureStamp | null>(null);

  // Active guide tracking
  const [activeGuideCreatureId, setActiveGuideCreatureId] = useState<string>(
    activeBadge ? activeBadge.creatureId : 'ibex'
  );
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [justCollectedNotice, setJustCollectedNotice] = useState<boolean>(false);

  // Hidden canvas for downloading stamp PNG
  const downloadCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize and load persistent collection from storage
  useEffect(() => {
    let existing = storageService.getCollectedStamps();
    if (existing.length === 0) {
      // Seed with initial starter items
      const starter = performSatchelGachaPull('siq', 'Morning', 3, visitedLandmarks.length);
      storageService.saveCollectedStamps(starter);
      existing = starter;
    }
    setCollection(existing);

    if (activeBadge) {
      setActiveGuideCreatureId(activeBadge.creatureId);
    }
  }, [activeBadge, visitedLandmarks.length]);

  // Main Action: "افتح جعبة المستكشف واستدعِ الدليل"
  // Triggers the full-screen immersive cyan/golden smoke overlay for 2 to 3 seconds
  const handleStartSummoning = () => {
    setIsOverlayOpen(true);
    setSummonPhase('swirling');
    setWonSingleStamp(null);

    if (!audioMuted) {
      playMagicSmokeSound();
    }
  };

  // Called during the full-screen smoke vortex (~1.3s in) to draw exactly 1 single item
  const handleOverlaySmokePeak = () => {
    // Single-Reward Gacha Mechanic: exactly 1 creature stamp per attempt
    const drawn = performSatchelGachaPull(
      startingLandmark,
      timeOfDay,
      1,
      visitedLandmarks.length
    );

    const singleStamp = drawn[0];
    setWonSingleStamp(singleStamp);

    // Save to collection storage
    const updatedCollection = storageService.addCollectedStamps([singleStamp]);
    setCollection(updatedCollection);

    // Auto update primary companion guide
    if (singleStamp) {
      setActiveGuideCreatureId(singleStamp.creature.id);

      const defaultName = isAr
        ? `${singleStamp.creature.nameAr.split(' ')[0]} البتراوي`
        : `Companion ${singleStamp.creature.nameEn.split(' ')[0]}`;

      const newBadge: VisitorGuideBadge = {
        creatureId: singleStamp.creature.id,
        customName: defaultName,
        unlockedAt: new Date().toISOString(),
        startingLandmarkId: startingLandmark,
        timeOfDay,
        rarityRoll: singleStamp.xpBonus,
        explainableFormula: `[Landmark: ${startingLandmark}] + [Time: ${timeOfDay}] ➔ Summoned ${singleStamp.creature.rarity} Companion (${singleStamp.serialNumber})`
      };
      storageService.saveVisitorBadge(newBadge);
      onBadgeCreated(newBadge);
    }
  };

  // Called after 2.6 seconds of magical smoke animation
  const handleOverlaySmokeComplete = () => {
    setSummonPhase('revealed');

    if (!audioMuted) {
      if (wonSingleStamp?.isLegendary || wonSingleStamp?.isSacred) {
        playLegendarySummonChime();
      } else {
        playSuccessChime();
      }
    }
  };

  // Set an item as active guide
  const handleSelectAsGuide = (stamp: SummonedCreatureStamp) => {
    setActiveGuideCreatureId(stamp.creature.id);

    if (!audioMuted) {
      playStampSound();
    }

    const defaultName = isAr
      ? `${stamp.creature.nameAr.split(' ')[0]} البتراوي`
      : `Companion ${stamp.creature.nameEn.split(' ')[0]}`;

    const updatedBadge: VisitorGuideBadge = {
      creatureId: stamp.creature.id,
      customName: defaultName,
      unlockedAt: new Date().toISOString(),
      startingLandmarkId: startingLandmark,
      timeOfDay,
      rarityRoll: stamp.xpBonus,
      explainableFormula: `[Selected: ${stamp.creature.rarity}] ➔ Appointed as Active Guide (${stamp.serialNumber})`
    };

    storageService.saveVisitorBadge(updatedBadge);
    onBadgeCreated(updatedBadge);
  };

  // Download Stamp as high-res PNG
  const handleDownloadStampPng = (stamp: SummonedCreatureStamp) => {
    const canvas = downloadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 780;

    const bgGradient = ctx.createLinearGradient(0, 0, 0, 780);
    bgGradient.addColorStop(0, '#7A2E1D');
    bgGradient.addColorStop(0.3, '#933D2A');
    bgGradient.addColorStop(0.8, '#561E12');
    bgGradient.addColorStop(1, '#331C16');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 600, 780);

    ctx.strokeStyle = '#C8963E';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 560, 740);

    ctx.strokeStyle = '#F6EEE1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, 544, 724);

    ctx.fillStyle = '#F6EEE1';
    ctx.fillRect(40, 140, 520, 590);

    ctx.fillStyle = '#C8963E';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('ANBAT • NABATAEAN ANCIENT STAMP', 300, 75);

    ctx.fillStyle = '#E8DCC9';
    ctx.font = '14px sans-serif';
    ctx.fillText(`SERIAL: ${stamp.serialNumber} • PETRA ARCHIVES`, 300, 105);

    ctx.fillStyle = '#E8DCC9';
    ctx.beginPath();
    ctx.arc(300, 250, 75, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#C8963E';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '64px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stamp.creature.icon, 300, 272);

    ctx.fillStyle =
      stamp.creature.rarity === 'Legendary'
        ? '#C8963E'
        : stamp.creature.rarity === 'Sacred'
        ? '#059669'
        : stamp.creature.rarity === 'Rare'
        ? '#2563EB'
        : '#7A2E1D';
    ctx.fillRect(180, 345, 240, 36);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(`${stamp.creature.rarity.toUpperCase()} • +${stamp.xpBonus} XP`, 300, 369);

    ctx.fillStyle = '#331C16';
    ctx.font = 'bold 26px serif';
    ctx.fillText(stamp.creature.nameAr, 300, 420);

    ctx.fillStyle = '#7A2E1D';
    ctx.font = 'italic 15px serif';
    ctx.fillText(`"${stamp.creature.titleAr}"`, 300, 450);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#331C16';
    ctx.font = '13px sans-serif';
    ctx.fillText(`• Landmark Origin: ${startingLandmark.toUpperCase()}`, 70, 515);
    ctx.fillText(`• Encounter Period: ${timeOfDay}`, 70, 540);
    ctx.fillText(`• Serial Code: ${stamp.serialNumber}`, 70, 565);
    ctx.fillText(`• Date Issued: ${new Date(stamp.unlockedAt).toLocaleDateString()}`, 70, 590);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ANBAT-Stamp-${stamp.creature.id}-${stamp.serialNumber}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Stats across user collection
  const totalXp = collection.reduce((acc, s) => acc + s.xpBonus, 0);
  const countLegendary = collection.filter(s => s.creature.rarity === 'Legendary').length;
  const countSacred = collection.filter(s => s.creature.rarity === 'Sacred').length;
  const countRare = collection.filter(s => s.creature.rarity === 'Rare').length;
  const countCommon = collection.filter(s => s.creature.rarity === 'Common').length;

  const filteredCollection =
    selectedFilter === 'ALL'
      ? collection
      : collection.filter(s => s.creature.rarity === selectedFilter);

  return (
    <div
      className="bg-[#FAF5ED] rounded-2xl border border-[#C8963E]/30 p-4 sm:p-6 md:p-8 shadow-xl mb-12 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Hidden canvas for downloading individual high-res stamp images */}
      <canvas ref={downloadCanvasRef} className="hidden" />

      {/* Top Header & Step 1 Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C8963E]/20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold flex items-center justify-center shadow-xs">
              1
            </span>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-[#7A2E1D]">
              {isAr
                ? 'جعبة المستكشف • طقس استدعاء تمائم وحراس البترا'
                : 'Explorer Satchel • Ancient Summoning Ritual'}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#561E12]/80 mt-1 max-w-2xl">
            {isAr
              ? 'افتح جعبة المستكشف النبطية ليتصاعد الدخان السحري المتلألئ كالمارد من القمقم، واستدعِ تميمة نبطية فريدة مباركة لمرافقتك في مسارات البترا.'
              : 'Open the ancient Nabataean explorer satchel to release swirling magical cyan and golden genie smoke and summon a unique guardian talisman.'}
          </p>
        </div>

        {/* Audio Sound Toggle & Discovery Counter */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
              audioMuted
                ? 'bg-stone-100 text-stone-500 border-stone-300'
                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
            title={audioMuted ? 'تفعيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
          >
            <Volume2 className={`w-4 h-4 ${audioMuted ? 'text-stone-400' : 'text-amber-700'}`} />
            <span className="hidden sm:inline">
              {audioMuted ? (isAr ? 'الصوت صامت' : 'Muted') : (isAr ? 'المؤثرات مفعلة' : 'Sound On')}
            </span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-amber-100 text-amber-900 border-amber-300 shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>
              {isAr
                ? `${visitedLandmarks.length} من 17 معلماً مزاراً`
                : `${visitedLandmarks.length} / 17 Landmarks`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Section: Summoning Controls (Left) + Center Ancient Money Pouch (Center/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        {/* Controls Column (Inputs required by user: Starting Landmark & Time of Day) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#E8DCC9] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DCC9]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A2E1D]">
              <Compass className="w-4 h-4 text-[#C8963E]" />
              <span>{isAr ? 'شروط وطقوس الاستدعاء' : 'Summoning Parameters'}</span>
            </div>
            <span className="text-[11px] text-stone-500 font-mono">ANBAT-POUCH-RITUAL</span>
          </div>

          {/* 1. معلَم البداية المختار (Select Landmark) */}
          <div>
            <label
              htmlFor="select-starting-landmark"
              className="block text-xs font-bold text-[#331C16] mb-1.5 flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'معلم البداية المختار' : 'Selected Starting Landmark'}</span>
            </label>
            <select
              id="select-starting-landmark"
              value={startingLandmark}
              onChange={e => setStartingLandmark(e.target.value)}
              className="w-full bg-[#FAF5ED] border border-[#C8963E]/50 rounded-lg px-3 py-2 text-xs md:text-sm text-[#331C16] font-medium focus:outline-none focus:ring-2 focus:ring-[#7A2E1D]"
            >
              {LANDMARKS.map(l => (
                <option key={l.id} value={l.id}>
                  {l.routeOrder}. {getLocalizedLandmark(l, language).name} ({l.nameEn})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500 mt-1">
              {isAr
                ? 'تتفاعل طاقة المعلم الأثري مع أرواح حراس الصخور لتعزيز فرص ظهور الكائنات المتوافقة.'
                : 'Canyon resonance influences the spirit of the summoned guardian.'}
            </p>
          </div>

          {/* 2. وقت الزيارة (Morning, Noon, Evening/Night) */}
          <div>
            <label className="block text-xs font-bold text-[#331C16] mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'وقت الزيارة' : 'Encounter Time of Day'}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'Morning', labelAr: 'الصباح الباكر', labelEn: 'Morning' },
                { id: 'Afternoon', labelAr: 'الظهيرة', labelEn: 'Noon' },
                { id: 'Dusk / Night', labelAr: 'المساء والليل', labelEn: 'Night' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTimeOfDay(item.id as TimeOfDay)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border text-center transition cursor-pointer ${
                    timeOfDay === item.id
                      ? 'bg-[#7A2E1D] text-[#F6EEE1] border-[#7A2E1D] shadow-xs'
                      : 'bg-[#FAF5ED] text-[#331C16] border-[#E8DCC9] hover:border-[#C8963E]'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {isAr
                ? 'الكائنات الليلية كالعقرب والوشق تظهر ليلاً، بينما الوعل الملكي والعقاب بالنهار.'
                : 'Nocturnal guardians emerge at night, while eagles and ibex roam by dawn.'}
            </p>
          </div>

          {/* Main Action Trigger Button: "افتح جعبة المستكشف واستدعِ الدليل" */}
          <button
            id="btn-open-satchel"
            onClick={handleStartSummoning}
            className="w-full bg-[#7A2E1D] hover:bg-[#632416] active:scale-[0.98] text-[#F6EEE1] py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#C8963E]/40"
          >
            <Sparkles className="w-4 h-4 text-[#FDE68A] animate-pulse" />
            <span>
              {isAr ? 'افتح جعبة المستكشف واستدعِ الدليل' : 'Open Explorer Satchel & Summon Guide'}
            </span>
          </button>
        </div>

        {/* Central Display: Ancient Explorer Satchel ("جعبة المستكشف") */}
        <div
          id="ancient-pouch-preview"
          className="lg:col-span-7 bg-gradient-to-b from-[#331C16] via-[#4A2016] to-[#25100B] rounded-2xl p-6 md:p-8 text-center text-[#F6EEE1] relative overflow-hidden border-2 border-[#C8963E]/60 shadow-2xl flex flex-col items-center justify-center min-h-[380px]"
        >
          {/* Ambient Incense Smoke Particle Canvas */}
          <MagicSmokeCanvas
            isSummoning={false}
            className="pointer-events-none absolute inset-0 z-10 opacity-70"
          />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C8963E]/20 via-transparent to-black/60 pointer-events-none" />

          {/* Ancient Nabataean Inscription Ring */}
          <div className="relative z-10 mb-2">
            <span className="text-[11px] uppercase tracking-widest text-[#FDE68A] font-serif border-b border-[#C8963E]/40 pb-1">
              {isAr
                ? 'جعبة المستكشف النبطية • تميمة الاستدعاء الملكية'
                : 'ANCIENT NABATAEAN EXPLORER SATCHEL • SACRED SUMMONING VESSEL'}
            </span>
          </div>

          {/* Central Pouch Presentation */}
          <div className="relative z-10 my-2 flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.025, 1],
                filter: [
                  'drop-shadow(0 0 20px rgba(200, 150, 62, 0.4))',
                  'drop-shadow(0 0 35px rgba(200, 150, 62, 0.65))',
                  'drop-shadow(0 0 20px rgba(200, 150, 62, 0.4))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2.5 bg-gradient-to-b from-[#C8963E] via-[#7A2E1D] to-[#331C16] shadow-2xl cursor-pointer group"
              onClick={handleStartSummoning}
              title={isAr ? 'انقر لفتح جعبة المستكشف واستدعاء الدليل' : 'Click to open satchel and summon'}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FDE68A] relative bg-[#2A120B] flex items-center justify-center">
                <img
                  src="/src/assets/images/ancient_nabataean_pouch_1790893627809.jpg"
                  alt="Ancient Nabataean Explorer Satchel - Ja'bat Al-Mustakshif"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-2 inset-x-0 flex items-center justify-center">
                  <span className="bg-black/75 backdrop-blur-xs text-[#FDE68A] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#C8963E]/60 shadow-sm">
                    {isAr ? 'جعبة المستكشف' : 'Explorer Satchel'}
                  </span>
                </div>
              </div>

              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-stone-900 text-xs font-bold flex items-center justify-center shadow-lg border border-white animate-bounce">
                ✨
              </div>
            </motion.div>

            {/* Description */}
            <div className="mt-2.5 max-w-sm text-center">
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#FDE68A]">
                {isAr ? 'جعبة المستكشف الأثرية' : 'Ancient Explorer Satchel'}
              </h3>
              <p className="text-[11px] text-[#E8DCC9]/80 mt-0.5 leading-relaxed">
                {isAr
                  ? 'محاكة من جلد الجمال النبطية المعتق وموثقة بالأختام الملكية، كل فتحة تمنحك تميمة فريدة مباركة.'
                  : 'Handcrafted camel hide satchel consecrated with ancient royal seals. Each draw unlocks 1 unique talisman.'}
              </p>
            </div>
          </div>

          {/* ACTION BUTTON DIRECTLY BENEATH THE MONEY POUCH (Required by User Prompt):
              "عرض مجموعة الأختام والتمائم المستدعاة"
          */}
          <div className="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              id="btn-open-collection-modal"
              onClick={() => setIsCollectionModalOpen(true)}
              className="bg-[#FAF5ED] hover:bg-[#F3E8D8] text-[#7A2E1D] font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl shadow-md border-2 border-[#C8963E] transition flex items-center gap-2 cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-[#C8963E]" />
              <span>
                {isAr
                  ? `عرض مجموعة الأختام والتمائم المستدعاة (${collection.length})`
                  : `View Summoned Stamps & Talismans Collection (${collection.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN MAGIC SMOKE OVERLAY:
          When clicking "افتح جعبة المستكشف واستدعِ الدليل", trigger a full-screen immersive modal/overlay
          covering the entire window, with thick magical cyan/golden smoke particles spiraling
          for 2 to 3 seconds before revealing the won single item!
      */}
      <AnimatePresence>
        {isOverlayOpen && (
          <div className="fixed inset-0 z-50 bg-[#100705]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden animate-in fade-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="absolute top-5 right-5 text-[#FDE68A] hover:text-white p-2 rounded-xl bg-black/50 hover:bg-black/70 border border-[#C8963E]/40 transition cursor-pointer z-40"
              title={isAr ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Full-Screen Magic Cyan & Golden Smoke Canvas (2 to 3 seconds) */}
            <MagicSmokeCanvas
              isSummoning={summonPhase === 'swirling'}
              durationSeconds={2.6}
              isFullScreen={true}
              onSummonPeak={handleOverlaySmokePeak}
              onSummonComplete={handleOverlaySmokeComplete}
              className="pointer-events-none absolute inset-0 z-20"
            />

            {/* Overlay Center Stage */}
            <div className="relative z-30 max-w-lg w-full flex flex-col items-center text-center">
              {summonPhase === 'swirling' ? (
                /* Swirling Anticipation Phase (Held for ~2.6 seconds) */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.05, opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  {/* Floating Pouch with Swirling Cyan & Gold Aura */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      scale: [1, 1.07, 0.98, 1.04, 1],
                      rotate: [0, -3, 3, -2, 0],
                      filter: [
                        'drop-shadow(0 0 25px rgba(6, 182, 212, 0.6))',
                        'drop-shadow(0 0 55px rgba(245, 158, 11, 0.9))',
                        'drop-shadow(0 0 35px rgba(6, 182, 212, 0.7))'
                      ]
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-b from-[#06B6D4] via-[#F59E0B] to-[#1A0B08] border-2 border-[#FDE68A] shadow-2xl relative mb-6"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-[#2A120B]">
                      <img
                        src="/src/assets/images/ancient_nabataean_pouch_1790893627809.jpg"
                        alt="Ancient Pouch Swirling"
                        className="w-full h-full object-cover animate-pulse"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FDE68A] mb-2 tracking-wide">
                    {isAr
                      ? 'يتصاعد الدخان النبطي السحري كالمارد من جعبة المستكشف...'
                      : 'Magical Cyan & Gold Smoke Swirling from the Satchel...'}
                  </h3>
                  <p className="text-sm text-cyan-200/90 max-w-md leading-relaxed mb-6 font-medium">
                    {isAr
                      ? 'تلتف هالات الذهب والفيروز لاستحضار تميمة الحارس النبطي المباركة...'
                      : 'Ethereal cyan and golden mist spiral to summon your sacred guardian...'}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-black/60 px-4 py-2 rounded-full border border-cyan-400/40">
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{isAr ? 'تجلي التميمة النبطية...' : 'Manifesting talisman...'}</span>
                  </div>
                </motion.div>
              ) : (
                /* Won Single Item Revealed Phase (Single-Reward Gacha Mechanic) */
                wonSingleStamp && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="mb-4">
                      <span className="bg-amber-500/20 text-[#FDE68A] border border-amber-400/50 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
                        {isAr ? '✨ تم استدعاء التميمة النبطية بنجاح' : '✨ Sacred Talisman Unlocked'}
                      </span>
                    </div>

                    {/* Single Drawn Card Presentation */}
                    <div
                      className={`w-full rounded-2xl p-6 text-white text-center relative overflow-hidden mb-6 ${
                        wonSingleStamp.isLegendary
                          ? 'border-2 border-amber-400 bg-gradient-to-b from-[#2A1808] to-[#120705] shadow-[0_0_40px_rgba(245,158,11,0.65)] ring-4 ring-amber-400/40'
                          : wonSingleStamp.isSacred
                          ? 'border-2 border-emerald-400 bg-gradient-to-b from-[#0B251D] to-[#061812] shadow-[0_0_30px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/40'
                          : wonSingleStamp.creature.rarity === 'Rare'
                          ? 'border-2 border-blue-400 bg-gradient-to-b from-[#0B1A2A] to-[#07101B] shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                          : 'border border-[#C8963E]/60 bg-[#1F0F0A]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3 text-xs text-stone-300 font-mono">
                        <span>{wonSingleStamp.serialNumber}</span>
                        <span className="font-bold text-amber-300">+{wonSingleStamp.xpBonus} XP</span>
                      </div>

                      <div className="flex justify-center mb-3">
                        <div className="w-28 h-28 rounded-full bg-black/50 border-2 border-amber-400 flex items-center justify-center p-2 shadow-inner">
                          <CreatureSvg type={wonSingleStamp.creature.svgArtKey} className="w-20 h-20" />
                        </div>
                      </div>

                      <span className="inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500 text-stone-900 mb-1">
                        ★ {wonSingleStamp.creature.rarity}
                      </span>

                      <h4 className="font-heading font-extrabold text-2xl text-[#FDE68A] mt-1">
                        {isAr ? wonSingleStamp.creature.nameAr : wonSingleStamp.creature.nameEn}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-300 mt-0.5">
                        {isAr ? wonSingleStamp.creature.titleAr : wonSingleStamp.creature.titleEn}
                      </p>

                      <p className="text-xs text-stone-300 mt-2.5 bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed">
                        {isAr ? wonSingleStamp.creature.loreAr : wonSingleStamp.creature.loreEn}
                      </p>

                      {/* Card Actions */}
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                        <button
                          onClick={() => {
                            handleSelectAsGuide(wonSingleStamp);
                            setIsOverlayOpen(false);
                            if (onProceedToCompanion) {
                              onProceedToCompanion();
                            }
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md cursor-pointer"
                        >
                          ✓ {isAr ? 'تعيين كدليلي والانتقال للقاء الدليل (الخطوة 2)' : 'Set as Guide & Proceed to Step 2'}
                        </button>
                        <button
                          onClick={() => handleDownloadStampPng(wonSingleStamp)}
                          className="bg-white/10 hover:bg-white/20 text-[#FDE68A] border border-[#C8963E]/60 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isAr ? 'تحميل الختم' : 'Download PNG'}</span>
                        </button>
                      </div>
                    </div>

                    {/* View Collection Gallery Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setIsOverlayOpen(false);
                          setIsCollectionModalOpen(true);
                        }}
                        className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer border border-[#FDE68A]"
                      >
                        <BookmarkCheck className="w-4 h-4" />
                        <span>{isAr ? 'الانتقال إلى معرض الأختام المستدعاة' : 'Open Summoned Stamps Gallery'}</span>
                      </button>

                      <button
                        onClick={() => handleStartSummoning()}
                        className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition cursor-pointer border border-white/30"
                      >
                        <RefreshCw className="w-3.5 h-3.5 inline mr-1 rtl:mr-0 rtl:ml-1" />
                        <span>{isAr ? 'استدعاء تميمة أخرى' : 'Summon Again'}</span>
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* DEDICATED SEPARATE COLLECTION MODAL VIEW (Required by User Prompt):
          Clicking "معرض الأختام والتمائم المستدعاة" opens this dedicated full view / separate modal page.
          Inside, organize items cleanly with tab filters for rarity tiers:
          - أسطوري (Legendary)
          - مقدس (Sacred)
          - نادر (Rare)
          - شائع (Common)
      */}
      <AnimatePresence>
        {isCollectionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#FAF5ED] border-2 border-[#C8963E] rounded-2xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#C8963E]/30 mb-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C8963E]" />
                    <h3 className="font-heading font-extrabold text-xl text-[#7A2E1D]">
                      {isAr
                        ? 'معرض الأختام والتمائم النبطية المستدعاة'
                        : 'Nabataean Stamps & Talismans Gallery'}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {isAr
                      ? `تم حفظ ${collection.length} تميمة في سجل جعبة المستكشف الأثرية، مصنفة بحسب مراتب الندرة.`
                      : `${collection.length} talismans stored in your ancient explorer satchel.`}
                  </p>
                </div>

                <button
                  onClick={() => setIsCollectionModalOpen(false)}
                  className="text-stone-500 hover:text-stone-900 p-2 rounded-xl bg-stone-200/80 hover:bg-stone-300 transition cursor-pointer"
                  title={isAr ? 'إغلاق المعرض' : 'Close Gallery'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Filters for Rarity Tiers with Numerical Counts */}
              <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-[#E8DCC9] shrink-0">
                <button
                  onClick={() => setSelectedFilter('ALL')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedFilter === 'ALL'
                      ? 'bg-[#7A2E1D] text-[#F6EEE1] shadow-xs'
                      : 'bg-white text-stone-700 border border-[#E8DCC9] hover:border-[#C8963E]'
                  }`}
                >
                  <span>{isAr ? 'الكل' : 'All'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-mono">
                    {collection.length}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedFilter('Legendary')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedFilter === 'Legendary'
                      ? 'bg-amber-500 text-stone-900 shadow-xs'
                      : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <span>👑 {isAr ? 'أسطوري' : 'Legendary'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-900/20 text-[10px] font-mono">
                    {countLegendary}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedFilter('Sacred')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedFilter === 'Sacred'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <span>✦ {isAr ? 'مقدس' : 'Sacred'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-900/20 text-[10px] font-mono">
                    {countSacred}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedFilter('Rare')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedFilter === 'Rare'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span>◆ {isAr ? 'نادر' : 'Rare'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-900/20 text-[10px] font-mono">
                    {countRare}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedFilter('Common')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedFilter === 'Common'
                      ? 'bg-[#7A2E1D] text-[#F6EEE1] shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span>● {isAr ? 'شائع' : 'Common'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-stone-200 text-[10px] font-mono">
                    {countCommon}
                  </span>
                </button>
              </div>

              {/* Scrollable Grid of Collected Items */}
              <div className="overflow-y-auto flex-1 pr-1 pl-1">
                {filteredCollection.length === 0 ? (
                  <div className="bg-white rounded-xl border border-dashed border-[#C8963E] p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                    <Award className="w-10 h-10 text-stone-400 mb-2" />
                    <h4 className="font-heading font-bold text-base text-[#7A2E1D]">
                      {isAr ? 'لا توجد أختام في هذه الفئة بعد' : 'No stamps in this tier yet'}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 mb-4">
                      {isAr
                        ? 'افتح جعبة المستكشف الأثرية لاستدعاء تمائم إضافية وإثراء هذا القسم.'
                        : 'Open the explorer satchel to summon more talismans.'}
                    </p>
                    <button
                      onClick={() => {
                        setIsCollectionModalOpen(false);
                        handleStartSummoning();
                      }}
                      className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                    >
                      {isAr ? 'افتح جعبة المستكشف الآن' : 'Summon Now'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                    {filteredCollection.map(stamp => {
                      const isLegendary = stamp.isLegendary;
                      const isSacred = stamp.isSacred;
                      const isRare = stamp.creature.rarity === 'Rare';
                      const isSelectedGuide = activeGuideCreatureId === stamp.creature.id;

                      const cardStyle = isLegendary
                        ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-50/90 to-amber-100/60 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                        : isSacred
                        ? 'border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/80 to-emerald-100/50 shadow-[0_0_14px_rgba(16,185,129,0.2)]'
                        : isRare
                        ? 'border-2 border-blue-400 bg-gradient-to-b from-blue-50/80 to-blue-100/50'
                        : 'border border-[#E8DCC9] bg-white shadow-sm';

                      const rarityBadgeStyle = isLegendary
                        ? 'bg-amber-500 text-stone-900 font-extrabold'
                        : isSacred
                        ? 'bg-emerald-700 text-white font-bold'
                        : isRare
                        ? 'bg-blue-700 text-white font-bold'
                        : 'bg-[#7A2E1D] text-[#F6EEE1] font-semibold';

                      return (
                        <div
                          key={stamp.instanceId}
                          className={`rounded-xl p-3.5 flex flex-col justify-between relative transition-all duration-200 hover:-translate-y-0.5 ${cardStyle}`}
                        >
                          {isSelectedGuide && (
                            <div className="absolute -top-2.5 left-3 bg-[#7A2E1D] text-[#F6EEE1] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-[#C8963E]">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{isAr ? 'الدليل المعتمد' : 'Active Guide'}</span>
                            </div>
                          )}

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-mono font-bold text-stone-500">
                                {stamp.serialNumber}
                              </span>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5 ${rarityBadgeStyle}`}
                              >
                                {isLegendary && <span>★</span>}
                                {isSacred && <span>✦</span>}
                                {isRare && <span>◆</span>}
                                <span>
                                  {isAr
                                    ? stamp.creature.rarity === 'Legendary'
                                      ? 'أسطوري'
                                      : stamp.creature.rarity === 'Sacred'
                                      ? 'مقدس'
                                      : stamp.creature.rarity === 'Rare'
                                      ? 'نادر'
                                      : 'شائع'
                                    : stamp.creature.rarity}
                                </span>
                              </span>
                            </div>

                            <div className="flex justify-center mb-2">
                              <div className="w-16 h-16 rounded-full bg-[#FAF5ED] border border-[#C8963E]/40 flex items-center justify-center p-1.5 shadow-inner">
                                <CreatureSvg type={stamp.creature.svgArtKey} className="w-12 h-12" />
                              </div>
                            </div>

                            <div className="text-center mb-1.5">
                              <h4 className="font-heading font-bold text-sm text-[#7A2E1D] leading-snug">
                                {isAr ? stamp.creature.nameAr : stamp.creature.nameEn}
                              </h4>
                              <p className="text-[10px] font-medium text-[#1F6E68] mt-0.5 line-clamp-1">
                                {isAr ? stamp.creature.titleAr : stamp.creature.titleEn}
                              </p>
                            </div>

                            <p className="text-[10px] text-[#331C16]/80 line-clamp-2 leading-relaxed bg-[#FAF5ED]/80 p-1.5 rounded border border-[#E8DCC9]/60 mb-2">
                              {isAr ? stamp.creature.loreAr : stamp.creature.loreEn}
                            </p>

                            <div className="flex items-center justify-between text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-2">
                              <span>{isAr ? 'الخبرة:' : 'XP:'}</span>
                              <strong className="font-mono">+{stamp.xpBonus} XP</strong>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-stone-200 space-y-1">
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                onClick={() => handleSelectAsGuide(stamp)}
                                className={`w-full py-1 px-1.5 rounded text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                                  isSelectedGuide
                                    ? 'bg-emerald-700 text-white'
                                    : 'bg-[#7A2E1D] hover:bg-[#632416] text-[#F6EEE1]'
                                }`}
                              >
                                {isSelectedGuide ? <Check className="w-3 h-3" /> : null}
                                <span className="truncate">
                                  {isSelectedGuide ? (isAr ? 'الدليل' : 'Active') : (isAr ? 'تعيين' : 'Set')}
                                </span>
                              </button>

                              <button
                                onClick={() => setSelectedStampForDetail(stamp)}
                                className="w-full bg-white hover:bg-stone-50 text-[#7A2E1D] border border-[#7A2E1D]/40 py-1 px-1.5 rounded text-[11px] font-bold transition flex items-center justify-center cursor-pointer"
                              >
                                <span className="truncate">{isAr ? 'الحكاية' : 'Lore'}</span>
                              </button>
                            </div>

                            <button
                              onClick={() => handleDownloadStampPng(stamp)}
                              className="w-full bg-[#FAF5ED] hover:bg-[#F3E8D8] text-stone-700 border border-[#E8DCC9] py-0.5 px-1 rounded text-[9px] font-medium transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Download className="w-2.5 h-2.5 text-[#C8963E]" />
                              <span>{isAr ? 'تحميل PNG' : 'PNG'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED BOTTOM NAVIGATION & STATUS BANNER (Required by User Prompt):
          - Displays XP gains, total unlocked items
          - Quick action buttons: "استدعاء مجدداً" and "العودة إلى خريطة بترا"
      */}
      {/* On phones (< md) the bar sits at the end of the section instead of covering the screen */}
      <div className="mt-6 rounded-xl md:mt-0 md:rounded-none md:fixed md:bottom-0 md:inset-x-0 md:z-40 bg-[#25100B]/95 backdrop-blur-md border-t-2 border-[#C8963E]/60 py-3 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F6EEE1]">
          {/* Status Left */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-[#FDE68A]">
                {isAr ? 'مجموع نقاط الخبرة:' : 'Total XP:'}{' '}
                <strong className="text-white font-mono">+{totalXp} XP</strong>
              </span>
            </div>
            <span className="text-stone-500">•</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>
                {isAr ? 'التمائم المستدعاة:' : 'Unlocked Items:'}{' '}
                <strong className="text-amber-300 font-bold">{collection.length}</strong>
              </span>
            </div>
            <span className="hidden md:inline text-stone-500">•</span>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>
                {isAr ? 'المعالم المكتشفة:' : 'Landmarks:'}{' '}
                <strong className="text-emerald-300 font-bold">
                  {visitedLandmarks.length} / 17
                </strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons Right */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleStartSummoning}
              className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer border border-[#FDE68A]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#331C16]" />
              <span>{isAr ? 'استدعاء مجدداً' : 'Summon Again'}</span>
            </button>

            <button
              onClick={() => setIsCollectionModalOpen(true)}
              className="bg-white hover:bg-stone-100 text-[#7A2E1D] font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer border border-[#C8963E]/40"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'عرض الأختام' : 'Gallery'}</span>
            </button>

            {onProceedToCompanion && (
              <button
                id="btn-bottom-meet-guide"
                onClick={onProceedToCompanion}
                className="bg-[#1F6E68] hover:bg-[#175752] text-[#F6EEE1] font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>{isAr ? 'سوق الحرف (الخطوة 2)' : 'Petra Souq (Step 2)'}</span>
              </button>
            )}

            <button
              id="btn-return-to-map"
              onClick={onProceedToMap}
              className="bg-[#7A2E1D] hover:bg-[#632416] text-[#F6EEE1] font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer border border-[#C8963E]/40"
            >
              <span>{isAr ? 'العودة إلى خريطة بترا' : 'Back to Petra Map'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Popover Detail Modal for inspected creature lore */}
      <AnimatePresence>
        {selectedStampForDetail && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF5ED] border-2 border-[#C8963E] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedStampForDetail(null)}
                className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-stone-500 hover:text-stone-800 p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C8963E] flex items-center justify-center p-2 shadow-inner">
                  <CreatureSvg type={selectedStampForDetail.creature.svgArtKey} className="w-12 h-12" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8963E]">
                    {selectedStampForDetail.creature.rarity} • {selectedStampForDetail.serialNumber}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#7A2E1D]">
                    {isAr ? selectedStampForDetail.creature.nameAr : selectedStampForDetail.creature.nameEn}
                  </h3>
                  <p className="text-xs text-[#1F6E68] font-medium">
                    {isAr ? selectedStampForDetail.creature.titleAr : selectedStampForDetail.creature.titleEn}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E8DCC9] text-xs leading-relaxed text-[#331C16] mb-4 space-y-2">
                <p>{isAr ? selectedStampForDetail.creature.loreAr : selectedStampForDetail.creature.loreEn}</p>
                <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-1.5">
                  <strong className="text-stone-700 block w-full text-[11px]">
                    {isAr ? 'السمات النبطية الموروثة:' : 'Nabataean Sacred Traits:'}
                  </strong>
                  {selectedStampForDetail.creature.traits.map((tr, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-md font-semibold"
                    >
                      {tr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    handleSelectAsGuide(selectedStampForDetail);
                    setSelectedStampForDetail(null);
                  }}
                  className="bg-[#7A2E1D] hover:bg-[#632416] text-[#F6EEE1] text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                >
                  {isAr ? 'تعيين كدليلي الأساسي' : 'Set as Primary Guide'}
                </button>
                <button
                  onClick={() => setSelectedStampForDetail(null)}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
