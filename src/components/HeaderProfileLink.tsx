import { Link } from 'react-router'
import { UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function HeaderProfileLink() {
  return (
    <Button variant="ghost" size="icon" className="rounded-sm" asChild>
      <Link to="/profile" title="Vendor profile">
        <Avatar className="h-10 w-10 border border-[rgb(var(--brand-primary))]/30 rounded-sm">
          <AvatarFallback className="text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
            <UserCircle className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  )
}
