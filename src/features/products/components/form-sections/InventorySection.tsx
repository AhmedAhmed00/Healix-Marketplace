import { UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { AddProductFormInput } from '../../schemas/product-schema'

interface InventorySectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function InventorySection({ form }: InventorySectionProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Inventory & Status</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage stock and product availability</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stock Quantity */}
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Stock Quantity *</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="1"
                                    className="focus-visible:ring-[#3BC1CF]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Is Active */}
                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-sm font-semibold">Active Status</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                    Make this product visible to customers
                                </div>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-[#3BC1CF]"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
