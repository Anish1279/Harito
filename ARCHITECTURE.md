# Architecture Documentation

## System Overview

The Task Board application is built as a modern Single Page Application (SPA) using Next.js 16 with server and client components. The architecture emphasizes separation of concerns, reusability, and production-ready patterns.

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│  (React Components - Buttons, Forms, Cards, Modals)         │
└────────────┬──────────────────────────────────────────────┬──┘
             │                                              │
        ┌────▼────┐                                    ┌────▼────┐
        │  Pages  │                                    │Components│
        └────┬────┘                                    └────┬────┘
             │                                              │
┌────────────▼──────────────────────────────────────────────▼──┐
│              State Management Layer                           │
│  (Context API - Auth & Tasks State)                          │
└────────────┬──────────────────────────────────────────────┬──┘
             │                                              │
        ┌────▼────────────┐                    ┌───────────▼──┐
        │ AuthContext     │                    │TasksContext  │
        │ (login/logout)  │                    │(CRUD ops)    │
        └────────────────┘                    └──────────────┘
             │
┌────────────▼──────────────────────────────────────────────────┐
│              Validation & Logic Layer                          │
│  (Zod Schemas, Custom Hooks, Utility Functions)              │
└────────────┬──────────────────────────────────────────────┬──┘
             │                                              │
        ┌────▼──────────┐                         ┌────────▼──┐
        │ Validations   │                         │  Hooks    │
        │ (Zod)         │                         │useToast() │
        └───────────────┘                         └───────────┘
             │
┌────────────▼──────────────────────────────────────────────────┐
│              Data Persistence Layer                            │
│  (LocalStorage - Demo; ready for database)                   │
└────────────────────────────────────────────────────────────────┘
```

## Layer Breakdown

### 1. Presentation Layer (Components)

**Pages** (`app/`)
- `page.tsx`: Home page with redirect logic
- `auth/login/page.tsx`: Login interface
- `auth/signup/page.tsx`: Signup interface
- `dashboard/page.tsx`: Task board interface

**Components** (`components/`)

- **Auth Components**
  - `LoginForm`: Form with email/password fields
  - `SignupForm`: Registration with password strength indicator

- **Task Components**
  - `TaskBoardHeader`: Dashboard header with search and actions
  - `TaskColumn`: Kanban board column
  - `TaskCard`: Individual task card
  - `TaskEditDialog`: Modal for editing tasks
  - `NewTaskDialog`: Modal for creating tasks

- **Core Components**
  - `ErrorBoundary`: React error catching component

- **UI Components** (shadcn/ui)
  - Button, Input, Dialog, Form, Select, etc.

### 2. State Management Layer

**Context Providers** (`lib/context/`)

- **AuthContext**
  ```typescript
  {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
    login(): Promise<void>,
    signup(): Promise<void>,
    logout(): Promise<void>
  }
  ```

- **TasksContext**
  ```typescript
  {
    tasks: Task[],
    isLoading: boolean,
    error: string | null,
    addTask(): Promise<void>,
    updateTask(): Promise<void>,
    deleteTask(): Promise<void>,
    deleteMultiple(): Promise<void>,
    updateMultiple(): Promise<void>,
    getTasksByStatus(): Task[],
    searchTasks(): Task[]
  }
  ```

**Hooks**
- `useAuth()`: Access authentication state
- `useTasks()`: Access tasks state
- `useToast()`: Display notifications (custom)

### 3. Validation & Logic Layer

**Zod Schemas** (`lib/validations.ts`)

```typescript
loginSchema        // Email + password
signupSchema       // Email + password + confirm password
taskSchema         // Task CRUD validation
batchTaskUpdateSchema // Bulk operations
```

**Password Requirements**
- Minimum 8 characters
- Maximum 128 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character

**Custom Hooks** (`hooks/`)
- `useToast()`: Toast notification management

### 4. Data Persistence Layer

**Current Implementation**: LocalStorage
- Stores user auth data
- Stores task list
- JSON serialization

**Future Implementation**: Database
- PostgreSQL / MongoDB
- API routes for CRUD
- Session management
- Data encryption

## Component Hierarchy

```
RootLayout
├── ErrorBoundary
│   ├── AuthProvider
│   │   └── TasksProvider
│   │       └── Page (dynamic)
│   │           ├── LoginPage
│   │           │   └── LoginForm
│   │           ├── SignupPage
│   │           │   └── SignupForm
│   │           └── DashboardPage
│   │               ├── TaskBoardHeader
│   │               ├── TaskColumn (x3)
│   │               │   └── TaskCard (multiple)
│   │               │       ├── TaskEditDialog
│   │               │       └── DeleteConfirmation
│   │               └── NewTaskDialog
```

## Data Flow

### Authentication Flow

```
User Input (Form)
    ↓
