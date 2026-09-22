import { useEffect, type ReactNode } from "react";
import { HashRouter, useLocation } from "./utils/router";
import { ToastProvider } from "./components/common/Toast";
import { ProgressProvider } from "./state/progress";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { Roadmap } from "./pages/Roadmap";
import { Concepts } from "./pages/Concepts";
import { ModuleView } from "./pages/ModuleView";
import { Lab } from "./pages/Lab";
import { Challenges } from "./pages/Challenges";
import { UML } from "./pages/UML";
import { QuestionBank } from "./pages/QuestionBank";
import { Simulacro } from "./pages/Simulacro";
import { Glossary } from "./pages/Glossary";
import { TransversalResource } from "./pages/TransversalResource";
import { Review } from "./pages/Review";
import { Progress } from "./pages/Progress";
import { UiKit } from "./pages/UiKit";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <ProgressProvider>
        <ToastProvider>
          <Root />
        </ToastProvider>
      </ProgressProvider>
    </HashRouter>
  );
}

interface RouteResult {
  title: string;
  node: ReactNode;
}

function resolveRoute(path: string): RouteResult {
  const segs = path.split("/").filter(Boolean);

  if (segs.length === 0) {
    return { title: "Inicio", node: <Dashboard /> };
  }

  switch (segs[0]) {
    case "inicio":
      return { title: "Inicio", node: <Dashboard /> };
    case "ruta":
      return { title: "Ruta de aprendizaje", node: <Roadmap /> };
    case "conceptos":
      return { title: "Conceptos", node: <Concepts /> };
    case "modulo":
      return { title: `Módulo ${segs[1] ?? ""}`, node: <ModuleView /> };
    case "laboratorio":
      return { title: "Laboratorio", node: <Lab /> };
    case "desafios":
      return { title: "Desafíos", node: <Challenges /> };
    case "uml":
      return { title: "UML", node: <UML /> };
    case "banco":
      return { title: "Banco de preguntas", node: <QuestionBank /> };
    case "simulacro":
      return { title: "Simulacro de evaluación", node: <Simulacro /> };
    case "glosario":
      return { title: "Glosario", node: <Glossary /> };
    case "recurso":
      return { title: "Recurso transversal", node: <TransversalResource /> };
    case "repaso":
      return { title: "Repaso", node: <Review /> };
    case "progreso":
      return { title: "Progreso", node: <Progress /> };
    case "ui-kit":
      return { title: "UI Kit (desarrollo)", node: <UiKit /> };
    default:
      return { title: "Ruta no encontrada", node: <NotFound /> };
  }
}

function Root() {
  const path = useLocation();
  const { title, node } = resolveRoute(path);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title ? `${title} · POO Racing Academy` : "POO Racing Academy";
  }, [title]);

  return <AppShell title={title}>{node}</AppShell>;
}