import mongoose from 'mongoose';

export interface IAirplane extends mongoose.Document {
  _id: string;
  modelNumber: string | number;
  capacity: number;
}

const airplaneSchema = new mongoose.Schema<IAirplane>(
  {
    modelNumber: {
      type: String,
      required: [true, 'Model number require for an airplane'],
      index: true,
    },

    capacity: {
      required: [true, 'An airplane must have fix number of capacity of number'],
      type: Number,
      maxlength: [4, 'Any plane can not seat exceed the 1000'],
    },
  },
  { timestamps: true }
);

export const City = mongoose.model('City', airplaneSchema);
