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
    },

    pincode: {
      required: [true, 'A city must have pincode'],
      type: Number,
      maxlength: [6, 'City Pincode must have in 6 digit'],
    },
  },
  { timestamps: true }
);

export const City = mongoose.model('City', citySchema);
