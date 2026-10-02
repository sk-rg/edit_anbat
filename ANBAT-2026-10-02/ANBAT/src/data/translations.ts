/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'rtl' | 'ltr';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇯🇴', dir: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
];

export interface TranslationStrings {
  // Navigation & Header
  cleanMapNotice: string;
  fitValley: string;
  deselect: string;
  onMap: string;
  pinOnMap: string;
  readStory: string;
  visitedBadge: string;
  markVisited: string;
  visitedStatus: string;
  startSiqGate: string;
  liveGps: string;
  terrain: string;
  satellite: string;
  roadmap: string;
  searchPlaceholder: string;
  tabMonuments: string;
  tabServices: string;
  filterAll: string;
  filterVisited: string;
  filterRemaining: string;
  svcRestrooms: string;
  svcMedical: string;
  svcCafes: string;
  fieldFacility: string;
  authorizedFacility: string;
  selectPrompt: string;
  awayBadge: string;
  walkMinutes: string;
  walkHours: string;
  lessThanMin: string;
  metersUnit: string;
  kmUnit: string;
  // Additional comprehensive UI labels
  brandSubtitle: string;
  visitorPortal: string;
  adminPortal: string;
  scanQr: string;
  architecture: string;
  demoLabel: string;
  demoJumpAll: string;
  demoReset: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step5Title: string;
  step0Title: string;
  prevBtn: string;
  nextBtn: string;
  journeyProgress: string;
  completionLabel: string;
  stepOfFive: string;
  routeStopOf: string;
  notVisitedYet: string;
  landmarkVisited: string;
  storyChronicle: string;
  listenAudio: string;
  askGuideAboutThis: string;
  closeBtn: string;
  viewDistance: string;
  interactiveMapTitle: string;
  interactiveMapSubtitle: string;
  allVisitedNotice: string;
  passportTitle: string;
  passportSubtitle: string;
  sharePassport: string;
  satchelIntroStep1: string;
  satchelIntroStep2: string;
  legendaryUnlocked: string;
  legendaryLocked: string;
  explainableParams: string;
  startingLandmarkLabel: string;
  startingLandmarkHint: string;
  timeOfDayLabel: string;
  morning: string;
  afternoon: string;
  duskNight: string;
  openSatchelBtn: string;
  openingSatchel: string;
  satchelSealedTitle: string;
  satchelSealedDesc: string;
  guideNameLabel: string;
  guideNamePlaceholder: string;
  copyShareText: string;
  copied: string;
  downloadBadge: string;
  generating: string;
  nextExploreMap: string;
  askGuideBtn: string;
  companionGuideBadge: string;
  chatWelcomeMsg: string;
  chatGroundingLive: string;
  chatOpenSatchelFirst: string;
  chatGroundingBanner: string;
  chatViewSiteQueue: string;
  chatGoogleSearchFor: string;
  chatWebCitations: string;
  chatArchives: string;
  chatQueuedAdmin: string;
  chatAnswerInAdmin: string;
  chatExploreWithGuide: string;
  chatTabAll: string;
  chatTabLogistics: string;
  chatTabMonuments: string;
  chatTabHydraulics: string;
  chatInputPlaceholder: string;
  chatAskBtn: string;
  chatGroundingFooter: string;
  chatEmptyPromptWarning: string;
  chatQueuedSuccessNotice: string;
  chatErrorFailedToSend: string;
  chatCheckingArchives: string;
  chatListen: string;
  chatStop: string;
  chatCopy: string;

  // Top bar menu, auth, settings & complaints
  topMenuTitle: string;
  menuLanguage: string;
  menuScanQr: string;
  menuSettings: string;
  menuComplaints: string;
  menuLogout: string;
  menuSignIn: string;
  menuSignUp: string;
  menuProfile: string;

  authSignInTitle: string;
  authSignUpTitle: string;
  authEmailLabel: string;
  authPasswordLabel: string;
  authConfirmPasswordLabel: string;
  authFirstNameLabel: string;
  authLastNameLabel: string;
  authAgeLabel: string;
  authCountryLabel: string;
  authFavFoodLabel: string;
  authSignInBtn: string;
  authSignUpBtn: string;
  authLogoutSuccess: string;
  authAlreadyHaveAccount: string;
  authFirstTimeSignUp: string;
  authSignUpSuccessRedirect: string;
  authInvalidEmailError: string;
  authPasswordLengthError: string;
  authPasswordMismatchError: string;
  authRequiredFieldsError: string;
  authInvalidCredentialsError: string;
  authAgeInvalidError: string;

  complaintsTitle: string;
  complaintsSubtitle: string;
  complaintsNameLabel: string;
  complaintsEmailLabel: string;
  complaintsCategoryLabel: string;
  complaintsSubjectLabel: string;
  complaintsDetailsLabel: string;
  complaintsSubmitBtn: string;
  complaintsSuccessMsg: string;
  complaintsTicketLabel: string;
  complaintsCloseBtn: string;

  settingsTitle: string;
  settingsSoundEffects: string;
  settingsOfflineMode: string;
  settingsUserData: string;
  settingsCloseBtn: string;
}

