import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

const createUser = async (name, reps, weight, unit, date) => {
  // Call the constructor to create an instance of the model class User
  const user = new User({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  // Call save to persist this object as a document in MongoDB
  return user.save();
};

const findUsers = async (filter, projection, limit) => {
  const query = User.find(filter).select(projection).limit(limit);
  return query.exec();
};

const findUserById = async (_id) => {
  const query = User.findById(_id);
  return query.exec();
};

const replaceUser = async (_id, name, reps, weight, unit, date) => {
  const result = await User.replaceOne(
    { _id: _id },
    { name: name, reps: reps, weight: weight, unit: unit, date: date }
  );
  return result.modifiedCount;
};

const deleteById = async (_id) => {
  const result = await User.deleteOne({ _id: _id });
  return result.deletedCount;
};

function isDateValid(date) {
  // Test using a regular expression.
  // To learn about regular expressions see Chapter 6 of the text book
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

function isRequestValid(weight, reps, date, unit) {
  if (
    weight > 0 &&
    weight !== undefined &&
    reps > 0 &&
    reps !== undefined &&
    isDateValid(date) &&
    unit !== undefined &&
    (unit === "kgs" || unit === "lbs")
  ) {
    return true;
  }
  return false;
}

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model("User", userSchema);

export {
  createUser,
  findUserById,
  findUsers,
  replaceUser,
  deleteById,
  isRequestValid,
};
