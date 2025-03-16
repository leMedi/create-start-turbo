import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";

// Validate environment variables
import "./env";

export default createStartAPIHandler(defaultAPIFileRouteHandler);
