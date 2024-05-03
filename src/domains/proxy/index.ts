import { Context } from 'telegraf';
import { ProxyService } from '../../data/proxy';
import { SocksProxyAgent } from 'socks-proxy-agent';

export async function proxyMiddleware(ctx: Context, next: () => Promise<any>): Promise<void> {
    try {
        const proxy = await ProxyService.getRandomProxy();
        if (proxy !== null) {
            const proxyUrl = `socks5://${proxy.ip}:${proxy.port}`;
            const agent = new SocksProxyAgent(proxyUrl);
            ctx.telegram.options.agent = agent;

            await next();
        } else {
            console.error('Прокси не был получен');
            ctx.reply('Произошла ошибка при выполнении запроса: Прокси не был получен');
        }
    } catch (error: any) { // Указываем тип any для переменной error
        console.error('Error:', error.message); // Используем свойство message для вывода сообщения об ошибке
        ctx.reply(`Произошла ошибка при выполнении запроса: ${error.message}`);
    }
}
