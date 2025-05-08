"use client"

import { useEffect, useState } from "react"
import { featuredRecipes } from "@/data/featured-recipes"
import { RecipeCard } from "@/components/recipe-card"
import { motion } from "framer-motion"

export default function FeaturedRecipesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">Matbakhna Featured Recipes</h1>
        <p className="text-lg text-green-600 dark:text-green-300 max-w-2xl mx-auto">
          Explore our collection of delicious recipes with detailed instructions
        </p>
      </motion.div>

      {isLoaded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              servings={recipe.servings}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Debugging information */}
      {!isLoaded && <div className="text-center">Loading recipes...</div>}
      {isLoaded && featuredRecipes.length === 0 && (
        <div className="text-center text-red-500">No recipes found in the data file.</div>
      )}
    </div>
  )
}
