import { UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { AddProductFormInput, leasePeriods, saleTypes } from '../../schemas/product-schema'

interface PricingSectionProps {
    form: UseFormReturn<AddProductFormInput>
    product?: AddProductFormInput
}

export function PricingSection({ form, product }: PricingSectionProps) {
    const saleType = form.watch('sale_type')
    const showLeaseFields = saleType === 'lease' || saleType === 'both'

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Pricing & Sale Type</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure how this product will be sold</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sale Type */}
                <FormField
                    control={form.control}
                    name="sale_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Sale Type *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="focus:ring-[#3BC1CF]">
                                        <SelectValue placeholder="Select sale type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {saleTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type === 'sale' ? 'Sale Only' : type === 'lease' ? 'Lease Only' : 'Both Sale & Lease'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Price */}
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
            </div>

            {/* Lease-specific fields */}
            {showLeaseFields && (
                <div className="rounded-lg border p-6 bg-muted/30 space-y-6">
                    <div>
                        <h4 className="text-md font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Lease Information</h4>
                        <p className="text-sm text-muted-foreground mt-1">Required for lease options</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Lease Period */}
                        <FormField
                            control={form.control}
                            name="lease_period"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold">Lease Period *</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value ?? ''}>
                                        <FormControl>
                                            <SelectTrigger className="focus:ring-[#3BC1CF]">
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {leasePeriods.map((period) => (
                                                <SelectItem key={period} value={period}>
                                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Lease Price */}
                        <FormField
                            control={form.control}
                            name="lease_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold">Lease Price ($) *</FormLabel>
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

                        {/* Insurance Price */}
                        <FormField
                            control={form.control}
                            name="insurance_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold">Insurance Price ($) *</FormLabel>
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
            )}
        </div>
    )
}
