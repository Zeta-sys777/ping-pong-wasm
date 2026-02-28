# Email Templates (Supabase)

Готовые шаблоны:

- `confirm_signup_ru.html` — красивое письмо подтверждения регистрации.
- `magic_link_ru.html` — красивое письмо входа по magic link.

Как подключить в Supabase Dashboard:

1. Открой `Authentication` -> `Email Templates`.
2. Выбери нужный шаблон (`Confirm signup` или `Magic Link`).
3. Скопируй HTML из файла и вставь в поле шаблона.
4. Сохрани (`Save`).
5. Протестируй отправку письма.

Важно:

- Не удаляй переменные вида `{{ .ConfirmationURL }}` и `{{ .Email }}`.
- Для локального теста проверь `Authentication` -> `URL Configuration` -> `Site URL`.
