import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import VitePluginZipOutput from 'vite-plugin-zip-output'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/variables.scss";',
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      VueSetupExtend(),
      VitePluginZipOutput(),
    ],
    build: {
      rollupOptions: {
        output: {},
      },
    },
  }
})
