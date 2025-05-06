import { ILoggerStrategy } from './strategies/logger.strategy.interface';
import { ConsoleLoggerStrategy } from './strategies/console-logger.strategy';
import { WinstonLoggerStrategy } from './strategies/winston-logger.strategy';

export class LoggerFactory {
  static createLogger(strategy: 'console' | 'winston'): ILoggerStrategy {
    if (strategy === 'winston') {
      return new WinstonLoggerStrategy();
    }
    return new ConsoleLoggerStrategy();
  }
}
