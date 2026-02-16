import { useRef, useState, useEffect } from 'react'
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
    isEditMode?: boolean
    existingMainImage?: string
    existingImages?: string[]
}

export function BasicInfoSection({
    form,
    isEditMode = false,
    existingMainImage,
    existingImages = []
}: BasicInfoSectionProps) {
    const mainImageInputRef = useRef<HTMLInputElement>(null)
    const additionalImagesInputRef = useRef<HTMLInputElement>(null)
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null)
    const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<string[]>([])

    // Sync previews with existing images in edit mode
    useEffect(() => {
        if (isEditMode) {
            if (existingMainImage) {
                setMainImagePreview(existingMainImage)
            }
            if (existingImages.length > 0) {
                setAdditionalImagesPreviews(existingImages)
            }
        }
    }, [isEditMode, existingMainImage, existingImages])

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setMainImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            onChange(files)

            const previews: string[] = []
            let loadedCount = 0

            files.forEach((file) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    previews.push(reader.result as string)
                    loadedCount++

                    if (loadedCount === files.length) {
                        setAdditionalImagesPreviews((prev) => [...prev, ...previews])
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImage = (index: number, isExisting: boolean, currentImages: any[], onChange: (...event: any[]) => void) => {
        if (isExisting) {
            // Logic to track removed existing images if needed by backend
            setAdditionalImagesPreviews((prev) => prev.filter((_, i) => i !== index))
        } else {
            const newImages = currentImages.filter((_, i) => i !== index)
            onChange(newImages)
            setAdditionalImagesPreviews((prev) => prev.filter((_, i) => i !== index))
        }
    }

    return (
        <div className="space-y-6">
            {/* Main Image */}
            <FormField
                control={form.control}
                name="main_image"
                render={({ field: { onChange } }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Main Product Image *</FormLabel>
                        <FormControl>
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-muted/50 border-muted-foreground/20 hover:border-[#3BC1CF]/50 transition-colors cursor-pointer relative group"
                                onClick={() => mainImageInputRef.current?.click()}>
                                {mainImagePreview ? (
                                    <div className="relative w-full aspect-video max-h-[300px] overflow-hidden rounded-md">
                                        <img src={mainImagePreview} alt="Main Preview" className="w-full h-full object-contain" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setMainImagePreview(null)
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
                                            <p className="text-sm font-medium">Click to upload main product image</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={mainImageInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleMainImageChange(e, onChange)}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Additional Images */}
            <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, value } }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Additional Images (Optional)</FormLabel>
                        <FormControl>
                            <div>
                                <div
                                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-muted/50 border-muted-foreground/20 hover:border-[#3BC1CF]/50 transition-colors cursor-pointer"
                                    onClick={() => additionalImagesInputRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center gap-2 py-2">
                                        <Upload className="h-6 w-6 text-[#3BC1CF]" />
                                        <div className="text-center">
                                            <p className="text-sm font-medium">Click to upload additional images</p>
                                            <p className="text-xs text-muted-foreground">Select multiple files</p>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={additionalImagesInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleAdditionalImagesChange(e, onChange)}
                                    />
                                </div>

                                {additionalImagesPreviews.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {additionalImagesPreviews.map((preview, index) => (
                                            <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                                                <img src={preview} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(index, typeof preview === 'string' && preview.startsWith('http'), value || [], onChange)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
