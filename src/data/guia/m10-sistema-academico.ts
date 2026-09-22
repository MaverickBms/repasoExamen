import type { Module } from "../types";
import {
  cb,
  items,
  makeSectionBuilder,
  p,
} from "./helpers";

const ref = makeSectionBuilder("m10-sistema-academico", 10);

const UML_SISTEMA = `classDiagram
    class Persona {
        <<abstract>>
        #String nombre
        #String id
        +getNombre() String
    }
    class Estudiante {
        -List~Inscripcion~ inscripciones
        +inscribir(Curso) void
        +calcularPromedio() double
    }
    class Profesor {
        -String especialidad
        +impartir(Curso) void
    }
    class Curso {
        -String codigo
        -String nombre
        -List~Estudiante~ estudiantes
        +inscribir(Estudiante) void
    }
    class Inscripcion {
        -Estudiante estudiante
        -Curso curso
        -List~Double~ notas
        +agregarNota(double) void
        +promedio() double
    }
    class Evaluable {
        <<interface>>
        +calcularPromedio() double
    }

    Persona <|-- Estudiante
    Persona <|-- Profesor
    Evaluable <|.. Estudiante
    Estudiante "1" --> "*" Inscripcion
    Curso "1" --> "*" Inscripcion
    Profesor "1" --> "*" Curso : imparte`;

const CODIGO_SISTEMA = `// ===== Abstracción =====
public abstract class Persona {
    protected final String nombre;
    protected final String id;

    public Persona(String nombre, String id) {
        if (nombre == null || nombre.isBlank()) throw new IllegalArgumentException();
        this.nombre = nombre;
        this.id = id;
    }

    public String getNombre() { return nombre; }
    public String getId() { return id; }
}

// ===== Interface =====
public interface Evaluable {
    double calcularPromedio();
}

// ===== Especialización =====
public class Estudiante extends Persona implements Evaluable {
    private final List<Inscripcion> inscripciones = new ArrayList<>();

    public Estudiante(String nombre, String id) { super(nombre, id); }

    public void inscribir(Curso curso) {
        if (curso == null) throw new IllegalArgumentException();
        Inscripcion i = new Inscripcion(this, curso);
        inscripciones.add(i);
        curso.inscribir(this);
    }

    public List<Inscripcion> getInscripciones() { return List.copyOf(inscripciones); }

    @Override
    public double calcularPromedio() {
        return inscripciones.stream()
            .mapToDouble(Inscripcion::promedio)
            .average()
            .orElse(0.0);
    }
}

public class Profesor extends Persona {
    private final String especialidad;
    private final List<Curso> cursos = new ArrayList<>();

    public Profesor(String nombre, String id, String especialidad) {
        super(nombre, id);
        this.especialidad = especialidad;
    }

    public void impartir(Curso curso) {
        cursos.add(curso);
        curso.asignarProfesor(this);
    }

    public String getEspecialidad() { return especialidad; }
}

// ===== Asociación bidireccional =====
public class Curso {
    private final String codigo;
    private final String nombre;
    private Profesor profesor;
    private final List<Estudiante> estudiantes = new ArrayList<>();

    public Curso(String codigo, String nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }

    public void asignarProfesor(Profesor p) { this.profesor = p; }
    public void inscribir(Estudiante e) { estudiantes.add(e); }
    public String getCodigo() { return codigo; }
    public String getNombre() { return nombre; }
    public List<Estudiante> getEstudiantes() { return List.copyOf(estudiantes); }
}

// ===== Asociación con estado propio =====
public class Inscripcion {
    private final Estudiante estudiante;
    private final Curso curso;
    private final List<Double> notas = new ArrayList<>();

    public Inscripcion(Estudiante estudiante, Curso curso) {
        this.estudiante = estudiante;
        this.curso = curso;
    }

    public void agregarNota(double nota) {
        if (nota < 0 || nota > 5) throw new IllegalArgumentException();
        notas.add(nota);
    }

    public double promedio() {
        return notas.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    public Estudiante getEstudiante() { return estudiante; }
    public Curso getCurso() { return curso; }
}`;

const EJECUCION_CONCEPTUAL = `Profesor prof = new Profesor("Dr. García", "P001", "Matemáticas");
Curso calculo = new Curso("MAT101", "Cálculo I");
prof.impartir(calculo);

Estudiante ana = new Estudiante("Ana", "E001");
Estudiante luis = new Estudiante("Luis", "E002");
ana.inscribir(calculo);
luis.inscribir(calculo);

ana.getInscripciones().get(0).agregarNota(4.5);
ana.getInscripciones().get(0).agregarNota(4.0);
luis.getInscripciones().get(0).agregarNota(3.5);

// Polimorfismo
List<Evaluable> evaluables = List.of(ana, luis);
for (Evaluable e : evaluables) {
    System.out.println("Promedio: " + e.calcularPromedio());
}`;

