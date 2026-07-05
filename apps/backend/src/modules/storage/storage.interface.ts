import 'multer';
export interface FileMetadata {
  url: string;
  key: string;
  size: number;
  mimetype: string;
  provider: string;
  bucket: string;
  region: string;
}

export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';

export interface StorageProvider {
  uploadFile(file: Express.Multer.File, pathPrefix: string): Promise<FileMetadata>;
  deleteFile(key: string): Promise<boolean>;
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
}
