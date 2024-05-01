// db/config.ts
import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongoDB(): Promise<{ client: MongoClient, db: Db }> {
  if (!client) {
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017/kolesa');
      console.log('Connected to MongoDB');
      db = client.db();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }
  if (!db) {
    throw new Error('Failed to connect to MongoDB');
  }
  return { client, db };
}

