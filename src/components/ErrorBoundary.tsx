import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  // Initialize state
  public override state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='flex flex-col items-center justify-center min-h-100 p-6 text-center border-2 border-dashed border-red-200 rounded-lg bg-red-50'>
          <h2 className='text-2xl font-bold text-red-700 mb-2'>Something went wrong</h2>
          <p className='text-gray-600 mb-6'>There was an error loading this part of the application.</p>

          <div className='flex gap-4'>
            <button
              onClick={this.handleReset}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
            >
              Try Again
            </button>

            <Link to='/' className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'>
              Back to Home
            </Link>
          </div>

          {/* Optional: Show the actual error message in development */}
          {process.env.NODE_ENV === 'development' && (
            <pre className='mt-6 p-4 bg-gray-900 text-red-400 text-xs text-left overflow-auto max-w-full rounded'>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
