import React from 'react';
import { Clock, Award, FileText } from 'lucide-react';
import { ViewState } from '../types';
import { CprLogo } from './CprLogo';

interface HeaderProps {
  viewState: ViewState;
  timeLeft: number;
  onOpenPalette?: () => void;
  onRequestSubmit?: () => void;
  onShowAnswerKey?: () => void;
  totalAnswered?: number;
  totalQuestions?: number;
  isPracticeMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  viewState,
  timeLeft,
  onOpenPalette,
  onRequestSubmit,
  onShowAnswerKey,
  totalAnswered = 0,
  totalQuestions = 50,
  isPracticeMode = false,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = !isPracticeMode && timeLeft <= 300 && timeLeft > 60;
  const isCriticalTime = !isPracticeMode && timeLeft <= 60;

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-indigo-900/60 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Brand & Batch Info with Authentic CPR Logo */}
        <div className="flex items-center space-x-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-0.5 shadow-md shrink-0">
              <CprLogo className="w-10 h-10 sm:w-11 sm:h-11" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                  CPR MEDICAL ACADEMY
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                  Portal
                </span>
              </div>
              <p className="text-xs text-indigo-200/90 font-bangla flex items-center gap-1.5">
                <span>BCS SPECIAL BATCH-51</span>
                <span className="text-slate-400">·</span>
                <span className="text-amber-300 font-medium">Topic: English Grammar</span>
              </p>
            </div>
          </div>

          {/* Quick answer key button when on result view or small screens */}
          {onShowAnswerKey && viewState === 'result' && (
            <button
              onClick={onShowAnswerKey}
              className="text-xs font-medium text-indigo-200 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800 hover:bg-indigo-900 transition-colors md:hidden"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Answer Key</span>
            </button>
          )}
        </div>

        {/* Live Exam Controls */}
        {viewState === 'exam' && (
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
            {/* Countdown Timer */}
            {!isPracticeMode ? (
              <div
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all shadow-inner ${
                  isCriticalTime
                    ? 'bg-rose-950/90 text-rose-200 border-rose-600 animate-pulse'
                    : isLowTime
                    ? 'bg-amber-950/80 text-amber-200 border-amber-600'
                    : 'bg-slate-800/90 text-slate-100 border-slate-700'
                }`}
                title="Remaining Exam Time"
              >
                <Clock className={`w-4 h-4 ${isCriticalTime ? 'text-rose-400' : isLowTime ? 'text-amber-400' : 'text-indigo-400'}`} />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-normal hidden sm:inline">Time Left:</span>
                <span className={`text-base font-mono font-bold tracking-wider ${isCriticalTime ? 'text-rose-300' : isLowTime ? 'text-amber-300' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Practice Mode (Untimed)</span>
              </div>
            )}

            {/* Answered Counter Pill */}
            <div className="text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/80 hidden sm:flex items-center gap-1.5">
              <span className="text-slate-400">Answered:</span>
              <span className="font-bold text-emerald-400">{totalAnswered}</span>
              <span className="text-slate-500">/</span>
              <span>{totalQuestions}</span>
            </div>

            {/* Palette & Submit */}
            <div className="flex items-center gap-2">
              {onOpenPalette && (
                <button
                  type="button"
                  onClick={onOpenPalette}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-indigo-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition"
                >
                  Questions (1-50)
                </button>
              )}
              {onRequestSubmit && (
                <button
                  type="button"
                  onClick={onRequestSubmit}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* In Result mode button */}
        {viewState === 'result' && onShowAnswerKey && (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onShowAnswerKey}
              className="text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Official 50-Question Answer Key</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
