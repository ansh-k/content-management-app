import { Schema, model, Model } from 'mongoose';
import { REQUIRED_VALIDATION_MESSAGE } from './../util';

export interface ITxtRes extends Document {
  pageID: string;
  name: string;
  value: string;
  maxLength: string;
  lineType: string;
}
const txtResSchema = new Schema(
  {
    pageID: {
      type: Schema.Types.ObjectId,
      ref: 'Page',
    },
    name: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    value: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    maxLength: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    lineType: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
      enum: {
        values: ['single', 'multiline'],
        message:
          'lineType is invalid, valid values include [single, multiline].',
      },
    },
  },
  {
    timestamps: true,
  }
);

const TextResources: Model<ITxtRes> = model<ITxtRes>(
  'TextResources',
  txtResSchema
);

export { TextResources };
