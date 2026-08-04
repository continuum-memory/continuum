import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function formatShortDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const COLOR_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

export const PROGRESS_COLOR_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  violet: 'bg-violet-500',
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
}

export const SOLID_COLOR_MAP: Record<string, string> = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  violet: 'text-violet-400',
  rose: 'text-rose-400',
  amber: 'text-amber-400',
  cyan: 'text-cyan-400',
  pink: 'text-pink-400',
  orange: 'text-orange-400',
}
