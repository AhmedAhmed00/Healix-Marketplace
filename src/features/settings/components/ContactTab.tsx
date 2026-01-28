import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Globe, MessageSquare } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface ContactInfo {
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  website: string
  supportEmail: string
  salesEmail: string
  supportPhone: string
}

const mockContactInfo: ContactInfo = {
  email: 'contact@marketplace.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  website: 'https://marketplace.com',
  supportEmail: 'support@marketplace.com',
  salesEmail: 'sales@marketplace.com',
  supportPhone: '+1 (555) 123-4568',
}

export function ContactTab() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(mockContactInfo)

  const handleSave = () => {
    console.log('Contact information saved:', contactInfo)
    // TODO: Save to backend
  }

  return (
    <div className="space-y-6">
      {/* Primary Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Primary Contact Information
          </CardTitle>
          <CardDescription>
            Main contact details for your marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="contact@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </Label>
            <Input
              type="url"
              value={contactInfo.website}
              onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
              className="focus-visible:ring-[#3BC1CF]"
              placeholder="https://example.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Physical Address
          </CardTitle>
          <CardDescription>
            Business address and location details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Street Address</Label>
            <Input
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              className="focus-visible:ring-[#3BC1CF]"
              placeholder="123 Business Street"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={contactInfo.city}
                onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label>State/Province</Label>
              <Input
                value={contactInfo.state}
                onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="State"
              />
            </div>
            <div className="space-y-2">
              <Label>ZIP/Postal Code</Label>
              <Input
                value={contactInfo.zipCode}
                onChange={(e) => setContactInfo({ ...contactInfo, zipCode: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="12345"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input
              value={contactInfo.country}
              onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
              className="focus-visible:ring-[#3BC1CF]"
              placeholder="Country"
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Department Contacts
          </CardTitle>
          <CardDescription>
            Contact information for different departments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input
                type="email"
                value={contactInfo.supportEmail}
                onChange={(e) => setContactInfo({ ...contactInfo, supportEmail: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="support@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Support Phone</Label>
              <Input
                type="tel"
                value={contactInfo.supportPhone}
                onChange={(e) => setContactInfo({ ...contactInfo, supportPhone: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="+1 (555) 123-4568"
              />
            </div>
            <div className="space-y-2">
              <Label>Sales Email</Label>
              <Input
                type="email"
                value={contactInfo.salesEmail}
                onChange={(e) => setContactInfo({ ...contactInfo, salesEmail: e.target.value })}
                className="focus-visible:ring-[#3BC1CF]"
                placeholder="sales@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          Save Contact Information
        </Button>
      </div>
    </div>
  )
}
