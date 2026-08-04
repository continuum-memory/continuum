import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { cn, COLOR_MAP } from '@/lib/utils'
import type { EnvelopeColor, EnvelopeIcon } from '@/types'

const ICONS: EnvelopeIcon[] = [
  'home', 'car', 'utensils', 'heart', 'zap', 'shield',
  'trending-up', 'gift', 'coffee', 'plane', 'book', 'music',
  'shopping-bag', 'smartphone', 'dollar-sign', 'piggy-bank',
]

const COLORS: EnvelopeColor[] = ['emerald', 'blue', 'violet', 'rose', 'amber', 'cyan', 'pink', 'orange']

const ICON_LABELS: Record<EnvelopeIcon, string> = {
  home: '🏠', car: '🚗', utensils: '🍽️', heart: '❤️', zap: '⚡', shield: '🛡️',
  'trending-up': '📈', gift: '🎁', coffee: '☕', plane: '✈️', book: '📚', music: '🎵',
  'shopping-bag': '🛍️', smartphone: '📱', 'dollar-sign': '💵', 'piggy-bank': '🐷',
}

interface AddEnvelopeModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; icon: EnvelopeIcon; color: EnvelopeColor; budgeted: number }) => void
  initial?: { name: string; icon: EnvelopeIcon; color: EnvelopeColor; budgeted: number }
  mode?: 'add' | 'edit'
}

export function AddEnvelopeModal({ open, onClose, onSubmit, initial, mode = 'add' }: AddEnvelopeModalProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [icon, setIcon] = useState<EnvelopeIcon>(initial?.icon ?? 'dollar-sign')
  const [color, setColor] = useState<EnvelopeColor>(initial?.color ?? 'emerald')
  const [budgeted, setBudgeted] = useState(initial?.budgeted.toString() ?? '')

  const isValid = name.trim().length > 0 && parseFloat(budgeted) > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit({ name: name.trim(), icon, color, budgeted: parseFloat(budgeted) })
    if (mode === 'add') {
      setName(''); setIcon('dollar-sign'); setColor('emerald'); setBudgeted('')
    }
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === 'edit' ? 'Edit Envelope' : 'New Envelope'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="e.g. Groceries, Rent, Fun money..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            autoFocus
            maxLength={32}
          />
        </div>

        <div>
          <label className="label">Monthly budget</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={budgeted}
              onChange={(e) => setBudgeted(e.target.value)}
              className="input pl-8 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="label">Icon</label>
          <div className="grid grid-cols-8 gap-1.5">
            {ICONS.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={cn(
                  'aspect-square rounded-lg text-lg flex items-center justify-center transition-all',
                  icon === ic ? 'bg-emerald-500/20 ring-1 ring-emerald-500' : 'bg-slate-800 hover:bg-slate-700',
                )}
              >
                {ICON_LABELS[ic]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Color</label>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium border transition-all',
                  COLOR_MAP[c],
                  color === c ? 'ring-1 ring-offset-1 ring-offset-slate-900 ring-current scale-105' : 'opacity-60 hover:opacity-100',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button type="submit" disabled={!isValid} className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
            {mode === 'edit' ? 'Save Changes' : 'Create Envelope'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
