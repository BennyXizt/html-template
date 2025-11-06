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
                finalDestinationRest = outputDestination.rest ? outputDestination.rest :  {
                    fileNameException: ['index.ejs'],
                    fileDestination: ''
                },
                destinationRootHTML = outputDestination.root ? resolve(__dirname, outputDestination.root.fileDestination) : undefined,
                destinationRestHTML = outputDestination.rest ? resolve(__dirname, outputDestination.rest.fileDestination) : undefined,
                translation = new EJSFolderTranslation({pluginName: 'watchEJSFolderPlugin', language})

            translation.pluginStart(watchDir, { destinationRootHTML })
            

            server.watcher.add(watchDir);
            server.watcher.on('change', (changedFile) => {
                 console.log(changedFile);
                if (dirname(changedFile) !== watchDir) 
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
                   
                    if(
                        (destinationRestHTML) &&
                        (!finalDestinationRest.fileNameException.includes(basename(changedFile)))
                    ) {
                        finalOutputDestionation =  resolve(destinationRestHTML, `${basename(changedFile).split('.')[0]}.html`)
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