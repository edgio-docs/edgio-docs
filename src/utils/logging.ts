import winston, {Logger} from 'winston';
interface CustomLogger extends Logger {
  /**
   * Logs an error message in development, but throws an exception in production for critical errors.
   * @param message
   */
  exception(message: string): void;

  /**
   * Logs a message in development environment only.
   */
  dev(...message: any[]): void;
}

const customLevels = {
  error: 0,
  exception: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const logger = winston.createLogger({
  levels: customLevels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf(({level, message}) => `${level}: ${message}\n`)
      ),
    }),
  ],
}) as CustomLogger;

logger.exceptions.handle(new winston.transports.Console());

logger.exception = function (message: string) {
  logger.error(message);
  if (process.env.NODE_ENV === 'production') {
    throw new Error(message);
  }
};

logger.dev = function (...message) {
  if (process.env.NODE_ENV === 'development') {
    logger.info(message);
  }
};

export default logger;
