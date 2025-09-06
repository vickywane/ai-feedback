import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type * as ElevenLabs from "@elevenlabs/elevenlabs-js/api";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

export async function createAgent(name: string, prompt: string, context: string): Promise<ElevenLabs.CreateAgentResponseModel> {
  const agentConfig = {
    name: name,
    conversationConfig: {
      agent: {
        prompt: {
          prompt: prompt,
        },
        dynamicVariables: {
          dynamicVariablePlaceholders: {
            context: context,
          }
        }
      },
    },
  };
  return await elevenlabs.conversationalAi.agents.create(agentConfig);
}

export async function getConversationTranscript(conversationId: string): Promise<ElevenLabs.GetConversationResponseModel> {
  return await elevenlabs.conversationalAi.conversations.get(conversationId);
}



export { ElevenLabsClient };
export type { ElevenLabs };
