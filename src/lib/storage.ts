import type { Envelope, Transaction, BudgetMonth, AppState } from '@/types'
import { getCurrentMonth, generateId } from '@/lib/utils'

const STORAGE_KEY = 'continuum_data'

const DEFAULT_ENVELOPES: Omit<Envelope, 'id' | 'createdAt'>[] = [
  { name: 'Housing', icon: 'home', color: 'blue', budgeted: 1500, filled: 0, order: 0 },
  { name: 'Groceries', icon: 'utensils', color: 'emerald', budgeted: 400, filled: 0, order: 1 },
  { name: 'Transport', icon: 'car', color: 'amber', budgeted: 200, filled: 0, order: 2 },
  { name: 'Health', icon: 'heart', color: 'rose', budgeted: 150, filled: 0, order: 3 },
  { name: 'Savings', icon: 'piggy-bank', color: 'violet', budgeted: 500, filled: 0, order: 4 },
  { name: 'Entertainment', icon: 'music', color: 'pink', budgeted: 100, filled: 0, order: 5 },
]

function defaultState(): AppState {
  const now = new Date().toISOString()
  return {
    envelopes: DEFAULT_ENVELOPES.map((e) => ({
      ...e,
      id: generateId(),
      createdAt: now,
    })),
    transactions: [],
    month: {
      id: getCurrentMonth(),
      totalIncome: 0,
      readyToAssign: 0,
    },
  }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as AppState
    // Ensure current month
    const monthId = getCurrentMonth()
    if (parsed.month?.id !== monthId) {
      parsed.month = { id: monthId, totalIncome: 0, readyToAssign: 0 }
    }
    return parsed
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    console.error('Failed to save state')
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}

// ── Envelope mutations ──────────────────────────────────────────────────────

export function addEnvelope(
  state: AppState,
  data: Pick<Envelope, 'name' | 'icon' | 'color' | 'budgeted'>,
): AppState {
  const envelope: Envelope = {
    ...data,
    id: generateId(),
    filled: 0,
    createdAt: new Date().toISOString(),
    order: state.envelopes.length,
  }
  return { ...state, envelopes: [...state.envelopes, envelope] }
}

export function updateEnvelope(
  state: AppState,
  id: string,
  updates: Partial<Pick<Envelope, 'name' | 'icon' | 'color' | 'budgeted'>>,
): AppState {
  return {
    ...state,
    envelopes: state.envelopes.map((e) => (e.id === id ? { ...e, ...updates } : e)),
  }
}

export function deleteEnvelope(state: AppState, id: string): AppState {
  const envelope = state.envelopes.find((e) => e.id === id)
  const refund = envelope?.filled ?? 0
  return {
    ...state,
    envelopes: state.envelopes.filter((e) => e.id !== id),
    month: { ...state.month, readyToAssign: state.month.readyToAssign + refund },
    transactions: state.transactions.filter((t) => t.envelopeId !== id),
  }
}

// ── Transaction mutations ───────────────────────────────────────────────────

export function addIncome(
  state: AppState,
  amount: number,
  description: string,
  date: string,
): AppState {
  const tx: Transaction = {
    id: generateId(),
    type: 'income',
    amount,
    description,
    date,
    createdAt: new Date().toISOString(),
  }
  return {
    ...state,
    transactions: [tx, ...state.transactions],
    month: {
      ...state.month,
      totalIncome: state.month.totalIncome + amount,
      readyToAssign: state.month.readyToAssign + amount,
    },
  }
}

export function fillEnvelope(
  state: AppState,
  envelopeId: string,
  amount: number,
  description: string,
  date: string,
): AppState {
  const available = state.month.readyToAssign
  const actual = Math.min(amount, available)
  if (actual <= 0) return state

  const tx: Transaction = {
    id: generateId(),
    type: 'fill',
    amount: actual,
    envelopeId,
    description: description || 'Filled envelope',
    date,
    createdAt: new Date().toISOString(),
  }

  return {
    ...state,
    envelopes: state.envelopes.map((e) =>
      e.id === envelopeId ? { ...e, filled: e.filled + actual } : e,
    ),
    transactions: [tx, ...state.transactions],
    month: { ...state.month, readyToAssign: state.month.readyToAssign - actual },
  }
}

export function addExpense(
  state: AppState,
  envelopeId: string,
  amount: number,
  description: string,
  date: string,
): AppState {
  const envelope = state.envelopes.find((e) => e.id === envelopeId)
  if (!envelope) return state

  const tx: Transaction = {
    id: generateId(),
    type: 'expense',
    amount,
    envelopeId,
    description,
    date,
    createdAt: new Date().toISOString(),
  }

  return {
    ...state,
    envelopes: state.envelopes.map((e) =>
      e.id === envelopeId ? { ...e, filled: Math.max(0, e.filled - amount) } : e,
    ),
    transactions: [tx, ...state.transactions],
  }
}

export function deleteTransaction(state: AppState, id: string): AppState {
  const tx = state.transactions.find((t) => t.id === id)
  if (!tx) return state

  let next = { ...state, transactions: state.transactions.filter((t) => t.id !== id) }

  if (tx.type === 'income') {
    next.month = {
      ...next.month,
      totalIncome: next.month.totalIncome - tx.amount,
      readyToAssign: next.month.readyToAssign - tx.amount,
    }
  } else if (tx.type === 'fill' && tx.envelopeId) {
    next.envelopes = next.envelopes.map((e) =>
      e.id === tx.envelopeId ? { ...e, filled: Math.max(0, e.filled - tx.amount) } : e,
    )
    next.month = { ...next.month, readyToAssign: next.month.readyToAssign + tx.amount }
  } else if (tx.type === 'expense' && tx.envelopeId) {
    next.envelopes = next.envelopes.map((e) =>
      e.id === tx.envelopeId ? { ...e, filled: e.filled + tx.amount } : e,
    )
  }

  return next
}
