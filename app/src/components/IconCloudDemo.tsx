import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "python",
  "react",
  "nextdotjs",
  "vite",
  "tailwindcss",
  "html5",
  "css3",
  "nodedotjs",
  "webflow",
  "figma",
  "n8n",
  "google",
  "discord",
  "git",
  "github",
  "docker",
  "jira",
  "confluence",
  "notion",
  "postman",
  "visualstudiocode",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
