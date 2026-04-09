"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAssessment, clearAssessmentStorage } from "@/hooks/useAssessment";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { questions } from "@/lib/questions";
import { NameForm } from "@/components/assessment/NameForm";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

const questionsById = Object.fromEntries(questions.map((q) => [q.id, q]));

export default function AssessmentPage() {
  const router = useRouter();
  const { state, setName, selectAnswer, goBack, setPhase } = useAssessment();
  const currentQuestionId = state.questionOrder[state.currentIndex];
  const currentQuestion = questionsById[currentQuestionId] ?? questions[0];
  const submittingRef = useRef(false);

  const handleSelect = useCallback(
    (answer: "A" | "B") => {
      if (state.phase !== "questions") return;
      selectAnswer(currentQuestion.id, answer);
    },
    [state.phase, currentQuestion, selectAnswer]
  );

  useKeyboardShortcuts({
    onA: () => handleSelect("A"),
    onB: () => handleSelect("B"),
    onBack: goBack,
    enabled: state.phase === "questions",
  });

  // Reset submission guard when phase changes away from submitting
  useEffect(() => {
    if (state.phase !== "submitting") {
      submittingRef.current = false;
    }
  }, [state.phase]);

  // Submit when phase becomes submitting
  useEffect(() => {
    if (state.phase !== "submitting") return;
    // Guard against React StrictMode double-invocation
    if (submittingRef.current) return;
    submittingRef.current = true;

    async function submit() {
      // Check for pending team
      let teamId: string | null = null;
      try {
        teamId = localStorage.getItem("pending_team_id");
      } catch {}

      try {
        const res = await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.userName,
            email: state.userEmail || undefined,
            answers: state.answers,
            teamId: teamId || undefined,
          }),
        });

        if (!res.ok) throw new Error("Failed to save result");

        const data = await res.json();

        // Clear assessment and pending team
        clearAssessmentStorage();
        try {
          localStorage.removeItem("pending_team_id");
        } catch {}

        // Smart redirect: if from team invite, go to team page
        if (teamId) {
          router.push(`/team/${teamId}`);
        } else {
          router.push(`/result/${data.id}`);
        }
      } catch (error) {
        console.error("Submit error:", error);
        submittingRef.current = false;
        setPhase("questions");
      }
    }

    submit();
  }, [state.phase, state.userName, state.userEmail, state.answers, router, setPhase]);

  const answeredCount = Object.keys(state.answers).length;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {state.phase === "name" && (
          <NameForm
            initialName={state.userName}
            initialEmail={state.userEmail}
            onSubmit={setName}
          />
        )}

        {state.phase === "questions" && (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-md">
              <ProgressBar current={answeredCount} total={40} />
            </div>
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                selected={state.answers[currentQuestion.id]}
                onSelect={handleSelect}
                index={state.currentIndex}
              />
            </AnimatePresence>
            {state.currentIndex > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                ← 이전 질문
              </button>
            )}
          </div>
        )}

        {state.phase === "submitting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <p className="text-lg font-medium text-gray-600">
              결과를 분석하고 있어요...
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
