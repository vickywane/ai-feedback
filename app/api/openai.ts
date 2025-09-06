import OpenAI from 'openai';
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}


async function createChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  options: ChatCompletionOptions = {}
): Promise<OpenAI.Chat.Completions.ChatCompletion> {
  const {
    model = "gpt-4o-mini",
    temperature = 0,
    maxTokens = 4096,
    systemPrompt
  } = options;

  const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  
  if (systemPrompt) {
    chatMessages.push({ role: "system", content: systemPrompt });
  }
  
  chatMessages.push(...messages);

  return await openai.chat.completions.create({
    model,
    messages: chatMessages,
    temperature,
    max_tokens: maxTokens,
  });
}

export async function generateText(
  prompt: string,
  options: ChatCompletionOptions = {}
): Promise<string> {
  const completion = await createChatCompletion(
    [{ role: "user", content: prompt }],
    options
  );

  return completion.choices[0]?.message?.content || "";
}

export async function generateFormQuestions(
  formName: string,
  goal: string,
  context: string,
  numQuestions: number = 3,
  options: ChatCompletionOptions = {}
): Promise<string> {
  const prompt = `
Form Name: ${formName}
Goal: ${goal}
Context: ${context}

Generate exactly ${numQuestions} engaging questions that would be perfect for this form. Each question should help achieve the goal and be relevant to the context provided. Format as a numbered list.
`;

  return await generateText(prompt, {
    ...options,
    systemPrompt: options.systemPrompt || "You are a helpful form designer. Create thoughtful, specific questions that will gather useful information to achieve the form's goal.",
    temperature: options.temperature ?? 0.7,
    maxTokens: options.maxTokens ?? 4096
  });
}

export { OpenAI };
export default openai;
