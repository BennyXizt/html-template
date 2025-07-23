import { defineConfig } from 'vite'
import { config } from 'dotenv';
import { ViteWatchVideoFolderPlugin, ViteWatchEJSFolderPlugin, ViteWatchFontsFolderPlugin, ViteWatchSVGFolderPlugin } from './src/plugins/watchFolder'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

config()

export default defineConfig({
  css: {
    postcss: {}
  },
  plugins: [
     ViteEjsPlugin({
      seo: {
        lang: 'en',
        title: 'My App',
        description: 'Default project description',
        keywords: 'vite, ejs, scss, javascript',
        author: 'Your Name'
      }
    }),
    ViteWatchEJSFolderPlugin({
      relativePath: '../../ejs/views/',
      outputDestination: {
         root: {
           fileName: 'index.ejs',
           fileDestination: '../../../index.html'
         },
         test: {
           fileName: 'test.ejs',
           fileDestination: '../../../test.html'
         }
        }
    }),
    // ViteWatchSVGFolderPlugin({
    //   relativePath: process.env.VITE_DUMMY_FILE_RELATIVE_PATH!,
    //   nameOfTheOutputFile: process.env.VITE_DUMMY_FILE_NAME!,
    //   dummy: {
    //     destination:  process.env.VITE_DUMMY_SVG_DESTINATION!,
    //     fileName:  process.env.VITE_DUMMY_SVG_FILE_NAME!
    //   } 
    // }),
    // ViteWatchFontsFolderPlugin({
    //   relativePath: '../../assets/fonts',
    //   outputDestination: '../../assets/styles/base/_fonts.scss'
    // }),
    // ViteWatchVideoFolderPlugin({
    //   relativePath: '../../public/media/video',
    //   // outputVideoDirectory: '../../public/media/converted',
    //   // outputVideoFormat: [".mp4"],
    //   posterDirectory: '../../public/media/image/poster'
    // })
  ]
})