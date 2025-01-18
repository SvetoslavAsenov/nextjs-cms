"use server";
import UserModel from "@/models/UserModel";
import {
  credentialsLoginSchema,
  credentialsRegisterSchema,
} from "@/schemas/auth";

import type {
  CredentialsFormHandlerType,
  FormDataToObjectsType,
  ResultObjectType,
  ValidationObjectType,
} from "@/types/actions/CredentialsFormHandlerTypes";

const formDataToObject: FormDataToObjectsType = (formData) => {
  const resultObject = {} as ResultObjectType;
  const validationDataObject = {} as ValidationObjectType;

  for (const [key, value] of formData.entries()) {
    const trimmed = (value as string).trim();

    resultObject[key] = {
      value: trimmed,
    };

    validationDataObject[key] = trimmed;
  }

  return [resultObject, validationDataObject];
};

const CredentialsFormHandler: CredentialsFormHandlerType = async (
  previousState,
  formData: FormData
) => {
  const [result, objectToValidate] = formDataToObject(formData);
  const isRegistration = typeof formData.get("confirmPassword") !== null;
  const validationResult = (
    isRegistration ? credentialsRegisterSchema : credentialsLoginSchema
  ).safeParse(objectToValidate);

  if (!validationResult.success) {
    for (const issue of validationResult.error.issues) {
      result[issue?.path?.[0]] = result[issue?.path?.[0]] || { value: "" };
      const errorCode: string | undefined = issue?.code;
      const errorMsg: string | undefined = issue?.message;
      result[issue?.path?.[0]].error =
        errorCode !== "custom" ? errorCode : errorMsg;
    }
    return result;
  }

  const userModel = new UserModel();
  const existingUser = await userModel.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });

  if (existingUser) {
    result.email = result.email || { value: "" };
    result.email.error = "email_taken";
    return result;
  }

  return result;
};

export default CredentialsFormHandler;
