import { PageHeader } from "../components/layout/PageHeader";
import { Card, CardStat } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import { Badge } from "../components/common/Badge";
import { useProgress } from "../state/progress";
import { useToast } from "../components/common/Toast";
import { BADGES } from "../data/gamification";
import { StreakFlame } from "../components/gamification/StreakFlame";
import { MODULES } from "../data/guia";

export function Dashboard() {
  const { state, level, nextLevel, xpForNext, xpInLevel, checklistCount, modulesRead, awardXp, resetProgress } =
    useProgress();
  const { showToast } = useToast();

  const xpRequired = xpForNext;

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        eyebrowIcon="home"
        title="Inicio"
        subtitle="Panel principal: nivel, XP, racha e insignias. Usá la racha para mantener la constancia; marcá módulos como revisados para ganar XP."
      />

      <div className="stack stack-lg">
        <Card padding="md" title="Tu racha" subtitle="Constancia: mantené el hábito diario.">
          <div className="row" style={{ gap: "var(--sp-3)", alignItems: "center" }}>
            <StreakFlame days={state.streak.count} />
            <span style={{ fontSize: "var(--text-sm)" }}>
              {state.streak.count === 1 ? "1 día de racha" : `${state.streak.count} días de racha`}. Seguí la constancia para desbloquear insignias.
            </span>
          </div>
        </Card>

        <Card padding="md" title="Nivel y experiencia" subtitle="Recompensa por estudiar: cada módulo revisado da XP.">
          <div className="stack stack-md">
            <div className="row wrap" style={{ justifyContent: "space-between", gap: "var(--sp-3)" }}>
              <div className="row" style={{ gap: "var(--sp-3)", alignItems: "center", flexWrap: "wrap" }}>
                <Badge tone="accent" size="sm">{level.name}</Badge>
                <Badge tone="neutral" size="sm">{state.xp} XP</Badge>
                <Badge tone="gold" size="sm">{state.badges.length} insignias</Badge>
              </div>
              <div>
                {nextLevel ? (
                  <Badge tone="gold" size="sm">Faltan {xpForNext} XP para {nextLevel.name}</Badge>
                ) : (
                  <Badge tone="gold" size="sm">¡Nivel máximo alcanzado!</Badge>
                )}
              </div>
            </div>
            <ProgressBar
              value={xpInLevel}
              max={xpForNext}
              label={`Progreso hacia ${level.name}`}
              showValue
              tone="gold"
            />
            <div className="row" style={{ gap: "var(--sp-2)", flexWrap: "wrap" }}>
              <Button size="sm" variant="secondary" onClick={() => {
                const { awarded } = awardXp(10);
                showToast({ tone: "gold", title: "+10 XP", message: "Práctica manual registrada." });
                awarded.forEach((b) =>
                  showToast({ tone: "gold", title: `Insignia desbloqueada: ${b.title}`, message: b.description }),
                );
              }}>
                Practicar ahora (+10 XP)
              </Button>
            </div>
          </div>
        </Card>

        <Card padding="md" title="Tu avance" subtitle="Datos persistidos en este navegador (localStorage).">
          <div className="grid grid-auto">
            <CardStat icon="chart" label="Módulos leídos" value={`${modulesRead}/${MODULES.length}`} hint="de la ruta FASE 2" />
            <CardStat icon="spark" label="Checklist cap. 16" value={`${checklistCount}/30`} hint="marcá los ítems en Repaso" />
            <CardStat icon="flag" label="Racha actual" value={`${state.streak.count} día${state.streak.count === 1 ? "" : "s"}`} hint="volvé cada día" />
            <CardStat icon="star" label="XP acumulado" value={`${state.xp}`} hint="gamificación FASE 5" />
          </div>
          <div className="row" style={{ gap: "var(--sp-3)", marginTop: "var(--sp-3)" }}>
            <Button to="/ruta" variant="primary">Continuar ruta</Button>
            <Button to="/repaso" variant="secondary">Ir al repaso</Button>
          </div>
        </Card>

        <Card padding="md" title="Insignias obtenidas" subtitle="Se desbloquean al marcar actividades reales.">
          {state.badges.length === 0 ? (
            <Badge tone="neutral" size="sm">Aún no tenés insignias. Completá ejercicios y simulacros para ganarlas.</Badge>
          ) : (
            <div className="grid grid-auto">
              {state.badges.map((id) => {
                const b = BADGES.find((x) => x.id === id);
                if (!b) return null;
                return (
                  <Card key={id} padding="sm" variant="flat">
                    <div className="stack" style={{ gap: "var(--sp-1)" }}>
                      <Badge tone="gold" size="xs">{b.title}</Badge>
                      <span className="text" style={{ fontSize: "var(--text-xs)", color: "var(--text-3)" }}>
                        {b.description}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
          <div className="row" style={{ gap: "var(--sp-2)", marginTop: "var(--sp-3)" }}>
            <Button size="sm" variant="ghost" onClick={() => {
              resetProgress();
              showToast({ tone: "danger", title: "Progreso reiniciado", message: "Todo el avance local se borró." });
            }}>
              Reiniciar progreso
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
