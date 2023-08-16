import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI).then(() => {
      console.log("database is up and running");
      return true;
    });
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default connectToDB;
