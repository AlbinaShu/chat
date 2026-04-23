# Chat

## Демо
`https://AlbinaShu.github.io/chat/`

[▶️ Смотреть демо](https://drive.google.com/file/d/1uMXWx-ibov4PwyKGnHv_AZvJpxWAloFn/view?usp=drive_link)

Задеплоенная версия `https://AlbinaShu.github.io/chat/` не содержит интеграции с GigaChat. Проверить интеграцию с GigaChat можно только с помощью локального запуска (так сделано из-за CORS ошибки, пришлось добавлять в vite настройки proxy-сервера)

## Стек
- React 19.2.0
- Typescript 5.9.3
- React Router DOM 7.13.2
- CSS Modules

## Запуск локально
1. git clone https://github.com/AlbinaShu/chat.git
2. npm i
3. установить значения переменных окружения `VITE_GIGA_CHAT_AUTH_KEY` и `VITE_GIGA_CHAT_SCOPE` в файле `.env`
4. npm run dev

## Переменные окружения
| Переменная              | Описание          |
|-------------------------|-------------------|
| VITE_GIGA_CHAT_AUTH_KEY | Ключ авторизации  |
| VITE_GIGA_CHAT_SCOPE    | Версия API        |

## Клонирование репозитория
`git clone https://github.com/AlbinaShu/chat.git`

## npm-скрипты
`npm i` - установка зависимостей
`npm run dev` - локальный запуск приложения
`npm run test` - запуск тестов

## Тесты
- написаны юнит-тесты для редьюсера (reducer.test.ts)
- написаны компонентные тесты (InputArea.test.tsx, Message.test.tsx, ChatItem.test.tsx, Sidebar.test.tsx)
- localStorage замокирован,  написаны тесты на персистентность (ChatProvider.test.tsx)
