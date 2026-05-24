# Свадебный сайт

Одностраничный адаптивный сайт-приглашение на свадьбу Владимира и Екатерины. Стек: Vite, React, TypeScript, CSS, Docker и Nginx.

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev
```

После запуска Vite покажет локальный адрес, обычно `http://localhost:5173`.

## Production build

```bash
npm run build
```

Проверить собранную версию можно так:

```bash
npm run preview
```

## Docker-запуск

```bash
docker compose up --build
```

Сайт будет доступен на `http://localhost:8080`.

## RSVP в Google Таблицу

Форма на сайте остается кастомной и не выглядит как Google Forms. Данные отправляются в Google Apps Script, а скрипт добавляет строку в Google Таблицу.

Текущие колонки таблицы:

```text
Дата отправки | Имя и фамилия | присутствие на торжестве | присутствие в ЗАГСе
```

Готовый код Apps Script лежит в `google-apps-script/rsvp.gs`.

### Как обновить Apps Script

1. Открой Google Таблицу.
2. Нажми `Расширения -> Apps Script`.
3. Вставь актуальный код из `google-apps-script/rsvp.gs`.
4. Нажми `Сохранить`.
5. Для проверки выбери функцию `testWrite` и нажми `Выполнить`.
6. Если тестовая строка появилась в таблице, обнови деплой:
   `Развернуть -> Управление развертываниями -> Изменить -> Версия: Новая версия -> Развернуть`.

Web App URL менять не нужно, если это то же развертывание.

## GitHub Pages

Деплой настроен через GitHub Actions. Для production-сборки нужна repository variable:

```text
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/.../exec
```

Добавляется здесь:

```text
Settings -> Secrets and variables -> Actions -> Variables
```

После push workflow сам собирает проект и публикует папку `dist`.

## Что заменить перед отдачей клиентке

- Имена пары, дату, место, адреса и ссылки на карты в `src/config/wedding.ts`.
- Текст приглашения в `src/config/wedding.ts`.
- Тайминг дня в `src/config/wedding.ts`.
- Детскую фотографию в `public/couple-childhood.jpg`.
- RSVP endpoint в `.env` или настройках окружения хостинга.
