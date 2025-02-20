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

// This is the "root" role.
// It has the highes hierarchy of 0.
// It can't be deleted or edited.
// It also has all the permissions and is granted a full access.
// Only one user can have this role.
// The user having this role also can't be deleted.
export const ROOT_ROLE_NAME = "Root";

type ExtractValues<T> = T extends Record<string, infer U> ? U : never;

export type Permission = ExtractValues<
  (typeof permissions)[keyof typeof permissions]
>;
