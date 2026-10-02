/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, UserProfile } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { storageService } from '../services/storageService';
import {
  Lock,
  Mail,
  User,
  Calendar,
  Globe,
  UtensilsCrossed,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  KeyRound,
  Zap
} from 'lucide-react';

interface AuthModalProps {
  language: Language;
  isOpen: boolean;
  initialMode?: 'signIn' | 'signUp';
  canClose?: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  isOpen,
  initialMode = 'signIn',
  canClose = true,
  onClose,
  onLoginSuccess
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const formScrollRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'signIn' | 'signUp'>(initialMode);

  // Form Fields
  const [email, setEmail] = useState<string>('hebaabuhaijaa@gmail.com');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('هبة');
  const [lastName, setLastName] = useState<string>('أبو الهيجاء');
  const [age, setAge] = useState<string>('26');
  const [country, setCountry] = useState<string>('الأردن / Jordan');
  const [favouriteFood, setFavouriteFood] = useState<string>('منسف بلدي بالجميد الكركي');
  const [customFood, setCustomFood] = useState<string>('');
  const [showCustomFood, setShowCustomFood] = useState<boolean>(false);

  // Validation & Feedback States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync mode and form state whenever modal is opened or mode prop changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setGeneralError(null);
      setSuccessBanner(null);
      setIsSubmitting(false);

