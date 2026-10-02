/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Full-stack Express server for ANBAT – Your Nabataean Companion to Petra.
 * Proxies Gemini API calls with strict grounding in curated knowledge base
 * and serves Vite client.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { SOUVENIR_PRODUCTS } from './src/data/souvenirs';
import type { SouvenirOrder, SouvenirOrderLine, SouvenirOrderStatus } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123';

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Warning: GEMINI_API_KEY is not set in environment.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    app: 'ANBAT Petra Companion'
  });
});

// Builds the guide's system instruction and prompt (shared by /api/chat and /api/chat/stream)
function buildGuidePrompt(body: any):
  | { error: string }
  | {
      lang: 'ar' | 'en';
      hasLocalDocs: boolean;
      relevantDocs: any[];
      creatureName: string;
      systemInstruction: string;
      userPrompt: string;
    } {
  const { question, creatureName, creatureType, language, relevantDocs } = body || {};

  // Validation
  if (!question || typeof question !== 'string' || !question.trim()) {
    return { error: 'Question cannot be empty.' };
  }

  if (question.length > 500) {
    return { error: 'Question exceeds maximum limit of 500 characters.' };
  }

  const lang = language === 'ar' ? 'ar' : 'en';
  const hasLocalDocs = Array.isArray(relevantDocs) && relevantDocs.length > 0;

  // Prepare context block from retrieved knowledge entries if available
  const contextLines = hasLocalDocs
    ? relevantDocs.map((doc: any, idx: number) => {
        const title = lang === 'ar' ? (doc.titleAr || doc.titleEn) : doc.titleEn;
        const content = lang === 'ar' ? (doc.contentAr || doc.contentEn) : doc.contentEn;
        return `[VERIFIED PETRA ARCHIVE ${idx + 1}: ${title}]\n${content}`;
      }).join('\n\n')
    : '';

  // System prompt enforcing Nabataean guide persona, local archaeological grounding, and Google Search grounding
  const systemInstruction = lang === 'ar'
    ? `أنت ${creatureName || 'دليل نبطي'} (${creatureType || 'مخلوق نبطي'}). أنت تتحدث كدليل حكيم، فصيح وودود لزوار مدينة بترا الأثرية في الأردن.
دورك:
1. إذا توفرت سجلات أثرية موثقة في السياق (VERIFIED PETRA ARCHIVE)، اعتمد عليها كأولوية قصوى ودقيقة.
2. استخدم أداة بحث Google (Google Search) للتحقق من أحدث المعلومات الميدانية (مثل ساعات العمل، رسوم التذاكر، حالة الطقس، نصائح السفر، وآخر الاكتشافات الأثرية).
3. إذا سأل الزائر عن أمور تاريخية مستحيلة أو خيالية لا أصل لها (مثل القطارات البخارية في بترا أو أساطير لا أساس لها)، وضح بلطف وحكمة نفي ذلك تاريخياً.
4. إذا لم تجد إجابة دقيقة موثوقة في السجلات أو بحث Google، اذكر بصراحة أنك لا تعلم بعد وأن السؤال قد تم تحويله إلى إدارة الموقع للمراجعة.
5. اجعل أسلوبك عربياً جميلاً مفعماً بروح الصحراء النبطية وحسن الضيافة.`
    : `You are ${creatureName || 'a Nabataean guide'} (${creatureType || 'creature'}), a wise, friendly companion assisting visitors to the ancient rose-red city of Petra in Jordan.
Your mission:
1. If verified local records (VERIFIED PETRA ARCHIVE) are provided in context, treat them as your highest-fidelity authority.
2. Use Google Search grounding to retrieve accurate, up-to-date practical facts (opening hours, entry fees, weather, travel guidance, recent archaeological discoveries).
3. If asked about historical impossibilities or anachronisms, address them politely with factual historical clarity.
4. If an answer cannot be verified through either the records or Google Search, state that you do not know yet and that the inquiry has been forwarded to the Petra Site Management team.
5. Maintain an authentic, warm, and informative guide persona.`;

  const userPrompt = contextLines
    ? `VERIFIED CONTEXT:\n${contextLines}\n\nVISITOR QUESTION:\n${question}\n\nGUIDE RESPONSE:`
    : `VISITOR QUESTION:\n${question}\n\nGUIDE RESPONSE:`;

  return { lang, hasLocalDocs, relevantDocs, creatureName, systemInstruction, userPrompt };
}

