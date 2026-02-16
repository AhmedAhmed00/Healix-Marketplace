/**
 * ChatTab Component
 * Real-time chat/conversation interface for support
 */

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, MessageSquare, User, HeadsetIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  senderName: string
  senderRole: 'support' | 'user' | 'system'
  message: string
  timestamp: string
  isRead?: boolean
  avatar?: string
}

interface ChatTabProps {
  messages?: ChatMessage[]
  onSendMessage?: (message: string) => void
  isLoading?: boolean
}

const ROLE_CONFIG = {
  support: {
    icon: HeadsetIcon,
    color: 'bg-[rgb(var(--brand-primary))]',
    label: 'Support',
  },
  user: {
    icon: User,
    color: 'bg-[rgb(var(--brand-secondary))]',
    label: 'You',
  },
  system: {
    icon: MessageSquare,
    color: 'bg-slate-500',
    label: 'System',
  },
}

export function ChatTab({ messages = [], onSendMessage, isLoading = false }: ChatTabProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Mock messages for initial display
  const defaultMessages: ChatMessage[] = [
    {
      id: '1',
      senderName: 'Support Team',
      senderRole: 'support',
      message: 'Hello! How can we help you today?',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
  ]

  const displayMessages = messages.length > 0 ? messages : defaultMessages

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayMessages])

  const handleSend = async () => {
    if (!newMessage.trim() || !onSendMessage) return

    setIsSending(true)
    try {
      await onSendMessage(newMessage.trim())
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isUserMessage = (role: string) => role === 'user'

  return (
    <Card className="h-[calc(100vh-300px)] min-h-[600px] flex flex-col">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[rgb(var(--brand-primary))]/10">
              <HeadsetIcon className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
            </div>
            <div>
              <CardTitle className="text-lg">Support Chat</CardTitle>
              <p className="text-sm text-muted-foreground">We're here to help</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Online
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
          {displayMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <MessageSquare className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                No messages yet. Start a conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayMessages.map((message) => {
                const roleConfig = ROLE_CONFIG[message.senderRole]
                const RoleIcon = roleConfig.icon
                const userMessage = isUserMessage(message.senderRole)

                return (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      userMessage && 'flex-row-reverse'
                    )}
                  >
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      {message.avatar ? (
                        <AvatarImage src={message.avatar} alt={message.senderName} />
                      ) : null}
                      <AvatarFallback className={cn(roleConfig.color, 'text-white text-xs')}>
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn('flex-1 min-w-0', userMessage && 'flex flex-col items-end')}>
                      <div className={cn(
                        'flex items-center gap-2 flex-wrap mb-1',
                        userMessage && 'flex-row-reverse'
                      )}>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {message.senderName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          <RoleIcon className="w-3 h-3" />
                          {roleConfig.label}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div
                        className={cn(
                          'rounded-lg px-4 py-2 max-w-[80%]',
                          userMessage
                            ? 'bg-[rgb(var(--brand-primary))] text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                        )}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none focus-visible:ring-[rgb(var(--brand-primary))]"
              disabled={isSending || isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || isSending || isLoading}
              className="bg-[rgb(var(--brand-primary))] hover:opacity-90 h-[60px] px-4"
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
