# OmniAgent (Version 2) — AI-First Interactive Showcase

Autonomous AI Video & Omni-Channel Showcase for **Tatwa Technologies (TATWA 2.0)**.

This repository implements the **Version 2 Architecture**:
- **Left Panel (54%)**: Clean Anam Video Agent viewport (`<anam-agent id="omniagent-agent">`, video element, and high-tech standby slot).
- **Right Panel (46%)**: Zero-scroll, vertical-space-optimized visualizer containing all **13 Tatwa OmniAgent presentation & product workflow screens**, dynamically driven by the agent's client tool calls (`show_omniagent_screen`).
- **Clean Header & Side Drawer (`☰ Menu`)**: Distraction-free presentation bar with slide counter, navigation arrows, audio status badge, and an slide-over drawer housing developer tools, token settings, and the client tool simulator.

---

## Key Files & Resources

- **Main Application**: [`OMNIAGENT.html`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/OMNIAGENT.html) (mirrored in [`index.html`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/index.html) and [`omniagent_version_2_visualizer.html`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/omniagent_version_2_visualizer.html))
- **Anam Agent Persona System Prompt**: [`Agent-prompt-omniagent.md`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/Agent-prompt-omniagent.md) (complete with Hinglish/Devanagari blended script, 13-screen decision matrix, and synchronized tool triggers across all call flow steps and FAQs)
- **Tool Setup Guide**: [`ANAM_TOOL_SETUP_GUIDE.md`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/ANAM_TOOL_SETUP_GUIDE.md) (step-by-step instructions for Anam Lab UI, 1-click worker API, and cURL)
- **Tool JSON Definition**: [`anam_tool_show_omniagent_screen.json`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/anam_tool_show_omniagent_screen.json) (ready to import or copy into Anam Lab)
- **Backend Worker**: [`backend/worker.js`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/backend/worker.js) & [`backend/wrangler.toml`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/backend/wrangler.toml)

---

## 13 Screen Registry in Right Panel

| # | `screen_id` | Title & Category | Trigger Topic |
| :-: | :--- | :--- | :--- |
| **01** | `hero_overview` | Hero Architecture & Mission | Greetings, welcome, company intro |
| **02** | `omnichannel_matrix` | Channels (Voice, Email, Chat, Video) | Omni-channel capabilities |
| **03** | `hitech_symphony` | HiTech Symphony (<450ms Latency) | STT, NLU+LLM, Neural TTS, Indian languages |
| **04** | `core_ten_features` | 10 Core Enterprise Features | 100% transcripts, audits, CRM/SAP integration |
| **05** | `features_coaching_sounds` | Coaching & Ambient Sounds | Behavioral coaching, typing/cafe/office sound |
| **06** | `features_widget_evaluation` | Support Widget & Evaluation | Website widget embed, QA evaluation (9.1/10) |
| **07** | `features_analytics_qa` | Analytics & Call Connectivity | Call connectivity (98.4%), QA donut (86%) |
| **08** | `global_presence` | Global & India Presence | Bhubaneswar HQ, Noida, Kolkata, Hyd, Mumbai |
| **09** | `transform_cta` | 24h–72h Enterprise Roadmap | Pricing (₹8 voice, ₹10 text), 24h PoC, demo |
| **10** | `lifecycle_deploy` | 01 Deploy AI OmniAgents (GIF) | Visual drag-and-drop agent builder |
| **11** | `lifecycle_adapt` | 02 Adapt to your business (GIF) | Customizing behavior for specific industries |
| **12** | `lifecycle_scale` | 03 Scale with Confidence (GIF) | Concurrency, millions of simultaneous calls |
| **13** | `lifecycle_govern` | 04 Govern AI Deployments (GIF) | Enterprise security, data privacy, RBAC, audits |

---

## Backend Endpoints (`backend/worker.js`)

- `POST /api/session-token`: Mints authenticated session tokens for the Anam SDK / `<anam-agent>` web component.
- `GET  /api/tool-schema`: Returns the exact JSON schema definition for `show_omniagent_screen`.
- `POST /api/create-anam-tool`: 1-Click automated registration of `show_omniagent_screen` in your Anam account via the Anam REST API.
- `GET  /api/screens`: Returns the complete metadata for all 13 screens.
- `GET  /api/health`: Health check and status of configured keys.
