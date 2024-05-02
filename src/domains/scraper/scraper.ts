import cheerio from 'cheerio';
export interface Car  {
  id: number;
  city: string;
  drive: string;
  mileage: number;
  clearanceKZ: boolean;
  body: string;
  volume: number;
  price: number;
  name: string;
}

export class Scraper {
  scrape(html: string, url: string): Car {
    const $ = cheerio.load(html);

    const id = Number(url.split('/').pop());
    const city = $(' dt:contains("Город") + dd.value').text().trim();
    const drive = $('dt:contains("Привод") + dd.value').text().trim();
    const mileage = parseFloat($('dt:contains("Пробег") + dd.value').text().trim());
    const clearanceKZ = Boolean($(' dt:contains("Растаможен в Казахстане") + dd.value').text().trim().includes('Да'));
    const body = $(' dt:contains("Кузов") + dd.value').text().trim();
    const volume = parseFloat($('dt:contains("Объем двигателя, л") + dd.value').text().trim());
    const price = parseFloat($('div.offer__price').text().trim().replace(/\D/g, ''));
    const name = $('span[itemprop="brand"]').text().trim();
    
    return { id, city, drive, mileage, clearanceKZ, body, volume, price, name};
  }
}
