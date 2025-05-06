import { ILoggerStrategy } from './logger.strategy.interface';

export class ConsoleLoggerStrategy implements ILoggerStrategy {
  log(message: string): void {
    process.stdout.write('[LOG] ' + message + '\n');
  }

  error(message: string): void {
    console.error('[ERROR]', message + '\n');
  }

  warn(message: string): void {
    console.warn('[WARN]', message + '\n');
  }
}
