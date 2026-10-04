import React, { useState } from 'react';
import { StudentInfo, ExamResult } from '../types';
import { EXAM_DETAILS } from '../data/questions';
import { CprLogo } from './CprLogo';
import { BookOpen, CheckCircle2, AlertTriangle, Clock, Award, History, RotateCcw } from 'lucide-react';

interface RegistrationViewProps {
  onStart: (info: StudentInfo) => void;
  pastResults: ExamResult[];
  onViewPastResult: (result: ExamResult) => void;
  onClearHistory: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  onStart,
  pastResults,
  onViewPastResult,
  onClearHistory,
}) => {
  const [name, setName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [batch, setBatch] = useState('BCS SPECIAL BATCH-51');
  const [examMode, setExamMode] = useState<'timed' | 'practice'>('timed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart({
      name: name.trim(),
      registrationNo: registrationNo.trim(),
      roll: registrationNo.trim() || 'N/A',
      batch: batch.trim(),
      examMode,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Academy Banner Hero with Authentic CPR Medical Academy Logo */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-indigo-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Exact CPR Logo */}
          <div className="bg-white rounded-full p-1.5 shadow-2xl shadow-indigo-950/80 border-2 border-indigo-200 shrink-0">
            <CprLogo className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-semibold text-indigo-300 mb-2 sm:mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Examination Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1.5">
              CPR MEDICAL ACADEMY
            </h1>
            <p className="text-sm sm:text-base text-indigo-200 font-medium font-bangla mb-4">
              বিসিএস স্পেশাল ব্যাচ-৫১ : ইংরেজি ব্যাকরণ মূল্যায়ন পরীক্ষা
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-indigo-100/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>৫০টি প্রশ্ন (৫০ নম্বর)</span>
              </div>
              <span className="text-indigo-400 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>সময়: ৪৫ মিনিট</span>
              </div>
              <span className="text-indigo-400 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>ভুল উত্তরে: -০.৫ নেগেটিভ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-bangla">
                শিক্ষার্থী নিবন্ধন ও পরিচিতি
              </h2>
              <p className="text-xs text-slate-500 font-bangla mt-0.5">
                পরীক্ষা শুরু করতে আপনার নাম লিখুন। রেজিস্ট্রেশন নম্বর ঐচ্ছিক।
              </p>
            </div>
            <CprLogo className="w-11 h-11 hidden sm:block" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Full Name - Required */}
            <div>
              <label htmlFor="name-input" className="block text-sm font-semibold text-slate-800 font-bangla mb-1.5">
                শিক্ষার্থীর নাম (Student Full Name) <span className="text-rose-500">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Sharmin Akter"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition text-sm text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Registration No - OPTIONAL as requested */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="reg-input" className="block text-sm font-semibold text-slate-800 font-bangla">
                  রেজিস্ট্রেশন নম্বর (Registration No)
                </label>
                <span className="text-[11px] text-slate-400 font-bangla font-normal">
                  (ঐচ্ছিক / না থাকলে প্রয়োজন নেই)
                </span>
              </div>
              <input
                id="reg-input"
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder="রেজিস্ট্রেশন নম্বর না থাকলে খালি রাখুন (e.g. CPR-51042)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1 font-bangla">
                রেজিস্ট্রেশন নম্বর জানা না থাকলে বা না থাকলে এটি পূরণ না করেই পরীক্ষা শুরু করতে পারবেন।
              </p>
            </div>

            {/* Batch Name */}
            <div>
              <label htmlFor="batch-input" className="block text-sm font-semibold text-slate-800 font-bangla mb-1.5">
                ব্যাচ (Batch / Course)
              </label>
              <input
                id="batch-input"
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition text-sm text-slate-800 font-medium bg-slate-50"
              />
            </div>

            {/* Exam Mode Toggle */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-bangla">
                পরীক্ষার মোড নির্বাচন (Exam Mode)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExamMode('timed')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    examMode === 'timed'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>টাইমড এক্সাম (Timed)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-bangla">
                    ৪৫ মিনিট সময় ও অটো-সাবমিট
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setExamMode('practice')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    examMode === 'practice'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>অনুশীলন মোড (Practice)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-bangla">
                    সময়সীমা ছাড়া ধীরেসুস্থে অনুশীলন
                  </p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 hover:from-indigo-800 hover:to-black text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-900/30 transition duration-200 flex items-center justify-center gap-2 text-base font-bangla mt-6"
            >
              <span>পরীক্ষা শুরু করুন (Start Official Exam)</span>
              <Award className="w-5 h-5 text-indigo-200" />
            </button>
          </form>
        </div>

        {/* Right Column: Marking System & History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Rules Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>মূল্যায়ন ও নিয়মাবলী (Marking System)</span>
            </h3>

            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5 font-bangla leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  +1
                </span>
                <span>প্রতিটি সঠিক উত্তরের জন্য <strong>১.০ নম্বর</strong> পাবেন।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  -½
                </span>
                <span>
                  প্রতিটি ভুল উত্তরের জন্য <strong>০.৫ নম্বর</strong> কর্তন (Negative Marking) করা হবে।
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  0
                </span>
                <span>উত্তর না দিলে কোনো নেগেটিভ মার্কিং নেই।</span>
              </li>
            </ul>

            <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-900 font-medium">
              <p className="font-semibold mb-1">মার্কিং সূত্র (Marking Formula):</p>
              <div className="font-mono bg-white p-2 rounded-lg text-slate-800 border border-indigo-200 text-center text-xs">
                চূড়ান্ত প্রাপ্ত নম্বর = সঠিক MCQ - (ভুল MCQ × ০.৫)
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-bangla">
              সন্দেহ থাকলে উত্তর 'Clear' করতে পারবেন।
            </p>
          </div>

          {/* Past Attempts Card */}
          {pastResults.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-indigo-600" />
                  <span>পূর্ববর্তী পরীক্ষার রেকর্ড ({pastResults.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition"
                >
                  Clear History
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {pastResults.slice(0, 3).map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:border-indigo-300 transition"
                  >
                    <div>
                      <div className="font-bold text-slate-800">{res.student.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {res.student.registrationNo ? `Reg: ${res.student.registrationNo}` : 'No Reg ID'} · {new Date(res.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-sm text-indigo-600">
                        {res.finalScore.toFixed(2)} <span className="text-[10px] text-slate-400">/ 50</span>
                      </div>
                      <button
                        onClick={() => onViewPastResult(res)}
                        className="text-[11px] text-indigo-600 hover:underline font-semibold"
                      >
                        View Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
