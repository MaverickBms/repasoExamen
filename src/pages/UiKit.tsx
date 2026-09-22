import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { TagChip } from "../components/common/TagChip";
import { ProgressBar } from "../components/common/ProgressBar";
import { ProgressRing } from "../components/common/ProgressRing";
import { Tabs, type TabItem } from "../components/common/Tabs";
import { Accordion } from "../components/common/Accordion";
import { CodeBlock } from "../components/common/CodeBlock";
import { Modal } from "../components/common/Modal";
import { useToast } from "../components/common/Toast";
import { Tooltip } from "../components/common/Tooltip";
import { Skeleton, SkeletonBlock } from "../components/common/Skeleton";
import { Icon } from "../components/common/icons";
import { ThemeToggle } from "../components/layout/NavShared";
import { LevelBar } from "../components/gamification/LevelBar";
import { StreakFlame } from "../components/gamification/StreakFlame";
import { TrophyIcon } from "../components/gamification/TrophyIcon";
import { Logo, LogoMark } from "../components/gamification/Logo";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="ukit-section">
      <h2 className="text-lg" style={{ marginBottom: "var(--sp-4)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Slot({ children }: { children: ReactNode }) {
  return <div className="demo-slot">{children}</div>;
}

const DEMO_CODE = `public class Demo {
    // Comentario de ejemplo
    private static final String MENSAJE = "Hola, mundo";
    @Override
    public String toString() {
        return MENSAJE + " -> " + (1 + 2.5);
    }
}`;

const TABS: TabItem[] = [
  { id: "a", label: "Pestaña A" },
  { id: "b", label: "Pestaña B", icon: "flask" },
  { id: "c", label: "Pestaña C" },
];

const ACCORDION = [
  {
    id: "1",
    title: "Elemento 1",
    content: (
      <p style={{ paddingTop: "var(--sp-1)" }}>
        Contenido de acordeón. Sirve para dividir información extensa en bloques plegables.
      </p>
    ),
    initialOpen: true,
  },
  {
    id: "2",
    title: "Elemento 2",
    content: <p className="text-2">Segundo bloque en preparación para FASE 3.</p>,
  },
];

export function UiKit() {
  const [tab, setTab] = useState("a");
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <>
      <PageHeader
        eyebrow="UI Kit · desarrollo"
        eyebrowIcon="code"
        title="Sistema visual — POO Racing Academy"
        subtitle="Página interna de desarrollo para validar los componentes base y sus estados. No contiene contenido académico real."
      />

      <Section title="Marca">
        <div className="grid grid-auto">
          <Card padding="lg">
            <h3 className="text-md">Logo</h3>
            <div className="mt-4">
              <Logo size="lg" />
            </div>
            <div className="mt-4">
              <LogoMark size={40} />
            </div>
          </Card>
          <Card padding="lg">
            <h3 className="text-md">Tema claro / oscuro</h3>
            <p className="text-2 mt-2">El cambio de tema también está disponible en el menú.</p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Tipografía">
        <Card padding="lg">
          <h1>Display · H1 (32)</h1>
          <h2 className="mt-2">H2 · Encabezado (24)</h2>
          <h3 className="mt-2">H3 · Sección (20)</h3>
          <h4 className="mt-2">H4 · Subsección (17)</h4>
          <p className="mt-4 text-md">Texto base (15px) — la lectura académica usa este tamaño.</p>
          <p className="mt-2 text-2">Texto secundario — notas y descripciones.</p>
          <p className="mt-2 text-3">Texto terciario — metadatos y etiquetas.</p>
          <p className="mt-3">
            <code>const mono = "Código de programación";</code>
          </p>
        </Card>
      </Section>

      <Section title="Paleta">
        <div className="grid grid-auto">
          <Card padding="lg">
            <h3 className="text-md">Acentos</h3>
            <div className="row wrap mt-3">
              <Swatch color="var(--accent)" name="racing" />
              <Swatch color="var(--gold)" name="meta" />
              <Swatch color="var(--info)" name="info" />
              <Swatch color="var(--success)" name="ok" />
              <Swatch color="var(--warning)" name="warn" />
              <Swatch color="var(--danger)" name="danger" />
            </div>
          </Card>
          <Card padding="lg">
            <h3 className="text-md">Superficies</h3>
            <div className="row wrap mt-3">
              <Swatch color="var(--bg)" name="bg" />
              <Swatch color="var(--surface)" name="surface" />
              <Swatch color="var(--surface-2)" name="surface-2" />
              <Swatch color="var(--surface-3)" name="surface-3" />
              <Swatch color="var(--border)" name="border" />
              <Swatch color="var(--track)" name="track" />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Botones">
        <Slot>
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="danger">Peligro</Button>
          <Button variant="gold">Meta</Button>
        </Slot>
        <Slot>
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">Grande</Button>
          <Button loading>Enviando…</Button>
          <Button disabled>Deshabilitado</Button>
          <Button to="/ruta">Como enlace</Button>
          <Button block variant="secondary">Bloque</Button>
        </Slot>
      </Section>

      <Section title="Badges y etiquetas">
        <Slot>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="accent" dot>Racing</Badge>
          <Badge tone="success" dot>Correcto</Badge>
          <Badge tone="warning">Aviso</Badge>
          <Badge tone="danger">Error</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="gold">+100 XP</Badge>
          <Badge size="xs" tone="accent">xs</Badge>
        </Slot>
        <Slot>
          <TagChip>tema</TagChip>
          <TagChip icon="flask" active>UML activo</TagChip>
          <TagChip onClick={() => showToast({ tone: "info", title: "Tag clickeable" })}>
            clickeable
          </TagChip>
        </Slot>
      </Section>

      <Section title="Tarjetas y estadísticas">
        <div className="grid grid-auto">
          <Card title="Tarjeta con encabezado" subtitle="Subtítulo opcional" icon="book" padding="md">
            <p className="text-2">Cuerpo de la tarjeta con padding md.</p>
          </Card>
          <Card variant="hover" padding="md">
            <div className="card-title">Hover</div>
            <p className="text-2 mt-2">Elevación al pasar el cursor.</p>
          </Card>
          <Card variant="flat" padding="md">
            <div className="card-title">Plana</div>
            <p className="text-2 mt-2">Sin sombra.</p>
          </Card>
          <Card padding="md">
            <div className="row" style={{ flexWrap: "wrap", gap: "var(--sp-5)" }}>
              <StatDemo icon="chart" label="Progreso" value="72%" />
              <StatDemo icon="spark" label="XP" value="2.450" />
              <StatDemo icon="flag" label="Racha" value="5" />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Progreso">
        <div className="grid grid-auto">
          <Card padding="lg">
            <ProgressBar value={72} label="Progreso general" showValue tone="accent" className="mt-3" />
            <ProgressBar value={45} max={90} label="Simulacro" showValue tone="gold" className="mt-5" />
            <ProgressBar value={30} label="Código" tone="success" className="mt-5" />
            <ProgressBar value={100} label="Completo" tone="info" className="mt-5" />
            <ProgressBar value={12} thin label="Delgado" className="mt-5" />
          </Card>
          <Card padding="lg">
            <div className="row wrap" style={{ justifyContent: "space-between" }}>
              <Ring value={72} label="Circuito" />
              <Ring value={45} label="Examen" />
              <Ring value={100} label="Completo" />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Tabs y acordeones">
        <Card padding="lg">
          <Tabs items={TABS} value={tab} onChange={setTab} ariaLabel="Ejemplo" />
          <p className="mt-4 text-2">Contenido de la pestaña {tab.toUpperCase()} — las pestañas solo muestran este texto.</p>
        </Card>
        <div className="mt-4">
          <Accordion items={ACCORDION} />
        </div>
      </Section>

      <Section title="Código">
        <CodeBlock code={DEMO_CODE} language="java" title="Demo.java" />
        <div className="mt-4 grid grid-2">
          <CodeBlock code={'final String PI = "3.14159"; // constante'} language="java" showLineNumbers={false} title="Sin números de línea" />
          <CodeBlock code="Este es un bloque de texto plano." language="text" title="texto" />
        </div>
      </Section>

      <Section title="Modal, toast y tooltip">
        <Slot>
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Button
            variant="secondary"
            onClick={() => showToast({ tone: "success", title: "Acción correcta", message: "El feedback funcionó." })}
          >
            Toast éxito
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast({ tone: "warning", title: "Aviso", message: "Revisá tu respuesta." })}
          >
            Toast aviso
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast({ tone: "gold", title: "+50 XP", message: "¡Completaste una actividad!" })}
          >
            Toast XP
          </Button>
        </Slot>
        <Slot>
          <Tooltip label="Soy un tooltip">
            <Button variant="ghost">Hover / foco</Button>
          </Tooltip>
        </Slot>
      </Section>

      <Section title="Skeleton">
        <div className="grid grid-auto">
          <Card padding="lg">
            <Skeleton height={20} width="60%" />
            <div className="mt-4">
              <SkeletonBlock lines={3} />
            </div>
          </Card>
          <Card padding="lg">
            <Skeleton width={64} height={64} radius="var(--r-full)" />
            <div className="mt-3">
              <Skeleton height={12} width="40%" />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Gamificación visual (sin lógica en FASE 2)">
        <Card padding="lg">
          <LevelBar level={3} name="Engineer" xp={240} xpToNext={400} />
          <div className="row wrap mt-5">
            <StreakFlame days={5} />
            <TrophyIcon size={36} />
            <TrophyIcon size={36} gold />
            <span className="checker-strip" style={{ flex: 1, minWidth: 120 }} />
          </div>
          <p className="text-3 mt-4">
            Iconos de logros, racha y niveles: solo presentación; la lógica llega en FASE 5.
          </p>
        </Card>
      </Section>
    </>
  );
}

function Swatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="row" style={{ minWidth: 120 }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: "var(--r-sm)",
          background: color,
          border: "1px solid var(--border-strong)",
          display: "inline-block",
        }}
      />
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-2)" }}>
        {name}
      </span>
    </div>
  );
}

function StatDemo({ icon, label, value }: { icon: "chart" | "spark" | "flag"; label: string; value: string }) {
  return (
    <div className="stat">
      <div className="stat-label">
        <Icon name={icon} size={14} />
        {label}
      </div>
      <div className={cn("stat-value")}>{value}</div>
    </div>
  );
}

function Ring({ value, label }: { value: number; label: string }) {
  return (
    <div className="stack stack-sm" style={{ alignItems: "center" }}>
      <ProgressRing value={value} size={72} strokeWidth={7} label={label}>
        <strong>{value}%</strong>
      </ProgressRing>
      <span className="text-3" style={{ fontSize: "var(--text-xs)" }}>
        {label}
      </span>
    </div>
  );
}