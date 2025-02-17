import permissions from "@/config/authorization/permissions";

const bg = {
  greeting: "Здравейте",
  farewell: "Довиждане",
  the_page_does_not_exist: "Съдържанието, което търсите не съществува.",
  page_not_found: "404 - Страницата не е намерена",
  register: "Регистрация",
  login: "Вход",
  auth_description_login:
    "Влезте с имейл и парола или използвайте някой от наличните доставчици.",
  auth_description_register:
    "Регистрирайте се с имейл и парола или използвайте някой от наличните доставчици.",
  email: "Имейл",
  password: "Парола",
  create_password: "Създайте парола",
  confirm_password: "Потвърдете паролата",
  forgot_password: "Забравена парола?",
  dont_have_an_account: "Нямате акаунт?",
  already_have_an_account: "Вече имате акаунт?",
  or: "Или",
  login_with: "Вход с",
  register_with: "Регистрация с",
  google: "Google",
  linkedin: "LinkedIn",
  email_taken: "Потребител с такъв email вече съществува.",
  invalid_email: "Невалиден email",
  invalid_password_format: "Невалиден формат на паролата",
  passwords_does_not_match: "Паролите не съвпадат",
  password_requirements:
    "Паролата трябва да е поне 8 символа и да съдържа главна буква, малка буква, цифра и специален знак (!@#$%^&*).",
  invalid_credentials: "Грешен email или парола.",
  unexpected_error: "Възникна неочаквана грешка",
  profile: "Профил",
  logout: "Изход",
  language: "Език",
  site: "Сайт",
  home: "Начало",
  pages: "Страници",
  navigations: "Менюта",
  users: "Потребители",
  roles: "Роли",
  settings: "Настройки",
  select_site: "Избор на сайт",
  preview_site: "Преглед на сайта",
  show_menu: "Показване на меню",
  hide_menu: "Скриване на меню",
  sort: "Подредба",
  ascending: "Възходящо",
  descending: "Низходящо",
  [permissions.users.create]: "Създаване на потребители",
  [permissions.users.read]: "Достъп до потребители",
  [permissions.users.update]: "Редакция на потребители",
  [permissions.users.delete]: "Триене на потребители",
  [permissions.roles.create]: "Създаване на роли",
  [permissions.roles.read]: "Достъп до роли",
  [permissions.roles.update]: "Редакция на роли",
  [permissions.roles.delete]: "Триене на роли",
  [permissions.settings.read]: "Достъп до настройки",
  [permissions.settings.update]: "Редакция на настройки",
  name: "Име",
  role: "Роля",
  createdAt: "Създаден",
  actions: "Действия",
};

export default bg;
