/**
 * Support Page
 * Main page with tabs for Tickets and Chat
 */

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TicketPlus, MessageSquare } from 'lucide-react'
import { TicketsPage } from './TicketsPage'
import { ChatPage } from './ChatPage'

export function SupportPage() {
  const [activeTab, setActiveTab] = useState('tickets')

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-1 flex-wrap gap-2">
          <TabsTrigger
            value="tickets"
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <TicketPlus className="w-4 h-4" />
              <span>Tickets</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-6">
          <TicketsPage />
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <ChatPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
