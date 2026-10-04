import React, { useState } from 'react';
import { Question } from '../data/questions';
import { ExamResult } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  Bookmark, 
  FileText, 
  Info,
  Filter
} from 'lucide-react';

interface ReviewViewProps {
  questions: Question[];
  result: ExamResult;
  onBackToScorecard: () => void;
  onShowAnswerKey: () => void;
}

type FilterType = 'all' | 'incorrect' | 'correct' | 'unattempted' | 'review';

export const ReviewView: React.FC<ReviewViewProps> = ({
  questions,
  result,
  onBackToScorecard,
  onShowAnswerKey,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { userAnswers, markedForReview } = result;

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const userAns = userAnswers[q.id];
    const isAnswered = userAns !== undefined;
    const isCorrect = isAnswered && userAns === q.correctAnswer;
    const isMarked = markedForReview.includes(q.id);

    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'incorrect' && (!isAnswered || isCorrect)) return false;
    if (filter === 'unattempted' && isAnswered) return false;
    if (filter === 'review' && !isMarked) return false;

    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;

    return true;
  });

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  // Helper to render question text with formatted underline
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header & Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBackToScorecard}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
            title="Back to Scorecard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-bangla">
              উত্তরপত্র পর্যালোচনা ও বিস্তারিত সমাধান
            </h2>
            <p className="text-xs text-slate-500">
              BCS Special Batch 51 · English Grammar Review ({filteredQuestions.length} of {questions.length} shown)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onShowAnswerKey}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Answer Key (Page 3)</span>
          </button>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>ফিল্টার (Filter by status):</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="category-select" className="text-xs text-slate-500 font-bangla">বিষয়:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">সকল টপিক (All Topics)</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল প্রশ্ন ({questions.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>ভুল উত্তর ({result.incorrectCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>সঠিক উত্তর ({result.correctCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('unattempted')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
              filter === 'unattempted'
                ? 'bg-slate-700 text-white font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>উত্তরহীন ({result.unattemptedCount})</span>
          </button>

          {result.markedForReview.length > 0 && (
            <button
              type="button"
              onClick={() => setFilter('review')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                filter === 'review'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Marked for Review ({result.markedForReview.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Review Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-2">
            <p className="text-slate-500 font-medium font-bangla">
              এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি।
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSelectedCategory('all');
              }}
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              সকল প্রশ্ন রিসেট করুন
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const userAns = userAnswers[q.id];
            const isAnswered = userAns !== undefined;
            const isCorrect = isAnswered && userAns === q.correctAnswer;
            const isMarked = markedForReview.includes(q.id);

            let borderStyle = 'border-slate-200';
            if (isAnswered) {
              borderStyle = isCorrect ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-rose-300 ring-1 ring-rose-100';
            }

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl shadow-sm border p-5 sm:p-6 transition-all ${borderStyle}`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                        !isAnswered
                          ? 'bg-slate-200 text-slate-700'
                          : isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {q.id}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {q.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMarked && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                        <Bookmark className="w-3 h-3 fill-amber-500 text-amber-600" />
                        <span>Review</span>
                      </span>
                    )}

                    {!isAnswered ? (
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-bangla">
                        উত্তর করেননি (Not Attempted)
                      </span>
                    ) : isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1 font-bangla">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>সঠিক উত্তর (+১.০)</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md flex items-center gap-1 font-bangla">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>ভুল উত্তর (-০.৫)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h4 className="text-base font-serif text-slate-900 leading-relaxed mb-4">
                  {renderQuestionText(q)}
                </h4>

                {/* Options List with Highlight */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isCandidateChoice = userAns === optIdx;
                    const isOfficialCorrect = q.correctAnswer === optIdx;

                    let optStyle = 'border-slate-200 bg-slate-50 text-slate-700';

                    if (isOfficialCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-400';
                    } else if (isCandidateChoice && !isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold line-through decoration-rose-500';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-serif flex items-center justify-between transition-colors ${optStyle}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{opt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isCandidateChoice && !isOfficialCorrect && (
                            <span className="text-[11px] font-sans font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              আপনার ভুল উত্তর
                            </span>
                          )}
                          {isOfficialCorrect && (
                            <span className="text-[11px] font-sans font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>সঠিক সমাধান (Official Key)</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/70 border border-indigo-100/90 text-xs sm:text-sm text-indigo-950 font-bangla space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900 text-xs uppercase tracking-wide">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                    <span>ব্যাকরণগত ব্যাখ্যা ও নিয়মাবলী (Grammar Explanation):</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 pt-0.5">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onBackToScorecard}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 mx-auto font-bangla"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>স্কোরকার্ডে ফিরে যান (Back to Scorecard)</span>
        </button>
      </div>
    </div>
  );
};
