import permissions from "@/config/authorization/permissions";

const en = {
  greeting: "Hello",
  farewell: "Goodbye",
  the_page_does_not_exist: "The page you are looking for does not exist.",
  page_not_found: "404 - Page Not Found",
  register: "Register",
  login: "Login",
  auth_description_login:
    "Sign in with your email and password or use one of the available providers.",
  auth_description_register:
    "Register with email and password or use one of the available providers.",
  email: "Email",
  password: "Password",
  create_password: "Create password",
  confirm_password: "Confirm password",
  forgot_password: "Forgot password?",
  dont_have_an_account: "Don't have an account?",
  already_have_an_account: "Already have an account?",
  or: "Or",
  login_with: "Login with",
  register_with: "Register with",
  google: "Google",
  linkedin: "Linkedin",
  email_taken: "A user with this email already exists.",
  invalid_password_format: "Invalid password format",
  invalid_email: "Invalid email",
  passwords_does_not_match: "Passwords do not match",
  password_requirements:
    "The password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a digit, and a special character (!@#$%^&*).",
  invalid_credentials: "Invalid credentials",
  unexpected_error: "An unexpected error occurred",
  profile: "Profile",
  logout: "Logout",
  language: "Language",
  site: "Site",
  pages: "Pages",
  navigations: "Navigations",
  users: "Users",
  roles: "Roles",
  settings: "Settings",
  select_site: "Select site",
  preview_site: "Preview site",
  show_menu: "Show menu",
  hide_menu: "Hide menu",
  sort: "Sort",
  ascending: "Ascending",
  descending: "Descending",
  [permissions.users.create]: "Create users",
  [permissions.users.read]: "Access users",
  [permissions.users.update]: "Update users",
  [permissions.users.delete]: "Delete users",
  [permissions.roles.create]: "Create roles",
  [permissions.roles.read]: "Access roles",
  [permissions.roles.update]: "Update roles",
  [permissions.roles.delete]: "Delete roles",
  [permissions.settings.read]: "Access settings",
  [permissions.settings.update]: "Update settings",
};

export default en;
