import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/health")({
  GET: () => {
    const status = {
      status: "healthy",
      timestamp: new Date().toISOString(),
    };

    return Response.json(status, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },
});
