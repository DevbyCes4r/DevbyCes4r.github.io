# ⚡ Quick Start - 5 Minutos para Estar en Producción

## 🎯 Objetivo
Tener tu blog y linktree de afiliados funcionando en menos de 5 minutos.

## 📋 Checklist Pre-Vuelo

Necesitas tener instalado:
- ✅ Node.js 18+ ([Descargar](https://nodejs.org))
- ✅ Git ([Descargar](https://git-scm.com))
- ✅ Editor de código (VS Code recomendado)

## 🚀 Paso a Paso

### 1️⃣ Crear e Instalar Proyecto (1 min)

```bash
# Crear proyecto
npm create astro@latest mi-blog-afiliados

# Opciones a elegir:
# - How would you like to start? → Empty
# - Do you plan to write TypeScript? → Yes, strict
# - Install dependencies? → Yes
# - Initialize a git repository? → Yes

# Entrar al proyecto
cd mi-blog-afiliados

# Instalar dependencias adicionales
npm install @astrojs/sitemap @astrojs/rss @astrojs/tailwind tailwindcss

# Añadir integraciones
npx astro add tailwind sitemap
```

### 2️⃣ Estructura de Carpetas (30 seg)

```bash
# Crear estructura
mkdir -p src/{components,content/blog,layouts,pages/blog,styles,utils}
mkdir -p public/images/{blog,packs}
```

### 3️⃣ Copiar Archivos Base (1 min)

Copia estos archivos del artifact a tu proyecto:

**Archivos de Configuración** (raíz del proyecto):
- ✅ `astro.config.mjs`
- ✅ `tsconfig.json`
- ✅ `package.json` (mergear con el existente)
- ✅ `vercel.json`

**Archivos Públicos** (`public/`):
- ✅ `robots.txt`

**Layouts** (`src/layouts/`):
- ✅ `BaseLayout.astro`
- ✅ `BlogPost.astro`

**Components** (`src/components/`):
- ✅ `PackCard.astro`

**Pages** (`src/pages/`):
- ✅ `index.astro`
- ✅ `blog/index.astro`
- ✅ `rss.xml.ts`

**Content** (`src/content/`):
- ✅ `config.ts`
- ✅ `blog/ejemplo-post.md` (ejemplo)

**Styles** (`src/styles/`):
- ✅ `global.css`

**Utils** (`src/utils/`):
- ✅ `seo.ts`

### 4️⃣ Personalizar (1 min)

#### Editar `src/pages/index.astro`:
```astro
// Línea ~67: Actualiza tus redes sociales
const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/TU-USUARIO', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/TU-USUARIO', icon: 'github' },
  // ...
];

// Línea ~6: Actualiza tus packs de cursos
const packs = [
  {
    title: 'TU PACK',
    description: 'DESCRIPCIÓN',
    price: '$299',
    affiliateLink: 'TU-LINK-DE-AFILIADO',
    // ...
  }
];
```

#### Editar `src/layouts/BaseLayout.astro`:
```astro
// Línea 44
author = 'TU NOMBRE'

// Línea 79
<meta name="twitter:creator" content="@TU-USUARIO">
```

### 5️⃣ Añadir Imágenes (30 seg)

Coloca estas imágenes en `public/`:
- `logo.png` (96x96px) - Tu logo
- `favicon.svg` - Tu favicon
- `og-default.jpg` (1200x630px) - Imagen por defecto para redes sociales

### 6️⃣ Probar Localmente (30 seg)

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir navegador en http://localhost:4321
```

✅ **Deberías ver**: Tu página de inicio con tus packs

### 7️⃣ Deploy en Vercel (1 min)

#### Opción A: Desde la Terminal
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Seguir las instrucciones
```

#### Opción B: Desde GitHub (MÁS FÁCIL)
1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Selecciona tu repositorio
5. Click "Deploy" 

🎉 **¡Listo!** Tu sitio estará en: `https://tu-proyecto.vercel.app`

## 🎨 Próximos Pasos (Opcional)

### Crear tu Primer Post (5 min)

```bash
# Crear archivo
touch src/content/blog/mi-primer-post.md
```

Copia esta plantilla:

```markdown
---
title: 'Mi Primer Post de Desarrollo Web'
description: 'Aprende los conceptos básicos de JavaScript en este tutorial completo para principiantes.'
publishDate: 2025-01-24
author: 'Tu Nombre'
image: '/images/blog/primer-post.jpg'
categories: ['JavaScript']
tags: ['tutorial', 'principiantes', 'javascript']
featured: true
readingTime: '8 min lectura'
faqs:
  - question: '¿Es JavaScript difícil de aprender?'
    answer: 'JavaScript tiene una curva de aprendizaje moderada. Con práctica constante, puedes dominar lo básico en 2-3 meses.'
  - question: '¿Qué necesito para empezar?'
    answer: 'Solo un navegador web y un editor de código como VS Code. ¡Eso es todo!'
---

## Introducción

Aquí empieza tu artículo...

## Tabla de Contenidos

- [Introducción](#introducción)
- [¿Qué es JavaScript?](#qué-es-javascript)
- [Primeros Pasos](#primeros-pasos)
- [Conclusión](#conclusión)

## ¿Qué es JavaScript?

JavaScript es el lenguaje de programación que hace que las páginas web sean interactivas...

## Primeros Pasos

### 1. Instalar un Editor

Descarga VS Code desde [code.visualstudio.com](https://code.visualstudio.com)

### 2. Tu Primer Código

\`\`\`javascript
// Este es tu primer programa
console.log('¡Hola Mundo!');
\`\`\`

## Conclusión

En este tutorial aprendiste...

### Próximos Pasos
1. Practica con ejercicios
2. Lee la documentación oficial
3. Construye proyectos pequeños
```

Guarda y recarga `http://localhost:4321/blog` - ¡verás tu nuevo post!

### Añadir Google Analytics (2 min)

Edita `src/layouts/BaseLayout.astro`, busca el comentario `<!-- Analytics placeholder -->` y añade:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TU-ID');
</script>
```

### Conectar Dominio Personalizado (3 min)

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Añade tu dominio (ej: `tudominio.com`)
4. Copia los registros DNS
5. Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.)
6. Añade los registros DNS
7. Espera 24-48h para propagación

## 🔧 Troubleshooting Rápido

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falla
```bash
npm run build
# Lee los errores y corrígelos uno por uno
```

### Imágenes no se ven
- Verifica que estén en `public/images/`
- Usa rutas absolutas: `/images/mi-imagen.jpg`

### Tailwind no funciona
```bash
npx astro add tailwind
# Selecciona "Yes" a todas las opciones
```

## 📊 Validar SEO (5 min después del deploy)

### 1. Google Search Console
1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Añade tu sitio
3. Verifica propiedad con meta tag
4. Envía sitemap: `https://tudominio.com/sitemap-index.xml`

### 2. Bing Webmaster
1. Ve a [bing.com/webmasters](https://www.bing.com/webmasters)
2. Añade tu sitio
3. Envía sitemap

### 3. Validar Schema.org
1. Ve a [validator.schema.org](https://validator.schema.org)
2. Pega la URL de un post
3. Verifica que no haya errores

### 4. Test de Rich Results
1. Ve a [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. Pega tu URL
3. Verifica resultados

## 📈 Métricas a Seguir

Después de 1 semana:
- ✅ Google Search Console indexando páginas
- ✅ Al menos 3 posts publicados
- ✅ Analytics configurado y rastreando

Después de 1 mes:
- ✅ 10+ posts publicados
- ✅ Primeras visitas orgánicas
- ✅ Compartir en redes sociales

Después de 3 meses:
- ✅ 30+ posts publicados
- ✅ Tráfico orgánico constante
- ✅ Primeras conversiones de afiliados

## 🎓 Recursos para Aprender Más

### Documentación
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

### Comunidades
- [Astro Discord](https://astro.build/chat)
- [Dev.to](https://dev.to)
- [Reddit r/webdev](https://reddit.com/r/webdev)

### SEO
- [Google Search Central](https://developers.google.com/search)
- [Ahrefs Blog](https://ahrefs.com/blog)
- [Moz Beginner's Guide](https://moz.com/beginners-guide-to-seo)

## 🆘 ¿Necesitas Ayuda?

1. **Revisa el README.md** - Guía completa
2. **Revisa SEO-AI-GUIDE.md** - Optimización avanzada
3. **GitHub Issues** - Abre un issue si encuentras bugs
4. **Contacto** - [tu@email.com](mailto:tu@email.com)

---

## ✅ Checklist Final

Antes de considerar el sitio "listo":

- [ ] ✅ Dominio configurado
- [ ] ✅ SSL/HTTPS activo
- [ ] ✅ Google Analytics instalado
- [ ] ✅ Search Console configurado
- [ ] ✅ Sitemap enviado
- [ ] ✅ Al menos 3 posts publicados
- [ ] ✅ Info personal actualizada
- [ ] ✅ Links de afiliados funcionando
- [ ] ✅ Imágenes optimizadas
- [ ] ✅ Meta tags verificados
- [ ] ✅ Lighthouse score >90

🎉 **¡Felicidades!** Tu blog está listo para empezar a generar tráfico y conversiones.

---

**Pro Tip**: Publica contenido de forma consistente. Es mejor 1 post por semana durante 6 meses que 10 posts en 1 semana y luego nada. La consistencia es clave para el SEO.

**¿Listo para el siguiente nivel?** Lee el README.md completo y SEO-AI-GUIDE.md para técnicas avanzadas.