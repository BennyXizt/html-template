import type { Plugin, ViteDevServer } from 'vite'
import { fileURLToPath } from 'url'
import { resolve, dirname, basename, extname } from 'path'
import fs from 'fs'
import type {EJSFolderInterface } from './types/plugin.interface'
import { EJSFolderTranslation } from './i18n'

export function ViteWatchEJSFolderPlugin({relativePath, outputDestination, language}: EJSFolderInterface): Plugin {
    return {
        name: 'watch-ejs-folder-plugin',
        configureServer(server: ViteDevServer) {
            const 
                __filename = fileURLToPath(import.meta.url),
                __dirname = dirname(__filename),
                watchDir = resolve(__dirname, relativePath),
                finalDestinationRoot = outputDestination.root ? outputDestination.root :  {
                    fileName: '',
                    fileDestination: ''
                },
                finalDestinationTest = outputDestination.test ? outputDestination.test :  {
                    fileName: '',
                    fileDestination: ''
                },
                destinationRootHTML = outputDestination.root ? resolve(__dirname, outputDestination.root.fileDestination) : undefined,
                destinationTestHTML = outputDestination.test ? resolve(__dirname, outputDestination.test.fileDestination) : undefined,
                translation = new EJSFolderTranslation({pluginName: 'watchEJSFolderPlugin', language})

            translation.pluginStart(watchDir, { destinationRootHTML })
            

            server.watcher.add(watchDir);
            server.watcher.on('change', (changedFile) => {
                console.log(changedFile);
                console.log(watchDir);
                
                if (!changedFile.startsWith(watchDir) ) 
                    return

                translation.fileHasBeenChanged(changedFile)
                
                setTimeout(() => {
                    let 
                        finalOutputDestionation: string | undefined = undefined,
                        needToRewrite = false

                    if(changedFile.includes(finalDestinationRoot.fileName)) {
                        finalOutputDestionation =  destinationRootHTML
                        needToRewrite = true
                    }

                    if(changedFile.includes(finalDestinationTest.fileName)) {
                        finalOutputDestionation =  destinationTestHTML
                        needToRewrite = true
                    }


                    if(needToRewrite) {
                        const 
                            fileContent = fs.readFileSync(changedFile, 'utf-8')


                        fs.writeFileSync(finalOutputDestionation!, fileContent, 'utf-8')
                        translation.fileHasBeenUpdated(finalOutputDestionation!)
                           
                    }
                    
                    

                }, 100)
                // server.ws.send({ type: 'full-reload' })
            })
        }
    }
}