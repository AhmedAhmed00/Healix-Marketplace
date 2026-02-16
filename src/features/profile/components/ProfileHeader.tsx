import { Card, CardContent } from "@/components/ui/card"

interface ProfileHeaderProps {
  profile: ProfileHeaderProps
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="relative overflow-hidden border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center text-4xl font-bold">
            {profile.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">
                {profile.full_name}
              </h1>
              <p className="text-slate-500">
                {profile.business_name}
              </p>
            </div>

            {profile.bio && (
              <p className="text-slate-600">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 pt-2 text-sm">
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
  )
}
