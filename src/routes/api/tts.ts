import { createFileRoute } from "@tanstack/react-router";

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George — warm, friendly male

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["ELEVENLABS_API_KEY"];
        if (!key) return new Response("ElevenLabs not connected", { status: 500 });
        let text = "";
        try {
          const body = (await request.json()) as { text?: unknown };
          text = typeof body.text === "string" ? body.text.trim() : "";
        } catch {
          /* ignore */
        }
        if (!text || text.length > 2000) return new Response("Invalid text", { status: 400 });

        const res = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: { "xi-api-key": key, "Content-Type": "application/json" },
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true },
            }),
          },
        );
        if (!res.ok) {
          const err = await res.text();
          console.error(`ElevenLabs TTS failed [${res.status}]: ${err}`);
          return new Response(err, { status: res.status });
        }
        return new Response(res.body, {
          headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
