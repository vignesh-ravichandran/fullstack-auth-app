import { LoggerService } from '@nestjs/common';
import { LoggerFactory } from './logger-factory';
import { ILoggerStrategy } from './strategies/logger.strategy.interface';

export class Logger implements LoggerService {
  private logger: ILoggerStrategy;

  constructor() {
    this.logger = LoggerFactory.createLogger('winston');
  }

  log(message: any) {
    this.logger.log(message);
  }

  error(message: any, trace?: string) {
    this.logger.error(`${message} -> ${trace}`);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.log(message);
  }

  verbose(message: any) {
    this.logger.log(message);
  }
}
