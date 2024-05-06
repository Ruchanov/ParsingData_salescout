import axios, { Axios, AxiosRequestConfig } from 'axios';
import { Scraper } from './scraper';
import { ProxyService } from '../../data/proxy';
import { HttpsProxyAgent } from 'https-proxy-agent';


export class ScraperService {
  async parseCar(url: string): Promise<any> {
    const randomProxy = await ProxyService.getRandomProxy();
    if (!randomProxy) {
      console.error('No available proxies.');
      throw new Error('No available proxies.');
    }
    try {
      const proxyConfig: AxiosRequestConfig = {
        proxy: false,
        httpsAgent: new HttpsProxyAgent(`http://${randomProxy?.username}:${randomProxy?.password}@${randomProxy?.ip}:${randomProxy?.port}`)
      };
      const response = await axios.get(url, proxyConfig);
      const scraper = new Scraper();
      const htmlData: string = response.data;
      return scraper.scrape(htmlData, url);
    } catch (error) {
      console.error('Error scraping data:', error);
      throw new Error('Failed to scrape data');
    }
  }
}
