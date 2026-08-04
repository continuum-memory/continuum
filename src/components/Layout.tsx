import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Settings, Wallet, Leaf } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  readyToAssign: number
  monthId: string
}

const nav = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
  { to: '/transactions', label: 'Transactions', Icon: ArrowLeftRight },
  { to: '/settings', label: 'Settings', Icon: Settings },
]

export function Layout({ children, readyToAssign, monthId }: LayoutProps) {
  const [year, month] = monthId.split('-')
  const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const isNegative = readyToAssign < 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-semibold text-slate-50 tracking-tight">FrugalHQ</span>
          </div>

          {/* Ready to assign pill */}
          <div
            className={cn(
              'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border',
              isNegative
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
            )}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{formatCurrency(readyToAssign)} ready to assign</span>
          </div>

          {/* Month */}
          <span className="text-sm text-slate-500 shrink-0">{monthName}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4">
        {/* Mobile ready-to-assign */}
        <div
          className={cn(
            'sm:hidden flex items-center gap-2 px-3 py-2 my-3 rounded-xl text-sm font-medium border',
            isNegative
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          )}
        >
          <Wallet className="w-4 h-4" />
          <span>{formatCurrency(readyToAssign)} ready to assign</span>
        </div>

        {/* Page content */}
        <main className="flex-1 py-6">{children}</main>
      </div>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-40 border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {nav.map(({ to, label, Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-150',
                    isActive
                      ? 'text-emerald-400'
                      : 'text-slate-500 hover:text-slate-300',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
                    <span className="text-xs font-medium">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
