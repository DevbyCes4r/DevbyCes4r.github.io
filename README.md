# 🌐 Brantop Landing - Astro SSG

Landing page estática con Astro 5.0 y Tailwind CSS v4.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

- URL: http://localhost:4321

## 🛠️ Stack

- **Astro 5.0** - SSG
- **Tailwind CSS v4** - Estilos
- **MDX** - Contenido dinámico
- **Sitemap** - SEO

## 📋 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
```

## 📁 Estructura

```
src/
├── components/    # Componentes Astro
├── content/       # Blog, cursos (MDX)
├── layouts/       # Layouts base
├── pages/         # Rutas
└── styles/        # CSS global
```

## 📦 Build

```bash
npm run build
# Output: dist/
```

## 🌐 Deployment

Este proyecto se despliega automáticamente en:

- **GitHub Pages**: Configurado en `.github/workflows/astro.yml`
- **Cloudflare Pages**: Configurado en `.github/workflows/cloudflare-pages.yml`

Para configurar el despliegue en Cloudflare Pages, consulta [CLOUDFLARE_PAGES_SETUP.md](./CLOUDFLARE_PAGES_SETUP.md).
