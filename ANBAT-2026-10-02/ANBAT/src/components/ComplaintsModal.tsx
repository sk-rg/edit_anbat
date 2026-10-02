/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, UserProfile, ComplaintTicket } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { storageService } from '../services/storageService';
import {
  FileText,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag,
  Mail,
  User,
  ShieldAlert,
  ListFilter
} from 'lucide-react';

interface ComplaintsModalProps {
  language: Language;
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintsModal: React.FC<ComplaintsModalProps> = ({
  language,
  currentUser,
  isOpen,
  onClose
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');

  // Form Fields
  const [fullName, setFullName] = useState<string>(
    currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''
  );
  const [email, setEmail] = useState<string>(currentUser ? currentUser.email : '');
  const [category, setCategory] = useState<string>(isAr ? 'نظافة ومرافق عامة' : 'Cleanliness & Facilities');
  const [subject, setSubject] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  // Status & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdTicket, setCreatedTicket] = useState<ComplaintTicket | null>(null);
  const [complaintsList, setComplaintsList] = useState<ComplaintTicket[]>(() =>
    storageService.getComplaints()
  );

  if (!isOpen) return null;

  const categories = isAr
    ? [
        'نظافة ومرافق عامة',
        'لوحات إرشادية وعلامات المسارات',
        'مواصلات ودواب وخيول',
        'دقة المعلومات والسرد الأثري',
        'خدمات الطعام والشراب والأسعار',
        'مقترح تطويري لتجربة الزوار',
        'أخرى'
      ]
    : [
        'Cleanliness & Facilities',
        'Trail Signage & Wayfinding',
        'Transportation & Animal Welfare',
        'Historical Information Accuracy',
        'Food & Beverage Services / Pricing',
        'Visitor Experience Suggestion',
        'Other'
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t.authRequiredFieldsError;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t.authInvalidEmailError;
    }
    if (!subject.trim()) {
      newErrors.subject = t.authRequiredFieldsError;
    }
    if (!details.trim() || details.trim().length < 10) {
      newErrors.details = isAr
        ? 'يرجى كتابة تفاصيل وافية عن الملاحظة (10 أحرف على الأقل).'
        : 'Please provide sufficient details (min 10 chars).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const ticket = storageService.addComplaint({
      fullName,
      email,
      category,
      subject,
      details
    });

    setCreatedTicket(ticket);
    setComplaintsList(storageService.getComplaints());
    setSubject('');
    setDetails('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF5ED] text-[#331C16] border border-[#C8963E]/40 rounded-2xl shadow-2xl w-full max-w-xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A2E1D] via-[#561E12] to-[#7A2E1D] text-[#F6EEE1] p-5 sm:p-6 border-b border-[#C8963E]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full hover:bg-white/10 text-[#E8DCC9] hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#C8963E] text-[#7A2E1D] flex items-center justify-center font-bold text-xl shadow-inner border border-white/30 shrink-0">
              <ShieldAlert className="w-6 h-6 text-[#7A2E1D]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F6EEE1]">
                {t.complaintsTitle}
              </h3>
              <p className="text-xs text-[#E8DCC9]/90 mt-0.5">{t.complaintsSubtitle}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setActiveTab('submit');
                setCreatedTicket(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'submit'
                  ? 'bg-[#C8963E] text-[#331C16]'
                  : 'bg-[#4A180E] text-[#E8DCC9] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isAr ? 'تقديم شكوى / مقترح جديد' : 'New Complaint'}</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-[#C8963E] text-[#331C16]'
                  : 'bg-[#4A180E] text-[#E8DCC9] hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>
                {isAr ? 'سجل الشكاوى والتذاكر' : 'Ticket History'} ({complaintsList.length})
              </span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto">
          {activeTab === 'submit' ? (
            createdTicket ? (
              /* Success Receipt View */
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-emerald-900">
                    {t.complaintsSuccessMsg}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    {isAr
                      ? 'تم تسجيل البلاغ وإحالته إلى قسم خدمة الزوار الميدانية للمتابعة والتحقق.'
                      : 'Your feedback was logged and routed to the Field Operations Desk for review.'}
                  </p>
                </div>

                <div className="bg-white border border-emerald-200 rounded-lg p-3 text-xs text-stone-700 inline-block">
                  <span className="text-stone-500 block mb-0.5">{t.complaintsTicketLabel}</span>
                  <span className="font-mono font-bold text-base text-[#7A2E1D]">
                    {createdTicket.ticketNumber}
                  </span>
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => setCreatedTicket(null)}
                    className="bg-[#1F6E68] text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-[#185853] transition cursor-pointer"
                  >
                    {isAr ? 'تقديم شكوى أخرى' : 'Submit Another'}
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-[#7A2E1D] text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-[#622316] transition cursor-pointer"
                  >
                    {t.complaintsCloseBtn}
                  </button>
                </div>
              </div>
            ) : (
              /* Submit Form */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#7A2E1D] mb-1">
                      {t.complaintsNameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder={isAr ? 'الاسم الثلاثي' : 'Full name'}
                        className={`w-full pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-2 bg-white border rounded-lg focus:outline-none transition ${
                          errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[10px] text-red-600 mt-0.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-[#7A2E1D] mb-1">
                      {t.complaintsEmailLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="visitor@example.com"
                        className={`w-full pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-2 bg-white border rounded-lg focus:outline-none transition ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-red-600 mt-0.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block font-bold text-[#7A2E1D] mb-1">
                    {t.complaintsCategoryLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-2 bg-white border border-stone-300 rounded-lg focus:border-[#C8963E] focus:outline-none cursor-pointer"
                    >
                      {categories.map((c, idx) => (
                        <option key={idx} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-bold text-[#7A2E1D] mb-1">
                    {t.complaintsSubjectLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder={
                      isAr
                        ? 'مثال: نقص لوحات المسافة بالقرب من مدخل الدير'
                        : 'e.g. Distance marker needed near Ad-Deir trail start'
                    }
                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none transition ${
                      errors.subject ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[10px] text-red-600 mt-0.5">{errors.subject}</p>
                  )}
                </div>

                {/* Details */}
                <div>
                  <label className="block font-bold text-[#7A2E1D] mb-1">
                    {t.complaintsDetailsLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder={
                      isAr
                        ? 'يرجى تزويدنا بالموقع بدقة، التوقيت، وأي ملاحظات تساعد فريق إدارة الموقع في التدقيق...'
                        : 'Please describe the location, time, and specific details to help our site rangers...'
                    }
                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none transition text-xs ${
                      errors.details ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#C8963E]'
                    }`}
                  />
                  {errors.details && (
                    <p className="text-[10px] text-red-600 mt-0.5">{errors.details}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#7A2E1D] hover:bg-[#622316] text-[#F6EEE1] font-bold py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C8963E]" />
                  <span>{t.complaintsSubmitBtn}</span>
                </button>
              </form>
            )
          ) : (
            /* Ticket History View */
            <div className="space-y-3">
              {complaintsList.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  {isAr ? 'لا توجد شكاوى مسجلة حالياً.' : 'No submitted complaints yet.'}
                </div>
              ) : (
                complaintsList.map(item => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#C8963E]/30 rounded-xl p-3.5 shadow-2xs space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-[#7A2E1D]">
                        {item.ticketNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'under_review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {item.status === 'resolved'
                          ? isAr
                            ? 'تمت المعالجة ✓'
                            : 'Resolved'
                          : item.status === 'under_review'
                          ? isAr
                            ? 'قيد التدقيق والمراجعة'
                            : 'Under Review'
                          : isAr
                            ? 'مستلمة'
                            : 'Submitted'}
                      </span>
                    </div>

                    <h5 className="font-bold text-stone-800">{item.subject}</h5>
                    <p className="text-stone-600 text-[11px] leading-relaxed">{item.details}</p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-stone-400 border-t border-stone-100">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString(
                          isAr ? 'ar-JO' : 'en-US'
                        )}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
