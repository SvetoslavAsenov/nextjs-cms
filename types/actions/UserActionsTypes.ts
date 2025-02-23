export type DeleteUsers = (
  previousState: unknown,
  ids: string[]
) => Promise<number>;
