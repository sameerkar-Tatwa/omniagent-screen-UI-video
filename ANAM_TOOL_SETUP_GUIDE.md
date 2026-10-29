# Anam AI Client Tool Setup & Integration Guide: `show_omniagent_screen`

This guide explains **how to create, register, and configure the client tool** for the Anam AI Video Agent so that the agent dynamically controls the 13 interactive showcase screens on the right-hand panel of **OmniAgent (v2)**.

---

## 1. How the Tool Calling Flow Works

```
                                      +------------------------------------+
                                      |   Customer / User in Browser       |
                                      +-----------------+------------------+
                                                        | Speaks or chats
                                                        v
                                      +------------------------------------+
                                      |  Anam AI Video Agent (Left Panel)  |
                                      +-----------------+------------------+
                                                        |
                                                        | 1. LLM decides visual topic
                                                        | 2. Calls client tool:
                                                        |    show_omniagent_screen(screen_id)
                                                        v
                                      +------------------------------------+
                                      |   Browser / OMNIAGENT.html         |
                                      |   Listens for Anam tool call event |
                                      +-----------------+------------------+
                                                        |
                                                        | Shifts right panel to slide (0ms)
                                                        v
                                      +------------------------------------+
                                      |  Visualizer Slide (Right Panel)    |
                                      |  Matching Slide / GIF Activated    |
                                      +------------------------------------+
```

1. **User asks a question** (e.g. *"What channels do you support?"* or *"Can you adapt to my healthcare business?"*).
2. **Anam's LLM** consults its system prompt and calls the client tool:
   ```json
   {
     "name": "show_omniagent_screen",
     "arguments": {
       "screen_id": "omnichannel_matrix",
       "reason": "Explaining multi-channel availability across voice, email, chat and video"
     }
   }
   ```
3. **Anam Web Component / SDK** dispatches a `tool-call` event to the DOM.
4. **`OMNIAGENT.html`** catches the event, translates `screen_id` to the slide index (0 to 12), and executes `window.goToSlide(index)` seamlessly without page reloads.

---

## 2. Exact Tool JSON Schema

