import type { UserConfig } from "vitepress";
import UnoCssPlugin from "unocss/vite";

const config: UserConfig["vite"] = {
  plugins: [UnoCssPlugin()],
  server: {
    host: true,
  },
};

export default config;
