/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CreatureSvgKey } from '../types';

interface CreatureSvgProps {
  type: CreatureSvgKey | string;
  className?: string;
}

export const CreatureSvg: React.FC<CreatureSvgProps> = ({ type, className = 'w-16 h-16' }) => {
  switch (type) {
    case 'camel':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#C8963E" strokeWidth="3" />
          <path d="M26 68L28 54C28 48 32 44 38 44C42 44 45 47 48 51C51 46 56 42 62 42C69 42 74 47 74 54L76 68" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 46L24 34C22 30 25 24 30 24C34 24 37 27 38 31L42 44" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="28" r="2.5" fill="#7A2E1D" />
          <line x1="34" y1="68" x2="34" y2="82" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="68" x2="42" y2="82" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="68" x2="62" y2="82" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="68" x2="70" y2="82" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 50L54 50" stroke="#C8963E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="50" r="40" stroke="#1F6E68" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );

    case 'falcon':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#C8963E" strokeWidth="3" />
          <path d="M18 48C30 38 42 34 50 44C58 34 70 38 82 48C74 60 62 62 50 56C38 62 26 60 18 48Z" fill="#C8963E" fillOpacity="0.2" stroke="#7A2E1D" strokeWidth="3" />
          <path d="M50 30C46 30 43 34 43 38C43 45 50 54 50 54C50 54 57 45 57 38C57 34 54 30 50 30Z" fill="#7A2E1D" />
          <path d="M50 36L56 38L50 40" stroke="#C8963E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="47" cy="35" r="1.5" fill="#F6EEE1" />
          <path d="M42 58L50 78L58 58" stroke="#7A2E1D" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 46L12 36M78 46L88 36" stroke="#1F6E68" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'ibex':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#C8963E" strokeWidth="3" />
          {/* Majestic Curved Horns */}
          <path d="M46 38C40 24 30 18 16 22C14 28 24 32 38 40" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M54 38C60 24 70 18 84 22C86 28 76 32 62 40" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Horn Ridges */}
          <line x1="28" y1="22" x2="31" y2="26" stroke="#C8963E" strokeWidth="2" />
          <line x1="34" y1="26" x2="37" y2="30" stroke="#C8963E" strokeWidth="2" />
          <line x1="72" y1="22" x2="69" y2="26" stroke="#C8963E" strokeWidth="2" />
          <line x1="66" y1="26" x2="63" y2="30" stroke="#C8963E" strokeWidth="2" />
          {/* Head & Beard */}
          <path d="M42 42L50 56L58 42C58 38 42 38 42 42Z" fill="#7A2E1D" />
          <path d="M47 56L50 68L53 56" stroke="#C8963E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="45" r="2" fill="#F6EEE1" />
          <circle cx="55" cy="45" r="2" fill="#F6EEE1" />
          {/* Royal Sun Aura */}
          <circle cx="50" cy="50" r="42" stroke="#C8963E" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M50 12L50 16M50 84L50 88M12 50L16 50M84 50L88 50" stroke="#1F6E68" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'scorpion':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#C8963E" strokeWidth="3" />
          <ellipse cx="50" cy="55" rx="10" ry="14" fill="#7A2E1D" />
          <path d="M44 48L32 40L24 46M32 40L22 34" stroke="#7A2E1D" strokeWidth="3" strokeLinecap="round" />
          <path d="M56 48L68 40L76 46M68 40L78 34" stroke="#7A2E1D" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 69C50 78 64 82 66 70C68 62 58 58 56 64" stroke="#C8963E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <polygon points="53,63 59,62 56,58" fill="#1F6E68" />
          <path d="M40 54L28 56M40 60L28 66M60 54L72 56M60 60L72 66" stroke="#7A2E1D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'eagle':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#D97706" strokeWidth="3.5" />
          {/* Golden Rays */}
          <circle cx="50" cy="50" r="41" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
          {/* Broad Wings Spread */}
          <path d="M12 40C24 24 40 28 50 42C60 28 76 24 88 40C78 52 64 56 50 50C36 56 22 52 12 40Z" fill="#D97706" fillOpacity="0.25" stroke="#9A3412" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Head & Imperial Crown */}
          <path d="M46 22L50 16L54 22L50 25Z" fill="#F59E0B" stroke="#9A3412" strokeWidth="1.5" />
          <path d="M44 26C44 22 56 22 56 26C56 32 50 38 50 38C50 38 44 32 44 26Z" fill="#7A2E1D" />
          {/* Sharp Beak */}
          <path d="M50 32L58 35L50 38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="48" cy="28" r="1.5" fill="#FEF3C7" />
          {/* Tail Feathers & Talons */}
          <path d="M40 54L50 76L60 54" stroke="#7A2E1D" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M42 74L36 82M58 74L64 82" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'winged_lion':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#B45309" strokeWidth="3.5" />
          {/* Celestial Wings */}
          <path d="M30 46C20 30 28 18 42 22C38 32 36 40 32 46Z" fill="#D97706" fillOpacity="0.3" stroke="#7A2E1D" strokeWidth="2.5" />
          <path d="M70 46C80 30 72 18 58 22C62 32 64 40 68 46Z" fill="#D97706" fillOpacity="0.3" stroke="#7A2E1D" strokeWidth="2.5" />
          {/* Majestic Lion Mane */}
          <circle cx="50" cy="48" r="18" fill="#FDE68A" stroke="#7A2E1D" strokeWidth="2.5" />
          {/* Snout & Face */}
          <path d="M44 46C44 42 56 42 56 46C56 52 50 56 50 56C50 56 44 52 44 46Z" fill="#7A2E1D" />
          <circle cx="46" cy="45" r="1.5" fill="#FEF3C7" />
          <circle cx="54" cy="45" r="1.5" fill="#FEF3C7" />
          <path d="M47 52L50 55L53 52" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          {/* Paws & Body Stance */}
          <path d="M36 64C36 78 64 78 64 64" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" fill="none" />
          <line x1="42" y1="72" x2="42" y2="82" stroke="#7A2E1D" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="58" y1="72" x2="58" y2="82" stroke="#7A2E1D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'sacred_viper':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#059669" strokeWidth="3.5" />
          {/* Coiled Serpent Geometry */}
          <path d="M50 78C68 78 74 62 60 52C48 42 42 34 50 24C58 14 70 22 66 32" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Horned Head */}
          <ellipse cx="66" cy="32" rx="6" ry="4" fill="#065F46" />
          <path d="M64 29L62 24M68 29L70 24" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <circle cx="68" cy="31" r="1" fill="#FEF3C7" />
          {/* Water Drop & Sacred Runes */}
          <path d="M34 60C34 54 40 48 40 48C40 48 46 54 46 60C46 64 43 66 40 66C37 66 34 64 34 60Z" fill="#10B981" fillOpacity="0.4" stroke="#047857" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="40" stroke="#059669" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
        </svg>
      );

    case 'sand_gazelle':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#0D9488" strokeWidth="3" />
          {/* Slender Lyre-shaped Horns */}
          <path d="M46 32C42 20 46 12 50 8M54 32C58 20 54 12 50 8" stroke="#7A2E1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Graceful Head */}
          <path d="M44 34C44 30 56 30 56 34C56 44 50 50 50 50C50 50 44 44 44 34Z" fill="#7A2E1D" />
          <circle cx="47" cy="36" r="1.5" fill="#FEF3C7" />
          <circle cx="53" cy="36" r="1.5" fill="#FEF3C7" />
          {/* Neck & Body */}
          <path d="M50 50L50 68" stroke="#7A2E1D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="50" cy="72" rx="14" ry="9" fill="#0D9488" fillOpacity="0.25" stroke="#0F766E" strokeWidth="2.5" />
          <line x1="42" y1="78" x2="40" y2="86" stroke="#7A2E1D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="78" x2="60" y2="86" stroke="#7A2E1D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'rose_phoenix':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#E11D48" strokeWidth="3" />
          {/* Flame Plume */}
          <path d="M50 14C44 26 56 30 50 42C44 30 56 26 50 14Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
          {/* Rising Wings in Rose Flame Shape */}
          <path d="M22 56C16 38 32 30 46 44C32 48 26 52 22 56Z" fill="#FB7185" fillOpacity="0.4" stroke="#BE123C" strokeWidth="2.5" />
          <path d="M78 56C84 38 68 30 54 44C68 48 74 52 78 56Z" fill="#FB7185" fillOpacity="0.4" stroke="#BE123C" strokeWidth="2.5" />
          {/* Crown & Eye */}
          <circle cx="50" cy="46" r="6" fill="#9F1239" />
          <circle cx="49" cy="45" r="1.5" fill="#FFF1F2" />
          {/* Radiant Tail Trails */}
          <path d="M44 64C42 74 36 82 34 86M50 66L50 88M56 64C58 74 64 82 66 86" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'caracal':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#2563EB" strokeWidth="3" />
          {/* Tufted Ears */}
          <path d="M38 36L34 16L42 32M62 36L66 16L58 32" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" fill="#DBEAFE" />
          <path d="M34 16L32 10M66 16L68 10" stroke="#7A2E1D" strokeWidth="2" strokeLinecap="round" />
          {/* Feline Head */}
          <circle cx="50" cy="46" r="16" fill="#93C5FD" fillOpacity="0.3" stroke="#1D4ED8" strokeWidth="2.5" />
          <circle cx="45" cy="44" r="2" fill="#1E3A8A" />
          <circle cx="55" cy="44" r="2" fill="#1E3A8A" />
          <polygon points="48,49 52,49 50,52" fill="#7A2E1D" />
          {/* Whiskers */}
          <line x1="36" y1="52" x2="26" y2="50" stroke="#1E40AF" strokeWidth="1.5" />
          <line x1="64" y1="52" x2="74" y2="50" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Stalking Body */}
          <ellipse cx="50" cy="72" rx="15" ry="10" fill="#7A2E1D" />
        </svg>
      );

    case 'fennec':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#3B82F6" strokeWidth="3" />
          {/* Huge Iconic Fennec Ears */}
          <path d="M32 40C22 18 36 12 44 32Z" fill="#FDE68A" stroke="#1E40AF" strokeWidth="2.5" />
          <path d="M68 40C78 18 64 12 56 32Z" fill="#FDE68A" stroke="#1E40AF" strokeWidth="2.5" />
          {/* Cute Fox Face */}
          <circle cx="50" cy="48" r="14" fill="#F59E0B" fillOpacity="0.3" stroke="#B45309" strokeWidth="2" />
          <circle cx="45" cy="46" r="2" fill="#1E3A8A" />
          <circle cx="55" cy="46" r="2" fill="#1E3A8A" />
          <polygon points="48,52 52,52 50,55" fill="#7A2E1D" />
          {/* Bushy Tail */}
          <path d="M50 64C40 76 68 84 64 70" stroke="#D97706" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'hedgehog':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#7A2E1D" strokeWidth="3" />
          {/* Rounded Body */}
          <ellipse cx="50" cy="56" rx="20" ry="16" fill="#E8DCC9" stroke="#7A2E1D" strokeWidth="2.5" />
          {/* Spines Fan */}
          <path d="M30 46L24 40M34 40L28 32M42 36L40 26M50 34L50 24M58 36L60 26M66 40L72 32M70 46L76 40" stroke="#7A2E1D" strokeWidth="3" strokeLinecap="round" />
          {/* Snout */}
          <path d="M34 58L22 62L32 66" stroke="#7A2E1D" strokeWidth="2.5" strokeLinejoin="round" fill="#F6EEE1" />
          <circle cx="24" cy="62" r="2" fill="#7A2E1D" />
          <circle cx="34" cy="56" r="1.5" fill="#7A2E1D" />
        </svg>
      );

    case 'bee_eater':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#0284C7" strokeWidth="3" />
          {/* Sleek Beak & Head */}
          <path d="M46 44L24 40L44 48Z" fill="#0369A1" stroke="#7A2E1D" strokeWidth="1.5" />
          <circle cx="48" cy="46" r="10" fill="#38BDF8" fillOpacity="0.4" stroke="#0284C7" strokeWidth="2" />
          <circle cx="44" cy="44" r="1.5" fill="#7A2E1D" />
          {/* Turquoise and Gold Plumage */}
          <path d="M54 50C68 46 78 54 82 66C70 66 60 62 54 50Z" fill="#F59E0B" fillOpacity="0.4" stroke="#D97706" strokeWidth="2.5" />
          <path d="M50 56L68 84L60 60" stroke="#0284C7" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="46" fill="#F6EEE1" stroke="#C8963E" strokeWidth="3" />
          <circle cx="50" cy="50" r="32" stroke="#7A2E1D" strokeWidth="2" strokeDasharray="4 4" />
          <text x="50" y="58" textAnchor="middle" fill="#7A2E1D" fontSize="28" fontWeight="bold">🏛️</text>
        </svg>
      );
  }
};
