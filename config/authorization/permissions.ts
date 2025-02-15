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

export type Permission =
  (typeof permissions)[keyof typeof permissions][keyof (typeof permissions)[keyof typeof permissions]];
