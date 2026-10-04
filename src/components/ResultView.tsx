import React from 'react';
import { ExamResult } from '../types';
import { Question } from '../data/questions';
import { CprLogo } from './CprLogo';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Clock, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  FileText,
  TrendingUp,
  Percent
} from 'lucide-react';

interface ResultViewProps {
  result: ExamResult;
  questions: Question[];
  onReview: () => void;
  onRetake: () => void;
  onShowAnswerKey: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  questions,
  onReview,
  onRetake,
  onShowAnswerKey,
}) => {
  const {
    student,
    finalScore,
    correctCount,
    incorrectCount,
    unattemptedCount,
    negativeMarks,
    percentage,
    timeSpentSeconds,
    date,
  } = result;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}m ${remainderSecs}s`;
  };

  // Performance status
  let statusText = '';
  let statusBadgeColor = '';
  if (finalScore >= 35) {
    statusText = 'অসাধারণ ফলাফল (Outstanding / Merit Rank)';
    statusBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (finalScore >= 25) {
    statusText = 'উত্তীর্ণ (Qualified / Pass Mark)';
    statusBadgeColor = 'text-indigo-700 bg-indigo-50 border-indigo-300';
  } else {
    statusText = 'পুনরায় অনুশীলন প্রয়োজন (Needs Revision)';
    statusBadgeColor = 'text-amber-700 bg-amber-50 border-amber-300';
  }

  // Calculate category breakdown
  const categoryStats: Record<string, { total: number; correct: number; wrong: number }> = {};
  questions.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { total: 0, correct: 0, wrong: 0 };
    }
    categoryStats[q.category].total += 1;
    const ans = result.userAnswers[q.id];
    if (ans !== undefined) {
      if (ans === q.correctAnswer) {
        categoryStats[q.category].correct += 1;
      } else {
        categoryStats[q.category].wrong += 1;
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Official Scorecard Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden print:border-none print:shadow-none">
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-1 shadow-lg shrink-0">
                <CprLogo className="w-14 h-14 sm:w-16 sm:h-16" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                  CPR MEDICAL ACADEMY
                </h2>
                <p className="text-xs sm:text-sm text-indigo-200 font-bangla">
                  BCS SPECIAL BATCH-51 · ইংরেজি ব্যাকরণ মূল্যায়ন পরীক্ষার ফলাফল
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Candidate Information Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 font-bangla block text-xs">শিক্ষার্থীর নাম</span>
            <span className="font-bold text-slate-900 text-sm sm:text-base">{student.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">রেজিস্ট্রেশন নম্বর</span>
            <span className="font-bold font-mono text-indigo-700 text-sm sm:text-base">
              {student.registrationNo || 'N/A (প্রযোজ্য নয়)'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bangla block text-xs">ব্যয়িত সময়</span>
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(timeSpentSeconds)}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bangla block text-xs">তারিখ</span>
            <span className="font-semibold text-slate-700">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Main Final Score Display */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="text-center max-w-lg mx-auto bg-gradient-to-b from-indigo-50/60 to-white p-6 sm:p-8 rounded-3xl border border-indigo-100">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 block mb-1">
              Final Calculated Score / চূড়ান্ত প্রাপ্ত ফলাফল
            </span>
            <div className="text-5xl sm:text-6xl font-black text-indigo-950 font-serif tracking-tight my-2">
              {finalScore.toFixed(2)}
              <span className="text-xl sm:text-2xl text-slate-400 font-normal font-sans ml-1">/ 50.00</span>
            </div>

            <div className="inline-block mt-3 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold font-bangla shadow-xs" style={{ borderColor: 'currentColor' }}>
              <span className={statusBadgeColor}>{statusText}</span>
            </div>

            <p className="text-xs text-slate-500 font-bangla mt-3">
              [সঠিক MCQ সংখ্যা {correctCount} - (ভুল MCQ সংখ্যা {incorrectCount} × ০.৫) = {finalScore.toFixed(2)}]
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Correct */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center mb-1 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-serif">
                {correctCount}
              </div>
              <span className="text-xs font-semibold text-emerald-700 font-bangla block mt-0.5">
                সঠিক উত্তর (+{correctCount}.0)
              </span>
            </div>

            {/* Incorrect */}
            <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center mb-1 text-rose-600">
                <XCircle className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-800 font-serif">
                {incorrectCount}
              </div>
              <span className="text-xs font-semibold text-rose-700 font-bangla block mt-0.5">
                ভুল উত্তর (-{negativeMarks.toFixed(1)})
              </span>
            </div>

            {/* Unattempted */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center mb-1 text-slate-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-serif">
                {unattemptedCount}
              </div>
              <span className="text-xs font-semibold text-slate-600 font-bangla block mt-0.5">
                উত্তরহীন (০ নম্বর)
              </span>
            </div>

            {/* Accuracy */}
            <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center mb-1 text-indigo-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-900 font-serif">
                {percentage.toFixed(1)}%
              </div>
              <span className="text-xs font-semibold text-indigo-700 font-bangla block mt-0.5">
                নির্ভুলতার হার (Accuracy)
              </span>
            </div>
          </div>

          {/* Subject Category Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50/50 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>টপিকভিত্তিক দক্ষতা বিশ্লেষণ (Topic Breakdown)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(categoryStats).map(([cat, stat]) => {
                const catAccuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return (
                  <div key={cat} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{cat}</span>
                      <span className="text-indigo-600">{stat.correct}/{stat.total} ({catAccuracy}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${catAccuracy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 no-print">
            <button
              type="button"
              onClick={onReview}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 font-bangla"
            >
              <BookOpen className="w-4 h-4" />
              <span>উত্তরপত্র ও ব্যাখ্যা দেখুন (Review & Solutions)</span>
            </button>

            <button
              type="button"
              onClick={onShowAnswerKey}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Official Answer Key (1-50)</span>
            </button>

            <button
              type="button"
              onClick={onRetake}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition flex items-center justify-center gap-2 font-bangla"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>পুনরায় পরীক্ষা দিন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
