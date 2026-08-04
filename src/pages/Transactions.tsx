import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, RefreshCw, Trash2, Search } from 'lucide-react'
import { formatCurrency, formatShortDate } from '@/lib/utils'
import type { useAppState } from '@/hooks/useAppState'
import type { Transaction } from '@/types'

interface TransactionsProps {
  appState: ReturnType<typeof useAppState>
}

const TYPE_CONFIG = {
  income: {
    label: 'Income',
    Icon: ArrowUpRight,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    sign: '+',
  },
  expense: {
    label: 'Expense',
    Icon: ArrowDownRight,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    sign: '-',
  },
  fill: {
    label: 'Fill',
    Icon: RefreshCw,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    sign: '',
  },
}

export function Transactions({ appState }: TransactionsProps) {
  const { state } = appState
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'fill'>('all')

  const envelopeMap = Object.fromEntries(state.envelopes.map((e) => [e.id, e.name]))

  const filtered = state.transactions.filter((t) => {
    if (filter !== 'all' && t.type !== filter) return false
    if (query) {
      const q = query.toLowerCase()
      return (
        t.description.toLowerCase().includes(q) ||
        (t.envelopeId && envelopeMap[t.envelopeId]?.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">Transactions</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
        {(['all', 'income', 'expense', 'fill'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-slate-700 text-slate-50'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p>No transactions found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx, i) => (
            <TxRow
              key={tx.id}
              tx={tx}
              envelopeName={tx.envelopeId ? envelopeMap[tx.envelopeId] : undefined}
              onDelete={appState.deleteTransaction}
              delay={i * 0.03}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TxRow({
  tx,
  envelopeName,
  onDelete,
  delay,
}: {
  tx: Transaction
  envelopeName?: string
  onDelete: (id: string) => void
  delay: number
}) {
  const cfg = TYPE_CONFIG[tx.type]
  const { Icon, color, bg, sign } = cfg
  const [confirm, setConfirm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-4 flex items-center gap-4 group hover:border-slate-700 transition-colors"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-100 truncate">{tx.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {envelopeName && (
            <span className="text-xs text-slate-500 truncate">{envelopeName}</span>
          )}
          <span className="text-xs text-slate-600">{formatShortDate(tx.date)}</span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`font-mono font-semibold text-sm ${color}`}>
          {sign}{formatCurrency(tx.amount)}
        </p>
        <p className="text-xs text-slate-600 capitalize">{tx.type}</p>
      </div>

      {confirm ? (
        <div className="flex gap-1">
          <button
            onClick={() => onDelete(tx.id)}
            className="px-2 py-1 text-xs rounded-lg bg-rose-500 text-white hover:bg-rose-400 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="px-2 py-1 text-xs rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirm(true)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  )
}
