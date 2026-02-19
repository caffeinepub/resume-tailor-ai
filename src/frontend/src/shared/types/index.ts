/**
 * Shared types for the frontend application.
 * These are UI-specific types that complement the backend types.
 */

/**
 * Error state for UI components
 */
export interface UIError {
  message: string;
  type: 'validation' | 'extraction' | 'backend' | 'unknown';
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}
