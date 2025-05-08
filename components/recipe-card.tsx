import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, Users } from "lucide-react"

interface RecipeCardProps {
  id: string
  title: string
  image: string
  prepTime: string
  servings: number
  index: number
  isArabic?: boolean
}

export function RecipeCard({ id, title, image, prepTime, servings, index, isArabic = false }: RecipeCardProps) {
  // Adjust path for Arabic version
  const recipePath = isArabic ? `/ar/featured/${id}` : `/featured/${id}`;

  return (
    <Link href={recipePath} className="block h-full">
      <Card
        className="overflow-hidden h-full recipe-card-hover border-green-100 dark:border-green-800"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-green-700 dark:text-green-300 line-clamp-2">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-green-600 dark:text-green-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {prepTime}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {servings}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
