import mongoose from 'mongoose';

export interface ICity extends mongoose.Document {
  _id: string;
  cityName: string;
  pincode: number;
}

const citySchema = new mongoose.Schema<ICity>(
  {
    cityName: {
      type: String,
      required: [true, 'City must a name'],
      index: true,
      trim: true,
    },

    pincode: {
      required: [true, 'A city must have pincode'],
      type: Number,
      min: [100000, 'City pincode must be 6 digits.'],
      max: [999999, 'City pincode must be 6 digits.'],
    },
  },
  { timestamps: true }
);

export const City = mongoose.model('City', citySchema);
