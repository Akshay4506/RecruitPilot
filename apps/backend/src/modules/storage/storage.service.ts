import { Injectable, Inject } from '@nestjs/common';
import type { StorageProvider } from './storage.interface';
import { STORAGE_PROVIDER } from './storage.interface';
import 'multer';

@Injectable()
export class StorageService {
  constructor(@Inject(STORAGE_PROVIDER) private provider: StorageProvider) {}

  async uploadAvatar(file: Express.Multer.File, candidateId: string) {
    return this.provider.uploadFile(file, `avatars/${candidateId}`);
  }

  async uploadDocument(file: Express.Multer.File, ownerType: string, ownerId: string) {
    return this.provider.uploadFile(file, `documents/${ownerType.toLowerCase()}/${ownerId}`);
  }
}
