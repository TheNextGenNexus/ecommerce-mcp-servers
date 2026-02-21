#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const APIFY_ENDPOINT = "https://nexgendata--redfin-mcp-server.apify.actor/mcp";
const APIFY_TOKEN = process.env.APIFY_TOKEN || "";

async function callApifyTool(toolName: string, args: Record<string, unknown>): Promise<string> {
  const url = new URL(APIFY_ENDPOINT);
  if (APIFY_TOKEN) {
    url.searchParams.set("token", APIFY_TOKEN);
  }

  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: toolName,
      arguments: args
    }
  };

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Apify API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`Tool error: ${JSON.stringify(data.error)}`);
  }

  // Extract text content from MCP response
  const result = data.result;
  if (result?.content && Array.isArray(result.content)) {
    return result.content
      .filter((c: { type: string }) => c.type === "text")
      .map((c: { text: string }) => c.text)
      .join("\n");
  }

  return JSON.stringify(data.result, null, 2);
}

const server = new McpServer({
  name: "redfin-mcp-server",
  version: "1.0.0"
});

server.registerTool(
  "search_properties",
  {
    title: "Search Properties",
    description: "Search Redfin properties",
    inputSchema: {
      location: z.string().describe('City, ZIP, or address'),
      maxPrice: z.number().optional().describe('Maximum price'),
      minBeds: z.number().optional().describe('Minimum bedrooms'),
      maxItems: z.number().default(20).describe('Maximum results')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("search_properties", args);
      return {
        content: [{ type: "text", text: result }]
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true
      };
    }
  }
);

server.registerTool(
  "get_property_details",
  {
    title: "Get Property Details",
    description: "Get property details",
    inputSchema: {
      propertyUrl: z.string().describe('Redfin property URL')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("get_property_details", args);
      return {
        content: [{ type: "text", text: result }]
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true
      };
    }
  }
);

server.registerTool(
  "get_market_stats",
  {
    title: "Get Market Stats",
    description: "Get market statistics",
    inputSchema: {
      location: z.string().describe('City or ZIP code')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("get_market_stats", args);
      return {
        content: [{ type: "text", text: result }]
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true
      };
    }
  }
);


// Export for Smithery sandbox scanning
export function createSandboxServer() {
  return server;
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Redfin Real Estate MCP Server running on stdio");
}

// Only run when executed directly, not when imported by Smithery scanner
if (process.argv[1]?.includes('index')) {
  main().catch(console.error);
}
