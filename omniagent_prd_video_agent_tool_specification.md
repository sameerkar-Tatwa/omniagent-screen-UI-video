# OMNIAGENT (Version 2) — Product Requirements Document (PRD) & Video Agent Tool Specification

---

## 1. Executive Summary & Repository Isolation

- **Project Name**: `OMNIAGENT` (Dedicated Version 2 Architecture)
- **Target Repository**: Independent new GitHub repository (`omniagent-v2-showcase`), completely decoupled from the legacy Case3 repository.
- **Core Architecture**:
  - **Left Panel (56% Viewport)**: Video Agent Viewport containing `#omniagent-video-element`, `<audio>`, persona badge, mic mute controls, session status indicators, and an un-bound high-tech standby slot ready for the new Video Agent stream and SDK integration.
  - **Right Panel (44% Viewport)**: Squeezed, zero-scroll 13-screen interactive visualizer palette. Displays both the **9 official Tatwa 2.0 presentation screens** and the **4 new interactive product lifecycle GIF screens** (`Deploy`, `Adapt`, `Scale`, `Govern`).
  - **Top Global Cockpit**: Tatwa & OmniAgent brand lockups, live latency indicators, tool simulator dispatcher, and token endpoint settings.
  - **Sliding Transcript Drawer**: Can slide over the right panel when "Open Transcript" is clicked, providing live conversation logs, user chat input, and telemetry notifications.

---

## 2. Screen Visualizer Inventory (13 Viewport Screens in Right Panel)

All 13 screens are implemented as responsive, non-scrolling viewport slides in the right-hand panel:

| Slide # | `screen_id` Enum | Asset / Reference | Visual Components Implemented in Right Panel |
| :--- | :--- | :--- | :--- |
| **01** | `hero_overview` | `AI First Omni Agent-01.png` | 10-petal OmniAgent logo lockup, *"Build Enterprise Grade AI Voice Agents for every customer conversation"*, 3 value chips, multi-layered blue/white sine-wave ribbon, `TATWA \| 2.0` badge. |
| **02** | `omnichannel_matrix` | `AI First Omni Agent-02.png` | *"AI-First OmniAgents across Channels"*, royal-blue accent bars, 2-column hand-drawn arrow list (`Emails`, `Voice Calls`, `Web Chat`, `Video Calls`, `Messaging Apps`). |
| **03** | `hitech_symphony` | `AI First Omni Agent-03.png` | *"HiTech Symphony for OmniAgents"*, 4-column architecture (`Speech to Text`, `NLU + LLM`, `Text to Speech`, `Integrations`), animated blue realtime waveform equalizer, `< 450ms` latency tag. |
| **04** | `core_ten_features` | `AI First Omni Agent-06.png` | *"OmniAgent : Features"*, numbered 1–10 capability grid (100% transcripts, call audits, 70+ languages, modulation, SAP/CRM), 23+ years operational footnote. |
| **05** | `features_coaching_sounds` | `AI First Omni Agent-10.png` | Lavender-framed `New Coaching Scenario` card + `Background Sounds` configuration card (`Office / Cafe / Typing / Call Center`). |
| **06** | `features_widget_evaluation` | `AI First Omni Agent-11.png` | Lavender-framed `Customizable Support Widget` card with purple mic icon + `Evaluation Results` grading table (9.1/10). |
| **07** | `features_analytics_qa` | `AI First Omni Agent-12.png` | `Call Connectivity by Agent` 12-bar chart (98.4%) + `AI Analyst & QA` 86% green donut chart and metric grid. |
| **08** | `global_presence` | `AI First Omni Agent-13.png` | Global hubs (`USA`, `Africa`, `Dubai`, `Singapore`, `India`) + 5 Indian Delivery Centers (`Bhubaneswar HQ`, `Noida`, `Kolkata`, `Hyderabad`, `Mumbai`). |
| **09** | `transform_cta` | `AI First Omni Agent-14.png` | *"AIforms Your Business Today"*, Predictive & Generative AI tagline, and 3 enterprise pillars (`24h PoC`, `72h Telephony`, `AI With Us`). |
| **10** | `lifecycle_deploy` | `GIFs/Deloy.gif` | **01 Deploy AI OmniAgents**: Pill switcher (`[Deploy]` active), drag-and-drop builder description, live product GIF animation, and `⛶ Full GIF` toggle. |
| **11** | `lifecycle_adapt` | `GIFs/Adapt.gif` | **02 Adapt to your business**: Pill switcher (`[Adapt]` active), custom behavior adjustment text, live configuration GIF animation. |
| **12** | `lifecycle_scale` | `GIFs/Scale.gif` | **03 Scale with Confidence**: Pill switcher (`[Scale]` active), high concurrency text (hundreds to millions of conversations), live scaling GIF animation. |
| **13** | `lifecycle_govern` | `GIFs/Govern.gif` | **04 Govern**: Pill switcher (`[Govern]` active), compliance & access control text, live governance GIF animation. |

