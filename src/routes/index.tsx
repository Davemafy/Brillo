import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Keep your course notes and progress organized in one place with Brillo. Log what you learn, build daily momentum, and stay consistent even when life gets busy.",
      },
    ],
  }),
});
