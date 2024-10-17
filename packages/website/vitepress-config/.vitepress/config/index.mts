import { defineConfig } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";
import vite from "./vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WebGPU-Engine",
  srcDir: "src",
  description: "An application engine based on webgpu",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/itancc/webgpu-journey" },
    ],
  },
  vite,
});
