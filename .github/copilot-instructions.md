# Copilot Instructions - Delivery Panda Mobile App

## 🚨 Critical Rules - ALWAYS Follow

### Pre-Change Safety Checks
1. **NEVER make changes without understanding context first**
   - Read related files before modifying
   - Check for existing patterns and conventions
   - Identify dependencies and side effects
   - Verify the change won't break existing functionality

2. **ALWAYS validate changes before completing**
   - Run `npm run lint` to check for syntax errors
   - Test on multiple platforms when possible (iOS, Android, Web)
   - Verify no TypeScript errors: `npx tsc --noEmit`
   - Check that imports resolve correctly

3. **NEVER introduce breaking changes**
   - Maintain backward compatibility with existing APIs
   - Update all usages when refactoring
   - Check for component consumers before changing props
   - Verify navigation flows still work

## 🏗️ Architecture & Design Principles

### Component Design
- **Single Responsibility**: Each component should do one thing well
- **Composition over Inheritance**: Build complex UIs from simple, reusable components
- **Props over Context**: Use props for explicit data flow; context only for truly global state
- **Keep components small**: Aim for <200 lines; extract sub-components if larger
- **Separate concerns**: UI components separate from business logic/data fetching

### File Organization
```
components/
  ├── common/          # Reusable UI components (Button, Input, Card)
  ├── features/        # Feature-specific components
  └── layouts/         # Layout wrappers
store/                 # Zustand stores (one per feature domain)
app/                   # Expo Router screens
constants/             # Constants, configs, types
mock/                  # Mock data for development
```

### State Management (Zustand)
- **Keep stores focused**: One store per feature domain (auth, orders, location)
- **Avoid prop drilling**: Use stores for data needed by multiple components
- **Selectors for performance**: Use selectors to prevent unnecessary re-renders
- **Separate actions from state**: Clear action methods for state updates
- **No direct state mutation**: Always use store actions

### Navigation (Expo Router)
- **Use file-based routing**: Let file structure define routes
- **Type-safe navigation**: Define route params with TypeScript
- **Deep linking support**: Ensure all routes are deep-linkable
- **Preserve navigation state**: Handle app backgrounding properly

## 📱 Mobile-Specific Best Practices

