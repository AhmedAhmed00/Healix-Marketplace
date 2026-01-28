/**
 * Color scheme configuration for day schedule cards
 * Each day gets a specific color theme for visual distinction
 */

export interface DayColorScheme {
  from: string
  to: string
  bg: string
  border: string
  gradient: string
}

/**
 * Color schemes for each day of the week
 * Weekdays (0-4) use cyan-blue theme, weekends (5-6) use blue-cyan theme
 */
export const DAY_COLOR_SCHEMES: DayColorScheme[] = [
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3BC1CF]/5 dark:bg-[#3BC1CF]/10',
    border: 'border-[#3BC1CF]/20 dark:border-[#3BC1CF]/30',
    gradient: 'from-[#3BC1CF] to-[#1974BB]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3BC1CF]/5 dark:bg-[#3BC1CF]/10',
    border: 'border-[#3BC1CF]/20 dark:border-[#3BC1CF]/30',
    gradient: 'from-[#3BC1CF] to-[#1974BB]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3BC1CF]/5 dark:bg-[#3BC1CF]/10',
    border: 'border-[#3BC1CF]/20 dark:border-[#3BC1CF]/30',
    gradient: 'from-[#3BC1CF] to-[#1974BB]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3BC1CF]/5 dark:bg-[#3BC1CF]/10',
    border: 'border-[#3BC1CF]/20 dark:border-[#3BC1CF]/30',
    gradient: 'from-[#3BC1CF] to-[#1974BB]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3BC1CF]/5 dark:bg-[#3BC1CF]/10',
    border: 'border-[#3BC1CF]/20 dark:border-[#3BC1CF]/30',
    gradient: 'from-[#3BC1CF] to-[#1974BB]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#1974BB]/5 dark:bg-[#1974BB]/10',
    border: 'border-[#1974BB]/20 dark:border-[#1974BB]/30',
    gradient: 'from-[#1974BB] to-[#3BC1CF]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#1974BB]/5 dark:bg-[#1974BB]/10',
    border: 'border-[#1974BB]/20 dark:border-[#1974BB]/30',
    gradient: 'from-[#1974BB] to-[#3BC1CF]',
  },
]

/**
 * Gets the color scheme for a specific day index
 * @param index - Day index (0-6, wraps around for values > 6)
 * @returns Color scheme object
 */
export function getDayColorScheme(index: number): DayColorScheme {
  return DAY_COLOR_SCHEMES[index % DAY_COLOR_SCHEMES.length]
}

