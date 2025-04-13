import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json()

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Please provide a valid list of ingredients" }, { status: 400 })
    }

    // Create a custom Google provider instance with our GEMINI_API_KEY
    const googleAI = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const prompt = `
      Create a detailed recipe using only the following ingredients: ${ingredients.join(", ")}.
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Recipe Title",
        "description": "Brief description of the dish",
        "prepTime": "Preparation time (e.g., '15 minutes')",
        "cookTime": "Cooking time (e.g., '30 minutes')",
        "servings": Number of servings,
        "ingredients": ["Formatted ingredient 1 with quantity", "Formatted ingredient 2 with quantity", ...],
        "instructions": ["Step 1 instruction", "Step 2 instruction", ...]
      }
      
      IMPORTANT: Return ONLY the JSON object with no markdown formatting, no code blocks, and no additional text.
    `

    const { text } = await generateText({
      model: googleAI("gemini-1.5-flash"),
      prompt,
    })

    // Clean the response text to extract just the JSON
    let cleanedText = text.trim()

    // Remove markdown code block syntax if present
    if (cleanedText.startsWith("```")) {
      // Find the first occurrence of a JSON opening brace
      const jsonStart = cleanedText.indexOf("{")
      // Find the last occurrence of a JSON closing brace
      const jsonEnd = cleanedText.lastIndexOf("}")

      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1)
      } else {
        throw new Error("Could not find valid JSON in the response")
      }
    }

    // Parse the JSON response
    try {
      const recipeData = JSON.parse(cleanedText)
      return NextResponse.json(recipeData)
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      console.error("Received text:", text)
      throw new Error("Failed to parse recipe data as JSON")
    }
  } catch (error) {
    console.error("Error generating recipe:", error)
    return NextResponse.json(
      {
        error: "Failed to generate recipe",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
