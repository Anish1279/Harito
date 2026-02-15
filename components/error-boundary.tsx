'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component for graceful error handling
 * Catches errors in the component tree and displays a fallback UI
 * Production-ready with error logging capabilities
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you could send this to an error tracking service like Sentry
    // Example: captureException(error, { contexts: { react: errorInfo } });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error || new Error('Unknown error'), this.reset);
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4">
          <div className="w-full max-w-md rounded-lg border border-destructive/20 bg-card p-8 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>

            <h1 className="text-center text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h1>

            <p className="text-center text-sm text-muted-foreground mb-6">
              {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 cursor-pointer">
                <summary className="text-xs font-mono text-muted-foreground hover:text-foreground">
                  Error details (development only)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs text-destructive whitespace-pre-wrap break-words">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}

            <Button
              onClick={this.reset}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