// Grounded RAG + Google Search Grounded Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  const prompt = buildGuidePrompt(req.body);
  if ('error' in prompt) {
    return res.status(400).json({ error: prompt.error });
  }
  const { lang, hasLocalDocs, relevantDocs, creatureName, systemInstruction, userPrompt } = prompt;

  try {
    const ai = getAI();

    // Call gemini-3.5-flash with googleSearch tool for real-time grounded search
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.3
      }
    });

    const generatedText = response.text || '';

    // Extract Google Search grounding metadata & citations
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const webSources: { title?: string; uri: string }[] = [];

    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          webSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri
          });
        }
      }
    }

    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];

    // Check if the model expressed complete lack of knowledge
    const lower = generatedText.toLowerCase();
    const isUnknown =
      (lower.includes("don't know") ||
       lower.includes("do not know") ||
       lower.includes("sent to the site team") ||
       lower.includes("site team for review") ||
       generatedText.includes("لا أعلم") ||
       generatedText.includes("لا أملك إجابة") ||
       generatedText.includes("إلى فريق إدارة الموقع")) &&
      !hasLocalDocs &&
      webSources.length === 0;

    const sources = hasLocalDocs
      ? relevantDocs.map((d: any) => lang === 'ar' ? (d.titleAr || d.titleEn) : d.titleEn)
      : [];

    return res.json({
      text: generatedText,
      isUnknown,
      sources,
      groundingUrls: webSources,
      searchQueries,
      isFallback: false
    });

  } catch (error: any) {
    console.warn('Gemini 3.5 Flash Search Grounding call error:', error?.message || error);

    const is429 = error?.status === 429 ||
                  error?.message?.includes('429') ||
                  error?.message?.includes('RESOURCE_EXHAUSTED') ||
                  error?.message?.includes('quota') ||
                  error?.message?.includes('Quota');

    // If 429 Quota/Rate limit exceeded, fallback: retry without Search Grounding to reduce quota
    if (is429) {
      console.log('429 Quota/Rate limit encountered with Search Grounding. Retrying without search grounding...');
      try {
        const ai = getAI();
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.3
            // No tools: Search Grounding omitted to reduce quota consumption
          }
        });

        const fallbackGeneratedText = fallbackResponse.text || '';
        const lower = fallbackGeneratedText.toLowerCase();
        const isUnknown =
          (lower.includes("don't know") ||
           lower.includes("do not know") ||
           lower.includes("sent to the site team") ||
           lower.includes("site team for review") ||
           fallbackGeneratedText.includes("لا أعلم") ||
           fallbackGeneratedText.includes("لا أملك إجابة") ||
           fallbackGeneratedText.includes("إلى فريق إدارة الموقع")) &&
          !hasLocalDocs;

        const sources = hasLocalDocs
          ? relevantDocs.map((d: any) => lang === 'ar' ? (d.titleAr || d.titleEn) : d.titleEn)
          : [];

        return res.json({
          text: fallbackGeneratedText,
          isUnknown,
          sources,
          groundingUrls: [],
          searchQueries: [],
          isFallback: true
        });
      } catch (fallbackError: any) {
        console.warn('Fallback call without Search Grounding failed:', fallbackError?.message || fallbackError);

        const isStill429 = fallbackError?.status === 429 ||
                           fallbackError?.message?.includes('429') ||
                           fallbackError?.message?.includes('RESOURCE_EXHAUSTED') ||
                           fallbackError?.message?.includes('quota') ||
                           fallbackError?.message?.includes('Quota');

        if (isStill429) {
          const rateLimitMsg = lang === 'ar'
            ? 'تجاوزت حد الطلبات المسموح به مؤقتاً، يرجى المحاولة بعد قليل'
            : 'Temporary request rate limit exceeded, please try again shortly';

          return res.status(429).json({
            error: rateLimitMsg,
            message: rateLimitMsg,
            text: rateLimitMsg,
            isFallback: true
          });
        }
      }
    }

    // If non-429 or other error occurred, fallback gracefully to verified local records if available
    if (hasLocalDocs) {
      const topDoc = relevantDocs[0];
      const docTitle = lang === 'ar' ? topDoc.titleAr : topDoc.titleEn;
      const docContent = lang === 'ar' ? topDoc.contentAr : topDoc.contentEn;

      const responseText = lang === 'ar'
        ? `بصفتي ${creatureName || 'دليلك النبطي'}، يسعدني إجابتك من واقع السجلات النبطية المحققة:\n\n${docContent}\n\n📌 *المصدر: ${docTitle}*`
        : `As ${creatureName || 'your Nabataean guide'}, here is the verified archaeological record on this inquiry:\n\n${docContent}\n\n📌 *Source: ${docTitle}*`;

      return res.json({
        text: responseText,
        isUnknown: false,
        sources: [docTitle],
        groundingUrls: [],
        searchQueries: [],
        isFallback: true
      });
    }

    // If no local docs and API failed, apologize and queue for site team
    const unknownMessage = lang === 'ar'
      ? `أهلاً بك يا رحالة بترا، بصفتي ${creatureName || 'دليلك النبطي'}، أعتذر منك؛ فأنا لا أعلم بعد إجابة هذا السؤال من واقع السجلات المحققة لدينا. لقد أرسلت سؤالك تلقائياً إلى فريق إدارة الموقع في بترا للمراجعة والتدقيق!`
      : `Greetings traveler. As ${creatureName || 'your Nabataean guide'}, I don't know the answer to this question yet based on our verified archaeological records. Your question has been automatically sent to the Petra site team for review!`;

    return res.json({
      text: unknownMessage,
      isUnknown: true,
      sources: [],
      groundingUrls: [],
      searchQueries: [],
      isFallback: true
    });
  }
});

