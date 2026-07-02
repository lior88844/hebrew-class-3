interface Prompt {
  en: string;
  he?: string;
}

interface Props {
  prompts: Prompt[];
  currentIndex: number;
  onNext: () => void;
  onReset: () => void;
}

export default function TeacherPrompt({ prompts, currentIndex, onNext, onReset }: Props) {
  const prompt = prompts[currentIndex];

  return (
    <div className="teacher-prompt">
      <div className="teacher-prompt-label">
        <span className="teacher-icon">👩‍🏫</span>
        <span>Teacher Prompt</span>
        <span className="prompt-counter">{currentIndex + 1} / {prompts.length}</span>
      </div>
      <p className="teacher-prompt-text">{prompt.en}</p>
      {prompt.he && (
        <p className="teacher-prompt-text-he" dir="rtl">{prompt.he}</p>
      )}
      <div className="teacher-controls">
        <button className="ctrl-btn ctrl-btn--next" onClick={onNext} disabled={prompts.length <= 1}>
          Next Question →
        </button>
        <button className="ctrl-btn ctrl-btn--reset" onClick={onReset}>
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
