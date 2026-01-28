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

interface InventorySectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function InventorySection({ form }: InventorySectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">SKU *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., PROD-001"
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
            </div>

            <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Barcode</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Optional barcode"
                                className="focus-visible:ring-[#3BC1CF]"
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
