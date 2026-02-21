# E-Commerce Intelligence MCP Server

Analyze Shopify stores, get product catalogs, pricing strategies, and store performance data — powered by [nexgendata](https://apify.com/nexgendata) on Apify.

## Quick Start

### Using npx (recommended)

```bash
npx @nexgendata/ecommerce-intelligence-mcp-server
```

### Install globally

```bash
npm install -g @nexgendata/ecommerce-intelligence-mcp-server
```

## Configure with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
      "mcpServers": {
            "ecommerce-intelligence-mcp-server": {
                  "command": "npx",
                  "args": [
                        "-y",
                        "@nexgendata/ecommerce-intelligence-mcp-server"
                  ],
                  "env": {
                        "APIFY_TOKEN": "your-apify-token-optional"
                  }
            }
      }
}
```

## Configure with Cline

Add the same configuration to your Cline MCP settings.

## Available Tools

| Tool | Description |
|------|-------------|
| `analyze_shopify_store` | Analyze a Shopify store's products and performance |
| `get_product_catalog` | Get the full product catalog from a Shopify store |
| `analyze_pricing_strategy` | Analyze pricing strategy of a store |
| `get_inventory_status` | Check inventory status for a store |
| `get_store_performance` | Get performance metrics for a store |


## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APIFY_TOKEN` | No | Your Apify API token for authenticated access. Without it, the server uses the public endpoint (rate-limited). |

## How It Works

This MCP server acts as a local stdio bridge to the [nexgendata Apify MCP endpoint](https://nexgendata--ecommerce-intelligence-mcp-server.apify.actor/mcp). When you call a tool, it forwards the request to Apify and returns the results.

## Links

- [Apify Store](https://apify.com/nexgendata/ecommerce-intelligence-mcp-server)
- [GitHub Repository](https://github.com/TheNextGenNexus/ecommerce-mcp-servers)
- [nexgendata Blog](https://thenextgennexus.com)

## License

MIT
