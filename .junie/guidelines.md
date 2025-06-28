# Development Guidelines for Timelines Project

This document provides guidelines and instructions for developing and maintaining the Timelines project.

## Additional Development Information

### Project Structure
- `src/` - Source code
  - `assets/` - Static assets like images

### TypeScript Configuration
The project uses a multi-tsconfig setup:
- `tsconfig.json` - Base configuration that references the other configs
- `tsconfig.app.json` - Configuration for application code
- `tsconfig.node.json` - Configuration for Node.js code (build scripts)

Always use the `import type` syntax when importing types, interfaces, or type aliases.

### Code Style
- Comments should be used very rarely. Code should be self-documenting through clear naming and structure. Only use comments when absolutely necessary to explain complex logic that cannot be made clear through code refactoring.
- Do not use barrel files
- Functions should be outside of React components, if possible. If they do not access core functionality (e.g. a React state), they should be defined outside of the component.
- **Function Ordering**: The order in a file is critical and must be strictly followed:
  1. The main `export` comes first
  2. Functions called by the main export follow, in depth-first order
  3. The next export (if any) comes next
  4. Functions called by this export follow in depth-first order
  5. And so on for any additional exports
- A component's props should be defined inline and not as a separate interface, unless they are used more than once. Destructure them immediately.

#### React Component Guidelines

- Function syntax is strongly preferred over class components
- Consistent typing should be used throughout the codebase
- React components should be defined as `export function Name(): ReactElement`
- Default exports are discouraged and enforced by ESLint; use named exports instead

### Best Practices

1. Follow the existing code style and structure
2. Write tests for all new components and functionality
3. Use TypeScript's type system effectively to catch errors at compile time
4. Keep components small and focused on a single responsibility
5. Use React Hooks according to the rules enforced by the linter
6. Run `npm run build` to check for compilation errors
7. Run `npm run lint` to check for linting errors
8. Run `npm run prettier` after changing something, like `eslint`
