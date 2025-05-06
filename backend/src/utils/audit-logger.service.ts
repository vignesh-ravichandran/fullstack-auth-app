import { Injectable } from '@nestjs/common';

import { Logger } from '../common/logger/logger';
import { AUDIT_EVENT_NAMES } from '../constants/audit-event';

@Injectable()
export class AuditLogger {
  constructor(private readonly logger: Logger) {}

  logEvent(eventType: AUDIT_EVENT_NAMES, email: string) {
    const timestamp = new Date().toISOString();
    this.logger.log(`[AUDIT] ${eventType.toUpperCase()} - ${email} @ ${timestamp}`);
  }
}
