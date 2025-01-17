"use server";
// import { signIn } from "@/lib/auth";

const formDataToObject = (formData: FormData): Record<string, string> => {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  );
};

const CredentialsFormHandler = async (previousState, formData: FormData) => {
  return formDataToObject(formData);
};

export default CredentialsFormHandler;
