"use server";
import {
  credentialsLoginSchema,
  credentialsRegisterSchema,
} from "@/schemas/auth";
import { redirect } from "next/navigation";
import credentialsAuthService from "./credentialsAuthService";
import { LOGIN_URL } from "@/constants/urls";

import type {
  CredentialsFormHandlerType,
  formDataToResultObject,
  ResultObjectType,
  ResultObjectItemType,
} from "@/types/actions/CredentialsFormHandlerTypes";

const REDIRECT_URL = LOGIN_URL;

const formDataToResultObject: formDataToResultObject = (formData) => {
  const fieldsObject = {
    fields: {} as ResultObjectItemType,
    errors: {} as ResultObjectItemType,
    redirectUrl: null,
  } as ResultObjectType;

  for (const [key, value] of formData.entries()) {
    const trimmed = (value as string).trim();

    fieldsObject.fields[key] = trimmed;
  }

  return fieldsObject;
};

const CredentialsFormHandler: CredentialsFormHandlerType = async (
  previousState,
  formData: FormData
) => {
  const resultObject = formDataToResultObject(formData);
  const isRegistration = typeof formData.get("confirmPassword") === "string";

  // Validate the input data
  const validationResult = (
    isRegistration ? credentialsRegisterSchema : credentialsLoginSchema
  ).safeParse(resultObject.fields);

  // In case of validation errors fill the errors to the result object
  if (!validationResult.success) {
    for (const issue of validationResult.error.issues) {
      // If there is an error with the token
      // we will redirect the user.
      if (issue?.path?.[0] === "token") {
        redirect(REDIRECT_URL);
      }
      const errorCode: string | undefined = issue?.code;
      const errorMsg: string | undefined = issue?.message;
      resultObject.errors[issue?.path?.[0]] =
        errorCode !== "custom" ? errorCode : errorMsg;
    }
    return resultObject;
  }

  const authResult = await credentialsAuthService(resultObject.fields);
  if (!authResult.success && authResult.message) {
    if (authResult.message === "email_taken") {
      resultObject.errors.email = "email_taken";
    } else {
      resultObject.errors.general = authResult.message;
    }

    return resultObject;
  }

  redirect(REDIRECT_URL);
};

export default CredentialsFormHandler;
