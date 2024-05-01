import cheerio from 'cheerio';

export interface ScraperData {
  id: number;
  city: string;
  drive: string;
  mileage: string;
  clearanceKZ: string;
  body: string;
  volume: string;
  price: string;
  name: string;
}

export class Scraper {
  scrape(html: string, url: string): ScraperData {
    const $ = cheerio.load(html);

    const id = Number(url.split('/').pop());
    const city = $(' dt:contains("Город") + dd.value').text().trim();
    const drive = $('dt:contains("Привод") + dd.value').text().trim();
    const mileage = $('dt:contains("Пробег") + dd.value').text().trim();
    const clearanceKZ = $(' dt:contains("Растаможен в Казахстане") + dd.value').text().trim();
    const body = $(' dt:contains("Кузов") + dd.value').text().trim();
    const volume = $('dt:contains("Объем двигателя, л") + dd.value').text().trim();
    const price = $('body > div.layout > div.layout__content > main > div.container > div.row > div.offer > section.offer__container > div.offer__sidebar > div.offer__sidebar-info > div.offer__header > div.offer__price').text().trim();
    const name = $('body > div.layout > div.layout__content > main > div.container > div.row > div.offer > header.offer__header').text().trim();

    return { id, city, drive, mileage, clearanceKZ, body, volume, price, name };
  }
}
