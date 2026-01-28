import { useEffect, useRef } from "react"

export function useIntersection(callback: () => void, enabled: boolean) {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!enabled || !ref.current) return

        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && callback(),
            { rootMargin: "100px" }
        )

        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [callback, enabled])

    return ref
}
