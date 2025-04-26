import VoltAgent, { Agent, createReasoningTools, MCPConfiguration, Toolkit } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { openai } from "@ai-sdk/openai";

async function main() {
  try {
    const mcpConfig = new MCPConfiguration({
      servers: {
        composio: {
          type: "http",
          url: process.env.COMPOSIO_MCP_URL!,
        }
      },
    });
    const composioTools = await mcpConfig.getTools();
    const gmailFetchEmails = composioTools.find(tool => tool.name === "composio_GMAIL_FETCH_EMAILS");
    const reasoningToolkit: Toolkit = createReasoningTools(); 
    
    const agent = new Agent({
      name: "Reasoning Assistant",
      description: "A reasoning assistant using a lightweight provider",
      tools: [reasoningToolkit, gmailFetchEmails!],
      llm: new VercelAIProvider(),
      model: openai("gpt-4o-mini"),
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
