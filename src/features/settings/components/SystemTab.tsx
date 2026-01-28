import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Settings, Globe, Clock, Database, Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface SystemSettings {
  language: string
  timezone: string
  dateFormat: string
  timeFormat: string
  autoBackup: boolean
  backupFrequency: string
  maintenanceMode: boolean
  enableAnalytics: boolean
  enableLogging: boolean
  sessionTimeout: number
}

const mockSystemSettings: SystemSettings = {
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  autoBackup: true,
  backupFrequency: 'daily',
  maintenanceMode: false,
  enableAnalytics: true,
  enableLogging: true,
  sessionTimeout: 30,
}

export function SystemTab() {
  const [settings, setSettings] = useState<SystemSettings>(mockSystemSettings)

  const handleSave = () => {
    console.log('System settings saved:', settings)
    // TODO: Save to backend
  }

  return (
    <div className="space-y-6">
      {/* Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Localization
          </CardTitle>
          <CardDescription>
            Configure language, timezone, and date/time formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                <SelectTrigger className="focus:ring-[#3BC1CF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                <SelectTrigger className="focus:ring-[#3BC1CF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}>
                <SelectTrigger className="focus:ring-[#3BC1CF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Format</Label>
              <Select value={settings.timeFormat} onValueChange={(value) => setSettings({ ...settings, timeFormat: value })}>
                <SelectTrigger className="focus:ring-[#3BC1CF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12 Hour</SelectItem>
                  <SelectItem value="24h">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <Database className="w-5 h-5" />
            Backup & Maintenance
          </CardTitle>
          <CardDescription>
            Configure backup settings and system maintenance options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Backup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically backup your data at scheduled intervals
              </p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
            />
          </div>
          {settings.autoBackup && (
            <div className="space-y-2 pl-6">
              <Label>Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}>
                <SelectTrigger className="focus:ring-[#3BC1CF]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable maintenance mode to restrict access during updates
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>
            Configure security settings and privacy options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Allow collection of usage analytics to improve the platform
              </p>
            </div>
            <Switch
              checked={settings.enableAnalytics}
              onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Logging</Label>
              <p className="text-sm text-muted-foreground">
                Log system events and user activities for debugging
              </p>
            </div>
            <Switch
              checked={settings.enableLogging}
              onCheckedChange={(checked) => setSettings({ ...settings, enableLogging: checked })}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Session Timeout (minutes)
            </Label>
            <Input
              type="number"
              min="5"
              max="480"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
              className="focus-visible:ring-[#3BC1CF]"
            />
            <p className="text-xs text-muted-foreground">
              Automatically log out users after inactivity period
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          Save System Settings
        </Button>
      </div>
    </div>
  )
}
