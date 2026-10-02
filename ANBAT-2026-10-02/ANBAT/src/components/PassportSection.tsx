/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, VisitorGuideBadge, Landmark, UserProfile } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { PassportBooklet } from './PassportBooklet';

interface PassportSectionProps {
  language: Language;
  activeBadge: VisitorGuideBadge | null;
  visitedLandmarks: string[];
  currentUser?: UserProfile | null;
  onOpenSatchel: () => void;
  onExploreMap: () => void;
  onAskGuide: () => void;
  onCheckInLandmark?: (landmark: Landmark) => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'signIn' | 'signUp') => void;
}

export const PassportSection: React.FC<PassportSectionProps> = ({
  language,
  activeBadge,
  visitedLandmarks,
  currentUser,
  onOpenSatchel,
  onExploreMap,
  onAskGuide,
  onCheckInLandmark
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <div className="bg-[#FAF5ED] rounded-xl border border-[#C8963E]/30 p-4 sm:p-7 shadow-md mb-8">
      {/* Title Header */}
      <div className="mb-6 pb-4 border-b border-[#C8963E]/20">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold flex items-center justify-center">
            5
          </span>
          <h2 className="font-heading font-bold text-xl md:text-2xl text-[#7A2E1D]">
            {t.passportTitle}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#561E12]/80 mt-1">
          {t.passportSubtitle}
        </p>
      </div>

      {/* The Interactive Passport Booklet Component */}
      <PassportBooklet
        language={language}
        activeBadge={activeBadge}
        visitedLandmarks={visitedLandmarks}
        currentUser={currentUser}
        onOpenSatchel={onOpenSatchel}
        onExploreMap={onExploreMap}
        onAskGuide={onAskGuide}
        onCheckInLandmark={onCheckInLandmark}
      />
    </div>
  );
};

