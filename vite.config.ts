import { fileURLToPath } from 'url';
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    // 项目根目录
    root,
    // 项目部署的基础路径
    base: './',
    // 无需处理的静态资源目录
    publicDir: fileURLToPath(new URL('./public', import.meta.url)),
    // 需要处理的静态资源目录
    assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)),
    plugins: [
      // vue模板编译插件
      vue(),
      // jsx编译插件
      vueJsx(),
    ],
    server: {
      // 启用 TLS + HTTP/2
      // https: {},
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      host: true,
      // 指定开发服务器端口
      port: 9000,
      // 开发服务器启动时，是否自动在浏览器中打开应用程序
      open: false,
      // 是否开启CORS跨域
      cors: true,
      // 代理服务器
      proxy: {
        // 以 /api 开头的请求都会被转发到 target
        [env.VITE_APP_API_BASEURL]: {
          target: 'http://localhost:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 4000,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 打包入口文件
        input: {
          index: fileURLToPath(new URL('./index.html', import.meta.url)),
        },
        // 静态资源分组
        output: {
          format: 'esm',
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
  };
});
