import 'multer';
import { Controller, Post, Get, Patch, Delete, Param, UseInterceptors, UploadedFile, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { DocumentUploadPipe } from './pipes/document-upload.pipe';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CandidateJwtAuthGuard } from '../candidate-auth/guards/candidate-jwt-auth.guard';
import { CurrentCandidate } from '../../common/decorators/current-candidate.decorator';
import { OwnerType, DocumentType } from './schemas/document.schema';

@ApiTags('Candidate Documents')
@ApiBearerAuth()
@UseGuards(CandidateJwtAuthGuard)
@Controller('api/v1/candidate/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a document or a new version of a document' })
  async uploadDocument(
    @CurrentCandidate() user: any,
    @UploadedFile(DocumentUploadPipe) file: Express.Multer.File,
    @Body('documentType') documentType: DocumentType,
    @Body('documentGroupId') documentGroupId?: string,
  ) {
    const doc = await this.documentService.uploadDocument(
      OwnerType.CANDIDATE,
      user.candidateId,
      documentType,
      file,
      user.candidateId,
      undefined,
      documentGroupId,
    );

    return { success: true, data: doc };
  }

  @Get()
  @ApiOperation({ summary: 'Get all candidate documents' })
  async getDocuments(@CurrentCandidate() user: any) {
    const docs = await this.documentService.getDocumentsByOwner(user.candidateId);
    return { success: true, data: docs };
  }

  @Patch(':id/default')
  @ApiOperation({ summary: 'Set a document as the default for its type' })
  async setDefault(
    @CurrentCandidate() user: any,
    @Param('id') documentId: string,
    @Body('documentType') documentType: DocumentType,
  ) {
    const doc = await this.documentService.setDefaultDocument(user.candidateId, documentId, documentType);
    return { success: true, data: doc };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a candidate document' })
  async deleteDocument(@CurrentCandidate() user: any, @Param('id') documentId: string) {
    const doc = await this.documentService.softDeleteDocument(user.candidateId, documentId, user.candidateId);
    return { success: true, data: doc };
  }
}
