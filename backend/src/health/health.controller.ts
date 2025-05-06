import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'The service is up and running.' })
  check(@Res() res: Response) {
    return res.status(200).send({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
