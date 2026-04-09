"use client";

import { useReducer, useEffect, useCallback } from "react";
import { questions } from "@/lib/questions";

export type Phase = "name" | "questions" | "submitting" | "complete";

interface AssessmentState {
  phase: Phase;
  userName: string;
  userEmail: string;
  currentIndex: number;
  answers: Record<number, "A" | "B">;
  questionOrder: number[];
  _initialized: boolean;
}

type Action =
  | { type: "SET_NAME"; name: string; email: string }
  | { type: "SELECT"; questionId: number; answer: "A" | "B" }
  | { type: "PREV" }
  | { type: "SET_PHASE"; phase: Phase }
  | { type: "RESET" }
  | { type: "INIT" };

const STORAGE_KEY = "assessment_progress";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function newQuestionOrder(): number[] {
  return shuffleArray(questions.map((q) => q.id));
}

const initialState: AssessmentState = {
  phase: "name",
  userName: "",
  userEmail: "",
  currentIndex: 0,
  answers: {},
  questionOrder: [],
  _initialized: false,
};

function reducer(state: AssessmentState, action: Action): AssessmentState {
  switch (action.type) {
    case "INIT":
      return { ...state, _initialized: true };
    case "SET_NAME":
      return { ...state, userName: action.name, userEmail: action.email, phase: "questions" };
    case "SELECT": {
      const newAnswers = { ...state.answers, [action.questionId]: action.answer };
      const newIndex = state.currentIndex < 39 ? state.currentIndex + 1 : state.currentIndex;
      const isComplete = Object.keys(newAnswers).length === 40;
      return {
        ...state,
        answers: newAnswers,
        currentIndex: isComplete ? state.currentIndex : newIndex,
        phase: isComplete ? "submitting" : state.phase,
      };
    }
    case "PREV":
      return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) };
    case "SET_PHASE":
      return { ...state, phase: action.phase };
    case "RESET":
      return { ...initialState, questionOrder: newQuestionOrder(), _initialized: true };
    default:
      return state;
  }
}

function saveToStorage(state: AssessmentState) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _initialized, ...data } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function loadFromStorage(): Partial<AssessmentState> | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearAssessmentStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function createInitialState(): AssessmentState {
  // SSR-safe: only access localStorage on the client
  if (typeof window === "undefined") return initialState;

  const saved = loadFromStorage();
  if (saved && saved.phase && saved.phase !== "complete" && saved.phase !== "submitting") {
    // Restore saved state; ensure questionOrder exists (backwards compat)
    const order = saved.questionOrder && saved.questionOrder.length === 40
      ? saved.questionOrder
      : newQuestionOrder();
    return { ...initialState, ...saved, questionOrder: order, _initialized: true };
  }
  return { ...initialState, questionOrder: newQuestionOrder(), _initialized: true };
}

export function useAssessment() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  // Mark as initialized after hydration (for SSR case)
  useEffect(() => {
    if (!state._initialized) {
      dispatch({ type: "INIT" });
    }
  }, [state._initialized]);

  // Save to localStorage on state changes (only after initialized)
  useEffect(() => {
    if (!state._initialized) return;
    if (state.phase !== "complete") {
      saveToStorage(state);
    }
  }, [state]);

  const setName = useCallback((name: string, email: string) => {
    dispatch({ type: "SET_NAME", name, email });
  }, []);

  const selectAnswer = useCallback((questionId: number, answer: "A" | "B") => {
    dispatch({ type: "SELECT", questionId, answer });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: "PREV" });
  }, []);

  const setPhase = useCallback((phase: Phase) => {
    dispatch({ type: "SET_PHASE", phase });
  }, []);

  const reset = useCallback(() => {
    clearAssessmentStorage();
    dispatch({ type: "RESET" });
  }, []);

  return { state, setName, selectAnswer, goBack, setPhase, reset };
}
