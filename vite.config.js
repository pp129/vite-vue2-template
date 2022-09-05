import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html' // https://github.com/vbenjs/vite-plugin-html

const getConfig = (mode, key) => {
  return loadEnv(mode, process.cwd())[key]
}

export default defineConfig(({ command, mode }) => {
  // console.log(mode)
  return {
    server: {
      host: 'localhost',
      port: 8080,
      open: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    plugins: [
      createVuePlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            title: getConfig(mode, 'VITE_APP_TITLE'),
            injectScript:
                mode === 'development'
                  ? '<link rel="icon" type="image/svg+xml" href="/vite.svg">'
                  : '<link rel="icon" type="image/png" href="/javascript.svg" sizes="32x32">'
          }
        }
      })
    ],
    esbuild: {
      drop: ['console', 'debugger']
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: [resolve(__dirname, 'index.html')]
      }
    }
  }
})
