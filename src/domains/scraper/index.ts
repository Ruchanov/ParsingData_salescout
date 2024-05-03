import axios from 'axios';
import { Scraper } from './scraper';
import { IProxy } from '../../db/proxy';
import { ProxyService } from '../../data/proxy';


export class ScraperService {
  private static async fetchUrlWithProxy(url: string, proxy: IProxy) {
    const proxyConfig: any = {
      host: proxy.ip,
      port: proxy.port,
    };

    if (proxy.username && proxy.password) {
      proxyConfig.auth = {
        username: proxy.username,
        password: proxy.password,
      };
    }

    return axios.get(url, {
      proxy: proxyConfig,
    });
  }
  async parseCar(url: string): Promise<any> {
    const randomProxy = await ProxyService.getRandomProxy();
    if (!randomProxy) {
      console.error('No available proxies.');
      throw new Error('No available proxies.');
    }
    try {
      const response = await ScraperService.fetchUrlWithProxy(url, randomProxy);
      const html = response.data;

      const scraper = new Scraper();
      return scraper.scrape(html, url);
    } catch (error) {
      console.error('Error scraping data:', error);
      throw new Error('Failed to scrape data');
    }
  }
  
}

