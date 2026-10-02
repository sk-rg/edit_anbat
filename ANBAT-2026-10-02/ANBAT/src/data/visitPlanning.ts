/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * "Plan Your Visit" data: Petra entry ticket prices, hotels, transport options and tour companies.
 *
 * Ticket prices: Petra Development & Tourism Region Authority fee schedule
 * (visitpetra.jo/en/Petrafees): Jordanians 1 JD; accommodated foreign visitors 50/55/60 JD
 * for 1/2/3 consecutive days; non-accommodated (day-trip) visitors 90 JD; children under 12 free.
 * Children of Jordanian mothers: 10 JD (July 2026 published rates; not itemised on the official page,
 * so the UI asks visitors to confirm at the ticket office).
 *
 * Hotels, transport and tour companies are generic examples — replace them with real partners.
 */

export type TicketCategory = 'jordanian' | 'jordanian_mother' | 'foreigner';

export interface TicketCategoryInfo {
  id: TicketCategory;
  labelEn: string;
  labelAr: string;
  documentEn: string;
  documentAr: string;
}

export const TICKET_CATEGORIES: TicketCategoryInfo[] = [
  {
    id: 'jordanian',
    labelEn: 'Jordanian',
    labelAr: 'أردني',
    documentEn: 'Jordanian national ID card',
    documentAr: 'البطاقة الشخصية الأردنية'
  },
  {
    id: 'jordanian_mother',
    labelEn: 'Child of a Jordanian mother',
    labelAr: 'أبناء الأردنيات',
    documentEn: 'Identification card for children of Jordanian women (issued by the Civil Status Department) + passport',
    documentAr: 'البطاقة التعريفية لأبناء الأردنيات (صادرة عن دائرة الأحوال المدنية) + جواز السفر'
  },
  {
    id: 'foreigner',
    labelEn: 'Foreign visitor',
    labelAr: 'أجنبي',
    documentEn: 'Valid passport',
    documentAr: 'جواز سفر ساري المفعول'
  }
];

export const TICKET_PRICES_JOD = {
  jordanian: 1,
  jordanian_mother: 10,
  foreignerAccommodated: { 1: 50, 2: 55, 3: 60 } as Record<1 | 2 | 3, number>,
  foreignerDayTrip: 90
};

export interface TicketQuoteInput {
  category: TicketCategory;
  adults: number; // 12 years and older
  children: number; // under 12 (free)
  staysOvernight: boolean; // foreigners only
  days: 1 | 2 | 3; // foreigners staying overnight only
}

export function quoteTickets(input: TicketQuoteInput): { unitPriceJod: number; totalJod: number } {
  let unit: number;
  if (input.category === 'jordanian') {
    unit = TICKET_PRICES_JOD.jordanian;
  } else if (input.category === 'jordanian_mother') {
    unit = TICKET_PRICES_JOD.jordanian_mother;
  } else {
    unit = input.staysOvernight
      ? TICKET_PRICES_JOD.foreignerAccommodated[input.days]
      : TICKET_PRICES_JOD.foreignerDayTrip;
  }
  return { unitPriceJod: unit, totalJod: unit * Math.max(0, input.adults) };
}

// ------------------------------------------------------------------
// Hotels (generic examples)
// ------------------------------------------------------------------
export type HotelTier = 'luxury' | 'mid' | 'budget' | 'camp';

