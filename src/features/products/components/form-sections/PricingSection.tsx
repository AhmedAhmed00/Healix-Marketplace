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
import { Checkbox } from '@/components/ui/checkbox'
import { AddProductFormInput, leasePeriods } from '../../schemas/product-schema'

interface PricingSectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function PricingSection({ form }: PricingSectionProps) {
    const lease = form.watch('lease')
    const outrightSale = form.watch('outrightSale')

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Pricing & Sale Type</h3>
            <p className="text-sm text-muted-foreground">Select at least one option. You can offer both lease and outright sale.</p>

            {/* Lease & Outright sale checkboxes */}
            <div className="flex flex-wrap gap-6">
                <FormField
                    control={form.control}
                    name="lease"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-[#1974BB] data-[state=checked]:bg-[#3BC1CF] data-[state=checked]:border-[#3BC1CF]"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-semibold cursor-pointer">Lease</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="outrightSale"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-[#1974BB] data-[state=checked]:bg-[#3BC1CF] data-[state=checked]:border-[#3BC1CF]"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-semibold cursor-pointer">Outright sale</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="lease"
                render={() => <FormMessage />}
            />

            {/* Single Actual price – used for both lease and outright sale when both are selected */}
            {(lease || outrightSale) && (
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="max-w-xs">
                            <FormLabel className="text-sm font-semibold">Actual price ($) *</FormLabel>
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
            )}

            {/* Lease-only fields: period, lease price, insurance price */}
            {lease && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg border p-4 bg-muted/30">
                    <FormField
                        control={form.control}
                        name="leasePeriod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Lease period *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                                    <FormControl>
                                        <SelectTrigger className="focus:ring-[#3BC1CF]">
                                            <SelectValue placeholder="Daily / Monthly / Yearly" />
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
                    <FormField
                        control={form.control}
                        name="leasePrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Lease price ($) *</FormLabel>
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
                        name="insurancePrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Insurance price ($) *</FormLabel>
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
            )}
        </div>
    )
}
