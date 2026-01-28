import { useTheme } from "@/components/theme-provider"

export function SidebarLogo() {
  const { theme } = useTheme()
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  return (
    <div className="flex justify-center items-center gap-2 pt-4">
      <div className="w-auto relative">
        <img
          src={isDark ? "/Logos-Healix-White.png" : "/Logos-Healix.png"}
          alt="Healix Logo"
          className="h-auto w-full select-none transition-opacity duration-200"
          draggable="false"
          style={{
            width: '110px',
            height: 'auto',
          }}
        />
      </div>
    </div>
  )
}

