import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { formatCurrency } from '@/lib/utils'

interface IncomeModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (amount: number, description: string, date: string) => void
}

export function IncomeModal({ open, onClose, onSubmit }: IncomeModalProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = parseFloat(amount)
    if (isNaN(parsed) || parsed <= 0) return
    onSubmit(parsed, description || 'Income', date)
    setAmount('')
    setDescription('')
    setDate(new Date().toISOString().split('T')[0])
    onClose()
  }

  const parsed = parseFloat(amount)
  const isValid = !isNaN(parsed) && parsed > 0

  return (
    <Modal open={open} onClose={onClose} title="Add Income">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Amount</label>
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
            <p className="text-xs text-emerald-400 mt-1">
              {formatCurrency(parsed)} will be added to Ready to Assign
            </p>
          )}
        </div>

        <div>
          <label className="label">Description (optional)</label>
          <input
            type="text"
            placeholder="e.g. Salary, Freelance, Side hustle..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
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
          <button type="button" onClick={onClose} className="btn-ghost flex-1">
            Cancel
          </button>
          <button type="submit" disabled={!isValid} className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
            Add Income
          </button>
        </div>
      </form>
    </Modal>
  )
}
