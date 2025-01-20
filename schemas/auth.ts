import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 100;

export const credentialsRules = {
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH)
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
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "invalid_password_format",
    }),
};

export const credentialsRegisterSchema = z
  .object({
    ...credentialsRules,
    confirmPassword: z.string().min(1),
    token: z.string().length(64),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "passwords_does_not_match",
      path: ["confirmPassword"],
    }
  );

export const credentialsLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z.string().max(MAX_PASSWORD_LENGTH),
});

export const credentialsCreateUserSchema = z.object(credentialsRules);
