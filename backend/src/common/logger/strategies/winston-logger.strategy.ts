import { ILoggerStrategy } from './logger.strategy.interface';
import * as winston from 'winston';

export class WinstonLoggerStrategy implements ILoggerStrategy {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'app.log' }),
      ],
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
