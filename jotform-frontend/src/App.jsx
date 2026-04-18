import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './config/routes'
import InvestigationLayout from './layouts/InvestigationLayout'
import DashboardPage from './pages/DashboardPage'
import EventFlowPage from './pages/EventFlowPage'
import PeoplePage from './pages/PeoplePage'
import RecordsPage from './pages/RecordsPage'

function App() {
  return (
    <Routes>
      <Route element={<InvestigationLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.PEOPLE} element={<PeoplePage />} />
        <Route path={ROUTES.RECORDS} element={<RecordsPage />} />
        <Route path={ROUTES.EVENT_FLOW} element={<EventFlowPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}

export default App
