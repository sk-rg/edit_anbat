import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS, getStepTitle } from '../data/translations';
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  MessageSquare,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check,
  Ticket
} from 'lucide-react';

interface FooterProgressProps {
  language: Language;
  activeStep: number;
  onStepSelect: (step: number) => void;
}

export const FooterProgress: React.FC<FooterProgressProps> = ({
  language,
  activeStep,
  onStepSelect
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const steps = [
    { num: 0, icon: Ticket },
    { num: 1, icon: Sparkles },
    { num: 2, icon: ShoppingBag },
    { num: 3, icon: MapPin },
    { num: 4, icon: MessageSquare },
    { num: 5, icon: BookOpen }
  ];

  const percentage = Math.round((activeStep / 5) * 100);
  const currentStepTitle = getStepTitle(activeStep, language);

  return (
    <div
      id="footer-progress-tracker"
      className="bg-[#561E12] border-t border-b border-[#C8963E]/30 px-4 py-5 text-[#F6EEE1]"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header row: Title, current step name, and dynamic percentage pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8963E] animate-pulse" />
            <span className="font-bold text-[#E8DCC9]">
              {t.journeyProgress}
            </span>
            <span className="text-[#C8963E] font-semibold">
              {t.stepOfFive.replace('{step}', activeStep.toString())} • {currentStepTitle}
            </span>
          </div>

          {/* Dynamic Percentage Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#3D140B] px-3 py-1 rounded-full border border-[#C8963E]/40 text-xs shadow-inner">
              <span className="text-[#E8DCC9]/80 font-medium">
                {t.completionLabel}
              </span>
              <span
                id="footer-progress-percentage-text"
                className="font-bold text-[#C8963E] text-sm tabular-nums"
              >
                {percentage}%
              </span>
            </div>

            {/* Quick Step Step-Through Buttons */}
            <div className="flex items-center gap-1">
              <button
                id="btn-footer-prev-step"
                disabled={activeStep <= 0}
                onClick={() => onStepSelect(activeStep - 1)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition cursor-pointer ${
                  activeStep <= 0
                    ? 'opacity-40 cursor-not-allowed text-[#E8DCC9]/40'
                    : 'bg-[#7A2E1D] hover:bg-[#682415] text-[#F6EEE1] border border-[#C8963E]/30'
                }`}
                title={t.prevBtn}
              >
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span className="hidden sm:inline">{t.prevBtn}</span>
              </button>

              <button
                id="btn-footer-next-step"
                disabled={activeStep >= 5}
                onClick={() => onStepSelect(activeStep + 1)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition cursor-pointer ${
                  activeStep >= 5
                    ? 'opacity-40 cursor-not-allowed text-[#E8DCC9]/40'
                    : 'bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-bold shadow-xs'
                }`}
                title={t.nextBtn}
              >
                <span className="hidden sm:inline">{t.nextBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div
            className="w-full bg-[#3D140B] h-3 rounded-full overflow-hidden border border-[#C8963E]/30 p-0.5 shadow-inner"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.completionLabel}
          >
            <div
              id="footer-progress-bar-fill"
              className="h-full rounded-full bg-gradient-to-r from-[#7A2E1D] via-[#C8963E] to-[#1F6E68] transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 5 Interactive Step Nodes with Dynamic States */}
        <div className="grid grid-cols-6 gap-1 sm:gap-2 pt-1">
          {steps.map(st => {
            const StepIcon = st.icon;
            const isActive = activeStep === st.num;
            const isCompleted = activeStep > st.num;
            const title = getStepTitle(st.num, language);

            return (
              <button
                key={st.num}
                id={`footer-step-node-${st.num}`}
                onClick={() => onStepSelect(st.num)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all text-center group cursor-pointer ${
                  isActive
                    ? 'bg-[#C8963E] text-[#331C16] font-bold shadow-md ring-2 ring-[#F6EEE1]/70 scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#7A2E1D]/80 hover:bg-[#7A2E1D] text-[#E8DCC9] border border-[#1F6E68]/60'
                    : 'bg-[#3D140B]/60 hover:bg-[#3D140B] text-[#E8DCC9]/60 border border-[#C8963E]/20'
                }`}
                title={`${t.stepOfFive.replace('{step}', st.num.toString())}: ${title}`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                        : isCompleted
                        ? 'bg-[#1F6E68] text-white'
                        : 'bg-[#561E12] text-[#E8DCC9]/70 border border-[#C8963E]/30'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : st.num}
                  </span>
                  <StepIcon
                    className={`w-3.5 h-3.5 hidden md:block shrink-0 ${
                      isActive
                        ? 'text-[#7A2E1D]'
                        : isCompleted
                        ? 'text-[#1F6E68]'
                        : 'text-[#C8963E]/60'
                    }`}
                  />
                </div>
                <span className="text-[10px] sm:text-xs truncate w-full block">
                  {title}
                </span>
                <span
                  className={`text-[9px] mt-0.5 font-medium hidden sm:inline ${
                    isActive
                      ? 'text-[#561E12]'
                      : isCompleted
                      ? 'text-[#1F6E68]'
                      : 'text-[#E8DCC9]/40'
                  }`}
                >
                  {isActive
                    ? t.onMap
                    : isCompleted
                    ? t.visitedBadge
                    : `${st.num * 20}%`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
