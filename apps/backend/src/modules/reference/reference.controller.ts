import { Controller, Get, Post, Param, Query, Body, BadRequestException } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Master Data / References')
@Controller('api/v1/references')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  private readonly validCollections = [
    'skills', 'technologies', 'job-titles', 'companies',
    'locations', 'industries', 'institutions', 'degrees',
    'employment-types', 'languages'
  ];

  @Get(':collection/search')
  @ApiOperation({ summary: 'Search a master data collection via text index' })
  @ApiParam({ name: 'collection', enum: ['skills', 'technologies', 'job-titles', 'companies', 'locations', 'industries', 'institutions', 'degrees', 'employment-types', 'languages'] })
  @ApiQuery({ name: 'q', required: false, description: 'Search term' })
  async search(
    @Param('collection') collection: string,
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
  ) {
    if (!this.validCollections.includes(collection)) {
      throw new BadRequestException('Invalid reference collection');
    }

    const results = await this.referenceService.search(collection, query, limit);
    return { success: true, data: results };
  }

  @Post(':collection/find-or-create')
  @ApiOperation({ summary: 'Find an existing reference item or auto-create a new unverified one' })
  @ApiParam({ name: 'collection', enum: ['skills', 'technologies', 'job-titles', 'companies', 'locations', 'industries', 'institutions', 'degrees', 'employment-types', 'languages'] })
  async findOrCreate(
    @Param('collection') collection: string,
    @Body('name') name: string,
  ) {
    if (!this.validCollections.includes(collection)) {
      throw new BadRequestException('Invalid reference collection');
    }
    if (!name || name.trim() === '') {
      throw new BadRequestException('Name is required');
    }

    const result = await this.referenceService.findOrCreate(collection, name);
    return { success: true, data: result };
  }
}
