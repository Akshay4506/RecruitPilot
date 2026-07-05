import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { STORAGE_PROVIDER } from './storage.interface';
import { S3StorageAdapter } from './adapters/s3.adapter';

@Module({
  providers: [
    StorageService,
    {
      provide: STORAGE_PROVIDER,
      useClass: S3StorageAdapter,
    },
  ],
  exports: [StorageService, STORAGE_PROVIDER],
})
export class StorageModule {}
