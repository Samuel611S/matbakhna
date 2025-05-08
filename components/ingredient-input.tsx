"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface IngredientInputProps {
  onSubmit: (ingredients: string[]) => void
  isLoading: boolean
  isArabic?: boolean
}

export function IngredientInput({ onSubmit, isLoading, isArabic = false }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState("")

  const texts = {
    addIngredient: isArabic ? "أضف مكون (مثل الدجاج، الطماطم، الأرز)" : "Add an ingredient (e.g., chicken, tomatoes, rice)",
    add: isArabic ? "إضافة" : "Add",
    generatingRecipe: isArabic ? "جاري إنشاء الوصفة..." : "Generating Recipe...",
    generateRecipe: isArabic ? "إنشاء وصفة" : "Generate Recipe"
  }

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.length > 0) {
      onSubmit(ingredients)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto" dir={isArabic ? "rtl" : "ltr"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder={texts.addIngredient}
            className="flex-1 border-green-200 focus-visible:ring-green-500"
          />
          <Button
            type="button"
            onClick={addIngredient}
            variant="outline"
            className="border-green-200 hover:bg-green-50 dark:hover:bg-green-900"
          >
            <Plus className="h-4 w-4 mr-1" /> {texts.add}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={`${ingredient}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-3 py-1 rounded-full"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          disabled={ingredients.length === 0 || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? texts.generatingRecipe : texts.generateRecipe}
        </Button>
      </form>
    </div>
  )
}
