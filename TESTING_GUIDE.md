# Testing Guide

This document outlines comprehensive testing scenarios for the Task Board application.

## Manual Testing Checklist

### Authentication

#### Login Page
- [ ] Page loads correctly
- [ ] Email validation triggers on invalid email format
- [ ] Password field masks input by default
- [ ] Eye icon toggles password visibility
- [ ] Form submission is disabled while loading
- [ ] Loader spinner displays during login
- [ ] "Don't have an account?" link navigates to signup
- [ ] Successful login redirects to dashboard
- [ ] Error messages display for failed login

#### Signup Page
- [ ] Page loads correctly
- [ ] Email validation works
- [ ] Password strength indicator displays in real-time
- [ ] Strength indicator shows checkmarks for met criteria
- [ ] Invalid passwords show visual feedback
- [ ] Password visibility toggle works for both fields
- [ ] Password confirmation validation works
- [ ] Mismatched passwords show error
- [ ] Form submission disabled until all requirements met
- [ ] Successful signup redirects to dashboard
- [ ] "Already have an account?" link navigates to login

### Password Validation

#### Requirements Display
- [ ] Minimum 8 characters indicator shows correctly
- [ ] Uppercase letter requirement displays
- [ ] Lowercase letter requirement displays
- [ ] Number requirement displays
- [ ] Special character requirement displays
- [ ] Checkmarks appear when requirements met
- [ ] X marks appear for unmet requirements

#### Edge Cases
- [ ] Accept valid special characters: !@#$%^&*()_+-=[]{}';:"|\,.<>/?
- [ ] Reject spaces in password
- [ ] Handle 128 character maximum
- [ ] Display clear error for mismatched passwords

### Dashboard

#### Layout & Navigation
- [ ] Header displays correctly on all screen sizes
- [ ] "Task Board" title is visible
- [ ] User name displays in header
- [ ] Task count updates correctly
- [ ] Search bar is functional
- [ ] "New Task" button is visible and clickable
- [ ] Logout button appears and works
- [ ] Sticky header remains visible while scrolling

#### Responsive Design
- [ ] Mobile view: Single column layout
- [ ] Tablet view: Transitional layout
- [ ] Desktop view: Three-column layout
- [ ] Task cards stack properly on mobile
- [ ] Buttons scale appropriately on all devices
- [ ] Text remains readable on all screen sizes
- [ ] Touch targets are 44x44 pixels minimum

#### Task Management

##### Create Task
- [ ] "New Task" button opens dialog
- [ ] Dialog has clear title input field
- [ ] Description field accepts long text (up to 2000 chars)
- [ ] Priority dropdown has Low/Medium/High options
- [ ] Default priority is Medium
- [ ] Create button is disabled until title is entered
- [ ] Form clears after successful creation
- [ ] New task appears in "To Do" column
- [ ] Task count updates after creation

##### Edit Task
- [ ] "Edit" button on task card opens dialog
- [ ] Current values pre-populate fields
- [ ] Status dropdown shows all three options
- [ ] Priority can be changed
- [ ] Description can be updated
- [ ] Changes save correctly
- [ ] Task moves to correct column when status changes
- [ ] Dialog closes after save
- [ ] Loading state displays while saving

##### Delete Task
- [ ] "Delete" button appears on task card
- [ ] Confirmation dialog appears before deletion
- [ ] Cancel prevents deletion
- [ ] Confirmed deletion removes task
- [ ] Task count updates after deletion
- [ ] Deleted task no longer visible

##### Task Display
- [ ] Task title displays fully (with line clamp on long titles)
- [ ] Description shows truncated with ellipsis
- [ ] Priority badge displays with correct color
- [ ] Drag handle is visible
- [ ] Hover effects display correctly
- [ ] Cards have proper shadows and borders

#### Search Functionality
- [ ] Search filters tasks by title
- [ ] Search filters tasks by description
- [ ] Case-insensitive search works
- [ ] Clear search returns all tasks
- [ ] Real-time filtering as user types
- [ ] Task count updates with search results
- [ ] "No tasks found" message displays when empty

#### Column Organization
- [ ] "To Do" column displays todos
- [ ] "In Progress" column displays in-progress tasks
- [ ] "Done" column displays completed tasks
- [ ] Column headers display status name
- [ ] Task count badge updates per column
- [ ] Empty column shows "No tasks yet" message
- [ ] Columns maintain height for visual balance

### Error Handling

#### Error Boundary
- [ ] Development: Error details stack visible
- [ ] Production: User-friendly error message shows
- [ ] "Try again" button resets component
- [ ] Error boundary doesn't break entire app
- [ ] Navigation works after error recovery

