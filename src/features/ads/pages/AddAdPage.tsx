import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addAdSchema, type AddAdFormInput, adTypes, adStatuses } from '../schemas/ad-schema'

export function AddAdPage() {
  const navigate = useNavigate()

  const form = useForm<AddAdFormInput>({
    resolver: zodResolver(addAdSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'banner',
      status: 'pending',
      imageUrl: '',
      videoUrl: '',
      linkUrl: '',
      startDate: '',
      endDate: '',
      budget: '',
      advertiser: '',
    },
  })

  const adType = form.watch('type')

  const handleSubmit = (data: AddAdFormInput) => {
    const transformedData = {
      ...data,
      budget: Number(data.budget),
      imageUrl: data.imageUrl || undefined,
      videoUrl: data.videoUrl || undefined,
    }
    console.log('New ad data:', transformedData)
    // TODO: Add ad to the database/state
    navigate('/ads')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/ads')}
          className="hover:bg-[#3BC1CF]/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Add New Ad
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new advertisement for your marketplace
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Ad Information</CardTitle>
          <CardDescription>
            Fill in all the required details to add a new advertisement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Ad Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Ad Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Summer Sale Banner"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the advertisement..."
                        className="focus-visible:ring-[#3BC1CF] min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ad Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Ad Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#3BC1CF]">
                            <SelectValue placeholder="Select ad type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#3BC1CF]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Media URLs */}
              {adType === 'video' ? (
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Video URL *</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/video.mp4"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Image URL *</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Link URL */}
              <FormField
                control={form.control}
                name="linkUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Link URL *</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/target-page"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      URL where users will be redirected when clicking the ad
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Start Date *</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">End Date *</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Budget and Advertiser */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Budget ($) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
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
                  name="advertiser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Advertiser *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Company Name"
                          className="focus-visible:ring-[#3BC1CF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/ads')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Adding Ad...' : 'Add Ad'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
