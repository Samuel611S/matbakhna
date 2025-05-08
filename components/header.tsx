"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Utensils, Menu, X } from "lucide-react"
import { useState } from "react"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // Check if we're on an Arabic page
  const isArabic = pathname?.startsWith('/ar')
  
  // Adjust link paths for the current language
  const homePath = isArabic ? '/ar' : '/'
  const featuredPath = isArabic ? '/ar/featured' : '/featured'

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={homePath} className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl text-green-600">Matbakhna</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href={homePath} passHref>
            <Button
              variant={pathname === homePath || pathname === "/" ? "default" : "ghost"}
              className={
                pathname === homePath || pathname === "/"
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-green-100 dark:hover:bg-green-900"
              }
            >
              {isArabic ? "منشئ الوصفات" : "Recipe Generator"}
            </Button>
          </Link>
          <Link href={featuredPath} passHref>
            <Button
              variant={pathname.includes("/featured") ? "default" : "ghost"}
              className={
                pathname.includes("/featured")
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-green-100 dark:hover:bg-green-900"
              }
            >
              {isArabic ? "الوصفات المميزة" : "Featured Recipes"}
            </Button>
          </Link>
        </nav>

        {/* Theme Toggle + Language Switch + Hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden px-4 pb-4"
          >
            <div className="flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1], // smoother cubic-bezier
                }}
              >
                <Link href={homePath} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={pathname === homePath || pathname === "/" ? "default" : "ghost"}
                    className="w-full"
                  >
                    {isArabic ? "منشئ الوصفات" : "Recipe Generator"}
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link href={featuredPath} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={pathname.includes("/featured") ? "default" : "ghost"}
                    className="w-full"
                  >
                    {isArabic ? "الوصفات المميزة" : "Featured Recipes"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
