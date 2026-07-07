import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SavedViewDocument = SavedView & Document;

@Schema({ timestamps: true })
export class SavedView {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  viewName: string;

  @Prop({ type: Object, required: true })
  filters: Record<string, any>;

  @Prop({ type: Object })
  sorting?: Record<string, 1 | -1>;

  @Prop({ type: Boolean, default: false })
  isDefault: boolean;

  @Prop({ type: Boolean, default: false })
  favorite: boolean;

  @Prop({ type: String })
  icon?: string;

  @Prop({ type: String })
  color?: string;
}

export const SavedViewSchema = SchemaFactory.createForClass(SavedView);
SavedViewSchema.index({ userId: 1, companyId: 1 });
