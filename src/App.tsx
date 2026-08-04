import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Transactions } from '@/pages/Transactions'
import { Settings } from '@/pages/Settings'
import { useAppState } from '@/hooks/useAppState'

export default function App() {
  const appState = useAppState()

  return (
    <Layout
      readyToAssign={appState.state.month.readyToAssign}
      monthId={appState.state.month.id}
    >
      <Routes>
        <Route path="/" element={<Dashboard appState={appState} />} />
        <Route path="/transactions" element={<Transactions appState={appState} />} />
        <Route path="/settings" element={<Settings appState={appState} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
