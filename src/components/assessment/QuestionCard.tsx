"use client";

import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";

interface QuestionCardProps {
  question: Question;
  selected?: "A" | "B";
  onSelect: (answer: "A" | "B") => void;
  index: number;
}

export function QuestionCard({ question, selected, onSelect, index }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col items-center gap-8"
      style={{ pointerEvents: "auto" }}
    >
      <div className="text-center">
        <span className="mb-2 block text-sm font-medium text-primary">
          Q{index + 1}
        </span>
        <h2 className="text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl">
          {question.text}
        </h2>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <OptionButton
          label="A"
          text={question.optionA}
          selected={selected === "A"}
          onClick={() => onSelect("A")}
        />
        <OptionButton
          label="B"
          text={question.optionB}
          selected={selected === "B"}
          onClick={() => onSelect("B")}
        />
      </div>

      <p className="text-xs text-gray-400">
        A / B 키 또는 버튼을 눌러 선택하세요 · ← 이전
      </p>
    </motion.div>
  );
}

function OptionButton({
  label,
  text,
  selected,
  onClick,
}: {
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border-2 px-5 py-4 text-left transition-all ${
        selected
          ? "border-primary bg-primary/5 text-gray-900"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
          selected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {label}
      </span>
      <span className="pt-0.5 text-base leading-relaxed">{text}</span>
    </button>
  );
}
