export type AuthUser = {
  id: string;
  email: string | null;
  name?: string | null;
  image?: string | null;
  roleId?: string | null;
};

export type AuthProviderProps = {
  user?: AuthUser & { roleHierarchy: number; roleName: string };
  children: React.ReactNode;
};
