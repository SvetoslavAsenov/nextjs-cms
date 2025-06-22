import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 100;

export const email = z
  .string()
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "invalid_email",
    params: { code: "custom" },
  });

export const password = z
  .string()
  .min(1, { message: "this_field_is_mandatory" })
  .min(MIN_PASSWORD_LENGTH, { message: "password_atleast_8_characters" })
  .max(MAX_PASSWORD_LENGTH)
  .refine((password) => /[A-ZА-З]/.test(password), {
    message: "invalid_password_format",
  })
  .refine((password) => /[a-zа-з]/.test(password), {
    message: "invalid_password_format",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "invalid_password_format",
  })
  .refine((password) => /[!@#$%^&*()]/.test(password), {
    message: "invalid_password_format",
  });

export const credentialsRules = {
  email,
  password,
};

export const stringNotEmpty = z
  .string()
  .min(1, { message: "this_field_is_mandatory" });

export const registrationToken = z.string().length(64);

export const refineMatchingPasswords = (values: Record<string, unknown>) => {
  return (values.password || values.newPassword) === values.confirmPassword;
};

export const credentialsRegisterSchema = z
  .object({
    ...credentialsRules,
    confirmPassword: stringNotEmpty,
    token: registrationToken,
  })
  .refine(refineMatchingPasswords, {
    message: "passwords_do_not_match",
    path: ["confirmPassword"],
  });

export const updateProfile = z.object({
  email,
});

export const updateProfileWithPassword = z
  .object({
    email,
    oldPassword: stringNotEmpty,
    newPassword: password,
    confirmPassword: stringNotEmpty,
  })
  .refine(refineMatchingPasswords, {
    message: "passwords_do_not_match",
    path: ["confirmPassword"],
  });

export const credentialsLoginSchema = z.object({
  email,
  password: z.string().max(MAX_PASSWORD_LENGTH),
});

export const credentialsCreateUserSchema = z.object(credentialsRules);
