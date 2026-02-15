# Task Board Application

A production-ready task management application built with Next.js 16, React 19, and modern web technologies. This application demonstrates industry-standard practices for authentication, validation, error handling, and responsive design.

## Features

- **User Authentication**: Secure login and signup with email validation
- **Password Security**: 
  - 8+ characters with uppercase, lowercase, numbers, and special characters
  - Password confirmation validation
  - Real-time password strength indicator
- **Task Management**:
  - Create, read, update, and delete tasks
  - Organize tasks by status (To Do, In Progress, Done)
  - Filter tasks by priority (Low, Medium, High)
  - Search functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Boundary**: Graceful error handling with fallback UI
- **State Management**: Context API for auth and tasks management
- **Data Persistence**: LocalStorage for demo (easily upgradeable to backend)
- **Form Validation**: Zod schemas with real-time validation feedback
- **Professional UI**: shadcn/ui components with custom styling

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Form Handling**: React Hook Form + Zod
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Type Safety**: TypeScript 5.7
- **State Management**: React Context API

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page redirect
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   └── signup/page.tsx     # Signup page
│   ├── dashboard/
│   │   └── page.tsx            # Task board dashboard
│   └── globals.css             # Global styles & design tokens
├── components/
│   ├── error-boundary.tsx      # Error boundary component
│   ├── auth/
│   │   ├── login-form.tsx      # Login form component
│   │   └── signup-form.tsx     # Signup form component
│   ├── tasks/
│   │   ├── task-board-header.tsx    # Dashboard header
│   │   ├── task-column.tsx          # Kanban column
│   │   ├── task-card.tsx            # Individual task card
│   │   ├── task-edit-dialog.tsx     # Task edit modal
│   │   └── new-task-dialog.tsx      # New task modal
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── validations.ts          # Zod schemas
│   ├── context/
│   │   ├── auth-context.tsx    # Authentication context
│   │   └── tasks-context.tsx   # Tasks management context
│   └── utils.ts                # Utility functions
└── hooks/
    └── use-toast.tsx           # Toast notification hook
```

## Getting Started

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd task-board-app
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Run development server**
```bash
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Usage Guide

### Authentication Flow

1. **First Time Users**:
   - Click on "Sign up" link on the login page
   - Enter email and create a strong password
   - Password must contain:
     - At least 8 characters
     - One uppercase letter
     - One lowercase letter
     - One number
     - One special character (!@#$%^&*()_+, etc.)
   - Confirm your password and submit

2. **Returning Users**:
   - Enter your email and password
   - Click "Sign in"

### Task Management

1. **Create a Task**:
   - Click the "New Task" button in the header
   - Fill in the task title (required)
   - Add a description (optional)
   - Select priority level (Low, Medium, High)
   - Click "Create task"

2. **Edit a Task**:
   - Click the "Edit" button on any task card
   - Update the task details
   - Change status or priority
   - Click "Save changes"

3. **Delete a Task**:
   - Click the "Delete" button on any task card
   - Confirm the deletion

4. **Search Tasks**:
   - Use the search bar in the header
   - Results are filtered in real-time

5. **View Task Stages**:
   - **To Do**: New tasks appear here
   - **In Progress**: Drag or edit to move tasks here
   - **Done**: Completed tasks go here

## Validation & Error Handling

### Password Validation
- Real-time password strength indicator during signup
- Visual feedback with checkmarks for met criteria
- Server-side validation with Zod schemas

### Form Validation
- Email format validation
- Required field validation
- Minimum/maximum length validation
- Type-safe validation with Zod

### Error Handling
- Global error boundary for React errors
- Graceful error messages with recovery options
- User-friendly error notifications
- Development-only error stack traces

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: Base styles (< 640px)
- **Tablet**: sm, md (640px - 1024px)
- **Desktop**: lg, xl, 2xl (> 1024px)

Key responsive features:
- Adaptive task board layout (1 column on mobile, 3 columns on desktop)
- Mobile-optimized navigation
- Touch-friendly buttons and inputs
- Flexible dialog widths

## Design System

### Color Palette
- **Primary**: Blue (HLS: 210 100% 50%)
- **Accent**: Purple (HLS: 260 100% 60%)
- **Neutrals**: Gray scale for backgrounds and borders
- **Status**: Color-coded priorities and statuses

### Typography
- **Font Family**: Geist (primary), Geist Mono (code)
- **Heading**: Bold, semantic sizes
- **Body**: 16px base with optimal line-height

### Spacing
- Consistent spacing scale using Tailwind utilities
- Gap-based layouts for modern flexbox patterns
- Semantic padding/margin for visual hierarchy

## Performance Optimizations

- Server Components by default with strategic Client Components
- Image optimization with Next.js Image component
- CSS-in-JS minimization with Tailwind CSS
- Lazy loading for modals and heavy components
- Efficient state management with Context API

## Security Features

- Password hashing-ready (can integrate bcrypt)
- Input sanitization with Zod validation
- CSRF protection with Next.js built-in
- Secure session handling with localStorage (upgradeable to secure cookies)
- No sensitive data exposed in client bundle

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly dialogs
- Focus management in modals

## Development Best Practices

### Code Quality
- TypeScript for type safety
- ESLint configuration included
- Consistent code formatting with Prettier
- Component-based architecture

### Testing Considerations
- All components tested manually in dev environment
- Forms validated with real-time feedback
- Error states verified in development

### Deployment
- Built for Vercel hosting (optimized Next.js)
- Environment variables ready for backend integration
- Production-ready error logging support
- Performance optimizations enabled

## Future Enhancements

1. **Backend Integration**:
   - Replace LocalStorage with database
   - Add API routes for CRUD operations
   - Implement JWT authentication
   - Add password hashing with bcrypt

2. **Features**:
   - Drag-and-drop task reordering
   - Task due dates and reminders
   - Team collaboration
   - Task comments and activity logs
   - Task templates and automation

3. **Analytics**:
   - Task completion metrics
   - Time tracking
   - Productivity insights
   - User activity logs

4. **Integrations**:
   - Calendar sync
   - Email notifications
   - Slack integration
   - External API webhooks

## Troubleshooting

### "Password does not meet requirements"
- Ensure your password includes all required elements: uppercase, lowercase, numbers, and special characters

### Tasks not persisting after refresh
- Ensure browser allows LocalStorage
- Check browser console for any storage-related errors

### Login redirects to login page
- Clear browser cache and LocalStorage
- Try logging in again with credentials from signup

### Styling issues
- Run `pnpm install` to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Restart development server

## License

This project is created for educational and internship purposes.

## Support

For issues or questions, please refer to the troubleshooting section or check the browser console for detailed error messages.
