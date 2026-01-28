import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft, Edit, Megaphone, DollarSign, Eye, MousePointerClick, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockAds } from '../data/mockAds'
import { getStatusConfig, getTypeConfig } from '../components/AdTableColumns'

export function ViewAdPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const ad = useMemo(() => {
    return mockAds.find((a) => a.id === id)
  }, [id])

  if (!ad) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Megaphone className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Ad Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The advertisement you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/ads')}>
              Back to Ads
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig = getStatusConfig(ad.status)
  const typeConfig = getTypeConfig(ad.type)
  const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00'
  const budgetUsed = ad.budget > 0 ? ((ad.spent / ad.budget) * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/ads')}
            className="hover:bg-[#3BC1CF]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
              {ad.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              Advertisement Details & Performance
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/ads/edit/${ad.id}`)}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Ad
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Ad Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ad.description && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Description</label>
                    <p className="mt-1 text-sm">{ad.description}</p>
                  </div>
                  <Separator />
                </>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Type</label>
                  <div className="mt-1">
                    <Badge variant="outline" className={typeConfig.color}>
                      {typeConfig.label}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Link URL</label>
                <div className="mt-1 flex items-center gap-2">
                  <a
                    href={ad.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1974BB] dark:text-[#3BC1CF] hover:underline flex items-center gap-1"
                  >
                    {ad.linkUrl}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Preview */}
          {(ad.imageUrl || ad.videoUrl) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Media Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {ad.videoUrl ? (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <video src={ad.videoUrl} controls className="max-w-full max-h-full rounded-lg">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : ad.imageUrl ? (
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <img
                      src={ad.imageUrl}
                      alt={ad.title}
                      className="w-full h-auto"
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <label className="text-sm font-semibold text-muted-foreground">Impressions</label>
                  <p className="mt-1 text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    {ad.impressions.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <label className="text-sm font-semibold text-muted-foreground">Clicks</label>
                  <p className="mt-1 text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    {ad.clicks.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <label className="text-sm font-semibold text-muted-foreground">CTR (Click-Through Rate)</label>
                  <p className="mt-1 text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    {ctr}%
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <label className="text-sm font-semibold text-muted-foreground">CPC (Cost Per Click)</label>
                  <p className="mt-1 text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    ${ad.clicks > 0 ? (ad.spent / ad.clicks).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Total Budget</label>
                <p className="mt-1 text-lg font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                  ${ad.budget.toLocaleString()}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Amount Spent</label>
                <p className="mt-1 text-lg font-semibold">
                  ${ad.spent.toLocaleString()}
                </p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-[#1974BB] dark:bg-[#3BC1CF] h-2 rounded-full"
                    style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {budgetUsed}% of budget used
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Remaining Budget</label>
                <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                  ${(ad.budget - ad.spent).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advertiser */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Advertiser</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Advertiser Name</label>
                <p className="mt-1 font-medium">{ad.advertiser}</p>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Start Date</label>
                <p className="text-sm">
                  {new Date(ad.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(ad.startDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">End Date</label>
                <p className="text-sm">
                  {new Date(ad.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(ad.endDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
