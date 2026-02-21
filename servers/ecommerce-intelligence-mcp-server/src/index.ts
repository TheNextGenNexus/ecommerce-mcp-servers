#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const APIFY_ENDPOINT = "https://nexgendata--ecommerce-intelligence-mcp-server.apify.actor/mcp";
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
  name: "ecommerce-intelligence-mcp-server",
  version: "1.0.0"
});

server.registerTool(
  "analyze_shopify_store",
  {
    title: "Analyze Shopify Store",
    description: "Analyze a Shopify store",
    inputSchema: {
      storeUrl: z.string().describe('Shopify store URL')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("analyze_shopify_store", args);
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
  "get_product_catalog",
  {
    title: "Get Product Catalog",
    description: "Get product catalog",
    inputSchema: {
      storeUrl: z.string().describe('Shopify store URL'),
      maxItems: z.number().default(50).describe('Maximum products')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("get_product_catalog", args);
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
  "analyze_pricing_strategy",
  {
    title: "Analyze Pricing Strategy",
    description: "Analyze pricing strategy",
    inputSchema: {
      storeUrl: z.string().describe('Shopify store URL')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("analyze_pricing_strategy", args);
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
  "get_inventory_status",
  {
    title: "Get Inventory Status",
    description: "Check inventory status",
    inputSchema: {
      storeUrl: z.string().describe('Shopify store URL')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("get_inventory_status", args);
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
  "get_store_performance",
  {
    title: "Get Store Performance",
    description: "Get store performance metrics",
    inputSchema: {
      storeUrl: z.string().describe('Shopify store URL')
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true
    }
  },
  async (args) => {
    try {
      const result = await callApifyTool("get_store_performance", args);
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
  console.error("E-Commerce Intelligence MCP Server running on stdio");
}

// Only run when executed directly, not when imported by Smithery scanner
if (process.argv[1]?.includes('index')) {
  main().catch(console.error);
}
