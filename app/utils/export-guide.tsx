/**
 * Export Pattern Guide
 *
 * This file provides guidance on how to standardize exports in your React components.
 *
 * Default Exports:
 * - Use for main component in a file
 * - Good for components that are the primary export
 * - Example: export default MyComponent;
 *
 * Named Exports:
 * - Use for multiple exports from a file
 * - Good for utility functions, hooks, or smaller components
 * - Example: export const MyComponent = () => {...};
 *
 * Recommended Patterns:
 *
 * 1. Single Component Pattern (Default Export):
 *    const MyComponent = () => {...};
 *    export default MyComponent;
 *
 * 2. Multiple Component Pattern (Named Exports):
 *    export const ComponentOne = () => {...};
 *    export const ComponentTwo = () => {...};
 *
 * 3. Mixed Pattern (Use sparingly):
 *    export const useMyHook = () => {...};
 *    const MainComponent = () => {...};
 *    export default MainComponent;
 *
 * Consistency is key - try to follow one pattern throughout your project.
 */

export const exportPatterns = {
  defaultExport: "export default Component",
  namedExport: "export const Component = () => {...}",
  mixedExport: "Both default and named exports in one file",
}

export const recommendations = {
  defaultExportPros: ["Simpler imports", 'Can rename on import without "as"', "Clear which component is the main one"],
  namedExportPros: ["Better for tree-shaking", "Prevents accidental renaming", "Better IDE autocompletion"],
}
