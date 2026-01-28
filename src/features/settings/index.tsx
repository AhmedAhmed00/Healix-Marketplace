/**
 * Settings Page
 * Main settings module for system configuration
 */

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, ShieldCheck, Bell, Settings as SettingsIcon, Cog, Mail } from 'lucide-react'
import { ProfileTab, PasswordSection, NotificationsSection, SystemTab, ContactTab } from './components'
import { mockNotificationPreferences } from './data/mockSettings'
import type { NotificationPreferences } from './types'

export function SettingsPage() {
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    mockNotificationPreferences
  )

  const handlePasswordSave = (data: { currentPassword: string; newPassword: string }) => {
    console.log('Password updated:', data)
  }

  const handleNotificationsSave = (preferences: NotificationPreferences) => {
    setNotificationPreferences(preferences)
    console.log('Notification preferences saved:', preferences)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-[rgb(var(--brand-primary))]" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize system preferences and control operational configurations
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-1 flex-wrap gap-2">
          <TabsTrigger 
            value="profile" 
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Security</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="system" 
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Cog className="w-4 h-4" />
              <span>System</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <PasswordSection onSave={handlePasswordSave} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSection
            preferences={notificationPreferences}
            onSave={handleNotificationsSave}
          />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <SystemTab />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <ContactTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage

