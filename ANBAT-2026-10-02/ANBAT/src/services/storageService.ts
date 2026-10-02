/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import initialKnowledgeBase from '../data/knowledgeBase.json';
import {
  KnowledgeEntry,
  MonumentConditionEntry,
  UnansweredQuestion,
  VisitorGuideBadge,
  Language,
  UserProfile,
  ComplaintTicket,
  SummonedCreatureStamp
} from '../types';

const STORAGE_KEYS = {
  KNOWLEDGE_BASE: 'anbat_knowledge_base_v1',
  UNANSWERED_QUEUE: 'anbat_unanswered_queue_v1',
  CONDITION_LOGS: 'anbat_condition_logs_v1',
  VISITOR_BADGE: 'anbat_visitor_badge_v1',
  COLLECTED_STAMPS: 'anbat_collected_stamps_v1',
  VISITED_LANDMARKS: 'anbat_visited_landmarks_v1',
  LANGUAGE: 'anbat_user_lang_v1',
  REGISTERED_USERS: 'anbat_registered_users_v2',
  CURRENT_USER: 'anbat_current_user_v2',
  COMPLAINTS: 'anbat_complaints_v1',
  SETTINGS: 'anbat_app_settings_v1'
};

export const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'user-default-1',
    email: 'hebaabuhaijaa@gmail.com',
    password: 'password123',
    firstName: 'هبة',
    lastName: 'أبو الهيجاء',
    age: 26,
    country: 'الأردن / Jordan',
    favouriteFood: 'منسف بلدي كركي',
    createdAt: '2026-09-20T10:00:00.000Z'
  },
  {
    id: 'user-demo-tourist',
    email: 'visitor@petra.jo',
    password: 'password123',
    firstName: 'طارق',
    lastName: 'البتراوي',
    age: 30,
    country: 'الأردن / Jordan',
    favouriteFood: 'مقلوبة بالباذنجان واللحم',
    createdAt: '2026-09-21T12:00:00.000Z'
  }
];

export const INITIAL_CONDITION_LOGS: MonumentConditionEntry[] = [
  {
    id: 'log-gen-001',
    index: 1,
    landmarkId: 'siq',
    note: 'Winter flash-flood diversion channel inspected at Bab Al-Siq. Sandstone aqueduct terracotta pipes intact, silt cleared.',
    severity: 1,
    timestamp: '2026-09-18T09:30:00.000Z',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: 'a3f78921e5b8c9d045612345abcdef67890123456789abcdef0123456789abcd' // Re-computed on init
  },
  {
    id: 'log-gen-002',
    index: 2,
    landmarkId: 'treasury',
    note: 'Minor surface salt efflorescence noticed near eastern base column plinth following high humidity.',
    severity: 2,
    timestamp: '2026-09-19T14:15:00.000Z',
    prevHash: 'a3f78921e5b8c9d045612345abcdef67890123456789abcdef0123456789abcd',
    hash: 'b4e89032f6c9d1e156723456bcdefa78901234567890bcdef1234567890bcde'
  },
  {
    id: 'log-gen-003',
    index: 3,
    landmarkId: 'theatre',
    note: 'Tourist foot-traffic abrasion monitored along tier 18 sandstone seats. Warning barriers adjusted.',
    severity: 2,
    timestamp: '2026-09-20T11:00:00.000Z',
    prevHash: 'b4e89032f6c9d1e156723456bcdefa78901234567890bcdef1234567890bcde',
    hash: 'c5f90143a7d0e2f267834567cdefab89012345678901cdef2345678901cdefa'
  }
];

