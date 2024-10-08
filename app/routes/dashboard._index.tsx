import { useNavigate } from '@remix-run/react'
import DashboardPage from '~/components/DashboardPage'
import { useAuth } from '~/contexts/authContext'

export default function DashboardLayout() {
    const { user } = useAuth()
    const navigate = useNavigate()

    if (user === null) navigate('/login')

    return <DashboardPage />
}
