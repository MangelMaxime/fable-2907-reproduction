import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const isGitpod = process.env.GITPOD_WORKSPACE_ID != null

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer()
    ],
    build: {
        outDir: "vite-dist"
    },
    server: {
        watch: {
            ignored: [
                "**/*.fs"
            ]
        },
        hmr: {
            clientPort: isGitpod ? 443 : undefined,
        }
    }
})
