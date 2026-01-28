import { UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddProductFormInput } from '../../schemas/product-schema'

interface AdditionalInfoSectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function AdditionalInfoSection({ form }: AdditionalInfoSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Additional Information</h3>

            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Tags</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="e.g., electronics, premium, bundle (comma-separated)"
                                className="focus-visible:ring-[#3BC1CF]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-xs">
                            Separate tags with commas
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Weight (kg)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0.0"
                                    min="0"
                                    step="0.1"
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
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Length (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
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
                    name="width"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Width (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
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
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Height (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
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
    )
}
