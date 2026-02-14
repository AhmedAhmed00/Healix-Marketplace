import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PatientFeedback } from '../../types'

interface FeedbackTabProps {
  feedback: PatientFeedback[]
}

export function FeedbackTab({ feedback }: FeedbackTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Feedback</CardTitle>
        <CardDescription>{feedback.length} feedback entries</CardDescription>
      </CardHeader>
      <CardContent>
        {feedback.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No feedback found</p>
        ) : (
          <div className="space-y-3">
            {feedback.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{item.serviceName}</h4>
                    <p className="text-sm text-muted-foreground">Provider: {item.providerName}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <p className="text-sm mb-2">{item.comment}</p>
                {item.response && (
                  <div className="bg-muted p-3 rounded-lg mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Response:</p>
                    <p className="text-sm">{item.response}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
