import { useState } from 'react'
import { Trash2, Download, Upload, Shield, RefreshCw, ExternalLink, Github } from 'lucide-react'
import type { useAppState } from '@/hooks/useAppState'
import type { AppState } from '@/types'

interface SettingsProps {
  appState: ReturnType<typeof useAppState>
}

export function Settings({ appState }: SettingsProps) {
  const [confirmReset, setConfirmReset] = useState(false)

  const handleExport = () => {
    const data = JSON.stringify(appState.state, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `continuum-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string) as AppState
          localStorage.setItem('continuum_data', JSON.stringify(parsed))
          window.location.reload()
        } catch {
          alert('Invalid backup file')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-semibold text-slate-50">Settings</h1>

      {/* Data */}
      <section className="card p-5 space-y-3">
        <h2 className="font-medium text-slate-200 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" /> Your Data
        </h2>
        <p className="text-sm text-slate-400">
          All data is stored locally on your device. Nothing is sent to a server. Export a backup anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 flex-1 btn-ghost border border-slate-700 py-2.5 rounded-xl"
          >
            <Download className="w-4 h-4" /> Export backup
          </button>
          <button
            onClick={handleImport}
            className="flex items-center justify-center gap-2 flex-1 btn-ghost border border-slate-700 py-2.5 rounded-xl"
          >
            <Upload className="w-4 h-4" /> Import backup
          </button>
        </div>
      </section>

      {/* About */}
      <section className="card p-5 space-y-3">
        <h2 className="font-medium text-slate-200">About Continuum</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Continuum is a local-first envelope budgeting app. The envelope method forces you to only spend money you actually have — not money you're expecting. No subscriptions, no tracking, no data leaving your device.
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <a
            href="https://github.com/continuum-memory/continuum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-50 transition-colors"
          >
            <Github className="w-4 h-4" /> continuum-memory/continuum on GitHub
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
        </div>
        <p className="text-xs text-slate-600">Open source · MIT License · v0.1.0</p>
      </section>

      {/* Danger zone */}
      <section className="card p-5 space-y-3 border-rose-500/20">
        <h2 className="font-medium text-rose-400 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger Zone
        </h2>
        <p className="text-sm text-slate-400">
          Reset all data for the current month. This cannot be undone. Export a backup first.
        </p>
        {confirmReset ? (
          <div className="flex gap-2">
            <button
              onClick={() => { appState.resetAll(); setConfirmReset(false) }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-400 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Yes, reset everything
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="btn-ghost border border-slate-700 px-4 py-2 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/30 text-rose-400 text-sm hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset all data
          </button>
        )}
      </section>
    </div>
  )
}
