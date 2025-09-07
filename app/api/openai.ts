import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import type { ParsedChatCompletion } from "openai/resources/chat/completions";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatCompletionOptions<T = any> {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  responseFormat?: {
    schema: z.ZodType<T>;
    name: string;
  };
}

async function createChatCompletion<T = any>(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  options: ChatCompletionOptions<T> = {}
): Promise<ParsedChatCompletion<T>> {
  const {
    model = "gpt-4o-mini",
    temperature = 0,
    maxTokens = 4096,
    systemPrompt,
    responseFormat,
  } = options;

  const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  if (systemPrompt) {
    chatMessages.push({ role: "system", content: systemPrompt });
  }

  chatMessages.push(...messages);

  const baseParams = {
    model,
    messages: chatMessages,
    temperature,
    max_tokens: maxTokens,
    ...(responseFormat && {
      response_format: zodResponseFormat(
        responseFormat.schema,
        responseFormat.name
      ),
    }),
  };

  return await openai.chat.completions.parse(baseParams);
}

const FormQuestionsSchema = z.object({
  questions: z
    .array(z.string())
    .describe("Array of engaging questions for the form"),
});

export type FormQuestions = z.infer<typeof FormQuestionsSchema>;

const QuestionAnswerPairSchema = z.object({
  question: z.string().describe("The question being answered"),
  answer: z
    .string()
    .describe("The answer extracted from the conversation transcript"),
});

const QuestionAnswerPairsSchema = z.object({
  pairs: z
    .array(QuestionAnswerPairSchema)
    .describe("Array of question-answer pairs extracted from the conversation"),
});

export type QuestionAnswerPair = z.infer<typeof QuestionAnswerPairSchema>;
export type QuestionAnswerPairs = z.infer<typeof QuestionAnswerPairsSchema>;

function convertToJSON(str: string) {
  try {
    // Remove JS concatenation artifacts if present
    const cleaned = str
      .replace(/```json\s*|```/g, "")
      .trim()
      .replace(/'\s*\+\s*'/g, "")
      .replace(/\\n/g, "\n")
      .replace(/^'|'$/g, ""); // strip leading/trailing quotes

    // Parse into JS object
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Invalid JSON string:", error);
    return null;
  }
}

export async function generateFormQuestions(
  formName: string,
  goal: string,
  context: string,
  numQuestions: number = 3,
  options: ChatCompletionOptions = {}
): Promise<FormQuestions> {
  const prompt = `
    Form Name: ${formName}
    Goal: ${goal}
    Context: ${context}

    Generate exactly ${numQuestions} engaging questions that would be perfect for this form. 
    Each question should help achieve the goal and be relevant to the context provided.
`;

  const completion = await createChatCompletion(
    [{ role: "user", content: prompt }],
    {
      ...options,
      systemPrompt: `
        You are a helpful form designer.
        Create thoughtful, specific questions that will gather useful information to achieve the form's goal.
        Your response must be a valid JSON object with an array of questions,  each item in the array should contain a single question string e.g ["", ""]
         `,
      // responseFormat: {
      //   schema: FormQuestionsSchema,
      //   name: "form_questions",
      // },
    }
  );

  console.log(
    "response:",

    completion.choices[0].message.content
  );

  const data = convertToJSON(
    completion.choices[0].message.content as unknown as string
  );

  return data;
}

export async function generateQuestionAnswerPairs(
  questions: string[],
  conversationTranscript: string,
  options: ChatCompletionOptions = {}
): Promise<QuestionAnswerPairs> {
  const prompt = `
Given the following conversation transcript and list of questions, extract answers to each question from the conversation. If a question cannot be answered based on the conversation, provide "Not answered in conversation" as the answer.

Questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Conversation Transcript:
${conversationTranscript}

Please analyze the conversation and provide answers to each question based on what was discussed.
`;

  const completion = await createChatCompletion(
    [{ role: "user", content: prompt }],
    {
      ...options,
      systemPrompt:
        options.systemPrompt ||
        "You are an expert conversation analyst. Extract accurate answers to questions from conversation transcripts. Be precise and only use information that is clearly stated or strongly implied in the conversation.",
      temperature: options.temperature ?? 0,
      maxTokens: options.maxTokens ?? 4096,
      responseFormat: {
        schema: QuestionAnswerPairsSchema,
        name: "question_answer_pairs",
      },
    }
  );

  return completion.choices[0].message.parsed!;
}

export { OpenAI, z, zodResponseFormat, createChatCompletion };
export default openai;
