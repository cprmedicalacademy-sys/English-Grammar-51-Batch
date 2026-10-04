/**
 * CPR Medical Academy - BCS Special Batch 51 Exam
 * Topic: English Grammar
 */

import React, { useState, useEffect, useRef } from 'react';
import { ViewState, StudentInfo, ExamResult } from './types';
import { QUESTIONS_DATA, EXAM_DETAILS, Question } from './data/questions';
import { Header } from './components/Header';
import { RegistrationView } from './components/RegistrationView';
import { ExamView } from './components/ExamView';
import { QuestionPalette } from './components/QuestionPalette';
import { ResultView } from './components/ResultView';
import { ReviewView } from './components/ReviewView';
import { OfficialAnswerKeyModal } from './components/OfficialAnswerKeyModal';

const STORAGE_KEY = 'cpr_bcs51_exam_history';

export default function App() {
  const [viewState, setViewState] = useState<ViewState | 'review'>('register');
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DETAILS.durationMinutes * 60);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [isAnswerKeyOpen, setIsAnswerKeyOpen] = useState<boolean>(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [pastResults, setPastResults] = useState<ExamResult[]>([]);

  // Keep track of startTime to calculate exact time spent
  const examStartTimeRef = useRef<number | null>(null);

  // Load past results from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPastResults(JSON.parse(stored));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (viewState !== 'exam' || student?.examMode === 'practice') {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewState, student]);

  // Start exam handler
  const handleStartExam = (info: StudentInfo) => {
    setStudent(info);
    setUserAnswers({});
    setMarkedForReview([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(EXAM_DETAILS.durationMinutes * 60);
    examStartTimeRef.current = Date.now();
    setViewState('exam');
  };

  // Answer change (with support for clearing answer by passing null)
  const handleAnswerChange = (questionId: number, optionIndex: number | null) => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      if (optionIndex === null) {
        delete updated[questionId];
      } else {
        updated[questionId] = optionIndex;
      }
      return updated;
    });
  };

  // Toggle marked for review
  const handleToggleMarkForReview = (questionId: number) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  // Calculate and finalize results
  const computeAndSubmit = () => {
    if (!student) return;

    let correctCount = 0;
    let incorrectCount = 0;

    QUESTIONS_DATA.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected !== undefined) {
        if (selected === q.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const totalQuestions = QUESTIONS_DATA.length;
    const unattemptedCount = totalQuestions - (correctCount + incorrectCount);
    const negativeMarks = incorrectCount * EXAM_DETAILS.negativeMarkPerWrong;
    const rawScore = correctCount * EXAM_DETAILS.marksPerQuestion - negativeMarks;
    const finalScore = Number(rawScore.toFixed(2));
    const percentage = Number(((finalScore / totalQuestions) * 100).toFixed(1));

    const timeSpentSeconds = examStartTimeRef.current
      ? Math.round((Date.now() - examStartTimeRef.current) / 1000)
      : EXAM_DETAILS.durationMinutes * 60 - timeLeft;

    const examResult: ExamResult = {
      student,
      date: new Date().toISOString(),
      timeSpentSeconds,
      totalQuestions,
      correctCount,
      incorrectCount,
      unattemptedCount,
      negativeMarks,
      finalScore,
      percentage,
      userAnswers: { ...userAnswers },
      markedForReview: [...markedForReview],
    };

    setResult(examResult);
    setViewState('result');

    // Save to history
    try {
      const updatedHistory = [examResult, ...pastResults.slice(0, 9)];
      setPastResults(updatedHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch {
      // localstorage error
    }
  };

  const handleAutoSubmit = () => {
    alert("Time is up! Your exam is being automatically submitted.");
    computeAndSubmit();
  };

  const handleRetake = () => {
    setViewState('register');
    setResult(null);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPastResults([]);
    } catch {
      // ignore
    }
  };

  const totalAnswered = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        viewState={viewState === 'review' ? 'result' : viewState}
        timeLeft={timeLeft}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onRequestSubmit={computeAndSubmit}
        onShowAnswerKey={() => setIsAnswerKeyOpen(true)}
        totalAnswered={totalAnswered}
        totalQuestions={QUESTIONS_DATA.length}
        isPracticeMode={student?.examMode === 'practice'}
      />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        {viewState === 'register' && (
          <RegistrationView
            onStart={handleStartExam}
            pastResults={pastResults}
            onViewPastResult={(past) => {
              setResult(past);
              setViewState('result');
            }}
            onClearHistory={handleClearHistory}
          />
        )}

        {viewState === 'exam' && student && (
          <ExamView
            questions={QUESTIONS_DATA}
            student={student}
            userAnswers={userAnswers}
            markedForReview={markedForReview}
            onAnswerChange={handleAnswerChange}
            onToggleMarkForReview={handleToggleMarkForReview}
            onSubmitExam={computeAndSubmit}
            onOpenPalette={() => setIsPaletteOpen(true)}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        )}

        {viewState === 'result' && result && (
          <ResultView
            result={result}
            questions={QUESTIONS_DATA}
            onReview={() => setViewState('review')}
            onRetake={handleRetake}
            onShowAnswerKey={() => setIsAnswerKeyOpen(true)}
          />
        )}

        {viewState === 'review' && result && (
          <ReviewView
            questions={QUESTIONS_DATA}
            result={result}
            onBackToScorecard={() => setViewState('result')}
            onShowAnswerKey={() => setIsAnswerKeyOpen(true)}
          />
        )}
      </main>

      {/* Interactive Question Palette Modal / Drawer */}
      <QuestionPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        totalQuestions={QUESTIONS_DATA.length}
        currentQuestionIndex={currentQuestionIndex}
        onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
        userAnswers={userAnswers}
        markedForReview={markedForReview}
      />

      {/* Official 50 Questions Answer Key Modal (Page 3 format) */}
      <OfficialAnswerKeyModal
        isOpen={isAnswerKeyOpen}
        onClose={() => setIsAnswerKeyOpen(false)}
        questions={QUESTIONS_DATA}
      />

      {/* Simple Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs no-print">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-300">
            CPR MEDICAL ACADEMY · BCS SPECIAL BATCH-51
          </p>
          <p className="text-[11px] text-slate-500 font-bangla">
            বিসিএস ও মেডিকেল ভর্তি প্রস্তুতি মূল্যায়ন পোর্টাল · সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </footer>
    </div>
  );
}
