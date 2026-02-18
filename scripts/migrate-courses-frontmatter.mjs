/**
 * Añade la estructura de frontmatter tipo power-bi (whyIntro, whyDetail, profileRoles,
 * linkedinTip, businessAreas, concreteResult, closingCTA) a cursos que no la tienen.
 * Uso: node scripts/migrate-courses-frontmatter.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COURSES_DIR = path.join(__dirname, '../src/content/courses');

const CATEGORY_AREAS = {
  programacion: [
    { area: 'Desarrollo web', solves: 'Aplicaciones y sitios mantenibles', impact: 'Entregas más rápidas y código de calidad' },
    { area: 'Startups y productos', solves: 'Prototipos y MVPs técnicos', impact: 'Validación de ideas con menos coste' },
    { area: 'Empresas', solves: 'Sistemas internos y APIs', impact: 'Automatización y escalabilidad' },
  ],
  'inteligencia-artificial': [
    { area: 'Producto y negocio', solves: 'Automatización e insights con IA', impact: 'Ventaja competitiva y eficiencia' },
    { area: 'Tecnología', solves: 'Modelos e integración de IA', impact: 'Soluciones innovadoras' },
    { area: 'Datos', solves: 'Análisis y predicción', impact: 'Decisiones basadas en datos' },
  ],
  datos: [
    { area: 'Finanzas', solves: 'Reportes y pronósticos', impact: 'Decisiones con datos' },
    { area: 'Operaciones', solves: 'KPIs y métricas', impact: 'Mejora continua' },
    { area: 'Marketing', solves: 'Segmentación y ROI', impact: 'Optimización de campañas' },
  ],
  idiomas: [
    { area: 'Internacional', solves: 'Comunicación con equipos y clientes', impact: 'Más oportunidades laborales' },
    { area: 'Remoto', solves: 'Reuniones y correos en otro idioma', impact: 'Trabajo sin fronteras' },
    { area: 'Negocios', solves: 'Presentaciones y negociación', impact: 'Crecimiento profesional' },
  ],
  diseno: [
    { area: 'Producto', solves: 'Interfaces y experiencia de usuario', impact: 'Productos más usables' },
    { area: 'Marketing', solves: 'Piezas visuales y branding', impact: 'Comunicación efectiva' },
    { area: 'Startups', solves: 'Prototipos y mockups', impact: 'Validación visual rápida' },
  ],
  'devops-cloud': [
    { area: 'Infraestructura', solves: 'Despliegues y entornos estables', impact: 'Menos fallos y más velocidad' },
    { area: 'Seguridad', solves: 'Configuración y buenas prácticas', impact: 'Sistemas más seguros' },
    { area: 'Equipos', solves: 'CI/CD y automatización', impact: 'Releases frecuentes' },
  ],
  productividad: [
    { area: 'Oficina', solves: 'Organización y reportes', impact: 'Más eficiencia' },
    { area: 'Equipos', solves: 'Colaboración y seguimiento', impact: 'Proyectos bajo control' },
    { area: 'Personal', solves: 'Gestión del tiempo y tareas', impact: 'Mejor enfoque' },
  ],
  negocios: [
    { area: 'Operaciones', solves: 'Procesos y mejora continua', impact: 'Resultados predecibles' },
    { area: 'Liderazgo', solves: 'Gestión de equipos y proyectos', impact: 'Equipos más efectivos' },
    { area: 'Estrategia', solves: 'Planificación y métricas', impact: 'Decisiones informadas' },
  ],
};

function escapeYaml(str) {
  if (!str || typeof str !== 'string') return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

function getTopic(title) {
  const m = title.match(/Curso de (.+)/i) || title.match(/^(.+)$/);
  return m ? m[1].trim() : 'este tema';
}

function generateStructuredFields(data) {
  const topic = getTopic(data.title || '');
  const desc = (data.description || '').slice(0, 120);
  const cat = data.category || 'programacion';
  const areas = CATEGORY_AREAS[cat] || CATEGORY_AREAS.programacion;
  const tag1 = (data.tags && data.tags[0]) || topic;

  const whyIntro = `Las empresas buscan profesionales con conocimientos en ${topic}. Este curso te permite sumar esta habilidad de forma práctica y con certificación opcional.`;
  const descTrim = desc.length > 115 ? desc.slice(0, 115).replace(/\s+\S*$/, '') : desc;
  const whyDetail = desc ? `${descTrim} Con este curso puedes aplicar lo aprendido desde el primer día.` : `Este curso de ${topic} te lleva de cero a un nivel aplicable en el trabajo o en tu portafolio.`;
  const linkedinTip = `Añade "${tag1}" en las habilidades de tu perfil de LinkedIn para aparecer en búsquedas de reclutadores.`;
  const concreteResult = `Pasas de no tener experiencia formal en ${topic} a poder incluirlo en tu CV y en entrevistas con bases sólidas.`;
  const closingCTA = `El curso es gratis y tiene certificado opcional. Si tu objetivo es crecer en este ámbito, este es un buen punto de partida.`;

  const profileRoles = [
    { role: `Profesional con ${topic}`, detail: 'capaz de aplicar lo aprendido en proyectos reales', salary: '' },
    { role: 'Candidato con formación certificada', detail: `con evidencia de aprendizaje en ${topic}`, salary: '' },
  ];

  const businessAreasYaml = areas
    .map((a) => `  - area: ${escapeYaml(a.area)}\n    solves: ${escapeYaml(a.solves)}\n    impact: ${escapeYaml(a.impact)}`)
    .join('\n');

  const profileRolesYaml = profileRoles
    .map((r) => `  - role: ${escapeYaml(r.role)}\n    detail: ${escapeYaml(r.detail)}${r.salary ? `\n    salary: ${escapeYaml(r.salary)}` : ''}`)
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
  const titleM = frontmatter.match(/\ntitle:\s*['"]([^'"]*)['"]/);
  const descM = frontmatter.match(/\ndescription:\s*['"]([^'"]*)['"]/);
  const catM = frontmatter.match(/\ncategory:\s*['"]?([a-z0-9-]+)['"]?/);
  const tagsM = frontmatter.match(/\ntags:\s*\[([^\]]*)\]/);
  if (titleM) data.title = titleM[1];
  if (descM) data.description = descM[1];
  if (catM) data.category = catM[1];
  if (tagsM) data.tags = tagsM[1].match(/['"]([^'"]+)['"]/g)?.map((t) => t.replace(/['"]/g, '')) || [];
  return data;
}

function migrateFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return false;
  const [, frontmatter, body] = match;
  if (/^\s*whyIntro:\s/m.test(frontmatter)) return false;

  const data = extractSimpleData(frontmatter);
  const fields = generateStructuredFields(data);

  const insert = `

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
  const newRaw = raw.replace(/\n---\r?\n([\s\S]*)$/, (_, after) => insert + '\n---\n' + after);
  fs.writeFileSync(filePath, newRaw, 'utf-8');
  return true;
}

const files = fs.readdirSync(COURSES_DIR).filter((f) => f.endsWith('.md'));
let done = 0;
for (const f of files) {
  const full = path.join(COURSES_DIR, f);
  if (migrateFile(full)) {
    done++;
    console.log('Migrado:', f);
  }
}
console.log('\nTotal migrados:', done, 'de', files.length);
