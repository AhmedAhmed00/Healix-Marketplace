import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useCallback } from "react";

interface TableSearchProps {
  placeholder?: string;
  resultsCount?: number;
}

export function TableSearch({
  placeholder = "Search all columns...",
  resultsCount,
}: TableSearchProps) {


  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const updateSearchParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
        params.set("page", "1"); // reset pagination
      } else {
        params.delete("search");
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  // 🔥 Debounce API calls (500ms)
  const debounced = useDebouncedCallback((value: string) => {
    updateSearchParam(value);
  }, 500);

  return (
    <div className="flex items-center justify-between gap-8">
      <Input
        placeholder={placeholder}
        defaultValue={search}
        onChange={(e) => debounced(e.target.value)}
        className="w-[95%]"
      />

      {resultsCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultsCount} row(s) found
        </div>
      )}
    </div>
  );
}
