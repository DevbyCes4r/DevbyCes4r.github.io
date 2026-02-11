# Configuración de Cloudflare Pages

Este documento explica cómo configurar el despliegue automático a Cloudflare Pages.

## 🚀 Configuración Inicial

### 1. Obtener credenciales de Cloudflare

Para que GitHub Actions pueda desplegar a Cloudflare Pages, necesitas configurar dos secretos en tu repositorio:

#### CLOUDFLARE_API_TOKEN

1. Inicia sesión en tu cuenta de [Cloudflare](https://dash.cloudflare.com/)
2. Ve a **My Profile** → **API Tokens**
3. Haz clic en **Create Token**
4. Usa la plantilla **"Edit Cloudflare Workers"** o crea un token personalizado con estos permisos:
   - **Account** → **Cloudflare Pages** → **Edit**
5. Copia el token generado

#### CLOUDFLARE_ACCOUNT_ID

1. En el dashboard de Cloudflare, ve a cualquier sitio
2. En la barra lateral derecha, busca **Account ID**
3. Copia el ID (tiene formato: `abc123def456...`)

### 2. Configurar secretos en GitHub

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**
4. Agrega los siguientes secretos:
   - **Nombre**: `CLOUDFLARE_API_TOKEN` → **Valor**: El token de API que copiaste
   - **Nombre**: `CLOUDFLARE_ACCOUNT_ID` → **Valor**: Tu Account ID

### 3. Crear el proyecto en Cloudflare Pages (opcional)

Aunque el workflow puede crear el proyecto automáticamente, es recomendable crearlo manualmente primero:

1. En el dashboard de Cloudflare, ve a **Workers & Pages**
2. Haz clic en **Create application** → **Pages** → **Connect to Git**
3. Selecciona tu repositorio de GitHub
4. Configura el proyecto:
   - **Project name**: `devbyces4r` (o el nombre que prefieras - debe coincidir con `projectName` en el workflow)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   
   > **Nota**: Si cambias el nombre del proyecto aquí, también debes actualizar el campo `projectName` en `.github/workflows/cloudflare-pages.yml` para que coincidan.
   
5. Haz clic en **Save and Deploy**

## 🔄 Despliegue Automático

Una vez configurados los secretos, cada push a la rama `main` disparará automáticamente:

1. ✅ Build del sitio con Astro
2. ✅ Despliegue a GitHub Pages (workflow existente: `astro.yml`)
3. ✅ Despliegue a Cloudflare Pages (nuevo workflow: `cloudflare-pages.yml`)

## 🌐 URLs de Despliegue

Después del despliegue, tu sitio estará disponible en:

- **Cloudflare Pages**: `https://<tu-proyecto>.pages.dev` (ejemplo: `https://devbyces4r.pages.dev`)
- **GitHub Pages**: `https://<tu-usuario>.github.io` (ejemplo: `https://devbyces4r.github.io`)
- **Dominio personalizado**: `https://devbyces4r.me` (configurado en `astro.config.mjs`)

### Configurar dominio personalizado en Cloudflare

1. En Cloudflare Pages, ve a tu proyecto
2. Ve a la pestaña **Custom domains**
3. Haz clic en **Set up a custom domain**
4. Ingresa tu dominio (ejemplo: `devbyces4r.me`)
5. Cloudflare configurará automáticamente los registros DNS necesarios

## 🐛 Solución de Problemas

### El workflow falla con "Error: Authentication error"

- Verifica que los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` estén correctamente configurados
- Asegúrate de que el token tenga los permisos necesarios

### El proyecto no se encuentra

- Verifica que el `projectName` en el workflow coincida con el nombre del proyecto en Cloudflare
- O permite que Cloudflare cree el proyecto automáticamente en el primer despliegue

### Verificar despliegues

Puedes ver el estado de los despliegues en:
- GitHub: **Actions** tab en el repositorio
- Cloudflare: **Workers & Pages** → Tu proyecto → **Deployments**

## 📚 Recursos

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Cloudflare Pages Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [GitHub Actions for Cloudflare Pages](https://github.com/marketplace/actions/cloudflare-pages-github-action)
