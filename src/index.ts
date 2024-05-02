import { ScraperService } from "./domains/scraper";
import { CarService } from "./data/car";
import { MongoDataBase } from "./db";
MongoDataBase.initMainDataBaseConnection();
async function main() {
  const url = 'https://kolesa.kz/a/show/155084003';
  const scraperService = new ScraperService();
  // const carService = new CarService();
  
  try {
    const data = await scraperService.parseCar(url);
    await CarService.saveCar(data);
  } catch (error) {
    console.error('Error in main:', error);
  }
}

main();

