/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language, VisitorGuideBadge } from '../types';
import { CREATURES } from '../data/creatures';
import {
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  getLocalizedCreature,
  getLocalizedSuggestedQueries
} from '../data/translations';
import { askGuideCreatureStreaming } from '../services/geminiService';
import { CreatureSvg } from './CreatureSvg';
import {
  Send,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  Clock,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Languages,
  Info,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Search
} from 'lucide-react';

interface ChatGuideProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeBadge: VisitorGuideBadge | null;
  initialQuestion?: string;
  onOpenSatchel: () => void;
  onOpenAdmin: () => void;
}

export const ChatGuide: React.FC<ChatGuideProps> = ({
  language,
  onLanguageChange,
  activeBadge,
  initialQuestion,
  onOpenSatchel,
  onOpenAdmin
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isAr = language === 'ar';

  const activeCreature = activeBadge ? CREATURES[activeBadge.creatureId] || CREATURES.camel : CREATURES.camel;
  const localizedCreature = getLocalizedCreature(activeCreature, language);
  const guideName = activeBadge?.customName || localizedCreature.name;

  const getWelcomeText = (lang: Language) => {
    const locT = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
    const locCreature = getLocalizedCreature(activeCreature, lang);
    const name = activeBadge?.customName || locCreature.name;
    return locT.chatWelcomeMsg.replace('{guideName}', `${name} (${locCreature.name})`);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'creature',
      text: getWelcomeText(language),
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['ANBAT Verified Petra Archive', 'Google Search Grounding']
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState(initialQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [queuedNotification, setQueuedNotification] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'monuments' | 'logistics' | 'engineering' | 'myths'>('all');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Update welcome message if language changed and no other message has been sent
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'msg-welcome') {
        return [{
          ...prev[0],
          text: getWelcomeText(language),
          language
        }];
      }
      return prev;
    });
  }, [language, guideName]);

  useEffect(() => {
    if (initialQuestion) {
      setInputQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Stop speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-to-speech audio reader for the guide
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of markdown formatting for cleaner speech
    const cleanText = text.replace(/[*#_`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const speechLangMap: Record<Language, string> = {
      ar: 'ar-SA',
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT',
      zh: 'zh-CN'
    };
    utterance.lang = speechLangMap[language] || 'en-US';
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Curated demo questions categorized for fast discovery in user language
  const suggestedQueries = getLocalizedSuggestedQueries(language);

  const filteredQueries = activeTab === 'all'
    ? suggestedQueries
    : suggestedQueries.filter(q => q.category === activeTab);

  const handleSendMessage = async (queryToSend?: string) => {
    const raw = queryToSend !== undefined ? queryToSend : inputQuestion;
    const trimmed = raw.trim();

    // 1. Validation checks
    if (!trimmed) {
      setValidationError(t.chatEmptyPromptWarning);
      return;
    }

    if (trimmed.length > 500) {
      setValidationError(
        isAr
          ? `تجاوز السؤال الحد المسموح (500 حرف). سؤالك الحالي ${trimmed.length}/500 حرف.`
          : `Question exceeds the 500 character limit (currently ${trimmed.length}/500). Please shorten your inquiry.`
      );
      return;
    }

    setValidationError(null);
    setQueuedNotification(null);

    // Append user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    // The guide's reply appears as soon as the first words stream in, then fills up
    const botMsgId = `bot-${Date.now()}`;
    let streamStarted = false;

    try {
      const response = await askGuideCreatureStreaming(
        trimmed,
        guideName,
        activeCreature.nameEn,
        language,
        textSoFar => {
          if (!streamStarted) {
            streamStarted = true;
            setStreamingMsgId(botMsgId);
            setMessages(prev => [
              ...prev,
              {
                id: botMsgId,
                sender: 'creature',
                text: textSoFar,
                language,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          } else {
            setMessages(prev => prev.map(m => (m.id === botMsgId ? { ...m, text: textSoFar } : m)));
          }
        }
      );

      const creatureMsg: ChatMessage = {
        id: botMsgId,
        sender: 'creature',
        text: response.text,
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
        groundingUrls: response.groundingUrls,
        searchQueries: response.searchQueries,
        isFallback: response.isFallback,
        isUnknown: response.isUnknown,
        queuedForReview: response.queuedForReview
      };

      setMessages(prev =>
        prev.some(m => m.id === botMsgId)
          ? prev.map(m => (m.id === botMsgId ? creatureMsg : m))
          : [...prev, creatureMsg]
      );

      // If question was automatically added to unanswered queue, show feedback
      if (response.queuedForReview || response.isUnknown) {
        setQueuedNotification(t.chatQueuedSuccessNotice);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: err.message || t.chatErrorFailedToSend,
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setStreamingMsgId(null);
    }
  };

  return (
    <div className="bg-[#FAF5ED] rounded-xl border border-[#C8963E]/30 p-5 md:p-7 shadow-md mb-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#C8963E]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#C8963E] flex items-center justify-center p-1.5 shadow-sm">
            <CreatureSvg type={activeCreature.svgArtKey} className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#7A2E1D] text-[#F6EEE1] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="font-heading font-bold text-xl text-[#7A2E1D]">
                {guideName}
              </h2>
              <span className="text-xs bg-[#C8963E]/20 text-[#7A2E1D] border border-[#C8963E]/40 px-2 py-0.5 rounded font-semibold">
                {activeCreature.rarity}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#1F6E68] font-bold">
                <Globe className="w-3 h-3 text-[#1F6E68]" />
                {isAr ? 'مدعوم ببحث Google المباشر (Search Grounded)' : 'Google Search Grounding Live'}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded font-mono">
                gemini-3.5-flash
              </span>
            </div>
          </div>
        </div>

        {/* Satchel quick link */}
        <div className="flex items-center gap-2">
          {!activeBadge && (
            <button
              onClick={onOpenSatchel}
              className="text-xs bg-[#C8963E] hover:bg-[#b5832f] text-[#331C16] font-bold px-3 py-1.5 rounded shadow-sm transition cursor-pointer"
            >
              {t.chatOpenSatchelFirst}
            </button>
          )}
        </div>
      </div>

      {/* Grounding System Rules Notice */}
      <div className="mb-4 bg-stone-100/90 border-l-4 border-[#C8963E] p-2.5 rounded text-[11px] text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#7A2E1D] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
            G
          </div>
          <span>{t.chatGroundingBanner}</span>
        </div>
        <button
          onClick={onOpenAdmin}
          className="text-[#1F6E68] font-bold hover:underline shrink-0 text-[11px] cursor-pointer"
        >
          {t.chatViewSiteQueue}
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="bg-white rounded-xl border border-[#E8DCC9] shadow-inner p-4 min-h-[360px] max-h-[460px] overflow-y-auto space-y-4 mb-4">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                {msg.text}
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#FAF5ED] border border-[#C8963E] flex items-center justify-center text-sm shadow-xs shrink-0 mt-0.5">
                  {activeCreature.icon}
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#7A2E1D] text-[#F6EEE1] rounded-tr-xs'
                    : msg.isFallback
                    ? 'bg-amber-50/90 border border-amber-300 text-[#331C16] rounded-tl-xs'
                    : msg.isUnknown
                    ? 'bg-stone-100 border border-stone-300 text-stone-900 rounded-tl-xs'
                    : 'bg-[#FAF5ED] border border-[#E8DCC9] text-[#331C16] rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Google Search Queries Conducted */}
                {msg.searchQueries && msg.searchQueries.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#E8DCC9]/70 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-600">
                    <span className="font-semibold text-[#1F6E68] flex items-center gap-1">
                      <Search className="w-3 h-3 text-[#1F6E68]" />
                      {t.chatGoogleSearchFor}
                    </span>
                    {msg.searchQueries.map((q, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 border border-[#C8963E]/30 px-1.5 py-0.5 rounded text-[10px] text-stone-700 font-mono"
                      >
                        "{q}"
                      </span>
                    ))}
                  </div>
                )}

                {/* Google Search Grounding Citations & Web Links */}
                {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#E8DCC9]/70 space-y-1">
                    <div className="text-[11px] font-bold text-[#1F6E68] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#1F6E68]" />
                      {t.chatWebCitations}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.groundingUrls.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-emerald-50 border border-emerald-200/80 px-2 py-1 rounded text-[11px] text-[#1F6E68] flex items-center justify-between gap-1 transition shadow-2xs group"
                        >
                          <span className="truncate font-medium group-hover:underline">
                            {item.title || item.uri}
                          </span>
                          <ExternalLink className="w-3 h-3 shrink-0 text-emerald-600" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Verified Archaeological Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#E8DCC9]/70 flex flex-wrap items-center gap-1.5 text-[11px] text-[#7A2E1D]">
                    <span className="font-semibold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#C8963E]" />
                      {t.chatArchives}
                    </span>
                    {msg.sources.map((src, i) => (
                      <span
                        key={i}
                        className="bg-white/80 border border-[#C8963E]/30 px-1.5 py-0.5 rounded text-[10px] text-stone-700 font-medium"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                )}

                {/* Queue Tag if unknown */}
                {msg.queuedForReview && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>{t.chatQueuedAdmin}</span>
                  </div>
                )}

                {/* Bottom Actions: Copy, Speak, Timestamp */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-black/5 text-[10px] text-stone-400">
                  <div className="flex items-center gap-1.5">
                    {!isUser && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleToggleSpeak(msg.id, msg.text)}
                          title={isAr ? 'استمع للدليل الصوتي' : 'Listen to audio guide'}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition cursor-pointer ${
                            speakingMsgId === msg.id
                              ? 'bg-[#7A2E1D] text-[#F6EEE1] font-bold'
                              : 'hover:bg-stone-200/60 text-stone-600'
                          }`}
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-amber-300" />
                              <span className="text-[10px]">{isAr ? 'إيقاف' : 'Stop'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-[#7A2E1D]" />
                              <span className="text-[10px]">{isAr ? 'استماع 🔊' : 'Listen'}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          title={isAr ? 'نسخ الإجابة' : 'Copy answer'}
                          className="flex items-center gap-1 hover:bg-stone-200/60 text-stone-600 px-1.5 py-0.5 rounded transition cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-[10px] text-emerald-700 font-bold">{isAr ? 'تم النسخ' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-stone-500" />
                              <span className="text-[10px]">{isAr ? 'نسخ' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#7A2E1D] text-[#F6EEE1] flex items-center justify-center text-xs font-bold shadow-xs shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Bubble (hidden once the streamed answer starts appearing) */}
        {isLoading && !streamingMsgId && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#FAF5ED] border border-[#C8963E] flex items-center justify-center text-sm shadow-xs shrink-0">
              {activeCreature.icon}
            </div>
            <div className="bg-[#FAF5ED] border border-[#E8DCC9] rounded-2xl px-4 py-3 text-xs text-stone-600 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#7A2E1D]" />
              <span>
                {isAr
                  ? `${guideName} يتحقق من بحث Google والسجلات الأثرية النبطية...`
                  : `${guideName} is checking Google Search & Nabataean archives...`}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Queued Feedback Banner */}
      {queuedNotification && (
        <div className="mb-3 bg-amber-50 border border-amber-300 rounded-lg p-2.5 flex items-center justify-between text-xs text-amber-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{queuedNotification}</span>
          </div>
          <button
            onClick={onOpenAdmin}
            className="text-xs bg-[#7A2E1D] text-[#F6EEE1] px-2.5 py-1 rounded font-semibold shrink-0 hover:bg-[#612215] transition cursor-pointer"
          >
            {isAr ? 'افتح لوحة الإدارة لإجابة السؤال' : 'Answer in Admin'}
          </button>
        </div>
      )}

      {/* Inline Validation Warning */}
      {validationError && (
        <div className="mb-3 bg-red-50 border border-red-300 text-red-800 rounded-lg p-2 text-xs flex items-center gap-1.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Categorized Suggested Questions */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold text-[#7A2E1D] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
            {t.chatExploreWithGuide}
          </span>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto text-[10px]">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {t.chatTabAll}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('logistics')}
              className={`px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                activeTab === 'logistics'
                  ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {t.chatTabLogistics}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('monuments')}
              className={`px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                activeTab === 'monuments'
                  ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {t.chatTabMonuments}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('engineering')}
              className={`px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                activeTab === 'engineering'
                  ? 'bg-[#7A2E1D] text-[#F6EEE1]'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {t.chatTabHydraulics}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {filteredQueries.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => handleSendMessage(q.text)}
              disabled={isLoading}
              className="text-[11px] bg-white hover:bg-[#FAF5ED] text-[#331C16] border border-[#C8963E]/40 rounded-full px-3 py-1 transition flex items-center gap-1 shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#C8963E]" />
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form with Char Counter */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <input
            id="input-chat-question"
            type="text"
            value={inputQuestion}
            onChange={e => {
              setInputQuestion(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder={t.chatInputPlaceholder.replace('{guideName}', guideName)}
            disabled={isLoading}
            className="flex-1 bg-white border border-[#C8963E]/50 rounded-lg px-4 py-2.5 text-xs md:text-sm text-[#331C16] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7A2E1D] shadow-xs"
          />

          <button
            id="btn-chat-send"
            type="submit"
            disabled={isLoading || !inputQuestion.trim()}
            className="bg-[#7A2E1D] hover:bg-[#632416] text-[#F6EEE1] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-sm transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
          >
            <span>{t.chatAskBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#1F6E68]" />
            <span>{t.chatGroundingFooter}</span>
          </div>
          <span className={inputQuestion.length > 500 ? 'text-red-600 font-bold' : ''}>
            {inputQuestion.length} / 500
          </span>
        </div>
      </form>
    </div>
  );
};

