/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Language, Landmark } from '../types';
import { LANDMARKS } from '../data/landmarks';
import { playSuccessChime } from '../utils/audio';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Compass,
  MapPin,
  Check,
  Zap,
  Lock,
  BookOpen,
  Volume2,
  VolumeX,
  Scroll,
  Lightbulb,
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';

export interface QuizQuestion {
  id: string;
  landmarkId: string;
  questionAr: string;
  questionEn: string;
  optionsAr: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn: string;
}

export interface LandmarkMyth {
  id: string;
  landmarkId: string;
  titleAr: string;
  titleEn: string;
  storyAr: string;
  storyEn: string;
  secretFactAr: string;
  secretFactEn: string;
  narratorRoleAr: string;
  narratorRoleEn: string;
}

// 1. Comprehensive Archaeological Question Bank for the 17 Petra Landmarks
export const PETRA_LANDMARKS_QUIZ_BANK: QuizQuestion[] = [
  // 1. Bab as-Siq & Obelisk Tomb
  {
    id: 'q_bab_as_siq_1',
    landmarkId: 'bab_as_siq',
    questionAr: 'ماذا تمثل المسلات الأربع المنحوتة في الصخر أعلى ضريح المسلات في باب السيق؟',
    questionEn: 'What do the four stone-carved obelisks atop the Obelisk Tomb in Bab as-Siq represent?',
    optionsAr: [
      'رمزية لأرواح المتوفين النبطيين (النفش)',
      'فصول السنة الأربعة في التقويم النبطي',
      'حراس الجهات الأربع لطرق البخور',
      'آلهة الشمس والقمر والريح والماء'
    ],
    optionsEn: [
      'Symbolic representations of deceased Nabataean souls (Nefesh)',
      'The four seasons of the Nabataean agricultural calendar',
      'Guardians of the four incense trade crossroads',
      'Deities of the sun, moon, wind, and rain'
    ],
    correctIndex: 0,
    explanationAr: 'في المعتقدات النبطية، ترمز المسلات الأربع الهرمية إلى "النفش" (Nefesh)؛ وهي نُصب تذكارية جنائزية تمثل أرواح الموتى المخلدة.',
    explanationEn: 'In Nabataean religious funerary tradition, the four pyramidions represent "Nefesh", sacred stone monuments commemorating the eternal souls of the departed.'
  },
  {
    id: 'q_bab_as_siq_2',
    landmarkId: 'bab_as_siq',
    questionAr: 'ما الوظيفة الأصلية لقاعة "التريكلينيوم" الواقعة مباشرة تحت ضريح المسلات؟',
    questionEn: 'What was the historical purpose of the rock-cut Triclinium directly beneath the Obelisk Tomb?',
    optionsAr: [
      'قاعة مآدب وولائم دينية جنائزية سنوية لتكريم الأسلاف',
      'مستودع لتخزين أكياس البخور والتوابل الثمينة',
      'محكمة عسكرية لفصل نزاعات قوافل المسافرين',
      'صهريج عميق لحفظ مياه فيضانات الشتاء'
    ],
    optionsEn: [
      'A banquet hall for annual sacred funerary feasts honoring ancestors',
      'A fortified storehouse for imported frankincense and spices',
      'A military court settling merchant caravan disputes',
      'A subterranean cistern collecting winter flash-floods'
    ],
    correctIndex: 0,
    explanationAr: 'التريكلينيوم يضم ثلاثة مقاعد حجرية منقوشة في الجدران لتناول الطعام والاجتماع في ولائم دينية سنوية تكريماً لأرواح الأجداد.',
    explanationEn: 'The rock-cut triclinium contained three stone couches where families gathered annually for ceremonial communal feasts honoring deceased kin.'
  },

  // 2. The Djinn Blocks
  {
    id: 'q_djinn_blocks_1',
    landmarkId: 'djinn_blocks',
    questionAr: 'ما الغرض المعماري والديني لكتل الجن الصخرية الثلاث الضخمة عند مدخل البترا؟',
    questionEn: 'What was the primary religious and protective purpose of the monolithic Djinn Blocks?',
    optionsAr: [
      'أنصاب حجرية مكعبة مقدسة (أنصاب نذرية/بتيل) لحراسة مدخل المدينة ومباركة القوافل',
      'أبراج مراقبة عسكرية بنيت في العهد الصليبي',
      'أفران صخرية لصهر خامات النحاس والحديد',
      'قواعد لمنارات حجرية توقد فيها النيران ليلاً'
    ],
    optionsEn: [
      'Sacred aniconic monuments (betyls) serving as spiritual guardians of the valley entry',
      'Crusader-era defensive watchtowers guarding the gorge',
      'Rock furnaces designed for smelting iron and copper ore',
      'Elevated stone plinths for nocturnal signaling beacons'
    ],
    correctIndex: 0,
    explanationAr: 'نحت الأنباط هذه المكعبات الضخمة كأنصاب نذرية مقدسة تجسد أرواح الحماية (البتيل الصخري) لمباركة القوافل التجارية القادمة للبترا.',
    explanationEn: 'Nabataeans carved these imposing stone cubes as betyls (sacred aniconic stones) embodying divine protectors guarding travelers and merchants.'
  },

  // 3. The Siq Gorge
  {
    id: 'q_siq_1',
    landmarkId: 'siq',
    questionAr: 'كم تبلغ زاوية الانحدار الدقيقة التي صممها الأنباط لقنوات الفخار على جدران السيق؟',
    questionEn: 'What subtle gradient did Nabataean engineers maintain along the terracotta conduits lining the Siq?',
    optionsAr: [
      'انحدار تدريجي بنحو درجتين (2°) لمنع تآكل الفخار بفعل سرعة تدفق الماء',
      'انحدار شديد بزاوية 45 درجة لتسريع وصول الماء',
      'مسار أفقي مستوٍ تماماً (صفر درجات)',
      'انحدار حاد بزاوية 25 درجة نحو خزانات الخزنة'
    ],
    optionsEn: [
      'A gentle 2-degree gradient calibrated to deliver water without eroding clay pipes',
      'A steep 45-degree slope designed to maximize water velocity',
      'A perfectly horizontal water level without gradient',
      'A rapid 25-degree plunge directly into cistern chambers'
    ],
    correctIndex: 0,
    explanationAr: 'اعتمد المهندسون الأنباط انحداراً محسوباً بدقة لا يتجاوز درجتين لضمان تدفق هادئ ومستمر لمياه نبع عين موسى دون تشقق الأنابيب الفخارية.',
    explanationEn: 'Nabataean hydraulic masters calibrated the channels to a precise ~2° tilt, maintaining smooth laminar flow from Ain Musa while preventing pipe erosion.'
  },
  {
    id: 'q_siq_2',
    landmarkId: 'siq',
    questionAr: 'كم يبلغ الطول التقريبي لممر السيق الطبيعي وما أقصى ارتفاع لجدرانه الصخرية؟',
    questionEn: 'What is the length of the Siq corridor and the maximum height of its towering canyon walls?',
    optionsAr: [
      'طوله 1.2 كم وترتفع جدرانه الصخرية حتى 80 متراً',
      'طوله 5 كم وترتفع جدرانه حتى 20 متراً',
      'طوله 300 متر وترتفع جدرانه حتى 150 متراً',
      'طوله 8 كم وترتفع جدرانه حتى 40 متراً'
    ],
    optionsEn: [
      'Approximately 1.2 km in length with cliff walls soaring up to 80 meters',
      '5 kilometers long with cliffs reaching 20 meters high',
      '300 meters long with vertical canyon drops of 150 meters',
      '8 kilometers long with walls averaging 40 meters high'
    ],
    correctIndex: 0,
    explanationAr: 'السيق هو شق جيولوجي طبيعي ناتج عن الحركات التكتونية بطول 1200 متر وارتفاع صخري شاهق يصل لـ 80 متراً يوفر ظلاً وبرودة طبيعية.',
    explanationEn: 'The Siq is a natural tectonic fault chasm measuring roughly 1.2 kilometers, enclosed by sheer sandstone cliffs rising up to 80 meters.'
  },

  // 4. The Siq Dam & Al-Mudhlim Tunnel
  {
    id: 'q_siq_dam_1',
    landmarkId: 'siq_dam',
    questionAr: 'ما الهدف الهندسي الحيوي لبناء سد السيق ونفق وادي المظلم المحفور في الجبل؟',
    questionEn: 'What was the vital engineering purpose of the Siq Dam and the hand-hewn Al-Mudhlim tunnel?',
    optionsAr: [
      'تحويل مسار فيضانات الشتاء الجارفة بعيداً عن السيق لحماية المارة والمدينة',
      'إنشاء خزان لتوليد طاقة مطاحن الحبوب المائية',
      'منع المهربين والقوافل من دخول المدينة دون تفتيش',
      'توفير بحيرة صخرية لتربية الطيور المائية'
    ],
    optionsEn: [
      'Diverting catastrophic flash floods away from the Siq into Wadi Al-Mudhlim',
      'Creating a high-pressure reservoir to operate hydraulic grain mills',
      'Constructing a toll barrier to prevent untaxed caravan passage',
      'Maintaining an artificial lake for royal aquatic gardens'
    ],
    correctIndex: 0,
    explanationAr: 'شيد الأنباط سداً حجرياً متيناً ونفقاً طوله 88 متراً في صلب الجبل لتغيير مجرى سيول الشتاء الهادرة إلى وادي المظلم، حمايةً لرواد السيق والمدينة.',
    explanationEn: 'Nabataean engineers carved an 88m tunnel through the mountain to steer flash-floods away from the narrow Siq into Wadi Al-Mudhlim, saving countless lives.'
  },

  // 5. The Treasury (Al-Khazneh)
  {
    id: 'q_treasury_1',
    landmarkId: 'treasury',
    questionAr: 'ما الوظيفة التاريخية الحقيقية لواجهة "الخزنة" كما أثبتت التنقيبات الأثرية الحديثة؟',
    questionEn: 'What was the true historical purpose of Al-Khazneh (The Treasury) proven by modern archaeology?',
    optionsAr: [
      'ضريح ملكي فاخر ومدفن للملك النبطي الحارث الرابع',
      'خزينة الدولة الرسمية لتكديس سبائك الذهب والفضة',
      'قصر إقامة صيفي مخصص للملكة النبطية شقيلة',
      'معبد وثني روماني للإله مارس'
    ],
    optionsEn: [
      'A monumental royal tomb and mausoleum for Nabataean King Aretas IV',
      'The imperial vault for stockpiling tax silver and gold coins',
      'The private summer residence of Queen Shaqilath',
      'A Roman garrison temple dedicated to the god Mars'
    ],
    correctIndex: 0,
    explanationAr: 'أثبتت المدافن المكتشفة أسفل الواجهة عام 2003 أن الخزنة صرح ملكي جنائزي شُيد للملك الحارث الرابع (أعظم ملوك الأنباط الذي حكم 9 ق.م - 40 م).',
    explanationEn: 'Subterranean tomb discoveries confirmed Al-Khazneh was commissioned in the early 1st century AD as a royal mausoleum for King Aretas IV.'
  },
  {
    id: 'q_treasury_2',
    landmarkId: 'treasury',
    questionAr: 'ما دلالة الجرة الصخرية المنحوتة في أعلى القبة الأسطوانية لتاج الخزنة؟',
    questionEn: 'What is the significance of the stone urn carved on the tholos crowning the Treasury facade?',
    optionsAr: [
      'جرة رماد جنائزية رمزية (أطلقت عليها الأساطير الشعبية كنز فرعون)',
      'جرة تخزين مخصصة لزيت الزيتون المقدس المعصور يدوياً',
      'مرصد فلكي لتحديد وقت الانقلاب الصيفي بدقة',
      'مقياس لقياس كمية هطول الأمطار السنوية'
    ],
    optionsEn: [
      'A funerary urn motif which later Bedouin folklore believed held Pharaoh’s gold',
      'A storage vessel designed to preserve consecrated olive oil',
      'An astronomical device marking the precise summer solstice',
      'A rain gauge calibrating annual precipitation in the valley'
    ],
    correctIndex: 0,
    explanationAr: 'الجرة المنحوتة هي عنصر معماري جنائزي هلنستي يمثل جرة الرماد، وقد ظن البدو قديماً أنها تحتوي كنزاً ذهبياً لفرعون فأطلقوا عليها عيارات نارية.',
    explanationEn: 'The solid sandstone urn is a Hellenistic funerary symbol; local legend later fancied it contained Egyptian treasure, leaving rifle bullet scars.'
  },

  // 6. Street of Facades
  {
    id: 'q_street_facades_1',
    landmarkId: 'street_facades',
    questionAr: 'ما النمط الزخرفي المميز في قمم واجهات "شارع الواجهات" الصخرية؟',
    questionEn: 'What architectural crown motif characterizes the tombs along the Street of Facades?',
    optionsAr: [
      'التدرج الشرفي النبطي المدرج المستوحى من العمارة الآشورية (Crowstep)',
      'المثلثات الإغريقية الكورنثية الكلاسيكية',
      'الأقواس القوطية المزدوجة والمقببة',
      'القباب الحلزونية البيزنطية المزخرفة'
    ],
    optionsEn: [
      'Nabataean stepped crenellations (crowstep) inspired by Assyrian architecture',
      'Classical Hellenistic pediments framed with acanthus foliage',
      'Pointed Gothic lancet arches and stone ribbed vaults',
      'Byzantine spiral domes covered in polychrome plaster'
    ],
    correctIndex: 0,
    explanationAr: 'تتميز واجهات المقابر النبطية بدرجات السلالم المقلوبة (Crowstep) التي ترمز لدرجات الصعود إلى السماء في المعتقدات القديمة.',
    explanationEn: 'Nabataean tombs feature distinctive crowstep stepped parapets symbolizing spiritual stairways ascending toward the heavens.'
  },

  // 7. High Place of Sacrifice
  {
    id: 'q_high_place_1',
    landmarkId: 'high_place',
    questionAr: 'ما العناصر الدينية التي ما تزال قائمة في قمة "مذبح التضحية العالي"؟',
    questionEn: 'What primary sacred features remain preserved atop the High Place of Sacrifice?',
    optionsAr: [
      'مذبحان صخريان لتقديم القرابين مع قنوات لتصريف الدماء وأحواض تطهير بالماء',
      'منصة للمدافع الحربية الصليبية مع أبراج حراسة',
      'مدفن ملكي مقبب يحتوي على توابيت خشبية',
      'سوق تجاري لبيع الأقمشة والمصوغات الفضية'
    ],
    optionsEn: [
      'Two rock-hewn altars with blood drainage grooves and lustration water basins',
      'Crusader cannon platforms with reinforced defensive bastions',
      'A domed royal crypt housing cedar-wood sarcophagi',
      'An open-air trading bazaar for textiles and precious gems'
    ],
    correctIndex: 0,
    explanationAr: 'يضم المذبح منصة دينية مفتوحة للسماء مع حوض دائري للتطهير وقنوات منحوتة لتصريف دماء الأضاحي تكريماً للإله ذو الشرى والإلهة العزى.',
    explanationEn: 'The exposed mountain sanctuary retains rock altars with drainage runnels for sacrificial blood and water cisterns for sacred ablutions.'
  },

  // 8. The Great Theatre
  {
    id: 'q_theatre_1',
    landmarkId: 'theatre',
    questionAr: 'ما الخاصية الفريدة التي تميز المدرج النبطي الكبير عن معظم المسارح الرومانية في العالم؟',
    questionEn: 'What unique architectural feature distinguishes Petra’s Great Theatre from most Roman theatres?',
    optionsAr: [
      'منحوت بالكامل في صلب صخور الجبل مع اقتطاع مقابر نبطية سابقة له في نفس الموقع',
      'مشيد بالكامل من كتل الخرسانة الرومانية المستوردة من إيطاليا',
      'يقع داخل كهف تحت أرضي مغلق تماماً عن أشعة الشمس',
      'مبني على هياكل خشبية متحركة يمكن تفكيكها ونقلها'
    ],
    optionsEn: [
      'It is carved entirely into the living rock, shearing through earlier Nabataean tombs',
      'Constructed entirely of imported Roman pozzolana concrete',
      'Situated entirely inside an enclosed subterranean cavern',
      'Built upon portable wooden timber frameworks for mobile performances'
    ],
    correctIndex: 0,
    explanationAr: 'نحت الأنباط مدرجات المسرح (التي تتسع لنحو 4000 إلى 8500 متفرج) مباشرة في صخر جبل الخبثة، مضحين بمقابر قديمة كانت موجودة في نفس الجرف.',
    explanationEn: 'Unlike freestanding masonry theatres, Petra’s theatre was carved directly into living sandstone cliffs, cutting straight through earlier tombs.'
  },

  // 9. The Royal Tombs
  {
    id: 'q_royal_tombs_1',
    landmarkId: 'royal_tombs',
    questionAr: 'على أي جبل شاهق تنتصب واجهات "القبور الملكية" المهيبة المشرفة على وسط البترا؟',
    questionEn: 'Along which imposing mountain cliff are the monumental Royal Tombs facades carved?',
    optionsAr: [
      'جبل الخبثة المشرف على الوادي الأوسط',
      'جبل هارون في أقصى الجنوب الغربي',
      'جبل أم البيارة في غرب المدينة القديمة',
      'جبل مذر في وادي دلاغة'
    ],
    optionsEn: [
      'Jabal Al-Khubtha overlooking the central valley basin',
      'Mount Hor (Jabal Haroun) in the far southwest',
      'Jabal Umm al-Biyara on the western perimeter',
      'Jabal Madhar in the remote canyons of Dalagha'
    ],
    correctIndex: 0,
    explanationAr: 'تزين القبور الملكية المنحوتة الجبهة الغربية لجبل الخبثة الصخري وتتلألأ بألوان الحجر الرملي الوردي عند غروب الشمس.',
    explanationEn: 'The Royal Tombs grace the western face of Jabal Al-Khubtha, towering majestically above the colonnaded city center below.'
  },

  // 10. The Urn Tomb
  {
    id: 'q_urn_tomb_1',
    landmarkId: 'urn_tomb',
    questionAr: 'إلى ماذا تم تحويل "قبر الجرة" في العصر البيزنطي عام 446 ميلادي برعاية الأسقف جيسون؟',
    questionEn: 'Into what was the Urn Tomb officially consecrated in 446 AD under Bishop Jason?',
    optionsAr: [
      'كاتدرائية بيزنطية رئيسية في بترا مع نقش تاريخي باليونانية في جدارها',
      'قلعة وحامية عسكرية صليبية لفرسان الهيكل',
      'مستودع لتخزين الحبوب والمحاصيل الاستراتيجية',
      'مدرسة لتعليم اللغة النبطية القديمة'
    ],
    optionsEn: [
      'The primary cathedral church of Petra with a dedicated Greek inscription',
      'A fortified Crusader stronghold garrisoned by Templar knights',
      'An agricultural silo holding wheat reserves for winter sieges',
      'An academy devoted to teaching ancient Nabataean cursive script'
    ],
    correctIndex: 0,
    explanationAr: 'في عام 446م، حول الأسقف جيسون قاعة قبر الجرة الضخمة إلى كنيسة كاتدرائية رئيسية، وما زال النقش اليوناني التذكاري شاهداً في جدارها الخلفي.',
    explanationEn: 'In 446 AD, the Byzantine Bishop Jason consecrated the grand chamber into Petra’s cathedral, engraving a commemorative Greek inscription on the back wall.'
  },

  // 11. The Silk Tomb
  {
    id: 'q_silk_tomb_1',
    landmarkId: 'silk_tomb',
    questionAr: 'لماذا سُمي "قبر الحرير" بهذا الاسم الشاعري؟',
    questionEn: 'Why was the "Silk Tomb" given its evocative poetic name?',
    optionsAr: [
      'بسبب التموجات اللونية الطبيعية الساحرة لطبقات الصخر الوردي والأصفر والرمادي كالحرير',
      'لأنه كان متجراً حصرياً لبيع أقمشة الحرير القادمة عبر طريق الحرير الصيني',
      'لوجود ستائر حريرية حقيقية وُجدت محنطة داخل مدفنه الصخري',
      'لأن ملكة نبطية نسجت ثوب زفافها الحريري داخل غرفته الصخرية'
    ],
    optionsEn: [
      'For its swirling natural sandstone mineral bands resembling folded shimmering silk',
      'Because it functioned as the exclusive terminus for silk imported from China',
      'Due to preserved rolls of dyed silk cloth discovered intact inside its burial shaft',
      'Because a legendary Nabataean queen wove her wedding gown within its chamber'
    ],
    correctIndex: 0,
    explanationAr: 'تظهر واجهة قبر الحرير أروع تموجات رسوبية طبيعية لأكسيد الحديد والمنغنيز في الحجر الرملي، فتبدو كخيوط حريرية مموجة بالألوان.',
    explanationEn: 'The facade features dramatic geological banding of iron and manganese minerals, creating swirling pastel patterns reminiscent of watered silk.'
  },

  // 12. The Corinthian Tomb
  {
    id: 'q_corinthian_tomb_1',
    landmarkId: 'corinthian_tomb',
    questionAr: 'ما الطراز المعماري الهجين الذي يجمع بينه "القبر الكورنثي" في تصميمه؟',
    questionEn: 'What hybrid architectural combination defines the facade of the Corinthian Tomb?',
    optionsAr: [
      'مزيج يجمع بين عناصر الخزنة النبطية والتيجان الكورنثية المزخرفة بأوراق الأكانثوس',
      'طراز قوطي أوروبي مع أبراج جرس إيطالية',
      'فن إسلامي أندلسي بنقوش أرابيسك مقوسة',
      'عمارة بابلية طينية مكسوة بالآجر المزجج'
    ],
    optionsEn: [
      'A blend echoing Al-Khazneh crowned with floral Corinthian acanthus capitals',
      'Gothic arches combined with Italianate bell-tower pinnacles',
      'Andalusian Moorish horseshoe arches and stucco tracery',
      'Babylonian mud-brick architecture framed with glazed cobalt tiles'
    ],
    correctIndex: 0,
    explanationAr: 'يستعير القبر الكورنثي تصميمه العلوي من الخزنة مع قبة أسطوانية (Tholos) ويتزين بتيجان أعمدة كورنثية كلاسيكية مع لمسات نبطية أصيلة.',
    explanationEn: 'The Corinthian Tomb echoes the Treasury’s upper tholos and pediment structure while introducing intricate Hellenistic Corinthian capitals.'
  },

  // 13. The Palace Tomb
  {
    id: 'q_palace_tomb_1',
    landmarkId: 'palace_tomb',
    questionAr: 'ما الميزة المعمارية الاستثنائية التي تميز واجهة "قبر القصر" الضخمة المكونة من ثلاثة طوابق؟',
    questionEn: 'What exceptional construction technique distinguishes the massive three-story Palace Tomb?',
    optionsAr: [
      'تم بناء أجزائها العلوية بأحجار منحوتة مسبقة الصنع لأن الجبل الطبيعي لم يكن كافياً لارتفاعها الهائل',
      'بُنيت بالكامل من كتل الرخام الأبيض المستورد من جزيرة باروس اليونانية',
      'تحتوي على حدائق معلقة ونوافير ماء طبيعية في شرفاتها العلوية',
      'تضم قاعة عرش ملكية مطلية بصفائح من الذهب الخالص'
    ],
    optionsEn: [
      'Its upper stories were built with ashlar masonry because the natural cliff was not tall enough',
      'It was carved exclusively from imported Greek Parian white marble',
      'It featured hanging gardens and gravity-fed fountains on its balconies',
      'It housed a golden throne room plated with hammered bullion'
    ],
    correctIndex: 0,
    explanationAr: 'نظراً لضخامة الواجهة التي تحاكي القصور الرومانية، لم تكن صخور الجبل كافية في الأعلى، فأكمل البناؤون النبطيون الطوابق العليا بمداميك حجرية مبنية.',
    explanationEn: 'So vast was this five-door palace facade that the natural cliff fell short, requiring Nabataean masons to construct the upper tier from cut stone blocks.'
  },

  // 14. The Colonnaded Street
  {
    id: 'q_colonnaded_street_1',
    landmarkId: 'colonnaded_street',
    questionAr: 'ما هو الدور الرئيسي للشارع المعمد (Colonnaded Street) في قلب بترا القديمة؟',
    questionEn: 'What was the primary civil and cultural role of Petra’s Colonnaded Street?',
    optionsAr: [
      'الشريان المدني والتجاري والاحتفالي المرصوف الذي يربط مركز المدينة بالمعابد والأسواق',
      'مجرى مائي تحت أرضي لتصريف مخلفات الصرف الصحي',
      'مضمار لسباق العربات الحربية ذات الخيول الرباعية',
      'سور عسكري فاصل بين الأحياء السكنية'
    ],
    optionsEn: [
      'The paved civic, commercial, and ceremonial boulevard connecting temples and markets',
      'A subterranean canal engineered solely for sewage discharge',
      'An enclosed Hippodrome track reserved for chariot races',
      'A defensive rampart segregating civic districts'
    ],
    correctIndex: 0,
    explanationAr: 'رصف الأنباط هذا الشارع العريض بالحجارة ليكون الشريان الحيوي للمدينة، وحفته الأعمدة والمتاجر والأسواق الحرفية، وكان يعبره الملوك والقوافل.',
    explanationEn: 'The Colonnaded Street formed the beating commercial heart of Petra, lined with colonnades, public plazas, civic shops, and royal processions.'
  },

  // 15. Qasr al-Bint Temple
  {
    id: 'q_qasr_bint_1',
    landmarkId: 'qasr_bint',
    questionAr: 'ما السر الهندسي العبقري الذي حمى معبد "قصر البنت" من الانهيار التام في زلزال عام 363 م؟',
    questionEn: 'What architectural innovation saved the Qasr al-Bint temple from collapsing during the 363 AD earthquake?',
    optionsAr: [
      'تضمين مداميك من خشب العرعر المرن داخل مداميك الحجر لامتصاص الصدمات الزلزالية',
      'بناؤه فوق وسائد مطاطية مضادة للهزات الأرضية',
      'استناده إلى أعمدة من الفولاذ المقاوم للصدأ',
      'بناء جدرانه من الطين الخفيف المجفف بالشمس'
    ],
    optionsEn: [
      'Embedding flexible juniper wooden stringers within stone masonry joints to absorb tremors',
      'Resting its foundations on subterranean vulcanized rubber dampeners',
      'Reinforcing the internal stone sanctum with tempered steel rods',
      'Constructing the perimeter walls from ultralight sun-baked mud plaster'
    ],
    correctIndex: 0,
    explanationAr: 'ابتكر المهندسون الأنباط تقنية العوارض الخشبية الزلزالية (خشب العرعر) داخل الجدران الحجرية، مما منح المعبد مرونة لامتصاص موجات زلزال 363م المدمر.',
    explanationEn: 'Nabataean builders embedded resilient juniper timber beams horizontally inside ashlar joints; this seismic dampening spared the temple from total collapse.'
  },

  // 16. The Lion Triclinium
  {
    id: 'q_lion_triclinium_1',
    landmarkId: 'lion_triclinium',
    questionAr: 'أين يقع تريكلينيوم الأسد الجبلي وما الذي يميز مدخله الصخري؟',
    questionEn: 'Where is the Lion Triclinium located and what unique sculpture guards its portal?',
    optionsAr: [
      'يقع في شق جانبي أثناء الصعود للدير وتحرسه نقوش أسدين نبطيين بارزين',
      'يقع عند بوابة مركز الزوار وتحرسه تماثيل نسور برونزية',
      'يقع في قمة جبل هارون وتحرسه خيول مجنحة',
      'يقع في نفق المظلم وتحرسه نقوش الجمال'
    ],
    optionsEn: [
      'In a side ravine along the ascent to Ad-Deir, guarded by two relief-carved lions',
      'Beside the visitor welcome plaza guarded by bronze eagle statues',
      'Atop Mount Hor guarded by stone-carved winged pegasi',
      'Inside the Al-Mudhlim tunnel guarded by camel reliefs'
    ],
    correctIndex: 0,
    explanationAr: 'يختبئ هذا الصرح داخل شق وادٍ جانبي على درب الدير الصخري؛ وكان قاعة مقدسة للضيافة والولائم ويحرسه أسدان نبطيان منحوتان في الجدار.',
    explanationEn: 'Tucked inside a rocky tributary canyon on the trail to Ad-Deir, this feast chamber is flanked by two carved rampant lions warding off evil.'
  },

  // 17. Ad-Deir (The Monastery)
  {
    id: 'q_monastery_1',
    landmarkId: 'monastery',
    questionAr: 'كم يبلغ ارتفاع واجهة صرح "الدير" العملاقة وكم عدد الدرجات الصخرية المؤدية إليه؟',
    questionEn: 'How tall is the colossal facade of Ad-Deir (The Monastery) and how many rock-cut steps lead to it?',
    optionsAr: [
      'ارتفاعه نحو 48 متراً وعرضه 47 متراً، ويتطلب صعود قرابة 800 درجة صخرية وعرة',
      'ارتفاعه 15 متراً وعرضه 10 أمتار بعد صعود 50 درجة فقط',
      'ارتفاعه 90 متراً ويتطلب صعود 4000 درجة جبلية',
      'ارتفاعه 25 متراً ويقع في منطقة منبسطة دون درجات'
    ],
    optionsEn: [
      'Approximately 48 meters high by 47 meters wide, reached by climbing ~800 rock-hewn steps',
      '15 meters high by 10 meters wide, accessible after a brief 50-step flight',
      '90 meters tall requiring an alpine ascent of over 4,000 stairs',
      '25 meters tall situated on flat plateau terrain without rock stairs'
    ],
    correctIndex: 0,
    explanationAr: 'الدير هو أضخم صروح البترا على الإطلاق؛ إذ يفوق الخزنة حجماً، بارتفاع 48 متراً وقطر جرته العلوية وحده 9 أمتار، وصعوده يتطلب نحو 800 درجة.',
    explanationEn: 'Ad-Deir is Petra’s largest monumental facade, spanning 48m in height, with its crowning urn alone standing 9 meters tall, reached via 800 mountain steps.'
  },
  {
    id: 'q_monastery_2',
    landmarkId: 'monastery',
    questionAr: 'لمن كُرّس صرح الدير في أعالي جبال البترا وفق النقوش المكتشفة بالقرب منه؟',
    questionEn: 'To whom was the monumental sanctuary of Ad-Deir dedicated according to adjacent rock inscriptions?',
    optionsAr: [
      'للملك النبطي المؤله عبادة الأول (Obodas I) لإقامة المآدب والطقوس التذكارية',
      'للإمبراطور الروماني هادريان بعد زيارته للمدينة',
      'للقائد العسكري الإغريقي ديمتريوس الفاتح',
      'للإله الفرعوني أوزوريس إله الخصب'
    ],
    optionsEn: [
      'To the deified Nabataean King Obodas I for solemn commemorative religious banquets',
      'To Roman Emperor Hadrian following his historic tour of Arabia Petraea',
      'To the Hellenistic warlord Demetrius the Besieger',
      'To the Egyptian fertility god Osiris'
    ],
    correctIndex: 0,
    explanationAr: 'عُثر في الصخور المجاورة للدير على نقش نبطي صريح يذكر "مجمع عبادة الإله"، مما يؤكد أن المكان كان مزاراً للملك النبطي المؤله عبادة الأول.',
    explanationEn: 'Nearby inscriptions explicitly reference the sacred symposium of "Obodas the God", confirming the sanctuary hosted rituals honoring King Obodas I.'
  }
];

