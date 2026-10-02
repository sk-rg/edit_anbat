/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar' | 'fr' | 'es' | 'de' | 'it' | 'zh';

export type CreatureRarity = 'Common' | 'Rare' | 'Sacred' | 'Legendary';

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Dusk / Night';

export type CreatureSvgKey =
  | 'camel'
  | 'falcon'
  | 'ibex'
  | 'scorpion'
  | 'eagle'
  | 'winged_lion'
  | 'sacred_viper'
  | 'sand_gazelle'
  | 'rose_phoenix'
  | 'caracal'
  | 'fennec'
  | 'hedgehog'
  | 'bee_eater';

export interface Creature {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  rarity: CreatureRarity;
  loreEn: string;
  loreAr: string;
  icon: string; // Emoji representation
  svgArtKey: CreatureSvgKey;
  traits: string[];
  preferredTime: TimeOfDay;
  startingLandmarkAffinity: string;
}

export interface SummonedCreatureStamp {
  instanceId: string;
  creature: Creature;
  serialNumber: string;
  unlockedAt: string;
  xpBonus: number;
  isLegendary: boolean;
  isSacred: boolean;
}

export interface VisitorGuideBadge {
  creatureId: string;
  customName: string;
  unlockedAt: string;
  startingLandmarkId: string;
  timeOfDay: TimeOfDay;
  rarityRoll: number;
  explainableFormula: string;
}

export interface Landmark {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  routeOrder: number;
  svgCoordinates: { x: number; y: number };
  geoCoordinates: { lat: number; lng: number };
  shortDescEn: string;
  shortDescAr: string;
  curatedStoryEn: string;
  curatedStoryAr: string;
  knowledgeEntryIds: string[];
  thumbnailUrl?: string;
}

export interface KnowledgeEntry {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'landmark' | 'engineering' | 'beliefs' | 'myth' | 'condition';
  contentEn: string;
  contentAr: string;
  keywords: string[];
  landmarkId?: string;
  addedBy?: 'curated' | 'admin';
  createdAt?: string;
}

export interface WebCitation {
  title?: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'creature' | 'system';
  text: string;
  language: Language;
  timestamp: string;
  sources?: string[]; // Knowledge entry titles or IDs
  groundingUrls?: WebCitation[];
  searchQueries?: string[];
  isFallback?: boolean;
  isUnknown?: boolean;
  queuedForReview?: boolean;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  language: Language;
  timestamp: string;
  creatureName?: string;
  status: 'pending' | 'resolved';
  resolvedAnswer?: string;
  resolvedAt?: string;
}

export interface MonumentConditionEntry {
  id: string;
  index: number;
  landmarkId: string;
  note: string;
  severity: number; // 1 to 5
  photoBase64?: string;
  timestamp: string;
  prevHash: string;
  hash: string;
}

export interface IntegrityVerificationResult {
  isValid: boolean;
  tamperedIndex?: number;
  details: string;
  verifiedCount: number;
}

export type ServiceCategory = 'restroom' | 'info' | 'medical' | 'restaurant' | 'ticket' | 'water';

export interface PetraServicePoint {
  id: string;
  category: ServiceCategory;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  geoCoordinates: { lat: number; lng: number };
  nearLandmarkId: string;
  iconType: 'restroom' | 'info' | 'medical' | 'restaurant' | 'ticket' | 'water';
}

export interface WalkingRouteLeg {
  fromLandmarkId: string;
  toLandmarkId: string;
  distanceMeters: number;
  distanceText: string;
  durationSeconds: number;
  durationText: string;
}

export interface PetraTrailRouteSummary {
  totalDistanceMeters: number;
  totalDistanceText: string;
  totalDurationSeconds: number;
  totalDurationText: string;
  legs: WalkingRouteLeg[];
  isUsingWalkingDirections: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  favouriteFood: string;
  createdAt: string;
}

export type SouvenirCategory =
  | 'all'
  | 'textiles'
  | 'tea'
  | 'crafts'
  | 'silver'
  | 'pottery'
  | 'dead_sea';

export interface SouvenirProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  category: SouvenirCategory;
  shortDescAr: string;
  shortDescEn: string;
  priceDirhams: number;
  priceUsd: number;
  tagAr: string;
  imageUrl: string;
  rating: number;
  artisanAr: string;
  inStock: boolean;
}

export interface CartItem {
  product: SouvenirProduct;
  quantity: number;
}

export type SouvenirOrderStatus = 'new' | 'ready' | 'completed' | 'cancelled';

export interface SouvenirOrderLine {
  productId: string;
  nameAr: string;
  nameEn: string;
  quantity: number;
  unitPriceUsd: number;
}

export interface SouvenirOrder {
  id: string;
  code: string;
  items: SouvenirOrderLine[];
  fulfillment: 'pickup' | 'shipping';
  shipping?: { name: string; phone: string; city: string; address: string };
  totalUsd: number;
  totalJod: number;
  status: SouvenirOrderStatus;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  fullName: string;
  email: string;
  category: string;
  subject: string;
  details: string;
  status: 'submitted' | 'under_review' | 'resolved';
  createdAt: string;
}

