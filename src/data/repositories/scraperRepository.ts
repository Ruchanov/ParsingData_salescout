import { connectToMongoDB } from '../../db/config';
import { ScraperData } from '../../db/models';

export class ScraperRepository {
  async saveData(data: ScraperData): Promise<void> {
    const { db, client } = await connectToMongoDB();
    try {
      const collection = db.collection('Car');
      const result = await collection.insertOne(data);
      console.log('Data inserted:', result.insertedId);
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      throw new Error('Failed to save data to MongoDB');
    } finally {
      await client.close();
    }
  }
}
