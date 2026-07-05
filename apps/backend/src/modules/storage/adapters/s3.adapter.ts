import { StorageProvider, FileMetadata } from '../storage.interface';
import { Injectable, Logger } from '@nestjs/common';
import 'multer';

@Injectable()
export class S3StorageAdapter implements StorageProvider {
  private readonly logger = new Logger(S3StorageAdapter.name);

  async uploadFile(file: Express.Multer.File, pathPrefix: string): Promise<FileMetadata> {
    const key = `${pathPrefix}/${Date.now()}-${file.originalname}`;
    this.logger.log(`[MOCK] Uploading file ${file.originalname} to S3/R2 at key: ${key}`);
    
    return {
      url: `https://mock-storage.recruitpilot.com/${key}`,
      key,
      size: file.size,
      mimetype: file.mimetype,
      provider: 'AWS_S3',
      bucket: 'mock-recruitpilot-bucket',
      region: 'us-east-1',
    };
  }

  async deleteFile(key: string): Promise<boolean> {
    this.logger.log(`[MOCK] Deleting file from S3/R2 with key: ${key}`);
    return true;
  }

  async getSignedUrl(key: string, expiresInSeconds: number = 3600): Promise<string> {
    this.logger.log(`[MOCK] Generating signed URL for key: ${key}`);
    return `https://mock-storage.recruitpilot.com/${key}?signature=mocked`;
  }
}
