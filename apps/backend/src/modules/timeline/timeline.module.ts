import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimelineService } from './timeline.service';
import { TimelineEvent, TimelineEventSchema } from './schemas/timeline-event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TimelineEvent.name, schema: TimelineEventSchema }])],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
