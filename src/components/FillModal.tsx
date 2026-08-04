import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { formatCurrency, COLOR_MAP } from '@/lib/utils'
import type { Envelope } from '@/types'

interface FillModalProps {
  open: boolean
  envelope: Envelope | null
  readyToAssign: number
  onClose: () => void
  onSubmit: (envelopeId: string, amount: number, description: string, date: string) => void
}

export function FillModal({ open, envelope, readyToAssign, onClose, onSubmit }: FillModalProps) {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  if (!envelope) return null

  const parsed = parseFloat(amount)
  const isValid = !isNaN(parsed) && parsed > 0
  const needed = Math.max(0, envelope.budgeted - envelope.filled)
  const canFill = Math.min(needed, readyToAssign)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit(envelope.id, parsed, `Fill — ${envelope.name}`, date)
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`Fill — ${envelope.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Envelope status */}
        <div className={`flex items-center justify-between p-3 rounded-xl border ${COLOR_MAP[envelope.color]}`}>
          <div>
            <p className="text-xs opacity-70">Currently filled</p>
            <p className="font-mono font-semibold">{formatCurrency(envelope.filled)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70">Target</p>
            <p className="font-mono font-semibold">{formatCurrency(envelope.budgeted)}</p>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          Ready to assign: <span className="text-emerald-400 font-semibold font-mono">{formatCurrency(readyToAssign)}</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0">Amount to fill</label>
            {canFill > 0 && (
              <button
                type="button"
                onClick={() => setAmount(canFill.toFixed(2))}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Fill needed ({formatCurrency(canFill)})
              </button>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              max={readyToAssign}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input pl-8 font-mono text-lg"
              autoFocus
            />
          </div>
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
          <button type="submit" disabled={!isValid || readyToAssign <= 0} className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
            Fill Envelope
          </button>
        </div>
      </form>
    </Modal>
  )
}
