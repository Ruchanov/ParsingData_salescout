import { ScraperService } from "./domains/scraper/scraperService";
async function main() {
  const url = 'https://kolesa.kz/a/show/155084003';
  const scraperService = new ScraperService();
  
  try {
    await scraperService.scrapeAndSave(url);
  } catch (error) {
    console.error('Error in main:', error);
  }
}

main();
