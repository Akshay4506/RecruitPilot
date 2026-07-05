import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StorageService } from '../storage/storage.service';
import { FileDocument, File, OwnerType, DocumentType } from './schemas/document.schema';
import * as crypto from 'crypto';
import 'multer';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    private storageService: StorageService,
    private eventEmitter: EventEmitter2,
  ) {}

  async uploadDocument(
    ownerType: OwnerType,
    ownerId: string,
    documentType: DocumentType,
    file: Express.Multer.File,
    uploadedBy: string,
    uploadedFrom?: string,
    documentGroupId?: string,
  ) {
    const checksum = this.calculateChecksum(file.buffer);

    const ownerObjectId = new Types.ObjectId(ownerId);
    
    const existing = await this.fileModel.findOne({ ownerId: ownerObjectId, checksum }).exec();
    if (existing) {
      throw new ConflictException('A document with the exact same content already exists.');
    }

    let finalGroupId = documentGroupId ? new Types.ObjectId(documentGroupId) : new Types.ObjectId();
    let version = 1;

    if (documentGroupId) {
      const versions = await this.fileModel.find({ documentGroupId: finalGroupId }).select('version').exec();
      if (versions.length > 0) {
        version = Math.max(...versions.map(v => v.version)) + 1;
      }
    }

    const metadata = await this.storageService.uploadDocument(file, ownerType, ownerId);

    const newDoc = new this.fileModel({
      ownerType,
      ownerId: ownerObjectId,
      documentType,
      documentGroupId: finalGroupId,
      originalName: file.originalname,
      storageKey: metadata.key,
      url: metadata.url,
      mimeType: metadata.mimetype,
      size: metadata.size,
      extension: this.getExtension(file.originalname),
      checksum,
      version,
      provider: metadata.provider,
      bucket: metadata.bucket,
      region: metadata.region,
      uploadedBy: new Types.ObjectId(uploadedBy),
      uploadedFrom,
      isDefault: version === 1,
    });

    await newDoc.save();

    this.eventEmitter.emit('document.uploaded', {
      documentId: newDoc._id,
      ownerType,
      ownerId,
      documentType,
    });

    return newDoc;
  }

  async getDocumentsByOwner(ownerId: string, documentType?: DocumentType) {
    const query: any = { ownerId: new Types.ObjectId(ownerId), status: { $ne: 'DELETED' } };
    if (documentType) {
      query.documentType = documentType;
    }
    return this.fileModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async setDefaultDocument(ownerId: string, documentId: string, documentType: DocumentType) {
    const ownerObjectId = new Types.ObjectId(ownerId);
    const docObjectId = new Types.ObjectId(documentId);

    const doc = await this.fileModel.findOne({ _id: docObjectId, ownerId: ownerObjectId, documentType }).exec();
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    await this.fileModel.updateMany(
      { ownerId: ownerObjectId, documentType },
      { $set: { isDefault: false } }
    ).exec();

    doc.isDefault = true;
    await doc.save();

    this.eventEmitter.emit('document.defaultChanged', {
      documentId: doc._id,
      ownerType: doc.ownerType,
      ownerId,
      documentType,
    });

    return doc;
  }

  async softDeleteDocument(ownerId: string, documentId: string, deletedBy: string) {
    const ownerObjectId = new Types.ObjectId(ownerId);
    const docObjectId = new Types.ObjectId(documentId);

    const doc = await this.fileModel.findOne({ _id: docObjectId, ownerId: ownerObjectId }).exec();
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    doc.status = 'DELETED' as any;
    doc.deletedAt = new Date();
    doc.deletedBy = new Types.ObjectId(deletedBy);
    
    await doc.save();

    this.eventEmitter.emit('document.deleted', {
      documentId: doc._id,
      ownerType: doc.ownerType,
      ownerId,
    });

    return doc;
  }

  private calculateChecksum(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  private getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  }
}