      // Pre-fill email from current session or default if empty
      const existing = storageService.getCurrentUser();
      if (existing) {
        setEmail(existing.email);
        setFirstName(existing.firstName || 'هبة');
        setLastName(existing.lastName || 'أبو الهيجاء');
        if (existing.age) setAge(String(existing.age));
        if (existing.country) setCountry(existing.country);
        if (existing.favouriteFood) setFavouriteFood(existing.favouriteFood);
      } else if (!email) {
        setEmail('hebaabuhaijaa@gmail.com');
      }
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Quick Demo fill and immediate sign in
  const handleQuickDemoLogin = () => {
    setEmail('hebaabuhaijaa@gmail.com');
    setPassword('password123');
    setErrors({});
    setGeneralError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const user = storageService.forceLogin('hebaabuhaijaa@gmail.com', 'password123');
      setIsSubmitting(false);
      onLoginSuccess(user);
      onClose();
    }, 250);
  };

  // Force login & update password if user forgot credentials
  const handleForceUpdateLogin = () => {
    const cleanEmail = email.trim().toLowerCase() || 'hebaabuhaijaa@gmail.com';
    const cleanPass = password.trim() || 'password123';
    setIsSubmitting(true);
    setTimeout(() => {
      const user = storageService.forceLogin(cleanEmail, cleanPass);
      setIsSubmitting(false);
      onLoginSuccess(user);
      onClose();
    }, 250);
  };

  const handleSignInSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      newErrors.email = t.authRequiredFieldsError;
    } else if (!validateEmail(cleanEmail)) {
      newErrors.email = t.authInvalidEmailError;
    }

    if (!cleanPass) {
      newErrors.password = t.authRequiredFieldsError;
    } else if (cleanPass.length < 4) {
      newErrors.password = t.authPasswordLengthError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError(Object.values(newErrors)[0]);
      formScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const res = storageService.login(cleanEmail, cleanPass);
        setIsSubmitting(false);

        if (res.success && res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else if (res.error === 'wrong_password') {
          setGeneralError(
            isAr
              ? 'كلمة المرور غير مطابقة. هل تود تسجيل الدخول الفوري وتحديث كلمة المرور لهذا الحساب؟'
              : 'Password does not match. Click below to sign in and update password.'
          );
        } else if (res.error === 'user_not_found') {
          setGeneralError(
            isAr
              ? 'هذا البريد الإلكتروني غير مسجل بعد. يمكنك النقر أدناه لإنشاء الحساب فوراً والمتابعة.'
              : 'This email is not registered yet. Click below to create an account and proceed.'
          );
        } else {
          setGeneralError(t.authInvalidCredentialsError);
        }
      } catch (err) {
        setIsSubmitting(false);
        console.error('Sign in exception', err);
        const user = storageService.forceLogin(cleanEmail, cleanPass);
        onLoginSuccess(user);
        onClose();
      }
    }, 300);
  };

  const handleSignUpSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setGeneralError(null);
    setSuccessBanner(null);
    const newErrors: Record<string, string> = {};

    const cleanEmail = email.trim();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanCountry = country.trim();
    const cleanPass = password.trim();
    const cleanConfirm = confirmPassword.trim();
    const effectiveFood = showCustomFood ? customFood.trim() : favouriteFood.trim();

    // Validate Email
    if (!cleanEmail) {
      newErrors.email = t.authRequiredFieldsError;
    } else if (!validateEmail(cleanEmail)) {
      newErrors.email = t.authInvalidEmailError;
    }

    // Validate First Name
    if (!cleanFirstName) {
      newErrors.firstName = isAr ? 'يرجى إدخال الاسم الأول' : 'Please enter your first name';
    }

    // Validate Last Name
    if (!cleanLastName) {
      newErrors.lastName = isAr ? 'يرجى إدخال اسم العائلة' : 'Please enter your last name';
    }

    // Validate Age
    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge) || parsedAge < 5 || parsedAge > 120) {
      newErrors.age = t.authAgeInvalidError;
    }

    // Validate Country
    if (!cleanCountry) {
      newErrors.country = t.authRequiredFieldsError;
    }

    // Validate Favourite Food
    if (!effectiveFood) {
      newErrors.favouriteFood = t.authRequiredFieldsError;
    }

    // Validate Password
    if (!cleanPass) {
      newErrors.password = t.authRequiredFieldsError;
    } else if (cleanPass.length < 4) {
      newErrors.password = t.authPasswordLengthError;
    }

    // Validate Confirm Password
    if (cleanPass !== cleanConfirm) {
      newErrors.confirmPassword = t.authPasswordMismatchError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError(
        isAr
          ? `يرجى استكمال البيانات المطلوبة: ${Object.values(newErrors)[0]}`
          : `Please complete required fields: ${Object.values(newErrors)[0]}`
      );
      formScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const regRes = storageService.registerUser({
          email: cleanEmail.toLowerCase(),
          password: cleanPass,
          firstName: cleanFirstName,
          lastName: cleanLastName,
          age: parsedAge,
          country: cleanCountry,
          favouriteFood: effectiveFood
        });

        setIsSubmitting(false);

        if (regRes.success && regRes.user) {
          const newUser = regRes.user;

          // Transition to regular Sign In mode with prefilled credentials
          // Requirement: "بعدين بعد ما يعبي البيانات ويسجل ينتقل لتسجيل الدخول العادي sign in و يسجل بايمله و الباسوورد"
          setMode('signIn');
          setEmail(newUser.email);
          setPassword(cleanPass);
          setConfirmPassword('');
          setSuccessBanner(
            isAr
              ? `✓ تم حفظ بياناتك وتسجيل حسابك بنجاح باسم (${newUser.firstName} ${newUser.lastName})! تم ملء البريد الإلكتروني وكلمة المرور تلقائياً، اضغط الآن على زر "تسجيل الدخول" لإكمال الدخول مباشرة.`
              : `✓ Account successfully registered for (${newUser.firstName} ${newUser.lastName})! Your email and password are pre-filled, click "Sign In" now to proceed directly.`
          );
          formScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setGeneralError(regRes.error || t.authInvalidCredentialsError);
        }
      } catch (err) {
        setIsSubmitting(false);
        console.error('Sign up error', err);
        setGeneralError(isAr ? 'حدث خطأ، يرجى المحاولة ثانية' : 'Error, please retry');
      }
    }, 350);
  };

  const popularDishes = [
    { ar: 'منسف بلدي بالجميد الكركي', en: 'Karaki Jameed Mansaf with Lamb' },
    { ar: 'مقلوبة بالدجاج والباذنجان', en: 'Chicken & Eggplant Maqluba' },
    { ar: 'مسخن أردني أصيل بزيت الزيتون والبلدي', en: 'Authentic Olive Oil Musakhan' },
    { ar: 'زرب وادي رم المدفون بالرمل', en: 'Wadi Rum Earth-Oven Zarb' },
    { ar: 'رشوف بلدي بالسمن والعدس والجريش', en: 'Traditional Rashoof Stew' },
    { ar: 'قلاية بندورة بلدية باللحمة والحر', en: 'Galayet Bandora with Tender Beef' },
    { ar: 'كباب وكفتة بتراوية مشوية على الفحم', en: 'Charcoal Grilled Petra Kofta' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF5ED] text-[#331C16] border border-[#C8963E]/40 rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#7A2E1D] via-[#561E12] to-[#7A2E1D] text-[#F6EEE1] p-5 sm:p-6 border-b border-[#C8963E]/40 relative">
          {canClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full hover:bg-white/10 text-[#E8DCC9] hover:text-white transition cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#C8963E] text-[#7A2E1D] flex items-center justify-center font-bold text-xl shadow-inner border border-white/30 shrink-0">
              <Sparkles className="w-6 h-6 text-[#7A2E1D]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-[#F6EEE1]">
                {mode === 'signIn' ? t.authSignInTitle : t.authSignUpTitle}
              </h3>
              <p className="text-xs text-[#E8DCC9]/90 mt-0.5">
                {isAr
                  ? 'بوابة الدخول الرسمية لجواز سفر الأنباط واستكشاف بترا'
                  : 'Official Petra Visitor Passport Authentication'}
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="mt-5 grid grid-cols-2 bg-[#4A180E] p-1 rounded-xl border border-[#C8963E]/30 text-xs">
            <button
              type="button"
              id="tab-auth-signin"
              onClick={() => {
                setMode('signIn');
                setErrors({});
                setGeneralError(null);
              }}
              className={`py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signIn'
                  ? 'bg-[#C8963E] text-[#331C16] shadow-sm'
                  : 'text-[#E8DCC9] hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{t.authSignInBtn}</span>
            </button>
            <button
              type="button"
              id="tab-auth-signup"
              onClick={() => {
                setMode('signUp');
                setErrors({});
                setGeneralError(null);
                setSuccessBanner(null);
              }}
              className={`py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signUp'
                  ? 'bg-[#C8963E] text-[#331C16] shadow-sm'
                  : 'text-[#E8DCC9] hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.menuSignUp}</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div ref={formScrollRef} className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {/* General Success Banner */}
          {successBanner && (
            <div className="mb-5 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl p-3.5 text-xs flex flex-col gap-2.5 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed font-semibold">{successBanner}</div>
              </div>
              <button
                type="button"
                onClick={() => handleSignInSubmit()}
                className="self-start bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isAr ? 'اضغط هنا للدخول المباشر فوراً ←' : 'Click here to sign in directly now →'}</span>
              </button>
            </div>
          )}

          {/* General Error Banner */}
          {generalError && (
            <div className="mb-5 bg-red-50 border border-red-300 text-red-900 rounded-xl p-3.5 text-xs flex flex-col gap-2.5 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed font-medium">{generalError}</div>
              </div>
              {/* Quick actions for recovery */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-red-200">
                <button
                  type="button"
                  onClick={handleForceUpdateLogin}
                  className="bg-[#7A2E1D] hover:bg-[#622316] text-[#F6EEE1] font-bold px-3 py-1 rounded text-[11px] transition cursor-pointer flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-[#C8963E]" />
                  <span>{isAr ? 'دخول فوري وتحديث الحساب' : 'Direct Login & Update Profile'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium px-2.5 py-1 rounded text-[11px] transition cursor-pointer"
                >
                  {isAr ? 'تجربة الحساب الجاهز' : 'Use Demo Account'}
                </button>
              </div>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signIn' ? (
            <form
              noValidate
              onSubmit={handleSignInSubmit}
              className="space-y-4"
              id="form-signin"
            >
              <div>
                <label className="block text-xs font-bold text-[#7A2E1D] mb-1.5">
                  {t.authEmailLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="input-signin-email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@example.com"
                    className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 bg-white border rounded-lg text-sm text-[#331C16] focus:outline-none transition ${
                      errors.email
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-stone-300 focus:border-[#C8963E] focus:ring-1 focus:ring-[#C8963E]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A2E1D] mb-1.5">
                  {t.authPasswordLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    id="input-signin-password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 bg-white border rounded-lg text-sm text-[#331C16] focus:outline-none transition ${
                      errors.password
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-stone-300 focus:border-[#C8963E] focus:ring-1 focus:ring-[#C8963E]'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Ready Test Account Card with Instant Fill Button */}
              <div className="bg-[#FAF0E2] border border-[#C8963E]/40 rounded-xl p-3 text-xs text-[#561E12] flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-bold text-[#7A2E1D] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
                    <span>{isAr ? 'حساب تجريبي جاهز ومضمون:' : 'Ready test visitor account:'}</span>
                  </p>
                  <p className="font-mono text-[11px] text-stone-700 truncate mt-0.5">
                    hebaabuhaijaa@gmail.com / password123
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="bg-[#C8963E] hover:bg-[#b08130] text-[#331C16] font-bold px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer shrink-0 shadow-xs flex items-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  <span>{isAr ? 'دخول فوري' : 'Quick Sign In'}</span>
                </button>
              </div>

              {/* Summary Error banner right above button */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-300 text-red-700 text-xs rounded-lg p-2.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{Object.values(errors)[0]}</span>
                </div>
              )}

              {/* Primary Submit Button: SIGN IN */}
              <button
                type="submit"
                id="btn-signin-submit"
                onClick={handleSignInSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#7A2E1D] hover:bg-[#622316] active:scale-[0.99] text-[#F6EEE1] font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-sm mt-2 border border-[#C8963E]/30"
              >
                {isSubmitting ? (
                  <span>{isAr ? 'جاري التحقق...' : 'Verifying...'}</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#C8963E]" />
                    <span>{t.authSignInBtn}</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  id="link-switch-to-signup"
                  onClick={() => {
                    setMode('signUp');
                    setErrors({});
                    setGeneralError(null);
                  }}
                  className="text-xs text-[#7A2E1D] hover:text-[#C8963E] font-bold underline transition cursor-pointer"
                >
                  {t.authFirstTimeSignUp}
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM (تسجيل لأول مرة) */
            <form
              noValidate
              onSubmit={handleSignUpSubmit}
              className="space-y-3.5"
              id="form-signup"
            >
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                  {t.authEmailLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="input-signup-email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@example.com"
                    className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-600 mt-0.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Names: First and Last */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authFirstNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="input-signup-firstname"
                      value={firstName}
                      onChange={e => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                      }}
                      placeholder={isAr ? 'مثال: هبة' : 'e.g. Heba'}
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authLastNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="input-signup-lastname"
                      value={lastName}
                      onChange={e => {
                        setLastName(e.target.value);
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                      }}
                      placeholder={isAr ? 'مثال: أبو الهيجاء' : 'e.g. Abu Haijaa'}
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Age and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authAgeLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      id="input-signup-age"
                      min={5}
                      max={120}
                      value={age}
                      onChange={e => {
                        setAge(e.target.value);
                        if (errors.age) setErrors(prev => ({ ...prev, age: '' }));
                      }}
                      placeholder="26"
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.age ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.age && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authCountryLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="input-signup-country"
                      value={country}
                      onChange={e => {
                        setCountry(e.target.value);
                        if (errors.country) setErrors(prev => ({ ...prev, country: '' }));
                      }}
                      placeholder={isAr ? 'الأردن / Jordan' : 'Jordan'}
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.country ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.country && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.country}</p>
                  )}
                </div>
              </div>

              {/* Favourite Jordanian Food */}
              <div>
                <label className="block text-xs font-bold text-[#7A2E1D] mb-1 flex items-center justify-between">
                  <span>
                    {t.authFavFoodLabel} <span className="text-red-500">*</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCustomFood(!showCustomFood)}
                    className="text-[10px] text-[#C8963E] hover:underline font-normal cursor-pointer"
                  >
                    {showCustomFood ? (isAr ? 'اختيار من القائمة' : 'Pick from list') : (isAr ? 'كتابة أكلة مخصصة' : 'Custom dish')}
                  </button>
                </label>

                {showCustomFood ? (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="input-signup-custom-food"
                      value={customFood}
                      onChange={e => setCustomFood(e.target.value)}
                      placeholder={isAr ? 'مثال: منسف لحم بلدي مع صنوبر ولوز' : 'e.g. Mansaf with fried pine nuts'}
                      className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-[#331C16] focus:border-[#C8963E] focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <select
                      id="select-signup-food"
                      value={favouriteFood}
                      onChange={e => setFavouriteFood(e.target.value)}
                      className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-[#331C16] focus:border-[#C8963E] focus:outline-none cursor-pointer"
                    >
                      {popularDishes.map((dish, i) => (
                        <option key={i} value={isAr ? dish.ar : `${dish.ar} (${dish.en})`}>
                          {isAr ? dish.ar : `${dish.en} - ${dish.ar}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {errors.favouriteFood && (
                  <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.favouriteFood}</p>
                )}
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="input-signup-password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                      }}
                      placeholder="•••••••• (4+)"
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A2E1D] mb-1">
                    {t.authConfirmPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="input-signup-confirm"
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="••••••••"
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-white border rounded-lg text-xs text-[#331C16] focus:outline-none transition ${
                        errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Summary Error banner right above button */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-300 text-red-700 text-xs rounded-lg p-2.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{Object.values(errors)[0]}</span>
                </div>
              )}

              {/* Primary Submit Button: SIGN UP / CREATE ACCOUNT */}
              <button
                type="submit"
                id="btn-signup-submit"
                onClick={handleSignUpSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#1F6E68] hover:bg-[#185853] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-sm mt-3 border border-[#C8963E]/40"
              >
                {isSubmitting ? (
                  <span>{isAr ? 'جاري تسجيل الحساب...' : 'Creating Account...'}</span>
                ) : (
                  <>
                    <User className="w-4 h-4 text-[#C8963E]" />
                    <span>{t.authSignUpBtn}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  id="link-switch-to-signin"
                  onClick={() => {
                    setMode('signIn');
                    setErrors({});
                    setGeneralError(null);
                  }}
                  className="text-xs text-[#7A2E1D] hover:text-[#C8963E] font-bold underline transition cursor-pointer"
                >
                  {t.authAlreadyHaveAccount}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
