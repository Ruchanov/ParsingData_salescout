// domains/scraper/scraperService.ts
import axios from 'axios';
import { ScraperRepository } from '../../data/repositories/scraperRepository';
import { Scraper } from './scraper';

export class ScraperService {
  async scrapeDataFromUrl(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      const html = response.data;

      const scraper = new Scraper();
      return scraper.scrape(html, url);
    } catch (error) {
      console.error('Error scraping data:', error);
      throw new Error('Failed to scrape data');
    }
  }

  async saveDataToDatabase(data: any): Promise<void> {
    try {
      const repository = new ScraperRepository();
      await repository.saveData(data);

      console.log('Data successfully saved to MongoDB.');
    } catch (error) {
      console.error('Error saving data to database:', error);
      throw new Error('Failed to save data to database');
    }
  }
}
