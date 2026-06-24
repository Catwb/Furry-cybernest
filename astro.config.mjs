import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import icon from "astro-icon";
import { virtualConfigPlugin } from "./plugins/virtual-config";
import { remarkStellarInline } from "./src/remark-plugins/inline";
import { remarkStellarContainers } from "./src/remark-plugins/containers";
import { remarkStellarLeaf } from "./src/remark-plugins/leaf";

export default defineConfig({
  site: "https://example.com",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss(), virtualConfigPlugin()],
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkStellarInline, remarkStellarContainers, remarkStellarLeaf],
    smartypants: false,
  },
});
