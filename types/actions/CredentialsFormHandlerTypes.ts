export type ResultObjectItemType = Record<string, string | undefined>;
export type ResultObjectType = Record<string, ResultObjectItemType>;

export type ValidationObjectType = Record<string, string>;

export type CredentialsFormHandlerType = (
  previousState: unknown,
  formData: FormData
) => Promise<ResultObjectType>;

export type FormDataToObjectsType = (
  formData: FormData
) => [ResultObjectType, ValidationObjectType];
