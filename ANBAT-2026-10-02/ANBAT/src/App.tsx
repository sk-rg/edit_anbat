/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, VisitorGuideBadge, KnowledgeEntry, Landmark, UserProfile, CartItem } from './types';
import { storageService } from './services/storageService';
import { LANDMARKS } from './data/landmarks';
import { Header } from './components/Header';
import { SatchelSection } from './components/SatchelSection';
import { PetraMap } from './components/PetraMap';
import { ChatGuide } from './components/ChatGuide';
import { PassportSection } from './components/PassportSection';
import { AdminConsole } from './components/AdminConsole';
import { LandmarkStoryModal } from './components/LandmarkStoryModal';
import { FooterProgress } from './components/FooterProgress';
import { AuthModal } from './components/AuthModal';
import { ComplaintsModal } from './components/ComplaintsModal';
import { SettingsModal } from './components/SettingsModal';
import { SouvenirShop } from './components/SouvenirShop';
import { CompanionRevealSection } from './components/CompanionRevealSection';
import { VisitPlannerSection } from './components/VisitPlannerSection';
import { initializeConditionChain, resetConditionLogs } from './services/hashChainService';
import {
  Compass,
  Shield,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Heart,
  Camera,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'visitor' | 'admin' | 'souq'>('visitor');
  const [activeStep, setActiveStep] = useState<number>(0);
  // Souvenir shop cart, shared between the shop and the header cart button
  const [souqCart, setSouqCart] = useState<CartItem[]>([]);
  const [isSouqCartOpen, setIsSouqCartOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');
  const [visitedLandmarks, setVisitedLandmarks] = useState<string[]>([]);
  const [activeBadge, setActiveBadge] = useState<VisitorGuideBadge | null>(null);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string>('');
  const [scannerRequested, setScannerRequested] = useState<number>(0);
  const [storyModalLandmark, setStoryModalLandmark] = useState<Landmark | null>(null);

  const handleOpenQrScanner = () => {
    setCurrentView('visitor');
    setActiveStep(3);
    setScannerRequested(prev => prev + 1);
    setTimeout(() => {
      const el = document.getElementById('step-3-petra-map');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Auth, Complaints & Settings State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => storageService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signIn' | 'signUp'>('signIn');
  const [isComplaintsModalOpen, setIsComplaintsModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);


  // Initialize storage state
  useEffect(() => {
    const savedLang = storageService.getLanguage();
    setLanguage(savedLang);
    document.documentElement.setAttribute('lang', savedLang);
    document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

    const savedVisited = storageService.getVisitedLandmarks();
    setVisitedLandmarks(savedVisited);

    const savedBadge = storageService.getVisitorBadge();
    setActiveBadge(savedBadge);

    // Boot condition ledger
    initializeConditionChain();

    // Check URL parameters for direct step linking
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const viewParam = params.get('view');
        const stepParam = params.get('step');
        if (viewParam === 'passport' || stepParam === '5' || stepParam === 'passport') {
          setActiveStep(5);
          setCurrentView('visitor');
        } else if (viewParam === 'chat' || stepParam === '4') {
          setActiveStep(4);
          setCurrentView('visitor');
        } else if (viewParam === 'map' || stepParam === '3') {
          setActiveStep(3);
          setCurrentView('visitor');
        } else if (viewParam === 'companion' || stepParam === '2') {
          setActiveStep(2);
          setCurrentView('visitor');
        } else if (viewParam === 'satchel' || stepParam === '1') {
          setActiveStep(1);
          setCurrentView('visitor');
        } else if (viewParam === 'souq' || viewParam === 'market' || viewParam === 'shop') {
          setCurrentView('souq');
        }
      } catch {
        // Ignore URL parsing errors
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    storageService.saveLanguage(newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const handleToggleVisitedLandmark = (landmarkId: string) => {
    const updated = storageService.toggleVisitedLandmark(landmarkId);
    setVisitedLandmarks(updated);
    if (updated.includes(landmarkId)) {
      showToast(language === 'ar' ? 'تم تسجيل زيارة المعلم!' : 'Landmark marked as visited!');
    }
  };

  // Demo Fast Track: Mark all 5 landmarks visited
  const handleJumpAllLandmarks = () => {
    const allIds = LANDMARKS.map(l => l.id);
    storageService.saveVisitedLandmarks(allIds);
    setVisitedLandmarks(allIds);
    showToast(
      language === 'ar'
        ? 'تم وسم كافة معالم بترا الـ 5 بالزيارة! الوعل النوبي الأسطوري متاح الآن في الحقيبة!'
        : 'All 5 landmarks visited! Legendary Nubian Ibex unlocked in Satchel!'
    );
  };

  // Reset entire demo data
  const handleResetDemo = async () => {
    storageService.clearAll();
    await resetConditionLogs();
    setVisitedLandmarks([]);
    setActiveBadge(null);
    setActiveStep(1);
    showToast(language === 'ar' ? 'تمت إعادة ضبط بيانات العرض بنجاح.' : 'Demo data restored to initial state.');
  };

  // Handle physical QR check-in
  const handleQrCheckInSuccess = (landmark: Landmark) => {
    const updated = storageService.markLandmarkVisited(landmark.id);
    setVisitedLandmarks(updated);

    if (updated.length === LANDMARKS.length) {
      showToast(
        language === 'ar'
          ? `✓ تم التحقق ميدانياً من ${landmark.nameAr}! كافة المعالم الـ 5 مكتملة، وتم فك قفل الوعل الأسطوري!`
          : `✓ Physical check-in verified at ${landmark.nameEn}! All 5 monuments visited – Legendary Ibex unlocked!`
      );
    } else {
      showToast(
        language === 'ar'
          ? `✓ تم تسجيل وصولك الميداني إلى: ${landmark.nameAr} (${updated.length}/5)`
          : `✓ Physical check-in verified at ${landmark.nameEn}! (${updated.length}/5)`
      );
    }
  };

  // Ask about landmark
  const handleAskAboutLandmark = (query: string) => {
    setChatInitialQuestion(query);
    setCurrentView('visitor');
    setActiveStep(4); // Chat step is now step 4
  };

  // Auth Handlers
  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    setIsAuthModalOpen(false);
    showToast(
      language === 'ar'
        ? '✓ تم تسجيل الخروج بنجاح من الحساب. أنت الآن في وضع الزائر العام.'
        : '✓ Logged out successfully. You are now browsing as a guest.'
    );
  };

  const handleOpenAuth = (mode: 'signIn' | 'signUp' = 'signIn') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    storageService.saveCurrentUser(user);
    showToast(
      language === 'ar'
        ? `مرحباً بك يا ${user.firstName}! تم ربط بياناتك بجواز السفر.`
        : `Welcome back, ${user.firstName}! Passport profile updated.`
    );
  };

  const isAr = language === 'ar';

  return (
    <div
      className="min-h-screen bg-[#F6EEE1] text-[#331C16] flex flex-col font-sans"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#7A2E1D] text-[#F6EEE1] border border-[#C8963E] px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#C8963E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {currentView === 'souq' ? (
        <SouvenirShop
          language={language}
          visitedCount={visitedLandmarks.length}
          totalLandmarks={LANDMARKS.length}
          collectedStampsCount={1}
          onNavigateTab={tab => {
            if (tab === 'souq') {
              setCurrentView('souq');
            } else if (tab === 'passport') {
              setCurrentView('visitor');
              setActiveStep(5);
            } else if (tab === 'map') {
              setCurrentView('visitor');
              setActiveStep(3);
            } else if (tab === 'satchel') {
              setCurrentView('visitor');
              setActiveStep(1);
            } else if (tab === 'chat') {
              setCurrentView('visitor');
              setActiveStep(4);
            }
          }}
          onOpenQrScanner={handleOpenQrScanner}
          cart={souqCart}
          onCartChange={setSouqCart}
          isCartOpen={isSouqCartOpen}
          onCartOpenChange={setIsSouqCartOpen}
        />
      ) : (
        <>
          {/* Main Top Header */}
          <Header
            currentView={currentView}
            onViewChange={setCurrentView}
            activeStep={activeStep}
            onStepSelect={step => {
              setCurrentView('visitor');
              setActiveStep(step);
            }}
            language={language}
            onLanguageChange={handleLanguageChange}
            visitedCount={visitedLandmarks.length}
            totalLandmarks={LANDMARKS.length}
            onJumpAllLandmarks={handleJumpAllLandmarks}
            onResetDemo={handleResetDemo}
            onOpenQrScanner={handleOpenQrScanner}
            currentUser={currentUser}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onOpenComplaints={() => setIsComplaintsModalOpen(true)}
            onLogout={handleLogout}
            onOpenAuth={mode => handleOpenAuth(mode || 'signIn')}
            userPoints={170 + visitedLandmarks.length * 50}
            collectedStampsCount={activeBadge ? 1 : 0}
            cartTotalUsd={souqCart.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0)}
            cartTotalItems={souqCart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => {
              setCurrentView('visitor');
              setActiveStep(2);
              setIsSouqCartOpen(true);
            }}
          />

          {/* Main Viewport Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
            {/* View Switch Router */}
            {currentView === 'admin' ? (
              <AdminConsole
                language={language}
                onBackToVisitor={() => setCurrentView('visitor')}
                onQuestionResolved={entry => {
                  showToast(
                    language === 'ar'
                      ? `تمت إضافة "${entry.titleAr}" إلى قاعدة المعرفة!`
                      : `Added "${entry.titleEn}" to knowledge base!`
                  );
                }}
              />
            ) : (
              /* Visitor 5-Step Flow Router */
              <div>
                {/* Step 1: جعبة المستكشف (استدعاء التمائم والدليل) */}
                {activeStep === 1 && (
                  <SatchelSection
                    language={language}
                    visitedLandmarks={visitedLandmarks}
                    activeBadge={activeBadge}
                    currentStep={1}
                    onBadgeCreated={badge => {
                      setActiveBadge(badge);
                      showToast(
                        language === 'ar'
                          ? '✓ تم استدعاء الدليل النبطي بنجاح!'
                          : '✓ Companion guide summoned successfully!'
                      );
                    }}
                    onProceedToCompanion={() => setActiveStep(2)}
                    onProceedToMap={() => setActiveStep(3)}
                    onProceedToChat={() => setActiveStep(4)}
                  />
                )}

                {/* Step 2: سوق الحرف والتحف البتراوية (Petra Souq / Crafts Market) */}
                {activeStep === 2 && (
                  <div id="step-2-petra-souq" className="py-2">
                    <SouvenirShop
                      language={language}
                      visitedCount={visitedLandmarks.length}
                      totalLandmarks={LANDMARKS.length}
                      collectedStampsCount={activeBadge ? 1 : 0}
                      userPoints={170 + visitedLandmarks.length * 50}
                      isEmbedded={true}
                      onNavigateTab={tab => {
                        if (tab === 'passport') {
                          setActiveStep(5);
                        } else if (tab === 'map') {
                          setActiveStep(3);
                        } else if (tab === 'satchel') {
                          setActiveStep(1);
                        } else if (tab === 'chat') {
                          setActiveStep(4);
                        }
                      }}
                      onOpenQrScanner={handleOpenQrScanner}
                      cart={souqCart}
                      onCartChange={setSouqCart}
                      isCartOpen={isSouqCartOpen}
                      onCartOpenChange={setIsSouqCartOpen}
                    />
                  </div>
                )}

                {/* Step 3: خريطة بترا (Explore Map) */}
                {activeStep === 3 && (
                  <div id="step-3-petra-map">
                    <PetraMap
                      language={language}
                      visitedLandmarks={visitedLandmarks}
                      onToggleVisited={handleToggleVisitedLandmark}
                      onAskAboutLandmark={handleAskAboutLandmark}
                      onOpenSatchelForLegendary={() => setActiveStep(1)}
                      onOpenQrScanner={handleOpenQrScanner}
                      scannerRequested={scannerRequested}
                    />
                  </div>
                )}

                {/* Step 4: سؤال الدليل (Ask Guide) */}
                {activeStep === 4 && (
                  <ChatGuide
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    activeBadge={activeBadge}
                    initialQuestion={chatInitialQuestion}
                    onOpenSatchel={() => setActiveStep(1)}
                    onOpenAdmin={() => setCurrentView('admin')}
                  />
                )}

                {/* Step 5: جواز السفر والمشاركة (Collect & Share) */}
                {activeStep === 5 && (
                  <PassportSection
                    language={language}
                    activeBadge={activeBadge}
                    visitedLandmarks={visitedLandmarks}
                    currentUser={currentUser}
                    onOpenSatchel={() => setActiveStep(1)}
                    onExploreMap={() => setActiveStep(3)}
                    onAskGuide={() => setActiveStep(4)}
                    onCheckInLandmark={handleQrCheckInSuccess}
                    onLogout={handleLogout}
                    onOpenAuth={mode => handleOpenAuth(mode || 'signIn')}
                  />
                )}

                {/* Step 0: خطط لزيارتك (Plan Your Visit: tickets, hotels, transport, tour companies) */}
                {activeStep === 0 && <VisitPlannerSection language={language} />}
              </div>
            )}
          </main>

          {/* Footer with Visual Step Progress Tracker */}
          <footer className="mt-10">
            <FooterProgress
              language={language}
              activeStep={activeStep}
              onStepSelect={step => {
                setCurrentView('visitor');
                setActiveStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <div className="bg-[#7A2E1D] text-[#F6EEE1] border-t border-[#C8963E]/40 py-6">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-[#C8963E]">
                    ANBAT • أنباط
                  </span>
                  <span className="text-[#E8DCC9]/70">|</span>
                  <span className="text-[#E8DCC9]">
                    {isAr ? 'رفيقك النبطي لمدينة بترا الأثرية' : 'Your Nabataean Companion to Petra'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[#E8DCC9]/90">
                  <button
                    onClick={() => setCurrentView('souq')}
                    className="hover:text-[#C8963E] transition flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'سوق الأنباط' : 'Souq'}</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="hover:text-[#C8963E] transition flex items-center gap-1 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isAr ? 'لوحة المشرف (admin123)' : 'Admin Console (admin123)'}</span>
                  </button>
                  <span>•</span>
                  <span className="font-mono text-[#C8963E]">#ANBAT_Petra</span>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Landmark Story Modal */}
      {storyModalLandmark && (
        <LandmarkStoryModal
          landmark={storyModalLandmark}
          language={language}
          isVisited={visitedLandmarks.includes(storyModalLandmark.id)}
          onToggleVisited={(landmarkId: string) => handleToggleVisitedLandmark(landmarkId)}
          onClose={() => setStoryModalLandmark(null)}
          onAskAboutLandmark={(query: string) => {
            setStoryModalLandmark(null);
            handleAskAboutLandmark(query);
          }}
        />
      )}

      {/* Auth Modal (Sign In & First Time Sign Up) */}
      <AuthModal
        language={language}
        isOpen={isAuthModalOpen}
        initialMode={authInitialMode}
        canClose={true}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Complaints & Suggestions Portal Modal */}
      <ComplaintsModal
        language={language}
        currentUser={currentUser}
        isOpen={isComplaintsModalOpen}
        onClose={() => setIsComplaintsModalOpen(false)}
      />

      {/* System & Application Settings Modal */}
      <SettingsModal
        language={language}
        onLanguageChange={handleLanguageChange}
        currentUser={currentUser}
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onResetDemo={handleResetDemo}
        onOpenAuth={mode => handleOpenAuth(mode || 'signIn')}
        onLogout={handleLogout}
      />
    </div>
  );
}

