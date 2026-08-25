import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateProjectFromRequirement(requirement: string) {
  const prompt = `
You are an expert software architect. Based on the following requirement, generate a complete project structure with files.

Requirement: ${requirement}

Output must be a JSON object with:
{
  "projectName": "name",
  "description": "brief description",
  "dependencies": { "package": "version" },
  "files": [
    { "path": "src/app/page.tsx", "content": "..." },
    { "path": "package.json", "content": "..." }
  ]
}

Respond ONLY with valid JSON. No markdown, no extra text.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini invalid response:", text);
    throw new Error("AI response was not valid JSON. Please try again.");
  }
}