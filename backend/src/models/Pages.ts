import { Schema, model, Document, Model } from 'mongoose';
import { REQUIRED_VALIDATION_MESSAGE } from './../util';

export interface IPage extends Document {
  name: string;
  url: string;
  description: string;
  image: string;
}

const pagesSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    url: {
      type: Schema.Types.String,
      required: REQUIRED_VALIDATION_MESSAGE,
    },
    description: {
      type: Schema.Types.String,
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

const Pages: Model<IPage> = model<IPage>('Page', pagesSchema);

export { Pages };
