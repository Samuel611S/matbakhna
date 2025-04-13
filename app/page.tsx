"use client"

import { useState } from "react"
import { IngredientInput } from "@/components/ingredient-input"
import { RecipeDisplay } from "@/components/recipe-display"
import { motion } from "framer-motion"

interface Recipe {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime?: string
  cookTime?: string
  servings?: number
}

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateRecipe = async (ingredients: string[]) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate recipe")
      }

      const data = await response.json()
      setRecipe(data)
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to generate recipe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">Matbakhna</h1>
        <p className="text-lg text-green-600 dark:text-green-300 max-w-2xl mx-auto">
          Enter the ingredients you have in your fridge, and we'll generate a delicious recipe for you!
        </p>
      </motion.div>

      <IngredientInput onSubmit={generateRecipe} isLoading={isLoading} />

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <RecipeDisplay recipe={recipe} />
    </div>
  )
}
