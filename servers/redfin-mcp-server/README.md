# Redfin Real Estate MCP Server

Search Redfin properties, get property details, and market statistics — powered by [nexgendata](https://apify.com/nexgendata?fpr=2ayu9b) on Apify.

## Quick Start

### Using npx (recommended)

```bash
npx @nexgendata/redfin-mcp-server
```

### Install globally

```bash
npm install -g @nexgendata/redfin-mcp-server
```

## Configure with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
      "mcpServers": {
            "redfin-mcp-server": {
                  "command": "npx",
                  "args": [
                        "-y",
                        "@nexgendata/redfin-mcp-server"
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
| `search_properties` | Search for properties on Redfin |
| `get_property_details` | Get detailed information about a specific property |
| `get_market_stats` | Get real estate market statistics for an area |


## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APIFY_TOKEN` | No | Your Apify API token for authenticated access. Without it, the server uses the public endpoint (rate-limited). |

## How It Works

This MCP server acts as a local stdio bridge to the [nexgendata Apify MCP endpoint](https://nexgendata--redfin-mcp-server.apify.actor/mcp). When you call a tool, it forwards the request to Apify and returns the results.

## Links

- [Apify Store](https://apify.com/nexgendata/redfin-mcp-server?fpr=2ayu9b)
- [GitHub Repository](https://github.com/TheNextGenNexus/ecommerce-mcp-servers)
- [nexgendata Blog](https://thenextgennexus.com)

## License

MIT
