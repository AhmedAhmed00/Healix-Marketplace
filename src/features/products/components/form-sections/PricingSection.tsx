import { UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddProductFormInput } from '../../schemas/product-schema'

interface PricingSectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function PricingSection({ form }: PricingSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Price ($) *</FormLabel>
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
                    name="compareAtPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Compare At Price ($)</FormLabel>
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
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Cost ($) *</FormLabel>
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
            </div>
        </div>
    )
}