Login/Signup Form Component
    ↓
Form Validation (Zod)
    ↓
AuthContext.login() / .signup()
    ↓
LocalStorage Update
    ↓
User State Update
    ↓
Context re-render subscribers
    ↓
Page Redirect to Dashboard
```

### Task Management Flow

```
User Action (Create/Edit/Delete)
    ↓
Dialog Form Component
    ↓
Form Validation (Zod)
    ↓
TasksContext Operation
    ↓
LocalStorage Update
    ↓
Tasks Array Update
    ↓
Context re-render subscribers
    ↓
Component Re-render with New Data
```

### Search Flow

```
User Types in Search Bar
    ↓
SearchQuery State Update
    ↓
TasksContext.searchTasks(query)
    ↓
Filter tasks array (title + description)
    ↓
Update filteredTasks state
    ↓
Re-render task columns
```

## Error Handling Strategy

### Global Error Boundary

```
ErrorBoundary Component
├── Catches React Component Errors
├── Displays User-Friendly Message
├── Shows Stack Trace (Development Only)
└── Provides Recovery Button
```

### Form-Level Errors

```
Form Submission
└── Zod Validation
    ├── Error → Display Error Message
    └── Success → Process Action
        ├── Network Error → Show Error
        └── Success → Update State + Show Success
```

### Async Error Handling

```
Async Operation (login, task update, etc.)
├── Try Block
│   └── API Call / State Update
├── Catch Block
│   └── Set Error State
└── Finally Block
    └── Clear Loading State
```

## State Management Patterns

### Context Patterns

**Provider Pattern**
```typescript
<AuthProvider>
  <TasksProvider>
    <App />
  </TasksProvider>
</AuthProvider>
```

**Hook Pattern**
```typescript
const { user, login, logout } = useAuth();
const { tasks, addTask } = useTasks();
```

**Persistence Pattern**
```typescript
useEffect(() => {
  // Load from localStorage on mount
  const stored = localStorage.getItem('data');
  if (stored) setState(JSON.parse(stored));
}, []);

// Save to localStorage on state change
useEffect(() => {
  localStorage.setItem('data', JSON.stringify(state));
}, [state]);
```

## Styling Architecture

### Design Tokens (`app/globals.css`)

```css
:root {
  /* Colors */
  --primary: 210 100% 50%;      /* Blue */
  --accent: 260 100% 60%;        /* Purple */
  --background: 210 40% 98%;     /* Light background */
  --foreground: 210 10% 12%;     /* Dark text */
  
  /* Components */
  --card: 0 0% 100%;
  --destructive: 0 84.2% 60.2%;
  
  /* Spacing */
  --radius: 0.5rem;
}

