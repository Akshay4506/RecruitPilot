import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';
import { SetAvailabilityDto } from './dto/scheduling.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name) private availabilityModel: Model<AvailabilityDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async setAvailability(companyId: string, userId: string, dto: SetAvailabilityDto) {
    const availability = await this.availabilityModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), companyId: new Types.ObjectId(companyId) },
      { ...dto, userId: new Types.ObjectId(userId), companyId: new Types.ObjectId(companyId) },
      { new: true, upsert: true }
    ).exec();

    this.eventEmitter.emit('scheduling.availability_updated', { userId, companyId });
    return availability;
  }

  async getAvailability(companyId: string, userId: string) {
    return this.availabilityModel.findOne({ userId: new Types.ObjectId(userId), companyId: new Types.ObjectId(companyId) }).exec();
  }
}
