/**
 * Support Chat Page
 * Real-time chat interface for support
 */

import { useState } from 'react'
import { ChatTab, type ChatMessage } from '../components'

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: 'You',
      senderRole: 'user',
      message,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate support response (in real app, this would be an API call)
    setIsLoading(true)
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderName: 'Support Team',
        senderRole: 'support',
        message: 'Thank you for your message. Our team will get back to you shortly.',
        timestamp: new Date().toISOString(),
        isRead: true,
      }
      setMessages((prev) => [...prev, supportMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <ChatTab messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}
