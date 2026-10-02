/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SouvenirProduct, SouvenirCategory, CartItem, Language } from '../types';
import { SOUVENIR_PRODUCTS } from '../data/souvenirs';
import { playStampSound, playSuccessChime } from '../utils/audio';
import {
  ShoppingBag,
  Coins,
  Award,
  QrCode,
  Sparkles,
  Check,
  Plus,
  Minus,
  Trash2,
  X,
  Compass,
  MapPin,
  MessageSquare,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { LandmarkQrScanner } from './LandmarkQrScanner';
import { Landmark } from '../types';
import { LANDMARKS } from '../data/landmarks';
import { placeSouvenirOrder } from '../services/souvenirOrderService';

interface SouvenirShopProps {
  language: Language;
  visitedCount: number;
  totalLandmarks: number;
  collectedStampsCount: number;
  userPoints?: number;
  onNavigateTab?: (tab: 'passport' | 'map' | 'souq' | 'satchel' | 'chat') => void;
  onOpenQrScanner?: () => void;
  isEmbedded?: boolean;
  // Optional shared cart state so the app header can show and open the cart
  cart?: CartItem[];
  onCartChange?: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen?: boolean;
  onCartOpenChange?: (open: boolean) => void;
}

export const SouvenirShop: React.FC<SouvenirShopProps> = ({
  language,
  visitedCount,
  totalLandmarks = 17,
  collectedStampsCount = 1,
  userPoints = 170,
  onNavigateTab,
  onOpenQrScanner,
  isEmbedded = false,
  cart: sharedCart,
  onCartChange,
  isCartOpen: sharedIsCartOpen,
  onCartOpenChange
}) => {
  const isAr = language === 'ar';

  // Points State (Exploration Score only, not spent on items)
  const currentPoints = userPoints + visitedCount * 50;

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState<SouvenirCategory>('all');

  // Shopping Cart State (shared with the app when provided, otherwise local)
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [localIsCartOpen, setLocalIsCartOpen] = useState<boolean>(false);
  const cart = sharedCart ?? localCart;
  const setCart = onCartChange ?? setLocalCart;
  const isCartOpen = sharedIsCartOpen ?? localIsCartOpen;
  const setIsCartOpen = onCartOpenChange ?? setLocalIsCartOpen;
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Receiving method: pickup at the Visitor Center or shipping to an address
  const [fulfillment, setFulfillment] = useState<'pickup' | 'shipping'>('pickup');
  const [shipName, setShipName] = useState('');
  const [shipPhone, setShipPhone] = useState('');
  const [shipCity, setShipCity] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{ code: string; fulfillment: 'pickup' | 'shipping'; address?: string } | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Add product to cart
  const handleAddToCart = (product: SouvenirProduct) => {
    playStampSound();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(isAr ? `✓ أُضيف "${product.nameAr}" إلى سلة المقتنيات` : `✓ Added "${product.nameEn}" to cart`);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Cart calculations
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalUsd = cart.reduce((acc, item) => acc + item.product.priceUsd * item.quantity, 0);

  // Complete checkout (Pure reservation / local artisan order, points are not spent)
  const handleCheckout = async () => {
    if (cart.length === 0 || isSubmittingOrder) return;
    if (fulfillment === 'shipping') {
      if (shipName.trim().length < 2) {
        setCheckoutError(isAr ? 'يرجى كتابة الاسم الكامل.' : 'Please enter your full name.');
        return;
      }
      if (!/^\+?[0-9\s-]{7,20}$/.test(shipPhone.trim())) {
        setCheckoutError(isAr ? 'يرجى كتابة رقم هاتف صحيح.' : 'Please enter a valid phone number.');
        return;
      }
      if (shipCity.trim().length < 2 || shipAddress.trim().length < 3) {
        setCheckoutError(isAr ? 'يرجى كتابة المدينة وعنوان الشحن.' : 'Please enter the city and shipping address.');
        return;
      }
    }
    setCheckoutError(null);
    setIsSubmittingOrder(true);
    try {
      // Send the order to the server so it reaches the site management console
      const order = await placeSouvenirOrder({
        cart,
        fulfillment,
        shipping:
          fulfillment === 'shipping'
            ? { name: shipName.trim(), phone: shipPhone.trim(), city: shipCity.trim(), address: shipAddress.trim() }
            : undefined,
        language
      });
      playSuccessChime();
      setConfirmedOrder({
        code: order.code,
        fulfillment,
        address: fulfillment === 'shipping' ? `${shipCity.trim()} – ${shipAddress.trim()}` : undefined
      });
      setCheckoutSuccess(true);
      setIsCartOpen(false);
      setCart([]);
    } catch (err: any) {
      setCheckoutError(
        isAr
          ? 'تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.'
          : err?.message || 'Could not send the order, please try again.'
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Filter products
  const filteredProducts =
    activeCategory === 'all'
      ? SOUVENIR_PRODUCTS
      : SOUVENIR_PRODUCTS.filter(p => p.category === activeCategory);

  // Category filter definitions
  const categories: Array<{ id: SouvenirCategory; labelAr: string; labelEn: string; icon: string }> = [
    { id: 'all', labelAr: 'جميع المعروضات', labelEn: 'All Items', icon: '🏺' },
    { id: 'textiles', labelAr: 'المنسوجات والشماغات', labelEn: 'Textiles & Shemaghs', icon: '🧣' },
    { id: 'tea', labelAr: 'الشاي والأعشاب البرية', labelEn: 'Wild Teas & Herbs', icon: '🌿' },
    { id: 'crafts', labelAr: 'الحرف وصخور البتراء', labelEn: 'Crafts & Petra Rocks', icon: '🏜️' },
    { id: 'silver', labelAr: 'الفضة والنقوش النبطية', labelEn: 'Silver & Nabataean Engravings', icon: '💍' },
    { id: 'pottery', labelAr: 'الفخار والخزف', labelEn: 'Pottery & Ceramics', icon: '☕' },
    { id: 'dead_sea', labelAr: 'طين وأملاح البحر الميت', labelEn: 'Dead Sea Mud & Salts', icon: '🌊' }
  ];

  // Dynamic exploration percentage (e.g., 13% for 2-3 landmarks)
  const explorationPct = Math.max(13, Math.round((visitedCount / totalLandmarks) * 100));

  return (
    <div
      className={
        isEmbedded
          ? 'font-sans relative select-none'
          : 'min-h-screen bg-[#1A0C08] text-[#FAF5ED] font-sans pb-28 relative select-none'
      }
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#7A2E1D] text-[#FAF5ED] border border-[#C8963E] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#FDE68A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & NAVIGATION BAR (Rendered in standalone mode):
          - Tabs: جواز السفر (Passport), خريطة البتراء (Petra Map), سوق الأنباط (Souq), جعبة المستكشف (Inventory), المرشد النبطي (Nabataean Guide)
          - Badges: دراهم نبطية: 170, الأختام المكتسبة: 1/8
          - Action: سلة المقتنيات (Shopping Cart with USD price)
      */}
      {!isEmbedded && (
        <header className="sticky top-0 z-40 bg-[#25100B]/95 backdrop-blur-md border-b border-[#C8963E]/40 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8963E] to-[#7A2E1D] text-[#FAF5ED] flex items-center justify-center font-bold text-lg shadow-inner border border-[#FDE68A]/40">
                أن
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-lg md:text-xl text-[#FDE68A] tracking-wide flex items-center gap-2">
                  <span>سوق الحرف والتحف البتراوية</span>
                  <span className="text-xs bg-[#7A2E1D] text-[#FAF5ED] font-medium px-2 py-0.5 rounded-full border border-[#C8963E]/50">
                    سوق الأنباط
                  </span>
                </h1>
                <p className="text-[11px] text-[#E8DCC9]/70 hidden sm:block">
                  تحف يدوية نادرة، صخور رملية، منسوجات ومسكوكات نبطية أصلية
                </p>
              </div>
            </div>

            {/* User Badges & Currency Stats in Header (Required by User Prompt) */}
            <div className="flex items-center gap-2.5 text-xs">
              {/* نقاط الاستكشاف */}
              <div
                className="flex items-center gap-1.5 bg-[#3B170E] px-3 py-1.5 rounded-xl border border-[#C8963E]/50 shadow-inner"
                title={isAr ? 'نقاط الاستكشاف التراكمية المكتسبة' : 'Cumulative exploration points'}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-stone-300">{isAr ? 'نقاط الاستكشاف:' : 'Points:'}</span>
                <strong className="text-[#FDE68A] font-bold font-mono text-sm">{currentPoints}</strong>
              </div>

              {/* الأختام المكتسبة: 1/8 */}
              <div
                className="flex items-center gap-1.5 bg-[#3B170E] px-3 py-1.5 rounded-xl border border-[#C8963E]/50 shadow-inner"
                title="أختام الكائنات النبطية المكتسبة"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-stone-300">{isAr ? 'الأختام المكتسبة:' : 'Stamps:'}</span>
                <strong className="text-emerald-300 font-bold font-mono text-sm">
                  {collectedStampsCount} / 8
                </strong>
              </div>

              {/* سلة المقتنيات Button with USD price (Required by User Prompt) */}
              <button
                id="btn-header-cart"
                onClick={() => setIsCartOpen(true)}
                className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold px-3.5 py-1.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer border border-[#FDE68A]"
              >
                <ShoppingBag className="w-4 h-4 text-[#331C16]" />
                <span>{isAr ? 'سلة المقتنيات' : 'Shopping Cart'}</span>
                <span className="bg-[#7A2E1D] text-[#FAF5ED] text-[11px] font-mono px-2 py-0.2 rounded-full">
                  {cartTotalItems} · ${cartTotalUsd}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar:
              جواز السفر (Passport), خريطة البتراء (Petra Map), سوق الأنباط (Souq), جعبة المستكشف (Inventory), المرشد النبطي (Nabataean Guide)
          */}
          <div className="bg-[#1D0C07] border-t border-[#C8963E]/20 px-4 py-1.5 overflow-x-auto">
            <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[620px] text-xs">
              <nav className="flex items-center gap-2" aria-label="Petra App Tabs">
                {/* 1. جواز السفر (Passport) */}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('passport')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#7A2E1D]/50 transition cursor-pointer font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C8963E]" />
                  <span>{isAr ? 'جواز السفر' : 'Passport'}</span>
                </button>

                {/* 2. خريطة البتراء (Petra Map) */}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('map')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#7A2E1D]/50 transition cursor-pointer font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
                  <span>{isAr ? 'خريطة البتراء' : 'Petra Map'}</span>
                </button>

                {/* 3. سوق الأنباط (Souq) - Active Tab! */}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('souq')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C8963E] text-[#331C16] font-bold shadow-md transition cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#331C16]" />
                  <span>{isAr ? 'سوق الأنباط' : 'Souq (Market)'}</span>
                </button>

                {/* 4. جعبة المستكشف (Inventory / Pouch) */}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('satchel')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#7A2E1D]/50 transition cursor-pointer font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C8963E]" />
                  <span>{isAr ? 'جعبة المستكشف' : 'Inventory / Satchel'}</span>
                </button>

                {/* 5. المرشد النبطي (Nabataean Guide) */}
                <button
                  onClick={() => onNavigateTab && onNavigateTab('chat')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#7A2E1D]/50 transition cursor-pointer font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C8963E]" />
                  <span>{isAr ? 'المرشد النبطي' : 'Nabataean Guide'}</span>
                </button>
              </nav>

              <span className="text-[11px] text-[#C8963E] font-serif hidden md:block">
                ✦ مسكوك ومعتمد رسمياً من سلطة إقليم البترا
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Market Hero Banner */}
        <div className="bg-[#FAF5ED] border-2 border-[#C8963E]/40 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-lg text-[#331C16]">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-[#7A2E1D]/15 text-[#7A2E1D] text-xs font-bold px-3 py-1 rounded-full border border-[#7A2E1D]/30 inline-block mb-2">
              {isAr ? 'بازار البترا الحرفي والتراثي الأصيل' : 'Authentic Petra Artisan Bazaar'}
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#561E12] leading-snug">
              {isAr ? 'سوق الحرف والتحف البتراوية' : 'Petra Crafts & Souvenirs Market'}
            </h2>
            <p className="text-xs md:text-sm text-[#5C3B30] mt-2 leading-relaxed">
              {isAr
                ? 'حرف يدوية وتذكارات أصيلة من صناع وادي موسى والبادية، بنقوش نباتية وخامات طبيعية. كل قطعة موثقة بشهادة جودة معتمدة دعماً للحرفيين المحليين وتراث البتراء الأصيل.'
                : 'Authentic local crafts from Wadi Musa and Bedouin artisans, with floral engravings and natural materials. Certified quality supporting local heritage.'}
            </p>
          </div>
        </div>

        {/* CATEGORY FILTER TABS (Required by User Prompt):
            جميع المعروضات (All Items)
            المنسوجات والشماغات (Textiles & Shemaghs)
            الشاي والأعشاب البرية (Wild Teas & Herbs)
            الحرف وصخور البتراء (Crafts & Petra Rocks)
            الفضة والنقوش النبطية (Silver & Nabataean Engravings)
            الفخار والخزف (Pottery & Ceramics)
            طين وأملاح البحر الميت (Dead Sea Mud & Salts)
        */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A2E1D] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
              <span>{isAr ? 'تصنيفات التحف والمعروضات' : 'Categories'}</span>
            </h3>
            <span className="text-[11px] text-[#7A5A50] font-medium">
              {filteredProducts.length} {isAr ? 'منتج متوفر' : 'items available'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#7A2E1D] text-[#FAF5ED] shadow-md ring-2 ring-[#C8963E]/80 scale-[1.02]'
                      : 'bg-[#FAF5ED] text-[#561E12] hover:text-[#7A2E1D] hover:bg-[#F3EBDD] border border-[#C8963E]/40 shadow-xs'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCTS GRID (Required by User Prompt):
            - Responsive 4-column card grid
            - High-quality souvenir image
            - Rarity / Highlight tag on top of the image
            - Product title in Arabic, short description, price in دراهم نبطية and USD ($)
            - "إضافة إلى السلة" (Add to Cart) button
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-[#FAF5ED] rounded-2xl border-2 border-[#C8963E]/40 overflow-hidden shadow-md flex flex-col justify-between hover:border-[#7A2E1D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Top Image Container with Rarity / Highlight Tag */}
              <div className="relative aspect-4/3 w-full bg-[#E8DCC9] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    // Fallback to stylized container if network fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Highlight Tag on top of the image */}
                <div className="absolute top-2.5 right-2.5 rtl:right-2.5 rtl:left-auto">
                  <span className="bg-[#7A2E1D] text-[#FAF5ED] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#C8963E]/60 shadow-md">
                    {product.tagAr}
                  </span>
                </div>

                {/* Artisan origin pill bottom */}
                <div className="absolute bottom-2 left-2.5 rtl:left-2.5 rtl:right-auto">
                  <span className="bg-[#331C16]/85 backdrop-blur-xs text-[#E8DCC9] text-[9px] font-medium px-2 py-0.5 rounded-md border border-[#C8963E]/30">
                    {product.artisanAr}
                  </span>
                </div>
              </div>

              {/* Card Body: Title, Description, Rating */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-600 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span className="font-bold font-mono text-[11px] text-[#5C3B30]">{product.rating}</span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#561E12] leading-snug mb-1">
                    {isAr ? product.nameAr : product.nameEn}
                  </h4>
                  <p className="text-xs text-[#5C3B30] line-clamp-2 leading-relaxed mb-3 font-normal">
                    {isAr ? product.shortDescAr : product.shortDescEn}
                  </p>
                </div>

                {/* Pricing & Add to Cart Action */}
                <div className="pt-3 border-t border-[#C8963E]/25 mt-auto">
                  {/* Product Price in USD & JOD */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#7A5A50] leading-tight font-medium">
                        {isAr ? 'سعر الحرفة:' : 'Artisan Price:'}
                      </span>
                      <strong className="text-[#7A2E1D] font-extrabold text-base font-mono">
                        ${product.priceUsd}
                        <span className="text-xs text-stone-500 font-sans font-normal mx-1.5">
                          ({Math.round(product.priceUsd * 0.71)} {isAr ? 'د.أ' : 'JOD'})
                        </span>
                      </strong>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {isAr ? 'حرفة أصلية' : 'Authentic'}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#7A2E1D] hover:bg-[#682415] active:scale-[0.98] text-[#FAF5ED] font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-[#C8963E]/40"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C8963E]" />
                    <span>{isAr ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* SHOPPING CART SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
            <motion.div
              initial={{ x: isAr ? -350 : 350 }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? -350 : 350 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#241009] border-l rtl:border-l-0 rtl:border-r border-[#C8963E]/50 w-full max-w-md h-full flex flex-col p-6 text-[#FAF5ED] shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#C8963E]/30 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#FDE68A]" />
                  <h3 className="font-heading font-extrabold text-lg text-[#FDE68A]">
                    {isAr ? 'سلة مقتنيات الأنباط' : 'Your Nabataean Cart'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-white p-1.5 rounded-lg bg-black/30 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 shrink-0 min-h-[150px] overflow-y-auto space-y-3 pr-1 pl-1">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                    <ShoppingBag className="w-12 h-12 text-stone-600 mb-2" />
                    <p className="text-sm font-bold text-stone-300">
                      {isAr ? 'سلة المقتنيات فارغة حالياً' : 'Your shopping cart is empty'}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {isAr
                        ? 'تصفح معروضات التحف والمنسوجات وأضف ما يعجبك إلى سلتك.'
                        : 'Explore handcrafted souvenirs and add items to your cart.'}
                    </p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.product.id}
                      className="bg-[#31150D] p-3 rounded-xl border border-[#C8963E]/30 flex items-center justify-between gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.nameAr}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-[#FDE68A] truncate">
                          {isAr ? item.product.nameAr : item.product.nameEn}
                        </h5>
                        <div className="flex items-center gap-2 text-[11px] font-mono mt-0.5">
                          <span className="text-[#FDE68A] font-bold">${item.product.priceUsd * item.quantity}</span>
                          <span className="text-stone-400 text-[10px]">
                            ({Math.round(item.product.priceUsd * item.quantity * 0.71)} {isAr ? 'د.أ' : 'JOD'})
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-[#C8963E]/30">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, -1)}
                          className="text-stone-300 hover:text-white cursor-pointer p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, 1)}
                          className="text-stone-300 hover:text-white cursor-pointer p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title={isAr ? 'حذف' : 'Remove'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Totals & Checkout Actions */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-[#C8963E]/30 space-y-3 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300">{isAr ? 'المجموع الكلي للمقتنيات:' : 'Total Price:'}</span>
                    <strong className="text-emerald-400 font-bold font-mono text-base">
                      ${cartTotalUsd}{' '}
                      <span className="text-xs text-stone-300 font-sans font-normal">
                        ({Math.round(cartTotalUsd * 0.71)} {isAr ? 'د.أ' : 'JOD'})
                      </span>
                    </strong>
                  </div>

                  <p className="text-[11px] text-stone-400 leading-tight">
                    {isAr
                      ? '✨ الشراء يدعم الحرفيين المحليين في البتراء ووادي موسى مباشرة. نقاطك الاستكشافية محفوظة لسجلك الأثري.'
                      : '✨ Purchases directly support local Wadi Musa artisans. Your exploration points remain intact.'}
                  </p>

                  {/* Receiving method */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#FDE68A] block">
                      {isAr ? 'طريقة الاستلام:' : 'Receiving method:'}
                    </span>
                    {([
                      {
                        id: 'pickup' as const,
                        labelAr: 'استلام من مركز زوار البترا',
                        labelEn: 'Pick up at the Petra Visitor Center',
                        hintAr: 'استلم مقتنياتك عند خروجك من الموقع.',
                        hintEn: 'Collect your items on your way out.'
                      },
                      {
                        id: 'shipping' as const,
                        labelAr: 'شحن إلى عنوانك',
                        labelEn: 'Ship to your address',
                        hintAr: 'نشحن مقتنياتك إلى العنوان الذي تحدده.',
                        hintEn: 'We ship your items to the address you provide.'
                      }
                    ]).map(option => (
                      <label
                        key={option.id}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                          fulfillment === option.id
                            ? 'border-[#FDE68A] bg-[#C8963E]/15'
                            : 'border-[#C8963E]/30 hover:border-[#C8963E]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="souvenir-fulfillment"
                          value={option.id}
                          checked={fulfillment === option.id}
                          onChange={() => {
                            setFulfillment(option.id);
                            setCheckoutError(null);
                          }}
                          className="mt-0.5 accent-[#C8963E]"
                        />
                        <span>
                          <span className="block text-xs font-bold text-[#FAF5ED]">{isAr ? option.labelAr : option.labelEn}</span>
                          <span className="block text-[10px] text-stone-400">{isAr ? option.hintAr : option.hintEn}</span>
                        </span>
                      </label>
                    ))}

                    {fulfillment === 'shipping' && (
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {[
                          { value: shipName, set: setShipName, ar: 'الاسم الكامل *', en: 'Full name *', type: 'text', max: 60 },
                          { value: shipPhone, set: setShipPhone, ar: 'رقم الهاتف *', en: 'Phone *', type: 'tel', max: 20 },
                          { value: shipCity, set: setShipCity, ar: 'المدينة *', en: 'City *', type: 'text', max: 40 },
                          { value: shipAddress, set: setShipAddress, ar: 'العنوان بالتفصيل *', en: 'Full address *', type: 'text', max: 200 }
                        ].map(field => (
                          <input
                            key={field.en}
                            type={field.type}
                            value={field.value}
                            maxLength={field.max}
                            dir={field.type === 'tel' ? 'ltr' : undefined}
                            onChange={e => {
                              field.set(e.target.value);
                              if (checkoutError) setCheckoutError(null);
                            }}
                            placeholder={isAr ? field.ar : field.en}
                            className="w-full bg-black/30 border border-[#C8963E]/40 rounded-lg px-3 py-2 text-xs text-[#FAF5ED] placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#C8963E] rtl:text-right"
                          />
                        ))}
                      </div>
                    )}

                    {checkoutError && (
                      <p className="text-[11px] text-red-300 bg-red-900/30 border border-red-500/40 rounded-lg px-2.5 py-1.5">
                        {checkoutError}
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmittingOrder}
                    className="w-full bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold text-xs py-3 px-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#331C16]" />
                    <span>{isAr ? 'تأكيد طلب التذكار وحجزه' : 'Confirm & Reserve Souvenirs'}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#241009] border-2 border-[#C8963E] rounded-3xl max-w-md w-full p-6 text-center text-[#FAF5ED] shadow-2xl relative"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-[#FDE68A] mb-2">
                {isAr ? 'تم تأكيد طلبك بنجاح!' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-[#E8DCC9]/90 leading-relaxed mb-6">
                {confirmedOrder?.fulfillment === 'shipping'
                  ? isAr
                    ? `مبارك عليك هذه التحف البتراوية الأصيلة! سيتم شحن مقتنياتك إلى: ${confirmedOrder.address}`
                    : `Congratulations on acquiring authentic Petra crafts. Your items will be shipped to: ${confirmedOrder.address}`
                  : isAr
                  ? 'مبارك عليك هذه التحف البتراوية الأصيلة! يمكنك استلام مقتنياتك من مركز زوار البترا عند خروجك.'
                  : 'Congratulations on acquiring authentic Petra crafts. Collect your items at the Petra Visitor Center on your way out.'}
              </p>

              {confirmedOrder?.code && (
                <div className="bg-black/30 border-2 border-dashed border-[#C8963E] rounded-xl py-3 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                    {isAr ? 'رقم الطلب' : 'Order code'}
                  </span>
                  <span id="souvenir-order-code" className="font-mono font-black text-2xl tracking-widest text-[#FDE68A]">
                    {confirmedOrder.code}
                  </span>
                </div>
              )}

              <button
                onClick={() => setCheckoutSuccess(false)}
                className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED BOTTOM BAR PROGRESS:
          - Fixed bottom banner with exploration stats:
            * نسبة استكشاف البتراء: 13%
            * 1 / 8 الأختام المكتسبة
            * مسح رمز المعلم (QR)
      */}
      {!isEmbedded && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#25100B]/95 backdrop-blur-md border-t-2 border-[#C8963E]/60 py-3 px-4 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#FAF5ED]">
            {/* Stats Left */}
            <div className="flex items-center gap-4 text-xs">
              {/* نسبة استكشاف البتراء: 13% */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-[#FDE68A]">
                  {isAr ? 'نسبة استكشاف البتراء:' : 'Petra Exploration:'}
                </span>
                <strong className="text-emerald-300 font-mono font-bold text-sm">
                  {explorationPct}%
                </strong>
              </div>

              <span className="text-stone-500">•</span>

              {/* 1 / 8 الأختام المكتسبة */}
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-stone-300 font-bold">
                  {collectedStampsCount} / 8 {isAr ? 'الأختام المكتسبة' : 'Stamps Unlocked'}
                </span>
              </div>
            </div>

            {/* Actions Right: مسح رمز المعلم (QR) + Return to Map */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* مسح رمز المعلم (QR) Button */}
              <button
                id="btn-bottom-qr-scanner"
                onClick={() => {
                  if (onOpenQrScanner) {
                    onOpenQrScanner();
                  } else {
                    setIsQrScannerOpen(true);
                  }
                }}
                className="bg-[#C8963E] hover:bg-[#b8852d] text-[#331C16] font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer border border-[#FDE68A]"
              >
                <QrCode className="w-4 h-4" />
                <span>{isAr ? 'مسح رمز المعلم (QR)' : 'Scan Landmark QR'}</span>
              </button>

              {/* Return to Map */}
              <button
                onClick={() => onNavigateTab && onNavigateTab('map')}
                className="bg-[#7A2E1D] hover:bg-[#632416] text-[#FAF5ED] font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer border border-[#C8963E]/40"
              >
                <span>{isAr ? 'خريطة بترا' : 'Map'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Modal (if opened locally in shop) */}
      <AnimatePresence>
        {isQrScannerOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#241009] border border-[#C8963E] rounded-2xl w-full max-w-lg p-5 shadow-2xl relative text-[#FAF5ED]">
              <div className="flex items-center justify-between pb-3 border-b border-[#C8963E]/40 mb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-[#FDE68A]">
                  <QrCode className="w-4 h-4" />
                  <span>{isAr ? 'مسح رمز المعلم الميداني (QR)' : 'Field QR Code Scanner'}</span>
                </div>
                <button
                  onClick={() => setIsQrScannerOpen(false)}
                  className="p-1 text-stone-400 hover:text-white rounded-lg bg-black/30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <LandmarkQrScanner
                language={language}
                visitedLandmarks={[]}
                onCheckInSuccess={(landmark) => {
                  showToast(isAr ? `✓ تم توثيق زيارة "${landmark.nameAr}"!` : `✓ Checked in at "${landmark.nameEn}"!`);
                  setIsQrScannerOpen(false);
                }}
                onClose={() => setIsQrScannerOpen(false)}
                onViewStory={() => {
                  setIsQrScannerOpen(false);
                  if (onNavigateTab) {
                    onNavigateTab('map');
                  }
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
