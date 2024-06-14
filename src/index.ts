import { serve } from "@hono/node-server";
import app from "./server";
const port = 32456;
serve({ port, fetch: app.fetch }, () => {
	console.log(`http://localhost:${port} runnning!`);
});
