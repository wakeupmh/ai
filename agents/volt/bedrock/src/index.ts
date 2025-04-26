import VoltAgent, { Agent, createReasoningTools, MCPConfiguration, Toolkit } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { bedrock } from "@ai-sdk/amazon-bedrock";

async function main() {
  try {
    // const mcpConfig = new MCPConfiguration({
    //   servers: {
    //     composio: {
    //       type: "http",
    //       url: process.env.COMPOSIO_MCP_URL,
    //     }
    //   },
    // });
    // const composioTools = await mcpConfig.getTools();
    // const gmailFetchEmails = composioTools.find(tool => tool.name === "composio_GMAIL_FETCH_EMAILS");
    const reasoningToolkit: Toolkit = createReasoningTools(); 
    
    const agent = new Agent({
      name: "Reasoning Assistant",
      description: "A reasoning assistant using a lightweight provider",
      // tools: [reasoningToolkit],
      llm: new VercelAIProvider(),
      model: bedrock('anthropic.claude-3-7-sonnet-20250219-v1:0'),
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
