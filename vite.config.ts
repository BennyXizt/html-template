import { defineConfig } from 'vite'
import { config } from 'dotenv';
import { ViteWatchVideoFolderPlugin, ViteWatchEJSFolderPlugin, ViteWatchFontsFolderPlugin, ViteWatchSVGFolderPlugin } from './externe/plugins/watchFolder'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { resolve } from 'path'

config()



export default defineConfig({
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
    }),
    ViteWatchEJSFolderPlugin({
      relativePath: `${__dirname}/src/ejs/views/`,
      outputDestination: {
         root: {
           fileName: 'index.ejs',
           fileDestination: `${__dirname}/index.html`
         },
         test: {
           fileName: 'test.ejs',
           fileDestination: `${__dirname}/externe/pages/test.html`
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
      relativePath: '../../public/media/video',
      outputVideoDirectory: '../../public/media/converted',
      outputVideoFormat: [".mp4"],
      posterDirectory: '../../public/media/image/poster'
    })
  ]
})