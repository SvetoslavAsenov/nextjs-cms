"use server";
// import { signIn } from "@/lib/auth";

type FormDataToObjectType = (formData: FormData) => Record<string, string>;
type CredentialsFormHandlerType = (
  previousState: null | Record<string, string>,
  formData: FormData
) => Promise<Record<string, string>>;

const formDataToObject: FormDataToObjectType = (formData) => {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  );
};

const CredentialsFormHandler: CredentialsFormHandlerType = async (
  previousState,
  formData: FormData
) => {
  return formDataToObject(formData);
};

export default CredentialsFormHandler;
