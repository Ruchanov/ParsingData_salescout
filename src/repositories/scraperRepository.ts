import { connectToMongoDB, saveDataToMongoDB } from '../db/config';
import { ScraperData } from '../domains/scraper/scraper';

export class ScraperRepository {
  async saveData(data: ScraperData): Promise<void> {
    const { db, client } = await connectToMongoDB();
    try {
      await saveDataToMongoDB(db, data); 
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      throw new Error('Failed to save data to MongoDB');
    } finally {
      await client.close();
    }
  }
}