### Performance
- **Optimize lists**: Always use `FlatList` or `FlashList` for long lists, never `ScrollView` with `.map()`
- **Image optimization**: Use `resizeMode`, lazy loading, and proper image dimensions
- **Avoid inline functions**: Define callbacks outside render when possible
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` for expensive operations
- **Lazy loading**: Code-split with `React.lazy` for heavy components
- **Bundle size**: Keep bundle small; lazy load features when possible

### React Native Specifics
- **Platform differences**: Use `Platform.select()` for platform-specific code
- **SafeAreaView**: Always wrap screens in `SafeAreaView` or use `useSafeAreaInsets`
- **Keyboard handling**: Use `KeyboardAvoidingView` for forms
- **TouchableOpacity**: Prefer over `TouchableWithoutFeedback` for feedback
- **Animated API**: Use `react-native-reanimated` for complex animations

### Expo Considerations
- **SDK compatibility**: Ensure all dependencies work with current Expo SDK (~54.0.0)
- **OTA updates**: Keep native config changes minimal for OTA compatibility
- **Secure storage**: Use `expo-secure-store` for sensitive data
- **Location services**: Always request permissions before accessing location

## 🎨 UI/UX Standards

### Styling (NativeWind/Tailwind)
- **Consistent spacing**: Use Tailwind spacing scale (p-4, m-2, gap-3)
- **Responsive design**: Test on different screen sizes
- **Dark mode support**: Use semantic color tokens (bg-background, text-foreground)
- **Accessibility**: Minimum touch target of 44x44 points
- **Typography**: Consistent font sizes and weights

### User Experience
- **Loading states**: Always show loading indicators for async operations
- **Error handling**: User-friendly error messages, never expose technical errors
- **Empty states**: Helpful messaging when no data exists
- **Optimistic updates**: Update UI immediately, rollback on error
- **Feedback**: Visual feedback for all user interactions (pressed states, etc.)
- **Offline support**: Handle no-connection gracefully

## 🔒 Security & Data Handling

### API & Data
- **Environment variables**: Never hardcode API keys; use Expo Constants
- **Secure storage**: Use `expo-secure-store` for tokens, never AsyncStorage
- **Input validation**: Validate and sanitize all user inputs
- **Error boundaries**: Wrap app sections in error boundaries
- **Data persistence**: Use appropriate storage (SecureStore, AsyncStorage, MMKV)

### Authentication
- **Token management**: Store tokens securely, refresh proactively
- **Protected routes**: Check auth state before rendering sensitive screens
- **Logout cleanup**: Clear all sensitive data on logout

## 🧪 Testing & Quality

### Code Quality
- **TypeScript strict mode**: Enforce type safety
- **No `any` types**: Use proper types or `unknown`
- **Interface over type**: Prefer `interface` for object shapes
- **Null safety**: Handle null/undefined cases explicitly
- **Exhaustive checks**: Use exhaustive switch/if checks for unions

### Testing Requirements
- **Before making changes**: Run existing tests to establish baseline
- **After making changes**: Ensure all tests pass
- **Critical paths**: Test authentication, payments, navigation flows
- **Edge cases**: Test empty states, error states, loading states

### Error Handling
- **Try-catch blocks**: Wrap async operations in try-catch
- **Error boundaries**: Prevent app crashes from unhandled errors
- **Logging**: Log errors for debugging, never fail silently
- **Graceful degradation**: App should remain functional even if features fail

## 📝 Code Style & Documentation

### TypeScript
- **Strict mode enabled**: Use strict type checking
- **Explicit return types**: For functions and components
- **Prop interfaces**: Define explicit prop types for all components
- **Generic types**: Use generics for reusable logic
- **Type imports**: Use `import type` for type-only imports

### React Best Practices
- **Functional components**: Always use function components with hooks
- **Custom hooks**: Extract complex logic into custom hooks
- **Hook rules**: Follow React hooks rules (no conditional hooks)
- **Dependency arrays**: Always specify complete dependencies
- **Cleanup effects**: Return cleanup functions from useEffect

### Naming Conventions
- **Components**: PascalCase (e.g., `OrderCard`, `UserProfile`)
- **Files**: Match component name (e.g., `OrderCard.tsx`)
- **Hooks**: Start with `use` (e.g., `useAuth`, `useOrders`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Props interfaces**: ComponentNameProps (e.g., `OrderCardProps`)
- **Stores**: camelCase with Store suffix (e.g., `authStore`, `orderStore`)

### Comments & Documentation
- **JSDoc for public APIs**: All exported functions/components
- **Complex logic**: Explain "why" not "what"
- **TODO comments**: Include ticket number or context
- **Deprecations**: Mark with @deprecated and provide alternative

### Code Formatting
- **Consistent indentation**: 2 spaces
- **Line length**: Max 100 characters
- **Import order**: React → Libraries → Stores → Components → Utils → Types
- **No console.log**: Remove before committing (use proper logger)

## 🔄 Change Management Workflow

### Before Making Any Change
1. Understand the full context and requirements
2. Identify all affected files and components
3. Check for existing patterns to follow
4. Plan the change to minimize scope

### During Implementation
1. Make focused, atomic changes
2. Update types first, then implementation
3. Update all related files in the same commit
4. Keep changes reviewable (<400 lines per change)

### After Making Changes
1. Run `npm run lint` - Fix all linting issues
2. Run `npx tsc --noEmit` - Ensure no TypeScript errors
3. Test the specific feature manually
4. Check that navigation flows work
5. Verify no console errors or warnings

### When Refactoring
1. **One thing at a time**: Don't mix refactoring with features
2. **Maintain behavior**: Tests should pass before and after
3. **Update imports**: Use IDE refactoring tools
4. **Update documentation**: Keep docs in sync with code

### When Adding Features
1. **Follow existing patterns**: Match current architecture
2. **Start with types**: Define interfaces first
3. **Build incrementally**: Small working iterations
4. **Add to existing files**: Don't create unnecessary new files

### When Fixing Bugs
1. **Understand root cause**: Don't apply band-aids
2. **Check for similar issues**: Fix pattern, not symptom
3. **Add safeguards**: Prevent similar bugs
4. **Test edge cases**: Verify fix handles all scenarios

## 🚀 Build Commands
- `npm run start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm run lint` - Check for linting issues
- `npx tsc --noEmit` - Check TypeScript types

## 📦 Dependencies
- **Before adding**: Check if existing library can solve the problem
- **Size matters**: Consider bundle size impact
- **Expo compatibility**: Verify it works with Expo SDK
- **Maintenance**: Check last update date and issue count
- **Alternatives**: Evaluate 2-3 options before choosing

## 🎯 Key Takeaways
1. **Safety first**: Understand before changing, validate after changing
2. **Follow patterns**: Consistency trumps personal preference
3. **Mobile-first**: Always consider mobile constraints (performance, network, battery)
4. **Type safety**: TypeScript is your friend, use it properly
5. **User experience**: Every change should improve or maintain UX
6. **Keep it simple**: Complexity is the enemy of reliability