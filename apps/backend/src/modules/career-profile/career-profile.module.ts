import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileAggregatorService } from './profile-aggregator.service';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])
  ],
  providers: [ProfileAggregatorService],
  exports: [ProfileAggregatorService, MongooseModule],
})
export class CareerProfileModule {}