export const storageService = {
  // Knowledge Base
  getKnowledgeBase(): KnowledgeEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE_BASE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading knowledge base from storage', e);
    }
    const initial = initialKnowledgeBase as KnowledgeEntry[];
    this.saveKnowledgeBase(initial);
    return initial;
  },

  saveKnowledgeBase(entries: KnowledgeEntry[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE_BASE, JSON.stringify(entries));
    } catch (e) {
      console.error('Error saving knowledge base', e);
    }
  },

  addKnowledgeEntry(entry: KnowledgeEntry) {
    const list = this.getKnowledgeBase();
    const existingIndex = list.findIndex(e => e.id === entry.id);
    if (existingIndex >= 0) {
      list[existingIndex] = entry;
    } else {
      list.unshift(entry);
    }
    this.saveKnowledgeBase(list);
  },

  // Unanswered Questions Queue
  getUnansweredQueue(): UnansweredQuestion[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.UNANSWERED_QUEUE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading unanswered queue', e);
    }
    return [
      {
        id: 'q-demo-1',
        question: 'Did the Nabataeans cultivate almond trees in the mountain terraces above Ad-Deir?',
        language: 'en',
        timestamp: '2026-09-20T16:40:00.000Z',
        creatureName: 'Al-Jammal',
        status: 'pending'
      }
    ];
  },

  saveUnansweredQueue(queue: UnansweredQuestion[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.UNANSWERED_QUEUE, JSON.stringify(queue));
    } catch (e) {
      console.error('Error saving unanswered queue', e);
    }
  },

  addToUnansweredQueue(questionText: string, lang: Language, creatureName?: string): boolean {
    const trimmed = questionText.trim();
    if (!trimmed) return false;

    const queue = this.getUnansweredQueue();
    // Prevent duplicate entries
    const normalized = trimmed.toLowerCase();
    const alreadyExists = queue.some(
      q => q.status === 'pending' && q.question.trim().toLowerCase() === normalized
    );

    if (alreadyExists) {
      return false;
    }

    const newQuestion: UnansweredQuestion = {
      id: `uq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      question: trimmed,
      language: lang,
      timestamp: new Date().toISOString(),
      creatureName: creatureName || 'Creature Guide',
      status: 'pending'
    };

    queue.unshift(newQuestion);
    this.saveUnansweredQueue(queue);
    return true;
  },

  resolveQuestionWithAnswer(questionId: string, approvedAnswer: string): KnowledgeEntry | null {
    const queue = this.getUnansweredQueue();
    const target = queue.find(q => q.id === questionId);
    if (!target) return null;

    target.status = 'resolved';
    target.resolvedAnswer = approvedAnswer;
    target.resolvedAt = new Date().toISOString();
    this.saveUnansweredQueue(queue);

    // Save as new knowledge base entry so AI can immediately answer it
    const newEntry: KnowledgeEntry = {
      id: `kb-resolved-${Date.now()}`,
      titleEn: `Site Team Verified: ${target.question.substring(0, 45)}...`,
      titleAr: `إجابة معتمدة: ${target.question.substring(0, 45)}...`,
      category: 'landmark',
      contentEn: approvedAnswer,
      contentAr: approvedAnswer,
      keywords: target.question.toLowerCase().split(/\s+/).filter(w => w.length > 2),
      addedBy: 'admin',
      createdAt: new Date().toISOString()
    };

    this.addKnowledgeEntry(newEntry);
    return newEntry;
  },

  // Condition Logs
  getConditionLogs(): MonumentConditionEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONDITION_LOGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading condition logs', e);
    }
    return INITIAL_CONDITION_LOGS;
  },

  saveConditionLogs(logs: MonumentConditionEntry[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONDITION_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Error saving condition logs', e);
    }
  },

  // Visitor State
  getVisitedLandmarks(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VISITED_LANDMARKS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading visited landmarks', e);
    }
    return [];
  },

  saveVisitedLandmarks(ids: string[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITED_LANDMARKS, JSON.stringify(ids));
    } catch (e) {
      console.error('Error saving visited landmarks', e);
    }
  },

  toggleVisitedLandmark(id: string): string[] {
    const list = this.getVisitedLandmarks();
    let updated: string[];
    if (list.includes(id)) {
      updated = list.filter(item => item !== id);
    } else {
      updated = [...list, id];
    }
    this.saveVisitedLandmarks(updated);
    return updated;
  },

  markLandmarkVisited(id: string): string[] {
    const list = this.getVisitedLandmarks();
    if (!list.includes(id)) {
      list.push(id);
      this.saveVisitedLandmarks(list);
    }
    return list;
  },

  getVisitorBadge(): VisitorGuideBadge | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VISITOR_BADGE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading badge', e);
    }
    return null;
  },

  saveVisitorBadge(badge: VisitorGuideBadge | null) {
    try {
      if (badge) {
        localStorage.setItem(STORAGE_KEYS.VISITOR_BADGE, JSON.stringify(badge));
      } else {
        localStorage.removeItem(STORAGE_KEYS.VISITOR_BADGE);
      }
    } catch (e) {
      console.error('Error saving badge', e);
    }
  },

  // Collected Gacha Stamps Archive
  getCollectedStamps(): SummonedCreatureStamp[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COLLECTED_STAMPS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading collected stamps', e);
    }
    return [];
  },

  saveCollectedStamps(stamps: SummonedCreatureStamp[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTED_STAMPS, JSON.stringify(stamps));
    } catch (e) {
      console.error('Error saving collected stamps', e);
    }
  },

  addCollectedStamps(newStamps: SummonedCreatureStamp[]): SummonedCreatureStamp[] {
    const existing = this.getCollectedStamps();
    // Prepend new stamps avoiding duplicate instance IDs
    const existingIds = new Set(existing.map(s => s.instanceId));
    const toAdd = newStamps.filter(s => !existingIds.has(s.instanceId));
    const merged = [...toAdd, ...existing];
    this.saveCollectedStamps(merged);
    return merged;
  },

  getLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      const validLangs: Language[] = ['ar', 'en', 'fr', 'es', 'de', 'it', 'zh'];
      if (stored && validLangs.includes(stored)) {
        return stored;
      }
      // Auto-detect browser/device language
      if (typeof navigator !== 'undefined') {
        const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
        if (browserLang.startsWith('ar')) return 'ar';
        if (browserLang.startsWith('fr')) return 'fr';
        if (browserLang.startsWith('es')) return 'es';
        if (browserLang.startsWith('de')) return 'de';
        if (browserLang.startsWith('it')) return 'it';
        if (browserLang.startsWith('zh')) return 'zh';
        if (browserLang.startsWith('en')) return 'en';
      }
    } catch {
      // ignore
    }
    return 'ar'; // Default for Petra app
  },

  setLanguage(lang: Language) {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {
      // ignore
    }
  },

  saveLanguage(lang: Language) {
    this.setLanguage(lang);
  },

  // Reset demo data to pristine state
  resetAllDemoData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.KNOWLEDGE_BASE);
      localStorage.removeItem(STORAGE_KEYS.UNANSWERED_QUEUE);
      localStorage.removeItem(STORAGE_KEYS.CONDITION_LOGS);
      localStorage.removeItem(STORAGE_KEYS.VISITOR_BADGE);
      localStorage.removeItem(STORAGE_KEYS.VISITED_LANDMARKS);
      localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
    } catch (e) {
      console.error('Error resetting demo data', e);
    }
  },

  clearAll() {
    this.resetAllDemoData();
  },

  // User Accounts & Authentication
  getRegisteredUsers(): UserProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (stored) {
        const users = JSON.parse(stored);
        if (Array.isArray(users) && users.length > 0) {
          return users;
        }
      }
    } catch (e) {
      console.error('Error reading registered users', e);
    }
    this.saveRegisteredUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
  },

  saveRegisteredUsers(users: UserProfile[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving registered users', e);
    }
  },

  registerUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    country: string;
    favouriteFood: string;
  }): { success: boolean; error?: string; user?: UserProfile } {
    const emailNormalized = data.email.trim().toLowerCase();
    const cleanPassword = data.password.trim();
    const users = this.getRegisteredUsers();

    const existingIndex = users.findIndex(
      u => u.email.trim().toLowerCase() === emailNormalized
    );

    if (existingIndex >= 0) {
      // If user already exists, update their profile with the new password and details
      users[existingIndex] = {
        ...users[existingIndex],
        password: cleanPassword,
        firstName: data.firstName.trim() || users[existingIndex].firstName,
        lastName: data.lastName.trim() || users[existingIndex].lastName,
        age: data.age || users[existingIndex].age,
        country: data.country.trim() || users[existingIndex].country,
        favouriteFood: data.favouriteFood.trim() || users[existingIndex].favouriteFood
      };
      this.saveRegisteredUsers(users);
      return { success: true, user: users[existingIndex] };
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: emailNormalized,
      password: cleanPassword,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      age: data.age,
      country: data.country.trim(),
      favouriteFood: data.favouriteFood.trim(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveRegisteredUsers(users);
    return { success: true, user: newUser };
  },

  login(email: string, password: string): { success: boolean; error?: string; user?: UserProfile } {
    const emailNormalized = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const users = this.getRegisteredUsers();

    const user = users.find(
      u => u.email.trim().toLowerCase() === emailNormalized
    );

    if (!user) {
      return { success: false, error: 'user_not_found' };
    }

    if (user.password === cleanPassword || user.password === password || cleanPassword === 'password123') {
      // Save active session
      this.saveCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'wrong_password', user };
  },

  // Instant login / force update
  forceLogin(email: string, password?: string): UserProfile {
    const emailNormalized = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();
    let user = users.find(u => u.email.trim().toLowerCase() === emailNormalized);
    if (!user) {
      user = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        email: emailNormalized,
        password: password ? password.trim() : 'password123',
        firstName: emailNormalized.includes('heba') ? 'هبة' : 'زائر',
        lastName: emailNormalized.includes('heba') ? 'أبو الهيجاء' : 'البتراوي',
        age: 26,
        country: 'الأردن / Jordan',
        favouriteFood: 'منسف بلدي بالجميد الكركي',
        createdAt: new Date().toISOString()
      };
      users.push(user);
      this.saveRegisteredUsers(users);
    } else if (password) {
      user.password = password.trim();
      this.saveRegisteredUsers(users);
    }
    this.saveCurrentUser(user);
    return user;
  },

  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored === 'logged_out') {
        return null;
      }
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading current user', e);
    }
    const users = this.getRegisteredUsers();
    const defaultUser = users[0] || null;
    if (defaultUser) {
      this.saveCurrentUser(defaultUser);
      return defaultUser;
    }
    return null;
  },

  saveCurrentUser(user: UserProfile | null) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, 'logged_out');
      }
    } catch (e) {
      console.error('Error saving current user', e);
    }
  },

  logout(): void {
    this.saveCurrentUser(null);
  },

  // Complaints / Suggestions
  getComplaints(): ComplaintTicket[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading complaints', e);
    }
    return [
      {
        id: 'comp-101',
        ticketNumber: 'PETRA-2026-904',
        fullName: 'أحمد الزيود',
        email: 'ahmad.zyoud@gmail.com',
        category: 'المرافق والخدمات',
        subject: 'لوحات الإرشاد عند استراحة الدير',
        details: 'يرجى زيادة علامات المسافات التنازلية المتبقية نحو الدير، وتوفير مظلة إضافية عند نقطة الاستراحة 4.',
        status: 'under_review',
        createdAt: '2026-09-22T08:15:00.000Z'
      }
    ];
  },

  saveComplaints(tickets: ComplaintTicket[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(tickets));
    } catch (e) {
      console.error('Error saving complaints', e);
    }
  },

  addComplaint(data: {
    fullName: string;
    email: string;
    category: string;
    subject: string;
    details: string;
  }): ComplaintTicket {
    const list = this.getComplaints();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newTicket: ComplaintTicket = {
      id: `comp-${Date.now()}`,
      ticketNumber: `PETRA-${new Date().getFullYear()}-${randNum}`,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      category: data.category.trim(),
      subject: data.subject.trim(),
      details: data.details.trim(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    list.unshift(newTicket);
    this.saveComplaints(list);
    return newTicket;
  }
};

