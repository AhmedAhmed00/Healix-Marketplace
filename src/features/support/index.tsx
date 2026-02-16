/**
 * Support Module
 * Main entry point for support features
 */

import { Routes, Route } from 'react-router-dom'
import { SupportPage } from './pages/SupportPage'
import { SupportTicketDetails } from './components'

export default function SupportModule() {
  return (
    <Routes>
      <Route index element={<SupportPage />} />
      <Route path="details/:id" element={<SupportTicketDetails />} />
    </Routes>
  )
}
