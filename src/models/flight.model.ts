import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IFlight extends mongoose.Document {
  _id: string;
  flightName: string;
  departure: Date;
  arrival: Date;
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
      required: [true, 'Please provide flight number'],
    },

    departure: {
      type: Date,
      required: [true, 'Please provide departure date/time'],
    },

    arrival: {
      type: Date,
      required: [true, 'Please provide arival date/time'],
      validate: {
        validator: function (this: IFlight, value: Date) {
          return value > this.departure;
        },
        message: 'Arrival time must be after departure time',
      },
    },

    departureCity: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'Provide departure city'],
    },

    destinationCity: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'Provide destination city'],
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
