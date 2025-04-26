import VoltAgent, { Agent, MCPConfiguration } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { openai } from "@ai-sdk/openai";

async function main() {
  try {
    const mcpConfig = new MCPConfiguration({
      servers: {
        composio: {
          type: "http",
          url: "https://mcp.composio.dev/composio/server/a95bddcb-ec53-4bba-8724-94b2d73a9c33",
        }
      },
    });
  
    const agent = new Agent({
      name: "xsAI Assistant",
      description: "A helpful assistant using a lightweight provider",
      tools: await mcpConfig.getTools(),
      llm: new VercelAIProvider(),
      model: openai("gpt-4o-mini"),
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
