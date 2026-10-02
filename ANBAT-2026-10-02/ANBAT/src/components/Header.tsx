/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Language, UserProfile } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS, getStepTitle } from '../data/translations';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  BookOpen,
  RotateCcw,
  Camera,
  MapPin,
  MessageSquare,
  ChevronRight,
  Menu,
  ChevronDown,
  Globe,
  Settings,
  FileText,
  LogOut,
  LogIn,
  User,
  ShoppingBag,
  Award,
  Coins,
  Ticket
} from 'lucide-react';

interface HeaderProps {
  currentView: 'visitor' | 'admin';
  onViewChange: (view: 'visitor' | 'admin') => void;
  activeStep: number;
  onStepSelect: (step: number) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  visitedCount: number;
  totalLandmarks: number;
  onJumpAllLandmarks: () => void;
  onResetDemo: () => void;
  onOpenQrScanner?: () => void;
  currentUser: UserProfile | null;
  onOpenSettings: () => void;
  onOpenComplaints: () => void;
  onLogout: () => void;
  onOpenAuth: (mode?: 'signIn' | 'signUp') => void;
  userPoints?: number;
  userDirhams?: number;
  collectedStampsCount?: number;
  cartTotalUsd?: number;
  cartTotalItems?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  activeStep,
  onStepSelect,
  language,
  onLanguageChange,
  visitedCount,
  totalLandmarks,
  onJumpAllLandmarks,
  onResetDemo,
  onOpenQrScanner,
  currentUser,
  onOpenSettings,
  onOpenComplaints,
  onLogout,
  onOpenAuth,
  userPoints,
  userDirhams = 170,
  collectedStampsCount = 1,
  cartTotalUsd = 0,
  cartTotalItems = 0,
  onOpenCart
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isAr = language === 'ar';

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);

  // On phones (< md) only the steps strip stays pinned while scrolling: the sticky header is
  // offset upward by the height of its top bar, so the top bar scrolls away with the page.
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [stickyTopOffset, setStickyTopOffset] = useState<number>(0);

  useEffect(() => {
    const phoneQuery = window.matchMedia('(max-width: 767px)');
    const updateOffset = () => {
      const topBar = topBarRef.current;
      setStickyTopOffset(phoneQuery.matches && topBar ? -topBar.offsetHeight : 0);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    // The top bar's height changes when its content wraps (language, login state, cart total)
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateOffset) : null;
    if (observer && topBarRef.current) observer.observe(topBarRef.current);
    return () => {
      window.removeEventListener('resize', updateOffset);
      observer?.disconnect();
    };
  }, []);

  // Keep the dropdown fully on screen on narrow viewports (e.g. phones, small preview panes)
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const menuPopupRef = useRef<HTMLDivElement | null>(null);
  const [menuOffsetX, setMenuOffsetX] = useState<number>(0);

  useLayoutEffect(() => {
    if (!isMenuOpen) {
      setMenuOffsetX(0);
      return;
    }
    const fitMenuOnScreen = () => {
      const container = menuContainerRef.current;
      const popup = menuPopupRef.current;
      if (!container || !popup) return;
      const margin = 8;
      const containerRect = container.getBoundingClientRect();
      const width = popup.offsetWidth;
      // Natural position: aligned to the button's left edge in Arabic, right edge otherwise
      const naturalLeft = isAr ? containerRect.left : containerRect.right - width;
      const maxLeft = window.innerWidth - margin - width;
      const fittedLeft = Math.max(margin, Math.min(naturalLeft, maxLeft));
      setMenuOffsetX(fittedLeft - naturalLeft);
    };
    fitMenuOnScreen();
    window.addEventListener('resize', fitMenuOnScreen);
    return () => window.removeEventListener('resize', fitMenuOnScreen);
  }, [isMenuOpen, isAr]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#top-bar-menu-container')) {
        setIsMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const steps = [
    { num: 0, icon: Ticket },
    { num: 1, icon: Sparkles },
    { num: 2, icon: ShoppingBag },
    { num: 3, icon: MapPin },
    { num: 4, icon: MessageSquare },
    { num: 5, icon: BookOpen }
  ];

  const handleStepClick = (stepNum: number) => {
    if (currentView !== 'visitor') {
      onViewChange('visitor');
    }
    onStepSelect(stepNum);
  };

  return (
    <header
      className="sticky top-0 z-40 bg-[#7A2E1D] text-[#F6EEE1] border-b border-[#C8963E]/40 shadow-md"
      style={{ top: stickyTopOffset }}
    >
      {/* Top Bar: Brand, View Tabs, User Status Stats, Demo Controls, Top Bar Dropdown Menu */}
      <div ref={topBarRef} className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleStepClick(1)}
          title={`${t.stepOfFive.replace('{step}', '1')}: ${getStepTitle(1, language)}`}
          role="button"
          tabIndex={0}
        >
          <div className="w-10 h-10 rounded-lg bg-[#C8963E] group-hover:bg-[#d8a64e] text-[#7A2E1D] flex items-center justify-center font-bold text-xl shadow-inner border border-[#F6EEE1]/40 transition-colors">
            أن
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-lg md:text-xl tracking-wide text-[#F6EEE1]">
                ANBAT <span className="text-[#C8963E] text-sm md:text-base font-normal font-sans">| أنباط</span>
              </h1>
            </div>
            <p className="text-xs text-[#E8DCC9]/90 hidden md:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* View Switcher: Visitor vs Admin */}
        <div className="flex items-center bg-[#561E12] p-1 rounded-lg border border-[#C8963E]/30 text-xs">
          <button
            id="tab-visitor-view"
            onClick={() => onViewChange('visitor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              currentView === 'visitor'
                ? 'bg-[#C8963E] text-[#331C16] shadow-sm font-semibold'
                : 'text-[#E8DCC9] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.visitorPortal}</span>
          </button>
          <button
            id="tab-admin-view"
            onClick={() => onViewChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#1F6E68] text-white shadow-sm font-semibold'
                : 'text-[#E8DCC9] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.adminPortal}</span>
          </button>
        </div>

        {/* User Status Stats in Header Bar:
            نقاط الاستكشاف, الأختام المكتسبة, and سلة المقتنيات
        */}
        <div className="flex items-center gap-2 text-xs">
          {/* نقاط الاستكشاف */}
          <div
            className="flex items-center gap-1.5 bg-[#561E12] px-2.5 py-1.5 rounded-lg border border-[#C8963E]/40 shadow-inner"
            title={isAr ? 'نقاط الاستكشاف المكتسبة من زيارة المعالم والأنشطة' : 'Exploration points earned from landmarks and activities'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[#E8DCC9] hidden sm:inline">{isAr ? 'نقاط الاستكشاف:' : 'Points:'}</span>
            <strong className="text-[#FDE68A] font-bold font-mono">{userPoints ?? userDirhams}</strong>
          </div>

          {/* الأختام المكتسبة */}
          <div
            className="flex items-center gap-1.5 bg-[#561E12] px-2.5 py-1.5 rounded-lg border border-[#C8963E]/40 shadow-inner"
            title={isAr ? 'الأختام المكتسبة' : 'Earned Stamps'}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[#E8DCC9] hidden sm:inline">{isAr ? 'الأختام:' : 'Stamps:'}</span>
            <strong className="text-emerald-300 font-bold font-mono">{collectedStampsCount}/8</strong>
          </div>

          {/* سلة المقتنيات (Cart with price in USD) */}
          <button
            id="btn-header-cart"
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] px-3 py-1.5 rounded-lg font-bold transition shadow-sm cursor-pointer border border-[#FDE68A]"
            title={isAr ? 'فتح سلة المقتنيات' : 'Open Shopping Cart'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'سلة المقتنيات' : 'Cart'}</span>
            <span className="bg-[#7A2E1D] text-[#F6EEE1] text-[10px] font-mono px-1.5 py-0.2 rounded-full">
              {cartTotalItems} · ${cartTotalUsd}
            </span>
          </button>
        </div>

        {/* Right Tools: Top Bar Unified Menu, Demo Controls */}
        <div className="flex items-center gap-2">
          {/* Demo Control Dropdown/Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-[#4A180E] px-2 py-1 rounded border border-[#C8963E]/20 text-[11px]">
            <span className="text-[#C8963E] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t.demoLabel}
            </span>
            <button
              id="btn-demo-jump-all"
              onClick={onJumpAllLandmarks}
              className="text-[#F6EEE1] hover:text-[#C8963E] underline px-1 py-0.5 transition cursor-pointer"
              title="Instantly marks all 5 landmarks visited to test Legendary Creature unlock"
            >
              {t.demoJumpAll}
            </button>
            <span className="text-[#E8DCC9]/40">|</span>
            <button
              id="btn-demo-reset-all"
              onClick={onResetDemo}
              className="text-[#E8DCC9] hover:text-red-300 flex items-center gap-0.5 px-1 py-0.5 transition cursor-pointer"
              title="Reset all demo state to fresh initial records"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              {t.demoReset}
            </button>
          </div>

          {/* Top Bar Unified Menu (قائمة الشريط العلوي: اللغة، مسح QR، الإعدادات، رفع الشكاوى، تسجيل الخروج) */}
          <div id="top-bar-menu-container" className="relative" ref={menuContainerRef}>
            <button
              id="btn-top-bar-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1.5 text-xs bg-[#561E12] hover:bg-[#682415] text-[#F6EEE1] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#C8963E]/50 transition cursor-pointer font-bold shadow-xs select-none"
              aria-label={t.topMenuTitle}
              aria-expanded={isMenuOpen}
            >
              <Menu className="w-4 h-4 text-[#C8963E]" />
              <span className="max-w-[110px] truncate hidden sm:inline">
                {currentUser ? currentUser.firstName : t.topMenuTitle}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#C8963E] transition-transform duration-200 ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Popup */}
            {isMenuOpen && (
              <div
                className={`absolute ${
                  isAr ? 'left-0' : 'right-0'
                } top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-[#FAF5ED] text-[#331C16] border border-[#C8963E]/50 rounded-xl shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2`}
                ref={menuPopupRef}
                style={isAr ? { left: menuOffsetX } : { right: -menuOffsetX }}
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {/* Header Profile Info if logged in */}
                {currentUser ? (
                  <div className="px-4 py-3 bg-[#F4E8D3] border-b border-[#C8963E]/30 mb-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#7A2E1D] text-[#F6EEE1] font-bold flex items-center justify-center text-sm shadow-xs border border-[#C8963E] shrink-0">
                        {currentUser.firstName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-[#7A2E1D] truncate">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="font-mono text-[10px] text-stone-600 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-2.5 bg-[#F4E8D3] border-b border-[#C8963E]/30 mb-1 flex items-center justify-between text-xs">
                    <span className="text-stone-600 font-medium">
                      {isAr ? 'زائر غير مسجل' : 'Guest Visitor'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenAuth('signIn');
                        }}
                        className="text-[#7A2E1D] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <LogIn className="w-3.5 h-3.5 text-[#C8963E]" />
                        <span>{t.menuSignIn}</span>
                      </button>
                      <span className="text-stone-400">|</span>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenAuth('signUp');
                        }}
                        className="text-[#1F6E68] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <User className="w-3.5 h-3.5 text-[#1F6E68]" />
                        <span>{t.menuSignUp}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 1. اللغة (Language Selector in Menu) */}
                <div className="px-1.5 py-0.5">
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#561E12] hover:bg-[#F4E8D3] rounded-lg transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-[#C8963E]" />
                      <span>{t.menuLanguage}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#7A2E1D]">
                      <span>{SUPPORTED_LANGUAGES.find(l => l.code === language)?.flag}</span>
                      <span className="font-bold">
                        {SUPPORTED_LANGUAGES.find(l => l.code === language)?.nativeName}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 rtl:rotate-180 transition-transform ${
                          isLangOpen ? 'rotate-90 rtl:rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Submenu of all 7 languages */}
                  {isLangOpen && (
                    <div className="my-1 mx-2 p-1.5 bg-white rounded-lg border border-[#C8963E]/30 grid grid-cols-2 gap-1 animate-in fade-in">
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px] font-medium transition cursor-pointer ${
                            language === lang.code
                              ? 'bg-[#7A2E1D] text-white font-bold'
                              : 'hover:bg-[#FAF5ED] text-stone-700'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span className="truncate">{lang.nativeName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. مسح QR (Scan QR in Menu) */}
                {onOpenQrScanner && (
                  <div className="px-1.5 py-0.5">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenQrScanner();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#561E12] hover:bg-[#F4E8D3] rounded-lg transition cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-[#1F6E68]" />
                      <span>{t.menuScanQr}</span>
                    </button>
                  </div>
                )}

                {/* 3. الإعدادات (Settings in Menu) */}
                <div className="px-1.5 py-0.5">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#561E12] hover:bg-[#F4E8D3] rounded-lg transition cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#C8963E]" />
                    <span>{t.menuSettings}</span>
                  </button>
                </div>

                {/* 4. رفع الشكاوى (Complaints in Menu) */}
                <div className="px-1.5 py-0.5">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenComplaints();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#561E12] hover:bg-[#F4E8D3] rounded-lg transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>{t.menuComplaints}</span>
                  </button>
                </div>

                <div className="my-1 border-t border-[#C8963E]/20" />

                {/* 5. تسجيل الخروج (Logout in Menu - ALWAYS unconditionally present) */}
                <div className="px-1.5 py-0.5">
                  <button
                    id="btn-menu-logout"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>{t.menuLogout}</span>
                  </button>
                </div>

                {/* If guest visitor, also offer Sign In / Sign Up buttons */}
                {!currentUser && (
                  <div className="px-1.5 py-0.5 space-y-1 pt-1 border-t border-[#C8963E]/15">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenAuth('signIn');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#7A2E1D] hover:bg-[#F4E8D3] rounded-lg transition cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-[#C8963E]" />
                      <span>{t.menuSignIn}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenAuth('signUp');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#1F6E68] hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#1F6E68]" />
                      <span>{t.menuSignUp} ({isAr ? 'إنشاء حساب جديد' : 'Create Account'})</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5-Step Flow Strip for Visitor Experience */}
      <div className="bg-[#561E12]/95 border-t border-[#C8963E]/20 px-3 py-1.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[660px] text-xs">
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Visitor Step Navigation">
            {steps.map((st, index) => {
              const StepIcon = st.icon;
              const isActive = currentView === 'visitor' && activeStep === st.num;
              const isPast = currentView === 'visitor' && activeStep > st.num;
              const title = getStepTitle(st.num, language);

              return (
                <React.Fragment key={st.num}>
                  <button
                    id={`step-nav-${st.num}`}
                    onClick={() => handleStepClick(st.num)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer select-none text-xs shrink-0 ${
                      isActive
                        ? 'bg-[#C8963E] text-[#331C16] font-bold shadow-md ring-2 ring-[#F6EEE1]/80 scale-[1.02]'
                        : isPast
                        ? 'text-[#C8963E] hover:text-[#F6EEE1] hover:bg-[#7A2E1D]/70 font-medium'
                        : 'text-[#E8DCC9]/70 hover:text-white hover:bg-[#7A2E1D]/40 font-medium'
                    }`}
                    title={`${t.stepOfFive.replace('{step}', st.num.toString())}: ${title}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors shadow-xs ${
                        isActive
                          ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                          : isPast
                          ? 'bg-[#1F6E68] text-white'
                          : 'bg-[#4A180E] text-[#E8DCC9]/80 border border-[#C8963E]/30'
                      }`}
                    >
                      {isPast ? '✓' : st.num}
                    </span>
                    <StepIcon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-[#7A2E1D]' : isPast ? 'text-[#1F6E68]' : 'text-[#C8963E]/80'
                      }`}
                    />
                    <span className="whitespace-nowrap font-medium">{title}</span>

                    {/* Active highlight underline marker */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#7A2E1D] rounded-full" />
                    )}
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className="flex items-center px-0.5 shrink-0 text-[#E8DCC9]/40 select-none"
                      aria-hidden="true"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Quick Landmark Progress Counter in Step Bar - Clickable to open Map (Step 3) */}
          <button
            id="btn-header-visited-landmarks"
            onClick={() => handleStepClick(3)}
            className="flex items-center gap-1.5 pl-3 rtl:pr-3 rtl:pl-0 border-l rtl:border-r rtl:border-l-0 border-[#C8963E]/30 text-[11px] text-[#E8DCC9] hover:text-[#F6EEE1] hover:bg-[#7A2E1D]/80 px-2 py-1 rounded-md transition-all cursor-pointer group shrink-0"
            title={`${t.step3Title} (${visitedCount}/${totalLandmarks})`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#C8963E] group-hover:scale-110 transition-transform" />
            <span className="group-hover:underline underline-offset-2">
              {t.filterVisited}:
            </span>
            <span className="font-bold text-[#C8963E] bg-[#4A180E] px-1.5 py-0.5 rounded border border-[#C8963E]/30 group-hover:border-[#C8963E]">
              {visitedCount}/{totalLandmarks}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

