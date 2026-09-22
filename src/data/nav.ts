import type { IconName } from "../components/common/icons";

export interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: IconName;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { id: "inicio", path: "/", label: "Inicio", icon: "home" },
      { id: "ruta", path: "/ruta", label: "Ruta de aprendizaje", icon: "road" },
      { id: "conceptos", path: "/conceptos", label: "Conceptos", icon: "book" },
    ],
  },
  {
    label: "Práctica",
    items: [
      { id: "laboratorio", path: "/laboratorio", label: "Laboratorio", icon: "flask" },
      { id: "desafios", path: "/desafios", label: "Desafíos", icon: "trophy" },
      { id: "uml", path: "/uml", label: "UML", icon: "diagram" },
      { id: "banco", path: "/banco", label: "Banco de preguntas", icon: "bank" },
    ],
  },
  {
    label: "Evaluación",
    items: [
      { id: "simulacro", path: "/simulacro", label: "Simulacro", icon: "timer" },
    ],
  },
  {
    label: "Recursos",
    items: [
      { id: "mapa", path: "/recurso/mapa-conceptual-poo", label: "Mapa conceptual de POO", icon: "diagram" },
      { id: "glosario", path: "/glosario", label: "Glosario", icon: "glossary" },
      { id: "repaso", path: "/repaso", label: "Repaso", icon: "refresh" },
      { id: "progreso", path: "/progreso", label: "Progreso", icon: "chart" },
    ],
  },
];

export const BOTTOM_NAV: NavItem[] = [
  { id: "inicio", path: "/", label: "Inicio", icon: "home" },
  { id: "ruta", path: "/ruta", label: "Ruta", icon: "road" },
  { id: "conceptos", path: "/conceptos", label: "Conceptos", icon: "book" },
  { id: "laboratorio", path: "/laboratorio", label: "Lab", icon: "flask" },
  { id: "simulacro", path: "/simulacro", label: "Simulacro", icon: "timer" },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);