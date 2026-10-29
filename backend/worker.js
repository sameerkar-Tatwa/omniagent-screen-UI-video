// Cloudflare Worker: worker.js for OMNIAGENT (Version 2)
// Secure Anam AI Video Agent Token Minter, Tool Registration & Static Showcase Host

const OMNIAGENT_TOOL_SCHEMA = {
  name: "show_omniagent_screen",
  description: "Switches the right-hand OmniAgent interactive visual showcase to display the slide or product lifecycle demonstration matching the current topic of conversation.",
  type: "CLIENT",
  config: {
    parameters: {
      type: "object",
      properties: {
        screen_id: {
          type: "string",
          enum: [
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
          description: "The unique identifier of the OmniAgent slide or lifecycle animation to display on the user's screen."
        },
        reason: {
          type: "string",
          description: "Brief context on why this visual is being shown to the user."
        }
      },
      required: ["screen_id"]
    }
  }
};

const OMNI_SCREENS_METADATA = [
  { index: 0, id: "hero_overview", label: "01 Hero", title: "OmniAgent Architecture & Mission", trigger: "Greetings, introduction, welcome, company overview" },
  { index: 1, id: "omnichannel_matrix", label: "02 Channels", title: "AI-First Channels (Voice, Email, Chat)", trigger: "Voice, Email, Chat, WhatsApp, Video communications" },
  { index: 2, id: "hitech_symphony", label: "03 Symphony", title: "HiTech Symphony (<450ms Latency)", trigger: "STT, NLU+LLM, Neural TTS, Indian languages, <450ms latency" },
  { index: 3, id: "core_ten_features", label: "04 Features", title: "10 Enterprise Core Features", trigger: "100% call transcripts, call audits, 70+ languages, CRM & SAP, IVRS handoff" },
  { index: 4, id: "features_coaching_sounds", label: "05 Coaching", title: "Coaching & Ambient Sounds", trigger: "Behavioral coaching, de-escalation, office/cafe/typing sound" },
  { index: 5, id: "features_widget_evaluation", label: "06 Widget", title: "Widget & QA Evaluation", trigger: "Support widget embed, QA evaluation grading (9.1/10)" },
  { index: 6, id: "features_analytics_qa", label: "07 Analytics", title: "Analytics & Call Connectivity", trigger: "Real-time analytics, call connectivity (98.4%), QA donut (86%)" },
  { index: 7, id: "global_presence", label: "08 Presence", title: "Global & India Presence", trigger: "Delivery centers (Bhubaneswar, Noida, Kolkata, Hyd, Mumbai), global hubs" },
  { index: 8, id: "transform_cta", label: "09 Roadmap", title: "24h–72h Enterprise Roadmap", trigger: "Quick Start 24h PoC, 72h enterprise launch, pricing, demo" },
  { index: 9, id: "lifecycle_deploy", label: "10 Deploy", title: "01 Deploy AI OmniAgents (GIF)", trigger: "Drag-and-drop agent builder, workflow creation" },
  { index: 10, id: "lifecycle_adapt", label: "11 Adapt", title: "02 Adapt to your business (GIF)", trigger: "Adapting behavior to industry workflows, custom prompt rules" },
  { index: 11, id: "lifecycle_scale", label: "12 Scale", title: "03 Scale with Confidence (GIF)", trigger: "High concurrency, scaling from hundreds to millions of calls" },
  { index: 12, id: "lifecycle_govern", label: "13 Govern", title: "04 Govern AI Deployments (GIF)", trigger: "Enterprise security, RBAC access control, data encryption, compliance" }
];

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // =========================================================================
    // 1. ENDPOINT: GET /api/tool-schema (Return Anam Tool Definition)
    // =========================================================================
    if (url.pathname === "/api/tool-schema" && request.method === "GET") {
      return Response.json(OMNIAGENT_TOOL_SCHEMA, { headers: corsHeaders });
    }

    // =========================================================================
    // 2. ENDPOINT: GET /api/screens (Return 13 Screen Registry)
    // =========================================================================
    if (url.pathname === "/api/screens" && request.method === "GET") {
      return Response.json({ total: OMNI_SCREENS_METADATA.length, screens: OMNI_SCREENS_METADATA }, { headers: corsHeaders });
    }

    // =========================================================================
    // 3. ENDPOINT: POST /api/session-token (Video Agent Session Token Minter)
    // =========================================================================
    if (url.pathname === "/api/session-token" && request.method === "POST") {
      try {
        const apiKey = env.ANAM_API_KEY || env.VIDEO_AGENT_API_KEY;
        const defaultPersonaId = env.ANAM_PERSONA_ID || env.VIDEO_AGENT_PERSONA_ID;

        if (!apiKey) {
          return Response.json(
            {
              error: "Missing Anam API Key",
              message: "Please configure ANAM_API_KEY or VIDEO_AGENT_API_KEY in Cloudflare Worker environment variables / wrangler.toml."
            },
            { status: 500, headers: corsHeaders }
          );
        }

        const body = await request.json().catch(() => ({}));
        const personaId = body.personaId || defaultPersonaId;

        const personaConfig = {
          ...(personaId ? { personaId } : {}),
          ...(body.systemPrompt ? { systemPrompt: body.systemPrompt } : {}),
          ...(body.tools ? { tools: body.tools } : {})
        };

        const agentRes = await fetch("https://api.anam.ai/v1/auth/session-token", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ personaConfig }),
        });

        if (!agentRes.ok) {
          const errText = await agentRes.text();
          return Response.json(
            {
              error: `Anam API error: HTTP ${agentRes.status}`,
              status: agentRes.status,
              details: errText
            },
            { status: agentRes.status, headers: corsHeaders }
          );
        }

        const data = await agentRes.json();
        return Response.json(data, { headers: corsHeaders });
      } catch (err) {
        return Response.json(
          { error: "Internal session token worker error", message: err.message },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // =========================================================================
    // 4. ENDPOINT: POST /api/create-anam-tool (Automated Tool Registration Helper)
    // =========================================================================
    if (url.pathname === "/api/create-anam-tool" && request.method === "POST") {
      try {
        const apiKey = env.ANAM_API_KEY || env.VIDEO_AGENT_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "ANAM_API_KEY is not configured in worker environment" },
            { status: 500, headers: corsHeaders }
          );
        }

        // Call Anam API to register the client tool directly
        const res = await fetch("https://api.anam.ai/v1/tools", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(OMNIAGENT_TOOL_SCHEMA),
        });

        const data = await res.json();
        if (!res.ok) {
          return Response.json(
            { error: "Failed to create tool in Anam account", details: data },
            { status: res.status, headers: corsHeaders }
          );
        }

        return Response.json(
          {
            success: true,
            message: "Successfully created 'show_omniagent_screen' tool in your Anam account!",
            tool: data
          },
          { headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { error: "Internal tool creation error", message: err.message },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // =========================================================================
    // 5. ENDPOINT: GET /api/health
    // =========================================================================
    if (url.pathname === "/api/health") {
      const hasKey = Boolean(env.ANAM_API_KEY || env.VIDEO_AGENT_API_KEY);
      const hasPersona = Boolean(env.ANAM_PERSONA_ID || env.VIDEO_AGENT_PERSONA_ID);
      return Response.json(
        {
          status: "healthy",
          service: "omniagent-v2-worker",
          apiKeyConfigured: hasKey,
          personaConfigured: hasPersona,
          endpoints: [
            "POST /api/session-token",
            "GET  /api/tool-schema",
            "POST /api/create-anam-tool",
            "GET  /api/screens",
            "GET  /api/health"
          ]
        },
        { headers: corsHeaders }
      );
    }

    // =========================================================================
    // 6. STATIC FILE SERVING FALLBACK (FOR ROOT SHOWCASE)
    // =========================================================================
    if (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "/omniagent" || url.pathname === "/OMNIAGENT.html") {
      if (env.ASSETS) {
        const assetUrl = new URL("/index.html", request.url);
        return env.ASSETS.fetch(new Request(assetUrl, request));
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};
