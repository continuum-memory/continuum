import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, TrendingUp, Wallet, PiggyBank, AlertTriangle } from 'lucide-react'
import { EnvelopeCard } from '@/components/EnvelopeCard'
import { IncomeModal } from '@/components/IncomeModal'
import { FillModal } from '@/components/FillModal'
import { SpendModal } from '@/components/SpendModal'
import { AddEnvelopeModal } from '@/components/AddEnvelopeModal'
import { formatCurrency } from '@/lib/utils'
import type { Envelope, EnvelopeColor, EnvelopeIcon } from '@/types'
import type { useAppState } from '@/hooks/useAppState'

interface DashboardProps {
  appState: ReturnType<typeof useAppState>
}

export function Dashboard({ appState }: DashboardProps) {
  const { state, totalFilled, totalBudgeted, totalSpentThisMonth } = appState

  const [showIncome, setShowIncome] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [fillEnvelope, setFillEnvelope] = useState<Envelope | null>(null)
  const [spendEnvelope, setSpendEnvelope] = useState<Envelope | null>(null)
  const [editEnvelope, setEditEnvelope] = useState<Envelope | null>(null)

  const isNegative = state.month.readyToAssign < 0

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'Monthly Income',
            value: state.month.totalIncome,
            icon: TrendingUp,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Total Budgeted',
            value: totalBudgeted,
            icon: Wallet,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'In Envelopes',
            value: totalFilled,
            icon: PiggyBank,
            color: 'text-violet-400',
            bg: 'bg-violet-500/10',
          },
          {
            label: 'Spent This Month',
            value: totalSpentThisMonth,
            icon: AlertTriangle,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className={`font-mono font-bold text-lg ${color}`}>{formatCurrency(value)}</p>
          </div>
        ))}
      </div>

      {/* Warning banner */}
      {isNegative && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm"
        >
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>
            You've assigned more than you have.{' '}
            <span className="font-semibold">{formatCurrency(Math.abs(state.month.readyToAssign))}</span>{' '}
            over budget — add income or reduce envelope fills.
          </span>
        </motion.div>
      )}

      {/* No income state */}
      {state.month.totalIncome === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 card"
        >
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-2">Start with income</h3>
          <p className="text-sm text-slate-500 mb-4 max-w-xs mx-auto">
            Add your income for the month, then fill your envelopes with the money you have.
          </p>
          <button onClick={() => setShowIncome(true)} className="btn-primary">
            Add Income
          </button>
        </motion.div>
      )}

      {/* Envelopes grid */}
      {state.envelopes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-200">
              Envelopes{' '}
              <span className="text-slate-500 font-normal text-sm">({state.envelopes.length})</span>
            </h2>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {state.envelopes.map((envelope) => (
                <EnvelopeCard
                  key={envelope.id}
                  envelope={envelope}
                  onFill={setFillEnvelope}
                  onSpend={setSpendEnvelope}
                  onEdit={setEditEnvelope}
                  onDelete={appState.deleteEnvelope}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* Empty envelopes state */}
      {state.envelopes.length === 0 && state.month.totalIncome > 0 && (
        <div className="text-center py-10 card">
          <p className="text-slate-500 mb-4">No envelopes yet. Create one to start budgeting.</p>
          <button onClick={() => setShowAdd(true)} className="btn-primary">
            Create Envelope
          </button>
        </div>
      )}

      {/* FABs */}
      <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 flex flex-col gap-2 items-end">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-50 rounded-xl shadow-lg border border-slate-700 text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" /> Envelope
        </button>
        <button
          onClick={() => setShowIncome(true)}
          className="btn-primary flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <TrendingUp className="w-4 h-4" /> Add Income
        </button>
      </div>

      {/* Modals */}
      <IncomeModal
        open={showIncome}
        onClose={() => setShowIncome(false)}
        onSubmit={appState.addIncome}
      />
      <FillModal
        open={!!fillEnvelope}
        envelope={fillEnvelope}
        readyToAssign={state.month.readyToAssign}
        onClose={() => setFillEnvelope(null)}
        onSubmit={appState.fillEnvelope}
      />
      <SpendModal
        open={!!spendEnvelope}
        envelope={spendEnvelope}
        onClose={() => setSpendEnvelope(null)}
        onSubmit={appState.addExpense}
      />
      <AddEnvelopeModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={appState.addEnvelope}
      />
      <AddEnvelopeModal
        open={!!editEnvelope}
        onClose={() => setEditEnvelope(null)}
        mode="edit"
        initial={editEnvelope ?? undefined}
        onSubmit={(data) => {
          if (editEnvelope) {
            appState.updateEnvelope(editEnvelope.id, data as { name: string; icon: EnvelopeIcon; color: EnvelopeColor; budgeted: number })
          }
        }}
      />
    </div>
  )
}
