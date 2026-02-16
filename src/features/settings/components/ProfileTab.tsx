import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, X } from "lucide-react"
import type { UpdateProfilePayload } from "@/features/products/types"
import { useProfile } from "@/features/profile/hooks/use-profile"
import { useUpdateProfile } from "@/features/profile/hooks/use-patch-profile"

export function ProfileTab() {
  const { data: profileResponse, isLoading } = useProfile()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Extract the profile data from the response
  const profile = profileResponse?.data

  const form = useForm<UpdateProfilePayload>({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      bio: "",
      image: null,
    },
  })

  const { formState: { dirtyFields } } = form

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name,
        middle_name: profile.middle_name,
        last_name: profile.last_name,
        bio: profile.bio ?? "",
        image: null,
      })
    }
  }, [profile, form])

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file, { shouldDirty: true })
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Clear selected image
  const handleClearImage = () => {
    form.setValue("image", null, { shouldDirty: true })
    setPreviewUrl(null)
    // Reset file input
    const fileInput = document.getElementById('profile-image') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Get only dirty values for partial update
  const getDirtyValues = (): Partial<UpdateProfilePayload> => {
    const dirtyValues: Partial<UpdateProfilePayload> = {}
    const formValues = form.getValues()

    // Check each field if it's dirty
    if (dirtyFields.first_name) {
      dirtyValues.first_name = formValues.first_name
    }

    if (dirtyFields.middle_name) {
      dirtyValues.middle_name = formValues.middle_name
    }

    if (dirtyFields.last_name) {
      dirtyValues.last_name = formValues.last_name
    }

    if (dirtyFields.bio) {
      dirtyValues.bio = formValues.bio
    }

    // Handle image separately
    if (dirtyFields.image) {
      // Only include image if it's a File (new image) or null (remove image)
      if (formValues.image instanceof File || formValues.image === null) {
        dirtyValues.image = formValues.image
      }
    }

    return dirtyValues
  }

  const onSubmit = (data: UpdateProfilePayload) => {
    const dirtyValues = getDirtyValues()

    // Only submit if there are changes
    if (Object.keys(dirtyValues).length > 0) {
      console.log('Submitting dirty values:', dirtyValues)
      updateProfile(dirtyValues as UpdateProfilePayload)
    } else {
      console.log('No changes to update')
      // Optional: Show a toast or message that no changes were made
    }
  }

  // Determine which image to display
  const getImageSource = () => {
    if (previewUrl) return previewUrl
    if (profile?.image) return profile.image
    return undefined
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Loading profile...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Improved Avatar/Image Upload Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-muted/50 rounded-lg">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage
                    src={getImageSource()}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg bg-primary/10">
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>

                {/* Hover overlay for upload hint */}
                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-6 w-6 text-white" />
                </label>
              </div>

              <div className="flex-1 space-y-2">
                <FormLabel className="text-base">Profile Picture</FormLabel>
                <FormDescription className="text-sm">
                  Upload a square image for best results. Max size 5MB.
                </FormDescription>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('profile-image')?.click()}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose Image
                    </Button>
                  </div>

                  {(previewUrl || profile?.image) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearImage}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {previewUrl && (
                  <p className="text-xs text-muted-foreground">
                    New image selected: {form.watch('image')?.name}
                  </p>
                )}

                {!previewUrl && profile?.image && (
                  <p className="text-xs text-muted-foreground">
                    Current profile picture
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your middle name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us a little about yourself"
                      className="min-h-[120px] resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    Brief description about yourself. Max 500 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setPreviewUrl(null)
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}