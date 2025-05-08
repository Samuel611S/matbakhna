"use client"

import { useEffect, useState } from "react"
import { arabicFeaturedRecipes } from "@/data/arabic-featured-recipes"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Clock, Users, Tag, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function RecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) {
      const foundRecipe = arabicFeaturedRecipes.find((r) => r.id === params.id)
      setRecipe(foundRecipe)
      setLoading(false)
    }
  }, [params])

  if (loading) {
    return (
      <div className="container py-12 flex justify-center" dir="rtl">
        <div className="animate-pulse">جاري تحميل الوصفة...</div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container py-12" dir="rtl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على الوصفة</h1>
          <p className="mb-6">عذراً، لم نتمكن من العثور على الوصفة التي تبحث عنها.</p>
          <Button onClick={() => router.push("/ar/featured")}>العودة إلى الوصفات</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900"
          onClick={() => router.push("/ar/featured")}
        >
          <ArrowLeft className="h-4 w-4" />
          العودة إلى الوصفات
        </Button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden"
        >
          <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4"
        >
          {recipe.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-green-600 dark:text-green-300 mb-6"
        >
          {recipe.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-6 mb-8"
        >
          <div className="flex items-center text-green-600 dark:text-green-300">
            <Clock className="h-5 w-5 mr-2" />
            <div>
              <div className="text-sm">وقت التحضير</div>
              <div className="font-medium">{recipe.prepTime}</div>
            </div>
          </div>

          <div className="flex items-center text-green-600 dark:text-green-300">
            <Clock className="h-5 w-5 mr-2" />
            <div>
              <div className="text-sm">وقت الطهي</div>
              <div className="font-medium">{recipe.cookTime}</div>
            </div>
          </div>

          <div className="flex items-center text-green-600 dark:text-green-300">
            <Users className="h-5 w-5 mr-2" />
            <div>
              <div className="text-sm">الحصص</div>
              <div className="font-medium">{recipe.servings}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {recipe.tags.map((tag: string) => (
            <div
              key={tag}
              className="flex items-center bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-3 py-1 rounded-full text-sm"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="md:col-span-1 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">المكونات</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="pb-2 border-b border-green-100 dark:border-green-800 last:border-0"
                  >
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">طريقة التحضير</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="pb-4 border-b border-green-100 dark:border-green-800 last:border-0"
                  >
                    <div className="flex">
                      <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
