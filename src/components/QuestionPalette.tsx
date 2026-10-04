import React from 'react';
import { X, CheckCircle2, Bookmark, Circle } from 'lucide-react';

interface QuestionPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  userAnswers: Record<number, number>;
  markedForReview: number[];
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  currentQuestionIndex,
  onSelectQuestion,
  userAnswers,
  markedForReview,
}) => {
  if (!isOpen) return null;

  // Counts
  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = markedForReview.length;
  const answeredAndReviewCount = markedForReview.filter(id => userAnswers[id] !== undefined).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base sm:text-lg font-bangla">প্রশ্ন তালিকা (Question Palette)</h3>
              <p className="text-xs text-indigo-200 font-bangla">সকল ৫০টি প্রশ্নের স্থিতি ও সরাসরি নেভিগেশন</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close palette"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Legend */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block shadow-xs" />
              <span className="text-slate-700">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 inline-block shadow-xs" />
              <span className="text-slate-700">Marked for Review ({reviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-indigo-600 inline-block shadow-xs" />
              <span className="text-slate-700">Answered & Review ({answeredAndReviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300 inline-block shadow-xs" />
              <span className="text-slate-700">Unanswered ({unansweredCount})</span>
            </div>
          </div>

          {/* Grid of 50 Questions */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="grid grid-cols-5 gap-2.5">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const qNum = i + 1;
                const isAnswered = userAnswers[qNum] !== undefined;
                const isMarked = markedForReview.includes(qNum);
                const isCurrent = currentQuestionIndex === i;

                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-400';
                if (isAnswered && isMarked) {
                  btnStyle = 'bg-indigo-600 border-indigo-700 text-white font-bold ring-2 ring-amber-400 ring-offset-1';
                } else if (isAnswered) {
                  btnStyle = 'bg-emerald-600 border-emerald-700 text-white font-bold';
                } else if (isMarked) {
                  btnStyle = 'bg-amber-500 border-amber-600 text-white font-bold';
                }

                if (isCurrent) {
                  btnStyle += ' ring-2 ring-indigo-500 ring-offset-2 scale-105';
                }

                return (
                  <button
                    key={qNum}
                    type="button"
                    onClick={() => {
                      onSelectQuestion(i);
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById(`q-${qNum}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    }}
                    className={`h-11 rounded-xl border flex flex-col items-center justify-center text-xs font-semibold transition-all relative ${btnStyle}`}
                  >
                    <span>{qNum}</span>
                    {isMarked && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span className="font-bangla">ক্লিক করে নির্দিষ্ট প্রশ্নে যান</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition font-bangla"
            >
              চালিয়ে যান (Continue)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
