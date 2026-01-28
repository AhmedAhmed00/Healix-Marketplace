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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { InfiniteSelect } from '@/components/shared/selectors/infinite-select'
import { AddProductFormInput, productStatuses } from '../../schemas/product-schema'
import { fetchCategories } from '../../api/product-api'

interface BasicInfoSectionProps {
    form: UseFormReturn<AddProductFormInput>
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
    return (
        <div className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    {productStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
