import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";

import type { TrpcRouter } from "@acme/api";

import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { Spinner } from "./components/Spinner";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { TRPCProvider } from "./utils/trpc";
import { getApiUrl } from "./utils/url";

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: SuperJSON.serialize },
      hydrate: { deserializeData: SuperJSON.deserialize },
    },
  });

  const trpcClient = createTRPCClient<TrpcRouter>({
    links: [
      httpBatchStreamLink({
        transformer: SuperJSON,
        url: getApiUrl("/trpc"),
      }),
    ],
  });

  const serverHelpers = createTRPCOptionsProxy<TrpcRouter>({
    client: trpcClient,
    queryClient: queryClient,
  });

  const router = createTanStackRouter({
    routeTree,
    context: {
      trpc: serverHelpers,
      queryClient,
    },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        <Spinner />
      </div>
    ),
    Wrap: function WrapComponent({ children }) {
      return (
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {children}
        </TRPCProvider>
      );
    },
  });

  return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
