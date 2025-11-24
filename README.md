# 🚀 Blog y Linktree con Astro - SEO Optimizado

Proyecto completo de Astro optimizado para SEO tradicional y SEO para IA (LLMs), perfecto para blogs de contenido y linktree de afiliados.

## 📋 Características

### SEO Tradicional ✅
- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Sitemap XML automático
- ✅ RSS Feed
- ✅ robots.txt optimizado
- ✅ Canonical URLs
- ✅ Schema.org structured data (JSON-LD)
- ✅ Breadcrumbs
- ✅ URLs amigables
- ✅ Imágenes optimizadas con lazy loading
- ✅ Performance optimizado (100/100 Lighthouse)

### SEO para IA (LLMs) 🤖
- ✅ Structured data avanzado
- ✅ Meta tags específicos para crawlers de IA
- ✅ FAQs con schema markup
- ✅ Contenido semántico bien estructurado
- ✅ Entidades y conceptos claramente definidos
- ✅ Dublin Core metadata
- ✅ Breadcrumbs semánticos
- ✅ RSS enriquecido para IA
- ✅ robots.txt con permisos para bots de IA

### Funcionalidades ⚡
- Blog con sistema de categorías y tags
- Linktree para afiliados
- Cards de productos/cursos
- Newsletter integration ready
- Dark mode
- Responsive design
- TypeScript
- Tailwind CSS

## 🛠️ Instalación

### Requisitos Previos
- Node.js 18+ 
- npm, pnpm o yarn

### Pasos de Instalación

```bash
# 1. Clonar o crear el proyecto
npm create astro@latest mi-blog-afiliados
cd mi-blog-afiliados

# 2. Instalar dependencias
npm install

# 3. Instalar integraciones
npm install @astrojs/sitemap @astrojs/rss
npm install -D @astrojs/tailwind tailwindcss

# 4. Añadir integraciones
npx astro add tailwind
npx astro add sitemap

# 5. Iniciar desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 📁 Estructura del Proyecto

```
/
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   ├── robots.txt
│   └── images/
│       ├── blog/
│       └── packs/
├── src/
│   ├── components/
│   │   └── PackCard.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       └── ejemplo-post.md
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   └── index.astro
│   │   └── rss.xml.ts
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── seo.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## ⚙️ Configuración

### 1. Configurar tu Dominio

Edita `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://tudominio.com', // ⚠️ CAMBIAR AQUÍ
  // ...
});
```

### 2. Configurar Información Personal

Edita los siguientes archivos:

**src/layouts/BaseLayout.astro**:
- Línea 44: Cambia `author = 'Tu Nombre'`
- Línea 79: Cambia `'@tuusuario'`

**src/pages/index.astro**:
- Líneas 6-65: Actualiza información de packs
- Líneas 67-72: Actualiza links sociales

### 3. Añadir tus Imágenes

Coloca las imágenes en:
- `/public/logo.png` - Logo principal (96x96px)
- `/public/favicon.svg` - Favicon
- `/public/images/blog/` - Imágenes de posts
- `/public/images/packs/` - Imágenes de packs

### 4. Crear tu Primer Post

Crea un archivo en `src/content/blog/mi-primer-post.md`:

```markdown
---
title: 'Mi Primer Post'
description: 'Esta es la descripción de mi post'
publishDate: 2025-01-15
author: 'Tu Nombre'
image: '/images/blog/mi-post.jpg'
categories: ['JavaScript']
tags: ['tutorial', 'web dev']
featured: true
readingTime: '5 min lectura'
---

## Tu contenido aquí

Escribe tu artículo en Markdown...
```

## 🚀 Deployment

### Opción 1: Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Seguir las instrucciones
```

O conecta tu repo de GitHub a Vercel para deploy automático.

### Opción 2: Netlify

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod
```

### Opción 3: Cloudflare Pages

1. Push tu código a GitHub
2. Ve a Cloudflare Pages
3. Conecta tu repositorio
4. Build command: `npm run build`
5. Output directory: `dist`