export const UI_TRANSLATIONS: Record<Language, TranslationStrings> = {
  ar: {
    cleanMapNotice: 'خريطة نظيفة: انقر على أي بطاقة لعرض موقعها وحساب المسافة الواقعية إليها',
    fitValley: 'كامل الوادي',
    deselect: 'إلغاء التحديد',
    onMap: 'محدد على الخريطة',
    pinOnMap: 'تحديد بالخريطة',
    readStory: 'الرواية',
    visitedBadge: 'تمت الزيارة',
    markVisited: 'تسجيل الزيارة',
    visitedStatus: 'مزار ✓',
    startSiqGate: '📍 مدخل السيق',
    liveGps: '🛰️ GPS الميداني',
    terrain: '⛰️ تضاريس',
    satellite: '🛰️ أقمار',
    roadmap: '🗺️ شوارع',
    searchPlaceholder: 'بحث...',
    tabMonuments: 'المواقع الأثرية (17)',
    tabServices: 'الحمامات والخدمات (13)',
    filterAll: 'الكل',
    filterVisited: 'مزارة',
    filterRemaining: 'متبقية',
    svcRestrooms: 'حمامات 🚻',
    svcMedical: 'إسعاف 🚑',
    svcCafes: 'استراحات ☕',
    fieldFacility: 'مرفق ميداني معتمد',
    authorizedFacility: 'نقطة خدمة رسمية',
    selectPrompt: 'انقر لتحديده على الخريطة',
    awayBadge: 'يبعد عنك',
    walkMinutes: 'دقائق مشياً',
    walkHours: 'ساعة مشياً',
    lessThanMin: 'أقل من دقيقة',
    metersUnit: 'م',
    kmUnit: 'كم',
    brandSubtitle: 'رفيقك النبطي الذكي لمدينة بترا الأثرية',
    visitorPortal: 'بوابة الزائر',
    adminPortal: 'لوحة إدارة الموقع',
    scanQr: 'مسح QR',
    architecture: 'المخطط الهندسي',
    demoLabel: 'عرض تجريبي:',
    demoJumpAll: 'وسم الكل بالزيارة',
    demoReset: 'إعادة ضبط',
    step1Title: 'جعبة المستكشف',
    step2Title: 'سوق الحرف والتحف البتراوية',
    step3Title: 'خريطة بترا',
    step4Title: 'سؤال الدليل',
    step5Title: 'الجواز والمشاركة',
    step0Title: 'خطط لزيارتك',
    prevBtn: 'السابق',
    nextBtn: 'التالي',
    journeyProgress: 'مسار الرحلة الاستكشافية:',
    completionLabel: 'نسبة الإنجاز:',
    stepOfFive: 'الخطوة {step} من 5',
    routeStopOf: 'المحطة رقم {order} من 5',
    notVisitedYet: 'غير مزار بعد',
    landmarkVisited: '✓ تمت الزيارة',
    storyChronicle: 'الرواية والتوثيق الأثري',
    listenAudio: 'الاستماع إلى السرد الصوتي',
    askGuideAboutThis: 'اسأل الدليل عن هذا المعلم',
    closeBtn: 'إغلاق',
    viewDistance: 'عرض المسافة',
    interactiveMapTitle: 'خريطة مسار بترا التفاعلية',
    interactiveMapSubtitle: 'انقر على أي معلم صخري على المسار الحقيقي للاطلاع على روايته التاريخية وتسجيل زيارتك',
    allVisitedNotice: 'اكتملت جميع معالم بترا بنجاح!',
    passportTitle: 'جواز السفر الأثري التفاعلي الذكي',
    passportSubtitle: 'دفتر تفاعلي ثلاثي الأبعاد بطابع أردني نبطي أصيل: صفحة الهوية، شريط الترابط، وسجل أختام المعالم الميدانية.',
    sharePassport: 'مشاركة رابط جواز سفر الأنباط',
    satchelIntroStep1: 'تعتمد خوارزمية الاستدعاء على: معلم البداية + وقت اليوم + نسبة الندرة. (الوعل الملكي الأسطوري يُفتح فقط عند زيارة كافة المعالم الـ 5).',
    satchelIntroStep2: 'ملف المرشد الأثري الخاص بك، سماته الأثرية، وشارة جواز بترا الرقمية القابلة للتنزيل والمشاركة.',
    legendaryUnlocked: 'الوعل الأسطوري مُتاح الآن! (5/5 معالم)',
    legendaryLocked: 'الوعل الأسطوري مقفل ({count}/5 معالم)',
    explainableParams: 'مدخلات الخوارزمية التفسيرية',
    startingLandmarkLabel: 'معلم البداية المختار:',
    startingLandmarkHint: 'يمنح وزناً لموطن المخلوق المفضل في بترا',
    timeOfDayLabel: 'وقت الزيارة:',
    morning: 'صباح',
    afternoon: 'ظهيرة',
    duskNight: 'غروب / ليل',
    openSatchelBtn: 'افتح الحقيبة واستدعِ الدليل',
    openingSatchel: 'جاري فتح الحقيبة واستدعاء الدليل...',
    satchelSealedTitle: 'الحقيبة النبطية بانتظار الفتح',
    satchelSealedDesc: 'اختر معلماتك في اللوحة المجاورة ثم انقر على "افتح الحقيبة" لاستدعاء رفيقك الأثري وكشف شارة جواز بترا الخاصة بك.',
    guideNameLabel: 'اسم دليلك:',
    guideNamePlaceholder: 'اختر اسماً مخصصاً لدليلك...',
    copyShareText: 'نسخ نص المشاركة',
    copied: 'تم النسخ!',
    downloadBadge: 'تحميل الشارة كصورة',
    generating: 'جاري التحميل...',
    nextExploreMap: 'التالي: خريطة بترا ←',
    askGuideBtn: 'اسأل الدليل 💬',
    companionGuideBadge: 'رفيق أثري',
    chatWelcomeMsg: 'أهلاً بك يا رحالة بترا! أنا دليلك النبطي {guideName}. يمكنك سؤالي عن آثار بترا، أو هندسة السدود والقنوات، أو أوقات الزيارة الحالية وتذاكر الدخول، أو الطقس وفعالية البترا ليلاً. إجاباتي معززة ببحث Google المباشر والسجلات الأثرية المحققة.',
    chatGroundingLive: 'مدعوم ببحث Google المباشر (Search Grounded)',
    chatOpenSatchelFirst: 'افتح الحقيبة أولاً 🎒',
    chatGroundingBanner: 'ضمان الدقة والأمان: يستند دليلك إلى السجلات الأثرية النبطية المعتمدة ونتائج بحث Google اللحظية للأسعار ومواعيد الزيارة والطقس.',
    chatViewSiteQueue: 'عرض طابور تدقيق الموقع ←',
    chatGoogleSearchFor: 'تم البحث في Google عن:',
    chatWebCitations: 'مصادر الويب الموثقة (Google Search):',
    chatArchives: 'السجلات الأثرية:',
    chatQueuedAdmin: 'مُدرج تلقائياً في طابور مراجعة إدارة الموقع',
    chatAnswerInAdmin: 'افتح لوحة الإدارة لإجابة السؤال',
    chatExploreWithGuide: 'استكشف مع الدليل:',
    chatTabAll: 'الكل',
    chatTabLogistics: 'مواعيد وتذاكر 🕒',
    chatTabMonuments: 'الآثار 🏛️',
    chatTabHydraulics: 'الهندسة 💧',
    chatInputPlaceholder: 'اسأل {guideName} (مثال: كم تذكرة الدخول؟ أو كيف حفر الأنباط الخزنة؟)...',
    chatAskBtn: 'إرسال',
    chatGroundingFooter: 'بحث Google مباشر + أرشيف البترا النبطي المعتمد',
    chatEmptyPromptWarning: 'يرجى كتابة سؤالك أولاً!',
    chatQueuedSuccessNotice: 'تم إرسال هذا السؤال تلقائياً إلى قائمة تدقيق فريق إدارة الموقع (Admin Queue) للمراجعة وتحديث قاعدة المعرفة.',
    chatErrorFailedToSend: 'تعذر إرسال السؤال.',
    chatCheckingArchives: '{guideName} يتحقق من بحث Google والسجلات الأثرية النبطية...',
    chatListen: 'استماع 🔊',
    chatStop: 'إيقاف',
    chatCopy: 'نسخ',

    topMenuTitle: 'القائمة الرئيسية',
    menuLanguage: 'اللغة',
    menuScanQr: 'مسح QR',
    menuSettings: 'الإعدادات',
    menuComplaints: 'رفع الشكاوى',
    menuLogout: 'تسجيل الخروج',
    menuSignIn: 'تسجيل الدخول',
    menuSignUp: 'تسجيل لأول مرة',
    menuProfile: 'ملف المستخدم',

    authSignInTitle: 'تسجيل الدخول إلى أنباط',
    authSignUpTitle: 'تسجيل مستخدم جديد لأول مرة',
    authEmailLabel: 'البريد الإلكتروني',
    authPasswordLabel: 'كلمة المرور',
    authConfirmPasswordLabel: 'تأكيد كلمة المرور',
    authFirstNameLabel: 'الاسم الأول',
    authLastNameLabel: 'الاسم الثاني (العائلة)',
    authAgeLabel: 'العمر',
    authCountryLabel: 'البلد',
    authFavFoodLabel: 'الأكلة الأردنية المفضلة',
    authSignInBtn: 'تسجيل الدخول',
    authSignUpBtn: 'إنشاء الحساب والتسجيل',
    authLogoutSuccess: 'تم تسجيل الخروج بنجاح.',
    authAlreadyHaveAccount: 'لديك حساب بالفعل؟ تسجيل الدخول العادي',
    authFirstTimeSignUp: 'تسجيل الدخول لأول مرة (إنشاء حساب جديد)',
    authSignUpSuccessRedirect: '✓ تم حفظ بياناتك وتسجيل حسابك بنجاح! تفضل الآن بتسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور.',
    authInvalidEmailError: 'يرجى إدخال بريد إلكتروني صحيح ومكتمل (مثال: name@example.com).',
    authPasswordLengthError: 'يجب أن لا تقل كلمة المرور عن 6 خانات.',
    authPasswordMismatchError: 'كلمتا المرور غير متطابقتين!',
    authRequiredFieldsError: 'يرجى ملء جميع الحقول المطلوبة للمتابعة.',
    authInvalidCredentialsError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.',
    authAgeInvalidError: 'يرجى إدخال عمر صحيح بين 5 و 120 سنة.',

    complaintsTitle: 'بوابة الشكاوى والاقتراحات',
    complaintsSubtitle: 'سلطة إقليم البترا التنموي السياحي - صوت الزائر واقتراحات التحسين',
    complaintsNameLabel: 'الاسم الكامل للزائر',
    complaintsEmailLabel: 'البريد الإلكتروني للتواصل',
    complaintsCategoryLabel: 'تصنيف البلاغ',
    complaintsSubjectLabel: 'عنوان الشكوى / المقترح',
    complaintsDetailsLabel: 'تفاصيل الشكوى أو الملاحظة الميدانية',
    complaintsSubmitBtn: 'إرسال الشكوى رسمياً',
    complaintsSuccessMsg: 'تم استلام شكواك بنجاح وقيدت تحت رقم تتبع معتمد!',
    complaintsTicketLabel: 'رقم التذكرة المرجعية:',
    complaintsCloseBtn: 'إغلاق',

    settingsTitle: 'إعدادات النظام والتطبيق',
    settingsSoundEffects: 'المؤثرات الصوتية وختم الجواز',
    settingsOfflineMode: 'الحفظ التلقائي في الذاكرة المحلية',
    settingsUserData: 'بيانات حساب الزائر المسجل',
    settingsCloseBtn: 'تم'
  },
  en: {
    cleanMapNotice: 'Clean Map: Click any card to show its marker and live walking distance',
    fitValley: 'Fit Valley',
    deselect: 'Deselect',
    onMap: 'On Map',
    pinOnMap: 'Pin on Map',
    readStory: 'Story',
    visitedBadge: 'Visited',
    markVisited: 'Check-in',
    visitedStatus: 'Done ✓',
    startSiqGate: '📍 Siq Gate',
    liveGps: '🛰️ Live GPS',
    terrain: '⛰️ Terrain',
    satellite: '🛰️ Satellite',
    roadmap: '🗺️ Roadmap',
    searchPlaceholder: 'Search...',
    tabMonuments: 'Monuments (17)',
    tabServices: 'Services & WC (13)',
    filterAll: 'All',
    filterVisited: 'Visited',
    filterRemaining: 'Remaining',
    svcRestrooms: 'Restrooms 🚻',
    svcMedical: 'Medical 🚑',
    svcCafes: 'Cafes ☕',
    fieldFacility: 'Authorized Field Facility',
    authorizedFacility: 'Official Service Point',
    selectPrompt: 'Click to pin on map',
    awayBadge: 'away',
    walkMinutes: 'mins walk',
    walkHours: 'hr walk',
    lessThanMin: '< 1 min walk',
    metersUnit: 'm',
    kmUnit: 'km',
    brandSubtitle: 'Your Nabataean Companion & Monument Log',
    visitorPortal: 'Visitor Experience',
    adminPortal: 'Site Manager Admin',
    scanQr: 'Scan QR',
    architecture: 'Architecture & Demo',
    demoLabel: 'Demo:',
    demoJumpAll: 'Visit All 5',
    demoReset: 'Reset',
    step1Title: "Explorer's Satchel",
    step2Title: 'Petra Crafts Market',
    step3Title: 'Explore Map',
    step4Title: 'Ask Guide',
    step5Title: 'Passport & Share',
    step0Title: 'Plan Your Visit',
    prevBtn: 'Prev',
    nextBtn: 'Next',
    journeyProgress: 'Journey Exploration Progress:',
    completionLabel: 'Completion:',
    stepOfFive: 'Step {step} of 5',
    routeStopOf: 'Route Stop #{order} of 5',
    notVisitedYet: 'Not Visited Yet',
    landmarkVisited: '✓ Landmark Visited',
    storyChronicle: 'Historical Chronicle & Archaeology',
    listenAudio: 'Listen to Audio Narration',
    askGuideAboutThis: 'Ask Guide About This Landmark',
    closeBtn: 'Close',
    viewDistance: 'View Distance',
    interactiveMapTitle: 'Interactive Petra Route Map',
    interactiveMapSubtitle: 'Click any landmark pin along the route to explore its chronicle and log check-in',
    allVisitedNotice: 'All Petra monuments completed!',
    passportTitle: 'Interactive Anbat Passport (جواز سفر الأنباط)',
    passportSubtitle: 'Interactive 3D Nabataean flip book: traveler identity, companion creature bond, and automated IoT QR monument visas.',
    sharePassport: 'Share Nabataean Passport Link',
    satchelIntroStep1: 'Deterministic & explainable reveal based on starting landmark + time of day + rarity roll. (Legendary Ibex unlocks ONLY after visiting all 5 landmarks).',
    satchelIntroStep2: 'Your summoned companion guide dossier, personality traits, and official Petra passport badge.',
    legendaryUnlocked: 'Legendary Ibex Unlocked (5/5 Visited)',
    legendaryLocked: 'Legendary Locked ({count}/5 Visited)',
    explainableParams: 'Explainable Reveal Parameters',
    startingLandmarkLabel: 'Starting Landmark:',
    startingLandmarkHint: 'Influences creature biome and canyon affinity',
    timeOfDayLabel: 'Time of Day:',
    morning: 'Morning',
    afternoon: 'Afternoon',
    duskNight: 'Dusk / Night',
    openSatchelBtn: 'Open the Satchel',
    openingSatchel: 'Opening Satchel & Summoning Guide...',
    satchelSealedTitle: 'Your Nabataean Satchel is Sealed',
    satchelSealedDesc: 'Configure your starting landmark and time of day on the left, then click "Open the Satchel" to summon your Nabataean guide creature.',
    guideNameLabel: 'Guide Name:',
    guideNamePlaceholder: 'Give your guide a custom name...',
    copyShareText: 'Copy Share Text',
    copied: 'Copied!',
    downloadBadge: 'Download Badge as Image',
    generating: 'Generating...',
    nextExploreMap: 'Next: Explore Map →',
    askGuideBtn: 'Ask Guide 💬',
    companionGuideBadge: 'Companion',
    chatWelcomeMsg: 'Greetings traveler! I am {guideName}, your Nabataean companion. Ask me about Petra\'s carved monuments, hydraulic water dams, live opening hours, tickets, or Petra by Night. My answers are powered by live Google Search grounding and verified archaeological archives.',
    chatGroundingLive: 'Google Search Grounding Live',
    chatOpenSatchelFirst: 'Open Satchel 🎒',
    chatGroundingBanner: 'Search Grounding: Answers are grounded in verified Nabataean archives & live Google Search data for accurate hours, fees, and conditions.',
    chatViewSiteQueue: 'View Site Queue →',
    chatGoogleSearchFor: 'Google Search Query:',
    chatWebCitations: 'Web Grounding Citations (Google Search):',
    chatArchives: 'Verified Archives:',
    chatQueuedAdmin: 'Auto-queued for Site Manager review',
    chatAnswerInAdmin: 'Answer in Admin',
    chatExploreWithGuide: 'Explore with Guide:',
    chatTabAll: 'All',
    chatTabLogistics: 'Hours & Tickets 🕒',
    chatTabMonuments: 'Monuments 🏛️',
    chatTabHydraulics: 'Hydraulics 💧',
    chatInputPlaceholder: 'Ask {guideName} (e.g. Current ticket price, or how was the Treasury carved?)...',
    chatAskBtn: 'Ask',
    chatGroundingFooter: 'Live Google Search Grounding + Verified Petra Archives',
    chatEmptyPromptWarning: 'Please enter a question for your guide.',
    chatQueuedSuccessNotice: 'Question automatically added to the Site Manager "Unanswered Questions" queue for review!',
    chatErrorFailedToSend: 'Failed to send question.',
    chatCheckingArchives: '{guideName} is checking Google Search & Nabataean archives...',
    chatListen: 'Listen 🔊',
    chatStop: 'Stop',
    chatCopy: 'Copy',

    topMenuTitle: 'Main Menu',
    menuLanguage: 'Language',
    menuScanQr: 'Scan QR',
    menuSettings: 'Settings',
    menuComplaints: 'Submit Complaint',
    menuLogout: 'Sign Out',
    menuSignIn: 'Sign In',
    menuSignUp: 'Sign Up',
    menuProfile: 'Visitor Profile',

    authSignInTitle: 'Sign In to ANBAT',
    authSignUpTitle: 'First-Time Visitor Registration',
    authEmailLabel: 'Email Address',
    authPasswordLabel: 'Password',
    authConfirmPasswordLabel: 'Confirm Password',
    authFirstNameLabel: 'First Name',
    authLastNameLabel: 'Last Name',
    authAgeLabel: 'Age',
    authCountryLabel: 'Country of Origin',
    authFavFoodLabel: 'Favourite Jordanian Dish',
    authSignInBtn: 'Sign In',
    authSignUpBtn: 'Register Account',
    authLogoutSuccess: 'Successfully signed out.',
    authAlreadyHaveAccount: 'Already registered? Sign In',
    authFirstTimeSignUp: 'First time visiting? Sign Up here',
    authSignUpSuccessRedirect: '✓ Account created successfully! Please sign in with your email and password.',
    authInvalidEmailError: 'Please enter a valid email address (e.g., name@example.com).',
    authPasswordLengthError: 'Password must be at least 6 characters.',
    authPasswordMismatchError: 'Passwords do not match!',
    authRequiredFieldsError: 'Please fill in all required fields.',
    authInvalidCredentialsError: 'Invalid email or password. Please verify and try again.',
    authAgeInvalidError: 'Please enter a valid age between 5 and 120.',

    complaintsTitle: 'Visitor Complaints & Suggestions',
    complaintsSubtitle: 'Petra Development & Tourism Region Authority - Official Feedback Desk',
    complaintsNameLabel: 'Full Name',
    complaintsEmailLabel: 'Contact Email',
    complaintsCategoryLabel: 'Feedback Category',
    complaintsSubjectLabel: 'Subject / Issue Title',
    complaintsDetailsLabel: 'Detailed Observation / Complaint',
    complaintsSubmitBtn: 'Submit Official Ticket',
    complaintsSuccessMsg: 'Your complaint was received and assigned an official tracking ticket!',
    complaintsTicketLabel: 'Ticket Reference Number:',
    complaintsCloseBtn: 'Close',

    settingsTitle: 'App & System Settings',
    settingsSoundEffects: 'Audio Chimes & Passport Stamping Sounds',
    settingsOfflineMode: 'Offline LocalStorage Caching',
    settingsUserData: 'Logged-in Visitor Details',
    settingsCloseBtn: 'Done'
  },
  fr: {
    cleanMapNotice: 'Carte épurée : Cliquez sur une fiche pour afficher son repère et sa distance de marche',
    fitValley: 'Vue Vallée',
    deselect: 'Désélectionner',
    onMap: 'Sur la carte',
    pinOnMap: 'Localiser',
    readStory: 'Histoire',
    visitedBadge: 'Visité',
    markVisited: 'Enregistrer',
    visitedStatus: 'Visité ✓',
    startSiqGate: '📍 Entrée Siq',
    liveGps: '🛰️ GPS Direct',
    terrain: '⛰️ Relief',
    satellite: '🛰️ Satellite',
    roadmap: '🗺️ Plan',
    searchPlaceholder: 'Rechercher...',
    tabMonuments: 'Monuments (17)',
    tabServices: 'Services & WC (13)',
    filterAll: 'Tous',
    filterVisited: 'Visités',
    filterRemaining: 'Restants',
    svcRestrooms: 'Toilettes 🚻',
    svcMedical: 'Secours 🚑',
    svcCafes: 'Cafés ☕',
    fieldFacility: 'Installation de terrain agréée',
    authorizedFacility: 'Point de service officiel',
    selectPrompt: 'Cliquer pour épingler sur la carte',
    awayBadge: 'À',
    walkMinutes: 'min à pied',
    walkHours: 'h à pied',
    lessThanMin: '< 1 min à pied',
    metersUnit: 'm',
    kmUnit: 'km',
    brandSubtitle: 'Votre compagnon nabatéen & registre de visite',
    visitorPortal: 'Espace Visiteur',
    adminPortal: 'Gestion du Site',
    scanQr: 'Scanner QR',
    architecture: 'Architecture & Démo',
    demoLabel: 'Démo :',
    demoJumpAll: 'Tout Valider',
    demoReset: 'Réinitialiser',
    step1Title: 'Ouvrir la Besace',
    step2Title: 'Rencontrer le Guide',
    step3Title: 'Explorer la Carte',
    step4Title: 'Interroger le Guide',
    step5Title: 'Passeport & Partage',
    step0Title: 'Planifier la Visite',
    prevBtn: 'Précédent',
    nextBtn: 'Suivant',
    journeyProgress: 'Progression de l\'exploration :',
    completionLabel: 'Progression :',
    stepOfFive: 'Étape {step} sur 5',
    routeStopOf: 'Arrêt {order} sur 5',
    notVisitedYet: 'Non encore visité',
    landmarkVisited: '✓ Monument visité',
    storyChronicle: 'Chronique historique & archéologie',
    listenAudio: 'Écouter la narration audio',
    askGuideAboutThis: 'Interroger le guide sur ce lieu',
    closeBtn: 'Fermer',
    viewDistance: 'Distance',
    interactiveMapTitle: 'Carte interactive de Pétra',
    interactiveMapSubtitle: 'Cliquez sur un monument du parcours pour découvrir son histoire et valider votre visite',
    allVisitedNotice: 'Tous les monuments de Pétra ont été visités !',
    passportTitle: 'Passeport Nabatéen Interactif (Anbat)',
    passportSubtitle: 'Livret 3D interactif: identité du voyageur, lien avec la créature compagne et visas officiels des monuments par QR code.',
    sharePassport: 'Partager le passeport nabatéen',
    satchelIntroStep1: 'Révélation déterministe et explicable basée sur le monument de départ + le moment de la journée + le tirage de rareté. (Le bouquetin légendaire ne se débloque qu\'après avoir visité les 5 monuments).',
    satchelIntroStep2: 'Dossier de votre guide compagnon, traits de personnalité et badge officiel du passeport de Pétra.',
    legendaryUnlocked: 'Bouquetin Légendaire Débloqué (5/5 Visités)',
    legendaryLocked: 'Légendaire Verrouillé ({count}/5 Visités)',
    explainableParams: 'Paramètres de l\'Algorithme Explicable',
    startingLandmarkLabel: 'Monument de Départ :',
    startingLandmarkHint: 'Influence le biome et l\'affinité avec les canyons de Pétra',
    timeOfDayLabel: 'Moment de la Journée :',
    morning: 'Matin',
    afternoon: 'Après-midi',
    duskNight: 'Crépuscule / Nuit',
    openSatchelBtn: 'Ouvrir la Besace',
    openingSatchel: 'Ouverture de la besace & invocation du guide...',
    satchelSealedTitle: 'Votre besace nabatéenne est scellée',
    satchelSealedDesc: 'Configurez votre monument de départ et le moment de la journée à gauche, puis cliquez sur "Ouvrir la Besace" pour invoquer votre guide.',
    guideNameLabel: 'Nom du guide :',
    guideNamePlaceholder: 'Donnez un nom personnalisé à votre guide...',
    copyShareText: 'Copier le texte de partage',
    copied: 'Copié !',
    downloadBadge: 'Télécharger le badge en image',
    generating: 'Génération...',
    nextExploreMap: 'Suivant : Explorer la Carte →',
    askGuideBtn: 'Interroger le Guide 💬',
    companionGuideBadge: 'Compagnon',
    chatWelcomeMsg: 'Salutations voyageur ! Je suis {guideName}, votre guide nabatéen. Interrogez-moi sur les monuments taillés dans la roche, les barrages hydrauliques, les horaires en direct, les tarifs ou Pétra la Nuit. Mes réponses s\'appuient sur la recherche Google en direct et les archives archéologiques vérifiées.',
    chatGroundingLive: 'Recherche Google en direct (Grounded)',
    chatOpenSatchelFirst: 'Ouvrir la Besace d\'abord 🎒',
    chatGroundingBanner: 'Précision et fiabilité : Vos réponses s\'appuient sur les archives archéologiques nabatéennes et les données Google Search en direct (horaires, tarifs, météo).',
    chatViewSiteQueue: 'Voir la file de modération →',
    chatGoogleSearchFor: 'Recherche Google effectuée pour :',
    chatWebCitations: 'Citations web vérifiées (Google Search) :',
    chatArchives: 'Archives archéologiques vérifiées :',
    chatQueuedAdmin: 'Ajouté automatiquement à la file d\'attente du gestionnaire',
    chatAnswerInAdmin: 'Répondre dans l\'espace Admin',
    chatExploreWithGuide: 'Explorer avec le Guide :',
    chatTabAll: 'Tous',
    chatTabLogistics: 'Horaires & Billets 🕒',
    chatTabMonuments: 'Monuments 🏛️',
    chatTabHydraulics: 'Hydraulique 💧',
    chatInputPlaceholder: 'Posez une question à {guideName} (ex: prix d\'entrée, taille de la Khazneh)...',
    chatAskBtn: 'Envoyer',
    chatGroundingFooter: 'Recherche Google en direct + Archives certifiées de Pétra',
    chatEmptyPromptWarning: 'Veuillez saisir votre question d\'abord !',
    chatQueuedSuccessNotice: 'Question envoyée automatiquement à la file d\'attente des questions sans réponse pour révision par les administrateurs.',
    chatErrorFailedToSend: 'Échec de l\'envoi de la question.',
    chatCheckingArchives: '{guideName} consulte la recherche Google et les archives nabatéennes...',
    chatListen: 'Écouter 🔊',
    chatStop: 'Arrêter',
    chatCopy: 'Copier',

    topMenuTitle: 'Menu Principal',
    menuLanguage: 'Langue',
    menuScanQr: 'Scanner QR',
    menuSettings: 'Paramètres',
    menuComplaints: 'Déposer une réclamation',
    menuLogout: 'Déconnexion',
    menuSignIn: 'Connexion',
    menuSignUp: 'Inscription',
    menuProfile: 'Profil Visiteur',

    authSignInTitle: 'Connexion à ANBAT',
    authSignUpTitle: 'Première visite : Inscription',
    authEmailLabel: 'Adresse e-mail',
    authPasswordLabel: 'Mot de passe',
    authConfirmPasswordLabel: 'Confirmer le mot de passe',
    authFirstNameLabel: 'Prénom',
    authLastNameLabel: 'Nom de famille',
    authAgeLabel: 'Âge',
    authCountryLabel: 'Pays d\'origine',
    authFavFoodLabel: 'Plat jordanien préféré',
    authSignInBtn: 'Se connecter',
    authSignUpBtn: 'Créer mon compte',
    authLogoutSuccess: 'Déconnexion réussie.',
    authAlreadyHaveAccount: 'Déjà un compte ? Connectez-vous',
    authFirstTimeSignUp: 'Première connexion ? Inscrivez-vous ici',
    authSignUpSuccessRedirect: '✓ Compte créé avec succès ! Connectez-vous avec votre e-mail et mot de passe.',
    authInvalidEmailError: 'Veuillez saisir une adresse e-mail valide.',
    authPasswordLengthError: 'Le mot de passe doit comporter au moins 6 caractères.',
    authPasswordMismatchError: 'Les mots de passe ne correspondent pas !',
    authRequiredFieldsError: 'Veuillez remplir tous les champs obligatoires.',
    authInvalidCredentialsError: 'Identifiants incorrects. Veuillez réessayer.',
    authAgeInvalidError: 'Veuillez saisir un âge valide (5 à 120 ans).',

    complaintsTitle: 'Réclamations et Suggestions',
    complaintsSubtitle: 'Autorité de la Région de Pétra - Écoute des visiteurs',
    complaintsNameLabel: 'Nom complet',
    complaintsEmailLabel: 'E-mail de contact',
    complaintsCategoryLabel: 'Catégorie',
    complaintsSubjectLabel: 'Objet du signalement',
    complaintsDetailsLabel: 'Détails de la réclamation',
    complaintsSubmitBtn: 'Envoyer le dossier',
    complaintsSuccessMsg: 'Réclamation enregistrée avec succès sous un numéro de suivi officiel !',
    complaintsTicketLabel: 'Numéro de suivi :',
    complaintsCloseBtn: 'Fermer',

    settingsTitle: 'Paramètres de l\'application',
    settingsSoundEffects: 'Effets sonores et tampon du passeport',
    settingsOfflineMode: 'Cache local hors ligne',
    settingsUserData: 'Données du visiteur connecté',
    settingsCloseBtn: 'Terminer'
  },
  es: {
    cleanMapNotice: 'Mapa despejado: Haz clic en una tarjeta para ver su ubicación y distancia a pie',
    fitValley: 'Todo el Valle',
    deselect: 'Deseleccionar',
    onMap: 'En el mapa',
    pinOnMap: 'Ubicar en mapa',
    readStory: 'Historia',
    visitedBadge: 'Visitado',
    markVisited: 'Registrar visita',
    visitedStatus: 'Hecho ✓',
    startSiqGate: '📍 Entrada Siq',
    liveGps: '🛰️ GPS en vivo',
    terrain: '⛰️ Relieve',
    satellite: '🛰️ Satélite',
    roadmap: '🗺️ Mapa vial',
    searchPlaceholder: 'Buscar...',
    tabMonuments: 'Monumentos (17)',
    tabServices: 'Servicios y Baños (13)',
    filterAll: 'Todos',
    filterVisited: 'Visitados',
    filterRemaining: 'Restantes',
    svcRestrooms: 'Baños 🚻',
    svcMedical: 'Médico 🚑',
    svcCafes: 'Cafeterías ☕',
    fieldFacility: 'Instalación autorizada',
    authorizedFacility: 'Punto de servicio oficial',
    selectPrompt: 'Haz clic para ubicar en el mapa',
    awayBadge: 'A',
    walkMinutes: 'min a pie',
    walkHours: 'h a pie',
    lessThanMin: '< 1 min a pie',
    metersUnit: 'm',
    kmUnit: 'km',
    brandSubtitle: 'Tu compañero nabateo y registro de monumentos',
    visitorPortal: 'Portal del Visitante',
    adminPortal: 'Administración del Sitio',
    scanQr: 'Escanear QR',
    architecture: 'Arquitectura y Demo',
    demoLabel: 'Demo:',
    demoJumpAll: 'Visitar los 5',
    demoReset: 'Reiniciar',
    step1Title: 'Abrir la Alforja',
    step2Title: 'Conocer al Guía',
    step3Title: 'Explorar el Mapa',
    step4Title: 'Preguntar al Guía',
    step5Title: 'Pasaporte y Compartir',
    step0Title: 'Planifica tu Visita',
    prevBtn: 'Anterior',
    nextBtn: 'Siguiente',
    journeyProgress: 'Progreso de la expedición:',
    completionLabel: 'Completado:',
    stepOfFive: 'Paso {step} de 5',
    routeStopOf: 'Parada #{order} de 5',
    notVisitedYet: 'Aún no visitado',
    landmarkVisited: '✓ Monumento visitado',
    storyChronicle: 'Crónica histórica y arqueología',
    listenAudio: 'Escuchar narración de audio',
    askGuideAboutThis: 'Preguntar al guía sobre este lugar',
    closeBtn: 'Cerrar',
    viewDistance: 'Ver distancia',
    interactiveMapTitle: 'Mapa interactivo de la ruta de Petra',
    interactiveMapSubtitle: 'Haz clic en cualquier monumento para ver su historia y registrar tu visita',
    allVisitedNotice: '¡Todos los monumentos de Petra han sido visitados!',
    passportTitle: 'Pasaporte Nabateo Interactivo (Anbat)',
    passportSubtitle: 'Libreta interactiva 3D: identidad del viajero, vínculo con la criatura guía y sellos oficiales mediante código QR.',
    sharePassport: 'Compartir enlace del pasaporte nabateo',
    satchelIntroStep1: 'Revelación determinista y explicable según el monumento inicial + hora del día + tirada de rareza. (El íbice legendario se desbloquea solo tras visitar los 5 monumentos).',
    satchelIntroStep2: 'Ficha de tu guía acompañante, rasgos de personalidad e insignia oficial del pasaporte de Petra.',
    legendaryUnlocked: '¡Íbice Legendario Desbloqueado! (5/5 Visitados)',
    legendaryLocked: 'Legendario Bloqueado ({count}/5 Visitados)',
    explainableParams: 'Parámetros del Algoritmo Explicable',
    startingLandmarkLabel: 'Monumento de Inicio:',
    startingLandmarkHint: 'Influye en el hábitat y afinidad del cañón de la criatura en Petra',
    timeOfDayLabel: 'Hora del Día:',
    morning: 'Mañana',
    afternoon: 'Tarde',
    duskNight: 'Atardecer / Noche',
    openSatchelBtn: 'Abrir la Alforja',
    openingSatchel: 'Abriendo la alforja e invocando al guía...',
    satchelSealedTitle: 'Tu alforja nabatea está sellada',
    satchelSealedDesc: 'Configura el monumento de inicio y la hora del día a la izquierda, luego haz clic en "Abrir la Alforja" para invocar a tu guía nabateo.',
    guideNameLabel: 'Nombre del guía:',
    guideNamePlaceholder: 'Dale un nombre personalizado a tu guía...',
    copyShareText: 'Copiar texto de compartir',
    copied: '¡Copiado!',
    downloadBadge: 'Descargar insignia como imagen',
    generating: 'Generando...',
    nextExploreMap: 'Siguiente: Explorar Mapa →',
    askGuideBtn: 'Preguntar al Guía 💬',
    companionGuideBadge: 'Acompañante',
    chatWelcomeMsg: '¡Saludos viajero! Soy {guideName}, tu guía nabateo. Pregúntame sobre los monumentos excavados en la roca, las represas hidráulicas, horarios en vivo, tarifas o Petra de Noche. Mis respuestas se basan en búsquedas de Google en tiempo real y archivos arqueológicos verificados.',
    chatGroundingLive: 'Búsqueda de Google en vivo (Grounded)',
    chatOpenSatchelFirst: 'Abre la Alforja primero 🎒',
    chatGroundingBanner: 'Garantía de precisión: Tus respuestas se respaldan en archivos arqueológicos nabateos y datos de búsqueda de Google en vivo para horarios, tarifas y clima exactos.',
    chatViewSiteQueue: 'Ver cola de revisión del sitio →',
    chatGoogleSearchFor: 'Búsqueda de Google realizada para:',
    chatWebCitations: 'Fuentes web verificadas (Google Search):',
    chatArchives: 'Archivos arqueológicos certificados:',
    chatQueuedAdmin: 'En cola automáticamente para revisión del administrador',
    chatAnswerInAdmin: 'Responder en panel de administración',
    chatExploreWithGuide: 'Explora con el Guía:',
    chatTabAll: 'Todos',
    chatTabLogistics: 'Horarios y Entradas 🕒',
    chatTabMonuments: 'Monumentos 🏛️',
    chatTabHydraulics: 'Hidráulica 💧',
    chatInputPlaceholder: 'Pregunta a {guideName} (ej: costo de entrada, cómo se esculpió El Tesoro)...',
    chatAskBtn: 'Enviar',
    chatGroundingFooter: 'Búsqueda de Google en vivo + Archivos certificados de Petra',
    chatEmptyPromptWarning: '¡Por favor escribe tu pregunta primero!',
    chatQueuedSuccessNotice: '¡Pregunta agregada automáticamente a la lista de preguntas sin responder para revisión administrativa!',
    chatErrorFailedToSend: 'No se pudo enviar la pregunta.',
    chatCheckingArchives: '{guideName} está consultando la búsqueda de Google y los archivos nabateos...',
    chatListen: 'Escuchar 🔊',
    chatStop: 'Detener',
    chatCopy: 'Copiar',

    topMenuTitle: 'Menú Principal',
    menuLanguage: 'Idioma',
    menuScanQr: 'Escanear QR',
    menuSettings: 'Configuración',
    menuComplaints: 'Presentar Queja',
    menuLogout: 'Cerrar Sesión',
    menuSignIn: 'Iniciar Sesión',
    menuSignUp: 'Registrarse',
    menuProfile: 'Perfil de Visitante',

    authSignInTitle: 'Iniciar Sesión en ANBAT',
    authSignUpTitle: 'Registro por Primera Vez',
    authEmailLabel: 'Correo Electrónico',
    authPasswordLabel: 'Contraseña',
    authConfirmPasswordLabel: 'Confirmar Contraseña',
    authFirstNameLabel: 'Nombre',
    authLastNameLabel: 'Apellido',
    authAgeLabel: 'Edad',
    authCountryLabel: 'País de Origen',
    authFavFoodLabel: 'Plato jordano favorito',
    authSignInBtn: 'Iniciar Sesión',
    authSignUpBtn: 'Crear Cuenta',
    authLogoutSuccess: 'Sesión cerrada con éxito.',
    authAlreadyHaveAccount: '¿Ya tienes cuenta? Inicia sesión',
    authFirstTimeSignUp: '¿Primera vez aquí? Regístrate',
    authSignUpSuccessRedirect: '✓ ¡Cuenta creada con éxito! Por favor inicia sesión con tu correo y contraseña.',
    authInvalidEmailError: 'Ingresa un correo electrónico válido.',
    authPasswordLengthError: 'La contraseña debe tener al menos 6 caracteres.',
    authPasswordMismatchError: '¡Las contraseñas no coinciden!',
    authRequiredFieldsError: 'Por favor completa todos los campos requeridos.',
    authInvalidCredentialsError: 'Correo o contraseña incorrectos.',
    authAgeInvalidError: 'Ingresa una edad válida (5 a 120 años).',

    complaintsTitle: 'Quejas y Sugerencias',
    complaintsSubtitle: 'Autoridad de la Región de Petra - Atención al visitante',
    complaintsNameLabel: 'Nombre completo',
    complaintsEmailLabel: 'Correo de contacto',
    complaintsCategoryLabel: 'Categoría',
    complaintsSubjectLabel: 'Asunto de la queja',
    complaintsDetailsLabel: 'Detalles de la queja',
    complaintsSubmitBtn: 'Enviar Queja',
    complaintsSuccessMsg: '¡Queja registrada con éxito con número de seguimiento!',
    complaintsTicketLabel: 'Número de seguimiento:',
    complaintsCloseBtn: 'Cerrar',

    settingsTitle: 'Configuración de la App',
    settingsSoundEffects: 'Sonidos de sellos y efectos de audio',
    settingsOfflineMode: 'Almacenamiento local sin conexión',
    settingsUserData: 'Datos del visitante registrado',
    settingsCloseBtn: 'Listo'
  },
  de: {
    cleanMapNotice: 'Klare Karte: Klicken Sie auf eine Karte, um den Standort und die Gehzeit anzuzeigen',
    fitValley: 'Gesamtes Tal',
    deselect: 'Abwählen',
    onMap: 'Auf der Karte',
    pinOnMap: 'Auf Karte zeigen',
    readStory: 'Geschichte',
    visitedBadge: 'Besucht',
    markVisited: 'Einchecken',
    visitedStatus: 'Besucht ✓',
    startSiqGate: '📍 Siq-Eingang',
    liveGps: '🛰️ Live-GPS',
    terrain: '⛰️ Gelände',
    satellite: '🛰️ Satellit',
    roadmap: '🗺️ Straßenkarte',
    searchPlaceholder: 'Suchen...',
    tabMonuments: 'Monumente (17)',
    tabServices: 'Service & WCs (13)',
    filterAll: 'Alle',
    filterVisited: 'Besucht',
    filterRemaining: 'Verbleibend',
    svcRestrooms: 'Toiletten 🚻',
    svcMedical: 'Erste Hilfe 🚑',
    svcCafes: 'Cafés & Rast ☕',
    fieldFacility: 'Offizielle Einrichtung',
    authorizedFacility: 'Offizieller Servicepunkt',
    selectPrompt: 'Klicken zum Markieren auf Karte',
    awayBadge: '',
    walkMinutes: 'Min. Fußweg',
    walkHours: 'Std. Fußweg',
    lessThanMin: '< 1 Min. Fußweg',
    metersUnit: 'm',
    kmUnit: 'km',
    brandSubtitle: 'Ihr nabatäischer Reisebegleiter & Denkmal-Logbuch',
    visitorPortal: 'Besucherbereich',
    adminPortal: 'Standortverwaltung',
    scanQr: 'QR Scannen',
    architecture: 'Architektur & Demo',
    demoLabel: 'Demo:',
    demoJumpAll: 'Alle 5 besuchen',
    demoReset: 'Zurücksetzen',
    step1Title: 'Beutel Öffnen',
    step2Title: 'Führer Treffen',
    step3Title: 'Karte Erkunden',
    step4Title: 'Führer Fragen',
    step5Title: 'Pass & Teilen',
    step0Title: 'Besuch Planen',
    prevBtn: 'Zurück',
    nextBtn: 'Weiter',
    journeyProgress: 'Erkundungsfortschritt:',
    completionLabel: 'Fortschritt:',
    stepOfFive: 'Schritt {step} von 5',
    routeStopOf: 'Station #{order} von 5',
    notVisitedYet: 'Noch nicht besucht',
    landmarkVisited: '✓ Denkmal besucht',
    storyChronicle: 'Historische Chronik & Archäologie',
    listenAudio: 'Audiodatei anhören',
    askGuideAboutThis: 'Führer nach diesem Ort fragen',
    closeBtn: 'Schließen',
    viewDistance: 'Entfernung anzeigen',
    interactiveMapTitle: 'Interaktive Petra-Routenkarte',
    interactiveMapSubtitle: 'Klicken Sie auf ein Denkmal, um seine Chronik zu entdecken und einzuchecken',
    allVisitedNotice: 'Alle Denkmäler von Petra wurden besucht!',
    passportTitle: 'Interaktiver Nabatäischer Reisepass (Anbat)',
    passportSubtitle: 'Interaktives 3D-Buch: Reisendenidentität, Bindung zum Begleittier und offizielle QR-Code-Monumentvisa.',
    sharePassport: 'Nabatäischen Pass-Link teilen',
    satchelIntroStep1: 'Deterministische & erklärbare Beschwörung basierend auf Start-Denkmal + Tageszeit + Seltenheitswert. (Der legendäre Steinbock wird erst nach Besuch aller 5 Denkmäler freigeschaltet).',
    satchelIntroStep2: 'Dossier Ihres Begleitführers, Persönlichkeitsmerkmale und offizielles Petra-Passabzeichen.',
    legendaryUnlocked: 'Legendärer Steinbock Freigeschaltet (5/5 Besucht)',
    legendaryLocked: 'Legendär Gesperrt ({count}/5 Besucht)',
    explainableParams: 'Parameter des Erklärbaren Algorithmus',
    startingLandmarkLabel: 'Start-Denkmal:',
    startingLandmarkHint: 'Beeinflusst das Biom und die Schlucht-Affinität des Begleiters in Petra',
    timeOfDayLabel: 'Tageszeit:',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    duskNight: 'Dämmerung / Nacht',
    openSatchelBtn: 'Beutel Öffnen',
    openingSatchel: 'Beutel wird geöffnet & Führer beschworen...',
    satchelSealedTitle: 'Ihr nabatäischer Beutel ist verschlossen',
    satchelSealedDesc: 'Wählen Sie links Start-Denkmal und Tageszeit aus und klicken Sie auf "Beutel Öffnen", um Ihren nabatäischen Begleiter zu beschwören.',
    guideNameLabel: 'Name des Führers:',
    guideNamePlaceholder: 'Geben Sie Ihrem Begleiter einen Namen...',
    copyShareText: 'Freigabetext kopieren',
    copied: 'Kopiert!',
    downloadBadge: 'Abzeichen als Bild herunterladen',
    generating: 'Wird erstellt...',
    nextExploreMap: 'Weiter: Karte Erkunden →',
    askGuideBtn: 'Führer Fragen 💬',
    companionGuideBadge: 'Begleiter',
    chatWelcomeMsg: 'Seid gegrüßt, Reisender! Ich bin {guideName}, Ihr nabatäischer Begleiter. Fragen Sie mich nach Petras Felsendenkmälern, hydraulischen Staudämmen, aktuellen Öffnungszeiten, Eintrittspreisen oder Petra bei Nacht. Meine Antworten stützen sich auf Echtzeit-Google-Suchen und geprüfte archäologische Archive.',
    chatGroundingLive: 'Live Google-Suche Grounding',
    chatOpenSatchelFirst: 'Zuerst Beutel öffnen 🎒',
    chatGroundingBanner: 'Präzision & Zuverlässigkeit: Ihre Antworten basieren auf verifizierten nabatäischen Archiven und Live-Google-Suchdaten für Öffnungszeiten, Preise und Wetter.',
    chatViewSiteQueue: 'Prüf-Warteschlange ansehen →',
    chatGoogleSearchFor: 'Durchgeführte Google-Suche:',
    chatWebCitations: 'Verifizierte Webquellen (Google Search):',
    chatArchives: 'Zertifizierte archäologische Archive:',
    chatQueuedAdmin: 'Automatisch in Warteschlange der Parkverwaltung eingereiht',
    chatAnswerInAdmin: 'Im Admin-Bereich beantworten',
    chatExploreWithGuide: 'Mit dem Führer erkunden:',
    chatTabAll: 'Alle',
    chatTabLogistics: 'Zeiten & Tickets 🕒',
    chatTabMonuments: 'Denkmäler 🏛️',
    chatTabHydraulics: 'Hydraulik 💧',
    chatInputPlaceholder: 'Fragen Sie {guideName} (z.B. Ticketpreise, Bau der Schatzkammer)...',
    chatAskBtn: 'Fragen',
    chatGroundingFooter: 'Live Google-Suche + Zertifizierte Petra-Archive',
    chatEmptyPromptWarning: 'Bitte geben Sie zuerst Ihre Frage ein!',
    chatQueuedSuccessNotice: 'Frage wurde automatisch in die Prüfwarteschlange der Parkverwaltung aufgenommen!',
    chatErrorFailedToSend: 'Frage konnte nicht gesendet werden.',
    chatCheckingArchives: '{guideName} durchsucht Google und die nabatäischen Archive...',
    chatListen: 'Anhören 🔊',
    chatStop: 'Stopp',
    chatCopy: 'Kopieren',

    topMenuTitle: 'Hauptmenü',
    menuLanguage: 'Sprache',
    menuScanQr: 'QR Scannen',
    menuSettings: 'Einstellungen',
    menuComplaints: 'Beschwerde einreichen',
    menuLogout: 'Abmelden',
    menuSignIn: 'Anmelden',
    menuSignUp: 'Erstregistrierung',
    menuProfile: 'Besucherprofil',

    authSignInTitle: 'Bei ANBAT anmelden',
    authSignUpTitle: 'Erstmalige Besucher-Registrierung',
    authEmailLabel: 'E-Mail-Adresse',
    authPasswordLabel: 'Passwort',
    authConfirmPasswordLabel: 'Passwort bestätigen',
    authFirstNameLabel: 'Vorname',
    authLastNameLabel: 'Nachname',
    authAgeLabel: 'Alter',
    authCountryLabel: 'Herkunftsland',
    authFavFoodLabel: 'Jordanisches Lieblingsgericht',
    authSignInBtn: 'Anmelden',
    authSignUpBtn: 'Konto erstellen',
    authLogoutSuccess: 'Erfolgreich abgemeldet.',
    authAlreadyHaveAccount: 'Bereits registriert? Hier anmelden',
    authFirstTimeSignUp: 'Zum ersten Mal hier? Jetzt registrieren',
    authSignUpSuccessRedirect: '✓ Konto erfolgreich erstellt! Bitte melden Sie sich mit E-Mail und Passwort an.',
    authInvalidEmailError: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    authPasswordLengthError: 'Passwort muss mindestens 6 Zeichen lang sein.',
    authPasswordMismatchError: 'Passwörter stimmen nicht überein!',
    authRequiredFieldsError: 'Bitte alle Pflichtfelder ausfüllen.',
    authInvalidCredentialsError: 'E-Mail oder Passwort ungültig.',
    authAgeInvalidError: 'Bitte ein gültiges Alter (5 bis 120) eingeben.',

    complaintsTitle: 'Beschwerden & Anregungen',
    complaintsSubtitle: 'Petra Development and Tourism Region Authority - Besucherdienst',
    complaintsNameLabel: 'Vollständiger Name',
    complaintsEmailLabel: 'Kontakt-E-Mail',
    complaintsCategoryLabel: 'Kategorie',
    complaintsSubjectLabel: 'Betreff / Titel',
    complaintsDetailsLabel: 'Ausführliche Beschreibung',
    complaintsSubmitBtn: 'Offiziell einreichen',
    complaintsSuccessMsg: 'Ihre Beschwerde wurde registriert und mit einer Ticketnummer versehen!',
    complaintsTicketLabel: 'Ticket-Referenznummer:',
    complaintsCloseBtn: 'Schließen',

    settingsTitle: 'App-Einstellungen',
    settingsSoundEffects: 'Klangeffekte und Stempelgeräusche',
    settingsOfflineMode: 'Lokaler Offline-Zwischenspeicher',
    settingsUserData: 'Angemeldete Besucherdaten',
    settingsCloseBtn: 'Fertig'
  },
  it: {
    cleanMapNotice: 'Mappa pulita: Fai clic su una scheda per vedere il punto e la distanza a piedi',
    fitValley: 'Tutta la Valle',
    deselect: 'Deseleziona',
    onMap: 'Sulla mappa',
    pinOnMap: 'Mostra su mappa',
    readStory: 'Storia',
    visitedBadge: 'Visitato',
    markVisited: 'Registra visita',
    visitedStatus: 'Fatto ✓',
    startSiqGate: '📍 Ingresso Siq',
    liveGps: '🛰️ GPS in diretta',
    terrain: '⛰️ Terreno',
    satellite: '🛰️ Satellite',
    roadmap: '🗺️ Stradale',
    searchPlaceholder: 'Cerca...',
    tabMonuments: 'Monumenti (17)',
    tabServices: 'Servizi e Bagni (13)',
    filterAll: 'Tutti',
    filterVisited: 'Visitati',
    filterRemaining: 'Rimanenti',
    svcRestrooms: 'Servizi igienici 🚻',
    svcMedical: 'Pronto soccorso 🚑',
    svcCafes: 'Punti ristoro ☕',
    fieldFacility: 'Struttura autorizzata',
    authorizedFacility: 'Punto di servizio ufficiale',
    selectPrompt: 'Clicca per fissare sulla mappa',
    awayBadge: 'A',
    walkMinutes: 'min a piedi',
    walkHours: 'ore a piedi',
    lessThanMin: '< 1 min a piedi',
    metersUnit: 'm',
    kmUnit: 'km',
    brandSubtitle: 'Il tuo compagno nabateo e diario dei monumenti',
    visitorPortal: 'Portale Visitatore',
    adminPortal: 'Gestione del Sito',
    scanQr: 'Scansiona QR',
    architecture: 'Architettura & Demo',
    demoLabel: 'Demo:',
    demoJumpAll: 'Visita tutti i 5',
    demoReset: 'Reimposta',
    step1Title: 'Apri la Bisaccia',
    step2Title: 'Incontra la Guida',
    step3Title: 'Esplora la Mappa',
    step4Title: 'Chiedi alla Guida',
    step5Title: 'Passaporto e Condividi',
    step0Title: 'Pianifica la Visita',
    prevBtn: 'Precedente',
    nextBtn: 'Successivo',
    journeyProgress: 'Avanzamento dell\'esplorazione:',
    completionLabel: 'Completamento:',
    stepOfFive: 'Tappa {step} di 5',
    routeStopOf: 'Fermata #{order} di 5',
    notVisitedYet: 'Non ancora visitato',
    landmarkVisited: '✓ Monumento visitato',
    storyChronicle: 'Cronaca storica e archeologia',
    listenAudio: 'Ascolta narrazione audio',
    askGuideAboutThis: 'Chiedi alla guida di questo monumento',
    closeBtn: 'Chiudi',
    viewDistance: 'Vedi distanza',
    interactiveMapTitle: 'Mappa interattiva del percorso di Petra',
    interactiveMapSubtitle: 'Fai clic su un monumento per scoprirne la cronaca e registrare la visita',
    allVisitedNotice: 'Tutti i monumenti di Petra sono stati visitati!',
    passportTitle: 'Passaporto Nabateo Interattivo (Anbat)',
    passportSubtitle: 'Libretto 3D interattivo: identità del viaggiatore, legame con la creatura guida e visti ufficiali tramite QR code.',
    sharePassport: 'Condividi il passaporto nabateo',
    satchelIntroStep1: 'Rivelazione deterministica e spiegabile basata su monumento iniziale + ora del giorno + tiro di rarità. (Lo stambecco leggendario si sblocca solo dopo aver visitato tutti e 5 i monumenti).',
    satchelIntroStep2: 'Dossier della tua guida accompagnatrice, tratti di personalità e distintivo ufficiale del passaporto di Petra.',
    legendaryUnlocked: 'Stambecco Leggendario Sbloccato (5/5 Visitati)',
    legendaryLocked: 'Leggendario Bloccato ({count}/5 Visitati)',
    explainableParams: 'Parametri dell\'Algoritmo Spiegabile',
    startingLandmarkLabel: 'Monumento di Partenza:',
    startingLandmarkHint: 'Influenza il bioma e l\'affinità con i canyon della creatura a Petra',
    timeOfDayLabel: 'Ora del Giorno:',
    morning: 'Mattina',
    afternoon: 'Pomeriggio',
    duskNight: 'Tramonto / Notte',
    openSatchelBtn: 'Apri la Bisaccia',
    openingSatchel: 'Apertura della bisaccia e invocazione della guida...',
    satchelSealedTitle: 'La tua bisaccia nabatea è sigillata',
    satchelSealedDesc: 'Configura il monumento di partenza e l\'ora del giorno a sinistra, poi clicca su "Apri la Bisaccia" per evocare la tua guida nabatea.',
    guideNameLabel: 'Nome della guida:',
    guideNamePlaceholder: 'Assegna un nome personalizzato alla guida...',
    copyShareText: 'Copia testo di condivisione',
    copied: 'Copiato!',
    downloadBadge: 'Scarica distintivo come immagine',
    generating: 'Generazione in corso...',
    nextExploreMap: 'Avanti: Esplora la Mappa →',
    askGuideBtn: 'Chiedi alla Guida 💬',
    companionGuideBadge: 'Compagno',
    chatWelcomeMsg: 'Saluti viaggiatore! Sono {guideName}, la tua guida nabatea. Chiedimi dei monumenti rupestri di Petra, delle dighe idrauliche, degli orari attuali, dei biglietti o di Petra di Notte. Le mie risposte si basano su ricerche Google in tempo reale e archivi archeologici verificati.',
    chatGroundingLive: 'Ricerca Google in tempo reale (Grounded)',
    chatOpenSatchelFirst: 'Apri prima la Bisaccia 🎒',
    chatGroundingBanner: 'Precisione e affidabilità: Le risposte attingono agli archivi archeologici nabatei e ai dati in tempo reale di Google Search per orari, tariffe e meteo.',
    chatViewSiteQueue: 'Vedi coda di revisione del sito →',
    chatGoogleSearchFor: 'Ricerca Google effettuata per:',
    chatWebCitations: 'Fonti web verificate (Google Search):',
    chatArchives: 'Archivi archeologici certificati:',
    chatQueuedAdmin: 'Inserito automaticamente nella coda di verifica del gestore',
    chatAnswerInAdmin: 'Rispondi nel pannello di amministrazione',
    chatExploreWithGuide: 'Esplora con la Guida:',
    chatTabAll: 'Tutti',
    chatTabLogistics: 'Orari & Biglietti 🕒',
    chatTabMonuments: 'Monumenti 🏛️',
    chatTabHydraulics: 'Idraulica 💧',
    chatInputPlaceholder: 'Chiedi a {guideName} (es: costo biglietto, come fu scolpito Il Tesoro)...',
    chatAskBtn: 'Invia',
    chatGroundingFooter: 'Ricerca Google in tempo reale + Archivi ufficiali di Petra',
    chatEmptyPromptWarning: 'Inserisci prima la tua domanda!',
    chatQueuedSuccessNotice: 'Domanda inviata automaticamente alla coda di revisione per il team di gestione!',
    chatErrorFailedToSend: 'Impossibile inviare la domanda.',
    chatCheckingArchives: '{guideName} sta consultando Google e gli archivi nabatei...',
    chatListen: 'Ascolta 🔊',
    chatStop: 'Ferma',
    chatCopy: 'Copia',

    topMenuTitle: 'Menu Principale',
    menuLanguage: 'Lingua',
    menuScanQr: 'Scansiona QR',
    menuSettings: 'Impostazioni',
    menuComplaints: 'Invia Reclamo',
    menuLogout: 'Disconnetti',
    menuSignIn: 'Accedi',
    menuSignUp: 'Registrati',
    menuProfile: 'Profilo Visitatore',

    authSignInTitle: 'Accedi a ANBAT',
    authSignUpTitle: 'Prima Registrazione Visitatore',
    authEmailLabel: 'Indirizzo E-mail',
    authPasswordLabel: 'Password',
    authConfirmPasswordLabel: 'Conferma Password',
    authFirstNameLabel: 'Nome',
    authLastNameLabel: 'Cognome',
    authAgeLabel: 'Età',
    authCountryLabel: 'Paese di Origine',
    authFavFoodLabel: 'Piatto giordano preferito',
    authSignInBtn: 'Accedi',
    authSignUpBtn: 'Crea Account',
    authLogoutSuccess: 'Disconnessione effettuata con successo.',
    authAlreadyHaveAccount: 'Hai già un account? Accedi',
    authFirstTimeSignUp: 'Prima volta a Petra? Registrati qui',
    authSignUpSuccessRedirect: '✓ Account creato con successo! Accedi ora con la tua email e password.',
    authInvalidEmailError: 'Inserisci un indirizzo email valido.',
    authPasswordLengthError: 'La password deve contenere almeno 6 caratteri.',
    authPasswordMismatchError: 'Le password non coincidono!',
    authRequiredFieldsError: 'Compila tutti i campi obbligatori.',
    authInvalidCredentialsError: 'Email o password errati. Riprova.',
    authAgeInvalidError: 'Inserisci un\'età valida (tra 5 e 120 anni).',

    complaintsTitle: 'Reclami e Suggerimenti',
    complaintsSubtitle: 'Autorità della Regione di Petra - Servizio Visitatori',
    complaintsNameLabel: 'Nome e Cognome',
    complaintsEmailLabel: 'Email di contatto',
    complaintsCategoryLabel: 'Categoria',
    complaintsSubjectLabel: 'Oggetto della segnalazione',
    complaintsDetailsLabel: 'Dettagli del reclamo',
    complaintsSubmitBtn: 'Invia Reclamo',
    complaintsSuccessMsg: 'Reclamo ricevuto e registrato con codice di tracciamento!',
    complaintsTicketLabel: 'Numero di protocollo:',
    complaintsCloseBtn: 'Chiudi',

    settingsTitle: 'Impostazioni App',
    settingsSoundEffects: 'Effetti sonori e timbro passaporto',
    settingsOfflineMode: 'Cache locale offline',
    settingsUserData: 'Dati visitatore registrato',
    settingsCloseBtn: 'Fatto'
  },
  zh: {
    cleanMapNotice: '清爽地图：点击下方卡片即可在地图上精准定位并计算真实步行距离与时间',
    fitValley: '全谷全景',
    deselect: '取消选择',
    onMap: '已在地图标记',
    pinOnMap: '在地图定位',
    readStory: '历史故事',
    visitedBadge: '已参观',
    markVisited: '登记打卡',
    visitedStatus: '已打卡 ✓',
    startSiqGate: '📍 西克峡谷起点',
    liveGps: '🛰️ 实时GPS定位',
    terrain: '⛰️ 地形图',
    satellite: '🛰️ 卫星图',
    roadmap: '🗺️ 街道图',
    searchPlaceholder: '搜索景点或服务...',
    tabMonuments: '古迹遗址 (17)',
    tabServices: '洗手间与便利设施 (13)',
    filterAll: '全部',
    filterVisited: '已打卡',
    filterRemaining: '待探索',
    svcRestrooms: '公共洗手间 🚻',
    svcMedical: '急救医疗站 🚑',
    svcCafes: '休息站与茶室 ☕',
    fieldFacility: '佩特拉官方服务设施',
    authorizedFacility: '官方认证服务点',
    selectPrompt: '点击在地图上标记此地点',
    awayBadge: '距离',
    walkMinutes: '分钟步行',
    walkHours: '小时步行',
    lessThanMin: '少于1分钟步行',
    metersUnit: '米',
    kmUnit: '公里',
    brandSubtitle: '您的智能纳巴泰向导与古迹探访日志',
    visitorPortal: '游客探索门户',
    adminPortal: '遗址管理控制台',
    scanQr: '扫码打卡',
    architecture: '技术架构与演示',
    demoLabel: '演示:',
    demoJumpAll: '一键打卡全部5处',
    demoReset: '重置演示',
    step1Title: '开启行囊',
    step2Title: '结识向导',
    step3Title: '探索地图',
    step4Title: '向导问答',
    step5Title: '护照与分享',
    step0Title: '规划行程',
    prevBtn: '上一步',
    nextBtn: '下一步',
    journeyProgress: '佩特拉探索路线总进度:',
    completionLabel: '完成度:',
    stepOfFive: '第 {step} 步（共 5 步）',
    routeStopOf: '路线第 #{order} 站（共 5 站）',
    notVisitedYet: '尚未打卡',
    landmarkVisited: '✓ 已成功打卡',
    storyChronicle: '历史纪事与考古解密',
    listenAudio: '收听现场语音解说',
    askGuideAboutThis: '就此景点向向导提问',
    closeBtn: '关闭',
    viewDistance: '查看步行距离',
    interactiveMapTitle: '佩特拉实景路线交互地图',
    interactiveMapSubtitle: '点击真实路线上的任意岩石古迹，探寻千年历史记载并完成实地打卡',
    allVisitedNotice: '恭喜！已成功打卡佩特拉全部古迹！',
    passportTitle: '互动纳巴泰护照 (Anbat)',
    passportSubtitle: '3D互动翻页手册：旅行者身份、同伴生物羁绊以及纪念碑二维码实地验证签证。',
    sharePassport: '分享纳巴泰护照链接',
    satchelIntroStep1: '基于起始古迹 + 到访时段 + 稀有度概率的确定性可解释召唤。（传奇羱羊仅在探访完全部 5 处古迹后方可解锁）。',
    satchelIntroStep2: '您的专属纳巴泰向导档案、性格特质与可下载分享的官方佩特拉护照徽章。',
    legendaryUnlocked: '传奇羱羊已解锁！（5/5 已打卡）',
    legendaryLocked: '传奇向导锁定中（{count}/5 已打卡）',
    explainableParams: '可解释算法参数输入',
    startingLandmarkLabel: '起始探索古迹：',
    startingLandmarkHint: '影响生物栖息地与佩特拉峡谷属性偏向',
    timeOfDayLabel: '到访时段：',
    morning: '清晨 / 上午',
    afternoon: '正午 / 下午',
    duskNight: '黄昏 / 夜晚',
    openSatchelBtn: '开启纳巴泰行囊',
    openingSatchel: '正在开启行囊并召唤向导...',
    satchelSealedTitle: '您的纳巴泰行囊尚未开启',
    satchelSealedDesc: '在左侧选择您的起始古迹和到访时段，随后点击“开启行囊”召唤专属纳巴泰考古向导。',
    guideNameLabel: '向导昵称：',
    guideNamePlaceholder: '为您的向导起一个个性化名字...',
    copyShareText: '复制分享文案',
    copied: '已复制！',
    downloadBadge: '下载徽章图片',
    generating: '生成中...',
    nextExploreMap: '下一步：探索地图 →',
    askGuideBtn: '咨询向导 💬',
    companionGuideBadge: '同伴向导',
    chatWelcomeMsg: '尊敬的旅人，欢迎来到佩特拉！我是您的纳巴泰向导 {guideName}。您可以向我咨询佩特拉岩凿古迹、水利蓄水大坝、当前实时开放时间、门票价格，或佩特拉之夜活动。我的回答均实时结合 Google 搜索数据与纳巴泰官方考古档案。',
    chatGroundingLive: '实时 Google 搜索检索（Search Grounded）',
    chatOpenSatchelFirst: '请先开启行囊 🎒',
    chatGroundingBanner: '权威精准保障：向导问答基于纳巴泰官方考古文献与 Google 实时搜索数据，确保门票、开放时间与天气即时无误。',
    chatViewSiteQueue: '查看景区审核队列 →',
    chatGoogleSearchFor: '已在 Google 检索：',
    chatWebCitations: '实时网络文献来源（Google Search）：',
    chatArchives: '纳巴泰核验考古文献：',
    chatQueuedAdmin: '已自动进入景区管理员审核队列',
    chatAnswerInAdmin: '在管理后台解答',
    chatExploreWithGuide: '与向导深度探秘：',
    chatTabAll: '全部',
    chatTabLogistics: '时间与票务 🕒',
    chatTabMonuments: '古迹探秘 🏛️',
    chatTabHydraulics: '水利工程 💧',
    chatInputPlaceholder: '向 {guideName} 提问（例如：门票多少钱？卡兹尼神殿如何雕凿而成？）...',
    chatAskBtn: '发送',
    chatGroundingFooter: 'Google 实时搜索检索 + 佩特拉官方考古档案库',
    chatEmptyPromptWarning: '请先输入您想向向导提出的问题！',
    chatQueuedSuccessNotice: '该问题已自动归入景区管理后台“待解答队列”，以便考古学者审核并补充数据库。',
    chatErrorFailedToSend: '发送问题失败，请重试。',
    chatCheckingArchives: '{guideName} 正在检索 Google 与佩特拉考古档案馆...',
    chatListen: '朗读 🔊',
    chatStop: '停止',
    chatCopy: '复制',

    topMenuTitle: '主菜单',
    menuLanguage: '语言切换',
    menuScanQr: '扫码打卡',
    menuSettings: '系统设置',
    menuComplaints: '投诉与建议',
    menuLogout: '退出登录',
    menuSignIn: '立即登录',
    menuSignUp: '首次注册',
    menuProfile: '游客档案',

    authSignInTitle: '登录 ANBAT 佩特拉系统',
    authSignUpTitle: '首次访问：游客实名登记',
    authEmailLabel: '电子邮箱',
    authPasswordLabel: '登录密码',
    authConfirmPasswordLabel: '确认密码',
    authFirstNameLabel: '名字 (First Name)',
    authLastNameLabel: '姓氏 (Last Name)',
    authAgeLabel: '年龄',
    authCountryLabel: '国籍 / 常住国家',
    authFavFoodLabel: '最喜欢的约旦特色美食',
    authSignInBtn: '登录',
    authSignUpBtn: '完成注册并提交',
    authLogoutSuccess: '您已成功退出登录。',
    authAlreadyHaveAccount: '已有账号？返回普通登录',
    authFirstTimeSignUp: '首次使用？点击这里注册新账号',
    authSignUpSuccessRedirect: '✓ 账号注册成功！现已转至登录界面，请输入您的邮箱与密码进行登录。',
    authInvalidEmailError: '请输入有效的电子邮箱格式 (例如 name@example.com)。',
    authPasswordLengthError: '密码长度至少需包含 6 个字符。',
    authPasswordMismatchError: '两次输入的密码不一致！',
    authRequiredFieldsError: '请完整填写所有必填字段。',
    authInvalidCredentialsError: '邮箱或密码不正确，请核对后重试。',
    authAgeInvalidError: '请输入合理年龄（5 至 120 岁）。',

    complaintsTitle: '游客投诉与建议渠道',
    complaintsSubtitle: '约旦佩特拉发展与旅游管理局 - 官方意见反馈台',
    complaintsNameLabel: '游客姓名',
    complaintsEmailLabel: '联系邮箱',
    complaintsCategoryLabel: '反馈类别',
    complaintsSubjectLabel: '投诉或建议主题',
    complaintsDetailsLabel: '现场详情描述',
    complaintsSubmitBtn: '正式提交反馈',
    complaintsSuccessMsg: '您的投诉与建议已成功受理，已生成官方追踪编号！',
    complaintsTicketLabel: '官方追踪工单编号：',
    complaintsCloseBtn: '关闭',

    settingsTitle: '系统设置',
    settingsSoundEffects: '音效提示与通关印章音效',
    settingsOfflineMode: '离线本地数据存储',
    settingsUserData: '当前登录游客信息',
    settingsCloseBtn: '完成'
  }
};

