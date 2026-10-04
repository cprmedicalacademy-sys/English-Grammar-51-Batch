import React from 'react';
import { X, Printer } from 'lucide-react';
import { Question } from '../data/questions';
import { CprLogo } from './CprLogo';

interface OfficialAnswerKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

export const OfficialAnswerKeyModal: React.FC<OfficialAnswerKeyModalProps> = ({
  isOpen,
  onClose,
  questions,
}) => {
  if (!isOpen) return null;

  // Split into 2 columns like page 3 of the original PDF
  const col1 = questions.slice(0, 25);
  const col2 = questions.slice(25, 50);

  const getAnswerText = (q: Question) => {
    return q.options[q.correctAnswer];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center space-x-3.5">
            <div className="bg-white rounded-full p-0.5 shadow-md border border-slate-100 shrink-0">
              <CprLogo className="w-12 h-12" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl font-serif">
                CPR MEDICAL ACADEMY
              </h3>
              <p className="text-xs text-slate-500 font-bangla">
                BCS SPECIAL BATCH-51 · Topic: English Grammar (Official Answer Key)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition no-print"
              title="Print Answer Key"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - 2 Column Table matching Page 3 */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-serif">
            {/* Col 1: Q1 to Q25 */}
            <div className="space-y-1.5 border-r md:pr-6 border-slate-200">
              {col1.map((q) => (
                <div key={q.id} className="py-1 px-2.5 rounded-md hover:bg-slate-50 flex items-baseline justify-between border-b border-slate-100 last:border-0">
                  <span className="font-bold text-slate-900 w-8">{q.id}.</span>
                  <span className="text-slate-700 flex-1 ml-1">
                    <span className="font-semibold text-indigo-900">Answer:</span> {getAnswerText(q)}
                  </span>
                </div>
              ))}
            </div>

            {/* Col 2: Q26 to Q50 */}
            <div className="space-y-1.5 md:pl-2">
              {col2.map((q) => (
                <div key={q.id} className="py-1 px-2.5 rounded-md hover:bg-slate-50 flex items-baseline justify-between border-b border-slate-100 last:border-0">
                  <span className="font-bold text-slate-900 w-8">{q.id}.</span>
                  <span className="text-slate-700 flex-1 ml-1">
                    <span className="font-semibold text-indigo-900">Answer:</span> {getAnswerText(q)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 pt-4 mt-4 flex items-center justify-between text-xs text-slate-500 font-bangla">
          <span>মূল্যায়ন সূত্র: প্রাপ্ত নম্বর = সঠিক MCQ - (ভুল MCQ × ০.৫)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
