'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/validations';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader2, Eye, EyeOff, Check, X } from 'lucide-react';

interface SignupFormProps {
  onSuccess?: () => void;
}

// Password validation criteria component
function PasswordCriteria({ password }: { password: string }) {
  const criteria = [
    { label: `At least ${PASSWORD_MIN_LENGTH} characters`, test: password.length >= PASSWORD_MIN_LENGTH },
    { label: 'Uppercase letter (A-Z)', test: PASSWORD_REGEX.uppercase.test(password) },
    { label: 'Lowercase letter (a-z)', test: PASSWORD_REGEX.lowercase.test(password) },
    { label: 'Number (0-9)', test: PASSWORD_REGEX.number.test(password) },
    { label: 'Special character (!@#$%...)', test: PASSWORD_REGEX.special.test(password) },
  ];

  return (
    <div className="space-y-2">
      {criteria.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          {item.test ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={item.test ? 'text-green-600' : 'text-muted-foreground'}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { signup, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = form.watch('password');

  async function onSubmit(data: SignupInput) {
    setSubmitError(null);
    try {
      await signup(data.email, data.password);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setSubmitError(message);
    }
  }

  const displayError = submitError || error;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {displayError && (
          <div className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{displayError}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  disabled={isLoading}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              {watchPassword && <PasswordCriteria password={watchPassword} />}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-10"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  );
}