export interface HotelListing {
  id: string;
  tier: HotelTier;
  stars?: number;
  nameEn: string;
  nameAr: string;
  areaEn: string;
  areaAr: string;
  distanceEn: string;
  distanceAr: string;
  priceEn: string;
  priceAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

export const HOTEL_TIERS: { id: HotelTier; labelEn: string; labelAr: string }[] = [
  { id: 'luxury', labelEn: 'Luxury', labelAr: 'فاخرة' },
  { id: 'mid', labelEn: 'Mid-range', labelAr: 'متوسطة' },
  { id: 'budget', labelEn: 'Budget', labelAr: 'اقتصادية' },
  { id: 'camp', labelEn: 'Camps', labelAr: 'مخيمات' }
];

export const HOTELS: HotelListing[] = [
  {
    id: 'hotel-gate-5',
    tier: 'luxury',
    stars: 5,
    nameEn: 'Luxury hotel at the Petra gate',
    nameAr: 'فندق فاخر عند بوابة البترا',
    areaEn: 'Wadi Musa – Visitor Center',
    areaAr: 'وادي موسى – مركز الزوار',
    distanceEn: '1 min walk to the gate',
    distanceAr: 'دقيقة مشياً للبوابة',
    priceEn: '120–200 JOD / night',
    priceAr: '120–200 د.أ لليلة',
    featuresEn: ['Breakfast', 'Pool', 'Restaurant', 'Parking'],
    featuresAr: ['إفطار', 'مسبح', 'مطعم', 'موقف سيارات']
  },
  {
    id: 'hotel-view-5',
    tier: 'luxury',
    stars: 5,
    nameEn: 'Mountain-view resort',
    nameAr: 'منتجع بإطلالة جبلية',
    areaEn: 'Wadi Musa – upper town',
    areaAr: 'وادي موسى – المنطقة العليا',
    distanceEn: '10 min drive to the gate',
    distanceAr: '10 دقائق بالسيارة للبوابة',
    priceEn: '100–170 JOD / night',
    priceAr: '100–170 د.أ لليلة',
    featuresEn: ['Breakfast', 'Spa', 'Shuttle to the gate'],
    featuresAr: ['إفطار', 'سبا', 'نقل للبوابة']
  },
  {
    id: 'hotel-town-4',
    tier: 'mid',
    stars: 4,
    nameEn: 'Four-star hotel in Wadi Musa',
    nameAr: 'فندق 4 نجوم في وادي موسى',
    areaEn: 'Wadi Musa – town centre',
    areaAr: 'وادي موسى – وسط البلد',
    distanceEn: '5 min drive to the gate',
    distanceAr: '5 دقائق بالسيارة للبوابة',
    priceEn: '60–90 JOD / night',
    priceAr: '60–90 د.أ لليلة',
    featuresEn: ['Breakfast', 'Restaurant', 'Wi-Fi'],
    featuresAr: ['إفطار', 'مطعم', 'إنترنت']
  },
  {
    id: 'hotel-town-3',
    tier: 'mid',
    stars: 3,
    nameEn: 'Three-star family hotel',
    nameAr: 'فندق عائلي 3 نجوم',
    areaEn: 'Wadi Musa',
    areaAr: 'وادي موسى',
    distanceEn: '7 min drive to the gate',
    distanceAr: '7 دقائق بالسيارة للبوابة',
    priceEn: '40–60 JOD / night',
    priceAr: '40–60 د.أ لليلة',
    featuresEn: ['Breakfast', 'Family rooms', 'Wi-Fi'],
    featuresAr: ['إفطار', 'غرف عائلية', 'إنترنت']
  },
  {
    id: 'hotel-guesthouse',
    tier: 'budget',
    nameEn: 'Guesthouse / hostel',
    nameAr: 'نُزل اقتصادي',
    areaEn: 'Wadi Musa',
    areaAr: 'وادي موسى',
    distanceEn: '10 min drive to the gate',
    distanceAr: '10 دقائق بالسيارة للبوابة',
    priceEn: '15–35 JOD / night',
    priceAr: '15–35 د.أ لليلة',
    featuresEn: ['Shared or private rooms', 'Wi-Fi'],
    featuresAr: ['غرف مشتركة أو خاصة', 'إنترنت']
  },
  {
    id: 'camp-little-petra',
    tier: 'camp',
    nameEn: 'Bedouin camp near Little Petra',
    nameAr: 'مخيم بدوي قرب البترا الصغيرة',
    areaEn: 'Siq al-Barid (Little Petra)',
    areaAr: 'سيق البارد (البترا الصغيرة)',
    distanceEn: '20 min drive to the gate',
    distanceAr: '20 دقيقة بالسيارة للبوابة',
    priceEn: '35–60 JOD / night',
    priceAr: '35–60 د.أ لليلة',
    featuresEn: ['Bedouin dinner', 'Stargazing', 'Desert tents'],
    featuresAr: ['عشاء بدوي', 'سهرة تحت النجوم', 'خيام صحراوية']
  }
];

// ------------------------------------------------------------------
// Transport (generic examples, approximate times & prices)
// ------------------------------------------------------------------
export type TransportGroup = 'toPetra' | 'insidePetra';

export interface TransportOption {
  id: string;
  group: TransportGroup;
  icon: string;
  nameEn: string;
  nameAr: string;
  detailEn: string;
  detailAr: string;
  durationEn: string;
  durationAr: string;
  priceEn: string;
  priceAr: string;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'bus-amman',
    group: 'toPetra',
    icon: '🚌',
    nameEn: 'Tourist bus from Amman',
    nameAr: 'حافلة سياحية من عمّان',
    detailEn: 'Daily morning departure, returns in the afternoon.',
    detailAr: 'انطلاق يومي صباحاً، والعودة بعد الظهر.',
    durationEn: '≈ 3.5 h',
    durationAr: '≈ 3.5 ساعة',
    priceEn: '≈ 10–15 JOD one way',
    priceAr: '≈ 10–15 د.أ للاتجاه الواحد'
  },
  {
    id: 'bus-aqaba',
    group: 'toPetra',
    icon: '🚌',
    nameEn: 'Bus from Aqaba',
    nameAr: 'حافلة من العقبة',
    detailEn: 'Regular buses and minibuses to Wadi Musa.',
    detailAr: 'حافلات وباصات صغيرة منتظمة إلى وادي موسى.',
    durationEn: '≈ 2 h',
    durationAr: '≈ ساعتان',
    priceEn: '≈ 5–10 JOD one way',
    priceAr: '≈ 5–10 د.أ للاتجاه الواحد'
  },
  {
    id: 'taxi-private',
    group: 'toPetra',
    icon: '🚕',
    nameEn: 'Taxi / private driver',
    nameAr: 'تكسي / سائق خاص',
    detailEn: 'Door-to-door from Amman, Aqaba or the airport; agree on the price before leaving.',
    detailAr: 'من الباب للباب من عمّان أو العقبة أو المطار؛ اتفق على السعر قبل الانطلاق.',
    durationEn: '≈ 2–3 h',
    durationAr: '≈ 2–3 ساعات',
    priceEn: '≈ 60–100 JOD',
    priceAr: '≈ 60–100 د.أ'
  },
  {
    id: 'rental-car',
    group: 'toPetra',
    icon: '🚗',
    nameEn: 'Rental car',
    nameAr: 'سيارة مستأجرة',
    detailEn: 'Desert Highway (faster) or King’s Highway (scenic). Free parking at the Visitor Center.',
    detailAr: 'الطريق الصحراوي (أسرع) أو طريق الملوك (مناظر أجمل). موقف مجاني عند مركز الزوار.',
    durationEn: '≈ 3 h from Amman',
    durationAr: '≈ 3 ساعات من عمّان',
    priceEn: '≈ 25–50 JOD / day',
    priceAr: '≈ 25–50 د.أ لليوم'
  },
  {
    id: 'walk',
    group: 'insidePetra',
    icon: '🚶',
    nameEn: 'Walking',
    nameAr: 'المشي',
    detailEn: 'The best way to see Petra. Wear good shoes and carry water.',
    detailAr: 'أفضل طريقة لرؤية البترا. البس حذاءً مريحاً واحمل ماءً.',
    durationEn: 'Gate → Treasury ≈ 30 min',
    durationAr: 'البوابة ← الخزنة ≈ 30 دقيقة',
    priceEn: 'Free',
    priceAr: 'مجاناً'
  },
  {
    id: 'horse',
    group: 'insidePetra',
    icon: '🐎',
    nameEn: 'Horse ride',
    nameAr: 'ركوب الخيل',
    detailEn: 'From the gate to the start of the Siq.',
    detailAr: 'من البوابة إلى بداية السيق.',
    durationEn: '≈ 10 min',
    durationAr: '≈ 10 دقائق',
    priceEn: 'Tip expected',
    priceAr: 'إكرامية للخيّال'
  },
  {
    id: 'carriage',
    group: 'insidePetra',
    icon: '🛞',
    nameEn: 'Horse carriage',
    nameAr: 'عربة الخيل',
    detailEn: 'Gate → Treasury and back; suitable for elderly visitors and people with limited mobility.',
    detailAr: 'من البوابة للخزنة وبالعكس؛ مناسبة لكبار السن وذوي الإعاقة الحركية.',
    durationEn: '≈ 20 min each way',
    durationAr: '≈ 20 دقيقة لكل اتجاه',
    priceEn: '≈ 20–30 JOD',
    priceAr: '≈ 20–30 د.أ'
  },
  {
    id: 'donkey',
    group: 'insidePetra',
    icon: '🫏',
    nameEn: 'Donkey / mule to Ad-Deir',
    nameAr: 'حمار / بغل للدير',
    detailEn: 'Up the 800 steps to the Monastery.',
    detailAr: 'لصعود درجات الدير الـ 800.',
    durationEn: '≈ 30 min',
    durationAr: '≈ 30 دقيقة',
    priceEn: '≈ 10–20 JOD',
    priceAr: '≈ 10–20 د.أ'
  }
];

