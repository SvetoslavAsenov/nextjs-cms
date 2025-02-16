const permissions = {
  users: {
    read: "users_read",
    create: "users_create",
    update: "users_update",
    delete: "users_delete",
  },
  roles: {
    read: "roles_read",
    create: "roles_create",
    update: "roles_update",
    delete: "roles_delete",
  },
  settings: {
    read: "settings_read",
    update: "settings_update",
  },
} as const;

export default permissions;

type ExtractValues<T> = T extends Record<string, infer U> ? U : never;

export type Permission = ExtractValues<
  (typeof permissions)[keyof typeof permissions]
>;