// 2. Comprehensive Embedded Myths & Legends Codex for the 17 Landmarks
export const PETRA_MYTHS_AND_LEGENDS: LandmarkMyth[] = [
  {
    id: 'myth_bab_as_siq',
    landmarkId: 'bab_as_siq',
    titleAr: 'حكاية النفش وأرواح الأجداد الحارسة',
    titleEn: 'Legend of the Nefesh & Ancestral Guardian Souls',
    storyAr: 'تروي أساطير النبط أن أرواح القادة القدامى لا تفارق وادي باب السيق، بل تحل في المسلات الصخرية الأربع لتطرد الأرواح الشريرة عن المسافرين وتمنح البركة لكل قافلة تجارية تدخل الوادي محملة بالبخور واللبان. وتحت هذه المسلات، كانت العائلات تجتمع في قاعة الصخر لتتشارك طعام الخلود وتروي أمجاد الأجداد.',
    storyEn: 'Ancient Nabataean legends whisper that ancestral souls never departed Bab as-Siq. Instead, they dwell within the four towering rock obelisks (Nefesh), warding off malevolent canyon spirits and blessing weary caravans bringing frankincense from southern deserts.',
    secretFactAr: 'حفر الأنباط قاعة التريكلينيوم تحت المسلات لكي تصعد روائح الأطعمة النذرية المشوية والأبخرة المعطرة مباشرة نحو أرواح الأجداد المقيمة في المسلات.',
    secretFactEn: 'Nabataeans carved the banquet chamber beneath the obelisks so the aromatic incense and roasted offerings would waft straight up to nourish ancestral spirits.',
    narratorRoleAr: 'الصقر النبطي الحارس',
    narratorRoleEn: 'The Nabataean Falcon'
  },
  {
    id: 'myth_djinn_blocks',
    landmarkId: 'djinn_blocks',
    titleAr: 'أسطورة صخور الجن وحراس البوابة الصخرية',
    titleEn: 'Legend of the Djinn Blocks & Gate Sentinels',
    storyAr: 'اعتقد سكان الوادي منذ آلاف السنين أن هذه المكعبات الصخرية العملاقة هي مساكن مقدسة لكائنات خفية تحرس أسرار البترا، ولا تسمح لمن يحمل في قلبه غدراً أن يمر بسلام عبر مضيق السيق. وكان البدو قديماً يتهيبون المرور بجانبها بعد مغيب الشمس توقيراً لسكناها الروحانيين.',
    storyEn: 'For generations, nomadic travelers believed these monolithic stone towers housed invisible desert djinn guarding the hidden basin. No caravan harboring deceit could safely breach the Siq without offering reverence to these silent sandstone sentinels.',
    secretFactAr: 'تُعرف هذه المكعبات أثرياً باسم (البتيل)، وهي تجسيد رمزي صخري غير بشري للآلهة النبطية الحامية التي تبارك الزوار.',
    secretFactEn: 'Archaeologically known as betyls, these cubes were sacred aniconic stones representing divine presence watching over merchants entering Petra.',
    narratorRoleAr: 'الوعل النوبي الأسطوري',
    narratorRoleEn: 'The Legendary Nubian Ibex'
  },
  {
    id: 'myth_siq',
    landmarkId: 'siq',
    titleAr: 'سر انشقاق الجبل وصوت مياه عين موسى',
    titleEn: 'The Cleaved Chasm & the Voice of Moses Springs',
    storyAr: 'يحكي الرواة النبطيون أن الجبال تصدعت في قديم الزمان لتفتح هذا الشريان الساحر ليمر منه النور. وكانت قطرات الماء المنسابة عبر القنوات الفخارية تعزف لحناً هادئاً يهدئ روع الرحالة بعد مسير طويل في صحراء الشام والحجاز. وكان الممر يبث السكينة في نفوس القوافل بظلاله الباردة وهوائه العليل.',
    storyEn: 'Folklore says the red mountains cracked open in primeval times to create a sacred portal of shadow and breeze. Terracotta pipes delivered living spring water from Ain Musa, its rhythmic trickling soothing sun-scorched caravaners arriving from the desert.',
    secretFactAr: 'قنوات الفخار محكمة بعازف مائي من الجير البركاني لمنع تسرب قطرة ماء واحدة في قلب الصخر، وظلت تعمل بكفاءة لمئات السنين.',
    secretFactEn: 'The clay aqueducts were sealed with volcanic hydraulic mortar, maintaining uninterrupted freshwater delivery without losing a single precious drop.',
    narratorRoleAr: 'الصقر البتراوي',
    narratorRoleEn: 'The Petra Falcon'
  },
  {
    id: 'myth_siq_dam',
    landmarkId: 'siq_dam',
    titleAr: 'حكاية ترويض السيول الهادرة ونفق المظلم',
    titleEn: 'Taming the Furious Flash-Floods & the Dark Tunnel',
    storyAr: 'عندما كانت تهدر سيول الشتاء المباغتة لتغرق كل من في السيق، وقف المهندسون النبطيون وقفة عز وتحدوا قوى الطبيعة، فشقوا نفق المظلم بأيديهم في قلب الصخر الأصم ليرغموا الماء الهادر على الانصياع والانعطاف بعيداً! ومنذ ذلك اليوم تحول طغيان الفيضان إلى مصدر للحياة والري.',
    storyEn: 'When winter flash-floods roared down the gorge threatening the city, master Nabataean stonecutters struck the bedrock with bronze picks, chiseling an 88-meter tunnel right through the mountain cliff to redirect the fury of the waters into tranquil irrigation.',
    secretFactAr: 'النفق بطول 88 متراً تم حفره بالمطارق والأزاميل البرونزية من الجهتين ليلتقي العمال في المنتصف بدقة متناهية ودون استخدام أجهزة مساحة حديثة!',
    secretFactEn: 'The 88m tunnel was bored simultaneously from both ends using hand chisels, meeting in the middle with uncanny precision without modern optical instruments.',
    narratorRoleAr: 'الوعل النوبي',
    narratorRoleEn: 'The Nubian Ibex'
  },
  {
    id: 'myth_treasury',
    landmarkId: 'treasury',
    titleAr: 'سر الجرة الصخرية وأسطورة كنز فرعون',
    titleEn: 'The Mystery of the Stone Urn & Pharaoh’s Hoard',
    storyAr: 'تقول الحكاية الشعبية إن فرعون مصر عندما لاحق نبي الله موسى، أودع كنوزه الذهبية الخالدة في جرة الخزنة العالية وسحرها لتبقى عصية على اللصوص. لكن الحقيقة النبطية أبهى: إنها بوابة العبور نحو الخلود للملك العظيم الحارث الرابع، حيث تجتمع دقة الهندسة مع روعة التعبير الروحي في صخرة واحدة.',
    storyEn: 'Desert legend told that Pharaoh hid his infinite gold within the urn atop this glowing rosy facade, binding it with ancient enchantments. In truth, Al-Khazneh was built by King Aretas IV as an eternal bridge between mortality and the stars.',
    secretFactAr: 'الجرة الصخرية ليست مجوفة بل هي كتلة حجرية مصمتة، وآثار الرصاص عليها تعود لمحاولات بدو القرن التاسع عشر كسرها أملاً في تساقط الذهب!',
    secretFactEn: 'The crowning urn is completely solid sandstone; the circular pockmarks visible upon it were made by 19th-century muskets trying in vain to break open mythical gold.',
    narratorRoleAr: 'الصقر النبطي',
    narratorRoleEn: 'The Royal Falcon'
  },
  {
    id: 'myth_street_facades',
    landmarkId: 'street_facades',
    titleAr: 'أسطورة درجات الصعود نحو سماء الأنباط',
    titleEn: 'Stairways to the Gods along the Street of Facades',
    storyAr: 'إذا نظرت لقمم الواجهات الصخرية المنحوتة في هذا الشارع، فسترى درجات متدرجة تحاكي السلالم. كان الأنباط يؤمنون أن الروح عند الفجر تصعد درجات هذه الشرفات الصخرية درجة بدرجة نحو النجوم لتلتقي برفقائها في عالم النور وتخلد ذكراها بين الصخور الوردية.',
    storyEn: 'Look closely at the stepped crowns along this cliffside street: Nabataeans carved these inverted crowstep stairs believing the departed soul would climb them rung by rung at sunrise, ascending from sandstone shadows toward celestial light.',
    secretFactAr: 'يضم هذا الشارع أكثر من 40 مقبرة محفورة في صفوف طبقية تعكس مكانة طبقات التجار والفرسان في المجتمع النبطي المزدهر.',
    secretFactEn: 'Over 40 rock-cut facades line this row, arranged in tiers reflecting the social prestige and mercantile wealth of Nabataean guildmasters.',
    narratorRoleAr: 'الوشق الصحراوي',
    narratorRoleEn: 'The Desert Caracal'
  },
  {
    id: 'myth_high_place',
    landmarkId: 'high_place',
    titleAr: 'حكاية القمة المقدسة ونسور الإله ذو الشرى',
    titleEn: 'The Sacred Peak & the Eagles of Dushara',
    storyAr: 'على قمة هذا الجرف الشاهق المعلق بين الأرض والسماء، كان كهنة الأنباط يوقدون المشاعل المقدسة ويقدمون القرابين مع أول خيوط الشمس. وكانت نسور البترا تحوم في الأعالي علامةً على قبول الدعاء ومباركة المدينة بالأمطار، فيما تسبح عيون الناظرين في فضاءات وادي عربة الشاسعة.',
    storyEn: 'Perched in the heavens where the winds howl across mountain parapets, priests of Dushara lit sacrificial braziers as dawn broke. Sacred eagles circled overhead, signaling that prayers for winter rains were heard and the desert realm was blessed.',
    secretFactAr: 'يوجد مسلتان صخريتان بارتفاع 6 أمتار تم نحتهما عبر تسوية قمة الجبل بأكمله حولهما وتفريغ آلاف الأطنان من الصخر لإبقائهما قائمتين!',
    secretFactEn: 'Two colossal 6-meter obelisks stand nearby, created not by quarrying stones, but by carving away the entire mountain surface around them!',
    narratorRoleAr: 'الصقر النبطي',
    narratorRoleEn: 'The Imperial Falcon'
  },
  {
    id: 'myth_theatre',
    landmarkId: 'theatre',
    titleAr: 'أسطورة مسرح الحياة المنحوت في قلب الصخر',
    titleEn: 'The Living Theatre Chiseled from Mountain Rock',
    storyAr: 'لم يشأ الأنباط أن يبنوا مسرحهم بحجارة عادية، بل نحتوه في جفن الجبل نفسه ليظل صوت الشعر والغناء النبطي والخطب السياسية يتردد عبر الصدى الطبيعي للجبال التي تحفظ أسرار المدينة الخالدة. وكان الجالس في أعلى درجاته يشهد تلاقي الفن الإنساني مع عظمة الطبيعة.',
    storyEn: 'Rather than assembling freestanding stones, Nabataean visionaries gouged an entire theatre into the red mountain breast. Its acoustics allowed the faintest whisper of verse or royal proclamation to echo across thousands of assembled spectators.',
    secretFactAr: 'يتسع المدرج لأكثر من 4000 مشاهد، وخلال نحته تم شق وتجاوز مدافن أثرية أقدم كانت موجودة في نفس جرف جبل الخبثة.',
    secretFactEn: 'Seating over 4,000 citizens, its construction boldly sheared through earlier family tombs, whose rectangular burial cavities remain visible today.',
    narratorRoleAr: 'الوعل النوبي',
    narratorRoleEn: 'The Mountain Ibex'
  },
  {
    id: 'myth_royal_tombs',
    landmarkId: 'royal_tombs',
    titleAr: 'أسطورة الشفق الوردي وعروش ملوك البترا',
    titleEn: 'The Rosy Twilight & the Thrones of Nabataean Kings',
    storyAr: 'حينما تغرب الشمس فوق وادي البترا، تشتعل واجهات القبور الملكية ببريق أحمر قاني وذهبي خلاب يخلب الألباب، ويقال إن ملوك الأنباط اختاروا هذا الجرف لترقد أجسادهم في واجهة الشمس المتجددة كل صباح، فتبدو قصورهم الصخرية كأنها حية تنبض بالحياة مع كل غروب وشروق.',
    storyEn: 'As twilight falls across the valley, the western Royal Tombs erupt into shades of flame and purple amethyst. Lore held that kings chose this precipice so the setting sun would cast their monumental crowns across the whole city every night.',
    secretFactAr: 'تتقاطع أشعة شمس الانقلاب الشتوي بزوايا هندسية فلكية دقيقة مع البوابات الرئيسية لمقابر الملوك لتضيء غرف الدفن الداخلية.',
    secretFactEn: 'Astronomical alignments allow the winter solstice sunbeams to shine directly through the portal thresholds into inner sanctum chambers.',
    narratorRoleAr: 'الصقر البتراوي',
    narratorRoleEn: 'The Royal Falcon'
  },
  {
    id: 'myth_urn_tomb',
    landmarkId: 'urn_tomb',
    titleAr: 'حكاية صرح الجرة والتحول البيزنطي المهيب',
    titleEn: 'The Monument of the Urn & the Byzantine Transformation',
    storyAr: 'كان هذا الصرح مدفناً للملك مالك الثاني، وتطل ساحته المحمولة على عقود ضخمة على كامل الوادي. ومع دخول المسيحية، اختاره الأسقف جيسون ليتحول إلى كاتدرائية البترا الكبرى وتتحول غرفه لمذبح للصلاة، فتعانقت الحضارة النبطية مع الإيمان البيزنطي في تناغم فريد.',
    storyEn: 'Built as the majestic tomb of King Malichus II with an enormous courtyard suspended on double-tier arches, it was consecrated in 446 AD by Bishop Jason into Petra’s grandest Byzantine cathedral, leaving ancient Greek hymns inscribed in stone.',
    secretFactAr: 'الأعمدة المقوسة التي تسند الساحة الخارجية شُيدت لتوفير مصطبة مستوية فوق المنحدر الصخري الشديد، وتضم تحتها ممرات وغرفاً غامضة.',
    secretFactEn: 'The massive vaulted arches supporting the open terrace were engineered to level the steep abyss, creating arched undercrofts beneath.',
    narratorRoleAr: 'الوشق الصحراوي',
    narratorRoleEn: 'The Desert Lynx'
  },
  {
    id: 'myth_silk_tomb',
    landmarkId: 'silk_tomb',
    titleAr: 'أسطورة رداء الحرير والتموجات النارية',
    titleEn: 'The Legend of the Silken Shroud & Sandstone Waves',
    storyAr: 'تروي الأسطورة أن نسّاجاً نبطياً عاشقاً استلهم خيوط حريره المصبوغة من تدرجات هذا الصخر الأسطوري، فامتزج الوردي بالأصفر والرمادي ليشكل أعجب لوحة طبيعية أبدعتها يد الطبيعة وإزميل النحات، فسمي قبر الحرير لتموجه الذي يحاكي أقمشة الملوك المنسوجة بالذهب.',
    storyEn: 'Old tales speak of a master weaver who captured the desert sunset in spun silk, imitating the undulating bands of magenta, gold, and grey rippling across this cliff. The stone itself looks like folded royal damask suspended in time.',
    secretFactAr: 'الألوان الزاهية ناتجة عن ترسيبات طبيعية لأكاسيد الحديد والليمونيت والمنغنيز داخل بلورات الحجر الرملي عبر ملايين السنين.',
    secretFactEn: 'The dazzling stripes are geological deposits of iron oxides (crimson), limonite (yellow), and manganese (violet) crystallized over deep time.',
    narratorRoleAr: 'الوعل النوبي',
    narratorRoleEn: 'The Nubian Ibex'
  },
  {
    id: 'myth_corinthian_tomb',
    landmarkId: 'corinthian_tomb',
    titleAr: 'حكاية لقاء الشرق والغرب في التاج الكورنثي',
    titleEn: 'The Meeting of Orient and Occident at the Corinthian Tomb',
    storyAr: 'حين زار المعماريون النبطيون موانئ الإسكندرية وروما، جلبوا معهم تيجان نبات الأكانثوس الكورنثية ودمجوها بعبقرية مع التيجان النبطية المجردة لتخليد انفتاح البترا التجاري على العالم القديم. وظل الصرح رمزاً لقدرة الأنباط على احتواء أجمل ما في الحضارات المجاورة وصهره في هويتهم الصخرية.',
    storyEn: 'When Nabataean merchant diplomats returned from Mediterranean ports, they brought Greek acanthus foliate capitals, fusing them seamlessly with Petra’s rock-cut tholos facade as an eternal testament to their cosmopolitan empire.',
    secretFactAr: 'تشبه الواجهة طابق الخزنة العلوي بشكل لافت، مما يرجح أن نفس ورشة النحاتين الملكيين التي أبدعت الخزنة شاركت في تصميم هذا الصرح.',
    secretFactEn: 'The upper tholos mirrors that of Al-Khazneh, strongly suggesting master sculptors from the same royal guild carved both monuments.',
    narratorRoleAr: 'الصقر النبطي',
    narratorRoleEn: 'The Imperial Falcon'
  },
  {
    id: 'myth_palace_tomb',
    landmarkId: 'palace_tomb',
    titleAr: 'أسطورة قصر الخلود ثلاثي الطبقات',
    titleEn: 'The Three-Tiered Palace of Eternity',
    storyAr: 'يُقال إن ملك البترا أراد صرحاً يحاكي قصور الأباطرة الرومان في روما، وعندما وجد أن ارتفاع الجرف لا يكفي لطموحه الجارف، أمر بإكمال الطابق الثالث بأحجار منحوتة يدوياً ليعانق الصرح عنان السماء. وتطل بواباته الخمس الواسعة كأنها شرفات لقصر ملكي أسطوري لم تغرب عنه الشمس.',
    storyEn: 'Ambition drove Nabataean monarchs to design a five-bay palace facade echoing Hellenistic royal residences. When the cliff peak fell short of their grand vision, stonemasons laid cut ashlar masonry atop the rock summit to reach the sky.',
    secretFactAr: 'يحتوي الصرح على خمس بوابات واسعة على غير عادة معظم المدافن النبطية، مما جعل المؤرخين يرجحون استخدامه في احتفالات الدولة العامة.',
    secretFactEn: 'Featuring five grand portals rather than one, archaeologists believe this monumental facade hosted public civic ceremonies and royal assemblies.',
    narratorRoleAr: 'الوعل النوبي الأسطوري',
    narratorRoleEn: 'The Nubian Ibex'
  },
  {
    id: 'myth_colonnaded_street',
    landmarkId: 'colonnaded_street',
    titleAr: 'حكاية شارع البخور ومواكب القوافل الفضية',
    titleEn: 'The Frankincense Boulevard & Caravans of Silver',
    storyAr: 'كان هذا الشارع يوماً ما ملتقى لغات العالم، تصدح فيه أصوات التجار بلهجات تدمر ومصر واليمن وروما، وتفوح منه روائح المر والزعفران وقضبان القرفة، وتمر فوق بلاطه الحجري الخيول النبطية المطهمة. وتحت ظلال أعمدته الرخامية وُلدت صفقات تجارية ربطت الهند باليونان عبر صحراء الأردن.',
    storyEn: 'This sandstone-paved boulevard once echoed with Phoenician, Aramaic, Greek, and Latin banter. Incense smoke drifted past marble porticos as camel trains burdened with pearls, cinnamon, and silk exchanged goods under the warm desert sun.',
    secretFactAr: 'كانت تمر تحت رصف الشارع قنوات مياه عذبة تغذي نوافير عامة تسمى (النمفيوم) لإرواء عطش المارة والمسافرين والجمال مجاناً.',
    secretFactEn: 'Deep beneath the stone flags ran hydraulic conduits feeding the Nymphaeum public fountain, quenching the thirst of weary caravan travelers free of charge.',
    narratorRoleAr: 'الصقر البتراوي',
    narratorRoleEn: 'The Petra Falcon'
  },
  {
    id: 'myth_qasr_bint',
    landmarkId: 'qasr_bint',
    titleAr: 'أسطورة سباق الماء وقصر ابنة الملك',
    titleEn: 'The Legend of the Water Race & Qasr al-Bint',
    storyAr: 'تروي الأسطورة الشعبية البتراوية أن ملكاً أعلن أنه سيزوج ابنته الأميرة الفاتنة لمن يستطيع جر مياه الينابيع العذبة إلى قصرها أولاً؛ فتسابق مهندسان عبقريان بأفكار هندسية لا تصدق حتى شربت الأميرة من ماء القناة الفائزة! وما زال المعبد يقف شامخاً كرمز للحب والتحدي والهندسة الصامدة.',
    storyEn: 'Local folklore tells of a king who promised his daughter’s hand to whichever engineer brought sweet spring water to her palace first. Two brilliant rivals carved canals across sheer cliffs until clear water flowed into her courtyard.',
    secretFactAr: 'الاسم التاريخي الحقيقي هو (معبد ذو الشرى)، واستخدم في بنائه خشب العرعر لمقاومة الزلازل فصمد لزلزال 363م بينما تهدمت معظم المباني المحيطة.',
    secretFactEn: 'Actually dedicated to supreme god Dushara, its builders inlaid earthquake-absorbing juniper wood courses that enabled it to endure violent tremors for millennia.',
    narratorRoleAr: 'الوعل النوبي',
    narratorRoleEn: 'The Mountain Ibex'
  },
  {
    id: 'myth_lion_triclinium',
    landmarkId: 'lion_triclinium',
    titleAr: 'حكاية الأسدين الحارسين وشعار الحماية الجبلي',
    titleEn: 'The Two Guardian Lions & the Mountain Gorgon Shield',
    storyAr: 'في منتصف طريق الصعود الشاق نحو قمم الدير، يستريح المسافر في هذا الشق المظلل أمام نقوش أسدين نبطيين يربضان في وضع التأهب لمنع قوى الخوف والشر من ملاحقة الزوار إلى قمة الجبل المقدس. وفي داخل القاعة كانت تقام ولائم روحية تجمع الحجاج الصاعدين إلى قمة الأعالي.',
    storyEn: 'Halfway up the steep alpine trail to Ad-Deir, this cool gorge provided shelter. Two carved rampant lions stand sentinel beside the entryway, while a Medusa medallion above shields pilgrims from weary thoughts as they ascend the sacred mountain.',
    secretFactAr: 'نحتت فوق المدخل تمائم رأس ميدوسا الواقية، وكان المكان مخصصاً لمآدب الصفوة من قادة القوافل ورجال الدين خلال صعودهم المقدس.',
    secretFactEn: 'Carved with a circular protective gorgon medallion above, this chamber served as a ceremonial rest station for dignitaries and priests journeying to the high summit.',
    narratorRoleAr: 'الوشق الصحراوي',
    narratorRoleEn: 'The Desert Lynx'
  },
  {
    id: 'myth_monastery',
    landmarkId: 'monastery',
    titleAr: 'أسطورة تاج الأعالي وعرش الملك عبادة المؤله',
    titleEn: 'The Crown of the Peaks & the Throne of Divine King Obodas',
    storyAr: 'عندما تصل إلى صرح الدير الشامخ بعد صعود 800 درجة بين نسائم الجبال وإطلالات وادي عربة، تشعر بهيبة الإنجاز النبطي الذي قهر المستحيل ليقيم أضخم صرح في البترا تكريماً لروح الملك عبادة الأول الذي انتصر في معاركه وحماه شعبه في قمم الأعالي، حيث تلامس الصخور سحاب السماء.',
    storyEn: 'Climbing the 800 mountain steps leads to Petra’s crown: Ad-Deir. Here, high above the clouds overlooking Wadi Araba, Nabataeans honored their beloved King Obodas I, creating a colossus of stone that dwarfed human scale and made the heavens feel near.',
    secretFactAr: 'يبلغ عرض واجهة الدير 47 متراً وارتفاعها 48 متراً، وجرته الصخرية العلوية تتسع لغرفة كاملة بارتفاع 9 أمتار فوق قمة الجبل!',
    secretFactEn: 'Spanning 47m across and 48m high, its crowning sandstone urn is large enough to contain an entire two-story room, standing 9 meters above the pediment.',
    narratorRoleAr: 'الوعل النوبي الملكي الأسطوري',
    narratorRoleEn: 'The Legendary King Ibex'
  }
];

