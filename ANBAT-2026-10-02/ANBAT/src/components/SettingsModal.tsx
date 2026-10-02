/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import {
  Settings,
  Volume2,
  VolumeX,
  Database,
  User,
  RotateCcw,
  X,
  CheckCircle2,
  Globe,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface SettingsModalProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onResetDemo: () => void;
  onOpenAuth: (mode?: 'signIn' | 'signUp') => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  language,
  onLanguageChange,
  currentUser,
  isOpen,
  onClose,
  onResetDemo,
  onOpenAuth,
  onLogout
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState<boolean>(true);
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF5ED] text-[#331C16] border border-[#C8963E]/40 rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A2E1D] via-[#561E12] to-[#7A2E1D] text-[#F6EEE1] p-5 border-b border-[#C8963E]/40 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8963E] text-[#7A2E1D] flex items-center justify-center font-bold shadow-inner border border-white/30">
              <Settings className="w-5 h-5 text-[#7A2E1D]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#F6EEE1]">
                {t.settingsTitle}
              </h3>
              <p className="text-xs text-[#E8DCC9]/90 mt-0.5">
                {isAr ? 'تفضيلات النظام، الصوت، وبيانات الحساب' : 'System preferences & account data'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#E8DCC9] hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* User Account Profile Card */}
          <div className="bg-white border border-[#C8963E]/30 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
              <span className="font-bold text-[#7A2E1D] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C8963E]" />
                {t.settingsUserData}
              </span>
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {isAr ? 'مسجل ونشط' : 'Logged In'}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-red-200 flex items-center gap-1 transition cursor-pointer"
                    title={isAr ? 'تسجيل الخروج من الحساب' : 'Log Out'}
                  >
                    <LogOut className="w-3 h-3 text-red-600" />
                    <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('signIn');
                    }}
                    className="text-xs text-[#7A2E1D] hover:underline font-bold cursor-pointer"
                  >
                    {t.authSignInBtn}
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('signUp');
                    }}
                    className="text-xs text-[#1F6E68] hover:underline font-bold cursor-pointer"
                  >
                    {t.menuSignUp}
                  </button>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-stone-700">
                <div>
                  <span className="text-[10px] text-stone-400 block">{isAr ? 'الاسم' : 'Name'}</span>
                  <span className="font-bold text-stone-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
                  <span className="font-mono text-stone-800 break-all">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">{isAr ? 'العمر والبلد' : 'Age & Country'}</span>
                  <span>{currentUser.age} {isAr ? 'سنة' : 'yrs'} • {currentUser.country}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">{isAr ? 'الأكلة الأردنية المفضلة' : 'Fav Food'}</span>
                  <span className="text-[#7A2E1D] font-medium flex items-center gap-1">
                    <UtensilsCrossed className="w-3 h-3 text-[#C8963E]" />
                    {currentUser.favouriteFood}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-stone-500 italic">
                {isAr
                  ? 'لم تقم بتسجيل الدخول بعد. يمكنك تسجيل الدخول لربط اسمك وأكلتك المفضلة بجواز سفر الأنباط.'
                  : 'You are not logged in. Sign in to link your name and favorite food with your Nabataean Passport.'}
              </p>
            )}
          </div>

          {/* Language Switcher Setting */}
          <div className="bg-white border border-[#C8963E]/30 rounded-xl p-4 shadow-2xs">
            <label className="font-bold text-[#7A2E1D] mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#C8963E]" />
              {t.menuLanguage}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#7A2E1D] text-white border-[#7A2E1D] shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound & Offline Toggles */}
          <div className="bg-white border border-[#C8963E]/30 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#1F6E68]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
                <span className="font-medium text-stone-800">{t.settingsSoundEffects}</span>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                  soundEnabled ? 'bg-[#1F6E68] justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-2.5">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#C8963E]" />
                <span className="font-medium text-stone-800">{t.settingsOfflineMode}</span>
              </div>
              <button
                type="button"
                onClick={() => setOfflineCacheEnabled(!offlineCacheEnabled)}
                className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                  offlineCacheEnabled ? 'bg-[#1F6E68] justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div className="bg-red-50/70 border border-red-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-red-900 block">{t.demoReset}</span>
                <span className="text-[11px] text-red-700">
                  {isAr
                    ? 'إعادة ضبط كافة المعالم المزارة والذاكرة المؤقتة للبدء من جديد'
                    : 'Clear visited landmarks & reset storage to fresh state'}
                </span>
              </div>
              {resetConfirm ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onResetDemo();
                      setResetConfirm(false);
                      onClose();
                    }}
                    className="bg-red-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-xs hover:bg-red-800 transition cursor-pointer"
                  >
                    {isAr ? 'تأكيد' : 'Confirm'}
                  </button>
                  <button
                    onClick={() => setResetConfirm(false)}
                    className="bg-stone-200 text-stone-700 font-bold px-2 py-1.5 rounded-lg text-xs hover:bg-stone-300 transition cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setResetConfirm(true)}
                  className="border border-red-300 bg-white text-red-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-[#7A2E1D] hover:bg-[#622316] text-[#F6EEE1] font-bold py-2.5 rounded-xl shadow-md transition cursor-pointer mt-2"
          >
            {t.settingsCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
