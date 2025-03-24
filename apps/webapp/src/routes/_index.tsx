import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  MatchRoute,
  Outlet,
} from "@tanstack/react-router";

import { authClient } from "@acme/auth/client";
import { Button } from "@acme/ui/button";

import { AddPostButton } from "~/components/AddPostButton";
import { ErrorDetails } from "~/components/ErrorDetails";
import { Logo } from "~/components/Logo";
import { Spinner } from "~/components/Spinner";
import { useTRPC } from "~/utils/trpc";

export const Route = createFileRoute("/_index")({
  errorComponent: ({ error }) => (
    <ErrorDetails
      title="Failed to load posts"
      message={error.message}
      error={error}
    />
  ),
  loader: async ({ context: { trpc, queryClient } }) => {
    await queryClient.ensureQueryData(trpc.posts.list.queryOptions());
    return;
  },
  pendingComponent: Spinner,
  component: IndexLayout,
});

function IndexLayout() {
  const trpc = useTRPC();
  const postsQuery = useQuery(trpc.posts.list.queryOptions());

  const posts = postsQuery.data ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container flex-1 px-4 py-8">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
                <div>
                  You have <strong>{posts.length} total posts</strong>.
                </div>
              </div>
              <AddPostButton />
            </div>
            <hr />
          </div>
          <div className="flex">
            <div className="w-48 divide-y">
              {posts.map((post) => {
                return (
                  <div key={post.id}>
                    <Link
                      to="/$postId"
                      params={{
                        postId: post.id,
                      }}
                      preload="intent"
                      className="block px-3 py-2 text-blue-700"
                      activeProps={{ className: `font-bold` }}
                    >
                      <pre className="text-sm">
                        {post.title}{" "}
                        <MatchRoute
                          to="/$postId"
                          params={{
                            postId: post.id,
                          }}
                          pending
                        >
                          <Spinner />
                        </MatchRoute>
                      </pre>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 border-l border-gray-200">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Acme. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const { data } = authClient.useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" activeProps={{ className: `font-bold` }}>
              Home
            </Link>
          </nav>
        </div>
        <nav className="flex items-center space-x-4">
          {data?.user.id ? (
            <Link to="/dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
