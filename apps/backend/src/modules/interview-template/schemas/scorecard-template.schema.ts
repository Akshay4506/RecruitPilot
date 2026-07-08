import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScorecardTemplateDocument = ScorecardTemplate & Document;

@Schema({ _id: false })
export class TemplateCompetencyRef {
  @Prop({ type: Types.ObjectId, ref: 'Competency', required: true })
  competencyId: Types.ObjectId;

  @Prop({ type: Number })
  weightOverride?: number;

  @Prop({ type: Boolean })
  mandatoryOverride?: boolean;
}

@Schema({ _id: false })
export class ScorecardTemplateCategory {
  @Prop({ type: String, required: true })
  categoryName: string;

  @Prop({ type: [{ type: TemplateCompetencyRef }], default: [] })
  competencies: TemplateCompetencyRef[];
}

@Schema({ timestamps: true })
export class ScorecardTemplate {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: ScorecardTemplateCategory }], default: [] })
  categories: ScorecardTemplateCategory[];
}

export const ScorecardTemplateSchema = SchemaFactory.createForClass(ScorecardTemplate);
