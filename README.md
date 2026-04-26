# Awesome WP AI [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of awesome AI plugins, tools, themes, frameworks, and resources for WordPress (WP).

Contributions welcome! Read the [contribution guidelines](CONTRIBUTING.md) first.

---

## Contents

- [Official WordPress AI Infrastructure](#official-wordpress-ai-infrastructure)
- [Community AI Providers](#community-ai-providers)
- [Multi-Purpose AI Plugins](#multi-purpose-ai-plugins)
- [Content Generation](#content-generation)
- [SEO & Metadata](#seo--metadata)
- [Image Generation](#image-generation)
- [Chatbots & Conversational AI](#chatbots--conversational-ai)
- [WooCommerce & E-Commerce](#woocommerce--e-commerce)
- [Forms & Automation](#forms--automation)
- [Translation & Multilingual](#translation--multilingual)
- [Video & Transcription](#video--transcription)
- [Page Builders with AI](#page-builders-with-ai)
- [Themes](#themes)
- [Plugins with Abilities API](#plugins-with-abilities-api)
- [MCP Integration](#mcp-integration)
- [Agent Skills](#agent-skills)
- [Hosting & Site Builders](#hosting--site-builders)
- [Open Source Projects](#open-source-projects)
- [Learning Resources](#learning-resources)
- [Credits](#credits)

---

## Official WordPress AI Infrastructure

The WordPress project maintains a growing set of official AI infrastructure components.

- [WordPress/ai](https://github.com/WordPress/ai) - Official AI plugin (formerly "AI Experiments") shipping experiments including title generation, content summarization, alt text, featured image generation, and image editing. Reference implementation for the Abilities API.
- [PHP AI Client SDK](https://github.com/WordPress/php-ai-client) - Platform-agnostic PHP AI client developed collaboratively with the broader PHP community. Write code against `wp_ai_client_prompt()` and it works with any registered provider.
- [WP AI Client](https://github.com/WordPress/wp-ai-client) - Client-side JavaScript AI library landing in WordPress 7.0 core.
- [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter) - Bridges the WordPress Abilities API to the Model Context Protocol, enabling AI agents to discover and invoke WordPress abilities programmatically. 820+ GitHub stars.
- [AI Services](https://github.com/felixarntz/ai-services) - Makes AI centrally available in WordPress via PHP, REST API, JavaScript, and WP-CLI for any provider.
- [AI Provider for Anthropic Claude](https://wordpress.org/plugins/ai-provider-for-anthropic/) - Official plugin registering Claude with the PHP AI Client SDK for text generation and function calling.
- [AI Provider for Google Gemini](https://wordpress.org/plugins/ai-provider-for-google/) - Official plugin integrating Google Gemini models with support for text generation, image generation, and function calling.
- [AI Provider for OpenAI](https://wordpress.org/plugins/ai-provider-for-openai/) - Official plugin supporting GPT models, DALL·E, GPT-4 Vision, and text-to-speech.

## Community AI Providers

Community-built provider plugins for the PHP AI Client SDK — write against the unified API and swap any provider.

- [Mistral AI provider](https://github.com/saarnilauri/ai-provider-for-mistral) - By Lauri Saarni. Supports text, vision, function calling, and image generation.
- [Grok (xAI) provider](https://wordpress.org/plugins/aslams-ai-provider-for-grok/) - By Aslam Doctor. Connects WordPress to xAI's Grok models.
- [OpenRouter provider](https://wordpress.org/plugins/ai-provider-for-openrouter/) - By Jonathan Bossenger. Access 400+ models through a single connection.
- [Ollama provider](https://wordpress.org/plugins/ai-provider-for-ollama/) - By Fueled. Run local open-source models with zero data leaving the server.
- [mittwald AI provider](https://wordpress.org/plugins/mittwald-ai-provider/) - By German hosting company mittwald.
- [Azure AI Foundry provider](https://wordpress.org/plugins/ai-provider-for-azure-ai-foundry/) - By Per Soderlind. Supports Azure AI Foundry, Azure OpenAI, and Cognitive Services.
- [Hugging Face provider](https://wordpress.org/plugins/ai-provider-for-hugging-face/) - By Aslam Doctor. Supports text and images via multiple HF inference backends.
- [Open WebUI provider](https://wordpress.org/plugins/ai-provider-for-open-webui/) - OpenAI-compatible settings with automatic model discovery.
- [Alibaba Cloud provider](https://wordpress.org/plugins/ai-provider-for-alibaba-cloud/) - DashScope/Qwen connector with function-calling support.
- [DuetG AI Connector](https://github.com/duetg/duetg-ai-connector) - Supports DeepSeek, Moonshot, MiniMax, SiliconFlow, LM Studio, and Ollama.

## Multi-Purpose AI Plugins

Full-featured plugins covering content generation, chatbots, image creation, and more.

- [AI Engine](https://wordpress.org/plugins/ai-engine/) - The most widely-used WordPress AI plugin (80,000+ installs) with chatbots, content generation, AI forms, WooCommerce MCP module (25 tools), and MCP integration. [GitHub](https://github.com/jordymeow/ai-engine)
- [AI Power (AI Puffer)](https://wordpress.org/plugins/gpt3-ai-content-generator/) - Complete AI engine with chatbot, content generation, image creation, automation, and training on custom data.
- [MxChat](https://wordpress.org/plugins/mxchat-basic/) - Free AI chatbot and content generation supporting ChatGPT, Claude, Gemini, Grok, DeepSeek, and 100+ models.
- [AI Copilot – Content Generator](https://wordpress.org/plugins/ai-copilot-content-generator/) - AI automation platform combining workflow automation, chatbots, content generation, and MCP integration.

## Content Generation

Plugins focused on writing assistance, blog post drafting, and text optimization.

- [WP AI CoPilot](https://wordpress.org/plugins/ai-co-pilot-for-wp/) - AI content writer using GPT-3/4 with 40+ templates supporting 33+ languages for posts, articles, and product descriptions.
- [AI Copilot](https://wordpress.org/plugins/ai-copilot/) - Rewrite, expand, shorten, and translate text in the WordPress editor with support for OpenAI, Claude, Gemini, Perplexity, and DeepSeek.
- [Jetpack AI Assistant](https://jetpack.com/) - AI-powered content generation directly in the WordPress block editor via Jetpack infrastructure. Also registers Abilities API abilities.
- [Bertha AI](https://bertha.ai/) - Specialized AI content generation and copywriting plugin for WordPress.

## SEO & Metadata

AI-powered plugins for search engine optimization, metadata, and alt text.

- [Rank Math SEO](https://wordpress.org/plugins/seo-by-rank-math/) - AI-powered SEO plugin (3M+ installs) with Content AI for keyword suggestions, meta titles, descriptions, and content scoring. Supports llms.txt generation.
- [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) - Long-established SEO plugin with an AI-powered title and meta description generator (v21.0+). Supports llms.txt and NLWeb schema aggregation in collaboration with Microsoft.
- [SOOZ – AI for SEO](https://wordpress.org/plugins/ai-for-seo/) - Bulk alt text and metadata generator with SEO Autopilot, syncs with Yoast, Rank Math, and SEOPress.
- [Alt Text AI](https://wordpress.org/plugins/alttext-ai/) - Automatically generates image alt text for SEO and accessibility, integrates with major SEO plugins.
- [Website LLMs.txt](https://wordpress.org/plugins/website-llms-txt/) - Generates an llms.txt file to help AI assistants understand your site.
- [LLMs-Full.txt Generator](https://wordpress.org/plugins/llms-full-txt-generator/) - Generates a comprehensive llms-full.txt for AI consumption.

## Image Generation

Plugins for AI-driven image creation and visual content management.

- [AI Featured Image](https://wordpress.org/plugins/ai-featured-image-generator/) - One-click AI image generation using OpenAI with a free tier and Pro features for Gemini and bulk generation.
- [Genie Image](https://wordpress.com/plugins/genie-image-ai) - AI-powered image generation plugin for WordPress.

## Chatbots & Conversational AI

Conversational AI plugins for support, lead generation, and user engagement.

- [WPBot](https://wordpress.org/plugins/chatbot/) - AI & OpenAI ChatGPT integration with RAG Vector Database, content writer, and image generation.
- [Tidio AI Chatbot](https://www.tidio.com/) - Conversational chatbot for live support and lead generation with AI escalation.

## WooCommerce & E-Commerce

AI tools specifically designed for WooCommerce stores and product management.

- [AI Product Tools](https://wordpress.org/plugins/ai-product-tools/) - Bulk product content generator with a store-aware AI Shop Assistant for WooCommerce descriptions, titles, and taxonomies.
- [Kestrel AI](https://woocommerce.com/products/kestrel-ai/) - Content assistant for WooCommerce generating product descriptions and review responses directly in the dashboard.
- [StoreAgent](https://wordpress.org/plugins/storeagent-ai-for-woocommerce/) - WooCommerce AI plugin for product reviews, descriptions, and customer questions.
- [WriteText.ai for WooCommerce](https://writetext.ai/woocommerce) - Uses store data and image analysis for SEO-optimized product content automation.
- [AI Addons](https://woocommerce.com/products/ai-addons/) - Generates product descriptions, images, and review replies directly in WooCommerce.

## Forms & Automation

AI-powered form builders and workflow automation for WordPress.

- [FormGent](https://wordpress.org/plugins/formgent/) - Modern AI-powered form builder with multi-step forms, quizzes, and payments using natural language.
- [SureForms](https://wordpress.com/plugins/sureforms) - AI-powered form builder with smart suggestions and native integrations with Google Sheets, Mailchimp, and FluentCRM. Implements Abilities API.
- [WPForms AI](https://wpforms.com/) - Conversational AI form builder generating complex forms with payment options and conditional logic. 6M+ installs with Abilities API integration.
- [Fluent Forms](https://fluentforms.com/) - AI-powered form creation allowing forms to be built using natural language prompts.
- [Uncanny Automator](https://wordpress.org/plugins/uncanny-automator/) - Automation tool connecting WordPress to AI tools, marketing platforms, and email services.
- [Ninja Forms](https://wordpress.org/plugins/ninja-forms/) - 32 abilities across 7 capability areas; full AI form builder ("Dashboard Parity"). 100% free Abilities API implementation. [Docs](https://ninjaforms.com/docs/abilities-api/)
- [WS Form](https://wsform.com/completing-the-stack-ws-form-and-the-wordpress-ai-client-sdk/) - Full Abilities API + built-in MCP server + "Create from AI" template. Aligned with WP AI Client SDK.

## Translation & Multilingual

AI translation plugins for multilingual WordPress sites.

- [Weglot](https://wordpress.org/plugins/weglot/) - AI translation using OpenAI and Gemini with context-aware language models; supports WooCommerce emails.
- [AI Translate](https://wordpress.org/plugins/ai-translate/) - Auto-translates entire websites in real-time, supports 35+ languages.
- [GPTranslate](https://wordpress.com/plugins/gptranslate) - AI-powered multilingual translation supporting ChatGPT, Gemini, DeepSeek, Claude, and DeepL.
- [ConveyThis Translate](https://www.conveythis.com/) - Works with all themes and plugins including WooCommerce, supports 200+ languages.
- [Linguise](https://www.linguise.com/integrations/wordpress-automatic-translation-plugin/) - Cloud AI translation with dynamic checkout and customer email support for WooCommerce.

## Video & Transcription

Plugins for AI-powered video transcription, subtitles, and accessibility.

- [VidSEO](https://wordpress.org/plugins/vidseo/) - Embeds video transcripts for accessibility and SEO, retrieves YouTube subtitles automatically.
- [Wubtitle](https://wordpress.com/plugins/wubtitle) - All-in-one video-to-text plugin with auto-subtitling and transcript conversion from YouTube/Vimeo.
- [Hyperaudio](https://github.com/hyperaudio/wordpress-hyperaudio) - Interactive transcript display plugin for improved accessibility and searchability.

## Page Builders with AI

Visual page builders with native AI capabilities.

- [Elementor AI](https://elementor.com/) - AI-powered content and layout suggestions inside Elementor builder with code snippet generation.
- [Divi AI](https://www.divi.com/) - Content, image, and layout generation inside the Divi ecosystem.
- [Greenshift Page Builder](https://wordpress.org/plugins/greenshift-animation-and-page-builder-blocks/) - 70K+ installs with Abilities API integration.

## Themes

WordPress themes built for AI products or with integrated AI capabilities.

- [Mindware](https://themeforest.net/) - Modern AI startup/SaaS theme with clean layouts and CTA-focused sections.
- [Elementra](https://themeforest.net/) - Elementor-based theme with AI chatbot layout for SaaS and automation platforms.
- [Hub](https://themeforest.net/) - Multipurpose theme with 80+ pre-built websites, 700+ templates, and AI-driven customization.

## Plugins with Abilities API

Plugins that have implemented the WordPress [Abilities API](https://developer.wordpress.org/apis/abilities/) (`wp_register_ability()`), making their functionality discoverable and invocable by AI agents via the MCP Adapter.

- [Advanced Custom Fields (ACF) 6.8](https://www.advancedcustomfields.com/blog/acf-pro-6-8-release-ai-ready-discoverable-content/) - Full Abilities API integration. AI tools can discover, inspect, create, and modify field groups, CPTs, taxonomies, and content. 2M+ installs.
- [WooCommerce](https://developer.woocommerce.com/docs/features/mcp/) - Registers abilities under `woocommerce/` namespace, exposed via MCP Adapter. Provides structured AI access to products, orders, and customers. 7M+ installs.
- [WPForms Lite](https://wpforms.com/) - Abilities API integration. 6M+ installs.
- [WPCode / Insert Headers and Footers](https://wordpress.org/plugins/insert-headers-and-footers/) - Dedicated abilities class. 3M+ installs.
- [Jetpack](https://wordpress.org/plugins/jetpack/) - Bundles abilities; Jetpack Forms registers abilities via core. 3M+ installs.
- [Ninja Forms](https://ninjaforms.com/blog/build-wordpress-forms-with-ai/) - 32 abilities across 7 capability areas. 600K+ installs.
- [SureForms](https://wordpress.org/plugins/sureforms/) - Abilities API integration. 500K+ installs.
- [MainWP Dashboard](https://wordpress.org/plugins/mainwp/) - Abilities woven throughout; exposes site management surface to AI agents. 20K+ installs.
- [miniOrange AI Agent](https://wordpress.org/plugins/miniorange-ai-agent/) - Abilities API adopted across SAML SSO, OAuth, LDAP, and 2FA plugins. AI tools can diagnose SSO errors.
- [VigIA](https://wordpress.org/plugins/vigia/) - 9 Abilities API actions around analytics, robots, and blocking. 800+ installs.
- [DiveWP](https://wordpress.org/plugins/divewp-boost-site-performance/) - 11 performance-diagnostic abilities for technical audits.
- [Enable Abilities for MCP](https://wordpress.org/plugins/enable-abilities-for-mcp/) - 32 abilities, WooCommerce-aware, explicit MCP bridge.
- [CartFlows](https://wordpress.org/plugins/cartflows/) - Abilities API integration. 200K+ installs.
- [OttoKit Automation](https://wordpress.org/plugins/suretriggers/) - Abilities API integration. 100K+ installs.
- [LatePoint Booking](https://wordpress.org/plugins/latepoint/) - Abilities API integration. 100K+ installs.
- [WP Password Policy](https://wordpress.org/plugins/password-requirements/) - v3.6.0 added Abilities API; password-policy controls accessible via MCP.
- [Fluid Design System for Elementor](https://wordpress.org/plugins/fluid-design-system-for-elementor/) - v2.3.0 added AI-agent integration, registering `fluid-design-system` MCP server with MCP Adapter.
- [hCaptcha for WP](https://wordpress.org/plugins/hcaptcha-for-forms-and-more/) - Abilities API integration. 70K+ installs.
- [WindPress (Tailwind CSS)](https://wordpress.org/plugins/windpress/) - Abilities API integration. 3K+ installs.
- [Ultimate Multisite](https://wordpress.org/plugins/ultimate-multisite/) - AI access to SaaS and WaaS networks.

## MCP Integration

Plugins, servers, and tools implementing the [Model Context Protocol](https://modelcontextprotocol.io/) for WordPress.

### Official

- [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter) - Official WordPress MCP adapter bridging the Abilities API to MCP-compatible AI agents. 820+ stars.
- [WordPress.org Plugin Directory MCP Server](https://make.wordpress.org/meta/2026/03/20/plugin-directory-mcp-server/) - Official MCP server built on Abilities API. Validate readmes, check submission status, and submit plugins. [Full docs](https://developer.wordpress.org/plugins/wordpress-org/using-the-mcp-server/)
- [WordPress Playground MCP](https://make.wordpress.org/playground/2026/03/17/connect-ai-coding-agents-to-wordpress-playground-with-mcp/) - One `npx` command connects agents to WordPress Playground running in the browser via WebAssembly. No server, no Docker.

### Plugins (WordPress.org)

- [Royal MCP](https://wordpress.org/plugins/royal-mcp/) - Security-focused MCP implementation; auto-detects WooCommerce.
- [AI Agent Hub](https://wordpress.org/plugins/ai-workflow-automation-ai-agent-hub/) - 80+ abilities, 10 modules, MCP server, and workflow builder.
- [StifLi Flex MCP](https://wordpress.org/plugins/stifli-flex-mcp/) - 117+ tools; auto-discovers registered abilities.
- [Abilities Bridge](https://wordpress.org/plugins/abilities-bridge/) - MCP server + admin chat with 7-gate permissions.
- [MountDev AI MCP Connector](https://wordpress.org/plugins/mountdev-ai-mcp-connector/) - 75+ tools, OAuth 2.0 for ChatGPT integration.
- [Rapls AI Chatbot](https://wordpress.org/plugins/rapls-ai-chatbot/) - 7 MCP tools; "WordPress Abilities API Bridge" auto-registers tools as abilities. Bilingual English/Japanese.
- [Virtual Media Folders](https://wordpress.org/plugins/virtual-media-folders/) - Folder-management abilities for agentic media organization.
- [All Sources Images](https://wordpress.org/plugins/all-sources-images/) - Image search, featured-image, and generation abilities.

### Community Servers & Libraries

- [GravityMCP](https://github.com/GravityKit/GravityMCP) - By GravityKit. Open-source MCP server for Gravity Forms.
- [Novamira](https://novamira.ai/) - Five raw primitives (Execute PHP, Read/Write/Edit Files, Delete/Toggle, List Directory) in a sandboxed PHP execution environment. Free, open source, WordPress 6.9+.
- [Respira](https://www.npmjs.com/package/@respira/wordpress-mcp-server) - Full-featured MCP client for self-hosted WordPress with multi-site support and Abilities API integration. 940+ weekly npm downloads.
- [WebMCP Abilities](https://github.com/code-atlantic/webmcp-abilities) - By WP Popup Maker team. Bridges `wp_register_ability()` to Chrome's `navigator.modelContext` browser API.
- [Claudeus WP MCP](https://github.com/deus-h/claudeus-wp-mcp) - 145 tools for comprehensive WordPress management.
- [mcp-wordpress](https://github.com/docdyhr/mcp-wordpress) - DXT extension for Claude Desktop.
- [@automattic/mcp-wordpress-remote](https://github.com/Automattic/mcp-wordpress-remote) - Automattic's remote MCP server implementation.
- [rnaga/wp-mcp](https://github.com/rnaga/wp-mcp) - CRUD primitives for posts, users, comments, terms, metadata, options, and site settings. Also on npm as `@rnaga/wp-mcp`.
- [buddypress-mcp](https://github.com/vapvarun/buddypress-mcp) - BuddyPress MCP server + abilities MU-plugin.
- [elementor-mcp-api](https://github.com/bvisible/elementor-mcp-api) - REST + MCP controls for AI-driven Elementor editing; auto-registers 20 abilities with MCP Adapter.
- [mcp-expose-abilities](https://github.com/bjornfix/mcp-expose-abilities) - Documents 61+ core abilities and 280+ ecosystem abilities across Elementor, Rank Math, Wordfence, Brevo, Cloudflare, and Google Workspace.
- [wordpress-wae](https://github.com/kradyy/wordpress-wae) - 84 carefully designed abilities for AI agent interaction.
- [WS Form MCP Server](https://wsform.com/how-to-create-an-mcp-server-in-wordpress-with-the-abilities-api-and-mcp-adapter/) - Built-in MCP server in WS Form; tutorial covers building your own.

## Agent Skills

Portable instruction bundles that teach AI coding assistants WordPress development patterns. Not plugins — knowledge for machines.

- [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - Official repository with 14 skills for Claude Code, Codex, Copilot, Cursor, Gemini CLI, and more. 1.2K+ stars. Install via `npx skills add`. Includes: `wordpress-router`, `wp-block-development`, `wp-plugin-development`, `wp-rest-api`, `wp-abilities-api`, `wp-performance`, `wp-playground`, and more.
- [wp-cli/ability-command](https://github.com/wp-cli/ability-command) - Official WP-CLI package for listing, inspecting, and executing registered abilities.
- [wp-cli/ai-command](https://github.com/wp-cli/ai-command) - CLI control of WordPress with WP-CLI, AI, and MCP. 25+ stars.
- [claude-skills-wp-abilities-api](https://github.com/nathanonn/claude-skills-wp-abilities-api) - Claude skill package for WordPress Abilities API docs and conventions.

## Hosting & Site Builders

Managed WordPress hosting platforms with AI website builders or integrated MCP support.

- [ZipWP](https://zipwp.com/) - AI website builder generating complete WordPress sites from a business description with included managed hosting.
- [10Web AI Builder](https://10web.io/wordpress-ai-builder/) - Build WordPress sites with an AI Co-Pilot on managed Google Cloud hosting.
- [Hostinger AI Website Builder](https://www.hostinger.com/ai-website-builder-for-wordpress) - AI-powered WordPress site builder with Kodee AI chatbot for instant support.
- [Elementor Hosting](https://elementor.com/hosting/) - Managed WordPress hosting with an AI assistant and Google Cloud infrastructure.
- [WordPress.com](https://developer.wordpress.com/docs/mcp/) - Built-in MCP server on all paid plans with per-tool toggle controls. Ships the official Claude Connector and WordPress AI Assistant.
- [Pressable](https://pressable.com/knowledgebase/get-started-with-wordpress-mcp-on-pressable/) - Pre-installs MCP Adapter on managed WordPress sites.
- [WP Engine](https://wpengine.com/support/ai-toolkit/) - AI Toolkit includes Smart Search AI MCP Server.
- [Kinsta](https://kinsta.com/blog/mcp-server-kinsta-api/) - Guide and tooling for building AI integrations against the Kinsta API via MCP.
- [Pantheon](https://pantheon.io/resources/content-publisher) - Content Publisher with MCP server and native WordPress plugin integration.
- [InstaWP](https://instawp.com) - Every InstaWP site includes a built-in WordPress MCP server.
- [WordPress VIP](https://wpvip.com) - Enterprise platform explicitly framed as AI/agent-ready through open APIs and MCP standards.

## Open Source Projects

Community-driven and open-source AI projects built on or for WordPress.

- [AI Engine](https://github.com/jordymeow/ai-engine) - Source code for the popular AI Engine plugin.
- [ai-services](https://github.com/felixarntz/ai-services) - Unified AI services layer for WordPress core and plugins.
- [GravityMCP](https://github.com/GravityKit/GravityMCP) - Open-source MCP server for Gravity Forms by GravityKit.
- [WP AI Assistant](https://github.com/federicopepedev/wp-ai-assistant) - Open-source GPT ChatBot WordPress plugin.
- [Innovator AI](https://github.com/wp-innovator/innovator-ai) - AI assistant for WordPress content writing using OpenAI and ChatGPT.
- [Human Made AI Plugin](https://github.com/humanmade/ai-plugin) - AI integration layer providing deep WordPress integration with ML capabilities.
- [Automattic AI Experiments](https://github.com/Automattic/ai-experiments) - Prototypes and proof-of-concept AI projects for WordPress and WooCommerce from Automattic.
- [wp-ai-content-kit](https://github.com/richtabor/wp-ai-content-kit) - Content operations toolkit for alt text, excerpts, and more using the WP AI Client.
- [ai-valve](https://github.com/soderlind/ai-valve) - Meters and gates AI Client prompt calls as middleware.
- [wp-ability-toolkit](https://github.com/emdashcodes/wp-ability-toolkit) - Toolkit for developing and testing abilities and AI integrations.
- [mcp-expose-abilities](https://github.com/bjornfix/mcp-expose-abilities) - Documents 61+ core abilities and 280+ ecosystem abilities across major plugins.
- [wordpress-wae](https://github.com/kradyy/wordpress-wae) - 84 abilities for comprehensive AI agent interaction with WordPress.
- [Grumpy AI Gate](https://wordpress.org/plugins/grumpy-ai-gate/) - Records and inspects AI Client requests for debugging and governance.

## Learning Resources

Courses, tutorials, and official documentation for building with WordPress AI.

- [Make WordPress – AI Initiative](https://make.wordpress.org/ai/) - Official WordPress contributor hub for AI features and RFC discussions.
- [WordPress Developer News – AI](https://developer.wordpress.org/news/) - Developer blog covering new AI APIs, SDK releases, and integration guides.
- [The WordPress Abilities API](https://jonathanbossenger.com/the-wordpress-abilities-api/) - Foundational explainer by Jonathan Bossenger.
- [WS Form MCP Server Tutorial](https://wsform.com/how-to-create-an-mcp-server-in-wordpress-with-the-abilities-api-and-mcp-adapter/) - Step-by-step guide to building an MCP server using the Abilities API and MCP Adapter.
- [Adding MCP to the WordPress Core Dev Environment](https://weston.ruter.net/2026/04/08/adding-an-mcp-server-to-the-wordpress-core-development-environment/) - By Weston Ruter.
- [Custom Abilities in WordPress 7.0](https://summix.io/blog/wordpress-abilities-api-custom-abilities-7-0/) - Guide by Summix.
- [Custom WooCommerce Abilities for MCP Adapter](https://wprobo.com/how-to-register-custom-woocommerce-abilities-for-the-wordpress-mcp-adapter/) - By WPRobo.
- [Fluent Forms: WordPress Abilities API for Automation](https://fluentforms.com/wordpress-abilities-api-for-automation/) - Plain-language guide.
- [WordCamp US 2025: Turn Your Local WordPress Install into Your AI Coding Assistant](https://us.wordcamp.org/2025/session/turn-your-local-wordpress-install-into-your-ai-coding-assistant/) - MCP + Abilities API workshop by Jonathan Bossenger.
- [Build and Sell AI Tools on WordPress](https://www.udemy.com/course/build-ai-tools-on-wordpress/) - Udemy course on creating and selling AI tools using WordPress.
- [Complete AI WordPress Creation Course](https://www.udemy.com/course/complete-ai-wordpress-creation-course/) - Fast-track course on building WordPress sites with AI on Udemy.
- [WordPress.com AI Learning Path](https://wordpress.com/learn/courses/unlocking-the-power-of-ai/) - Free self-guided courses on building WordPress sites with AI from WordPress.com.
- [ai-wordpress awesome list](https://github.com/wpdevup/ai-wordpress) - Complementary community-maintained list of AI in WordPress resources.

---

## Contributing

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request. Make sure the item you're adding is:

- Related to WordPress and AI
- Actively maintained
- Adds value not already covered by an existing entry

## Credits

- [James W. LePage](https://j.cv) — Head of AI at Automattic and WordPress Core AI co-lead. Many entries in this list were sourced from his comprehensive ecosystem overview: [AI Across The WP Ecosystem](https://j.cv/ai-across-the-wp-ecosystem/).

## License

[![CC0](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0)

To the extent possible under law, [Lax Mariappan](https://github.com/laxmariappan) has waived all copyright and related or neighboring rights to this work.

---

> **Note:** "WordPress" is a registered trademark of the WordPress Foundation. This project is not affiliated with or endorsed by the WordPress Foundation or Automattic.
