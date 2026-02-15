import { z } from 'zod';

// Password validation schema with industry-standard requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128; // Increased for better security
export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`)
  .regex(PASSWORD_REGEX.uppercase, 'Password must contain at least one uppercase letter')
  .regex(PASSWORD_REGEX.lowercase, 'Password must contain at least one lowercase letter')
  .regex(PASSWORD_REGEX.number, 'Password must contain at least one number')
  .regex(PASSWORD_REGEX.special, 'Password must contain at least one special character');

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Sign up form validation
export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SignupInput = z.infer<typeof signupSchema>;

// Task creation/update validation
export const taskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(255, 'Task title must not exceed 255 characters'),
  description: z
    .string()
    .max(2000, 'Task description must not exceed 2000 characters')
    .optional()
    .default(''),
  status: z.enum(['todo', 'in-progress', 'done'], {
    errorMap: () => ({ message: 'Invalid task status' }),
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Invalid priority level' }),
  }).default('medium'),
  dueDate: z.string().datetime().optional(),
  assignedTo: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export type TaskInput = z.infer<typeof taskSchema>;

// Batch task update validation
export const batchTaskUpdateSchema = z.object({
  taskIds: z.array(z.string()).min(1, 'At least one task must be selected'),
  status: z.enum(['todo', 'in-progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type BatchTaskUpdate = z.infer<typeof batchTaskUpdateSchema>;
