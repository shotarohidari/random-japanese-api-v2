import { Hono } from "hono";
import { randomJPNames } from "./chatgpt";
const app = new Hono();

let isProcessing = false;
app.get("/", (c) => c.text("Hono!"));
app.get("/generation", async (c) => {
	if (isProcessing) c.json({ message: "processing" }, { status: 400 });
	try {
		isProcessing = true;
		const names = await randomJPNames(30);
		return c.json(names);
	} finally {
		isProcessing = false;
	}
});

export default app;