#### Form Errors
- [ ] Email format errors display clearly
- [ ] Password requirement errors are specific
- [ ] Required field validation triggers on blur
- [ ] Error messages clear when field is corrected
- [ ] Multiple errors display for same field

#### Network Errors
- [ ] Timeout errors handled gracefully
- [ ] Failed requests show user-friendly messages
- [ ] Retry functionality works
- [ ] Loading states prevent duplicate submissions

### Performance

#### Load Time
- [ ] Initial page load < 3 seconds on 3G
- [ ] Dashboard interactive < 4 seconds
- [ ] Form interactions responsive (< 100ms)
- [ ] Task operations complete < 1 second

#### Memory
- [ ] No memory leaks on navigation
- [ ] Context providers cleanup properly
- [ ] Long task lists don't cause slowdown
- [ ] Multiple dialog opens/closes work smoothly

### Browser Compatibility

#### Desktop Browsers
- [ ] Chrome (latest) - Full functionality
- [ ] Firefox (latest) - Full functionality
- [ ] Safari (latest) - Full functionality
- [ ] Edge (latest) - Full functionality

#### Mobile Browsers
- [ ] iOS Safari - Full functionality
- [ ] Chrome Mobile - Full functionality
- [ ] Firefox Mobile - Full functionality
- [ ] Samsung Internet - Full functionality

### Accessibility

#### Keyboard Navigation
- [ ] Tab moves focus through form fields
- [ ] Tab moves focus through buttons
- [ ] Shift+Tab moves backward
- [ ] Enter submits forms
- [ ] Escape closes dialogs
- [ ] Focus visible on all interactive elements

#### Screen Readers
- [ ] Page structure semantic
- [ ] Form labels associated with inputs
- [ ] Buttons have accessible names
- [ ] ARIA labels on icon buttons
- [ ] Dialog roles properly set
- [ ] Loading states announced

#### Color Contrast
- [ ] Text contrast >= 4.5:1 (WCAG AA)
- [ ] Button contrast >= 3:1
- [ ] Focus indicators visible
- [ ] Color not sole differentiator

### Data Persistence

#### LocalStorage
- [ ] User data persists after refresh
- [ ] Tasks persist after refresh
- [ ] Logout clears auth data
- [ ] Multiple browser tabs sync correctly
- [ ] Clear browser cache resets data
- [ ] Private/incognito mode works

### Edge Cases

#### Input Validation
- [ ] Very long task titles handled
- [ ] Special characters in titles work
- [ ] Empty descriptions allowed
- [ ] Duplicate task titles allowed
- [ ] Unicode characters supported

#### User Actions
- [ ] Rapid button clicks handled
- [ ] Multiple dialogs don't conflict
- [ ] Logout during task creation works
- [ ] Search while creating task works
- [ ] Page refresh during operation recovers state

#### State Management
- [ ] Concurrent operations handled
- [ ] State updates propagate correctly
- [ ] Context cleanup prevents memory leaks
- [ ] Provider unmounting handled properly

## Testing Scenarios

### Scenario 1: New User Signup
1. Navigate to login page
2. Click "Sign up" link
3. Enter valid email
4. Enter password meeting all requirements
5. Confirm password
6. Click "Create account"
7. Verify redirect to dashboard
8. Verify user name in header

### Scenario 2: Task Creation and Management
1. Login or signup
2. Click "New Task"
3. Enter task title
4. Add description
5. Select priority
6. Click "Create task"
7. Verify task appears in correct column
8. Edit task status and priority
9. Delete task
10. Verify task count updates

### Scenario 3: Search Functionality
1. Create multiple tasks with different titles
2. Use search bar to filter
3. Verify results update in real-time
4. Clear search
5. Verify all tasks reappear

### Scenario 4: Responsive Design
1. View on desktop (test at 1920px)
2. Resize to tablet (768px)
3. Resize to mobile (375px)
4. Verify layout adjusts at each breakpoint
5. Test touch interactions on mobile
6. Verify all features functional at each size

### Scenario 5: Error Recovery
1. Attempt invalid login
2. Verify error message
3. Correct error and retry
4. Attempt to delete task
5. Verify confirmation dialog
6. Cancel and verify task remains
7. Logout and verify redirect

## Known Limitations

- LocalStorage has ~5-10MB limit per domain
- No real-time sync between browser tabs (basic sync only)
- No offline support
- No data backup or export
- No concurrent user support

## Future Testing Improvements

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright/Cypress
- Performance tests with Lighthouse
- Visual regression tests
- Accessibility audit with axe-core
- Load testing for scalability

## Reporting Bugs

When reporting bugs, include:
1. Browser and version
2. Device and OS
3. Steps to reproduce
4. Expected behavior
5. Actual behavior
6. Screenshots/recordings
7. Console errors (if any)
