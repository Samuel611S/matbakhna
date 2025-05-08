"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Determine if we're currently on an Arabic page
  const isArabic = pathname?.startsWith('/ar')
  
  const handleLanguageChange = () => {
    if (isArabic) {
      // Switch from Arabic to English
      let englishPath = pathname.replace(/^\/ar/, '')
      // Handle the root path case
      if (englishPath === '') englishPath = '/'
      router.push(englishPath)
    } else {
      // Switch from English to Arabic
      const arabicPath = `/ar${pathname === '/' ? '' : pathname}`
      router.push(arabicPath)
    }
  }

  return (
    <Button 
      variant="outline"
      size="sm"
      className="bg-transparent border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
      onClick={handleLanguageChange}
    >
      {isArabic ? "English" : "العربية"}
    </Button>
  )
} 