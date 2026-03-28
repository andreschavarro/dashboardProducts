export function useFormatters() {
  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-MX').format(num)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const formatCategoryName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  }

  return {
    formatPrice,
    formatNumber,
    truncateText,
    formatCategoryName,
    formatDate,
  }
}
