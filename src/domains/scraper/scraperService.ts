import axios from 'axios';
import { ScraperRepository } from '../../data/repositories/scraperRepository';
import { Scraper } from './scraper';

export class ScraperService {
  async scrapeAndSave(url: string): Promise<void> {
    try {
      const response = await axios.get(url);
      const html = response.data;

      const scraper = new Scraper();
      const data = scraper.scrape(html, url);

      const repository = new ScraperRepository(); 
      await repository.saveData(data); 

      console.log('Data successfully scraped and saved to MongoDB.');
    } catch (error) {
      console.error('Error scraping or saving data:', error);
      throw new Error('Failed to scrape and save data');
    }
  }
}
