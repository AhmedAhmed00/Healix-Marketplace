import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Eye, Download } from 'lucide-react'
import type { MedicalRecord } from '../../types'

interface MedicalRecordsTabProps {
  records: MedicalRecord[]
  onView: (record: MedicalRecord) => void
  onDownload: (record: MedicalRecord) => void
}

export function MedicalRecordsTab({ records, onView, onDownload }: MedicalRecordsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>{records.length} records found</CardDescription>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No medical records found</p>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <div key={record.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <h4 className="font-medium">{record.title}</h4>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Uploaded by: {record.uploadedBy}</span>
                      <span>Date: {new Date(record.uploadDate).toLocaleDateString()}</span>
                      <span>Size: {(record.fileSize / 1000).toFixed(0)} KB</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(record)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onDownload(record)}
                      className="gap-2 bg-linear-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))]"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
