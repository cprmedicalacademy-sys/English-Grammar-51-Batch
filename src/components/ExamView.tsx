import React, { useState } from 'react';
import { Question } from '../data/questions';
import { StudentInfo } from '../types';
import { CprLogo } from './CprLogo';
import { 
  Bookmark, 
  RotateCcw, 
  CheckCircle, 
  Send
} from 'lucide-react';

interface ExamViewProps {
  questions: Question[];
  student: StudentInfo;
  userAnswers: Record<number, number>;
  markedForReview: number[];
  onAnswerChange: (questionId: number, optionIndex: number | null) => void;
  onToggleMarkForReview: (questionId: number) => void;
  onSubmitExam: () => void;
  onOpenPalette: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  questions,
  student,
  userAnswers,
  markedForReview,
  onAnswerChange,
  onToggleMarkForReview,
  onSubmitExam,
  onOpenPalette,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const totalQ = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQ - answeredCount;
  const reviewCount = markedForReview.length;

  // Helper to render question text with formatted underline if available
  const renderQuestionText = (q: Question) => {
    if (!q.underlinedPart) {
      return <span>{q.question}</span>;
    }

    const parts = q.question.split(q.underlinedPart);
    if (parts.length === 2) {
      return (
        <span>
          {parts[0]}
          <span className="underline decoration-indigo-600 decoration-2 underline-offset-4 font-bold text-indigo-950 bg-indigo-50/70 px-1 py-0.5 rounded">
            {q.underlinedPart}
          </span>
          {parts[1]}
        </span>
      );
    }
    return <span>{q.question}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Candidate Status Strip */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="bg-slate-50 p-1 rounded-full border border-slate-200 shrink-0">
            <CprLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-slate-600">
            <div>
              <span className="text-slate-400 font-bangla mr-1">পরীক্ষার্থী:</span>
              <span className="font-bold text-slate-900">{student.name}</span>
            </div>
            {student.registrationNo ? (
              <>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div>
                  <span className="text-slate-400 mr-1">Reg No:</span>
                  <span className="font-bold font-mono text-indigo-700">{student.registrationNo}</span>
                </div>
              </>
            ) : null}
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="text-slate-400 font-bangla mr-1">ব্যাচ:</span>
              <span className="font-medium text-slate-800">{student.batch || 'BCS Special 51'}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPalette}
            className="px-3.5 py-2 rounded-xl border border-indigo-200 hover:border-indigo-400 bg-indigo-50/70 text-indigo-900 text-xs font-semibold flex items-center gap-2 transition shadow-xs"
          >
            <span className="font-bangla">প্রশ্ন তালিকা</span>
            <span className="bg-indigo-600 text-white rounded-md px-1.5 py-0.5 text-[11px] font-mono font-bold">
              {answeredCount}/50
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 font-bangla"
          >
            <Send className="w-3.5 h-3.5" />
            <span>জমা দিন</span>
          </button>
        </div>
      </div>

      {/* Information Header Banner */}
      <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <span className="font-bangla text-slate-700">
          আপনি এক নজরে সকল ৫০টি প্রশ্ন দেখছেন। যেকোনো অপশন ক্লিক করে সরাসরি উত্তর দিন অথবা ভুল এড়াতে উত্তর মুছুন।
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-bangla">উত্তর সম্পন্ন:</span>
          <span className="font-bold bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 font-mono text-xs shadow-2xs">
            {answeredCount} / 50
          </span>
        </div>
      </div>

      {/* ALL 50 QUESTIONS CONTINUOUS VIEW */}
      <div className="space-y-5">
        {questions.map((q) => {
          const isSelected = userAnswers[q.id] !== undefined;
          const isMarked = markedForReview.includes(q.id);

          return (
            <div
              key={q.id}
              id={`q-${q.id}`}
              className={`bg-white rounded-2xl shadow-sm border p-5 sm:p-6 transition-all scroll-mt-24 ${
                isMarked
                  ? 'border-amber-300 ring-2 ring-amber-100/80'
                  : isSelected
                  ? 'border-indigo-200/80 bg-slate-50/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Top Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {q.id}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {q.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onToggleMarkForReview(q.id)}
                    className={`p-1.5 rounded-lg border text-xs transition flex items-center gap-1 ${
                      isMarked
                        ? 'bg-amber-50 border-amber-300 text-amber-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title={isMarked ? "Marked for review" : "Mark for review"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-500 text-amber-600' : ''}`} />
                    <span className="hidden sm:inline text-[11px]">Review</span>
                  </button>

                  {isSelected && (
                    <button
                      type="button"
                      onClick={() => onAnswerChange(q.id, null)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 text-[11px] font-bangla transition flex items-center gap-1"
                      title="Clear answer to avoid negative marking"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>মুছুন</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-base sm:text-lg font-serif text-slate-900 leading-relaxed mb-4">
                {renderQuestionText(q)}
              </p>

              {/* Options Grid (2 columns on sm+ screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const active = userAnswers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => onAnswerChange(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-serif transition flex items-center justify-between cursor-pointer ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/70 font-semibold text-indigo-950 shadow-xs ring-1 ring-indigo-500/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            active
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {active && (
                        <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Area */}
      <div className="pt-6 pb-12 text-center space-y-3">
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all text-base font-bangla inline-flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span>পরীক্ষা সম্পন্ন ও জমা দিন (Submit Exam)</span>
        </button>
        <p className="text-xs text-slate-500 font-bangla">
          মোট প্রশ্ন: ৫০টি | উত্তর প্রদান করেছেন: {answeredCount}টি | বাকি: {unansweredCount}টি
        </p>
      </div>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-bangla">
                  পরীক্ষা জমা নিশ্চিতকরণ
                </h4>
                <p className="text-xs text-slate-500">BCS Special Batch 51 · English Grammar</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bangla">মোট প্রশ্ন:</span>
                <span className="font-bold text-slate-900">৫০টি</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-emerald-700">
                <span className="font-bangla">উত্তর প্রদান করেছেন:</span>
                <span className="font-bold">{answeredCount} টি</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-amber-700">
                <span className="font-bangla">উত্তর বাকি রয়েছে:</span>
                <span className="font-bold">{unansweredCount} টি</span>
              </div>
              {reviewCount > 0 && (
                <div className="flex justify-between py-1 text-indigo-700">
                  <span className="font-bangla">পুনর্বিবেচনার জন্য চিহ্নিত:</span>
                  <span className="font-bold">{reviewCount} টি</span>
                </div>
              )}
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-bangla leading-relaxed">
                <strong>মনোযোগ দিন:</strong> উত্তর না করা প্রশ্নের জন্য কোনো নেতিবাচক নম্বর কাটা হবে না। তবে ভুল উত্তরের জন্য ০.৫ নম্বর কর্তন করা হবে।
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition font-bangla"
              >
                ফিরে যান (Continue)
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  onSubmitExam();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition font-bangla"
              >
                হ্যাঁ, জমা দিন (Submit)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
