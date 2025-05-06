import VoltAgent, { Agent, createReasoningTools, MCPConfiguration, Tool, Toolkit } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';


const bedrock = createAmazonBedrock({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

async function main() {
  try {
    const zapierMcpConfig = new MCPConfiguration({
      servers: {
        zapier: {
          type: "http",
          url: process.env.ZAPIER_MCP_URL!,
        }
      },
    });

    const zapierTools = await zapierMcpConfig.getTools();

    const appTools = [...zapierTools];

    const reasoningToolkit: Toolkit = createReasoningTools(); 
    
    const agent = new Agent({
      id: "reasoning",
      name: "Reasoning Assistant",
      description: "A reasoning assistant using a lightweight provider",
      tools: [reasoningToolkit, ...appTools],
      llm: new VercelAIProvider(),
      model: bedrock('amazon.nova-lite-v1:0'),
      markdown: true,
    });
  
    new VoltAgent({
      agents: {
        agent,
      },
    });
  } catch (error) {
    console.error("Failed to initialize VoltAgent:", error);
  }
}

main();