---

## 3. Video Agent Client Tool Definition (`show_omniagent_screen`)

When configuring your Video Agent, register the following **Client Tool** so the agent can dynamically switch the visualizer to any of the 13 screens during conversation:

### 3.1 Tool JSON Schema

```json
{
  "type": "function",
  "function": {
    "name": "show_omniagent_screen",
    "description": "Switches the right-hand OmniAgent interactive visual showcase to display the slide matching the current topic of conversation.",
    "parameters": {
      "type": "object",
      "properties": {
        "screen_id": {
          "type": "string",
          "enum": [
            "hero_overview",
            "omnichannel_matrix",
            "hitech_symphony",
            "core_ten_features",
            "features_coaching_sounds",
            "features_widget_evaluation",
            "features_analytics_qa",
            "global_presence",
            "transform_cta",
            "lifecycle_deploy",
            "lifecycle_adapt",
            "lifecycle_scale",
            "lifecycle_govern"
          ],
          "description": "The unique identifier of the OmniAgent slide to display on the user's screen."
        },
        "reason": {
          "type": "string",
          "description": "Brief context on why this screen is being shown."
        }
      },
      "required": ["screen_id"]
    }
  }
}
```

### 3.2 JavaScript Hooks in `OMNIAGENT.html`

`OMNIAGENT.html` exposes three distinct ways for your Video Agent SDK to trigger screen changes:

1. **Direct Global Method Call**:
   ```javascript
   window.handleOmniAgentToolCall("lifecycle_deploy", "video_agent_sdk");
   // Or by slide index (0 to 12):
   window.goToSlide(9);
   ```

2. **Custom DOM Event Dispatch**:
   ```javascript
   window.dispatchEvent(new CustomEvent("omniagent:tool_call", {
     detail: { screen_id: "lifecycle_govern" }
   }));
   ```

3. **Window `postMessage` Bridge**:
   ```javascript
   window.postMessage({
     type: "show_omniagent_screen",
     screen_id: "lifecycle_scale"
   }, "*");
   ```

---

## 4. Video Agent System Prompt Template

Use this system prompt when configuring the OmniAgent persona:

```markdown
You are the official AI Solutions Architect presenting OmniAgent by Tatwa Technologies (TATWA 2.0).
You are situated on the left half of the user's screen, and you have access to a visual showcase tool on the right half called `show_omniagent_screen`.

Whenever you introduce a topic, answer a customer question, or demonstrate capabilities, ALWAYS call `show_omniagent_screen` with the matching `screen_id`:

- Welcome / Overview of OmniAgent -> `hero_overview`
- Communication Channels (Email, Web Chat, Messaging Apps, Voice Calls, Video Calls) -> `omnichannel_matrix`
- Technical Architecture (Indian-language Speech to Text, NLU + LLM, Text to Speech, 100+ Integrations) -> `hitech_symphony`
- Core 10 Features (100% Call Transcripts, Call Audits, 70+ languages, CRM & SAP, IVRS) -> `core_ten_features`
- Behavioral Coaching or Ambient Background Sounds (Office, Cafe, Typing, Call Center) -> `features_coaching_sounds`
- Website Support Widget or Agent Evaluation Framework -> `features_widget_evaluation`
- Analytics Dashboards, Call Connectivity, or AI Analyst QA (86% success rate, 96.8% compliance) -> `features_analytics_qa`
- Global & India Office Locations (USA, Dubai, Africa, Singapore, Noida, Kolkata, Bhubaneswar, Hyderabad, Mumbai) -> `global_presence`
- Deployment Timeline (24h POC, 72h production), Pricing, or Booking an Enterprise Demo -> `transform_cta`
- Drag-and-drop Visual Agent Builder / Workflow Creation -> `lifecycle_deploy`
- Adapting and Customizing Agent Behavior to Business Needs -> `lifecycle_adapt`
- Scaling Concurrency to Millions of Simultaneous Conversations -> `lifecycle_scale`
- Security, Governance, Access Control, and Compliance Audits -> `lifecycle_govern`
```

---

## 5. Dedicated Repository File Structure (`OmniAgentt`)

The entire directory is ready to be initialized as its own independent git repository:

```text
OmniAgentt/
├── OMNIAGENT.html                  # Standalone Version 2 application (Left Video Agent + Right 13-Screen Visualizer)
├── index.html                      # Root entry point (mirrors OMNIAGENT.html)
├── omniagent_version_2_visualizer.html # Version 2 visualizer copy
├── omniagent_prd_video_agent_tool_specification.md # This PRD & Tool Specification
├── README.md                       # Repository instructions
├── GIFs/                           # 4 Product Lifecycle GIFs
│   ├── Deloy.gif
│   ├── Adapt.gif
│   ├── Scale.gif
│   └── Govern.gif
└── backend/
    ├── worker.js                   # Cloudflare Worker token endpoint for Video Agent SDK
    └── wrangler.toml               # Cloudflare configuration
```