// ------------------------------------------------------------------
// Tour companies (generic examples)
// ------------------------------------------------------------------
export interface TourCompany {
  id: string;
  icon: string;
  nameEn: string;
  nameAr: string;
  servicesEn: string;
  servicesAr: string;
  durationEn: string;
  durationAr: string;
  languagesEn: string;
  languagesAr: string;
  priceEn: string;
  priceAr: string;
}

export const TOUR_COMPANIES: TourCompany[] = [
  {
    id: 'tour-day-amman',
    icon: '🚐',
    nameEn: 'Day tours from Amman',
    nameAr: 'شركة رحلات يومية من عمّان',
    servicesEn: 'Transport + guided tour of Petra + lunch, back to Amman the same day.',
    servicesAr: 'نقل + جولة بترا مع مرشد + غداء، والعودة لعمّان بنفس اليوم.',
    durationEn: '1 day',
    durationAr: 'يوم واحد',
    languagesEn: 'Arabic, English',
    languagesAr: 'عربي، إنجليزي',
    priceEn: 'from ≈ 90 JOD / person',
    priceAr: 'من ≈ 90 د.أ للشخص'
  },
  {
    id: 'tour-petra-rum',
    icon: '🏜️',
    nameEn: 'Petra & Wadi Rum packages',
    nameAr: 'شركة باقات البترا ووادي رم',
    servicesEn: 'Two-day package: Petra, a night in a Wadi Rum camp and a jeep tour.',
    servicesAr: 'باقة يومين: البترا، وليلة بمخيم في وادي رم، وجولة جيب.',
    durationEn: '2 days',
    durationAr: 'يومان',
    languagesEn: 'Arabic, English, French',
    languagesAr: 'عربي، إنجليزي، فرنسي',
    priceEn: 'from ≈ 180 JOD / person',
    priceAr: 'من ≈ 180 د.أ للشخص'
  },
  {
    id: 'tour-local-guide',
    icon: '🧭',
    nameEn: 'Licensed local guides',
    nameAr: 'مرشدون سياحيون مرخّصون',
    servicesEn: 'Private guide from the Visitor Center for the main trail.',
    servicesAr: 'مرشد خاص من مركز الزوار للمسار الرئيسي.',
    durationEn: '2–4 h',
    durationAr: '2–4 ساعات',
    languagesEn: 'Many languages',
    languagesAr: 'لغات متعددة',
    priceEn: '≈ 50–100 JOD per group',
    priceAr: '≈ 50–100 د.أ للمجموعة'
  },
  {
    id: 'tour-hiking',
    icon: '🥾',
    nameEn: 'Hiking & adventure tours',
    nameAr: 'شركة رحلات مشي ومغامرة',
    servicesEn: 'Back-door trail from Little Petra to Ad-Deir, High Place of Sacrifice and more.',
    servicesAr: 'مسار الباب الخلفي من البترا الصغيرة للدير، والمذبح، ومسارات أخرى.',
    durationEn: 'Half day – full day',
    durationAr: 'نصف يوم – يوم كامل',
    languagesEn: 'Arabic, English',
    languagesAr: 'عربي، إنجليزي',
    priceEn: 'from ≈ 40 JOD / person',
    priceAr: 'من ≈ 40 د.أ للشخص'
  },
  {
    id: 'tour-jordan-multi',
    icon: '🗺️',
    nameEn: 'Multi-day Jordan tours',
    nameAr: 'شركة جولات الأردن متعددة الأيام',
    servicesEn: 'Amman, Jerash, the Dead Sea, Petra and Wadi Rum with hotels and transport.',
    servicesAr: 'عمّان، جرش، البحر الميت، البترا ووادي رم مع الفنادق والمواصلات.',
    durationEn: '4–8 days',
    durationAr: '4–8 أيام',
    languagesEn: 'Arabic, English, Spanish',
    languagesAr: 'عربي، إنجليزي، إسباني',
    priceEn: 'from ≈ 500 JOD / person',
    priceAr: 'من ≈ 500 د.أ للشخص'
  }
];
