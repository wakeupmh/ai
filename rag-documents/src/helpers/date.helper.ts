export const getDaysBetween = (from: Date, to: Date) => {
  return Math.round(Math.abs(+from - +to) / 8.64e7)
}

export const getDaysDiference = (from: Date, to: Date) => {
  const daysRemaining = getDaysBetween(from, to)
  if (new Date(to).getTime() < new Date().getTime()) {
    return -daysRemaining
  }
  return daysRemaining
}

export const writeFullDate = (date: Date | string | undefined, fallback?: string): string => {
  if (!date) return fallback || ''

  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  return date.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'medium',
  })
}
