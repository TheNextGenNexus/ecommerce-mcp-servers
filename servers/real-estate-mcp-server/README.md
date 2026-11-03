# Real Estate MCP Server

Search properties via Redfin and Google Maps real estate data — powered by [nexgendata](https://apify.com/nexgendata?fpr=2ayu9b) on Apify.

## Quick Start

### Using npx (recommended)

```bash
npx @nexgendata/real-estate-mcp-server
```

### Install globally

```bash
npm install -g @nexgendata/real-estate-mcp-server
```

## Configure with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
      "mcpServers": {
            "real-estate-mcp-server": {
                  "command": "npx",
                  "args": [
                        "-y",
                        "@nexgendata/real-estate-mcp-server"
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
| `search_redfin_properties` | Search Redfin for property listings |
| `get_property_details` | Get detailed property information |
| `search_google_maps_real_estate` | Search Google Maps for real estate agents and offices |


## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APIFY_TOKEN` | No | Your Apify API token for authenticated access. Without it, the server uses the public endpoint (rate-limited). |

## How It Works

This MCP server acts as a local stdio bridge to the [nexgendata Apify MCP endpoint](https://nexgendata--real-estate-mcp-server.apify.actor/mcp). When you call a tool, it forwards the request to Apify and returns the results.

## Links

- [Apify Store](https://apify.com/nexgendata/real-estate-mcp-server?fpr=2ayu9b)
- [GitHub Repository](https://github.com/TheNextGenNexus/ecommerce-mcp-servers)
- [nexgendata Blog](https://thenextgennexus.com)

## License

MIT
