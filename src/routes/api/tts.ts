import { createFileRoute } from "@tanstack/react-router";
import { CHARACTERS } from "@/lib/characters";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["ELEVENLABS_API_KEY"];
        if (!key) return new Response("ElevenLabs not connected", { status: 500 });
        let text = "";
        let characterId = "carlos";
        let expressive = false;
        try {
          const body = (await request.json()) as { text?: unknown; character?: unknown; expressive?: unknown };
          text = typeof body.text === "string" ? body.text.trim() : "";
          if (typeof body.character === "string") characterId = body.character;
          expressive = body.expressive === true;
        } catch {
          /* ignore */
        }
        const character = CHARACTERS.find((c) => c.id === characterId);
        if (!character) return new Response("Unknown character", { status: 400 });
        if (!text || text.length > 2000) return new Response("Invalid text", { status: 400 });

        const res = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${character.voiceId}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: { "xi-api-key": key, "Content-Type": "application/json" },
            body: JSON.stringify(
              expressive
                ? { text, model_id: "eleven_v3", voice_settings: { stability: 0.0 } }
                : {
                    text,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true },
                  },
            ),
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
