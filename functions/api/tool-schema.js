// Cloudflare Pages Function: /api/tool-schema
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

export async function onRequestGet() {
  return Response.json(OMNIAGENT_TOOL_SCHEMA, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}
