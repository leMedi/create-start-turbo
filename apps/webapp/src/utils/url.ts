import { getBaseUrl } from "@acme/utils/url";

export function getApiUrl(path: `/${string}`) {
  return `${getBaseUrl()}/api${path}`;
}
