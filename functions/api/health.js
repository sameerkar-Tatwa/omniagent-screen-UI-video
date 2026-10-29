// Cloudflare Pages Function: /api/health
export async function onRequestGet(context) {
  const { env } = context;
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  const hasKey = Boolean(env.ANAM_API_KEY || env.VIDEO_AGENT_API_KEY);
  const hasPersona = Boolean(env.ANAM_PERSONA_ID || env.VIDEO_AGENT_PERSONA_ID);

  return Response.json(
    {
      status: "healthy",
      service: "omniagent-screen-ui-video",
      apiKeyConfigured: hasKey,
      personaConfigured: hasPersona,
      platform: "cloudflare-pages"
    },
    { headers: corsHeaders }
  );
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  });
}