The tool definition is stored in [`anam_tool_show_omniagent_screen.json`](file:///d:/Tatwa%20projects/Case3%20website/OmniAgentt/anam_tool_show_omniagent_screen.json):

```json
{
  "name": "show_omniagent_screen",
  "description": "Switches the right-hand OmniAgent interactive visual showcase to display the slide or product lifecycle demonstration matching the current topic of conversation.",
  "type": "CLIENT",
  "config": {
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
          "description": "The unique identifier of the OmniAgent slide or lifecycle animation to display on the user's screen."
        },
        "reason": {
          "type": "string",
          "description": "Brief context on why this visual is being shown to the user."
        }
      },
      "required": ["screen_id"]
    }
  }
}
```

---

## 3. How to Create the Tool in Anam (Choose Any Method)

### Method A: Via Anam Lab UI Dashboard (`https://lab.anam.ai`)

1. Open [https://lab.anam.ai](https://lab.anam.ai) and sign in.
2. In the left navigation, click **Tools** (or go to **Personas** -> select your **OmniAgent** persona -> **Tools** tab).
3. Click **+ Create Tool** (or **Add Custom Tool**).
4. Configure the tool settings:
   - **Type**: Select **`Client Tool`** (or `CLIENT`).
   - **Tool Name**: `show_omniagent_screen`
   - **Description**:
     ```text
     Switches the right-hand OmniAgent interactive visual showcase to display the slide or product lifecycle demonstration matching the current topic of conversation.
     ```
   - **Parameters Schema**: Paste the parameters JSON:
     ```json
     {
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
           "description": "The unique identifier of the OmniAgent slide or lifecycle animation to display on the user's screen."
         },
         "reason": {
           "type": "string",
           "description": "Brief context on why this visual is being shown to the user."
         }
       },
       "required": ["screen_id"]
     }
     ```
   - **Disable Interruptions**: Set to `False` (or unchecked).
5. Click **Save Tool**.
6. Ensure the tool is linked/enabled on your OmniAgent Persona.

---

### Method B: Automated 1-Click via Backend Worker

The backend worker in `OmniAgentt/backend/worker.js` includes a helper endpoint that automatically registers the tool in your Anam account:

1. Add your `ANAM_API_KEY` to `backend/wrangler.toml` (or pass it in the header).
2. Send a `POST` request to `/api/create-anam-tool`:
   ```bash
   curl -X POST http://localhost:8787/api/create-anam-tool
   ```
   **Response:**
   ```json
   {
     "success": true,
     "message": "Successfully created 'show_omniagent_screen' tool in your Anam account!",
     "tool": {
       "id": "tool_01XXXXXXXXXXXXX",
       "name": "show_omniagent_screen",
       "type": "CLIENT"
     }
   }
   ```

---

### Method C: Via Direct Anam REST API (`cURL`)

Run this single command from your terminal (replace `YOUR_ANAM_API_KEY` with your actual key):

```bash
curl -X POST "https://api.anam.ai/v1/tools" \
  -H "Authorization: Bearer YOUR_ANAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "show_omniagent_screen",
    "description": "Switches the right-hand OmniAgent interactive visual showcase to display the slide or product lifecycle demonstration matching the current topic of conversation.",
    "type": "CLIENT",
    "config": {
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
            "description": "The unique identifier of the OmniAgent slide or lifecycle animation to display on the user'\''s screen."
          },
          "reason": {
            "type": "string",
            "description": "Brief context on why this visual is being shown to the user."
          }
        },
        "required": ["screen_id"]
      }
    }
  }'
```

To attach the created tool to your Persona via API:
```bash
curl -X PATCH "https://api.anam.ai/v1/personas/YOUR_PERSONA_ID" \
  -H "Authorization: Bearer YOUR_ANAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tools": ["CREATED_TOOL_ID"]
  }'
```

---

## 4. What Screen to Show When: 13-Screen Decision Matrix

| Slide # | `screen_id` | Visual Name & Type | When OmniAgent Must Invoke This Tool |
| :---: | :--- | :--- | :--- |
| **01** | `hero_overview` | Hero Architecture (Slide) | Opening greeting, introducing OmniAgent, welcoming user to the event. |
| **02** | `omnichannel_matrix` | Omnichannel Matrix (Slide) | Explaining channels: Voice, Email, Web Chat, Video Calls, Messaging Apps. |
| **03** | `hitech_symphony` | HiTech Symphony (Slide) | Explaining technical architecture: STT, NLU+LLM, Neural TTS, Indian languages, <450ms latency. |
| **04** | `core_ten_features` | Core Features (Slide) | Explaining 10 core features: 100% transcripts, 5% audits, CRM & SAP integrations, IVRS handoff. |
| **05** | `features_coaching_sounds` | Coaching & Sounds (Slide) | Explaining behavioral coaching, customer de-escalation, or background ambient sounds (typing, office, cafe). |
| **06** | `features_widget_evaluation` | Support Widget (Slide) | Demonstrating embeddable website support widget, or explaining agent evaluation scoring (9.1/10). |
| **07** | `features_analytics_qa` | Analytics & QA (Slide) | Discussing call connectivity analytics (98.4%), AI Analyst QA donut (86%), drop rate (2.4%), compliance (96.8%). |
| **08** | `global_presence` | Global Presence (Slide) | When asked where Tatwa is based, delivery centers (Bhubaneswar, Noida, Kolkata, Hyd, Mumbai), or global hubs. |
| **09** | `transform_cta` | 24h–72h Roadmap (Slide) | Discussing pricing (₹8 voice, ₹10 text, ₹16 video), 24h PoC, 72h deployment, or booking a demo. |
| **10** | `lifecycle_deploy` | 01 Deploy (GIF) | Demonstrating or explaining the drag-and-drop agent builder and visual workflow creation. |
| **11** | `lifecycle_adapt` | 02 Adapt (GIF) | Adapting agent behavior to business needs, custom rules, and Step 5 dynamic industry pitches (Real Estate, Healthcare, Banking, etc.). |
| **12** | `lifecycle_scale` | 03 Scale (GIF) | Handling high concurrency, scaling from hundreds to millions of calls with zero wait queue. |
| **13** | `lifecycle_govern` | 04 Govern (GIF) | Discussing enterprise security, data encryption, RBAC access control, audit logs, and compliance. |

---

## 5. Testing the Tool Locally Without External Dependencies

The application includes multiple ways to test the tool triggers immediately:

1. **Using the Simulator in Side Menu (`☰ Menu`)**:
   - Click the **☰ Menu** button in the top right.
   - Under **Client Tool Simulator**, pick any screen from the dropdown (e.g. `10 Deploy — lifecycle_deploy`).
   - Click **Trigger Tool Call**.
   - The right visualizer switches instantly and logs the payload.

2. **Using Browser Console**:
   ```javascript
   // Method A: Direct global call
   window.handleOmniAgentToolCall("lifecycle_scale");

   // Method B: Custom DOM Event
   window.dispatchEvent(new CustomEvent("omniagent:tool_call", {
     detail: { screen_id: "core_ten_features" }
   }));

   // Method C: Window postMessage
   window.postMessage({ type: "show_omniagent_screen", screen_id: "hitech_symphony" }, "*");
   ```

3. **Using the Keyboard Shortcuts**:
   - Press keys `1` through `9` on your keyboard to instantly jump to slides 1 to 9.
   - Use `Left Arrow` / `Right Arrow` to advance back and forth.

