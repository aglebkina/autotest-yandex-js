const puppeteer = require('puppeteer');
const fs = require('fs');
const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testTaxiResult() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Шаг 1: ввод часов и минут');
    const hoursInput = await page.$('#form-input-hour');
    await hoursInput.type('09');

    const minutesInput = await page.$('#form-input-minute');
    await minutesInput.type('00');

    console.log('Шаг 2: заполнение поля Откуда');
    const fromInput = await page.$('#form-input-from');
    await fromInput.type('Фрунзенская набережная, 46');

    console.log('Шаг 3: заполнение поля Куда');
    const toInput = await page.$('#form-input-to');
    await toInput.type('Зубовский бульвар, 37');

    console.log('Шаг 4: выбор режима Свой');
    const routeMode = await page.$('#form-mode-custom');
    await routeMode.click();

    console.log('Шаг 5: выбор вида транспорта');
    const typeOfTransport = await page.$('#from-type-walk');
    await typeOfTransport.click();

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('#result-time-price');

    console.log('Получение строки с результатом');
    const text = await page.$eval('#result-time-price', element => element.textContent);

    console.log('Проверка условия тест-кейса');
        if (text.includes('Бесплатно') && text.includes('50 мин')) {
fs.writeFile('result-t-5.txt', 'Test passed', (err) => {
    if (err) throw err;
    console.log('Passed. Результат записан в файл "result-t-5.txt"');
});
        
    } else {
          fs.writeFile('result-t-5.txt', 'Test failed. Actual result: ' + text, (err) => {
    if (err) throw err;
    console.log('Failed. Результат записан в файл "result-t-5.txt"');
});
    }


    console.log('Закрытие браузера');
    await browser.close();
}

testTaxiResult(); 
