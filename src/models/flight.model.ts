import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IFlight {
  flightName: string;
  departure: Date;
  arival: Date;
  departureCity: ObjectId;
  destinationCity: ObjectId;
  flightNumber: string;
  airplane: ObjectId;
  airportName: ObjectId;
}

const flightSchema = new mongoose.Schema<IFlight>(
  {
    flightName: {
      type: String,
      required: [true, 'Please provide flight name'],
      index: true,
      trim: true,
    },

    flightNumber: {
      type: String,
      unique: true,
      index: true,
    },

    departure: {
      type: Date,
      required: [true, 'Please provide departure date/time'],
    },

    arival: {
      type: Date,
      required: [true, 'Please provide arival date/time'],
    },

    departureCity: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'Provide departure city'],
      trim: true,
    },

    destinationCity: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'Provide destination city'],
      trim: true,
    },

    airplane: {
      type: Schema.Types.ObjectId,
      ref: 'Airplane',
    },

    airportName: {
      type: Schema.Types.ObjectId,
      ref: 'Airport',
    },
  },
  { timestamps: true }
);

export const Flight = mongoose.model('Flight', flightSchema);
