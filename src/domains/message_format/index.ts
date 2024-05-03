import { Car } from '../../domains/scraper/scraper';

export function stringifyCar(car: Car): string {
    const clearanceKZString = car.clearanceKZ ? 'Да' : 'Нет';
    const formattedPrice = car.price.toLocaleString('ru-RU') + ' тг';
    const mileageString = car.mileage !== null ? `${car.mileage} км` : 'Не указан';
    return ` Детали машины:
ID: ${car.id}
Модель: ${car.name}
Кузов: ${car.body}
Город: ${car.city}
Растаможен в Казахстане: ${clearanceKZString}
Привод: ${car.drive}
Пробег: ${mileageString} 
Цена: ${formattedPrice}
Объем: ${car.volume} л
Ссылка: https://kolesa.kz/a/show/${car.id}
`;
}
