import mongoose from "mongoose";


export const connectDB = async () => {
  let attemps = 10;
  while (attemps) {
    try {
      const db = process.env.MONGO_URI as string;
      await mongoose.connect(db);
      console.log("MongoDB connected!");
      break;
    } catch (err: any) {
      console.log("Error! ->", err.message);
      attemps -= 1;
      console.log(`connection attemps left ${attemps}`);
      await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    }
  }
};
