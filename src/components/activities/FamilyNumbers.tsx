import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";

interface Question {
  direction: "he-to-en" | "en-to-he";
  questionText: string;
  correctAnswer: string;
  distractors: [string, string];
  hint?: string;
}

// Masculine numbers (correct for אחים / דודים / אחיינים / סבא / אבא)
// Feminine forms used as wrong-answer distractors to drill gender agreement
const QUESTIONS: Question[] = [
  // ── Hebrew → English ──────────────────────────────────────────────────────
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי שְׁלוֹשָׁה אַחִים",
    correctAnswer: "I have 3 brothers",
    distractors: ["I have 3 uncles", "I have 8 brothers"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי סַבָּא אֶחָד",
    correctAnswer: "I have 1 grandfather",
    distractors: ["I have 1 father", "I have 2 grandfathers"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי שְׁנֵי אַחְיָנִים",
    correctAnswer: "I have 2 nephews",
    distractors: ["I have 2 brothers", "I have 2 uncles"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי אַבָּא אֶחָד",
    correctAnswer: "I have 1 father",
    distractors: ["I have 1 grandfather", "I have 1 uncle"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי שִׁשָּׁה דּוֹדִים",
    correctAnswer: "I have 6 uncles",
    distractors: ["I have 6 brothers", "I have 7 uncles"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי אַרְבָּעָה אַחִים",
    correctAnswer: "I have 4 brothers",
    distractors: ["I have 4 uncles", "I have 4 nephews"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי עֲשָׂרָה אַחְיָנִים",
    correctAnswer: "I have 10 nephews",
    distractors: ["I have 10 brothers", "I have 10 uncles"],
  },
  {
    direction: "he-to-en",
    questionText: "יֵשׁ לִי חֲמִשָּׁה דּוֹדִים",
    correctAnswer: "I have 5 uncles",
    distractors: ["I have 5 nephews", "I have 9 uncles"],
  },
  // ── English → Hebrew (gender-mistake distractors marked with *) ───────────
  {
    direction: "en-to-he",
    questionText: "I have 5 uncles",
    correctAnswer: "יֵשׁ לִי חֲמִשָּׁה דּוֹדִים",
    distractors: ["יֵשׁ לִי חָמֵשׁ דּוֹדִים", "יֵשׁ לִי חֲמִשָּׁה אַחִים"],
    hint: "חָמֵשׁ is the feminine form — masculine nouns like דּוֹדִים need חֲמִשָּׁה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 4 brothers",
    correctAnswer: "יֵשׁ לִי אַרְבָּעָה אַחִים",
    distractors: ["יֵשׁ לִי אַרְבַּע אַחִים", "יֵשׁ לִי אַרְבָּעָה דּוֹדִים"],
    hint: "אַרְבַּע is the feminine form — masculine nouns like אַחִים need אַרְבָּעָה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 7 brothers",
    correctAnswer: "יֵשׁ לִי שִׁבְעָה אַחִים",
    distractors: ["יֵשׁ לִי שֶׁבַע אַחִים", "יֵשׁ לִי שִׁבְעָה דּוֹדִים"],
    hint: "שֶׁבַע is the feminine form — masculine nouns like אַחִים need שִׁבְעָה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 2 nephews",
    correctAnswer: "יֵשׁ לִי שְׁנֵי אַחְיָנִים",
    distractors: ["יֵשׁ לִי שְׁתֵּי אַחְיָנִים", "יֵשׁ לִי שְׁנֵי אַחִים"],
    hint: "שְׁתֵּי is the feminine construct form — masculine nouns like אַחְיָנִים need שְׁנֵי",
  },
  {
    direction: "en-to-he",
    questionText: "I have 10 nephews",
    correctAnswer: "יֵשׁ לִי עֲשָׂרָה אַחְיָנִים",
    distractors: ["יֵשׁ לִי עֶשֶׂר אַחְיָנִים", "יֵשׁ לִי עֲשָׂרָה אַחִים"],
    hint: "עֶשֶׂר is the feminine form — masculine nouns like אַחְיָנִים need עֲשָׂרָה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 1 grandfather",
    correctAnswer: "יֵשׁ לִי סַבָּא אֶחָד",
    distractors: ["יֵשׁ לִי סַבָּא אַחַת", "יֵשׁ לִי אַבָּא אֶחָד"],
    hint: "אַחַת is the feminine form — masculine nouns like סַבָּא need אֶחָד",
  },
  {
    direction: "en-to-he",
    questionText: "I have 6 uncles",
    correctAnswer: "יֵשׁ לִי שִׁשָּׁה דּוֹדִים",
    distractors: ["יֵשׁ לִי שֵׁשׁ דּוֹדִים", "יֵשׁ לִי שִׁשָּׁה אַחִים"],
    hint: "שֵׁשׁ is the feminine form — masculine nouns like דּוֹדִים need שִׁשָּׁה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 8 brothers",
    correctAnswer: "יֵשׁ לִי שְׁמוֹנָה אַחִים",
    distractors: ["יֵשׁ לִי שְׁמוֹנֶה אַחִים", "יֵשׁ לִי שְׁמוֹנָה דּוֹדִים"],
    hint: "שְׁמוֹנֶה is the feminine form — masculine nouns like אַחִים need שְׁמוֹנָה",
  },
  {
    direction: "en-to-he",
    questionText: "I have 3 brothers",
    correctAnswer: "יֵשׁ לִי שְׁלוֹשָׁה אַחִים",
    distractors: ["יֵשׁ לִי שָׁלוֹשׁ אַחִים", "יֵשׁ לִי שְׁלוֹשָׁה דּוֹדִים"],
    hint: "שָׁלוֹשׁ is the feminine form — masculine nouns like אַחִים need שְׁלוֹשָׁה",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initialOptions(q: Question): string[] {
  return shuffle([q.correctAnswer, ...q.distractors]);
}

function resultEmoji(score: number, total: number): string {
  if (score === total) return "🎉";
  if (score >= Math.ceil(total / 2)) return "👍";
  return "📚";
}

function resultMessage(score: number, total: number): string {
  if (score === total) return "Perfect score! Excellent work!";
  if (score >= Math.ceil(total / 2)) return "Good job! Keep practicing!";
  return "Keep going — you're learning!";
}

interface Props {
  readonly onBack: () => void;
}

interface QuizState {
  questionIndex: number;
  shuffledOptions: string[];
  selectedAnswer: string | null;
  score: number;
  finished: boolean;
}

function buildInitialState(): QuizState {
  return {
    questionIndex: 0,
    shuffledOptions: initialOptions(QUESTIONS[0]),
    selectedAnswer: null,
    score: 0,
    finished: false,
  };
}

export default function FamilyNumbers({ onBack }: Props) {
  const [state, setState] = useState<QuizState>(buildInitialState);

  const { questionIndex, shuffledOptions, selectedAnswer, score, finished } = state;
  const currentQuestion = QUESTIONS[questionIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const answeredCount = questionIndex + (isAnswered ? 1 : 0);
  const optionsAreHebrew = currentQuestion.direction === "en-to-he";

  const advanceTo = (index: number) => {
    setState((s) => ({
      ...s,
      questionIndex: index,
      shuffledOptions: initialOptions(QUESTIONS[index]),
      selectedAnswer: null,
    }));
  };

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    const correct = option === currentQuestion.correctAnswer;
    setState((s) => ({
      ...s,
      selectedAnswer: option,
      score: correct ? s.score + 1 : s.score,
    }));
  };

  const handleNext = () => {
    const next = questionIndex + 1;
    if (next >= QUESTIONS.length) {
      setState((s) => ({ ...s, finished: true }));
    } else {
      advanceTo(next);
    }
  };

  const handleRestart = () => setState(buildInitialState);

  const optionClass = (option: string): string => {
    if (!isAnswered) return "quiz-option";
    if (option === currentQuestion.correctAnswer) return "quiz-option quiz-option--correct";
    if (option === selectedAnswer) return "quiz-option quiz-option--wrong";
    return "quiz-option quiz-option--dim";
  };

  if (finished) {
    return (
      <ActivityLayout
        title="Family Numbers"
        titleHe="מִסְפָּרֵי הַמִּשְׁפָּחָה"
        emoji="👨‍👦"
        onBack={onBack}
      >
        <div className="quiz-complete">
          <span className="quiz-complete-emoji">
            {resultEmoji(score, QUESTIONS.length)}
          </span>
          <h2 className="quiz-complete-title">Quiz Complete!</h2>
          <p className="quiz-complete-score">
            {score} / {QUESTIONS.length} correct
          </p>
          <p className="quiz-complete-msg">
            {resultMessage(score, QUESTIONS.length)}
          </p>
          <button className="ctrl-btn ctrl-btn--next" onClick={handleRestart}>
            ↺ Play Again
          </button>
        </div>
      </ActivityLayout>
    );
  }

  return (
    <ActivityLayout
      title="Family Numbers"
      titleHe="מִסְפָּרֵי הַמִּשְׁפָּחָה"
      emoji="👨‍👦"
      onBack={onBack}
    >
      <div className="quiz-layout">
        <div className="quiz-header">
          <span className="quiz-progress">
            Question {questionIndex + 1} / {QUESTIONS.length}
          </span>
          <span className="quiz-score-badge">
            Score: {score} / {answeredCount}
          </span>
        </div>

        <div className="quiz-question-card">
          <span
            className={`quiz-direction-badge ${
              currentQuestion.direction === "he-to-en"
                ? "quiz-direction-badge--he"
                : "quiz-direction-badge--en"
            }`}
          >
            {currentQuestion.direction === "he-to-en"
              ? "🇮🇱 Hebrew → English"
              : "🇬🇧 English → Hebrew"}
          </span>

          <p
            className={`quiz-question-text ${
              currentQuestion.direction === "he-to-en"
                ? "quiz-question-text--he"
                : ""
            }`}
            dir={currentQuestion.direction === "he-to-en" ? "rtl" : "ltr"}
          >
            {currentQuestion.questionText}
          </p>

          <p className="quiz-question-sub">
            {currentQuestion.direction === "he-to-en"
              ? "Choose the correct English translation"
              : "Choose the correct Hebrew sentence"}
          </p>
        </div>

        <div className="quiz-options">
          {shuffledOptions.map((option) => (
            <button
              key={option}
              className={`${optionClass(option)} ${
                optionsAreHebrew ? "quiz-option--he-text" : ""
              }`}
              dir={optionsAreHebrew ? "rtl" : "ltr"}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div
            className={`quiz-feedback ${
              isCorrect ? "quiz-feedback--correct" : "quiz-feedback--wrong"
            }`}
          >
            <div className="quiz-feedback-body">
              <span className="quiz-feedback-icon">{isCorrect ? "✓" : "✗"}</span>
              <div className="quiz-feedback-text">
                <p className="quiz-feedback-msg">
                  {isCorrect ? "Correct!" : "Wrong — the correct answer is:"}
                </p>
                {!isCorrect && (
                  <p
                    className={`quiz-feedback-answer ${
                      optionsAreHebrew ? "quiz-feedback-answer--he" : ""
                    }`}
                    dir={optionsAreHebrew ? "rtl" : "ltr"}
                  >
                    {currentQuestion.correctAnswer}
                  </p>
                )}
                {!isCorrect && currentQuestion.hint && (
                  <p className="quiz-feedback-hint">{currentQuestion.hint}</p>
                )}
              </div>
            </div>
            <button
              className="ctrl-btn ctrl-btn--next quiz-next-btn"
              onClick={handleNext}
            >
              {questionIndex + 1 < QUESTIONS.length ? "Next →" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </ActivityLayout>
  );
}
