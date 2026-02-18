/**
 * Mejora whyIntro, profileRoles, businessAreas, etc. con contenido profesional al estilo power-bi.
 * Solo actualiza cursos que tengan el contenido genérico anterior.
 * Uso: node scripts/upgrade-courses-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COURSES_DIR = path.join(__dirname, '../src/content/courses');

function escapeYaml(str) {
  if (!str || typeof str !== 'string') return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

function getTopic(title) {
  const m = title.match(/Curso de (.+)/i) || title.match(/^(.+)$/);
  return m ? m[1].trim() : 'esta habilidad';
}

// Perfiles profesionales por categoría: 4 roles con detail; al menos uno con salary. { role, detail, salary? }
const PROFILE_ROLES = {
  programacion: (topic, tag1) => [
    { role: `Desarrollador con ${topic}`, detail: 'capaz de construir aplicaciones mantenibles y escalables para producción', salary: '$900–$2,500 USD/mes en LATAM' },
    { role: 'Candidato con stack actualizado', detail: 'con habilidades demandadas en vacantes de desarrollo frontend o backend', salary: '' },
    { role: 'Profesional listo para entrevistas técnicas', detail: 'con proyectos o certificación que demuestran dominio del tema', salary: '' },
    { role: 'Perfil diferenciado', detail: `con ${tag1 || topic} en el CV y experiencia práctica aplicable desde el día uno`, salary: '' },
  ],
  'inteligencia-artificial': (topic, tag1) => [
    { role: `Profesional que aplica ${topic}`, detail: 'capaz de integrar IA en productos, procesos o análisis de datos', salary: '$1,000–$3,000 USD/mes en LATAM' },
    { role: 'Candidato con skills en IA', detail: 'visible en búsquedas de reclutadores que filtran por inteligencia artificial', salary: '' },
    { role: 'Perfil actualizado', detail: 'con conocimientos en prompts, automatización o modelos aplicados al negocio', salary: '' },
    { role: 'Diferenciado en tecnología', detail: 'con evidencia de formación en IA que suma en cualquier rol técnico o de producto', salary: '' },
  ],
  datos: (topic, tag1) => [
    { role: 'Analista de datos o BI', detail: 'capaz de conectar fuentes, transformar datos y entregar reportes o dashboards accionables', salary: '$800–$2,200 USD/mes en LATAM' },
    { role: 'Creador de reportes', detail: 'que presenta información a gerencia, ventas o operaciones con claridad y métricas', salary: '' },
    { role: 'Perfil con base en datos', detail: 'que toma decisiones con evidencia y no con intuición', salary: '' },
    { role: 'Candidato demandado', detail: `con ${tag1 || topic} en vacantes de analytics, finanzas y operaciones`, salary: '' },
  ],
  idiomas: (topic, tag1) => [
    { role: 'Profesional con otro idioma', detail: 'capaz de reuniones, correos y presentaciones en un segundo idioma', salary: 'Mejor posición en ofertas que piden idioma' },
    { role: 'Candidato para equipos globales', detail: 'que puede trabajar con clientes o equipos internacionales sin barrera de idioma', salary: '' },
    { role: 'Perfil con certificación', detail: 'con nivel acreditado que puedes mostrar en CV y entrevistas', salary: '' },
    { role: 'Diferenciado en remoto', detail: 'con el idioma como ventaja en vacantes remotas y multinacionales', salary: '' },
  ],
  diseno: (topic, tag1) => [
    { role: `Diseñador o UX con ${topic}`, detail: 'capaz de entregar interfaces, prototipos o piezas visuales de nivel profesional', salary: '$700–$2,000 USD/mes en LATAM' },
    { role: 'Perfil producto o marketing', detail: 'que puede crear y comunicar propuestas visuales sin depender solo de terceros', salary: '' },
    { role: 'Candidato con portafolio', detail: 'con proyectos o certificación que demuestran manejo de herramientas de diseño', salary: '' },
    { role: 'Diferenciado', detail: `con ${tag1 || topic} en habilidades para roles de producto, marketing o desarrollo`, salary: '' },
  ],
  'devops-cloud': (topic, tag1) => [
    { role: 'Ingeniero DevOps o SRE', detail: 'capaz de desplegar, automatizar y mantener entornos estables y seguros', salary: '$1,000–$2,800 USD/mes en LATAM' },
    { role: 'Perfil con infraestructura como código', detail: 'que reduce tiempos de release y cuellos de botella en producción', salary: '' },
    { role: 'Candidato con stack moderno', detail: 'con habilidades en contenedores, CI/CD o cloud que piden la mayoría de vacantes técnicas', salary: '' },
    { role: 'Diferenciado en operaciones', detail: `con ${tag1 || topic} aplicable en startups y empresas de producto`, salary: '' },
  ],
  productividad: (topic, tag1) => [
    { role: 'Profesional que optimiza procesos', detail: 'capaz de organizar información, reportes y tareas con herramientas estándar', salary: '$600–$1,800 USD/mes según sector' },
    { role: 'Asistente o coordinador', detail: 'que entrega resultados ordenados y comunicados con claridad', salary: '' },
    { role: 'Candidato con oficina digital', detail: 'con habilidades en herramientas que piden administración y equipos', salary: '' },
    { role: 'Perfil eficiente', detail: `con ${tag1 || topic} para reducir tiempo en tareas repetitivas y enfocarse en valor`, salary: '' },
  ],
  negocios: (topic, tag1) => [
    { role: 'Gestor o líder de proyectos', detail: 'capaz de planificar, ejecutar y cerrar proyectos con metodologías reconocidas', salary: '$800–$2,200 USD/mes en LATAM' },
    { role: 'Profesional con enfoque en resultados', detail: 'que alinea equipos, métricas y entregas con los objetivos del negocio', salary: '' },
    { role: 'Candidato con certificación', detail: 'con formación que evidencia conocimiento en gestión, calidad u operaciones', salary: '' },
    { role: 'Diferenciado', detail: `con ${topic} aplicable en cualquier industria que requiera orden y mejora continua`, salary: '' },
  ],
};

// Business areas: 4-5 por categoría, estilo power-bi (solves + impact concretos)
const BUSINESS_AREAS = {
  programacion: [
    { area: 'Producto y startups', solves: 'Desarrollo de MVPs, features y aplicaciones web o móviles', impact: 'Lanzamientos más rápidos y equipos técnicos autosuficientes' },
    { area: 'Empresas y operaciones', solves: 'Sistemas internos, APIs e integración de datos', impact: 'Automatización y menos dependencia de proveedores externos' },
    { area: 'Ventas y marketing', solves: 'Landings, herramientas internas y reportes técnicos', impact: 'Cierre de brecha entre negocio y tecnología' },
    { area: 'Carrera técnica', solves: 'Portafolio, entrevistas técnicas y crecimiento en desarrollo', impact: 'Mejor posición salarial y oportunidades remotas' },
  ],
  'inteligencia-artificial': [
    { area: 'Producto y negocio', solves: 'Automatización de tareas, insights y mejora de procesos con IA', impact: 'Ventaja competitiva y eficiencia operativa' },
    { area: 'Desarrollo y tecnología', solves: 'Integración de modelos, APIs y flujos de IA en aplicaciones', impact: 'Soluciones innovadoras y diferenciadas' },
    { area: 'Datos y analytics', solves: 'Análisis predictivo, segmentación y reportes asistidos por IA', impact: 'Decisiones basadas en datos y menos tiempo manual' },
    { area: 'Marketing y contenido', solves: 'Personalización, generación de contenido y optimización de campañas', impact: 'Mejor ROI y escalabilidad' },
  ],
  datos: [
    { area: 'Ventas', solves: 'Dashboards de pipeline, conversión y forecast', impact: 'Reducción de ciclo de ventas y visibilidad en tiempo real' },
    { area: 'Finanzas', solves: 'Reportes de P&L, flujo de caja y presupuesto vs. real', impact: 'Cierre contable y reporting más rápido' },
    { area: 'Operaciones', solves: 'KPIs de producción, logística e inventario', impact: 'Detección de cuellos de botella y mejora continua' },
    { area: 'RRHH', solves: 'Análisis de rotación, headcount y costo por contratación', impact: 'Decisiones de talento basadas en datos' },
    { area: 'Marketing', solves: 'ROI de campañas, funnel y segmentación', impact: 'Optimización de presupuesto con datos' },
  ],
  idiomas: [
    { area: 'Equipos internacionales', solves: 'Comunicación en reuniones, correos y documentación', impact: 'Colaboración sin fricción y más proyectos globales' },
    { area: 'Atención al cliente', solves: 'Soporte y ventas en otro idioma', impact: 'Cobertura de mercados y clientes externos' },
    { area: 'Remoto y multinacionales', solves: 'Inglés u otro idioma como requisito en vacantes', impact: 'Acceso a ofertas que pagan en USD o EUR' },
    { area: 'Negocios y liderazgo', solves: 'Presentaciones, negociación y reportes para gerencia global', impact: 'Proyección internacional' },
  ],
  diseno: [
    { area: 'Producto y UX', solves: 'Interfaces, prototipos y experiencia de usuario', impact: 'Productos más usables y menos iteraciones costosas' },
    { area: 'Marketing y branding', solves: 'Piezas visuales, redes sociales y comunicación', impact: 'Imagen coherente y campañas más efectivas' },
    { area: 'Startups', solves: 'Mockups y validación visual antes de desarrollar', impact: 'Validación rápida y ahorro de desarrollo' },
    { area: 'Equipos internos', solves: 'Presentaciones, reportes y materiales de formación', impact: 'Comunicación clara y profesional' },
  ],
  'devops-cloud': [
    { area: 'Infraestructura', solves: 'Despliegues, entornos y configuración como código', impact: 'Menos fallos y releases más frecuentes' },
    { area: 'Seguridad', solves: 'Buenas prácticas, secretos y hardening de servicios', impact: 'Sistemas más seguros y cumplimiento' },
    { area: 'Equipos de desarrollo', solves: 'CI/CD, contenedores y entornos homogéneos', impact: 'Desarrollo y testing más rápido' },
    { area: 'Costos y escalabilidad', solves: 'Optimización de recursos en cloud y on-premise', impact: 'Control de gasto y crecimiento ordenado' },
  ],
  productividad: [
    { area: 'Administración y oficina', solves: 'Organización de datos, reportes y seguimiento de tareas', impact: 'Menos errores y entregas a tiempo' },
    { area: 'Finanzas y contabilidad', solves: 'Cálculos, presupuestos y presentación de números', impact: 'Cierres y reportes más rápidos' },
    { area: 'Equipos y proyectos', solves: 'Colaboración, cronogramas y visibilidad del trabajo', impact: 'Proyectos bajo control' },
    { area: 'Personal', solves: 'Gestión del tiempo y priorización', impact: 'Mejor enfoque y menos estrés' },
  ],
  negocios: [
    { area: 'Operaciones', solves: 'Procesos, estándares y mejora continua', impact: 'Resultados predecibles y menos desperdicio' },
    { area: 'Liderazgo', solves: 'Gestión de equipos, proyectos y métricas', impact: 'Equipos alineados y entregas claras' },
    { area: 'Estrategia', solves: 'Planificación, OKRs y seguimiento', impact: 'Decisiones informadas y ejecución ordenada' },
    { area: 'Calidad y cumplimiento', solves: 'Normativas, auditoría y documentación', impact: 'Cumplimiento y confianza de clientes' },
  ],
};

// whyIntro: introducción breve al campo laboral + por qué estudiarlo en 2026
// whyDetail: conexión directa con el intro (por eso / por ello) + qué aporta el curso
const WHY_INTRO_DETAIL = {
  programacion: (topic, tag1) => ({
    whyIntro: `El desarrollo de software sigue siendo uno de los campos con más ofertas y mejor proyección en LATAM. En 2026 las empresas priorizan stack actualizado y proyectos demostrables; sin ${topic} en tu CV, muchas vacantes técnicas te filtran desde el primer paso.`,
    whyDetail: `Por eso tiene sentido formarte ahora: este curso te lleva de cero a un nivel que puedes aplicar en el trabajo y mostrar en entrevistas o portafolio, con certificación opcional que respalda tu perfil.`,
  }),
  'inteligencia-artificial': (topic, tag1) => ({
    whyIntro: `La inteligencia artificial pasó de tendencia a requisito en producto, datos y desarrollo. En 2026 las empresas buscan perfiles que integren IA en procesos y decisiones, no solo quien la use de forma superficial.`,
    whyDetail: `Estudiarlo ahora te coloca en ese mercado: con este curso obtienes bases sólidas y aplicables, más una certificación que puedes sumar a tu CV para aparecer en las búsquedas que ya filtran por IA.`,
  }),
  datos: (topic, tag1) => ({
    whyIntro: `El análisis de datos y la inteligencia de negocio son el centro de las decisiones en empresas, finanzas y operaciones. En 2026 buscan profesionales que transformen datos en reportes y dashboards accionables, no solo Excel básico.`,
    whyDetail: `Formarte en ${topic} ahora te prepara para ese campo: este curso te lleva de cero a un nivel aplicable en análisis, visualización y presentación de datos, con certificación que respalda tu perfil.`,
  }),
  idiomas: (topic, tag1) => ({
    whyIntro: `Las ofertas remotas y en multinacionales exigen cada vez más un segundo idioma acreditado. En 2026, sin nivel demostrable o certificación, muchos candidatos quedan descartados en la primera filtrada.`,
    whyDetail: `Por eso conviene subir de nivel ahora: este curso te permite alcanzar y certificar tu dominio para el CV, de forma que puedas optar a vacantes que hoy piden idioma y pagan en USD o EUR.`,
  }),
  diseno: (topic, tag1) => ({
    whyIntro: `Producto, marketing y startups buscan perfiles que entreguen interfaces o piezas visuales sin depender siempre de terceros. En 2026, ${topic} sigue entre las habilidades más demandadas en roles de diseño y comunicación.`,
    whyDetail: `Estudiarlo ahora te acerca a ese campo laboral: con este curso pasas de cero a un nivel aplicable en proyectos reales y portafolio, con certificación opcional que puedes mostrar en tu CV.`,
  }),
  'devops-cloud': (topic, tag1) => ({
    whyIntro: `Infraestructura, despliegues y automatización son claves en equipos técnicos; en 2026 las empresas buscan perfiles que reduzcan tiempos de release y mantengan entornos estables y seguros.`,
    whyDetail: `Por eso formarte en ${topic} tiene sentido ahora: este curso te lleva de cero a un nivel aplicable en el trabajo y en entrevistas, con certificación opcional que respalda tu perfil en DevOps o cloud.`,
  }),
  productividad: (topic, tag1) => ({
    whyIntro: `Oficina, administración y equipos exigen manejo sólido de herramientas de productividad y datos. En 2026, sin esas habilidades, se pierde tiempo en tareas repetitivas y reportes manuales que restan foco al valor.`,
    whyDetail: `Estudiarlo ahora te prepara para ese entorno: con este curso alcanzas un nivel profesional en ${topic} que puedes aplicar desde el primer día y certificar para tu CV.`,
  }),
  negocios: (topic, tag1) => ({
    whyIntro: `La gestión de proyectos, calidad y operaciones mueve las empresas; en 2026 las vacantes piden metodologías y enfoques reconocidos, no solo experiencia informal.`,
    whyDetail: `Por eso tiene sentido formarte ahora: este curso te da bases sólidas en ${topic} y una certificación que puedes mostrar en tu CV para acceder a roles de gestión, calidad u operaciones.`,
  }),
};

function generateProfessionalContent(data) {
  const topic = getTopic(data.title || '');
  const tag1 = (data.tags && data.tags[0]) || topic;
  const cat = data.category || 'programacion';
  const introDetail = (WHY_INTRO_DETAIL[cat] || WHY_INTRO_DETAIL.programacion)(topic, tag1);
  const whyIntro = introDetail.whyIntro;
  const whyDetail = introDetail.whyDetail;

  const linkedinTip = `Los perfiles con "${tag1}" en LinkedIn reciben más visualizaciones en búsquedas de reclutadores. Añade esta habilidad y empieza a aparecer en ofertas que la piden.`;

  const concreteResult = `Pasas de no tener experiencia formal en ${topic} a poder incluirlo en tu CV, hablar con propiedad en entrevistas y aplicarlo en proyectos reales.`;

  const closingCTA = `Las empresas que buscan este perfil ya publican vacantes. La pregunta es si tu CV lo refleja.`;

  const roles = (PROFILE_ROLES[cat] || PROFILE_ROLES.programacion)(topic, tag1);
  const areas = BUSINESS_AREAS[cat] || BUSINESS_AREAS.programacion;

  const profileRolesYaml = roles
    .map((r) => `  - role: ${escapeYaml(r.role)}\n    detail: ${escapeYaml(r.detail)}${r.salary ? `\n    salary: ${escapeYaml(r.salary)}` : ''}`)
    .join('\n');

  const businessAreasYaml = areas
    .map((a) => `  - area: ${escapeYaml(a.area)}\n    solves: ${escapeYaml(a.solves)}\n    impact: ${escapeYaml(a.impact)}`)
    .join('\n');

  return {
    whyIntro: escapeYaml(whyIntro),
    whyDetail: escapeYaml(whyDetail),
    linkedinTip: escapeYaml(linkedinTip),
    concreteResult: escapeYaml(concreteResult),
    closingCTA: escapeYaml(closingCTA),
    profileRolesYaml,
    businessAreasYaml,
  };
}

function extractSimpleData(frontmatter) {
  const data = {};
  const titleM = frontmatter.match(/(?:^|\n)title:\s*['"]([^'"]*)['"]/);
  const descM = frontmatter.match(/(?:^|\n)description:\s*['"]([^'"]*)['"]/);
  const catM = frontmatter.match(/(?:^|\n)category:\s*['"]?([a-z0-9-]+)['"]?/);
  const tagsM = frontmatter.match(/(?:^|\n)tags:\s*\[([^\]]*)\]/);
  if (titleM) data.title = titleM[1];
  if (descM) data.description = descM[1];
  if (catM) data.category = catM[1];
  if (tagsM) data.tags = tagsM[1].match(/['"]([^'"]+)['"]/g)?.map((t) => t.replace(/['"]/g, '')) || [];
  return data;
}

function hasGenericContent(frontmatter) {
  return (
    /whyIntro:\s*['"]/.test(frontmatter) &&
    (
      /whyDetail:\s*['"].*Este curso te lleva de cero a un nivel que puedes aplicar/.test(frontmatter) ||
      /whyIntro:\s*['"].*Este curso te permite sumar/.test(frontmatter) ||
      /whyIntro:\s*['"].*Sin (esta habilidad|Angular|Docker)/.test(frontmatter) ||
      /role:\s*['"]Profesional con este tema['"]/.test(frontmatter) ||
      /Desarrollador con (esta habilidad|Angular)/.test(frontmatter)
    )
  );
}

function upgradeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return false;
  const [, frontmatter, body] = match;
  if (!/^\s*whyIntro:\s/m.test(frontmatter)) return false;
  if (!hasGenericContent(frontmatter)) return false;

  const data = extractSimpleData(frontmatter);
  const fields = generateProfessionalContent(data);

  const newBlock = `
whyIntro: ${fields.whyIntro}
whyDetail: ${fields.whyDetail}
profileRoles:
${fields.profileRolesYaml}
linkedinTip: ${fields.linkedinTip}
businessAreas:
${fields.businessAreasYaml}
concreteResult: ${fields.concreteResult}
closingCTA: ${fields.closingCTA}
`;

  const oldBlockMatch = frontmatter.match(/\n(whyIntro:\s*[^\n]+[\s\S]*?closingCTA:\s*[^\n]+)\n/);
  if (!oldBlockMatch) return false;

  const newFrontmatter = frontmatter.replace(/\nwhyIntro:\s*[^\n]+[\s\S]*?closingCTA:\s*[^\n]+\n/, newBlock + '\n');
  const newRaw = `---\n${newFrontmatter}---\n${body}`;
  fs.writeFileSync(filePath, newRaw, 'utf-8');
  return true;
}

const files = fs.readdirSync(COURSES_DIR).filter((f) => f.endsWith('.md'));
let done = 0;
for (const f of files) {
  const full = path.join(COURSES_DIR, f);
  if (upgradeFile(full)) {
    done++;
    console.log('Actualizado:', f);
  }
}
console.log('\nTotal actualizados:', done, 'de', files.length);
