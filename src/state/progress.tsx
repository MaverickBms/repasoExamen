import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BADGES, levelForXp, nextLevelForXp, type BadgeDef, type LevelDef } from "../data/gamification";
import { MODULES } from "../data/guia";

const STORAGE_KEY = "poo-progress-v1";

export interface SimulacroRecord {
  date: string;
  score: number;
  total: number;
  /** Aciertos/respondidas en las partes con respuesta disponible (I–II). */
  autoCorrect: number;
  autoTotal: number;
}

export interface ProgressState {
  xp: number;
  badges: string[];
  streak: { count: number; last: string };
  /** Actividades completadas (id estables): "ex:*", "mod:*", "desafio:*", ... */
  activities: Record<string, true>;
  /** Checklist cap. 16: índice marcado. */
  checklist: Record<number, true>;
  simulacro: { attempts: number; best: number };
  bankReflections: number;
  lastSimulacro: SimulacroRecord | null;
}

const initialState: ProgressState = {
  xp: 0,
  badges: [],
  streak: { count: 0, last: "" },
  activities: {},
  checklist: {},
  simulacro: { attempts: 0, best: 0 },
  bankReflections: 0,
  lastSimulacro: null,
};

function todayStr(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dd}`;
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dd}`;
}

function bumpStreak(s: ProgressState["streak"]): ProgressState["streak"] {
  const today = todayStr();
  if (s.last === today) return s;
  if (s.last === yesterdayStr()) return { count: s.count + 1, last: today };
  return { count: 1, last: today };
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

function computeBadges(s: ProgressState): string[] {
  const ids: string[] = [];
  const activeCount = Object.keys(s.activities).length;
  const checklistCount = Object.keys(s.checklist).length;
  const hasChallenge = Object.keys(s.activities).some((k) => k.startsWith("desafio:"));
  const hasExercise = Object.keys(s.activities).some((k) => k.startsWith("ex:"));
  const modulesRead = Object.keys(s.activities).filter((k) => k.startsWith("mod:")).length;

  if (activeCount >= 1) ids.push("primer-paso");
  if (hasExercise) ids.push("ejercicio-hecho");
  if (s.simulacro.attempts >= 1) ids.push("simulacro-hecho");
  if (s.simulacro.best >= 7) ids.push("simulacro-fuerte");
  if (s.bankReflections >= 5) ids.push("banco-practica");
  if (hasChallenge) ids.push("desafio-dia");
  if (s.streak.count >= 3) ids.push("racha-3");
  if (checklistCount >= 10) ids.push("checklist-10");
  if (checklistCount >= 30) ids.push("checklist-completo");
  if (modulesRead >= MODULES.length) ids.push("ruta-completa");
  if (levelForXp(s.xp).id === "architect") ids.push("arquitecto");
  return ids;
}

export interface ProgressApi {
  state: ProgressState;
  level: LevelDef;
  nextLevel: LevelDef | null;
  xpInLevel: number;
  xpForNext: number;
  checklistCount: number;
  modulesRead: number;
  awardXp(amount: number): AwardResult;
  markActivity(id: string, xpForNew?: number): AwardResult;
  markModuleRead(moduleId: string): AwardResult;
  toggleChecklist(index: number): AwardResult;
  recordSimulacro(score: number, total: number, autoCorrect: number, autoTotal: number): AwardResult;
  recordBankReflections(n: number): AwardResult;
  resetProgress(): void;
}

export interface AwardResult {
  awarded: BadgeDef[];
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);
  const stateRef = useRef(state);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [state]);

  const commit = (next: ProgressState, prev: ProgressState): AwardResult => {
    const earned = computeBadges(next).filter((id) => !prev.badges.includes(id));
    const final: ProgressState = earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
    stateRef.current = final;
    setState(final);
    return { awarded: earned.map((id) => BADGES.find((b) => b.id === id)!).filter(Boolean) };
  };

  const api: ProgressApi = {
    state,
    level: levelForXp(state.xp),
    nextLevel: nextLevelForXp(state.xp),
    xpInLevel: state.xp - levelForXp(state.xp).minXp,
    xpForNext: nextLevelForXp(state.xp) ? nextLevelForXp(state.xp)!.minXp - levelForXp(state.xp).minXp : 0,
    checklistCount: Object.keys(state.checklist).length,
    modulesRead: Object.keys(state.activities).filter((k) => k.startsWith("mod:")).length,
    awardXp(amount) {
      const prev = stateRef.current;
      return commit({ ...prev, xp: prev.xp + amount, streak: bumpStreak(prev.streak) }, prev);
    },
    markActivity(id, xpForNew = 15) {
      const prev = stateRef.current;
      if (prev.activities[id]) return { awarded: [] };
      const next: ProgressState = {
        ...prev,
        xp: prev.xp + xpForNew,
        activities: { ...prev.activities, [id]: true },
        streak: bumpStreak(prev.streak),
      };
      return commit(next, prev);
    },
    markModuleRead(moduleId) {
      return api.markActivity(`mod:${moduleId}`, 25);
    },
    toggleChecklist(index) {
      const prev = stateRef.current;
      const checklist = { ...prev.checklist };
      if (checklist[index]) delete checklist[index];
      else checklist[index] = true;
      return commit({ ...prev, checklist, streak: bumpStreak(prev.streak) }, prev);
    },
    recordSimulacro(score, total, autoCorrect, autoTotal) {
      const prev = stateRef.current;
      const next: ProgressState = {
        ...prev,
        xp: prev.xp + 40 + autoCorrect * 5,
        simulacro: {
          attempts: prev.simulacro.attempts + 1,
          best: Math.max(prev.simulacro.best, autoCorrect),
        },
        streak: bumpStreak(prev.streak),
        lastSimulacro: { date: todayStr(), score, total, autoCorrect, autoTotal },
      };
      return commit(next, prev);
    },
    recordBankReflections(n) {
      const prev = stateRef.current;
      return commit({ ...prev, bankReflections: prev.bankReflections + n, streak: bumpStreak(prev.streak) }, prev);
    },
    resetProgress() {
      stateRef.current = { ...initialState };
      setState({ ...initialState });
    },
  };

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress debe usarse dentro de <ProgressProvider>");
  return ctx;
}