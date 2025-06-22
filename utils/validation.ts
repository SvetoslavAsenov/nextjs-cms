import type { SafeParseReturnType } from "zod";

export type FormFieldsObjectTypeFieldsItemType = Record<
  string,
  string | undefined
>;
export type FormFieldsObjectTypeErrorsItemType = Record<
  string,
  string[] | undefined
>;

export type FormFieldsObjectType = {
  fields: FormFieldsObjectTypeFieldsItemType;
  errors: FormFieldsObjectTypeErrorsItemType;
};

export const formDataToFieldsObject = (
  formData: FormData
): FormFieldsObjectType => {
  const fieldsObject: FormFieldsObjectType = {
    fields: {},
    errors: {},
  };

  for (const [key, value] of formData.entries()) {
    const trimmed = (value as string).trim();
    fieldsObject.fields[key] = trimmed;
  }

  return fieldsObject;
};

export const addValidationErrorsToFieldsObject = <Input, Output>(
  formFieldsObject: FormFieldsObjectType,
  validationResult: SafeParseReturnType<Input, Output>
) => {
  if (!validationResult.success) {
    for (const issue of validationResult.error.issues) {
      const pathKey = issue?.path?.[0];
      if (typeof pathKey === "string") {
        const errorMsg = issue.message;
        //   const errorCode = issue.code;
        // const newError = errorCode !== "custom" ? errorCode : errorMsg;

        formFieldsObject.errors[pathKey] =
          formFieldsObject.errors[pathKey] || [];

        // Add error only if not already present
        if (!formFieldsObject.errors[pathKey].includes(errorMsg)) {
          formFieldsObject.errors[pathKey].push(errorMsg);
        }
      }
    }
  }
};
