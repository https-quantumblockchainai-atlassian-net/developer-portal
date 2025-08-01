import fs from "fs"
import path from "path"

// Configuration
const DIRECTORIES_TO_SCAN = ["src/components", "app"]
const FILE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"]
const ROOT_DIR = process.cwd()

// Results tracking
const results = {
  defaultExports: [],
  namedExports: [],
  mixedExports: [],
  noExports: [],
  errors: [],
}

// Helper function to check if a file has exports
function analyzeFileExports(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Check for export patterns
    const hasDefaultExport = /export\s+default\s+/.test(content)
    const hasNamedExport = /export\s+(const|function|class|let|var|interface|type|enum)\s+/.test(content)

    // Determine export type
    if (hasDefaultExport && hasNamedExport) {
      results.mixedExports.push(filePath)
    } else if (hasDefaultExport) {
      results.defaultExports.push(filePath)
    } else if (hasNamedExport) {
      results.namedExports.push(filePath)
    } else {
      results.noExports.push(filePath)
    }
  } catch (error) {
    results.errors.push({ file: filePath, error: error.message })
  }
}

// Recursive function to scan directories
function scanDirectory(directory) {
  try {
    const items = fs.readdirSync(directory)

    for (const item of items) {
      const itemPath = path.join(directory, item)
      const stats = fs.statSync(itemPath)

      if (stats.isDirectory()) {
        scanDirectory(itemPath)
      } else if (stats.isFile() && FILE_EXTENSIONS.includes(path.extname(itemPath))) {
        analyzeFileExports(itemPath)
      }
    }
  } catch (error) {
    results.errors.push({ directory, error: error.message })
  }
}

// Start scanning
console.log("Scanning project for component exports...")
for (const dir of DIRECTORIES_TO_SCAN) {
  const dirPath = path.join(ROOT_DIR, dir)
  if (fs.existsSync(dirPath)) {
    scanDirectory(dirPath)
  } else {
    console.log(`Directory not found: ${dirPath}`)
  }
}

// Generate report
console.log("\n=== COMPONENT EXPORT ANALYSIS ===\n")

console.log(`Default exports: ${results.defaultExports.length}`)
console.log(`Named exports: ${results.namedExports.length}`)
console.log(`Mixed exports: ${results.mixedExports.length}`)
console.log(`No exports: ${results.noExports.length}`)
console.log(`Errors: ${results.errors.length}`)

// Show detailed results
if (results.mixedExports.length > 0) {
  console.log("\n=== FILES WITH MIXED EXPORTS ===")
  results.mixedExports.forEach((file) => {
    console.log(`- ${path.relative(ROOT_DIR, file)}`)
  })
}

if (results.noExports.length > 0) {
  console.log("\n=== FILES WITH NO EXPORTS ===")
  results.noExports.forEach((file) => {
    console.log(`- ${path.relative(ROOT_DIR, file)}`)
  })
}

// Provide recommendations
console.log("\n=== RECOMMENDATIONS ===")
if (results.defaultExports.length > results.namedExports.length) {
  console.log("Most of your components use default exports. Consider standardizing on default exports for consistency.")
} else if (results.namedExports.length > results.defaultExports.length) {
  console.log("Most of your components use named exports. Consider standardizing on named exports for consistency.")
} else {
  console.log("Your project has a mix of export styles. Consider choosing one approach for better consistency.")
}

// Specific recommendations for SDKDocumentation
const sdkDocPath = path.join(ROOT_DIR, "src/components/SDKDocumentation.tsx")
if (fs.existsSync(sdkDocPath)) {
  const content = fs.readFileSync(sdkDocPath, "utf8")
  const hasDefaultExport = /export\s+default\s+/.test(content)

  console.log("\n=== SDKDocumentation.tsx ANALYSIS ===")
  if (hasDefaultExport) {
    console.log("✅ SDKDocumentation.tsx has a default export, which matches your import in app/page.tsx")
  } else {
    console.log("❌ SDKDocumentation.tsx does not have a default export, but is imported as default in app/page.tsx")
    console.log("   Fix by adding: export default SDKDocumentation; at the end of the file")
  }
}

console.log("\nAnalysis complete!")
