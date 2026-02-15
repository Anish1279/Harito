import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/context/auth-context'
import { TasksProvider } from '@/lib/context/tasks-context'
import { ErrorBoundary } from '@/components/error-boundary'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Task Board - Manage Your Tasks Efficiently',
  description: 'A professional task management application for organizing and tracking your daily tasks',
  generator: 'v0.app',
  keywords: ['task management', 'productivity', 'task board', 'kanban'],
  viewport: 'width=device-width, initial-scale=1',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ErrorBoundary>
          <AuthProvider>
            <TasksProvider>
              {children}
            </TasksProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
