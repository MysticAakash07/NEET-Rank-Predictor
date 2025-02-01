import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.get("/api/quiz-history", async (req, res) => {
	try {
		const response = await fetch("https://api.jsonserve.com/XgAgFJ");
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch data" });
	}
});

app.listen(5000, () => console.log("Server running on port 5000"));
