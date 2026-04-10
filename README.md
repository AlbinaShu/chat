# Chat

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
