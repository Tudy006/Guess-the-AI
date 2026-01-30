import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- Import this

export default defineConfig({
  base: "/Guess-the-AI/", // Replace with your exact repo name
  plugins: [
    react(),
    tailwindcss(), // <-- Add this
  ],
});
