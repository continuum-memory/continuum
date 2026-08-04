import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { formatCurrency } from '@/lib/utils'
import type { Envelope } from '@/types'

interface SpendModalProps {
  open: boolean
  envelope: Envelope | null
  onClose: () => void
  onSubmit: (envelopeId: string, amount: number, description: string, date: string) => void
}

export function SpendModal({ open, envelope, onClose, onSubmit }: SpendModalProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  if (!envelope) return null

  const parsed = parseFloat(amount)
  const isValid = !isNaN(parsed) && parsed > 0
  const afterSpend = envelope.filled - parsed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || !description.trim()) return
    onSubmit(envelope.id, parsed, description.trim(), date)
    setAmount('')
    setDescription('')
    setDate(new Date().toISOString().split('T')[0])
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`Spend from ${envelope.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-sm text-slate-400 flex items-center justify-between">
          <span>Available in envelope</span>
          <span className="font-mono font-semibold text-slate-50">{formatCurrency(envelope.filled)}</span>
        </div>

        <div>
          <label className="label">Amount spent</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input pl-8 font-mono text-lg"
              autoFocus
            />
          </div>
          {isValid && (
            <p className={`text-xs mt-1 ${afterSpend < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              Remaining after: {formatCurrency(afterSpend)}
              {afterSpend < 0 && ' (overspent)'}
            </p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <input
            type="text"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button
            type="submit"
            disabled={!isValid || !description.trim()}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Record Expense
          </button>
        </div>
      </form>
    </Modal>
  )
}
