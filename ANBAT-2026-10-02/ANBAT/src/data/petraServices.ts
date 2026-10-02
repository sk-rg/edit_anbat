/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PetraServicePoint } from '../types';

export const PETRA_SERVICES: PetraServicePoint[] = [
  // 1. Visitor Center & Siq Entrance Zone
  {
    id: 'svc-tickets-main',
    category: 'ticket',
    iconType: 'ticket',
    nameEn: 'Main Visitor Center & Ticket Hall',
    nameAr: 'مركز الزوار الرئيسي ومكتب التذاكر',
    descriptionEn: 'Official entry ticket issuance, Jordan Pass verification, and audio guide rental desk.',
    descriptionAr: 'إصدار تذاكر الدخول الرسمية، التحقق من جوردان باس، وتأجير أجهزة الدليل الصوتي.',
    geoCoordinates: { lat: 30.3262, lng: 35.4578 },
    nearLandmarkId: 'siq'
  },
  {
    id: 'svc-info-siq',
    category: 'info',
    iconType: 'info',
    nameEn: 'Siq Trailhead Information & Rangers',
    nameAr: 'مركز استعلامات مدخل السيق والمراقبين',
    descriptionEn: 'Ranger post, trail maps, weather alerts, and authorized local guide bookings.',
    descriptionAr: 'نقطة إرشاد سياحي، خرائط المسارات المعتمدة، وتنبيهات الطقس والسيول.',
    geoCoordinates: { lat: 30.3255, lng: 35.4547 },
    nearLandmarkId: 'siq'
  },
  {
    id: 'svc-medical-siq',
    category: 'medical',
    iconType: 'medical',
    nameEn: 'Siq Emergency Medical Post',
    nameAr: 'عيادة الطوارئ والإسعاف الأولي - مدخل السيق',
    descriptionEn: 'Equipped medical clinic with first aid responders and emergency desert evacuation carts.',
    descriptionAr: 'نقطة طبية مجهزة بالكوادر الإسعافية وعربات الإخلاء الكهربائية الميدانية.',
    geoCoordinates: { lat: 30.3251, lng: 35.4540 },
    nearLandmarkId: 'siq'
  },
  {
    id: 'svc-wc-siq',
    category: 'restroom',
    iconType: 'restroom',
    nameEn: 'Public Restrooms - Siq Entrance',
    nameAr: 'دورات مياه عامة - بوابة السيق',
    descriptionEn: 'Modern sanitary facilities, accessible toilets, and baby care station.',
    descriptionAr: 'مرافق صحية حديثة ومجهزة لذوي الاحتياجات الخاصة ومغاسل.',
    geoCoordinates: { lat: 30.3256, lng: 35.4538 },
    nearLandmarkId: 'siq'
  },

  // 2. Treasury Plaza Zone
  {
    id: 'svc-rest-treasury',
    category: 'restaurant',
    iconType: 'restaurant',
    nameEn: 'Al-Khazneh Bedouin Hospitality Tent & Cafe',
    nameAr: 'استراحة وخيمة الضيافة البدوية - الخزنة',
    descriptionEn: 'Authentic cardamom tea, freshly brewed Arabic coffee, dates, and shaded seating facing the facade.',
    descriptionAr: 'شاي الميرمية البدوي بالهيل، قهوة عربية، ومقاعد مظللة بإطلالة مباشرة على الخزنة.',
    geoCoordinates: { lat: 30.3220, lng: 35.4519 },
    nearLandmarkId: 'treasury'
  },
  {
    id: 'svc-water-treasury',
    category: 'water',
    iconType: 'water',
    nameEn: 'Chilled Spring Water Station',
    nameAr: 'محطة مياه شرب باردة ومظلة استراحة',
    descriptionEn: 'Free filtered refill point for visitors and hydration shelter.',
    descriptionAr: 'نقطة مجانية لتعبئة مياه الشرب المفلترة والوقاية من حرارة الشمس.',
    geoCoordinates: { lat: 30.3224, lng: 35.4513 },
    nearLandmarkId: 'treasury'
  },
  {
    id: 'svc-medical-treasury',
    category: 'medical',
    iconType: 'medical',
    nameEn: 'Treasury First Aid Shelter & Tourist Police',
    nameAr: 'نقطة إسعاف والشرطة السياحية - الخزنة',
    descriptionEn: 'Heat exhaustion assistance, rehydration salts, and tourist security post.',
    descriptionAr: 'مفرزة أمنية وإسعافات لضربات الشمس والإجهاد الحراري.',
    geoCoordinates: { lat: 30.3227, lng: 35.4511 },
    nearLandmarkId: 'treasury'
  },

  // 3. Street of Facades & Theatre Zone
  {
    id: 'svc-wc-theatre',
    category: 'restroom',
    iconType: 'restroom',
    nameEn: 'Public Restrooms - Theatre Junction',
    nameAr: 'دورات مياه عامة - مفرق المدرج وشارع الواجهات',
    descriptionEn: 'Sanitary block near the rock-cut theater and camel resting station.',
    descriptionAr: 'مجمع دورات مياه ومغاسل قرب المدرج الصخري ومحطة استراحة الجمال.',
    geoCoordinates: { lat: 30.3241, lng: 35.4462 },
    nearLandmarkId: 'theatre'
  },
  {
    id: 'svc-rest-theatre',
    category: 'restaurant',
    iconType: 'restaurant',
    nameEn: 'Wadi Farasa Shaded Kiosk & Snacks',
    nameAr: 'كشك واستراحة وادي الفرسة للمرطبات',
    descriptionEn: 'Cold fresh pomegranate juices, mineral water bottles, and artisanal Nabataean pottery souvenirs.',
    descriptionAr: 'عصائر رمان وليمون ونعناع طبيعية مثلجة، ومياه معبأة، وتذكارات حرفية.',
    geoCoordinates: { lat: 30.3238, lng: 35.4452 },
    nearLandmarkId: 'theatre'
  },

  // 4. Royal Tombs Zone
  {
    id: 'svc-info-royaltombs',
    category: 'info',
    iconType: 'info',
    nameEn: 'Urn Tomb Architectural Viewpoint & Info',
    nameAr: 'مطل القبور الملكية وقبر الجرة - شروحات أثرية',
    descriptionEn: 'Informational boards detailing Nabataean royal chronology and Byzantine modifications.',
    descriptionAr: 'لوحات إرشادية وتاريخية مفصلة عن تسلسل ملوك الأنباط والتحويلات البيزنطية.',
    geoCoordinates: { lat: 30.3265, lng: 35.4465 },
    nearLandmarkId: 'royal_tombs'
  },
  {
    id: 'svc-water-royaltombs',
    category: 'water',
    iconType: 'water',
    nameEn: 'Jebel al-Khubtha Water Point',
    nameAr: 'نقطة شرب واستراحة جبل الخبثة',
    descriptionEn: 'Shaded resting pavilion with drinking water before the high cliff trail.',
    descriptionAr: 'مظلة استراحة ومياه للمشاة المتجهين لأعلى قمة جبل الخبثة.',
    geoCoordinates: { lat: 30.3260, lng: 35.4472 },
    nearLandmarkId: 'royal_tombs'
  },

  // 5. Colonnaded Street & Basin Center Zone
  {
    id: 'svc-restaurant-basin',
    category: 'restaurant',
    iconType: 'restaurant',
    nameEn: 'The Basin Restaurant & Buffet',
    nameAr: 'مطعم الحوض واستراحة قصر البنت الكبرى',
    descriptionEn: 'Full dining buffet, air-conditioned dining terrace, hot meals, and fresh Arabic flatbread.',
    descriptionAr: 'بوفيه طعام متكامل، جلسات مكيفة ومظللة، وجبات أردنية ساخنة ومخبوزات طازجة.',
    geoCoordinates: { lat: 30.3298, lng: 35.4392 },
    nearLandmarkId: 'colonnaded_street'
  },
  {
    id: 'svc-wc-basin',
    category: 'restroom',
    iconType: 'restroom',
    nameEn: 'Basin Major Restroom Complex',
    nameAr: 'مجمع دورات مياه الحوض الرئيسي',
    descriptionEn: 'Spacious sanitary facilities at the trailhead to the Monastery steps.',
    descriptionAr: 'دورات مياه واسعة ومجهزة تقع عند نقطة بداية الدرج المؤدي إلى الدير.',
    geoCoordinates: { lat: 30.3296, lng: 35.4390 },
    nearLandmarkId: 'colonnaded_street'
  },
  {
    id: 'svc-medical-basin',
    category: 'medical',
    iconType: 'medical',
    nameEn: 'Basin Emergency Clinic & Search Team',
    nameAr: 'مركز إسعاف الحوض وفريق الإنقاذ الجبلي',
    descriptionEn: 'Paramedic station with mountain stretcher teams and heatstroke treatment room.',
    descriptionAr: 'محطة إسعاف تضم فرق الإنقاذ الجبلي وأجهزة التنفس ومعالجة الإجهاد.',
    geoCoordinates: { lat: 30.3294, lng: 35.4396 },
    nearLandmarkId: 'colonnaded_street'
  },
  {
    id: 'svc-info-museum',
    category: 'info',
    iconType: 'info',
    nameEn: 'Petra Archaeological Museum & Guide Pavilion',
    nameAr: 'متحف بترا القديم ومركز التوجيه الأثري',
    descriptionEn: 'Display of Nabataean stone friezes, coins, terracotta lamps, and detailed topographic relief maps.',
    descriptionAr: 'معروضات من النقوش النبطية والعملات القديمة ونماذج مجسمة لتضاريس المدينة.',
    geoCoordinates: { lat: 30.3290, lng: 35.4404 },
    nearLandmarkId: 'colonnaded_street'
  },

  // 6. Ad-Deir / Monastery Mountain Summit Zone
  {
    id: 'svc-rest-monastery',
    category: 'restaurant',
    iconType: 'restaurant',
    nameEn: 'Ad-Deir Summit Bedouin Cafe & Lookout',
    nameAr: 'مقهى قمة الدير البانورامي واستراحة الأعالي',
    descriptionEn: 'Tea with wild mountain herbs, freshly squeezed orange juice, and panoramic seats facing the Monastery.',
    descriptionAr: 'شاي بالأعشاب الجبلية وعصائر برتقال طازجة بمواجهة واجهة الدير العظيمة.',
    geoCoordinates: { lat: 30.3375, lng: 35.4312 },
    nearLandmarkId: 'monastery'
  },
  {
    id: 'svc-wc-monastery',
    category: 'restroom',
    iconType: 'restroom',
    nameEn: 'Ad-Deir Ecological Restrooms',
    nameAr: 'دورات مياه قمة الدير البيئية',
    descriptionEn: 'Solar-powered ecological restrooms at the top of the mountain trail.',
    descriptionAr: 'مرافق صحية بيئية تعتمد الطاقة الشمسية عند قمة مسار الدير.',
    geoCoordinates: { lat: 30.3380, lng: 35.4310 },
    nearLandmarkId: 'monastery'
  },
  {
    id: 'svc-water-monastery',
    category: 'water',
    iconType: 'water',
    nameEn: 'High Peaks Water & Recovery Post',
    nameAr: 'محطة استعادة النشاط والمياه - قمة الدير',
    descriptionEn: 'Cold drinks and electrolyte drinks for climbers completing the 800 rock steps.',
    descriptionAr: 'مشروبات باردة ومياه لإنعاش الزوار بعد صعود الـ 800 درجة صخرية.',
    geoCoordinates: { lat: 30.3372, lng: 35.4318 },
    nearLandmarkId: 'monastery'
  }
];