### Configuración de Build

Para producción, asegúrate de:

```bash
# Build optimizado
npm run build

# Preview local del build
npm run preview
```

## 📊 SEO Checklist

### Antes de Publicar

- [ ] Configurar dominio en `astro.config.mjs`
- [ ] Actualizar información personal en layouts
- [ ] Añadir Google Analytics/Plausible
- [ ] Crear `sitemap.xml` (automático con @astrojs/sitemap)
- [ ] Verificar robots.txt
- [ ] Probar meta tags con https://metatags.io
- [ ] Verificar Schema.org con https://validator.schema.org
- [ ] Probar en Google Rich Results Test
- [ ] Verificar performance en Lighthouse
- [ ] Configurar Google Search Console
- [ ] Configurar Bing Webmaster Tools
- [ ] Añadir verificación de sitio (meta tags)

### Meta Verificaciones

```html
<!-- Añadir en BaseLayout.astro -->
<meta name="google-site-verification" content="tu-codigo-aqui">
<meta name="msvalidate.01" content="tu-codigo-aqui">
```

## 🤖 Optimización SEO IA

### Permitir Bots de IA

El archivo `robots.txt` ya incluye permisos para:
- GPTBot (ChatGPT)
- Claude-Web
- PerplexityBot
- Google-Extended
- CCBot
- Bytespider

### Structured Data

Cada página incluye:
- JSON-LD schema apropiado
- FAQs con schema markup
- Breadcrumbs semánticos
- Article schema para posts
- Course schema para packs

### Contenido Semántico

Los posts deben incluir:
```markdown
---
# ... otros campos
faqs:
  - question: '¿Pregunta 1?'
    answer: 'Respuesta detallada'
  - question: '¿Pregunta 2?'
    answer: 'Respuesta detallada'
---
```

## 📝 Mejores Prácticas

### Para Posts de Blog

1. **Títulos**: 50-60 caracteres, incluir palabra clave
2. **Descripción**: 150-160 caracteres, call-to-action
3. **URLs**: Cortas, descriptivas, con guiones
4. **Imágenes**: Optimizadas, con alt text descriptivo
5. **Headers**: Estructura H1 > H2 > H3 lógica
6. **Links internos**: 2-3 por post
7. **Reading time**: Calcular e incluir
8. **FAQs**: Al menos 3 preguntas relevantes

### Para Packs/Productos

1. **Schema Course**: Incluir precio, descripción, proveedor
2. **Reviews**: Añadir si tienes testimonios
3. **Ratings**: Schema de calificación
4. **Availability**: Marcar disponibilidad
5. **Call-to-action**: Claro y visible

## 🔧 Mantenimiento

### Actualizar Contenido

```bash
# 1. Crear nuevo post
touch src/content/blog/nuevo-post.md

# 2. Editar contenido

# 3. Build y deploy
npm run build
git add .
git commit -m "Nuevo post: título"
git push
```

### Monitoreo

- Google Search Console: Semanal
- Analytics: Diario
- Performance: Mensual con Lighthouse
- Broken links: Mensual
- Schema validation: Al añadir nuevos tipos

## 🐛 Troubleshooting

### Build Falla

```bash
# Limpiar cache
rm -rf .astro node_modules
npm install
npm run build
```

### Sitemap no se genera

Verifica `astro.config.mjs`:
```javascript
integrations: [sitemap()]
```

### Images no cargan

Verifica rutas:
- En `public/`: `/image.jpg`
- En `src/`: `@/assets/image.jpg`

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Schema.org](https://schema.org)
- [Google Search Central](https://developers.google.com/search)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch
3. Commit tus cambios
4. Push al branch
5. Abre un Pull Request

## 📄 Licencia

MIT License - siéntete libre de usar este proyecto.

## 💬 Soporte

¿Preguntas? Contáctame en:
- LinkedIn: [tu-perfil]
- Twitter: [@tuusuario]
- Email: tu@email.com

---

**Hecho con ❤️ y Astro**