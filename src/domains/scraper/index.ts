import axios from 'axios';
import { Scraper } from './scraper';


export class ScraperService {
  async parseCar(url: string): Promise<any> {
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
  
}

