import { useState, useCallback, useEffect } from "react"

export function useInfiniteOptions<T>(fetchFn: (page: number) => Promise<T[]>) {
    const [items, setItems] = useState<T[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return  // 🔒 guard

        setLoading(true)

        fetchFn(page).then(newItems => {
            setItems(prev => [...prev, ...newItems])
            setHasMore(newItems.length > 0)
            setPage(prev => prev + 1)
            setLoading(false)
        })
    }, [loading, hasMore, page, fetchFn])

    useEffect(() => {
        loadMore() // ✅ fetch only first page
    }, [])

    return { items, loadMore, loading, hasMore }
}
