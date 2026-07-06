import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GlossaryPage from './pages/GlossaryPage'
import CombatPage from './pages/CombatPage'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'glossary', element: <GlossaryPage /> },
      { path: 'combat', element: <CombatPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
