/**
 * Utility — formattazione valuta, percentuali, date, margini
 */

export function formatCurrency(value) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0)
}

export function formatPercentage(value, decimals = 1) {
  return `${(value ?? 0).toFixed(decimals)}%`
}

export function getMarginStatus(marginValue) {
  if (marginValue > 0) return 'positive'
  if (marginValue < 0) return 'negative'
  return 'neutral'
}

export function formatDateSimple(isoDate) {
  if (!isoDate) return '-'
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