// Formatter for live walking distance and duration in user's selected language
export function formatLocalizedWalkingDistance(
  meters: number,
  language: Language
): string {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isKm = meters >= 1000;
  const distText = isKm ? `${(meters / 1000).toFixed(1)} ${t.kmUnit}` : `${meters} ${t.metersUnit}`;

  const seconds = Math.round(meters / 1.05); // ~3.8 km/h mountain pace
  const minutes = Math.round(seconds / 60);

  let durText: string;
  if (minutes < 1) {
    durText = t.lessThanMin;
  } else if (minutes < 60) {
    durText = `${minutes} ${t.walkMinutes}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remMins = minutes % 60;
    durText = remMins === 0 ? `${hours} ${t.walkHours}` : `${hours}h ${remMins}m`;
  }

  switch (language) {
    case 'ar':
      return `يبعد عنك ${distText} - ${durText}`;
    case 'zh':
      return `距离 ${distText} - 步行 ${durText.replace('步行', '')}`;
    case 'fr':
      return `À ${distText} - ${durText}`;
    case 'es':
      return `A ${distText} - ${durText}`;
    case 'de':
      return `${distText} entfernt - ${durText}`;
    case 'it':
      return `A ${distText} - ${durText}`;
    default:
      return `${distText} away - ${durText}`;
  }
}

// Multilingual names and descriptions for all 17 Monuments
export const MONUMENT_LOCALIZATIONS: Record<string, Record<Language, { name: string; desc: string }>> = {
  bab_as_siq: {
    ar: { name: 'باب السيق وضريح المسلات', desc: 'مدخل الوادي المؤدي إلى السيق وضريح المسلات الصخرية الأربع وقاعة المآدب الجنائزية.' },
    en: { name: 'Bab as-Siq & Obelisk Tomb', desc: 'The valley gateway with four soaring pyramidion obelisks honoring ancestral spirits.' },
    fr: { name: 'Bab as-Siq et Tombeau aux Obélisques', desc: 'L\'entrée de la vallée ornée de quatre obélisques monumentaux au-dessus d\'un triclinium.' },
    es: { name: 'Bab as-Siq y Tumba de los Obeliscos', desc: 'Acceso monumental al valle con cuatro obeliscos piramidales sobre la sala de banquetes funerarios.' },
    de: { name: 'Bab as-Siq & Obeliskengrab', desc: 'Der majestätische Taleingang mit vier hoch aufragenden Obelisken über einem Grabsaal.' },
    it: { name: 'Bab as-Siq e Tomba degli Obelischi', desc: 'L\'ingresso monumentale della gola con quattro obelischi piramidali sopra la sala funebre.' },
    zh: { name: '西克门与方尖碑之墓', desc: '通往西克峡谷的大门，四座雄伟的方尖石碑耸立于岩石宴饮大厅之上。' }
  },
  djinn_blocks: {
    ar: { name: 'كتل الجن الصخرية', desc: 'ثلاثة مكعبات حجرية صخرية ضخمة نُحتت لحراسة مدخل المدينة ومباركة القوافل.' },
    en: { name: 'The Djinn Blocks', desc: 'Three massive monolithic freestanding sandstone cubes guarding the outer gateway.' },
    fr: { name: 'Les Blocs des Djinns', desc: 'Trois cubes monumentaux en grès érigés pour protéger l\'entrée sacrée de Pétra.' },
    es: { name: 'Los Bloques de los Djinns', desc: 'Tres gigantescos bloques monolíticos tallados como monumentos sagrados guardianes.' },
    de: { name: 'Die Dschinn-Blöcke', desc: 'Drei gewaltige freistehende Sandsteinquader als Wächterdenkmäler der Stadt.' },
    it: { name: 'I Blocchi dei Djinn', desc: 'Tre giganteschi monoliti scolpiti a difesa e benedizione delle carovane in arrivo.' },
    zh: { name: '精灵石块', desc: '三块巨大的独立砂岩巨石，作为守护佩特拉入口的神圣纪念碑。' }
  },
  siq: {
    ar: { name: 'مدخل السيق الصخري', desc: 'الممر الصخري الأسطوري بارتفاع 80 متراً مع قنوات مائية فخارية محفورة في الصخر.' },
    en: { name: 'The Siq Gorge Entrance', desc: 'The 1.2km winding chasm enclosed by 80-meter vertical cliffs and ancient water channels.' },
    fr: { name: 'L\'Entrée des Gorges du Siq', desc: 'Le défilé sinueux de 1,2 km bordé de falaises de 80 m et d\'aqueducs nabatéens en terre cuite.' },
    es: { name: 'Entrada del Desfiladero del Siq', desc: 'El legendario cañón de 1.2 km flanqueado por acantilados de 80 metros y canales de agua.' },
    de: { name: 'Eingang zur Siq-Schlucht', desc: 'Die berühmte 1,2 km lange Felsschlucht mit 80 m hohen Steilwänden und Terracotta-Kanälen.' },
    it: { name: 'Ingresso della Gola del Siq', desc: 'La spettacolare gola di 1,2 km incastonata tra pareti rocciose di 80 metri e canali d\'acqua.' },
    zh: { name: '西克峡谷入口', desc: '全长1.2公里的蜿蜒狭窄峡谷，两侧悬崖高耸达80米，崖壁上保留着古老陶土引水渠。' }
  },
  siq_dam: {
    ar: { name: 'سد السيق ونفق المظلم', desc: 'سد حجري ونفق بطول 88 متراً صممه الأنباط عام 50م لتحويل السيول الجارفة بعيداً عن الزوار.' },
    en: { name: 'The Siq Dam & Al-Mudhlim Tunnel', desc: 'Engineered in 50 AD to divert dangerous winter flash floods into an 88m mountain tunnel.' },
    fr: { name: 'Le Barrage du Siq et Tunnel Al-Mudhlim', desc: 'Chef-d\'œuvre de 50 ap. J.-C. détournant les crues hivernales dans un tunnel creusé de 88 m.' },
    es: { name: 'La Presa del Siq y Túnel Al-Mudhlim', desc: 'Obra maestra hidráulica del 50 d.C. para desviar inundaciones torrenciales a través de un túnel.' },
    de: { name: 'Siq-Staudamm & Al-Mudhlim-Tunnel', desc: 'Meisterwerk der Ingenieurskunst aus dem Jahr 50 n. Chr. zur Flutumleitung durch einen 88m Tunnel.' },
    it: { name: 'Diga del Siq e Tunnel Al-Mudhlim', desc: 'Straordinaria opera idraulica del 50 d.C. costruita per deviare le inondazioni in una galleria di 88 m.' },
    zh: { name: '西克大坝与黑暗隧道', desc: '公元50年纳巴泰人建造的水利奇迹，通过88米手工开凿隧道拦截山洪确保游人安全。' }
  },
  treasury: {
    ar: { name: 'الخزنة', desc: 'الواجهة الملكية الصخرية الشهيرة بارتفاع 39.5 متراً للملك الحارث الرابع متوجة بالجرة الصخرية.' },
    en: { name: 'Al-Khazneh (The Treasury)', desc: 'Petra’s iconic 39.5m royal mausoleum carved into the rose-red mountain bedrock.' },
    fr: { name: 'Al-Khazneh (Le Trésor)', desc: 'Le mausolée royal emblématique de 39,5 m sculpté dans la roche de grès rose.' },
    es: { name: 'Al-Khazneh (El Tesoro)', desc: 'El icónico mausoleo real de 39.5 m labrado directamente en la roca de arenisca rosa.' },
    de: { name: 'Al-Khazneh (Das Schatzhaus)', desc: 'Das weltberühmte 39,5 m hohe königliche Felsengrab im rosaroten Sandstein.' },
    it: { name: 'Al-Khazneh (Il Tesoro)', desc: 'Il celebre mausoleo reale alto 39,5 metri scolpito nella roccia arenaria rosa.' },
    zh: { name: '卡兹尼神殿（宝库）', desc: '佩特拉最著名的标志性建筑，高39.5米，由整座粉红砂岩山体直接依山雕凿而成。' }
  },
  facades: {
    ar: { name: 'شارع الواجهات', desc: 'عشرات المدافن الصخرية المنحوتة في تدرجات الجبل شيدتها عائلات تجار البخور والتوابل.' },
    en: { name: 'Street of Facades', desc: 'Dozens of tiered rock-cut tombs with crowstep cornices built by prominent merchant clans.' },
    fr: { name: 'La Rue des Façades', desc: 'Des dizaines de tombeaux taillés en terrasses appartenant aux grandes familles de marchands.' },
    es: { name: 'Calle de las Fachadas', desc: 'Decenas de tumbas excavadas en la roca en varios niveles por mercaderes nabateos.' },
    de: { name: 'Fassadenstraße', desc: 'Dutzende gestaffelte Felsgräber mit Zinnen-Friesen der wohlhabenden Händlerfamilien.' },
    it: { name: 'Strada delle Facciate', desc: 'Decine di tombe rupestri a più livelli appartenute alle illustri famiglie mercantili.' },
    zh: { name: '外立面之街', desc: '数十座依山层叠凿刻的岩石陵墓群，带有精美的阶梯式冠顶，由富商家族出资修造。' }
  },
  theatre: {
    ar: { name: 'المدرج النبطي / الصخري', desc: 'مسرح استثنائي حُفرت مدرجاته الـ 45 مباشرة في بطن الجبل الصخري ويتسع لـ 8000 متفرج.' },
    en: { name: 'The Rock-Cut Theatre', desc: 'A monumental amphitheater hewn straight out of living sandstone seating over 8,000 citizens.' },
    fr: { name: 'Le Théâtre Nabatéen Taillé', desc: 'Un amphithéâtre taillé à même la montagne de grès, pouvant accueillir plus de 8 000 spectateurs.' },
    es: { name: 'Teatro Nabateo Excavado', desc: 'Amfiteatro monumental tallado en la roca viva con capacidad para más de 8.000 personas.' },
    de: { name: 'Das Felsentheater', desc: 'Ein gigantisches, direkt in den Fels gehauenes Amphitheater für über 8.000 Zuschauer.' },
    it: { name: 'Il Teatro Nabateo', desc: 'Un grandioso anfiteatro scolpito direttamente nella roccia, capace di oltre 8.000 spettatori.' },
    zh: { name: '纳巴泰露天岩石剧场', desc: '完全从整座山崖岩石中凿刻而出的庞大圆形剧场，拥有45排石阶，可容纳8000多名观众。' }
  },
  urn_tomb: {
    ar: { name: 'المحكمة وقبر الجرة', desc: 'أعظم القبور الملكية بأروقة مقوسة ضخمة حُوّل إلى كاتدرائية ومحكمة مدنية عام 446م.' },
    en: { name: 'The Urn Tomb (The Court)', desc: 'Colossal Royal Tomb featuring multi-storey arched vaults, converted to cathedral in 446 AD.' },
    fr: { name: 'Le Tombeau à l\'Urne (Le Tribunal)', desc: 'Tombeau royal grandiose aux voûtes monumentales, transformé en cathédrale byzantine en 446.' },
    es: { name: 'Tumba de la Urna (El Tribunal)', desc: 'Monumento colosal con arquerías abovedadas de varios pisos, convertido en catedral en el 446 d.C.' },
    de: { name: 'Das Urnengrab (Der Gerichtshof)', desc: 'Monumentales Königsgrab auf gewaltigen Bogengewölben, 446 n. Chr. zur Kathedrale geweiht.' },
    it: { name: 'La Tomba dell\'Urna (Il Tribunale)', desc: 'Imponente tomba reale con arcate monumentali, trasformata in cattedrale bizantina nel 446 d.C.' },
    zh: { name: '骨灰瓮陵墓（法院）', desc: '佩特拉皇家陵墓群中最为宏伟的一座，基座建有多层拱券拱廊，公元446年曾改建为主教大教堂。' }
  },
  corinthian_tomb: {
    ar: { name: 'القبر الكورنثي وقبر الحرير', desc: 'مدافن تشتهر بتموجات ألوان الصخر الطبيعية النادرة بتدرجات الأرجوان والذهب والوردي.' },
    en: { name: 'Corinthian & Silk Tombs', desc: 'Famed for natural swirling sandstone bands of magenta, gold, and delicate lavender.' },
    fr: { name: 'Tombeaux Corinthien et de la Soie', desc: 'Célèbres pour les motifs géologiques ondulants aux teintes pourpres, or et lilas.' },
    es: { name: 'Tumbas Corintia y de la Seda', desc: 'Famosas por las ondas de arenisca multicolor con tonos magenta, dorados y lavanda.' },
    de: { name: 'Korinthisches & Seidengrab', desc: 'Berühmt für die faszinierenden Naturfarbwellen im Sandstein in Purpur, Ocker und Gold.' },
    it: { name: 'Tomba Corinzia e della Seta', desc: 'Famose per le meravigliose venature multicolori naturali della roccia arenaria.' },
    zh: { name: '科林斯之墓与丝绸之墓', desc: '以天然砂岩如波浪般流动的绚丽矿物纹理著称，交织着品红、金黄与薰衣草紫等梦幻色泽。' }
  },
  palace_tomb: {
    ar: { name: 'قبر القصر الملكي', desc: 'أعرض صرح صخري في بترا بعرض 49 متراً وخمسة طوابق تحاكي القصور الرومانية الإمبراطورية.' },
    en: { name: 'The Palace Tomb', desc: 'Petra’s widest facade at 49m spanning five tiers, styled after imperial Roman palaces.' },
    fr: { name: 'Le Tombeau du Palais', desc: 'La plus large façade de Pétra (49 m) sur cinq niveaux inspirée des palais romains.' },
    es: { name: 'La Tumba del Palacio', desc: 'La fachada más ancha de Petra (49 m) en cinco pisos inspirada en palacios imperiales.' },
    de: { name: 'Das Palastgrab', desc: 'Mit 49 Metern die breiteste Felsenfront Petras, gestaltet nach römischen Palästen.' },
    it: { name: 'La Tomba del Palazzo', desc: 'La facciata più ampia di Petra (49 m) su cinque livelli a imitazione dei palazzi imperiali.' },
    zh: { name: '宫殿陵墓', desc: '佩特拉宽度最大（49米）的岩石建筑外立面，共分为五层，模仿罗马帝国皇家宫殿风格。' }
  },
  sextius_florentinus: {
    ar: { name: 'ضريح سيكستيوس فلورنتينوس', desc: 'شُيد عام 130م للحاكم الروماني الذي أوصى بدفنه في بترا بنقوش لاتينية فخمة.' },
    en: { name: 'Tomb of Sextius Florentinus', desc: 'Carved in 130 AD for the Roman governor of Arabia with Latin dedicatory inscriptions.' },
    fr: { name: 'Tombeau de Sextius Florentinus', desc: 'Sculpté en 130 pour le gouverneur romain d\'Arabie qui demanda à être inhumé à Pétra.' },
    es: { name: 'Tumba de Sextius Florentinus', desc: 'Monumento del 130 d.C. para el gobernador romano de Arabia con inscripciones en latín.' },
    de: { name: 'Grab des Sextius Florentinus', desc: 'Erbaut 130 n. Chr. für den römischen Statthalter von Arabia mit lateinischer Inschrift.' },
    it: { name: 'Tomba di Sestio Florentino', desc: 'Monumento del 130 d.C. con iscrizione latina dedicato al governatore romano d\'Arabia.' },
    zh: { name: '弗洛伦蒂努斯之墓', desc: '建于公元130年，纪念热爱佩特拉的罗马帝国阿拉伯行省总督，正门上方镌刻着拉丁文铭文。' }
  },
  byzantine_church: {
    ar: { name: 'الكنيسة البيزنطية ولفائف البردي', desc: 'كنيسة بازيليكية من القرن الخامس تضم أرضيات فسيفساء واكتشف فيها 140 لفافة بردي نادرة.' },
    en: { name: 'Byzantine Church & Petra Papyri', desc: '5th-century basilica with preserved floor mosaics where 140 carbonized scrolls were unearthed.' },
    fr: { name: 'Église Byzantine et Papyrus de Pétra', desc: 'Basilique du Ve siècle aux splendides mosaïques au sol ayant abrité 140 rouleaux de papyrus.' },
    es: { name: 'Iglesia Bizantina y Papiros de Petra', desc: 'Basílica del siglo V con mosaicos en el suelo donde se hallaron 140 rollos de papiro.' },
    de: { name: 'Byzantinische Kirche & Petra-Papyri', desc: 'Basilika aus dem 5. Jh. mit Mosaikböden und Fundort von 140 verkohlten Papyri-Rollen.' },
    it: { name: 'Chiesa Bizantina e Papiri di Petra', desc: 'Basilica del V secolo con magnifici mosaici pavimentali e archivio di 140 papiri.' },
    zh: { name: '拜占庭教堂与佩特拉纸莎草', desc: '公元5世纪早期基督教长方形巴西利卡教堂，拥有极其精美的地中海马赛克地面，曾出土140卷古档案纸莎草。' }
  },
  colonnaded_street: {
    ar: { name: 'الشارع المعمد وبوابة تيمنوس', desc: 'الشارع الرخامي المرصوف والقلب التجاري لبترا وينتهي ببوابة تيمنوس الضخمة.' },
    en: { name: 'Colonnaded Street & Temenos Gate', desc: 'Paved central shopping avenue leading to the sacred gateway with lion relief carvings.' },
    fr: { name: 'Rue à Colonnades et Porte du Téménos', desc: 'Avenue marchande bordée de colonnes menant à la porte sacrée du sanctuaire.' },
    es: { name: 'Calle Columnada y Puerta de Témenos', desc: 'Avenida comercial pavimentada flanqueada por columnas que conduce al pórtico sagrado.' },
    de: { name: 'Kolonnadenstraße & Temenos-Tor', desc: 'Gepflasterte Prachtstraße mit Säulenportiken und dem monumentalen Temenos-Tor.' },
    it: { name: 'Strada Colonnata e Porta del Temenos', desc: 'La grande via monumentale lastricata con colonne che conduce alla porta sacra.' },
    zh: { name: '列柱街与圣殿大门', desc: '佩特拉古城繁华的石板铺装商业主干道，两侧排列着砂岩石柱，通往圣殿区巍峨的大门。' }
  },
  great_temple: {
    ar: { name: 'المعبد الكبير الجنوبي', desc: 'أضخم مجمع معماري مدني وديني بمساحة 7000 متر مربع يضم مجلساً تشريعياً وتيجان رؤوس الفيلة.' },
    en: { name: 'The Great Temple', desc: 'A 7,000 sq meter civic-sacred complex with a 600-seat council hall and elephant capitals.' },
    fr: { name: 'Le Grand Temple', desc: 'Complexe religieux et civil de 7 000 m² abritant un odéon de 600 places et des chapiteaux à éléphants.' },
    es: { name: 'El Gran Templo', desc: 'Complejo cívico-sagrado de 7.000 m² con un odeón para 600 personas y capiteles con elefantes.' },
    de: { name: 'Der Große Tempel', desc: 'Ein 7.000 m² großer Tempel- und Regierungsbezirk mit einem 600-Sitze-Theaterratssaal.' },
    it: { name: 'Il Grande Tempio', desc: 'Imponente complesso civico e sacro di 7.000 mq con odeon da 600 posti e capitelli a testa d\'elefante.' },
    zh: { name: '大神庙', desc: '占地7000平方米的庞大行政与宗教建筑群，内藏可容纳600人的纳巴泰议事厅及雕刻有亚洲象头的珍贵柱顶。' }
  },
  qasr_al_bint: {
    ar: { name: 'قصر البنت (معبد ذو الشرى)', desc: 'المعبد الحجري المشيد الوحيد القائم بذاته في بترا وصمد أمام الزلازل بفضل وسائد خشب العرعر.' },
    en: { name: 'Qasr al-Bint Temple', desc: 'Petra’s supreme freestanding temple, built around 30 BC with earthquake-proof wooden tie-beams.' },
    fr: { name: 'Temple Qasr al-Bint', desc: 'Temple principal autoportant de Pétra, bâti vers 30 av. J.-C. avec poutres antisismiques.' },
    es: { name: 'Templo Qasr al-Bint', desc: 'El templo exento principal de Petra, erigido hacia el 30 a.C. con vigas de madera antisísmicas.' },
    de: { name: 'Qasr al-Bint Tempel', desc: 'Petras Haupttempel aus Quadermauerwerk (30 v. Chr.) mit erdbebensicheren Holzbalken.' },
    it: { name: 'Tempio Qasr al-Bint', desc: 'Il principale tempio in muratura di Petra (30 a.C.) costruito con speciali travi antisismiche.' },
    zh: { name: '女儿宫（杜莎拉神庙）', desc: '佩特拉古城核心区唯一一座非依山凿刻的独立石砌大型主神庙，建于公元前30年，拥有独特的抗震杜松木梁结构。' }
  },
  lion_triclinium: {
    ar: { name: 'تريكلينيوم الأسد الجبلي', desc: 'صرح صخري تحرسه نقوش أسدين نبطيين على درب صعود درجات جبل الدير الوعرة.' },
    en: { name: 'The Lion Triclinium', desc: 'Rock banquet chamber guarded by two carved rampant lions along the mountain ascent.' },
    fr: { name: 'Le Triclinium aux Lions', desc: 'Salle de banquet sacrée gardée par deux lions sculptés sur le sentier escarpé du Monastère.' },
    es: { name: 'Triclinio de los Leones', desc: 'Cámara sagrada rupestre protegida por dos leones esculpidos en el camino al Monasterio.' },
    de: { name: 'Das Löwen-Triklinium', desc: 'Felsensaal bewacht von zwei Löwenreliefs am steilen Aufstiegsweg zum Kloster.' },
    it: { name: 'Il Triclinio dei Leoni', desc: 'Sala sacra rupestre custodita da due leoni scolpiti lungo la salita al Monastero.' },
    zh: { name: '狮子三卧榻祭室', desc: '隐于通往代尔修道院陡峭山径途中的神圣洞室，入口两侧由两只石雕雄狮日夜守护。' }
  },
  monastery: {
    ar: { name: 'الدير (صرح الأعالي)', desc: 'أضخم صرح في بترا بارتفاع 48 متراً بعد صعود 800 درجة صخرية مع إطلالة بانورامية على وادي عربة.' },
    en: { name: 'Ad-Deir (The Monastery)', desc: 'Petra’s most massive monument standing 48m high atop 800 rock-cut mountain steps.' },
    fr: { name: 'Ad-Deir (Le Monastère)', desc: 'Le plus imposant monument de Pétra (48 m de haut) perché au sommet de 800 marches.' },
    es: { name: 'Ad-Deir (El Monasterio)', desc: 'El monumento más masivo de Petra con 48 m de altura en la cima de 800 escalones de roca.' },
    de: { name: 'Ad-Deir (Das Kloster)', desc: 'Petras gewaltigstes Bauwerk (48m hoch) hoch oben auf dem Berg nach 800 Felsenstufen.' },
    it: { name: 'Ad-Deir (Il Monastero)', desc: 'Il più grande monumento di Petra (48 m d\'altezza) in cima a 800 gradini nella roccia.' },
    zh: { name: '代尔修道院', desc: '佩特拉规模最庞大宏伟的岩雕奇观，高48米、宽47米，登上800级岩石天梯即可俯瞰壮丽的阿拉伯谷荒原。' }
  }
};

// Multilingual names and descriptions for Services
export const SERVICE_LOCALIZATIONS: Record<string, Record<Language, { name: string; desc: string }>> = {
  'svc-tickets-main': {
    ar: { name: 'مركز الزوار الرئيسي ومكتب التذاكر', desc: 'إصدار تذاكر الدخول الرسمية والتحقق من جوردان باس ودليل الزوار.' },
    en: { name: 'Main Visitor Center & Ticket Hall', desc: 'Official entry ticket issuance, Jordan Pass verification, and audio guide desks.' },
    fr: { name: 'Centre des Visiteurs et Billetterie', desc: 'Délivrance des billets officiels, validation du Jordan Pass et audioguides.' },
    es: { name: 'Centro de Visitantes y Taquilla', desc: 'Venta de boletos oficiales, validación de Jordan Pass y audioguías.' },
    de: { name: 'Besucherzentrum & Ticketschalter', desc: 'Offizielle Ticketausgabe, Jordan Pass Überprüfung und Audioguides.' },
    it: { name: 'Centro Visitatori e Biglietteria', desc: 'Emissione biglietti ufficiali, verifica Jordan Pass e audioguide.' },
    zh: { name: '游客中心与官方售票大厅', desc: '佩特拉官方门票发售处，约旦通票核验与多语言语音导览租赁柜台。' }
  },
  'svc-info-siq': {
    ar: { name: 'مركز استعلامات مدخل السيق والمراقبين', desc: 'نقطة إرشاد سياحي وخرائط المسارات المعتمدة وتنبيهات الطقس.' },
    en: { name: 'Siq Trailhead Information & Rangers', desc: 'Ranger post, trail maps, weather alerts, and authorized local guide bookings.' },
    fr: { name: 'Poste d\'Information du Siq et Guides', desc: 'Poste des gardes forestiers, plans des sentiers et alertes météo.' },
    es: { name: 'Puesto de Información del Siq', desc: 'Punto de guardaparques, mapas oficiales y avisos de seguridad.' },
    de: { name: 'Siq-Infozentrum & Ranger-Posten', desc: 'Ranger-Posten, Wanderkarten, Wetterwarnungen und autorisierte Guides.' },
    it: { name: 'Punto Informazioni del Siq', desc: 'Postazione ranger, mappe dei sentieri e informazioni meteo.' },
    zh: { name: '西克峡谷起点咨询与巡警站', desc: '佩特拉向导咨询、官方徒步地图索取与山谷天气预警服务。' }
  },
  'svc-medical-siq': {
    ar: { name: 'عيادة الطوارئ والإسعاف - مدخل السيق', desc: 'نقطة طبية مجهزة بالكوادر الإسعافية وعربات الإخلاء الكهربائية.' },
    en: { name: 'Siq Emergency Medical Post', desc: 'Equipped medical clinic with first aid responders and emergency evacuation carts.' },
    fr: { name: 'Poste Médical d\'Urgence du Siq', desc: 'Clinique de premiers secours avec voiturettes d\'évacuation d\'urgence.' },
    es: { name: 'Puesto Médico de Emergencias del Siq', desc: 'Clínica equipada con socorristas y carritos de evacuación eléctrica.' },
    de: { name: 'Notfall-Sanitätsstation Siq', desc: 'Medizinische Erste-Hilfe-Station mit Rettungskräften und Elektro-Krankenwagen.' },
    it: { name: 'Presidio Medico di Emergenza del Siq', desc: 'Ambulatorio di primo soccorso con carrelli elettrici per evacuazione.' },
    zh: { name: '西克入口急救医疗站', desc: '配备专业急救医护人员、外伤急救药品及全地形应急转运电动车。' }
  },
  'svc-wc-siq': {
    ar: { name: 'دورات مياه عامة - بوابة السيق', desc: 'مرافق صحية حديثة ومجهزة لذوي الاحتياجات الخاصة ومغاسل.' },
    en: { name: 'Public Restrooms - Siq Entrance', desc: 'Modern sanitary facilities, accessible toilets, and baby care station.' },
    fr: { name: 'Toilettes Publiques - Entrée du Siq', desc: 'Sanitaires modernes, accès PMR et coin à langer.' },
    es: { name: 'Baños Públicos - Entrada del Siq', desc: 'Instalaciones sanitarias modernas y baños accesibles.' },
    de: { name: 'Öffentliche Toiletten - Siq-Eingang', desc: 'Moderne sanitäre Anlagen, barrierefreie Toiletten und Waschräume.' },
    it: { name: 'Servizi Igienici Pubblici - Ingresso Siq', desc: 'Servizi igienici moderni e bagni accessibili a persone disabili.' },
    zh: { name: '公共洗手间 - 西克峡谷入口', desc: '现代化卫生设施，配有无障碍卫生间及母婴护理台。' }
  },
  'svc-rest-treasury': {
    ar: { name: 'استراحة ومقهى ساحة الخزنة', desc: 'شاي بدوي بالمرمية وقهوة عربية وظلال للاستراحة أمام واجهة الخزنة.' },
    en: { name: 'Al-Khazneh Bedouin Cafe & Rest', desc: 'Authentic Bedouin sage tea, Arabic cardamom coffee, and shade benches.' },
    fr: { name: 'Café Bédouin de la Trésorerie', desc: 'Thé bédouin à la sauge, café à la cardamome et bancs ombragés face au Trésor.' },
    es: { name: 'Café Beduino de El Tesoro', desc: 'Té beduino con salvia, café con cardamomo y áreas de sombra frente a la fachada.' },
    de: { name: 'Beduinen-Café am Schatzhaus', desc: 'Traditioneller Salbeitee, Kardamomkaffee und schattige Bänke vor der Fassade.' },
    it: { name: 'Caffè Beduino del Tesoro', desc: 'Tè beduino alla salvia, caffè arabo e panche all\'ombra davanti al monumento.' },
    zh: { name: '卡兹尼神殿贝都因茶室与休息亭', desc: '提供地道贝都因鼠尾草茶、阿拉伯豆蔻咖啡与遮阳休息长椅。' }
  },
  'svc-water-treasury': {
    ar: { name: 'نقطة مياه شرب ومستلزمات - الخزنة', desc: 'مياه شرب معبأة وعصائر طازجة وقبعات واقية من الشمس.' },
    en: { name: 'Drinking Water & Sun Supplies - Treasury', desc: 'Cold bottled spring water, mineral hydration drinks, and sun hats.' },
    fr: { name: 'Point d\'Eau et Fraîcheur - Trésor', desc: 'Eau minérale fraîche, boissons hydratantes et chapeaux de soleil.' },
    es: { name: 'Punto de Agua y Protección Solar', desc: 'Agua mineral fría embotellada, bebidas isotónicas y sombreros.' },
    de: { name: 'Trinkwasser- & Sonnenschutz-Station', desc: 'Kühles Quellwasser in Flaschen, isotonische Getränke und Sonnenhüte.' },
    it: { name: 'Punto Rinfresco e Acqua - Il Tesoro', desc: 'Acqua minerale fresca, bevande idratanti e cappelli parasole.' },
    zh: { name: '饮用水补给与防晒品站 - 宝库广场', desc: '冰镇矿泉水、电解质补水饮品、遮阳草帽及防晒用品。' }
  },
  'svc-wc-theatre': {
    ar: { name: 'دورات مياه عامة - المدرج والواجهات', desc: 'مرافق صحية ومغاسل نظيفة تخدم منطقة المدرج وشارع الواجهات.' },
    en: { name: 'Public Restrooms - Theatre Plaza', desc: 'Maintained sanitation facilities serving Theatre and Street of Facades.' },
    fr: { name: 'Toilettes Publiques - Esplanade du Théâtre', desc: 'Sanitaires entretenus desservant le Théâtre et la Rue des Façades.' },
    es: { name: 'Baños Públicos - Explanada del Teatro', desc: 'Servicios sanitarios junto al Teatro y la Calle de las Fachadas.' },
    de: { name: 'Öffentliche WCs - Theaterplatz', desc: 'Gepflegte Sanitäreinrichtungen am Theater und der Fassadenstraße.' },
    it: { name: 'Servizi Igienici Pubblici - Area Teatro', desc: 'Servizi igienici pubblici a servizio del Teatro e delle Facciate.' },
    zh: { name: '公共洗手间 - 剧场与外立面广场', desc: '维护完善的公共卫生间，服务于露天剧场与外立面之街区域。' }
  },
  'svc-info-basin': {
    ar: { name: 'مركز استعلامات حوض الوادي والشارع المعمد', desc: 'معلومات مسار الدير وإرشادات الطقس ونقاط تجمع الزوار.' },
    en: { name: 'Basin Central Information Hub', desc: 'Guidance for Ad-Deir mountain ascent, trail difficulty advisories.' },
    fr: { name: 'Point Info Central du Bassin', desc: 'Informations pour l\'ascension du Monastère et niveau de difficulté.' },
    es: { name: 'Punto de Información Central del Valle', desc: 'Asesoramiento para la subida al Monasterio y consejos sobre el sendero.' },
    de: { name: 'Zentraler Infopunkt am Becken', desc: 'Tipps zum Aufstieg nach Ad-Deir und aktuelle Schwierigkeitsstufen.' },
    it: { name: 'Punto Informazioni del Bacino', desc: 'Consigli per la salita al Monastero e stato dei sentieri montani.' },
    zh: { name: '古城盆地中央游客咨询中心', desc: '修道院攀登路径指南、山顶天气通报与步道安全指引。' }
  },
  'svc-wc-basin': {
    ar: { name: 'دورات مياه عامة - مجمع الحوض وقصر البنت', desc: 'مرافق صحية كبرى مجهزة ومغاسل بالقرب من قصر البنت.' },
    en: { name: 'Public Restrooms - Basin & Qasr al-Bint', desc: 'Major restroom complex with accessible stalls near Qasr al-Bint.' },
    fr: { name: 'Toilettes Publiques - Bassin et Qasr al-Bint', desc: 'Grand complexe sanitaire avec cabines accessibles près de Qasr al-Bint.' },
    es: { name: 'Baños Públicos - Qasr al-Bint', desc: 'Gran complejo de sanitarios públicos accesibles cerca de Qasr al-Bint.' },
    de: { name: 'Große Toilettenanlage - Qasr al-Bint', desc: 'Großzügige WC-Anlage mit barrierefreien Kabinen nahe Qasr al-Bint.' },
    it: { name: 'Grandi Servizi Igienici - Qasr al-Bint', desc: 'Ampio complesso di servizi igienici accessibili vicino a Qasr al-Bint.' },
    zh: { name: '大型公共洗手间 - 女儿宫与盆地综合区', desc: '大型无障碍公共卫生间设施，位于女儿宫遗址步行约2分钟处。' }
  },
  'svc-rest-basin': {
    ar: { name: 'مطعم الحوض السياحي والاستراحة الكبرى', desc: 'بوفيه طعام ومأكولات أردنية ساخنة ومشروبات باردة قبل صعود الدير.' },
    en: { name: 'The Basin Restaurant & Oasis', desc: 'Full lunch buffet, Jordanian culinary specialties, and shaded dining terrace.' },
    fr: { name: 'Restaurant du Bassin et Oasis', desc: 'Buffet déjeuner, spécialités jordaniennes et terrasse ombragée.' },
    es: { name: 'Restaurante y Oasis del Valle', desc: 'Buffet de almuerzo, platos jordanos y gran terraza a la sombra.' },
    de: { name: 'Restaurant Das Becken & Oase', desc: 'Großes Mittagsbuffet, jordanische Spezialitäten und Schattenterrasse.' },
    it: { name: 'Ristorante e Oasi del Bacino', desc: 'Buffet con specialità giordane e ampia terrazza all\'ombra.' },
    zh: { name: '盆地绿洲餐厅与综合休息站', desc: '提供丰富冷热自助午餐、地道约旦特色佳肴与宽敞绿荫就餐露台。' }
  },
  'svc-medical-basin': {
    ar: { name: 'عيادة الهلال الأحمر للإسعاف الميداني', desc: 'نقطة طوارئ وإسعافات مجهزة بأكسجين ونقالات وعلاج الإجهاد الحراري.' },
    en: { name: 'Red Crescent Medical & Rescue Post', desc: 'Emergency clinic equipped with oxygen, stretchers, and heat exhaustion treatment.' },
    fr: { name: 'Poste Médical du Croissant-Rouge', desc: 'Poste de secours avec oxygène, brancards et soins d\'urgence pour insolation.' },
    es: { name: 'Puesto de Socorro de la Media Luna Roja', desc: 'Clínica de emergencias con oxígeno, camillas y atención para golpes de calor.' },
    de: { name: 'Roter Halbmond Rettungsstation', desc: 'Notfallklinik mit Sauerstoff, Tragen und Behandlung von Hitzschlägen.' },
    it: { name: 'Posto Medico della Mezzaluna Rossa', desc: 'Ambulatorio di emergenza con ossigeno, barelle e cure per insolazione.' },
    zh: { name: '红新月会野外应急医疗急救站', desc: '配备医用便携式氧气瓶、专业救援担架与高温中暑急救设备。' }
  },
  'svc-rest-monastery': {
    ar: { name: 'مقهى قمة الدير البانورامي', desc: 'إطلالة ساحرة على واجهة الدير ووادي عربة مع عصائر الرمان والشاي البدوي.' },
    en: { name: 'Ad-Deir Summit Panoramic Cafe', desc: 'Spectacular views facing the Monastery and Wadi Araba with fresh juices.' },
    fr: { name: 'Café Panoramique du Sommet d\'Ad-Deir', desc: 'Vue imprenable sur le Monastère et le Wadi Araba avec jus de grenade frais.' },
    es: { name: 'Café Panorámico de la Cumbre del Monasterio', desc: 'Vistas asombrosas del Monasterio y el desierto con zumos de granada frescos.' },
    de: { name: 'Ad-Deir Gipfel-Panoramacafé', desc: 'Grandioser Ausblick auf das Kloster und Wadi Araba mit frischem Granatapfelsaft.' },
    it: { name: 'Caffè Panoramico della Vetta di Ad-Deir', desc: 'Spettacolare vista sul Monastero e il Wadi Araba con spremute fresche.' },
    zh: { name: '代尔修道院巅峰全景观景茶吧', desc: '正对代尔修道院岩雕奇景与阿拉伯谷壮阔峡谷，提供鲜榨红石榴汁与香浓热红茶。' }
  },
  'svc-wc-monastery': {
    ar: { name: 'دورات مياه قمة جبل الدير', desc: 'مرافق صحية بيئية تخدم زوار قمة الدير والمطلات العالية.' },
    en: { name: 'Ad-Deir Mountain Peak Restrooms', desc: 'Eco-friendly sanitation facilities serving visitors at the mountain summit.' },
    fr: { name: 'Toilettes du Sommet d\'Ad-Deir', desc: 'Sanitaires écologiques desservant les visiteurs au sommet du massif.' },
    es: { name: 'Baños de la Cumbre del Monasterio', desc: 'Instalaciones ecológicas para los visitantes en la cima de la montaña.' },
    de: { name: 'Berg-Toiletten am Kloster Ad-Deir', desc: 'Umweltfreundliche Sanitäranlagen für Besucher auf dem Berggipfel.' },
    it: { name: 'Servizi Igienici della Vetta di Ad-Deir', desc: 'Bagni ecologici a servizio dei visitatori sulla vetta del monte.' },
    zh: { name: '代尔修道院山顶环保洗手间', desc: '为登上山顶终点的各国游客提供生态友好型清洁卫生设施。' }
  }
};

// Helper to get step title in user's active language
export function getStepTitle(stepNum: number, lang: Language): string {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  switch (stepNum) {
    case 1:
      return t.step1Title;
    case 2:
      return t.step2Title;
    case 3:
      return t.step3Title;
    case 4:
      return t.step4Title;
    case 5:
      return t.step5Title;
    case 0:
      return t.step0Title;
    default:
      return t.step1Title;
  }
}

// Helper to get localized landmark information
export function getLocalizedLandmark(
  landmark: {
    id: string;
    nameEn: string;
    nameAr: string;
    shortDescEn: string;
    shortDescAr: string;
    subtitleEn?: string;
    subtitleAr?: string;
    curatedStoryEn?: string;
    curatedStoryAr?: string;
  },
  lang: Language
): { name: string; desc: string; subtitle: string; story: string } {
  const loc = MONUMENT_LOCALIZATIONS[landmark.id]?.[lang];
  const name = loc?.name || (lang === 'ar' ? landmark.nameAr : landmark.nameEn);
  const desc = loc?.desc || (lang === 'ar' ? landmark.shortDescAr : landmark.shortDescEn);
  const subtitle = lang === 'ar' ? (landmark.subtitleAr || '') : (landmark.subtitleEn || '');
  const story = lang === 'ar' ? (landmark.curatedStoryAr || '') : (landmark.curatedStoryEn || '');

  return { name, desc, subtitle, story };
}

// Helper to get localized service information
export function getLocalizedService(
  service: {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
  },
  lang: Language
): { name: string; desc: string } {
  const loc = SERVICE_LOCALIZATIONS[service.id]?.[lang];
  const name = loc?.name || (lang === 'ar' ? service.nameAr : service.nameEn);
  const desc = loc?.desc || (lang === 'ar' ? service.descriptionAr : service.descriptionEn);
  return { name, desc };
}

// Creature localized dictionaries for all 4 companions across all 7 languages
const CREATURE_LOCALIZATIONS: Record<string, Record<Language, { name: string; title: string; lore: string }>> = {
  camel: {
    ar: {
      name: 'الجَمَّال (الجمل النبطي)',
      title: 'دليل القوافل ومسالك الماء',
      lore: 'صبور، لا يكل، ويحفظ في ذاكرته الفطرية كل نبع خفي وصهريج حُفر في بطون الجبال. قاد قوافل اللبان والبخور عبر رمال الصحراء بأمان إلى بوابات بترا.'
    },
    en: {
      name: 'Al-Jammal (Camel)',
      title: 'Caravan Master of the Water Trails',
      lore: 'Patient, tireless, and possessing ancestral memory of every hidden spring and cistern carved into the canyons. Al-Jammal guided frankincense merchants across the burning sands to Petra’s gates.'
    },
    fr: {
      name: 'Al-Jammal (Chameau Nabatéen)',
      title: 'Maître des caravanes et des pistes d’eau',
      lore: 'Patient, infatigable et doté de la mémoire ancestrale de chaque source et citerne cachée au creux des canyons. Al-Jammal guidait les marchands d’encens à travers les sables brûlants jusqu’aux portes de Pétra.'
    },
    es: {
      name: 'Al-Jammal (Camello Nabateo)',
      title: 'Maestro de caravanas y senderos de agua',
      lore: 'Paciente, incansable y poseedor de la memoria ancestral de cada manantial y cisterna oculta en los cañones. Al-Jammal guió a los comerciantes de incienso a través de las arenas ardientes hasta las puertas de Petra.'
    },
    de: {
      name: 'Al-Jammal (Nabatäisches Kamel)',
      title: 'Karawanenmeister der Wasserpfade',
      lore: 'Geduldig, unermüdlich und mit dem uralten Wissen um jede verborgene Quelle und Zisterne in den Schluchten. Al-Jammal führte Weihrauchhändler sicher durch den brennenden Sand zu den Toren Petras.'
    },
    it: {
      name: 'Al-Jammal (Cammello Nabateo)',
      title: 'Maestro delle carovane e sentieri d’acqua',
      lore: 'Paziente, instancabile e custode della memoria ancestrale di ogni sorgente e cisterna scavata nei canyon. Al-Jammal guidava i mercanti d’incenso attraverso le sabbie ardenti fino alle porte di Petra.'
    },
    zh: {
      name: '贾迈勒 (纳巴泰骆驼)',
      title: '水脉商队引领大师',
      lore: '坚韧沉稳、不知疲倦，铭记着峡谷岩壁上每一处隐秘泉眼与蓄水池的远古记忆。贾迈勒曾护引乳香商队穿过灼热沙漠，安全抵达佩特拉城门。'
    }
  },
  scorpion: {
    ar: {
      name: 'العَقْرَب (عقرب الشقوق)',
      title: 'حارس المحاريب والظلال الوردية',
      lore: 'يعيش في هدوء بين شقوق الصخر ومحاريب الأنصاب المقدسة في جدران الوادي. يشعر بأدق الهزات الصخرية ويحرس النقوش القديمة من المتطفلين.'
    },
    en: {
      name: 'Al-Aqrab (Scorpion)',
      title: 'Sentinel of the Rose Shadow Shrines',
      lore: 'Dwelling silently in the shaded clefts and sacred betyl niches of the canyon walls. Al-Aqrab detects every seismic tremor and protects the secret inscriptions from reckless intruders.'
    },
    fr: {
      name: 'Al-Aqrab (Scorpion des Failles)',
      title: 'Sentinelle des sanctuaires de l’ombre rose',
      lore: 'Résidant silencieusement dans les failles rocheuses et les niches sacrées des parois du canyon. Al-Aqrab détecte la moindre secousse et veille sur les inscriptions antiques.'
    },
    es: {
      name: 'Al-Aqrab (Escorpión de las Grietas)',
      title: 'Centinela de los santuarios de la sombra rosa',
      lore: 'Habita en silencio en las hendiduras sombreadas y nichos sagrados de los cañones. Al-Aqrab detecta el menor temblor sísmico y protege las inscripciones sagradas.'
    },
    de: {
      name: 'Al-Aqrab (Felsenskorpion)',
      title: 'Wächter der rosafarbenen Schattenschreine',
      lore: 'Lebt lautlos in den schattigen Felsspalten und heiligen Nischen der Schluchtwände. Al-Aqrab spürt jedes seismische Beben und schützt die antiken Inschriften.'
    },
    it: {
      name: 'Al-Aqrab (Scorpione delle Fenditure)',
      title: 'Sentinella dei santuari d’ombra rosa',
      lore: 'Dimora in silenzio nelle fessure rocciose e nelle nicchie sacre delle pareti del canyon. Al-Aqrab avverte ogni minima scossa sismica e custodisce le antiche epigrafi.'
    },
    zh: {
      name: '阿格拉布 (岩缝之蝎)',
      title: '玫瑰阴影神殿哨兵',
      lore: '静栖于峡谷岩壁深处的阴凉石隙与神圣灵石龛中。阿格拉布能察觉最微弱的地脉震颤，守卫着古老铭文免受侵扰。'
    }
  },
  falcon: {
    ar: {
      name: 'الصَّقْر (صقر الأعالي)',
      title: 'كشّاف الأعالي ورياح الجبال',
      lore: 'يمتطي التيارات الهوائية الصاعدة فوق الدير ومذبح الأضاحي العالي. يلمح العواصف القادمة من مسافات شاسعة، وكان يوقظ أبراج المراقبة النبطية لاستقبال القوافل.'
    },
    en: {
      name: 'Al-Saqr (Falcon)',
      title: 'Sky Scout of the Mountain Ridge',
      lore: 'Riding the thermal winds high above Ad-Deir and the High Place of Sacrifice. Al-Saqr spots incoming desert storms hours in advance and warned ancient Nabataean watchtowers of approaching caravans.'
    },
    fr: {
      name: 'Al-Saqr (Faucon des Cimes)',
      title: 'Éclaireur céleste des crêtes rocheuses',
      lore: 'Porté par les courants thermiques au-dessus d’Ad-Deir et du Haut Lieu du Sacrifice. Al-Saqr repère les tempêtes de sable et alertait les tours de guet nabatéennes.'
    },
    es: {
      name: 'Al-Saqr (Halcón de las Alturas)',
      title: 'Explorador celeste de las cumbres',
      lore: 'Surcando los vientos térmicos sobre Ad-Deir y el Lugar Alto del Sacrificio. Al-Saqr divisa tormentas a kilómetros y alertaba a las torres de vigilancia nabateas.'
    },
    de: {
      name: 'Al-Saqr (Gebirgsfalke)',
      title: 'Himmelsspäher der Bergkämme',
      lore: 'Gleitet auf den thermischen Winden hoch über Ad-Deir und dem Hohen Opferplatz. Al-Saqr erkennt Wüstenstürme frühzeitig und warnte antike nabatäische Wachtürme.'
    },
    it: {
      name: 'Al-Saqr (Falco delle Vette)',
      title: 'Esploratore celeste delle creste montane',
      lore: 'Vola sulle correnti termiche sopra Ad-Deir e l’Alto Luogo del Sacrificio. Al-Saqr scorge le tempeste a grandi distanze e avvisava le antiche torri di vedetta nabatee.'
    },
    zh: {
      name: '萨克尔 (绝壁天鹰)',
      title: '崇山之巅天空侦察使',
      lore: '翱翔于修道院与高台祭坛上空的热气流之中。萨克尔能提前数小时侦测远方的风暴，并在古代唤醒纳巴泰瞭望哨塔迎候来临的商队。'
    }
  },
  ibex: {
    ar: {
      name: 'البَدَن (الوعل النوبي الملكي)',
      title: 'سيد الجبال ذو القرنين المقدس',
      lore: 'رمز الملوك والآلهة النبطية المنحوت على واجهات المقابر الصخرية. يقفز بخفة فوق جروف السيق المنيعة، ويكشف مسارب الماء السرية في أوقات الجفاف الشديد.'
    },
    en: {
      name: 'Al-Badan (Nubian Ibex)',
      title: 'Sacred Horned Mountain Sovereign',
      lore: 'Emblem of Nabataean kings and deities, carved into monumental tomb facades. Leaping gracefully across sheer sandstone precipices, Al-Badan reveals hidden water springs during severe desert droughts.'
    },
    fr: {
      name: 'Al-Badan (Bouquetin de Nubie)',
      title: 'Souverain sacré des montagnes aux cornes majestueuses',
      lore: 'Emblème des rois et divinités nabatéens gravé sur les façades des tombeaux. Franchissant avec grâce les précipices du Siq, il révèle les sources secrètes en période de sécheresse.'
    },
    es: {
      name: 'Al-Badan (Íbice Nubio)',
      title: 'Sagrado soberano de las cumbres de cuernos majestuosos',
      lore: 'Emblema de reyes y deidades nabateas esculpido en las fachadas monumentales. Saltando ágilmente sobre los precipicios del Siq, Al-Badan revela manantiales secretos durante las sequías.'
    },
    de: {
      name: 'Al-Badan (Nubischer Steinbock)',
      title: 'Heiliger Gehörnter Herrscher der Berge',
      lore: 'Wahrzeichen nabatäischer Könige und Gottheiten an monumentalen Felsfassaden. Mit anmutigen Sprüngen über die Steilwände des Siq offenbart Al-Badan in Dürrezeiten verborgene Quellen.'
    },
    it: {
      name: 'Al-Badan (Stambecco Nubiano)',
      title: 'Sacro sovrano cornuto delle montagne',
      lore: 'Emblema dei re e delle divinità nabatee scolpito sulle facciate rupestri. Saltando con grazia sui dirupi del Siq, Al-Badan svela sorgenti segrete nei periodi di estrema siccità.'
    },
    zh: {
      name: '巴丹 (努比亚角羚皇)',
      title: '神圣崇山双角君王',
      lore: '纳巴泰王者与神祇的尊崇图腾，镌刻于宏伟古墓门面之上。它轻盈穿梭于西克峡谷刀削般的赤壁之间，在极度干旱时指引探寻隐秘暗泉。'
    }
  }
};

// Helper to get localized creature name, title, and lore
export function getLocalizedCreature(
  creature: { id: string; nameEn: string; nameAr: string; titleEn: string; titleAr: string; loreEn: string; loreAr: string },
  lang: Language
): { name: string; title: string; lore: string } {
  const loc = CREATURE_LOCALIZATIONS[creature.id]?.[lang];
  if (loc) return loc;
  return lang === 'ar'
    ? { name: creature.nameAr, title: creature.titleAr, lore: creature.loreAr }
    : { name: creature.nameEn, title: creature.titleEn, lore: creature.loreEn };
}

export interface LocalizedSuggestedQuery {
  id: string;
  category: 'logistics' | 'monuments' | 'engineering' | 'myths';
  label: string;
  text: string;
}

const LOCALIZED_SUGGESTED_QUERIES: Array<{
  id: string;
  category: 'logistics' | 'monuments' | 'engineering' | 'myths';
  label: Record<Language, string>;
  text: Record<Language, string>;
}> = [
  {
    id: 'hours_tickets',
    category: 'logistics',
    label: {
      ar: 'ساعات العمل والأسعار 2026',
      en: 'Hours & Tickets 2026',
      fr: 'Horaires & Tarifs 2026',
      es: 'Horarios y Entradas 2026',
      de: 'Öffnungszeiten & Tickets 2026',
      it: 'Orari e Biglietti 2026',
      zh: '开放时间与票价 2026'
    },
    text: {
      ar: 'ما هي ساعات عمل موقع البترا حالياً وأسعار التذاكر وهل يشملها تصريح جوردان باس (Jordan Pass)؟',
      en: 'What are the current Petra site opening hours, ticket prices, and does the Jordan Pass include them?',
      fr: 'Quels sont les horaires d\'ouverture actuels du site de Pétra, les tarifs des billets et le Jordan Pass les inclut-il ?',
      es: '¿Cuáles son los horarios actuales de Petra, precios de entradas y si el Jordan Pass las incluye?',
      de: 'Wie sind die aktuellen Öffnungszeiten von Petra, die Ticketpreise und ist der Jordan Pass enthalten?',
      it: 'Quali sono gli orari di apertura attuali di Petra, i prezzi dei biglietti e il Jordan Pass li include?',
      zh: '佩特拉景区当前的开放时间、门票价格是多少？约旦通票 (Jordan Pass) 是否包含在内？'
    }
  },
  {
    id: 'petra_by_night',
    category: 'logistics',
    label: {
      ar: 'فعالية البترا ليلاً',
      en: 'Petra by Night',
      fr: 'Pétra la Nuit',
      es: 'Petra de Noche',
      de: 'Petra bei Nacht',
      it: 'Petra di Notte',
      zh: '佩特拉之夜'
    },
    text: {
      ar: 'متى تقام فعالية البترا ليلاً (Petra by Night) وكم سعر تذكرتها وكيف تنظم مسيرة الشموع؟',
      en: 'When is Petra by Night held, what is the ticket price, and what does the candle experience include?',
      fr: 'Quand a lieu Pétra la Nuit (Petra by Night), quel est le prix du billet et comment se déroule la veillée aux chandelles ?',
      es: '¿Cuándo se celebra Petra de Noche (Petra by Night), cuál es el precio y qué incluye el recorrido con velas?',
      de: 'Wann findet Petra bei Nacht statt, wie viel kostet das Ticket und wie läuft das Kerzen-Erlebnis ab?',
      it: 'Quando si svolge Petra di Notte (Petra by Night), quanto costa il biglietto e cosa include il percorso a lume di candela?',
      zh: '佩特拉之夜 (Petra by Night) 何时举办？票价是多少？烛光体验包含哪些内容？'
    }
  },
  {
    id: 'treasury_architecture',
    category: 'monuments',
    label: {
      ar: 'عمارة الخزنة',
      en: 'Treasury Architecture',
      fr: 'Architecture du Trésor',
      es: 'Arquitectura de El Tesoro',
      de: 'Architektur der Schatzkammer',
      it: 'Architettura del Tesoro',
      zh: '卡兹尼神殿建筑'
    },
    text: {
      ar: 'من نحت الخزنة ولأي غرض شيدت وماذا كشفت الحفريات الحديثة في غرفها السفلية؟',
      en: 'Who carved Al-Khazneh (The Treasury) and what purpose did its lower chambers serve?',
      fr: 'Qui a sculpté Al-Khazneh (Le Trésor) et que contenaient ses chambres inférieures ?',
      es: '¿Quién esculpió Al-Khazneh (El Tesoro) y qué función cumplían sus cámaras inferiores?',
      de: 'Wer hat Al-Khazneh (das Schatzhaus) gemeißelt und welchem Zweck dienten die unteren Kammern?',
      it: 'Chi ha scolpito Al-Khazneh (Il Tesoro) e a cosa servivano le sue camere inferiori?',
      zh: '卡兹尼神殿 (Al-Khazneh) 由谁雕凿？建造目的为何？其下层墓室有何发现？'
    }
  },
  {
    id: 'monastery_hike',
    category: 'monuments',
    label: {
      ar: 'درب صعود الدير',
      en: 'The Monastery Hike',
      fr: 'Montée du Monastère',
      es: 'Ascenso al Monasterio',
      de: 'Aufstieg zum Kloster',
      it: 'Sentiero del Monastero',
      zh: '修道院登顶古道'
    },
    text: {
      ar: 'كم عدد درجات الصعود إلى الدير (Ad-Deir) وما هي أهميته الدينية للملك عبادة الأول؟',
      en: 'How many steps lead to Ad-Deir (The Monastery) and what is its significance in Nabataean history?',
      fr: 'Combien de marches mènent à Ad-Deir (Le Monastère) et quelle est son importance historique ?',
      es: '¿Cuántos escalones llevan a Ad-Deir (El Monasterio) y cuál es su importancia en la historia nabatea?',
      de: 'Wie viele Stufen führen zu Ad-Deir (dem Kloster) und welche Bedeutung hatte es für die Nabatäer?',
      it: 'Quanti scalini portano ad Ad-Deir (Il Monastero) e qual è la sua importanza storica?',
      zh: '攀登修道院 (Ad-Deir) 需要走多少级台阶？它在纳巴泰历史中有何重要意义？'
    }
  },
  {
    id: 'water_engineering',
    category: 'engineering',
    label: {
      ar: 'هندسة المياه النبطية',
      en: 'Water Engineering',
      fr: 'Ingénierie Hydraulique',
      es: 'Ingeniería Hidráulica',
      de: 'Wasserbaukunst',
      it: 'Ingegneria Idraulica',
      zh: '纳巴泰水利工程'
    },
    text: {
      ar: 'كيف جمع الأنباط مياه الأمطار ودرؤوا مخاطر السيول عبر القنوات الفخارية والسدود التحويلية؟',
      en: 'How did the Nabataeans collect rainwater and divert flash floods using terracotta aqueducts and dams?',
      fr: 'Comment les Nabatéens collectaient-ils l\'eau de pluie et déviaient-ils les crues grâce aux aqueducs et barrages ?',
      es: '¿Cómo recolectaban los nabateos el agua de lluvia y desviaban las crecidas con acueductos y presas?',
      de: 'Wie sammelten die Nabatäer Regenwasser und leiteten Sturzfluten mit Tonleitungen und Dämmen ab?',
      it: 'In che modo i Nabatei raccoglievano l\'acqua piovana e deviavano le piene con acquedotti e dighe?',
      zh: '纳巴泰人如何利用陶土输水管道和分水大坝收集雨水并抵御山洪？'
    }
  },
  {
    id: 'treasury_gold_myth',
    category: 'myths',
    label: {
      ar: 'حقيقة ذهب الخزنة',
      en: 'Treasury Gold Myth',
      fr: 'Mythe de l\'Or du Trésor',
      es: 'Mito del Oro del Tesoro',
      de: 'Goldmythos des Schatzhauses',
      it: 'Mito dell\'Oro del Tesoro',
      zh: '神殿黄金之谜'
    },
    text: {
      ar: 'هل يوجد ذهب حقيقي لفرعون مخبأ داخل جرة الخزنة أم أنها حجر رملي صلب بالكامل؟',
      en: 'Is there really Pharaoh gold concealed inside the Treasury urn or is it solid sandstone?',
      fr: 'Y a-t-il vraiment de l\'or de pharaon caché dans l\'urne du Trésor ou s\'agit-il de grès massif ?',
      es: '¿Hay realmente oro del faraón escondido en la urna de El Tesoro o es arenisca maciza?',
      de: 'Befindet sich wirklich Pharaonengold in der Urne des Schatzhauses oder ist sie massiver Sandstein?',
      it: 'C\'è davvero l\'oro del faraone nascosto nell\'urna del Tesoro o è arenaria solida?',
      zh: '卡兹尼神殿顶部的石罐内真的藏有法老黄金，还是纯粹的实心砂岩？'
    }
  },
  {
    id: 'djinn_blocks_truth',
    category: 'myths',
    label: {
      ar: 'حقيقة مكعبات الجن',
      en: 'Djinn Blocks Truth',
      fr: 'Vérité sur les Blocs des Djinns',
      es: 'Bloques de los Djinns',
      de: 'Wahrheit über die Djinn-Blöcke',
      it: 'Verità sui Blocchi dei Jinn',
      zh: '精灵石碑之谜'
    },
    text: {
      ar: 'ما هي حقيقة مكعبات الجن المنحوتة في باب السيق حسب النقوش الأثرية النبطية؟',
      en: 'What are the mysterious Djinn Blocks near the Siq entrance according to archaeological inscriptions?',
      fr: 'Que sont les mystérieux Blocs des Djinns près du Siq selon les inscriptions archéologiques ?',
      es: '¿Qué son los misteriosos Bloques de los Genios cerca del Siq según las inscripciones?',
      de: 'Was bedeuten die geheimnisvollen Dschinn-Blöcke am Siq-Eingang laut archäologischen Inschriften?',
      it: 'Cosa sono i misteriosi Blocchi dei Jinn vicino al Siq secondo le epigrafi archeologiche?',
      zh: '根据纳巴泰考古铭文记载，西克峡谷入口处神秘的精灵石碑 (Djinn Blocks) 究竟有何用途？'
    }
  },
  {
    id: 'negative_test',
    category: 'myths',
    label: {
      ar: 'اختبار الدقة التاريخية',
      en: 'Historical Accuracy Check',
      fr: 'Test d\'Exactitude Historique',
      es: 'Prueba de Precisión Histórica',
      de: 'Historischer Genauigkeitstest',
      it: 'Test di Accuratezza Storica',
      zh: '历史真实性测验'
    },
    text: {
      ar: 'هل قام الأنباط بزراعة أشجار المانجو واستخدام القطارات البخارية في بترا؟',
      en: 'Did the Nabataeans cultivate mango plantations and use steam locomotives?',
      fr: 'Les Nabatéens cultivaient-ils des mangues et utilisaient-ils des locomotives à vapeur ?',
      es: '¿Cultivaban los nabateos mangos y utilizaban locomotoras de vapor en Petra?',
      de: 'Bauten die Nabatäer Mangoplantagen an und nutzten sie Dampflokomotiven?',
      it: 'I Nabatei coltivavano piantagioni di mango e usavano locomotive a vapore?',
      zh: '纳巴泰人当年是否在佩特拉种植芒果庄园并使用蒸汽机车？'
    }
  }
];

export function getLocalizedSuggestedQueries(lang: Language): LocalizedSuggestedQuery[] {
  return LOCALIZED_SUGGESTED_QUERIES.map(q => ({
    id: q.id,
    category: q.category,
    label: q.label[lang] || q.label.en,
    text: q.text[lang] || q.text.en
  }));
}
