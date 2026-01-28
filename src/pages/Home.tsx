import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      // Example API call
      return { message: 'Welcome to your React app!' }
    },
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-[#3BC1CF] to-[#1974BB] bg-clip-text text-transparent">
          Welcome to React 19 + Vite
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern React setup with React Router v7, Shadcn UI, TypeScript, React Query, React Hook Form, and Zod
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-[#3BC1CF] hover:shadow-lg hover:shadow-[#3BC1CF]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#1974BB]">React 19</CardTitle>
            <CardDescription>Latest version of React</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The newest version of React with improved performance and features.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1974BB] hover:shadow-lg hover:shadow-[#1974BB]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#3BC1CF]">React Router v7</CardTitle>
            <CardDescription>Modern routing solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The latest version of React Router for declarative routing.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#3BC1CF] hover:shadow-lg hover:shadow-[#3BC1CF]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#1974BB]">Shadcn UI</CardTitle>
            <CardDescription>Beautiful components</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Accessible and customizable components built with Radix UI and Tailwind CSS.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1974BB] hover:shadow-lg hover:shadow-[#1974BB]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#3BC1CF]">React Query</CardTitle>
            <CardDescription>Data fetching library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : data?.message}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#3BC1CF] hover:shadow-lg hover:shadow-[#3BC1CF]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#1974BB]">React Hook Form</CardTitle>
            <CardDescription>Form management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Performant, flexible forms with easy-to-use validation.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1974BB] hover:shadow-lg hover:shadow-[#1974BB]/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#3BC1CF]">Zod</CardTitle>
            <CardDescription>Schema validation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              TypeScript-first schema validation with static type inference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home

