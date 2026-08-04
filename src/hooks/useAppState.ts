import { useState, useCallback } from 'react'
import type { AppState, EnvelopeIcon, EnvelopeColor } from '@/types'
import {
  loadState,
  saveState,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope,
  addIncome,
  fillEnvelope,
  addExpense,
  deleteTransaction,
  clearState,
} from '@/lib/storage'
import { getCurrentMonth } from '@/lib/utils'

export function useAppState() {
  const [state, setState] = useState<AppState>(() => loadState())

  const mutate = useCallback((updater: (s: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  return {
    state,

    // Envelopes
    addEnvelope: (data: { name: string; icon: EnvelopeIcon; color: EnvelopeColor; budgeted: number }) =>
      mutate((s) => addEnvelope(s, data)),
    updateEnvelope: (id: string, updates: { name?: string; icon?: EnvelopeIcon; color?: EnvelopeColor; budgeted?: number }) =>
      mutate((s) => updateEnvelope(s, id, updates)),
    deleteEnvelope: (id: string) => mutate((s) => deleteEnvelope(s, id)),

    // Transactions
    addIncome: (amount: number, description: string, date: string) =>
      mutate((s) => addIncome(s, amount, description, date)),
    fillEnvelope: (envelopeId: string, amount: number, description: string, date: string) =>
      mutate((s) => fillEnvelope(s, envelopeId, amount, description, date)),
    addExpense: (envelopeId: string, amount: number, description: string, date: string) =>
      mutate((s) => addExpense(s, envelopeId, amount, description, date)),
    deleteTransaction: (id: string) => mutate((s) => deleteTransaction(s, id)),

    // Computed
    totalBudgeted: state.envelopes.reduce((sum, e) => sum + e.budgeted, 0),
    totalFilled: state.envelopes.reduce((sum, e) => sum + e.filled, 0),
    totalSpentThisMonth: state.transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(getCurrentMonth()))
      .reduce((sum, t) => sum + t.amount, 0),

    // Reset
    resetAll: () => {
      clearState()
      setState(loadState())
    },
  }
}
