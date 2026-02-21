# ecommerce-mcp-servers

MCP servers for e-commerce intelligence, real estate data, and property search — powered by [nexgendata](https://apify.com/nexgendata) on Apify.

## MCP Servers


### [E-Commerce Intelligence MCP Server](./servers/ecommerce-intelligence-mcp-server/)

Analyze Shopify stores, get product catalogs, pricing strategies, and store performance data

**Tools:** `analyze_shopify_store`, `get_product_catalog`, `analyze_pricing_strategy`, `get_inventory_status`, `get_store_performance`

**Install:** `npx @nexgendata/ecommerce-intelligence-mcp-server`

### [Redfin Real Estate MCP Server](./servers/redfin-mcp-server/)

Search Redfin properties, get property details, and market statistics

**Tools:** `search_properties`, `get_property_details`, `get_market_stats`

**Install:** `npx @nexgendata/redfin-mcp-server`

### [Real Estate MCP Server](./servers/real-estate-mcp-server/)

Search properties via Redfin and Google Maps real estate data

**Tools:** `search_redfin_properties`, `get_property_details`, `search_google_maps_real_estate`

**Install:** `npx @nexgendata/real-estate-mcp-server`


## Quick Start

Each server can be installed independently:

```bash
# Pick the server you need
npx @nexgendata/<server-name>
```

Then add it to your Claude Desktop or Cline configuration.

## About nexgendata

nexgendata provides 64 data tools on the [Apify platform](https://apify.com/nexgendata), including 15 MCP servers for AI agent integration. Our tools cover social media, business data, web intelligence, finance, e-commerce, and more.

- **Blog:** [thenextgennexus.com](https://thenextgennexus.com)
- **Apify Store:** [apify.com/nexgendata](https://apify.com/nexgendata)
- **RapidAPI:** [rapidapi.com/rubymoonshot](https://rapidapi.com/user/rubymoonshot)

## License

MIT