export const M10_SISTEMA_ACADEMICO: Module = {
  id: "m10-sistema-academico",
  chapter: 10,
  title: "Sistema Integrador: Sistema Académico",
  subtitle: "Un sistema Java completo que pone en acción los cuatro pilares — guiaPOO.md · capítulo 10",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "El capítulo integrador modela un **Sistema Académico** con `Persona`, `Estudiante`, `Profesor`, `Curso`, `Inscripcion` y la interfaz `Evaluable`. Recorre el flujo completo: requerimiento, identificación de clases, diagrama UML, relaciones, código Java, ejecución conceptual, los cuatro pilares en acción y el análisis de decisiones de diseño.",
    ),
  ],
  sections: [
    ref("10.1", "Requerimiento conceptual", "2123–2129", {
      concept: [
        p("Diseñar un sistema que gestione:"),
        items([
          "**Personas** (estudiantes, profesores).",
          "**Cursos** impartidos por profesores.",
          "**Inscripciones** de estudiantes en cursos.",
          "Cálculo de **promedios**.",
        ]),
      ],
    }),

    ref("10.2", "Identificación de clases", "2132–2139", {
      concept: [
        items([
          "`Persona` (abstracta) — base.",
          "`Estudiante` — hereda de `Persona`.",
          "`Profesor` — hereda de `Persona`.",
          "`Curso` — compuesto por contenido propio; asociado a un `Profesor`.",
          "`Inscripcion` — vincula a un `Estudiante` con un `Curso`.",
          "`Evaluable` (interfaz) — define `calcularPromedio()`.",
        ]),
      ],
    }),

    ref("10.3", "Diagrama UML", "2141–2184", {
      concept: [
        p("Diagrama de clases completo del sistema (guía, renderizado en FASE 4):"),
      ],
      codeBlocks: [
        cb("m10-s103-c1", { chapter: 10, section: "10.3", lines: "2143–2184" }, UML_SISTEMA, "text", {
          title: "Mermaid — Diagrama del sistema (guía)",
        }),
      ],
    }),

    ref("10.4", "Relaciones", "2186–2191", {
      concept: [
        items([
          "**Herencia**: `Estudiante`, `Profesor` → `Persona`.",
          "**Realización**: `Estudiante` implementa `Evaluable`.",
          "**Asociación**: `Inscripcion` ↔ `Estudiante`, `Inscripcion` ↔ `Curso`.",
          "**Agregación**: `Profesor ◇— Curso` (un profesor puede dejar de impartir sin destruir el curso).",
        ]),
      ],
    }),

    ref("10.5", "Código Java", "2193–2299", {
      concept: [
        p("Implementación completa del sistema en Java (guía, §10.5):"),
      ],
      codeBlocks: [
        cb("m10-s105-c1", { chapter: 10, section: "10.5", lines: "2195–2299" }, CODIGO_SISTEMA, "java", {
          title: "Sistema Académico — Persona, Evaluable, Estudiante, Profesor, Curso, Inscripcion",
        }),
      ],
    }),

    ref("10.6", "Ejecución conceptual", "2301–2322", {
      concept: [
        p("Ejecución paso a paso del sistema (guía, §10.6):"),
      ],
      codeBlocks: [
        cb("m10-s106-c1", { chapter: 10, section: "10.6", lines: "2303–2322" }, EJECUCION_CONCEPTUAL, "java", {
          title: "Demo del sistema",
        }),
      ],
    }),

    ref("10.7", "Los cuatro pilares en acción", "2324–2329", {
      concept: [
        items([
          "**Abstracción**: `Persona` y `Evaluable` definen contratos.",
          "**Encapsulamiento**: atributos `private`/`protected final`, validaciones.",
          "**Herencia**: `Estudiante`, `Profesor` extienden `Persona`.",
          "**Polimorfismo**: `List<Evaluable>` opera sobre cualquier implementación.",
        ]),
      ],
    }),

    ref("10.8", "Análisis de decisiones de diseño", "2331–2336", {
      concept: [
        items([
          "**`Persona` es abstracta** porque no tiene sentido instanciarla directamente.",
          "**`Evaluable` es interfaz** porque es una **capacidad** («puede ser evaluado»), no una identidad.",
          "**`Inscripcion` es una clase intermedia** (patrón clásico) porque la relación Estudiante–Curso tiene **estado propio** (notas).",
          "**Asociación bidireccional** entre `Curso` y `Estudiante` para navegar en ambos sentidos; conviene mantenerla consistente.",
        ], true),
      ],
    }),
  ],
};