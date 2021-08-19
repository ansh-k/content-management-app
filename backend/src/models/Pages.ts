import { Schema, model } from 'mongoose';
import { REQUIRED_VALIDATION_MESSAGE } from './../util';

const pagesSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    url: {
      type: Schema.Types.Number,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    description: {
      type: Schema.Types.Number,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    image: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
  },
  {
    timestamps: true,
  }
);

export const Pages = model('Page', pagesSchema);
