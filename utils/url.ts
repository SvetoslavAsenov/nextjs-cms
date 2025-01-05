export const getSlugSegmentsFromUrl = (url: string): string[] => {
  const urlWithoutProtocol = url.replace(/^[a-z]+:\/\//g, "");
  return urlWithoutProtocol.split("/");
};
