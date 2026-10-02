/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SouvenirProduct } from '../types';

export const SOUVENIR_PRODUCTS: SouvenirProduct[] = [
  // الحرف وصخور البتراء (Crafts & Petra Rocks)
  {
    id: 'souv-sand-bottle',
    nameAr: 'قارورة الرمل الملون البتراوي التراثية',
    nameEn: 'Handmade Petra Colored Sand Art Bottle',
    category: 'crafts',
    shortDescAr: 'فن رملي أصيل مشكّل يدوياً بطبقات رمال البترا الطبيعية الوردية مع رسم قوافل الجمال والوديان.',
    shortDescEn: 'Traditional glass flask filled with natural layered Petra sandstone depicting desert dunes and caravans.',
    priceDirhams: 35,
    priceUsd: 18,
    tagAr: 'صناعة يدوية',
    imageUrl: '/src/assets/images/souvenir_sand_bottle_1790895098190.jpg',
    rating: 4.9,
    artisanAr: 'مشغل حرفيي وادي موسى',
    inStock: true
  },
  {
    id: 'souv-sandstone-slab',
    nameAr: 'لوح حجر رملي وردي منقوش بواجهة الخزنة',
    nameEn: 'Hand-Carved Rose Sandstone Treasury Tablet',
    category: 'crafts',
    shortDescAr: 'قطعة حجرية طبيعية من صخور البترا الوردية منحوت عليها بدقة واجهة الخزنة النبطية الملكية.',
    shortDescEn: 'Authentic Petra rose sandstone slab engraved with the iconic Treasury facade by local stone sculptors.',
    priceDirhams: 55,
    priceUsd: 28,
    tagAr: 'حجر بتراوي أصيل',
    imageUrl: '/src/assets/images/souvenir_petra_stone_1790895266040.jpg',
    rating: 4.8,
    artisanAr: 'معلم نحت الصخر النبطي',
    inStock: true
  },

  // الفخار والخزف (Pottery & Ceramics)
  {
    id: 'souv-dallah-brass',
    nameAr: 'دلة القهوة النحاسية النبطية المعتقة',
    nameEn: 'Antique Brass & Copper Bedouin Dallah',
    category: 'pottery',
    shortDescAr: 'دلة قهوة عربية أصيلة مصنوعة يدوياً من النحاس الأصفر والأحمر مع نقوش هندسية نبطية عتيقة.',
    shortDescEn: 'Hand-hammered brass and copper Bedouin coffee pot with engraved Nabataean geometric motifs.',
    priceDirhams: 85,
    priceUsd: 42,
    tagAr: 'الأكثر طلباً',
    imageUrl: '/src/assets/images/souvenir_nabataean_dallah_1790895109997.jpg',
    rating: 5.0,
    artisanAr: 'دار النحاسيات التراثية',
    inStock: true
  },
  {
    id: 'souv-nabataean-pottery-urn',
    nameAr: 'جرة خزف فخارية نبطية مطلية بالرموز',
    nameEn: 'Terracotta Nabataean Ceramic Amphora',
    category: 'pottery',
    shortDescAr: 'جرة فخار مستوحاة من أواني حفظ زيت البخور النبطية مع نقوش أوراق اللوتس وقنوات الماء.',
    shortDescEn: 'Recreated ancient Nabataean terracotta amphora with classical painted lotus leaf water motifs.',
    priceDirhams: 45,
    priceUsd: 22,
    tagAr: 'فخار معتمد',
    imageUrl: '/src/assets/images/souvenir_nabataean_dallah_1790895109997.jpg',
    rating: 4.7,
    artisanAr: 'مشغل فخار البترا النسوي',
    inStock: true
  },

  // الفضة والنقوش النبطية (Silver & Nabataean Engravings)
  {
    id: 'souv-silver-pendant',
    nameAr: 'قلادة فضة نبطية عيار 925 بحجر الفيروز',
    nameEn: '925 Sterling Silver Nabataean Amulet Pendant',
    category: 'silver',
    shortDescAr: 'تميمة فضية خالصة عيار 925 مرصعة بحجر فيروز أصيل ومنقوشة بنجمة البترا ثمانية الأشعة.',
    shortDescEn: 'Handcrafted 925 sterling silver talisman pendant set with natural turquoise and Nabataean 8-point star.',
    priceDirhams: 120,
    priceUsd: 59,
    tagAr: 'فضة 925',
    imageUrl: '/src/assets/images/souvenir_silver_necklace_1790895120070.jpg',
    rating: 4.9,
    artisanAr: 'صاغة الفضة القديمة بالبترا',
    inStock: true
  },
  {
    id: 'souv-aretas-ring',
    nameAr: 'خاتم الملك الحارث الرابع المنقوش',
    nameEn: 'King Aretas IV Royal Signet Silver Ring',
    category: 'silver',
    shortDescAr: 'خاتم فضة مؤكسدة بنقش ملكي مطابق لمسكوكات دراهم الملك الحارث الرابع المحب لشعبه.',
    shortDescEn: 'Oxidized silver signet ring cast with historical seal of Nabataean King Aretas IV.',
    priceDirhams: 95,
    priceUsd: 48,
    tagAr: 'نقش ملكي',
    imageUrl: '/src/assets/images/souvenir_silver_necklace_1790895120070.jpg',
    rating: 4.8,
    artisanAr: 'ورشة التحف الفضية',
    inStock: true
  },

  // طين وأملاح البحر الميت (Dead Sea Mud & Salts)
  {
    id: 'souv-dead-sea-mud',
    nameAr: 'طين البحر الميت المعدني مع خلاصة الورد',
    nameEn: 'Natural Dead Sea Mineral Mud Jar with Rose Oil',
    category: 'dead_sea',
    shortDescAr: 'طين معدني أسود طبيعي 100% مستخرج من أخفض بقعة في العالم وممزوج بزيت الورد البري الصخري.',
    shortDescEn: 'Pure therapeutic Dead Sea mineral mud enriched with natural wild rose essential oils for skin glow.',
    priceDirhams: 40,
    priceUsd: 20,
    tagAr: 'طبيعي 100%',
    imageUrl: '/src/assets/images/souvenir_dead_sea_minerals_1790895129153.jpg',
    rating: 4.9,
    artisanAr: 'مختبرات خيرات الأردن الطبيعية',
    inStock: true
  },
  {
    id: 'souv-dead-sea-salts',
    nameAr: 'أملاح استحمام بلورية بأعشاب الشراة',
    nameEn: 'Dead Sea Bath Salts Infused with Mountain Herbs',
    category: 'dead_sea',
    shortDescAr: 'بلورات ملحية مغنسيومية نقية للاسترخاء العضلي الفائق بعد مسير طويل في مسارات جبال البترا.',
    shortDescEn: 'Natural magnesium crystal salts infused with wild Sharah mountain thyme and lavender blossoms.',
    priceDirhams: 30,
    priceUsd: 15,
    tagAr: 'استرخاء علاجي',
    imageUrl: '/src/assets/images/souvenir_dead_sea_minerals_1790895129153.jpg',
    rating: 4.7,
    artisanAr: 'أملاح البحر الميت الملكية',
    inStock: true
  },

  // المنسوجات والشماغات (Textiles & Shemaghs)
  {
    id: 'souv-shemagh-red',
    nameAr: 'شماغ أردني ملكي مهدب يدوياً بالهدب البتراوي',
    nameEn: 'Authentic Royal Jordanian Shemagh with Hand Fringes',
    category: 'textiles',
    shortDescAr: 'شماغ أحمر وأبيض من القطن الخالص المنسوج بحرفية مع هدب أبيض كثيف محبوك بأيدي سيدات البترا.',
    shortDescEn: 'Traditional red and white cotton Jordanian keffiyeh finished with dense hand-knotted cotton fringes.',
    priceDirhams: 50,
    priceUsd: 25,
    tagAr: 'رمز الكرم',
    imageUrl: '/src/assets/images/souvenir_shemagh_1790895243673.jpg',
    rating: 5.0,
    artisanAr: 'جمعية سيدات البترا للنسيج',
    inStock: true
  },
  {
    id: 'souv-bedouin-kilim',
    nameAr: 'بساط بدوي صوفي منسوج على النول اليدوي',
    nameEn: 'Handwoven Wool Bedouin Kilim Rug Runner',
    category: 'textiles',
    shortDescAr: 'بساط من صوف الخراف الطبيعي المصبوغ بجذور الأعشاب والنباتات الجبلية بتطريزات بدوية هندسية.',
    shortDescEn: 'Authentic hand-loomed sheep wool kilim runner naturally dyed with desert root pigments.',
    priceDirhams: 140,
    priceUsd: 70,
    tagAr: 'صوف أصيل',
    imageUrl: '/src/assets/images/souvenir_bedouin_kilim_1790895277454.jpg',
    rating: 4.9,
    artisanAr: 'نول البادية الجنوبية',
    inStock: true
  },

  // الشاي والأعشاب البرية (Wild Teas & Herbs)
  {
    id: 'souv-wild-tea-blend',
    nameAr: 'خلطة شاي البترا البري مع الميرمية والزعتر',
    nameEn: 'Wild Petra Mountain Sage & Thyme Herbal Tea',
    category: 'tea',
    shortDescAr: 'أوراق الميرمية الجبلية العطرية المجففة برائحة خشب العرعر والزعتر البري من سفوح جبل هارون.',
    shortDescEn: 'Organic sun-dried wild mountain sage and desert thyme picked from the highlands of Mount Hor.',
    priceDirhams: 25,
    priceUsd: 12,
    tagAr: 'نكهة أصيلة',
    imageUrl: '/src/assets/images/souvenir_wild_tea_1790895254028.jpg',
    rating: 4.8,
    artisanAr: 'عطارة وادي رم والبترا',
    inStock: true
  },
  {
    id: 'souv-bedouin-cardamom-coffee',
    nameAr: 'قهوة بتراوية شقراء محمصة مع الهال والمستكة',
    nameEn: 'Bedouin Golden Roasted Coffee with Green Cardamom',
    category: 'tea',
    shortDescAr: 'بن عربي أصيل محمص على نار الحطب بدرجة شقراء ممزوج بحبات الهال الأخضر والزعفران.',
    shortDescEn: 'Fire-roasted light golden Arabic coffee blend infused with crushed green cardamom pods and mastic.',
    priceDirhams: 35,
    priceUsd: 18,
    tagAr: 'قهوة النشامى',
    imageUrl: '/src/assets/images/souvenir_nabataean_dallah_1790895109997.jpg',
    rating: 4.9,
    artisanAr: 'محمصة وادي موسى التراثية',
    inStock: true
  }
];
