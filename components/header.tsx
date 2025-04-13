"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Utensils } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl text-green-600">Matbakhna</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" passHref>
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              className={
                pathname === "/" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-100 dark:hover:bg-green-900"
              }
            >
              Recipe Generator
            </Button>
          </Link>
          <Link href="/featured" passHref>
            <Button
              variant={pathname.startsWith("/featured") ? "default" : "ghost"}
              className={
                pathname.startsWith("/featured")
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-green-100 dark:hover:bg-green-900"
              }
            >
              Featured Recipes
            </Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  )
}
