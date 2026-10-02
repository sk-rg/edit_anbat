/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Creature, TimeOfDay } from '../types';

export const CREATURES: Record<string, Creature> = {
  camel: {
    id: 'camel',
    nameEn: 'Al-Jammal (Camel)',
    nameAr: 'الجَمَّال (الجمل النبطي)',
    titleEn: 'Caravan Master of the Water Trails',
    titleAr: 'دليل القوافل ومسالك الماء',
    rarity: 'Common',
    loreEn: 'Patient, tireless, and possessing ancestral memory of every hidden spring and cistern carved into the canyons. Al-Jammal guided frankincense merchants across the burning sands to Petra’s gates.',
    loreAr: 'صبور، لا يكل، ويحفظ في ذاكرته الفطرية كل نبع خفي وصهريج حُفر في بطون الجبال. قاد قوافل اللبان والبخور عبر رمال الصحراء بأمان إلى بوابات بترا.',
    icon: '🐫',
    svgArtKey: 'camel',
    traits: ['Water-Finder', 'Heavy Pack-Master', 'Desert Endurance'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'siq'
  },
  scorpion: {
    id: 'scorpion',
    nameEn: 'Al-Aqrab (Scorpion)',
    nameAr: 'العَقْرَب (عقرب الشقوق)',
    titleEn: 'Sentinel of the Rose Shadow Shrines',
    titleAr: 'حارس المحاريب والظلال الوردية',
    rarity: 'Common',
    loreEn: 'Dwelling silently in the shaded clefts and sacred betyl niches of the canyon walls. Al-Aqrab detects every seismic tremor and protects the secret inscriptions from reckless intruders.',
    loreAr: 'يعيش في هدوء بين شقوق الصخر ومحاريب الأنصاب المقدسة في جدران الوادي. يشعر بأدق الهزات الصخرية ويحرس النقوش القديمة من المتطفلين.',
    icon: '🦂',
    svgArtKey: 'scorpion',
    traits: ['Shadow-Stalker', 'Stone Resonance', 'Night Navigation'],
    preferredTime: 'Dusk / Night',
    startingLandmarkAffinity: 'facades'
  },
  falcon: {
    id: 'falcon',
    nameEn: 'Al-Saqr (Falcon)',
    nameAr: 'الصَّقْر (صقر الأعالي)',
    titleEn: 'Sky Scout of the Mountain Ridge',
    titleAr: 'كشّاف الأعالي ورياح الجبال',
    rarity: 'Rare',
    loreEn: 'Riding the thermal winds high above Ad-Deir and the High Place of Sacrifice. Al-Saqr spots incoming desert storms hours in advance and warned ancient Nabataean watchtowers of approaching caravans.',
    loreAr: 'يمتطي التيارات الهوائية الصاعدة فوق الدير ومذبح الأضاحي العالي. يلمح العواصف القادمة من مسافات شاسعة، وكان يوقظ أبراج المراقبة النبطية لاستقبال القوافل.',
    icon: '🦅',
    svgArtKey: 'falcon',
    traits: ['Aerial Vantage', 'Storm Forecaster', 'High Vista Insight'],
    preferredTime: 'Afternoon',
    startingLandmarkAffinity: 'theatre'
  },
  ibex: {
    id: 'ibex',
    nameEn: 'Al-Badan (Nubian Ibex)',
    nameAr: 'البَدَن (الوعل الملكي الأسطوري)',
    titleEn: 'Sacred Horned Mountain Sovereign',
    titleAr: 'سيد الجبال ذو القرنين المقدس',
    rarity: 'Legendary',
    loreEn: 'The mythical horned sovereign depicted on ancient Nabataean pottery and royal seal rings. Agile on sheer vertical cliffs, Al-Badan only reveals itself to pilgrims who have walked the full sacred path through all five great monuments.',
    loreAr: 'السيد الجبلي ذو القرنين المعقوفين المخلد على الفخار النبطي وخواتم الملوك. يقفز بخفة على الجروف الرأسية، ولا يتجلى إلا للزائر الحكيم الذي طاف بكافة معالم بترا الخمسة.',
    icon: '🐐',
    svgArtKey: 'ibex',
    traits: ['سيد القمم العالية', 'حكمة الملوك الأنباط', 'رمز الخلود الجبلي'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'monastery'
  },
  eagle: {
    id: 'eagle',
    nameEn: 'Al-Oqab (Nabataean Golden Eagle)',
    nameAr: 'العُقاب الذهبي النبطي',
    titleEn: 'Imperial Sovereign of Qasr Al-Bint & Crown Protector',
    titleAr: 'حامي قصر البنت ورمز السيادة النبطية الملكية',
    rarity: 'Legendary',
    loreEn: 'The majestic sun-crowned raptor consecrated on temple pediments and King Aretas IV coins. It glides through sunlit rose canyons carrying royal Nabataean blessings and protecting sacred sanctuaries.',
    loreAr: 'العقاب النبيل المنقوش على واجهات المعابد ومسكوكات الملك الحارث الرابع. يحلق بأجنحته الذهبية في سماء البترا الوردية ناشراً هيبة الأنباط وحامياً محراب قصر البنت المقدس.',
    icon: '🦅',
    svgArtKey: 'eagle',
    traits: ['عين الشمس الثاقبة', 'درع المعابد الذهبي', 'السيادة الملكية النبطية'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'treasury'
  },
  winged_lion: {
    id: 'winged_lion',
    nameEn: 'Asad Al-At (Winged Temple Lion)',
    nameAr: 'أسد اللات المجنح',
    titleEn: 'Celestial Guardian of the Temple of the Winged Lions',
    titleAr: 'حارس معبد الأسود المجنحة وصرح العزة',
    rarity: 'Legendary',
    loreEn: 'Carved with divine precision at Petra’s Temple of the Winged Lions, this celestial creature represents unstoppable power, royal prestige, and the eternal spirit of ancient Petra.',
    loreAr: 'الكائن الروحي الأسطوري المنحوت على تيجان أعمدة معبد الأسود المجنحة في البترا. يرمز للقوة النبطية القاهرة والمنعة الروحية والشموخ التاريخي لعاصمة الأنباط.',
    icon: '🦁',
    svgArtKey: 'winged_lion',
    traits: ['زئير الصخر النبطي', 'الأجنحة السماوية', 'حارس الكنوز السرية'],
    preferredTime: 'Afternoon',
    startingLandmarkAffinity: 'treasury'
  },
  sacred_viper: {
    id: 'sacred_viper',
    nameEn: 'Al-Afa Al-Qarnaa (Sacred Horned Viper)',
    nameAr: 'أفعى السيق القرناء المقدسة',
    titleEn: 'Mystic Guardian of the Clefts & Life Springs',
    titleAr: 'حارسة ممرات السيق وينابيع الحياة النبطية',
    rarity: 'Sacred',
    loreEn: 'Revered in ancient Nabataean petroglyphs as the guardian of deep water channels and sacred bedrock crevices. Its gentle hissing signals secret subterranean water flows.',
    loreAr: 'رمز مقدس في النقوش النبطية القديمة لحراسة القنوات المحفورة في صخر السيق ومجاري المياه الصافية. تنبّه القوافل لمكامن الرطوبة وتفيض بركة الخصوبة في الصحراء.',
    icon: '🐍',
    svgArtKey: 'sacred_viper',
    traits: ['حراسة منابع الماء', 'تمويه الصخر الرملي', 'حدس الأعماق المقدسة'],
    preferredTime: 'Dusk / Night',
    startingLandmarkAffinity: 'siq'
  },
  sand_gazelle: {
    id: 'sand_gazelle',
    nameEn: 'Reem Al-Sahra (Sacred Sand Gazelle)',
    nameAr: 'غزال الريم النبطي المقدس',
    titleEn: 'Graceful Maiden of the Royal Rose Terraces',
    titleAr: 'ظبي البساتين النبطية والمصاطب الوردية',
    rarity: 'Sacred',
    loreEn: 'An embodiment of beauty and harmony, the sacred gazelle grazed in ancient Petra’s lush irrigated oasis terraced gardens, celebrated in love poems and royal feasts.',
    loreAr: 'رمز الرشاقة والسلام الذي طالما رعى في واحات البترا وبساتينها المدرجة المروية بنظم القنوات العبقرية. يبعث الطمأنينة في قلب كل مسافر ويقوده للسكينة.',
    icon: '🦌',
    svgArtKey: 'sand_gazelle',
    traits: ['رشاقة الرياح الوردية', 'ألفة القوافل', 'بركة الواحات النضرة'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'facades'
  },
  rose_phoenix: {
    id: 'rose_phoenix',
    nameEn: 'Finiq Al-Wardi (Rose Phoenix of Petra)',
    nameAr: 'طائر الفينيق الوردي النبطي',
    titleEn: 'Eternal Flame of Petra’s Rebirth',
    titleAr: 'طائر التجدد والخلود في وهج الصخر النبطي',
    rarity: 'Sacred',
    loreEn: 'Emerging from the radiant dusk glow on Petra’s sandstone peaks, the Rose Phoenix symbolizes resilience, revival, and the immortal legacy of the Nabataeans.',
    loreAr: 'ينبعث من بريق الغروب فوق جبال البترا الوردية حين تنعكس الشمس على الصخر الأملس، رمزاً للنهوض المستمر وخلود الحضارة النبطية التي لا تموت.',
    icon: '🪶',
    svgArtKey: 'rose_phoenix',
    traits: ['وهج الغروب الناري', 'رمز البعث والتجدد', 'حامي السجلات الأزلية'],
    preferredTime: 'Dusk / Night',
    startingLandmarkAffinity: 'monastery'
  },
  caracal: {
    id: 'caracal',
    nameEn: 'Washaq Al-Sharrah (Desert Caracal)',
    nameAr: 'وشق صخور الشراة الأرقط',
    titleEn: 'Nocturnal Prowler of the Sandstone Escarpment',
    titleAr: 'صياد الجروف وحارس دروب الشراة الوعرة',
    rarity: 'Rare',
    loreEn: 'With tufted ears that capture the faintest canyon breeze, the Caracal prowled the rocky ridges keeping the mountain trade corridors clear of venomous threats.',
    loreAr: 'بأذنيه الطويلتين الموشيتين بالريش، يلتقط أدق همسات الرياح في مضايق البترا. رشيق، سريع الخاطر، وكان يحرس قوافل البخور من الأخطار المتربصة.',
    icon: '🐆',
    svgArtKey: 'caracal',
    traits: ['وثبات الجروف الصخرية', 'سمع استثنائي فائق', 'حذر الصياد البارع'],
    preferredTime: 'Dusk / Night',
    startingLandmarkAffinity: 'theatre'
  },
  fennec: {
    id: 'fennec',
    nameEn: 'Thalab Al-Rimal (Sand Fennec Fox)',
    nameAr: 'ثعلب الرمال النبطي الذكي',
    titleEn: 'Clever Explorer of the Hidden Tomb Passages',
    titleAr: 'مستكشف السراديب ومداخل الكهوف الخبيئة',
    rarity: 'Rare',
    loreEn: 'Renowned for finding narrow cavern vents and underground storage vaults, the swift fennec accompanied Nabataean architects as they surveyed stone quarries.',
    loreAr: 'معروف بذكائه المتقد في اكتشاف فتحات التهوية والسراديب السرية المنحوتة في الصخر. كان الرفيق المفضل للمعماريين النبطيين أثناء مسح محاجر الحجر.',
    icon: '🦊',
    svgArtKey: 'fennec',
    traits: ['ذكاء هندسي موروث', 'مستكشف السراديب', 'خفة ظل وسرعة بديهة'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'facades'
  },
  hedgehog: {
    id: 'hedgehog',
    nameEn: 'Qunfudh Al-Wadi (Desert Hedgehog)',
    nameAr: 'قنفذ الصخر الصحراوي',
    titleEn: 'Gentle Watcher of Campfires and Date Palms',
    titleAr: 'أنيس الساهرين في ليالي الخيام البتراوية',
    rarity: 'Common',
    loreEn: 'Rustling through dried palm fronds by the campsite hearths, the desert hedgehog kept bedouin tents safe from creeping scorpions and beetles.',
    loreAr: 'يتحرك بهدوء ووداعة بين سعف النخيل حول مواقد السمر، ينشر البهجة بين المسافرين ويحمي مخيماتهم من الحشرات والعقارب المتسللة.',
    icon: '🦔',
    svgArtKey: 'hedgehog',
    traits: ['درع الحماية الشوكي', 'مؤنس السمر الليلي', 'صديق الطبيعة الصبور'],
    preferredTime: 'Dusk / Night',
    startingLandmarkAffinity: 'siq'
  },
  bee_eater: {
    id: 'bee_eater',
    nameEn: 'Warwar Al-Ain (Nabataean Bee-Eater)',
    nameAr: 'طائر الوروار النبطي الزاهي',
    titleEn: 'Vibrant Herald of Water Aqueducts & Spring Flowers',
    titleAr: 'دليل السواقي الزرقاء وأزهار الربيع البتراوي',
    rarity: 'Common',
    loreEn: 'Dappled with turquoise, gold, and terracotta feathers, its cheerful chirping guided thirsty wanderers straight to fresh running rainwater cisterns.',
    loreAr: 'بألوانه الزاهية المتلألئة بين الأزرق والذهبي، يرفرف مبتهجاً فوق قنوات الري النبطية، دالاً القوافل العطشى على مصبات المياه العذبة.',
    icon: '🐦',
    svgArtKey: 'bee_eater',
    traits: ['دليل الينابيع العذبة', 'ألوان البترا المشرقة', 'تغريد الفجر المبهج'],
    preferredTime: 'Morning',
    startingLandmarkAffinity: 'theatre'
  }
};

/**
 * Gacha Summoning Engine for the Ancient Nabataean Pouch ("سرة الفلوس").
 * Produces multiple collectible stamp cards (6 to 10 items) across:
 * - LEGENDARY (أسطوري)
 * - SACRED (مقدس)
 * - RARE (نادر)
 * - COMMON (شائع)
 */
export function performSatchelGachaPull(
  startingLandmarkId: string,
  timeOfDay: TimeOfDay,
  pullCount: number = 8,
  visitedCount: number = 0
): import('../types').SummonedCreatureStamp[] {
  const allCreatureList = Object.values(CREATURES);
  const legendaries = allCreatureList.filter(c => c.rarity === 'Legendary');
  const sacreds = allCreatureList.filter(c => c.rarity === 'Sacred');
  const rares = allCreatureList.filter(c => c.rarity === 'Rare');
  const commons = allCreatureList.filter(c => c.rarity === 'Common');

  // Bonus luck multiplier based on visited landmarks
  const luckBonus = Math.min(25, visitedCount * 5);

  const stamps: import('../types').SummonedCreatureStamp[] = [];

  for (let i = 0; i < pullCount; i++) {
    // Guaranteed at least one Sacred or Legendary in slot 0 or 1 for excitement!
    const isGuaranteedHighTier = i === 0;
    const roll = Math.floor(Math.random() * 100) + luckBonus;

    let selectedCreature: import('../types').Creature;
    let xpBonus = 50;

    if (isGuaranteedHighTier || roll >= 90) {
      // 50% chance Legendary, 50% Sacred on top tier
      if (Math.random() > 0.45 && legendaries.length > 0) {
        selectedCreature = legendaries[Math.floor(Math.random() * legendaries.length)];
        xpBonus = 250;
      } else {
        selectedCreature = sacreds[Math.floor(Math.random() * sacreds.length)];
        xpBonus = 150;
      }
    } else if (roll >= 72) {
      // Sacred tier
      selectedCreature = sacreds[Math.floor(Math.random() * sacreds.length)];
      xpBonus = 150;
    } else if (roll >= 40) {
      // Rare tier
      selectedCreature = rares[Math.floor(Math.random() * rares.length)];
      xpBonus = 100;
    } else {
      // Common tier
      // Check if landmark has affinity
      const landmarkMatches = commons.filter(c => c.startingLandmarkAffinity === startingLandmarkId);
      if (landmarkMatches.length > 0 && Math.random() > 0.4) {
        selectedCreature = landmarkMatches[Math.floor(Math.random() * landmarkMatches.length)];
      } else {
        selectedCreature = commons[Math.floor(Math.random() * commons.length)];
      }
      xpBonus = 50;
    }

    const serialNum = `PETRA-STAMP-${Math.floor(1000 + Math.random() * 9000)}`;

    stamps.push({
      instanceId: `inst-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      creature: selectedCreature,
      serialNumber: serialNum,
      unlockedAt: new Date().toISOString(),
      xpBonus,
      isLegendary: selectedCreature.rarity === 'Legendary',
      isSacred: selectedCreature.rarity === 'Sacred'
    });
  }

  // Ensure there is at least one Legendary in a batch of 8+ if not already present
  if (pullCount >= 8 && !stamps.some(s => s.isLegendary)) {
    const luckyIdx = Math.floor(Math.random() * stamps.length);
    const chosenLegendary = legendaries[Math.floor(Math.random() * legendaries.length)];
    stamps[luckyIdx] = {
      instanceId: `inst-${Date.now()}-boosted-${Math.random().toString(36).substring(2, 6)}`,
      creature: chosenLegendary,
      serialNumber: `PETRA-STAMP-${Math.floor(1000 + Math.random() * 9000)}`,
      unlockedAt: new Date().toISOString(),
      xpBonus: 250,
      isLegendary: true,
      isSacred: false
    };
  }

  return stamps;
}

/**
 * Deterministic explainable formula for opening the Satchel:
 * Inputs:
 * 1. Starting Landmark (siq: 10, treasury: 25, facades: 40, theatre: 55, monastery: 70)
 * 2. Time of Day (Morning: 5, Afternoon: 15, Dusk / Night: 25)
 * 3. Seed / Roll Value (0 - 100)
 * 4. Visited Landmarks count: If all 5 visited (>= 5), the Legendary Ibex is unlocked!
 */
export function calculateCreatureReveal(
  startingLandmarkId: string,
  timeOfDay: TimeOfDay,
  seedScore: number,
  allLandmarksVisited: boolean
): { creature: Creature; explainableFormula: string; roll: number } {
  // If visitor has completed all 5 landmarks, and opts for the pinnacle or hits high score
  if (allLandmarksVisited && (startingLandmarkId === 'monastery' || seedScore >= 40)) {
    return {
      creature: CREATURES.ibex,
      roll: seedScore,
      explainableFormula: `[Landmark: ${startingLandmarkId} (${allLandmarksVisited ? '5/5 Landmarks Cleared' : 'Incomplete'})] + [Time: ${timeOfDay}] + [Weighted Roll: ${seedScore}] ➔ Legendary Condition Met: Unlocked Al-Badan (Nubian Ibex)!`
    };
  }

  // Base landmark affinity weights
  const landmarkWeights: Record<string, number> = {
    siq: 10,
    treasury: 25,
    facades: 40,
    theatre: 55,
    monastery: 70
  };

  const timeWeights: Record<TimeOfDay, number> = {
    Morning: 10,
    Afternoon: 20,
    'Dusk / Night': 30
  };

  const lw = landmarkWeights[startingLandmarkId] || 20;
  const tw = timeWeights[timeOfDay] || 15;
  const compositeScore = (lw + tw + seedScore) % 100;

  // Falcon is Rare (unlocked when composite score >= 65 or starting landmark is theatre/monastery with good roll)
  if (compositeScore >= 65 || (startingLandmarkId === 'theatre' && timeOfDay === 'Afternoon')) {
    return {
      creature: CREATURES.falcon,
      roll: compositeScore,
      explainableFormula: `[Landmark Affinity: ${lw}] + [Time Factor: ${tw}] + [Seed Roll: ${seedScore}] = Index ${compositeScore} (Score ≥ 65) ➔ Rare Falcon (Al-Saqr) Revealed`
    };
  }

  // Scorpion is common/crevice guardian (favors Dusk / Night or Facades)
  if (timeOfDay === 'Dusk / Night' || compositeScore >= 35) {
    return {
      creature: CREATURES.scorpion,
      roll: compositeScore,
      explainableFormula: `[Landmark Affinity: ${lw}] + [Time Factor: ${tw}] + [Seed Roll: ${seedScore}] = Index ${compositeScore} (Night / Crevice Archetype) ➔ Canyon Sentinel Scorpion (Al-Aqrab) Revealed`
    };
  }

  // Default desert caravan companion: Camel
  return {
    creature: CREATURES.camel,
    roll: compositeScore,
    explainableFormula: `[Landmark Affinity: ${lw}] + [Time Factor: ${tw}] + [Seed Roll: ${seedScore}] = Index ${compositeScore} (Trail Archetype) ➔ Desert Caravan Camel (Al-Jammal) Revealed`
  };
}