interface DiscoveredLandmarksQuizProps {
  language: Language;
  visitedLandmarks: string[];
  onToggleVisited?: (landmarkId: string) => void;
}

export const DiscoveredLandmarksQuiz: React.FC<DiscoveredLandmarksQuizProps> = ({
  language,
  visitedLandmarks,
  onToggleVisited
}) => {
  const isAr = language === 'ar';

  // Active Tab Switch: Quiz Mode vs. Myth & Legends Mode
  const [activeTab, setActiveTab] = useState<'quiz' | 'myths'>('quiz');

  // Selected filter pill ('all' or specific landmarkId)
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Audio Speech state for Companion Guide narration
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Quiz progression state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userScoreXp, setUserScoreXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('anbat_quiz_xp_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [totalAttempted, setTotalAttempted] = useState<number>(0);

  // Visited Landmark Objects
  const visitedLandmarkObjects = useMemo(() => {
    return LANDMARKS.filter(l => visitedLandmarks.includes(l.id));
  }, [visitedLandmarks]);

  // CRITICAL REQUIREMENT: Questions pool MUST be strictly and exclusively from visited landmarks!
  const availableQuestions = useMemo(() => {
    if (visitedLandmarks.length === 0) return [];

    let pool = PETRA_LANDMARKS_QUIZ_BANK.filter(q =>
      visitedLandmarks.includes(q.landmarkId)
    );

    if (selectedFilter !== 'all' && visitedLandmarks.includes(selectedFilter)) {
      pool = pool.filter(q => q.landmarkId === selectedFilter);
    }

    return pool;
  }, [visitedLandmarks, selectedFilter]);

  // Available Myths: Strictly and exclusively from visited landmarks!
  const availableMyths = useMemo(() => {
    if (visitedLandmarks.length === 0) return [];

    let pool = PETRA_MYTHS_AND_LEGENDS.filter(m =>
      visitedLandmarks.includes(m.landmarkId)
    );

    if (selectedFilter !== 'all' && visitedLandmarks.includes(selectedFilter)) {
      pool = pool.filter(m => m.landmarkId === selectedFilter);
    }

    return pool;
  }, [visitedLandmarks, selectedFilter]);

  // Reset or adjust question index if filter changes or question list shrinks
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(0);
  }, [selectedFilter, visitedLandmarks]);

  // Stop audio speech if switching filter, tab, or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedFilter, activeTab, currentQuestionIndex]);

  // Keep selected filter valid if a landmark was unvisited
  useEffect(() => {
    if (selectedFilter !== 'all' && !visitedLandmarks.includes(selectedFilter)) {
      setSelectedFilter('all');
    }
  }, [visitedLandmarks, selectedFilter]);

  // Current active question
  const currentQuestion: QuizQuestion | null = useMemo(() => {
    if (availableQuestions.length === 0) return null;
    const safeIndex = currentQuestionIndex % availableQuestions.length;
    return availableQuestions[safeIndex];
  }, [availableQuestions, currentQuestionIndex]);

  // Current active landmark for question
  const currentLandmark = useMemo(() => {
    if (!currentQuestion) return null;
    return LANDMARKS.find(l => l.id === currentQuestion.landmarkId) || null;
  }, [currentQuestion]);

  // Current active myth (either matching selected single landmark or first in available list)
  const currentMyth: LandmarkMyth | null = useMemo(() => {
    if (availableMyths.length === 0) return null;
    return availableMyths[0];
  }, [availableMyths]);

  const currentMythLandmark = useMemo(() => {
    if (!currentMyth) return null;
    return LANDMARKS.find(l => l.id === currentMyth.landmarkId) || null;
  }, [currentMyth]);

  // Toggle narration speech
  const handleToggleNarration = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isAr ? 'ar-SA' : 'en-US';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(index);
    setIsAnswered(true);
    setTotalAttempted(prev => prev + 1);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      playSuccessChime();
      const updatedXp = userScoreXp + 50;
      setUserScoreXp(updatedXp);
      setCorrectAnswersCount(prev => prev + 1);
      try {
        localStorage.setItem('anbat_quiz_xp_score', String(updatedXp));
      } catch {
        // Ignore localStorage error
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (availableQuestions.length > 1) {
      setCurrentQuestionIndex(prev => (prev + 1) % availableQuestions.length);
    }
  };

  const handleResetScore = () => {
    setUserScoreXp(0);
    setCorrectAnswersCount(0);
    setTotalAttempted(0);
    setSelectedOption(null);
    setIsAnswered(false);
    try {
      localStorage.setItem('anbat_quiz_xp_score', '0');
    } catch {
      // Ignore
    }
  };

  return (
    <div
      id="discovered-landmarks-quiz-section"
      className="mt-8 pt-6 border-t-2 border-[#C8963E]/40 text-[#331C16]"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Quiz & Codex Master Header Banner */}
      <div className="bg-gradient-to-r from-[#7A2E1D] via-[#561E12] to-[#7A2E1D] text-[#F6EEE1] rounded-2xl p-4 sm:p-5 shadow-lg border border-[#C8963E]/50 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#C8963E] text-[#7A2E1D] flex items-center justify-center font-bold text-xl shadow-inner border border-[#F6EEE1]/40 shrink-0">
              {activeTab === 'quiz' ? '🏹' : '📜'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#C8963E]/20 text-[#C8963E] border border-[#C8963E]/50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {isAr ? 'قسم الاستكشاف المعمق' : 'Deep Exploration Codex'}
                </span>
                <span className="text-xs text-[#E8DCC9]/70">•</span>
                <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAr
                    ? `${visitedLandmarkObjects.length} معالم مزارة ومكتشفة`
                    : `${visitedLandmarkObjects.length} Discovered Sites`}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F6EEE1] mt-0.5">
                {isAr
                  ? '🏹 موسوعة وتحدي المعالم المكتشفة | أسئلة وأساطير المواقع المزارة'
                  : '🏹 Discovered Monuments Codex | Quiz & Ancient Myths'}
              </h3>
              <p className="text-xs text-[#E8DCC9]/90 mt-0.5 max-w-2xl">
                {isAr
                  ? 'محتوى حصري وخاص بالمواقع التي قمت بزيارتها فعلياً (المعالم الموسومة بـ ✓): اختبر معلوماتك واكسب +50 XP أو استمع لأساطير وروايات المعلم بصوت الدليل النبطي!'
                  : 'Exclusive content strictly unlocked for your visited sites: challenge yourself for +50 XP or listen to authentic ancient legends narrated by your companion!'}
              </p>
            </div>
          </div>

          {/* XP & Score Dashboard Badge */}
          <div className="flex items-center gap-2.5 bg-[#4A180E] px-3.5 py-2.5 rounded-xl border border-[#C8963E]/40 shrink-0 shadow-inner self-start sm:self-auto">
            <div className="w-8 h-8 rounded-lg bg-[#C8963E] text-[#331C16] flex items-center justify-center font-bold text-sm shadow-xs">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="text-left rtl:text-right">
              <span className="text-[10px] text-[#E8DCC9]/80 block font-medium">
                {isAr ? 'نقاط الخبرة (XP)' : 'Knowledge XP'}
              </span>
              <span className="text-base font-bold text-[#F6EEE1] tracking-wide font-mono">
                {userScoreXp} <span className="text-xs text-[#C8963E] font-sans">XP</span>
              </span>
            </div>

            {totalAttempted > 0 && (
              <div className="border-l rtl:border-l-0 rtl:border-r border-[#C8963E]/30 pl-2.5 rtl:pl-0 rtl:pr-2.5 ml-1 rtl:ml-0 rtl:mr-1 text-[11px] text-[#E8DCC9]/90">
                <span className="text-emerald-300 font-bold">{correctAnswersCount}</span>
                <span className="text-stone-400">/{totalAttempted}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Switcher: [ 🏹 تحدي الأسئلة والـ XP ] VS [ 📜 حكايات وأساطير المعلم ] */}
        <div className="mt-4 pt-3 border-t border-[#C8963E]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 bg-[#3D140B] border border-[#C8963E]/40 rounded-xl shadow-inner text-xs">
            <button
              type="button"
              id="tab-quiz-mode"
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#C8963E] text-[#331C16] shadow-sm'
                  : 'text-[#E8DCC9] hover:text-white'
              }`}
            >
              <span>🏹</span>
              <span>{isAr ? 'تحدي الأسئلة والـ XP' : 'Quiz & XP Challenge'}</span>
              <span className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {availableQuestions.length}
              </span>
            </button>

            <button
              type="button"
              id="tab-myths-mode"
              onClick={() => setActiveTab('myths')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'myths'
                  ? 'bg-[#C8963E] text-[#331C16] shadow-sm'
                  : 'text-[#E8DCC9] hover:text-white'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>{isAr ? 'حكايات وأساطير المعالم المكتشفة' : 'Myths & Legends Codex'}</span>
              <span className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {visitedLandmarkObjects.length}
              </span>
            </button>
          </div>

          <div className="text-xs text-[#E8DCC9]/90 hidden md:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>
              {activeTab === 'quiz'
                ? isAr
                  ? 'اختر الإجابة الصحيحة لزيادة رصيد خبرتك النبطية'
                  : 'Answer correctly to boost your archaeological XP rank'
                : isAr
                ? 'استمتع بأساطير بترا الساحرة المروية بأسلوب نبطي أصيل'
                : 'Immerse yourself in ancient legends of carved stone'}
            </span>
          </div>
        </div>
      </div>

      {/* CASE 1: No visited landmarks yet */}
      {visitedLandmarks.length === 0 ? (
        <div className="bg-[#FAF5ED] border-2 border-dashed border-[#C8963E]/50 rounded-2xl p-8 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#7A2E1D]/10 text-[#7A2E1D] flex items-center justify-center mx-auto mb-3 text-2xl border border-[#C8963E]/40">
            <Lock className="w-8 h-8 text-[#7A2E1D]" />
          </div>
          <h4 className="font-heading font-bold text-lg text-[#7A2E1D]">
            {isAr ? 'المحتوى مقفل بانتظار استكشافك!' : 'Content Locked Awaiting Your Exploration!'}
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-1.5 leading-relaxed">
            {isAr
              ? 'وفق قواعد الاستكشاف الأثري النبطي، تظهر الأسئلة والأساطير حصرياً للمواقع التي قمت بزيارتها. قم بتحديد أي معلم من الخريطة أو انقر على بطاقة المعلم لوسمه كـ "تمت الزيارة ✓" لفك قفل أسئلته وأساطيره فوراً.'
              : 'As designed, questions and legends appear strictly for monuments you have visited. Mark any landmark above as "Visited ✓" to unlock its challenges and stories.'}
          </p>

          {/* Quick-start shortcut button */}
          {onToggleVisited && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onToggleVisited('siq');
                  onToggleVisited('treasury');
                  playSuccessChime();
                }}
                className="bg-[#1F6E68] hover:bg-[#185853] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isAr ? 'وسم (السيق والخزنة) كـ تمت الزيارة للبدء مباشرة ⚡' : 'Mark (Siq & Treasury) visited to unlock now ⚡'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* CASE 2: Landmarks are visited - show filter pills and either Quiz or Myths view */
        <div className="space-y-4">
          {/* Horizontal Filter Pills (Strictly Visited Landmarks Only) */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-[#7A2E1D] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C8963E]" />
                {isAr
                  ? 'اختر المعلم المكتشف للتصفح (المعالم المزارة فقط):'
                  : 'Filter by Discovered Site (Visited Only):'}
              </span>
              <span className="text-[11px] text-stone-500">
                {activeTab === 'quiz'
                  ? `${availableQuestions.length} ${isAr ? 'سؤال متاح' : 'questions'}`
                  : `${availableMyths.length} ${isAr ? 'أسطورة متاحة' : 'legends'}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {/* Option: Random Challenge / All for visited */}
              {activeTab === 'quiz' && (
                <button
                  type="button"
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs ${
                    selectedFilter === 'all'
                      ? 'bg-[#7A2E1D] text-[#F6EEE1] shadow-sm ring-2 ring-[#C8963E]/60'
                      : 'bg-white border border-[#E8DCC9] text-stone-700 hover:bg-[#F4E8D3]'
                  }`}
                >
                  <span>🎲</span>
                  <span>
                    {isAr
                      ? `تحدي عشوائي لجميع ما زرته (${visitedLandmarkObjects.length})`
                      : `Random All Visited (${visitedLandmarkObjects.length})`}
                  </span>
                </button>
              )}

              {/* Individual Pills for each Visited Landmark */}
              {visitedLandmarkObjects.map(landmark => {
                const isSelected =
                  selectedFilter === landmark.id ||
                  (activeTab === 'myths' && selectedFilter === 'all' && visitedLandmarkObjects[0]?.id === landmark.id);
                return (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={() => setSelectedFilter(landmark.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1F6E68] text-white border-emerald-400 shadow-sm ring-2 ring-emerald-300'
                        : 'bg-emerald-50/90 text-emerald-950 border-emerald-300 hover:bg-emerald-100/90'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">
                      #{landmark.routeOrder} {isAr ? landmark.nameAr : landmark.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW 1: QUIZ CHALLENGE MODE */}
          {activeTab === 'quiz' && (
            <div>
              {currentQuestion && currentLandmark ? (
                <div className="bg-white rounded-2xl border-2 border-[#C8963E]/40 p-5 sm:p-6 shadow-md transition-all">
                  {/* Card Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-4 border-b border-[#E8DCC9]">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {isAr ? 'معلم مزار ومحقق أثرياً' : 'Visited & Verified Monument'}
                        </span>
                      </span>

                      <span className="bg-[#FAF5ED] text-[#7A2E1D] border border-[#C8963E]/30 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C8963E]" />
                        <span>
                          #{currentLandmark.routeOrder} {isAr ? currentLandmark.nameAr : currentLandmark.nameEn}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFilter(currentLandmark.id);
                          setActiveTab('myths');
                        }}
                        className="text-[11px] text-[#7A2E1D] hover:text-[#C8963E] font-bold underline flex items-center gap-1 cursor-pointer"
                        title={isAr ? 'قراءة أسطورة هذا المعلم' : 'Read myth of this monument'}
                      >
                        <Scroll className="w-3 h-3 text-[#C8963E]" />
                        <span>{isAr ? 'اقرأ أسطورة هذا المعلم ←' : 'Read myth →'}</span>
                      </button>

                      <div className="flex items-center gap-1 text-xs text-[#C8963E] font-bold bg-[#FAF0E2] px-2.5 py-1 rounded-lg border border-[#C8963E]/30">
                        <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
                        <span>+50 XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-5">
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[#331C16] leading-snug">
                      {isAr ? currentQuestion.questionAr : currentQuestion.questionEn}
                    </h4>
                  </div>

                  {/* 4 Interactive Option Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                    {(isAr ? currentQuestion.optionsAr : currentQuestion.optionsEn).map((optionText, optIndex) => {
                      const letters = isAr ? ['أ', 'ب', 'ج', 'د'] : ['A', 'B', 'C', 'D'];
                      const isSelected = selectedOption === optIndex;
                      const isCorrect = optIndex === currentQuestion.correctIndex;

                      let buttonStyle = 'bg-[#FAF5ED] border-stone-300 text-[#331C16] hover:bg-[#F4E8D3] hover:border-[#C8963E]';
                      let badgeStyle = 'bg-stone-200 text-stone-700';

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                          badgeStyle = 'bg-emerald-600 text-white';
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-400';
                          badgeStyle = 'bg-red-600 text-white';
                        } else {
                          buttonStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(optIndex)}
                          className={`p-3.5 rounded-xl border text-start transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${buttonStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}>
                            {letters[optIndex]}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                            {optionText}
                          </span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 self-center" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0 self-center" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Box & Archaeological Insight */}
                  {isAnswered && (
                    <div
                      className={`p-4 rounded-xl border mb-5 animate-in fade-in slide-in-from-top-2 ${
                        selectedOption === currentQuestion.correctIndex
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-red-50 border-red-300 text-red-950'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {selectedOption === currentQuestion.correctIndex ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-bold text-xs sm:text-sm mb-1 flex items-center gap-2">
                            <span>
                              {selectedOption === currentQuestion.correctIndex
                                ? isAr
                                  ? '✨ أحسنت! إجابة صحيحة ومحققة أثرياً (+50 XP)'
                                  : '✨ Brilliant! Historically correct (+50 XP)'
                                : isAr
                                ? '❌ إجابة غير دقيقة'
                                : '❌ Not quite right'}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed opacity-95">
                            {isAr ? currentQuestion.explanationAr : currentQuestion.explanationEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Controls: Next Question / Score reset */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DCC9]">
                    <button
                      type="button"
                      onClick={handleResetScore}
                      className="text-[11px] text-stone-500 hover:text-red-700 flex items-center gap-1 transition cursor-pointer"
                      title="Reset quiz score"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isAr ? 'إعادة تصفير نقاط التحدي' : 'Reset XP'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="bg-[#7A2E1D] hover:bg-[#622316] text-[#F6EEE1] font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isAr ? 'السؤال التالي ➔' : 'Next Question ➔'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center border border-[#C8963E]/30">
                  <HelpCircle className="w-8 h-8 text-[#C8963E] mx-auto mb-2" />
                  <p className="text-xs text-stone-600">
                    {isAr
                      ? 'لا توجد أسئلة إضافية لهذا المعلم حالياً، اختر "تحدي عشوائي لجميع ما زرته" لمتابعة الأسئلة.'
                      : 'No more questions for this specific site, select "Random All Visited" to continue.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: MYTHS & LEGENDS CODEX MODE (حكايا وأساطير المعالم المكتشفة) */}
          {activeTab === 'myths' && (
            <div>
              {currentMyth && currentMythLandmark ? (
                <div className="bg-gradient-to-br from-[#FAF5ED] to-white rounded-2xl border-2 border-[#C8963E]/50 p-5 sm:p-7 shadow-lg relative overflow-hidden animate-in fade-in">
                  {/* Decorative background watermark */}
                  <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 opacity-5 pointer-events-none text-8xl">
                    📜
                  </div>

                  {/* Top Badge Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-4 border-b border-[#C8963E]/30">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-xs border border-[#C8963E]/50">
                        <Scroll className="w-3.5 h-3.5 text-[#C8963E]" />
                        <span>
                          {isAr
                            ? `📜 من أساطير الأنباط | ${currentMythLandmark.nameAr}`
                            : `📜 Nabataean Legend | ${currentMythLandmark.nameEn}`}
                        </span>
                      </span>

                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>#{currentMythLandmark.routeOrder}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#7A2E1D] font-medium bg-[#FAF0E2] px-2.5 py-1 rounded-lg border border-[#C8963E]/30 flex items-center gap-1">
                        <span>🎙️</span>
                        <span>{isAr ? currentMyth.narratorRoleAr : currentMyth.narratorRoleEn}</span>
                      </span>
                    </div>
                  </div>

                  {/* Myth Title */}
                  <div className="mb-4">
                    <h4 className="font-heading font-bold text-lg sm:text-2xl text-[#7A2E1D] tracking-wide">
                      {isAr ? currentMyth.titleAr : currentMyth.titleEn}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C8963E]" />
                      <span>
                        {isAr
                          ? `الموقع: ${currentMythLandmark.subtitleAr}`
                          : `Location: ${currentMythLandmark.subtitleEn}`}
                      </span>
                    </p>
                  </div>

                  {/* Myth Narrative Story Body */}
                  <div className="bg-[#FAF5ED]/80 rounded-xl p-4 sm:p-5 border border-[#C8963E]/30 mb-5 relative">
                    <p className="text-xs sm:text-sm text-[#331C16] leading-relaxed whitespace-pre-line font-medium text-justify">
                      {isAr ? currentMyth.storyAr : currentMyth.storyEn}
                    </p>

                    {/* Interactive Audio Button: "استمع للأسطورة بصوت الدليل" */}
                    <div className="mt-4 pt-3 border-t border-[#C8963E]/20 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleNarration(
                            isAr ? currentMyth.storyAr : currentMyth.storyEn
                          )
                        }
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs ${
                          isSpeaking
                            ? 'bg-red-700 hover:bg-red-800 text-white animate-pulse'
                            : 'bg-[#1F6E68] hover:bg-[#185853] text-white'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4" />
                            <span>{isAr ? '⏹️ إيقاف السرد الصوتي' : '⏹️ Stop Narration'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" />
                            <span>{isAr ? '🔊 استمع للأسطورة بصوت الدليل' : '🔊 Listen to Companion Narration'}</span>
                          </>
                        )}
                      </button>

                      {/* Jump to Quiz shortcut */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFilter(currentMyth.landmarkId);
                          setActiveTab('quiz');
                        }}
                        className="text-xs font-bold text-[#7A2E1D] hover:text-[#C8963E] underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isAr ? '🎯 اختبر معلوماتك في هذا المعلم ←' : '🎯 Challenge yourself on this site →'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Golden Fast Fact Box (Did You Know? / سر نبطي) */}
                  <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-2 border-[#C8963E]/60 rounded-xl p-4 text-xs shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C8963E] text-[#331C16] flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                        <Lightbulb className="w-4 h-4 text-[#331C16] fill-current" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#7A2E1D] text-xs sm:text-sm block mb-0.5">
                          {isAr ? '💡 معلومة ذهبية سريعة (سر نبطي محقق):' : '💡 Golden Archaeological Secret (Did You Know?):'}
                        </span>
                        <p className="text-xs text-[#561E12] leading-relaxed font-medium">
                          {isAr ? currentMyth.secretFactAr : currentMyth.secretFactEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center border border-[#C8963E]/30">
                  <HelpCircle className="w-8 h-8 text-[#C8963E] mx-auto mb-2" />
                  <p className="text-xs text-stone-600">
                    {isAr
                      ? 'اختر معلماً مزاراً من شريط التصفية أعلاه لقراءة واستماع أسطورته النبطية.'
                      : 'Select a discovered monument above to explore its sacred myth.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
