import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, MapPin, Building } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  address: string
  city: string
  country: string
  bio: string
  avatar?: string
}

const mockProfileData: ProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@marketplace.com',
  phone: '+1 (555) 123-4567',
  company: 'Marketplace Inc',
  address: '123 Business Street',
  city: 'New York',
  country: 'United States',
  bio: 'Experienced marketplace administrator focused on growth and customer satisfaction.',
}

export function ProfileTab() {
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData)

  const form = useForm<ProfileData>({
    defaultValues: profileData,
  })

  // Update form when profileData changes
  useEffect(() => {
    form.reset(profileData)
  }, [profileData, form])

  const handleSubmit = (data: ProfileData) => {
    setProfileData(data)
    console.log('Profile updated:', data)
    // TODO: Save to backend
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4 pb-6 border-b">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.avatar} alt={`${profileData.firstName} ${profileData.lastName}`} />
                  <AvatarFallback className="bg-[#3BC1CF] text-white text-xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{profileData.firstName} {profileData.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    Change Avatar
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company name"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Street address"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
                            className="focus-visible:ring-[#3BC1CF]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Country"
                            className="focus-visible:ring-[#3BC1CF]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        className="focus-visible:ring-[#3BC1CF] min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
