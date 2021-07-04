## GoIT Node.js 

### Запити
- @ GET /api/contacts - Отримати всі контакти
- @ GET /api/contacts/:contactId - Отримати контакт по ID
- @ POST /api/contacts - Потрібно передати body в формате {name, email, phone, [favorite]}. Записує дані в файл
- @ DELETE /api/contacts/:contactId - Видаляє контакт за вказаним Id
- @ PUT /api/contacts/:contactId - Потрібно передати body з обновленням потрібного поля і також Id. Змінює дані потрібного Id.
- @ PUT /api/contacts/:contactId/favorite - Потрібно передати body з новим значенням поля favorite[boolean] і також Id. Змінює favorite потрібного Id.


### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