// Streaming version of /api/chat: sends the guide's answer piece by piece (NDJSON lines)
// so visitors see the first words almost immediately. Same prompt, model and tools as /api/chat.
// If Gemini fails before streaming starts, it answers with an error status and the client
// falls back to /api/chat, which keeps all the existing quota/offline fallbacks.
app.post('/api/chat/stream', async (req, res) => {
  const prompt = buildGuidePrompt(req.body);
  if ('error' in prompt) {
    return res.status(400).json({ error: prompt.error });
  }
  const { lang, hasLocalDocs, relevantDocs, systemInstruction, userPrompt } = prompt;

  try {
    const stream = await getAI().models.generateContentStream({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.3
      }
    });

    res.status(200);
    res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    let generatedText = '';
    const webSources: { title?: string; uri: string }[] = [];
    let searchQueries: string[] = [];

    for await (const chunk of stream) {
      const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
      for (const groundingChunk of groundingMetadata?.groundingChunks || []) {
        if (groundingChunk.web?.uri && !webSources.some(s => s.uri === groundingChunk.web!.uri)) {
          webSources.push({ title: groundingChunk.web.title || groundingChunk.web.uri, uri: groundingChunk.web.uri });
        }
      }
      if (groundingMetadata?.webSearchQueries?.length) {
        searchQueries = groundingMetadata.webSearchQueries;
      }

      const piece = chunk.text || '';
      if (piece) {
        generatedText += piece;
        res.write(JSON.stringify({ type: 'chunk', text: piece }) + '\n');
      }
    }

    // Same "unknown answer" rule as /api/chat
    const lower = generatedText.toLowerCase();
    const isUnknown =
      (lower.includes("don't know") ||
       lower.includes("do not know") ||
       lower.includes("sent to the site team") ||
       lower.includes("site team for review") ||
       generatedText.includes("لا أعلم") ||
       generatedText.includes("لا أملك إجابة") ||
       generatedText.includes("إلى فريق إدارة الموقع")) &&
      !hasLocalDocs &&
      webSources.length === 0;

    const sources = hasLocalDocs
      ? relevantDocs.map((d: any) => lang === 'ar' ? (d.titleAr || d.titleEn) : d.titleEn)
      : [];

    res.write(
      JSON.stringify({
        type: 'done',
        text: generatedText,
        isUnknown,
        sources,
        groundingUrls: webSources,
        searchQueries,
        isFallback: false
      }) + '\n'
    );
    res.end();
  } catch (error: any) {
    console.warn('Gemini streaming call error:', error?.message || error);
    if (!res.headersSent) {
      return res.status(502).json({ error: 'stream_failed' });
    }
    res.write(JSON.stringify({ type: 'error' }) + '\n');
    res.end();
  }
});

