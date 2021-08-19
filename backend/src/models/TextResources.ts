import { Schema, model } from 'mongoose';
import { REQUIRED_VALIDATION_MESSAGE } from './../util';

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
      type: Schema.Types.Number,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    maxLength: {
      type: Schema.Types.Number,
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

export const TextResources = model('TextResources', txtResSchema);
