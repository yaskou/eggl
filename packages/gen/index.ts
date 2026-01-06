import { z } from "zod";
import { createQuestions } from "db";
import { GoogleGenAI } from "@google/genai";

const questionSchema = z.object({
  question: z.string().describe("a question of TOEIC"),
  optionA: z.string().describe("option of the question"),
  optionB: z.string().describe("option of the question"),
  optionC: z.string().describe("option of the question"),
  optionD: z.string().describe("option of the question"),
  answer: z.string().describe("the text of the answer"),
  explanation: z
    .string()
    .describe("a explanation in japanese why the option is correct"),
  score: z.int().min(10).max(990).describe("a score of TOEIC"),
});
const questionsSchema = z.object({
  questions: z.array(questionSchema),
});

const main = async () => {
  const ai = new GoogleGenAI({});

  const prompt = "TOEIC Part5の問題複数作成して";
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(questionsSchema),
    },
  });

  if (!response.text) {
    console.log("No question is generated!");
    return 1;
  }
  const output = questionsSchema.parse(JSON.parse(response.text));

  await createQuestions(output.questions);

  return 0;
};

main();
