import { useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { InfiniteSelect } from '@/components/shared/selectors/infinite-select'
import { AddProductFormInput } from '../../schemas/product-schema'
import { fetchCategories } from '../../api/product-api'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BasicInfoSectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Product Image</FormLabel>
                        <FormControl>
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-muted/50 border-muted-foreground/20 hover:border-[#3BC1CF]/50 transition-colors cursor-pointer relative group"
                                onClick={() => fileInputRef.current?.click()}>
                                {preview ? (
                                    <div className="relative w-full aspect-video max-h-[300px] overflow-hidden rounded-md">
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPreview(null)
                                                onChange(undefined)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 py-4">
                                        <div className="p-4 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                            <Upload className="h-8 w-8 text-[#3BC1CF]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">Click to upload product image</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, onChange)}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Product Name *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Premium Electronics Bundle"
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
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Brand (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Apple, Sony, Nike"
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
                name="category"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-semibold">Category *</FormLabel>
                        <FormControl>
                            <InfiniteSelect
                                fetchFunction={fetchCategories}
                                placeholder="Select category"
                                value={field.value}
                                onValueChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Description *</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Describe your product in detail..."
                                className="focus-visible:ring-[#3BC1CF] min-h-[100px]"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
