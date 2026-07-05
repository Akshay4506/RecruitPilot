import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  NATIVE = 'NATIVE'
}

@Schema({ timestamps: true })
export class LanguageProficiency {
  @Prop({ type: Types.ObjectId, required: true })
  languageId: Types.ObjectId;

  @Prop({ type: String, enum: LanguageLevel })
  reading?: LanguageLevel;

  @Prop({ type: String, enum: LanguageLevel })
  writing?: LanguageLevel;

  @Prop({ type: String, enum: LanguageLevel })
  speaking?: LanguageLevel;

  @Prop({ type: String, enum: LanguageLevel, required: true })
  overall: LanguageLevel;
}
export const LanguageProficiencySchema = SchemaFactory.createForClass(LanguageProficiency);
