import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";

export default defineConfig({
  integrations: [react(), tailwind(), icon(), db()],
  output: "server",
  adapter: netlify(),
});
