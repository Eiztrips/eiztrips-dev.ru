# eiztrips-dev.ru


## Особенности

- [ ] **Адаптивный дизайн**: Корректное отображение на устройствах любого размера

- [x] **GitHub интеграция**: Отображение репозиториев и профиля с GitHub

- [x] **Динамическая дата и время**: С индикацией времени суток и сезона

- [x] **Анимация кода**: Демонстрация кода на разных языках программирования

- [x] **Интерактивные элементы**: Перетаскиваемая GIF-анимация кота

- [x] **Профиль разработчика**: Информация о владельце портфолио

- [x] **Тематическое оформление**: Визуальные эффекты в зависимости от времени суток

  

## Технологии

### Клиент

- React 19

- TypeScript

- SCSS

- Vite

  

### Сервер

- Node.js

- Express

- TypeScript

- Axios (для работы с API)

  

## Структура проекта

```

eiztrips-dev.ru/

├── client/            # React фронтенд

│   ├── src/           # Исходный код клиента

│   ├── index.html     # Основной HTML файл

│   └── package.json   # Зависимости клиента

├── server/            # Express бэкенд

│   ├── src/           # Исходный код сервера

│   └── package.json   # Зависимости сервера

└── LICENSE            # MIT лицензия

```

  

## Запуск

  

### Клиент

```

$ cd client

$ npm install

$ npm run dev     # режим разработки

$ npm run build   # сборка для продакшена

```

  

### Сервер

```

$ cd server

$ npm install

$ npm run dev     # режим разработки с ts-node

$ npm run build   # компиляция TypeScript

$ npm start       # запуск скомпилированного кода

```

### Запуск сервера в Docker

```
# Перейти в директорию сервера
$ cd server

# Создать Docker образ
$ docker build -t eiztrips-server .

# Запустить контейнер
$ docker run -d -p 5000:5000 --name eiztrips-backend eiztrips-server

# Посмотреть логи
$ docker logs eiztrips-backend

# Остановить контейнер
$ docker stop eiztrips-backend
```

Для запуска с переменными окружения:

```
$ docker run -d -p 5000:5000 \
  -e GIPHY_API_KEY=your_api_key \
  --name eiztrips-backend eiztrips-server
```

Клиент будет доступен по адресу http://localhost:5173/, сервер API - http://localhost:5000.

  

## API

  

### GET `/api/random-cat-gif`

Возвращает URL случайной GIF-анимации с котом от Giphy API.

  

## Лицензия

Проект распространяется под лицензией MIT.