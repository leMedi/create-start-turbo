import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { Spinner } from "~/components/Spinner";
import { useTRPC } from "~/utils/trpc";

export const Route = createFileRoute("/_index/$postId")({
  validateSearch: z.object({
    showNotes: z.boolean().optional(),
    notes: z.string().optional(),
  }),
  loader: async ({ context: { trpc, queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(trpc.posts.byId.queryOptions(postId));
  },
  pendingComponent: Spinner,
  component: PostsPostIdComponent,
});

function PostsPostIdComponent() {
  const postId = Route.useParams({ select: (d) => d.postId });

  const trpc = useTRPC();
  const postQuery = useQuery(trpc.posts.byId.queryOptions(postId));
  const post = postQuery.data;

  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [notes, setNotes] = React.useState(search.notes ?? ``);

  React.useEffect(() => {
    void navigate({
      search: (old) => ({ ...old, notes: notes ? notes : undefined }),
      replace: true,
      params: true,
    });
  }, [notes]);

  if (!post) {
    return <div className="p-2">Post not found</div>;
  }

  return (
    <div className="space-y-2 p-2" key={post.id}>
      <div className="space-y-2">
        <h2 className="text-lg font-bold">
          <input
            defaultValue={post.title}
            className="w-full rounded border border-opacity-50 p-2"
            disabled
          />
        </h2>
        <div>
          <textarea
            defaultValue={post.content}
            rows={6}
            className="w-full rounded border border-opacity-50 p-2"
            disabled
          />
        </div>
      </div>
      <div>
        <Link
          from={Route.fullPath}
          search={(old) => ({
            ...old,
            showNotes: old.showNotes ? undefined : true,
          })}
          params={true}
          className="text-blue-700"
        >
          {search.showNotes ? "Close Notes" : "Show Notes"}{" "}
        </Link>
        {search.showNotes ? (
          <>
            <div>
              <div className="h-2" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full rounded p-2 shadow"
                placeholder="Write some notes here..."
              />
              <div className="text-xs italic">
                Notes are stored in the URL. Try copying the URL into a new tab!
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
