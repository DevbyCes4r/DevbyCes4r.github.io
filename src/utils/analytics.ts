/**
 * GoatCounter Analytics Utility - VERSIÓN SIMPLIFICADA
 * Solo eventos críticos que aportan valor real
 */

interface GoatCounterWindow extends Window {
  goatcounter?: {
    count: (options: {
      path: string;
      title?: string;
      event?: boolean;
    }) => void;
  };
}

declare const window: GoatCounterWindow;

/**
 * Envía un evento a GoatCounter
 */
function track(path: string): void {
  if (typeof window === 'undefined' || !window.goatcounter?.count) return;
  
  try {
    window.goatcounter.count({ path, event: true });
  } catch (error) {
    console.error('Error tracking:', error);
  }
}

// ==================== EVENTOS CRÍTICOS ====================

/**
 * CONVERSIÓN: Click en "Acceder al Curso" (lo más importante)
 */
export function trackCourseClick(courseSlug: string): void {
  track(`/curso-click/${courseSlug}`);
}

/**
 * BÚSQUEDAS: Para detectar contenido faltante
 */
export function trackSearch(query: string, resultsCount: number): void {
  const normalized = query.toLowerCase().replace(/\s+/g, '-');
  track(`/search/${normalized}/${resultsCount}`);
}

/**
 * CONVERSIÓN: Formulario enviado con éxito
 */
export function trackContactSuccess(): void {
  track('/contacto-enviado');
}

/**
 * ENGAGEMENT: Blog leído completamente (100%)
 */
export function trackBlogComplete(slug: string): void {
  track(`/blog-completo/${slug}`);
}

/**
 * Helper: Esperar a que GoatCounter cargue
 */
export function waitForGoatCounter(callback: () => void): void {
  let attempts = 0;
  const check = setInterval(() => {
    if (window.goatcounter?.count || attempts++ > 30) {
      clearInterval(check);
      if (window.goatcounter?.count) callback();
    }
  }, 100);
}
