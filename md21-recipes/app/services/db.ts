import mongoose, { Mongoose } from 'mongoose';

mongoose.set("strictQuery", true);

let isConnected: boolean;

const dbConnect = async (): Promise<Mongoose> => {

    console.log("DB connection function is called !!!!!!!!!!!!!!!!!!!!")

  if (isConnected) {
    console.log('Already connected to database');
    return mongoose;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL!, {

    });
    db.connections[0].readyState === 1? isConnected : !isConnected;
    console.log('Successfully connected to database');
    return db;
  } catch (err) {
    console.error('Error connecting to database: ', err);
    throw new Error('Error connecting to database');
  }
};

export default dbConnect;
