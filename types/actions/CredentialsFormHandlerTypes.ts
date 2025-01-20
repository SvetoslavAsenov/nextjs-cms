export type ResultObjectItemType = Record<string, string | undefined>;

export type ResultObjectType = {
  fields: ResultObjectItemType;
  errors: ResultObjectItemType;
  redirectUrl: string | null;
};

export type CredentialsFormHandlerType = (
  previousState: unknown,
  formData: FormData
) => Promise<ResultObjectType>;

export type formDataToResultObject = (formData: FormData) => ResultObjectType;
