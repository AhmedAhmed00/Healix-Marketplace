import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router"
import { ProfileHeader } from "./components/ProfileHeader"
import { StatisticsSection } from "./components/StatisticsSection"
import { ProfessionalSection } from "./components/ProfessionalSection"
import { FinancialSection } from "./components/FinancialSection"
import { getProfileDataFromUser } from "./utils/getProfileDataFromUser"

export default function ProfilePage() {
  const { user } = useAuth()
  const profile = getProfileDataFromUser(user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    return null
  }

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-linear-to-b from-(--brand-gradient-from) to-(--brand-gradient-to) rounded-full" />
          <h2 className="text-2xl font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
            Store Statistics
          </h2>
        </div>
        <StatisticsSection statistics={profile.statistics} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ProfessionalSection profile={profile} />
        <FinancialSection profile={profile} />
      </div>
    </div>
  )
}

