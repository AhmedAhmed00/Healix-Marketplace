import * as React from "react";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
    label: string;
    value: string;
}

interface InfiniteSelectProps {
    fetchFunction: (page: number) => Promise<{ items: Option[] }>;
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
}

export const InfiniteSelect = React.memo(({
    fetchFunction,
    placeholder = "Select...",
    value,
    onValueChange,
    disabled = false,
}: InfiniteSelectProps) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const hasLoadedInitial = useRef(false);

    // Intersection observer for the last item
    const { ref: lastItemRef, inView } = useInView({
        threshold: 0,
        rootMargin: "50px",
    });

    // Load items for a page
    const loadItems = useCallback(
        async (pageNumber: number) => {
            if (loading || !hasMore) return;

            setLoading(true);
            try {
                const newItems = await fetchFunction(pageNumber);
                setItems((prev) => [...prev, ...newItems.items]);

                if (newItems.items.length === 0) {
                    setHasMore(false);
                } else {
                    setPage(pageNumber + 1);
                }
            } catch (err) {
                console.error("Failed to load items", err);
            } finally {
                setLoading(false);
            }
        },
        [fetchFunction, loading, hasMore]
    );

    // Load initial items when popover opens
    const handleOpenChange = useCallback(
        (isOpen: boolean) => {
            setOpen(isOpen);
            if (isOpen && !hasLoadedInitial.current) {
                hasLoadedInitial.current = true;
                loadItems(1);
            }
        },
        [loadItems]
    );

    // Load more items when last item comes into view
    useEffect(() => {
        if (inView && hasMore && !loading && items.length > 0) {
            loadItems(page);
        }
    }, [inView, hasMore, loading, page, items.length, loadItems]);


    const selectedItem = useMemo(() =>
        items.find((item) => item.value === value),
        [items, value]);

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="popover"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between w-full! font-normal shadow-none!")}
                    disabled={disabled}
                >
                    <span className="truncate">
                        {selectedItem ? selectedItem.label : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 font-normal w-[var(--radix-popover-trigger-width)]"
                align="start"
            >
                <Command>
                    <CommandInput placeholder={`Search ${placeholder}...`} />
                    <CommandList>
                        {!loading && <CommandEmpty>No results found.</CommandEmpty>
                        }
                        <CommandGroup >
                            {items.map((item, index) => {
                                const isLastItem = index === items.length - 1;
                                // Use a composite key to guarantee uniqueness even if values repeat
                                return (
                                    <CommandItem
                                        key={`${item.value}-${index}`}
                                        value={item.label}
                                        onSelect={() => {
                                            onValueChange?.(item.value);
                                            setOpen(false);
                                        }}
                                        ref={isLastItem ? lastItemRef : undefined}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {loading && (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
                            </div>
                        )}
                        {!hasMore && items.length > 0 && (
                            <div className="p-4 text-center text-sm text-muted-foreground border-t">
                                No more items
                            </div>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

InfiniteSelect.displayName = "InfiniteSelect";