.dark {
  /* Dark mode overrides */
}
```

### Tailwind Configuration

```typescript
// Semantic class names
- Text: text-foreground, text-muted-foreground
- Backgrounds: bg-background, bg-card, bg-secondary
- Borders: border-border, border-input
- Spacing: gap-4, p-4, mx-2 (via Tailwind scale)
```

### Component Styling Approach

- **Base Styles**: Global CSS for defaults
- **Component Styles**: Tailwind classes in JSX
- **Variants**: shadcn/ui button variants
- **Responsive**: Tailwind breakpoints (sm, md, lg, etc.)
- **Dark Mode**: CSS custom properties

## Performance Optimizations

### Code Splitting
- Page-level code splitting (automatic with Next.js)
- Dynamic imports for dialogs (optional)
- Tree-shaking removes unused code

### Rendering Strategy
- Server Components by default (layout.tsx)
- Client Components only where needed ('use client')
- React.memo for expensive components (optional)

### State Optimization
- Context split by concern (Auth, Tasks)
- Avoid unnecessary re-renders
- Efficient filtering/searching algorithms

### Bundle Size
- Tailwind CSS minification
- Radix UI tree-shaking
- Next.js automatic optimization

## Security Architecture

### Input Validation
```
User Input
    ↓
Client-side Zod Validation
    ↓
Sanitization (React auto-escapes)
    ↓
Use in Application
```

### Authentication Security
- Password never sent in plain text over network (ready for HTTPS)
- Session stored in localStorage (upgrade to secure cookies)
- Sensitive data not logged
- Error messages don't leak info

### XSS Protection
- React auto-escapes JSX content
- Input validation with Zod
- Content Security Policy headers in config
- No dangerouslySetInnerHTML usage

## Scalability Considerations

### Current Limitations
- LocalStorage: ~5-10MB limit
- Single user (localStorage)
- No real-time sync

### For Production Scale

**Database Layer**
```
Frontend → API Routes → Database
├── PostgreSQL / MongoDB
├── Migrations for schema updates
└── Backups and replication
```

**Authentication**
```
Email/Password → Hash with bcrypt → Compare
    ↓
JWT Token → Httponly Cookie → Session validation
```

**Caching**
```
Redis Cache Layer
├── User sessions
├── Task queries
└── Search results
```

**Real-time Updates**
```
WebSockets / Server-Sent Events
├── Task updates
├── User presence
└── Notifications
```

## File Size Reference

```
lib/
├── validations.ts (72 lines)       - Zod schemas
└── context/ (342 lines total)      - State management
    ├── auth-context.tsx (134 lines)
    └── tasks-context.tsx (208 lines)

components/
├── error-boundary.tsx (96 lines)   - Error handling
├── auth/ (334 lines total)
│   ├── login-form.tsx (132 lines)
│   └── signup-form.tsx (202 lines)
└── tasks/ (428 lines total)
    ├── task-board-header.tsx (97 lines)
    ├── task-column.tsx (44 lines)
    ├── task-card.tsx (105 lines)
    ├── task-edit-dialog.tsx (188 lines)
    └── new-task-dialog.tsx (178 lines)

app/
├── page.tsx (27 lines)             - Home redirect
├── layout.tsx (35 lines)           - Root layout
├── auth/
│   ├── login/page.tsx (73 lines)
│   └── signup/page.tsx (73 lines)
└── dashboard/
    └── page.tsx (93 lines)

Total: ~1,400 lines of application code
```

## Testing Architecture

### Unit Testing (Ready to implement)
- Component testing with React Testing Library
- Hook testing
- Schema validation testing

### Integration Testing (Ready to implement)
- Form submission flows
- Authentication flows
- Task management flows

### E2E Testing (Ready to implement)
- User workflows with Playwright/Cypress
- Cross-browser testing
- Mobile responsiveness

## Deployment Architecture

### Development
```
pnpm dev → Next.js Dev Server (localhost:3000)
```

### Production Build
```
pnpm build → .next/ folder → Optimized bundles
```

### Hosting Options
- **Vercel**: Recommended (optimized for Next.js)
- **AWS**: EC2, Lambda, Amplify
- **Google Cloud**: Cloud Run, App Engine
- **Azure**: App Service
- **Self-hosted**: Docker containerization

## Conclusion

The Task Board application demonstrates a well-structured, scalable architecture that separates concerns across presentation, state management, validation, and data persistence layers. The design is production-ready and easily extendable for adding backend services, real-time updates, and additional features.
