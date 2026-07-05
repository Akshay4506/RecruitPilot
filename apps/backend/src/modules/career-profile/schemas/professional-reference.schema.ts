import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProfessionalReference {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  relationship?: string;

  @Prop({ default: false })
  permissionToContact: boolean;
}
export const ProfessionalReferenceSchema = SchemaFactory.createForClass(ProfessionalReference);
