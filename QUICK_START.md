# Quick Start Guide

Get up and running with the Task Board application in minutes.

## Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn
- Modern web browser

## Installation (2 minutes)

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

## First Time Setup (1 minute)

### Creating Your Account
1. You'll be redirected to the login page
2. Click "Sign up" at the bottom
3. Enter your email
4. Create a password with:
   - At least 8 characters
   - One uppercase letter
   - One lowercase letter  
   - One number
   - One special character (!@#$%^&*, etc.)
5. Confirm your password
6. Click "Create account"

### Test Password Examples
✓ **Valid**: `Password123!`
✓ **Valid**: `MyTask@2024`
✗ **Invalid**: `password` (no uppercase, number, or special char)
✗ **Invalid**: `Pass1!` (only 6 characters)

## Using the Application (2 minutes)

### Create Your First Task
1. Click "New Task" button in the header
2. Enter a task title (required)
3. Add a description (optional)
4. Select priority: Low, Medium, or High
5. Click "Create task"
6. Your task appears in the "To Do" column

### Manage Your Tasks
- **Edit**: Click the "Edit" button on any task
- **Delete**: Click the "Delete" button and confirm
- **Change Status**: Edit the task and select new status
- **Search**: Use the search bar to find tasks by title or description

### Organization
- **To Do**: New tasks appear here
- **In Progress**: Move tasks here when you start work
- **Done**: Completed tasks go here

## Features You Can Try

### Password Strength Indicator
When signing up, watch the password strength indicator update in real-time as you type. The indicator shows:
- ✓ At least 8 characters
- ✓ Uppercase letter (A-Z)
- ✓ Lowercase letter (a-z)
- ✓ Number (0-9)
- ✓ Special character

### Task Search
Type in the search bar to filter tasks by:
- Task title
- Task description
- Real-time results (no need to press Enter)

### Priority Levels
Tasks can be set as:
- **Low**: Blue badge
- **Medium**: Yellow badge (default)
- **High**: Red badge

### Responsive Design
Try resizing your browser window or opening on mobile:
- Mobile: Single column view
- Tablet: Transitional layout
- Desktop: Three-column board

## Common Tasks

### Viewing All Tasks
Click the X in the search bar or clear the search field to see all tasks again.

### Clearing Your Data
To start fresh:
1. Click the Logout button in the header
2. Open browser developer tools (F12)
3. Go to Application → LocalStorage
4. Delete the "auth_user" and "tasks" entries
5. Refresh the page

### Logout and Login Again
1. Click the logout button in the header
2. You'll be redirected to the login page
3. Enter your email and password
4. Your tasks will reappear

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between fields |
| `Enter` | Submit forms |
| `Escape` | Close dialogs |
| `Shift+Tab` | Navigate backwards |

## Troubleshooting

### "Password does not meet requirements"
Make sure your password includes ALL of the following:
- At least 8 characters
- One UPPERCASE letter (A-Z)
- One lowercase letter (a-z)
- One number (0-9)
- One special character (!@#$%^&*()_+, etc.)

### Tasks disappear after refresh
- Check that your browser allows LocalStorage
- Try opening in a non-private/incognito window
- Check browser console for any errors

### Can't login after signup
- Verify you're using the exact same email and password
- Clear browser cache and try again
- Check that caps lock is off

### Page shows "Loading..."
- Wait a few seconds for the page to load
- Check your internet connection
- Try refreshing the page

## Development

To make changes and see them live:
```bash
# Server auto-reloads on file changes
pnpm dev
```

Stop the server:
```bash
# Press Ctrl+C in the terminal
```

Build for production:
```bash
pnpm build
```

## File Organization

- **app/** - Pages and routes
- **components/** - Reusable components
- **lib/** - Utilities and contexts
- **public/** - Static files

## Next Steps

1. **Explore**: Try creating, editing, and deleting tasks
2. **Test**: Try the search and filter features
3. **Customize**: Read IMPLEMENTATION_SUMMARY.md for technical details
4. **Deploy**: When ready, deploy to Vercel or other hosting
5. **Integrate**: Add a backend database for persistence

## Need Help?

- **README.md**: Full documentation
- **TESTING_GUIDE.md**: Comprehensive testing checklist
- **IMPLEMENTATION_SUMMARY.md**: Technical details and architecture
- **Browser Console**: Check for any error messages (F12)

## Tips & Tricks

- **Hover over task cards** to see edit/delete buttons
- **Use search** to find tasks quickly
- **Priority badges** are color-coded for easy scanning
- **Task count** in header shows total tasks
- **Empty columns** show "No tasks yet" message

Enjoy managing your tasks!
