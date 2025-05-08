"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

interface RecipeDisplayProps {
  recipe: Recipe | null
  isArabic?: boolean
}

export function RecipeDisplay({ recipe, isArabic = false }: RecipeDisplayProps) {
  if (!recipe) return null

  const texts = {
    prep: isArabic ? "التحضير:" : "Prep:",
    cook: isArabic ? "الطهي:" : "Cook:",
    servings: isArabic ? "الحصص:" : "Servings:",
    ingredients: isArabic ? "المكونات" : "Ingredients",
    instructions: isArabic ? "طريقة التحضير" : "Instructions"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader className="bg-green-50 dark:bg-green-900/50 rounded-t-lg">
          <CardTitle className="text-2xl text-green-800 dark:text-green-100">{recipe.title}</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-300">{recipe.description}</CardDescription>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-green-600 dark:text-green-300">
            {recipe.prepTime && (
              <div>
                <span className="font-semibold">{texts.prep}</span> {recipe.prepTime}
              </div>
            )}
            {recipe.cookTime && (
              <div>
                <span className="font-semibold">{texts.cook}</span> {recipe.cookTime}
              </div>
            )}
            {recipe.servings && (
              <div>
                <span className="font-semibold">{texts.servings}</span> {recipe.servings}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">{texts.ingredients}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">{texts.instructions}</h3>
            <ol className="list-decimal pl-5 space-y-3">
              {recipe.instructions.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="pb-2"
                >
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
