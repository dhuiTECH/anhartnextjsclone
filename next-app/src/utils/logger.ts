/**
 * Centralized logging utility
 * 
 * Provides controlled logging that:
 * - Only logs in development mode
 * - Can be completely disabled in production
 * - Provides structured logging with context
 * - Prevents console pollution in production
 */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  component?: string;
  action?: string;
  [key: string]: unknown;
}

/**
 * Check if we're in development mode
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Check if logging is enabled
 * Can be controlled via environment variable
 */
const isLoggingEnabled = isDevelopment || process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';

/**
 * Internal logger function
 */
const log = (level: LogLevel, message: string, context?: LogContext, ...args: unknown[]) => {
  if (!isLoggingEnabled) {
    return;
  }

  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${JSON.stringify(context)}]` : '';
  const logMessage = `[${timestamp}]${contextStr} ${message}`;

  switch (level) {
    case 'error':
      console.error(logMessage, ...args);
      break;
    case 'warn':
      console.warn(logMessage, ...args);
      break;
    case 'info':
      console.info(logMessage, ...args);
      break;
    case 'debug':
      console.debug(logMessage, ...args);
      break;
    default:
      console.log(logMessage, ...args);
  }
};

/**
 * Logger utility with methods for different log levels
 */
export const logger = {
  /**
   * Log informational messages (development only)
   */
  log: (message: string, context?: LogContext, ...args: unknown[]) => {
    log('log', message, context, ...args);
  },

  /**
   * Log info messages (development only)
   */
  info: (message: string, context?: LogContext, ...args: unknown[]) => {
    log('info', message, context, ...args);
  },

  /**
   * Log warning messages (development only)
   */
  warn: (message: string, context?: LogContext, ...args: unknown[]) => {
    log('warn', message, context, ...args);
  },

  /**
   * Log error messages (development only)
   * 
   * Note: For user-facing errors, use toast notifications instead
   */
  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    if (!isLoggingEnabled) {
      return;
    }

    const timestamp = new Date().toISOString();
    const contextStr = context ? ` [${JSON.stringify(context)}]` : '';
    
    if (error instanceof Error) {
      console.error(
        `[${timestamp}]${contextStr} ${message}`,
        error.message,
        error.stack
      );
    } else if (error) {
      console.error(`[${timestamp}]${contextStr} ${message}`, error);
    } else {
      console.error(`[${timestamp}]${contextStr} ${message}`);
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (message: string, context?: LogContext, ...args: unknown[]) => {
    log('debug', message, context, ...args);
  },
};

/**
 * Silent logger for production
 * All methods are no-ops when logging is disabled
 */
export default logger;

