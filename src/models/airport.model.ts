import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IAirport extends mongoose.Document {
  _id: string;
  airportName: string;
  avatar: string;
  city: ObjectId;
  coverImages: string[];
}

const airportSchema = new mongoose.Schema<IAirport>(
  {
    airportName: {
      type: String,
      required: [true, 'Airport must have a name.'],
      unique: true,
      index: true,
    },

    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'Airport must belong to a city.'],
    },

    coverImages: [
      {
        type: String, // upload by cloudinary
      },
    ],
  },
  { timestamps: true }
);

export const Airport = mongoose.model('Airport', airportSchema);
