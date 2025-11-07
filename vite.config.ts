import { defineConfig } from 'vite'
import { config } from 'dotenv';
import { ViteWatchVideoFolderPlugin, ViteWatchEJSFolderPlugin, ViteWatchFontsFolderPlugin, ViteWatchSVGFolderPlugin } from './externe/plugins/watchFolder'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { resolve } from 'path'

config()



export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.DS_Store',        
        '**/*.tmp',           
        '**/.vscode/**',
        // '**/public/**'    
      ],
      usePolling: true,      
      interval: 1000          
    },
    hmr: {
      overlay: false,     
      // timeout: 3000     
    }
  },
  optimizeDeps: {
    include: ['fluent-ffmpeg', 'vite-plugin-ejs'],
    exclude: []
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'externe')
    },
  },
  css: {
    postcss: {}
  },
  plugins: [
     ViteEjsPlugin({
      head_component: {
        lang: 'en',
        title: 'My App',
        description: 'Default project description',
        keywords: 'vite, ejs, scss, javascript',
        author: 'Your Name'
      }
    }, {
      ejs: {
        views: [resolve(__dirname)]
      }
    }),
    ViteWatchEJSFolderPlugin({
      relativePath: `${__dirname}/src/ejs/views/`,
      outputDestination: {
         pages: {
           fileNameException: [
            'test.ejs'
           ],
           fileDestination: `${__dirname}`
         },
         rest: {
           fileName: [
            'test.ejs'
           ],
           fileDestination: `${__dirname}/externe/pages/`
         }
        }
    }),
    ViteWatchSVGFolderPlugin({
      relativePath: `${__dirname}/public/media/icons/`,
      nameOfTheOutputFile: 'sprite.svg',
      dummy: {
        destination:  `${__dirname}/externe/pages/`,
        fileName:  'fontIcons.html'
      } 
    }),
    ViteWatchFontsFolderPlugin({
      relativePath: `${__dirname}/src/assets/fonts`,
      outputDestination: `${__dirname}/src/assets/styles/base/_fonts.scss`
    }),
    ViteWatchVideoFolderPlugin({
      relativePath: `${__dirname}/public/media/video`,
      outputVideoDirectory: `${__dirname}/public/media/converted`,
      outputVideoFormat: [".mp4"],
      posterDirectory: `${__dirname}/public/media/image/poster`
    })
  ]
})