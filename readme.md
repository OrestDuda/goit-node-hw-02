## GoIT Node.js 

### Запити
- @ GET /api/contacts - Отримати всі контакти
- @ GET /api/contacts/:contactId - Отримати контакт по ID
- @ POST /api/contacts - Потрібно передати body в формате {name, email, phone, [favorite]}. Записує дані в файл
- @ DELETE /api/contacts/:contactId - Видаляє контакт за вказаним Id
- @ PUT /api/contacts/:contactId - Потрібно передати body з обновленням потрібного поля і також Id. Змінює дані потрібного Id.
- @ PUT /api/contacts/:contactId/favorite - Потрібно передати body з новим значенням поля favorite[boolean] і також Id. Змінює favorite потрібного Id.
- @ POST /api/users/signup - Потрібно передати body в якому email і password.
- @ POST /api/users/login - Потрібно передати body в email і password. Назад вернеться токен
- @ POST /api/users/logout - В загаловку Authorization потрібно передати токен який видається при логіні, для того щоб видалити токен
- @ GET /api/users/current - В загаловку Authorization потрібно передати токен який видається при логіні, для того щоб отримати інформацію про користувача
- @ PATCH /avatars - В загаловку Authorization потрібно передати токен який видається при логіні. В параметрах передається avatar в якому передати файл

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
