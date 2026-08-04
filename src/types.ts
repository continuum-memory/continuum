export type EnvelopeColor =
  | 'emerald'
  | 'blue'
  | 'violet'
  | 'rose'
  | 'amber'
  | 'cyan'
  | 'pink'
  | 'orange'

export type EnvelopeIcon =
  | 'home'
  | 'car'
  | 'utensils'
  | 'heart'
  | 'zap'
  | 'shield'
  | 'trending-up'
  | 'gift'
  | 'coffee'
  | 'plane'
  | 'book'
  | 'music'
  | 'shopping-bag'
  | 'smartphone'
  | 'dollar-sign'
  | 'piggy-bank'

export interface Envelope {
  id: string
  name: string
  icon: EnvelopeIcon
  color: EnvelopeColor
  budgeted: number   // monthly target
  filled: number     // currently filled (ready to spend)
  createdAt: string
  order: number
}

export type TransactionType = 'expense' | 'income' | 'fill'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  envelopeId?: string   // for expense + fill
  date: string
  createdAt: string
}

export interface BudgetMonth {
  id: string          // YYYY-MM
  totalIncome: number
  readyToAssign: number
}

export interface AppState {
  envelopes: Envelope[]
  transactions: Transaction[]
  month: BudgetMonth
}