// ------------------------------------------------------------------
// Souvenir shop orders: stored on the server so site staff see them in the admin console
// ------------------------------------------------------------------
const ORDERS_FILE = path.join(process.cwd(), 'server-data', 'souvenir-orders.json');
const USD_TO_JOD = 0.71; // same rate the shop UI displays
const MAX_ITEM_QUANTITY = 50;

function loadSouvenirOrders(): SouvenirOrder[] {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

let souvenirOrders: SouvenirOrder[] = loadSouvenirOrders();

function saveSouvenirOrders() {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(souvenirOrders, null, 2));
}

function generateOrderCode(): string {
  // Unambiguous characters only (no 0/O, 1/I)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += alphabet[crypto.randomInt(alphabet.length)];
  }
  return `PT-${code}`;
}

function requireAdmin(req: express.Request, res: express.Response): boolean {
  if (req.get('x-admin-key') !== ADMIN_KEY) {
    res.status(401).json({ error: 'Admin authorization required.' });
    return false;
  }
  return true;
}

const cleanText = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

app.post('/api/souvenir-orders', (req, res) => {
  const { items, fulfillment, shipping, language } = req.body || {};

  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    return res.status(400).json({ error: 'Cart is empty or too large.' });
  }
  if (fulfillment !== 'pickup' && fulfillment !== 'shipping') {
    return res.status(400).json({ error: 'Invalid receiving method.' });
  }

  // Build order lines from the server catalog so prices cannot be tampered with
  const lines: SouvenirOrderLine[] = [];
  for (const raw of items) {
    const product = SOUVENIR_PRODUCTS.find(p => p.id === raw?.productId);
    const quantity = Number(raw?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return res.status(400).json({ error: 'Invalid item in cart.' });
    }
    lines.push({
      productId: product.id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      quantity,
      unitPriceUsd: product.priceUsd
    });
  }

  let shippingDetails: SouvenirOrder['shipping'];
  if (fulfillment === 'shipping') {
    shippingDetails = {
      name: cleanText(shipping?.name, 60),
      phone: cleanText(shipping?.phone, 20),
      city: cleanText(shipping?.city, 40),
      address: cleanText(shipping?.address, 200)
    };
    if (shippingDetails.name.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name.' });
    }
    if (!/^\+?[0-9\s-]{7,20}$/.test(shippingDetails.phone)) {
      return res.status(400).json({ error: 'Please enter a valid phone number.' });
    }
    if (shippingDetails.city.length < 2 || shippingDetails.address.length < 3) {
      return res.status(400).json({ error: 'Please enter the city and shipping address.' });
    }
  }

  const totalUsd = lines.reduce((sum, line) => sum + line.unitPriceUsd * line.quantity, 0);
  const now = new Date().toISOString();
  const order: SouvenirOrder = {
    id: crypto.randomUUID(),
    code: generateOrderCode(),
    items: lines,
    fulfillment,
    shipping: shippingDetails,
    totalUsd,
    totalJod: Math.round(totalUsd * USD_TO_JOD),
    status: 'new',
    language: language === 'ar' ? 'ar' : 'en',
    createdAt: now,
    updatedAt: now
  };

  souvenirOrders.unshift(order);
  saveSouvenirOrders();
  return res.status(201).json(order);
});

app.get('/api/souvenir-orders', (req, res) => {
  if (!requireAdmin(req, res)) return;
  res.json(souvenirOrders);
});

app.patch('/api/souvenir-orders/:id', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const status = req.body?.status as SouvenirOrderStatus;
  if (!['new', 'ready', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  const order = souvenirOrders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }
  order.status = status;
  order.updatedAt = new Date().toISOString();
  saveSouvenirOrders();
  res.json(order);
});

// Vite Middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ANBAT server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
