import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router"
import { Mail, Phone, MapPin, Store, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // assuming user already matches backend shape
  const profile = user

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <Card className="shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold">
              {profile.full_name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">

              <div>
                <h1 className="text-3xl font-bold">
                  {profile.full_name}
                </h1>
                <p className="text-slate-500 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  {profile.business_name}
                </p>
              </div>

              {profile.bio && (
                <p className="text-slate-600">
                  {profile.bio}
                </p>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm pt-2">

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profile.contact_email}
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {profile.contact_phone}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profile.city}, {profile.country}
                </div>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* ================= ACCOUNT DETAILS ================= */}
      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-6">

          {/* Status */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Account Status
            </h2>

            <div className="flex gap-4">
              <Badge variant={profile.is_active ? "default" : "destructive"}>
                {profile.is_active ? "Active" : "Inactive"}
              </Badge>

              <Badge variant={profile.is_verified ? "default" : "secondary"}>
                {profile.is_verified ? "Verified" : "Not Verified"}
              </Badge>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Address
            </h2>
            <p className="text-slate-600">
              {profile.address}
            </p>
          </div>

          {/* Email */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Primary Email
            </h2>
            <p className="text-slate-600">
              {profile.email}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Created At
              </h3>
              <p className="font-semibold">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Last Updated
              </h3>
              <p className="font-semibold">
                {new Date(profile.updated_at).toLocaleDateString()}
              </p>
            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  )
}
