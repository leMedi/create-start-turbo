import { createAuthClient } from "better-auth/react";

import { getBaseUrl } from "@acme/utils/url";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});
