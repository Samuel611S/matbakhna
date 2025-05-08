const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// English to Arabic translation map for common UI terms
const translations = {
  // Navigation
  "Recipe Generator": "منشئ الوصفات",
  "Featured Recipes": "الوصفات المميزة",
  "Back to Recipes": "العودة إلى الوصفات",
  
  // Recipe page
  "Matbakhna": "مطبخنا",
  "Enter the ingredients you have in your fridge, and we'll generate a delicious recipe for you!": "أدخل المكونات الموجودة في ثلاجتك، وسنقوم بإنشاء وصفة لذيذة لك!",
  "Add an ingredient (e.g., chicken, tomatoes, rice)": "أضف مكون (مثل الدجاج، الطماطم، الأرز)",
  "Add": "إضافة",
  "Generating Recipe...": "جاري إنشاء الوصفة...",
  "Generate Recipe": "إنشاء وصفة",
  "Failed to generate recipe. Please try again.": "فشل في إنشاء الوصفة. الرجاء المحاولة مرة أخرى.",
  
  // Recipe details
  "Prep:": "التحضير:",
  "Cook:": "الطهي:",
  "Servings:": "الحصص:",
  "Ingredients": "المكونات",
  "Instructions": "طريقة التحضير",
  "Prep Time": "وقت التحضير",
  "Cook Time": "وقت الطهي",
  "Servings": "الحصص",
  
  // Featured recipes page
  "Matbakhna Featured Recipes": "الوصفات المميزة من مطبخنا",
  "Explore our collection of delicious recipes with detailed instructions": "استكشف مجموعتنا من الوصفات اللذيذة مع تعليمات مفصلة",
  "Loading recipes...": "جاري تحميل الوصفات...",
  "No recipes found in the data file.": "لم يتم العثور على وصفات في ملف البيانات.",
  "Recipe not found": "لم يتم العثور على الوصفة",
  "Sorry, we couldn't find the recipe you're looking for.": "عذراً، لم نتمكن من العثور على الوصفة التي تبحث عنها.",
};

// Create Arabic version of app pages
function createArabicPages() {
  // Create /app/ar directory if it doesn't exist
  const arDirPath = path.join(process.cwd(), 'app', 'ar');
  if (!fs.existsSync(arDirPath)) {
    fs.mkdirSync(arDirPath, { recursive: true });
  }
  
  // Create Arabic version of main page
  createArabicPage('app/page.tsx', 'app/ar/page.tsx');
  
  // Create Arabic version of featured page directory
  const arFeaturedDirPath = path.join(process.cwd(), 'app', 'ar', 'featured');
  if (!fs.existsSync(arFeaturedDirPath)) {
    fs.mkdirSync(arFeaturedDirPath, { recursive: true });
  }
  
  // Create Arabic version of featured page
  createArabicPage('app/featured/page.tsx', 'app/ar/featured/page.tsx');
  
  // Create Arabic version of dynamic recipe page
  const arDynamicDirPath = path.join(process.cwd(), 'app', 'ar', 'featured', '[id]');
  if (!fs.existsSync(arDynamicDirPath)) {
    fs.mkdirSync(arDynamicDirPath, { recursive: true });
  }
  
  createArabicPage('app/featured/[id]/page.tsx', 'app/ar/featured/[id]/page.tsx');
  
  console.log('Arabic pages created successfully!');
}

// Function to create Arabic version of a page
function createArabicPage(sourcePath, destPath) {
  try {
    // Read the source file
    let content = fs.readFileSync(path.join(process.cwd(), sourcePath), 'utf8');
    
    // Replace English text with Arabic translations
    for (const [english, arabic] of Object.entries(translations)) {
      // Use regex to match the exact English text within JSX
      const regex = new RegExp(`(>|"|\\'|\\{)\\s*${escapeRegExp(english)}\\s*(\\<|"|\\\'|\\})`, 'g');
      content = content.replace(regex, `$1${arabic}$2`);
    }
    
    // Add RTL direction to the root div
    content = content.replace(
      /(<div className="container py-12")/g, 
      '$1 dir="rtl"'
    );
    
    // Change routes from /featured to /ar/featured
    content = content.replace(/href="\/featured/g, 'href="/ar/featured');
    content = content.replace(/href="\//g, 'href="/ar');
    
    // Modify API calls to request Arabic recipes
    content = content.replace(
      /body: JSON.stringify\(\{ ingredients \}\)/g,
      'body: JSON.stringify({ ingredients, language: "ar" })'
    );
    
    // Write to destination file
    fs.writeFileSync(path.join(process.cwd(), destPath), content, 'utf8');
    console.log(`Created: ${destPath}`);
  } catch (error) {
    console.error(`Error creating ${destPath}:`, error);
  }
}

// Helper function to escape special characters in string for regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the script
createArabicPages();

console.log('To run this script, use: node scripts/create-arabic-pages.js'); 