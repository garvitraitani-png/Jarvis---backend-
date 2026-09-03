import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("Jarvis backend is running"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
