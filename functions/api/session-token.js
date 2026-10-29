// Cloudflare Pages Function: /api/session-token
export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const apiKey = env.ANAM_API_KEY || env.VIDEO_AGENT_API_KEY;
    const defaultPersonaId = env.ANAM_PERSONA_ID || env.VIDEO_AGENT_PERSONA_ID;

    if (!apiKey) {
      return Response.json(
        {
          error: "Missing Anam API Key",
          message: "Please configure ANAM_API_KEY or VIDEO_AGENT_API_KEY in Cloudflare environment variables."
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
        { error: `Anam API error: HTTP ${agentRes.status}`, details: errText },
        { status: agentRes.status, headers: corsHeaders }
      );
    }

    const data = await agentRes.json();
    return Response.json(data, { headers: corsHeaders });
  } catch (err) {
    return Response.json(
      { error: "Internal session token error", message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  });
}
