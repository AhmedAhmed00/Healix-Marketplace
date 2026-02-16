import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./card";

export default function FullPageLoading({ resource }: { resource: string }) {


    return <div className="space-y-50 ">
        <Card>
            <CardContent className="flex min-h-[800px] flex-col items-center justify-center py-16">
                <Loader2 className="h-16 w-16 text-[#3BC1CF] mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Loading {resource}</h2>
                <p className="text-muted-foreground">
                    Please wait while we fetch the {resource} details...
                </p>
            </CardContent>
        </Card>
    </div>
}