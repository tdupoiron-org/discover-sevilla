---
name: Spark Fixer
description: remove spark libraries to fix the project once generated
---

# My Agent

# Perfect Prompt for Spark Library Removal

## The Problem
This React/Vite application has a `@github/spark` library dependency that prevents it from starting properly. The Spark library needs to be completely removed and replaced with standard React functionality.

## Perfect Prompt Template

```
I need to start this React/Vite app, but it has a Spark library dependency that needs to be removed. Please:

1. **Remove the `@github/spark` dependency** from package.json
2. **Replace the `useKV` hook** with React's `useState` (check src/App.tsx or other components for usage)
3. **Remove the Spark import** from src/main.tsx 
4. **Remove Spark plugins** from vite.config.ts (sparkPlugin and createIconImportProxy)
5. **Delete the spark.meta.json** file
6. **Clean install dependencies** and start the dev server

The app should work normally after removing Spark dependencies.
```

## Why This Prompt Works

- **Clear objective**: Start the app by removing Spark
- **Specific files mentioned**: All 4 files that need changes
- **Key detail about useKV**: Knowing it's the main Spark hook being used
- **Anticipated dependency issue**: Mentioning clean install saves troubleshooting time
- **Context about the app**: Provides enough context without being project-specific

## Expected Files to Modify

1. `package.json` - Remove `@github/spark` dependency
2. `src/App.tsx` - Replace `useKV<StateType>('key-name', defaultValue)` with `useState<StateType>(defaultValue)`
3. `src/main.tsx` - Remove `import "@github/spark/spark"`
4. `vite.config.ts` - Remove Spark plugin imports and usage
5. `spark.meta.json` - Delete this file

## Common Issues to Expect

- **Rollup module errors**: May need to `rm -rf node_modules package-lock.json && npm install`
- **TypeScript errors**: Will appear until Spark imports are removed
- **Missing state persistence**: Application state will reset on page refresh (useKV → useState)

## Final Result

After completion, the app will run at `http://localhost:5173/` with all Spark dependencies removed and replaced with standard React functionality.
