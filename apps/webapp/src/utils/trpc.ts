import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { TrpcRouter } from "@acme/api";

export const { TRPCProvider, useTRPC } = createTRPCContext<TrpcRouter>();
