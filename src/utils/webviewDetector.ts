/**
 * WebView Detector
 * Detecta navegadores embebidos de redes sociales y apps de terceros
 * Solución probada en producción con millones de usuarios
 */

export interface WebViewDetectionResult {
  isWebView: boolean;
  platform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'messenger' | 'other';
  shouldShowBanner: boolean;
}

// Forzar deteccion en desarrollo cuando sea necesario
export const FORCE_WEBVIEW_TEST = false;

/**
 * Detecta si el usuario está en un WebView basándose en User-Agent
 * Incluye los patrones más comunes de redes sociales y apps
 */
/**
 * Muestra información de debug visible en la página (temporal para diagnóstico)
 */
function showDebugInfo(info: any) {
  // Console log
  console.log('[WebView Debug]', info);

  // Crear elemento visible en la página
  const debugDiv = document.createElement('div');
  debugDiv.id = 'webview-debug-info';
  debugDiv.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    color: #0f0;
    padding: 10px;
    font-family: monospace;
    font-size: 10px;
    z-index: 999999;
    max-height: 200px;
    overflow-y: auto;
    word-break: break-all;
  `;

  debugDiv.innerHTML = `
    <div style="margin-bottom: 5px;"><strong>DEBUG INFO (auto-hide 15s):</strong></div>
    <div>UA: ${info.ua}</div>
    <div>Referer: ${info.referer}</div>
    <div>Has WV: ${info.hasWV}</div>
    <div>Has Android: ${info.hasAndroid}</div>
    <div>Has Chrome: ${info.hasChrome}</div>
    <div>Has LinkedIn: ${info.hasLinkedIn}</div>
    <div>Detected: ${info.detected ? 'YES' : 'NO'}</div>
    <div>Platform: ${info.platform || 'none'}</div>
  `;

  document.body.appendChild(debugDiv);

  // Auto-eliminar después de 15 segundos
  setTimeout(() => {
    debugDiv.remove();
  }, 15000);
}

export function detectWebView(): WebViewDetectionResult {
  // Solo ejecutar en el navegador
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isWebView: false, shouldShowBanner: false };
  }

  if (FORCE_WEBVIEW_TEST) {
    return { isWebView: true, platform: 'other', shouldShowBanner: true };
  }

  const ua = navigator.userAgent.toLowerCase();
  const referer = document.referrer.toLowerCase();

  // Información de debug
  const debugInfo = {
    ua: navigator.userAgent, // User-Agent original (no lowercase)
    referer: referer,
    hasWV: ua.includes('wv'),
    hasAndroid: ua.includes('android'),
    hasChrome: ua.includes('chrome'),
    hasLinkedIn: ua.includes('linkedin') || ua.includes('liapp'),
    detected: false,
    platform: null as string | null,
  };

  // Patrones de detección probados en producción
  const patterns = {
    facebook: /\bfb[\w_]+\/([\d.]+)|fbav\/([\d.]+)|fban\/|fbios|fb4a/i,
    instagram: /instagram|ig_[\w]+/i,
    // LinkedIn: múltiples variantes para Android/iOS
    // Incluye: LinkedInApp, LinkedIn, liapp, y variantes de Chrome Custom Tabs
    linkedin: /linkedinapp|linkedin\/[\d.]+|liapp|linkedin.*android/i,
    twitter: /twitter/i,
    tiktok: /tiktok|musical_ly/i,
    messenger: /\bmessenger\b|fbmessenger/i,
  };

  // Detección por User-Agent (método principal)
  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(ua)) {
      debugInfo.detected = true;
      debugInfo.platform = platform;
      showDebugInfo(debugInfo);
      return {
        isWebView: true,
        platform: platform as WebViewDetectionResult['platform'],
        shouldShowBanner: true,
      };
    }
  }

  // Fallback: detección por Referer (menos confiable pero útil)
  if (referer) {
    if (referer.includes('facebook.com') || referer.includes('fb.me')) {
      debugInfo.detected = true;
      debugInfo.platform = 'facebook';
      showDebugInfo(debugInfo);
      return { isWebView: true, platform: 'facebook', shouldShowBanner: true };
    }
    if (referer.includes('instagram.com')) {
      debugInfo.detected = true;
      debugInfo.platform = 'instagram';
      showDebugInfo(debugInfo);
      return { isWebView: true, platform: 'instagram', shouldShowBanner: true };
    }
    if (referer.includes('linkedin.com')) {
      debugInfo.detected = true;
      debugInfo.platform = 'linkedin';
      showDebugInfo(debugInfo);
      return { isWebView: true, platform: 'linkedin', shouldShowBanner: true };
    }
    if (referer.includes('t.co') || referer.includes('twitter.com')) {
      debugInfo.detected = true;
      debugInfo.platform = 'twitter';
      showDebugInfo(debugInfo);
      return { isWebView: true, platform: 'twitter', shouldShowBanner: true };
    }
  }

  // Detección específica: Android WebView + LinkedIn referer
  // LinkedIn en Android a veces usa un WebView genérico sin identificador en UA
  const isAndroidWebView = ua.includes('wv') && ua.includes('android');
  if (isAndroidWebView && referer.includes('linkedin.com')) {
    debugInfo.detected = true;
    debugInfo.platform = 'linkedin';
    showDebugInfo(debugInfo);
    return { isWebView: true, platform: 'linkedin', shouldShowBanner: true };
  }

  // Detección específica: Chrome Custom Tabs (CCT) usado por LinkedIn
  // LinkedIn en Android frecuentemente usa CCT en lugar de WebView tradicional
  const isChromeCustomTab =
    ua.includes('chrome') &&
    ua.includes('android') &&
    !ua.includes('wv') &&
    (referer.includes('linkedin.com') || referer.includes('lnkd.in'));

  if (isChromeCustomTab) {
    debugInfo.detected = true;
    debugInfo.platform = 'linkedin';
    showDebugInfo(debugInfo);
    return { isWebView: true, platform: 'linkedin', shouldShowBanner: true };
  }

  // Detección genérica de WebView (cuando no se identifica la plataforma)
  const isGenericWebView =
    (ua.includes('wv') && ua.includes('android')) || // Android WebView
    (ua.includes('iphone') && !ua.includes('safari')) || // iOS sin Safari
    ua.includes('webview');

  if (isGenericWebView) {
    debugInfo.detected = true;
    debugInfo.platform = 'other';
    showDebugInfo(debugInfo);
    return { isWebView: true, platform: 'other', shouldShowBanner: true };
  }

  // No se detectó WebView - mostrar debug de todos modos
  showDebugInfo(debugInfo);
  return { isWebView: false, shouldShowBanner: false };
}

/**
 * Obtiene el texto amigable de la plataforma detectada
 */
export function getPlatformName(platform?: string): string {
  const names: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    twitter: 'Twitter/X',
    tiktok: 'TikTok',
    messenger: 'Messenger',
    other: 'esta aplicación',
  };
  return names[platform || 'other'] || 'esta aplicación';
}

/**
 * Verifica si el usuario ya cerró el banner en esta sesion (sessionStorage)
 */
export function hasUserDismissedBanner(): boolean {
  if (typeof sessionStorage === 'undefined') return false;

  try {
    return sessionStorage.getItem('webview-banner-dismissed') === '1';
  } catch {
    return false;
  }
}

/**
 * Guarda que el usuario cerró el banner en esta sesion
 */
export function dismissBanner(): void {
  if (typeof sessionStorage === 'undefined') return;

  try {
    sessionStorage.setItem('webview-banner-dismissed', '1');
  } catch {
    // Fallar silenciosamente si sessionStorage no está disponible
  }
}

/**
 * Obtiene la URL actual para compartir/copiar
 */
export function getCurrentUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

/**
 * Intenta abrir el enlace en el navegador externo
 * Funciona en la mayoría de WebViews modernos
 */
export function openInExternalBrowser(url: string = getCurrentUrl()): void {
  if (typeof window === 'undefined') return;

  // Intento 1: Open in browser usando el protocolo (funciona en muchos casos)
  const externalLinks = [
    `intent://${url.replace(/^https?:\/\//, '')}#Intent;end`,
    `googlechrome://${url.replace(/^https?:\/\//, '')}`,
    url,
  ];

  // Crear un enlace temporal y hacer click
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copia la URL actual al portapapeles
 */
export async function copyUrlToClipboard(url: string = getCurrentUrl()): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;

  try {
    // Método moderno (Clipboard API)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }

    // Fallback para navegadores antiguos o WebViews restrictivos
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    return successful;
  } catch {
    return false;
  }
}
