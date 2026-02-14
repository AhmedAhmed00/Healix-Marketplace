import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StickyNote } from 'lucide-react'

export function NotesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Notes</CardTitle>
        <CardDescription>Internal notes about this patient</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button className="w-full">
            <StickyNote className="mr-2 h-4 w-4" />
            Add New Note
          </Button>
          <p className="text-center text-muted-foreground py-8">No notes yet</p>
        </div>
      </CardContent>
    </Card>
  )
}
