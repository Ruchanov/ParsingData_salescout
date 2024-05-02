import { Car } from '../../domains/scraper/scraper';

export function stringifyCar(car: Car): string {
    const clearanceKZString = car.clearanceKZ ? 'Да' : 'Нет';
    return `Детали машины:
    ID: ${car.id}
    Модель: ${car.name}
    Кузов: ${car.body}
    Город: ${car.city}
    Растаможен в Казахстане: ${clearanceKZString}
    Привод: ${car.drive}
    Пробег: ${car.mileage}
    Цена: ${car.price}
    Объем: ${car.volume}
    Ссылка: https://kolesa.kz/a/show/${car.id}
    `;
}
