// Study Plans definitions for course organization
export const STUDY_PLANS = {
    'web-developer': {
        title: 'Web Developer',
        description: 'Conviértete en desarrollador web full-stack con este plan curado de 10 cursos gratuitos. Aprende desde HTML y CSS hasta frameworks modernos y bases de datos.',
        icon: '💻',
        group: 'Web Developer',
        order: 1,
        objectives: [
            'Dominar HTML, CSS y JavaScript desde cero',
            'Aprender frameworks modernos como React y Vue',
            'Construir aplicaciones web completas y funcionales',
            'Trabajar con bases de datos y APIs'
        ],
        faqs: [
            {
                question: '¿Cuánto tiempo toma completar este plan de estudio?',
                answer: 'Aproximadamente 3-6 meses estudiando de 2 a 3 horas diarias. El tiempo puede variar según tu ritmo de aprendizaje y experiencia previa.'
            },
            {
                question: '¿Necesito experiencia previa en programación?',
                answer: 'No, este plan está diseñado para principiantes. Comenzarás desde los fundamentos y avanzarás gradualmente.'
            },
            {
                question: '¿Qué proyectos podré crear al finalizar?',
                answer: 'Podrás crear sitios web completos, aplicaciones web interactivas, portfolios profesionales y aplicaciones con bases de datos.'
            }
        ]
    },
    'inteligencia-artificial': {
        title: 'Inteligencia Artificial',
        description: 'Domina la inteligencia artificial desde cero con estos 5 cursos especializados. Aprende Machine Learning, Deep Learning y aplicaciones prácticas de IA.',
        icon: '🤖',
        group: 'Inteligencia Artificial',
        order: 2,
        objectives: [
            'Entender los fundamentos de IA y Machine Learning',
            'Aplicar IA con Python y bibliotecas especializadas',
            'Crear proyectos de IA y modelos de ML',
            'Implementar soluciones de Deep Learning'
        ],
        faqs: [
            {
                question: '¿Necesito experiencia previa en programación?',
                answer: 'Se recomienda tener conocimientos básicos de Python, aunque algunos cursos comienzan desde cero. La experiencia en matemáticas también es útil.'
            },
            {
                question: '¿Qué herramientas aprenderé a usar?',
                answer: 'Aprenderás a usar Python, TensorFlow, PyTorch, scikit-learn y otras bibliotecas populares de IA y Machine Learning.'
            },
            {
                question: '¿Puedo conseguir trabajo después de estos cursos?',
                answer: 'Estos cursos te dan una base sólida. Para roles profesionales, se recomienda complementar con proyectos personales y práctica continua.'
            }
        ]
    },
    'analista-datos': {
        title: 'Analistas de Datos y DBA',
        description: 'Conviértete en analista de datos o administrador de bases de datos con este plan completo. Domina SQL, bases de datos y herramientas de análisis.',
        icon: '📊',
        group: 'Analistas de Datos y DBA',
        order: 3,
        objectives: [
            'Dominar SQL y consultas complejas',
            'Administrar bases de datos relacionales y NoSQL',
            'Realizar análisis de datos y visualizaciones',
            'Usar herramientas como Power BI y Excel avanzado'
        ],
        faqs: [
            {
                question: '¿Qué bases de datos aprenderé?',
                answer: 'Aprenderás MySQL, SQL Server, Oracle, MongoDB y Redis, cubriendo tanto bases de datos relacionales como NoSQL.'
            },
            {
                question: '¿Incluye visualización de datos?',
                answer: 'Sí, el plan incluye Power BI para crear dashboards y visualizaciones profesionales de datos.'
            },
            {
                question: '¿Es suficiente para trabajar como DBA?',
                answer: 'Estos cursos te dan una base sólida. Para roles de DBA senior, se recomienda experiencia práctica y certificaciones adicionales.'
            }
        ]
    },
    'ingles': {
        title: 'Ruta de Ingles desde principiante a avanzado',
        description: 'Aprende inglés desde nivel básico hasta avanzado con este plan estructurado. Mejora tu gramática, vocabulario y conversación.',
        icon: '🌐',
        group: 'Ruta Completa Ingles Cero a C1',
        order: 4,
        objectives: [
            'Dominar gramática y vocabulario desde A1 hasta C2',
            'Mejorar habilidades de conversación y comprensión',
            'Prepararse para certificaciones internacionales',
            'Alcanzar fluidez en inglés profesional'
        ],
        faqs: [
            {
                question: '¿Desde qué nivel puedo empezar?',
                answer: 'Tenemos cursos desde nivel A1 (principiante absoluto) hasta C2 (maestría). Puedes comenzar desde el nivel que mejor se adapte a ti.'
            },
            {
                question: '¿Los cursos preparan para certificaciones?',
                answer: 'Sí, los cursos cubren el contenido necesario para certificaciones como TOEFL, IELTS y Cambridge, aunque se recomienda práctica adicional específica.'
            },
            {
                question: '¿Cuánto tiempo toma alcanzar fluidez?',
                answer: 'Depende de tu nivel inicial y dedicación. Desde cero hasta nivel B2 puede tomar 1-2 años con estudio constante de 1-2 horas diarias.'
            }
        ]
    }
} as const;

export type StudyPlanKey = keyof typeof STUDY_PLANS;

// Helper to get plan by group key
export function getPlanByGroup(group: string): StudyPlanKey | null {
    const entry = Object.entries(STUDY_PLANS).find(([_, plan]) => plan.group === group);
    return entry ? entry[0] as StudyPlanKey : null;
}
