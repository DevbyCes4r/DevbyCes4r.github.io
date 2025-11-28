// Category definitions for course classification
export const COURSE_CATEGORIES = {
    'programacion': {
        name: 'Programación',
        icon: '💻',
        description: 'Desarrollo web, móvil y software'
    },
    'inteligencia-artificial': {
        name: 'Inteligencia Artificial',
        icon: '🤖',
        description: 'IA, Machine Learning y herramientas'
    },
    'datos': {
        name: 'Datos',
        icon: '📊',
        description: 'Bases de datos, Data Science y Analytics'
    },
    'idiomas': {
        name: 'Idiomas',
        icon: '🌐',
        description: 'Inglés y otros idiomas'
    },
    'diseno': {
        name: 'Diseño',
        icon: '🎨',
        description: 'UI/UX y diseño gráfico'
    },
    'devops-cloud': {
        name: 'DevOps & Cloud',
        icon: '🚀',
        description: 'Escalabilidad, seguridad e infraestructura'
    },
    'productividad': {
        name: 'Productividad',
        icon: '📈',
        description: 'Ofimática, herramientas y habilidades profesionales'
    },
    'negocios': {
        name: 'Negocios',
        icon: '💼',
        description: 'Marketing, gestión y emprendimiento'
    }
} as const;

export type CategoryKey = keyof typeof COURSE_CATEGORIES;
