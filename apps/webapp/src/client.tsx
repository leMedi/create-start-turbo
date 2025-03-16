/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "./router";

import "./global.css";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
