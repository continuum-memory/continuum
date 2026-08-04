import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home, Car, UtensilsCrossed, Heart, Zap, Shield, TrendingUp, Gift,
  Coffee, Plane, Book, Music, ShoppingBag, Smartphone, DollarSign, PiggyBank,
  MoreHorizontal, Pencil, Trash2, PlusCircle, MinusCircle,
} from 'lucide-react'
import { cn, formatCurrency, COLOR_MAP, PROGRESS_COLOR_MAP, SOLID_COLOR_MAP } from '@/lib/utils'
import type { Envelope, EnvelopeIcon } from '@/types'

const ICON_MAP: Record<EnvelopeIcon, React.ComponentType<{ className?: string }>> = {
  home: Home,
  car: Car,
  utensils: UtensilsCrossed,
  heart: Heart,
  zap: Zap,
  shield: Shield,
  'trending-up': TrendingUp,
  gift: Gift,
  coffee: Coffee,
  plane: Plane,
  book: Book,
  music: Music,
  'shopping-bag': ShoppingBag,
  smartphone: Smartphone,
  'dollar-sign': DollarSign,
  'piggy-bank': PiggyBank,
}

interface EnvelopeCardProps {
  envelope: Envelope
  onFill: (envelope: Envelope) => void
  onSpend: (envelope: Envelope) => void
  onEdit: (envelope: Envelope) => void
  onDelete: (id: string) => void
}

export function EnvelopeCard({ envelope, onFill, onSpend, onEdit, onDelete }: EnvelopeCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const Icon = ICON_MAP[envelope.icon] ?? DollarSign

  const pct = envelope.budgeted > 0 ? Math.min((envelope.filled / envelope.budgeted) * 100, 100) : 0
  const isOverspent = envelope.filled < 0
  const isFull = envelope.filled >= envelope.budgeted && envelope.budgeted > 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card p-4 hover:border-slate-700 transition-colors duration-200 relative group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', COLOR_MAP[envelope.color])}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-slate-50 text-sm leading-tight">{envelope.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              of {formatCurrency(envelope.budgeted)} / mo
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in">
              <button
                onClick={() => { onEdit(envelope); setShowMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-slate-50 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => { onDelete(envelope.id); setShowMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <span
          className={cn(
            'text-2xl font-bold font-mono tracking-tight',
            isOverspent ? 'text-rose-400' : isFull ? SOLID_COLOR_MAP[envelope.color] : 'text-slate-50',
          )}
        >
          {formatCurrency(envelope.filled)}
        </span>
        {isOverspent && (
          <span className="ml-2 badge bg-rose-500/20 text-rose-400 border border-rose-500/30">
            overspent
          </span>
        )}
        {isFull && !isOverspent && (
          <span className={cn('ml-2 badge border', COLOR_MAP[envelope.color])}>
            funded
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={cn('h-full rounded-full', isOverspent ? 'bg-rose-500' : PROGRESS_COLOR_MAP[envelope.color])}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onFill(envelope)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-50 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Fill
        </button>
        <button
          onClick={() => onSpend(envelope)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-50 transition-colors"
        >
          <MinusCircle className="w-3.5 h-3.5" /> Spend
        </button>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  )
}
