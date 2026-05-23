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

Таблица для ответов:

```text
https://docs.google.com/spreadsheets/d/1K0IKCcwfkmd7YJtwUa9dTWh0IKfv8XkAGM6eqztIXss/edit
```

Готовый код Apps Script лежит в `google-apps-script/rsvp.gs`.

### Как подключить таблицу

1. Открой Google Таблицу.
2. Нажми `Расширения -> Apps Script`.
3. Удали стартовый код.
4. Вставь код из `google-apps-script/rsvp.gs`.
5. Проверь название листа. По умолчанию в скрипте стоит:

```js
const SHEET_NAME = 'Лист1';
```

Если вкладка внизу таблицы называется иначе, поменяй `Лист1` на реальное имя.

6. Нажми `Развернуть -> Новое развертывание`.
7. Тип развертывания: `Веб-приложение`.
8. Настройки:

```text
Выполнять от имени: Меня
У кого есть доступ: Все
```

9. Нажми `Развернуть`, пройди авторизацию и скопируй Web App URL вида:

```text
https://script.google.com/macros/s/.../exec
```

10. Создай локальный файл `.env` рядом с `package.json`:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/.../exec
```

11. Перезапусти Vite:

```bash
npm run dev
```

После этого RSVP-форма начнет отправлять ответы в Google Таблицу.

## Деплой на GitHub Pages

1. Соберите проект командой `npm run build`.
2. Настройте GitHub Actions для публикации папки `dist`.
3. В настройках репозитория включите GitHub Pages и выберите источник GitHub Actions.
4. Добавьте переменную окружения `VITE_RSVP_ENDPOINT` со ссылкой на Google Apps Script Web App.
5. Если сайт будет опубликован не в корне домена, добавьте `base` в `vite.config.ts`.

Для Cloudflare Pages обычно достаточно подключить репозиторий и указать:

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `VITE_RSVP_ENDPOINT`

## Что заменить перед отдачей клиентке

- Имена пары, дату, место, адреса и ссылки на карты в `src/config/wedding.ts`.
- Текст приглашения в `src/config/wedding.ts`.
- Тайминг дня в `src/config/wedding.ts`.
- Детскую фотографию в `public/couple-childhood.jpg`.
- RSVP endpoint в `.env` или настройках окружения хостинга.
