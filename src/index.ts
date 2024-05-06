import { ScraperService } from "./domains/scraper";
import { CarService } from "./data/car";
export async function main(url: string) {
  const scraperService = new ScraperService();
  
  try {
    const data = await scraperService.parseCar(url);
    await CarService.saveCar(data);
  } catch (error) {
    console.error('Error in main:', error);
    return null;
  }
}


