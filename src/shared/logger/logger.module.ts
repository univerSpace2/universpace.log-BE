import { Module } from '@nestjs/common';
import { UVLogger } from './logger.service';

@Module({
  providers: [UVLogger],
  exports: [UVLogger],
})
export class LoggerModule {}
