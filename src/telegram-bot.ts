import { Telegraf, Context } from 'telegraf';
import { MongoDataBase } from './db';
import { UserService } from './data/user';
import { User } from './data/user';
import { config } from './domains/config';
import { CarService } from './data/car';
import { stringifyCar } from './domains/message_format';
import { main } from '.';
import { proxyMiddleware } from './domains/proxy';

MongoDataBase.initMainDataBaseConnection();
const bot = new Telegraf(config.telegramApiToken);

bot.use(proxyMiddleware)

bot.start(async(ctx: Context) => {
    const chatId = ctx.chat?.id !== undefined ? ctx.chat.id.toString() : '';
    const firstName = ctx.from?.first_name || '';
    const lastName = ctx.from?.last_name || '';
    const username = ctx.from?.username || '';
    const data: User = {
        chatId: chatId,
        firstName: firstName,
        lastName: lastName,
        username: username
    };
    UserService.saveUser(data)
    ctx.reply('Привет! Я бот для поиска информации о машинах. Введите идентификатор машины, чтобы получить информацию о ней.');

});

bot.on('text',async (ctx: Context) => {
    if (ctx.message && 'text' in ctx.message) {
        const givenId = ctx.message.text;
        const isValidId = /^\d+$/.test(givenId);
        if (isValidId) {
            const car = await CarService.getCar(givenId);
            if(car){
                ctx.reply(stringifyCar(car))
            }else{
                try {
                    await main(`https://kolesa.kz/a/show/${givenId}`);
                    const savedCar = await CarService.getCar(givenId);
                    if (savedCar) {
                        ctx.reply(stringifyCar(savedCar));
                    } else {
                        ctx.reply('Информация о машине не найдена.');
                    }
                } catch (error) {
                    console.error('Error in main:', error);
                    ctx.reply('Произошла ошибка при обработке запроса.');
                }
            }
        } else {
            ctx.reply('Введенный идентификатор не является числом или содержит недопустимые символы.');
        }
    }
});

bot.launch();