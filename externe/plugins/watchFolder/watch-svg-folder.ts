import type { Plugin, ViteDevServer } from 'vite'
import { fileURLToPath } from 'url'
import { resolve, dirname, basename, extname } from 'path'
import fs from 'fs'
import type { SVGConvertToFile, SVGFolderInterface} from './types/plugin.interface'
import { SVGFolderTranslation } from './i18n'
import { updateDummySVGPage } from './utils/utils'


export function ViteWatchSVGFolderPlugin({relativePath, nameOfTheOutputFile, language, dummy, convertType}: SVGFolderInterface): Plugin  {
    return {
        name: 'watch-svg-folder-plugin',
        configureServer(server: ViteDevServer) {
            const 
                __filename = fileURLToPath(import.meta.url),
                __dirname = dirname(__filename),
                watchDir = resolve(__dirname, relativePath),
                translation = new SVGFolderTranslation({pluginName: 'watchSVGFolderPlugin', language})

            let result = false

            translation.pluginStart(watchDir, nameOfTheOutputFile)

            server.watcher.add(watchDir);
            server.watcher.on('add', (filePath) => {
                if (dirname(filePath) === watchDir && !basename(filePath)?.includes(nameOfTheOutputFile) && extname(filePath) === '.svg') {
                    translation.newFileAdded(filePath)    
                        
                    setTimeout(() => {
                        try {
                            if(convertType === 0) {
                                result = convertSVGToFile({ watchDir, filePath, nameOfTheOutputFile, translation, relativePath, dummy})
                            }

                            if(result)
                                fs.unlinkSync(filePath)   
                        } catch (err) {
                            translation.errorReadingTheFile((err as Error))
                        }
                    }, 100)
                    
                    server.ws.send({ type: 'full-reload' })
                }
            })
        }
    }
}

function convertSVGToFile({ watchDir, filePath, nameOfTheOutputFile, translation, relativePath, dummy}: SVGConvertToFile): boolean {
    const   
        watchedFile = fs.readFileSync(filePath, 'utf-8'),
        viewbox = watchedFile.match(/viewBox="([^"]+)/)?.[1],
        pathArray = watchedFile.match(/<path (.+)>/g),
        circleArray = watchedFile.match(/<circle (.+)>/g),
        lineArray = watchedFile.match(/<line (.+)>/g),
        name = basename(filePath).slice(0, -4).toLowerCase().replace(/\s/g, '-'),
        destFile = `${watchDir}/${nameOfTheOutputFile}`,
        rewriteFile = fs.readFileSync(destFile, 'utf-8'), 
        isFileNotExistOrEmpty = !fs.existsSync(destFile) || fs.statSync(destFile).size === 0

    let fileContent = ''
    
    if(isFileNotExistOrEmpty) {
        fileContent = 
            `<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">` +
            `\n\t<defs>` +
            `\n\t\t<symbol id='${name}' viewBox='${viewbox}'>`
    }
    else if(!rewriteFile.includes(name)) {
        const
            index = rewriteFile.lastIndexOf('</defs>')
            
        fileContent = 
            `${rewriteFile.slice(0, index)}` +
            `\t<symbol id='${name}' viewBox='${viewbox}'>`         
    }
    else {
        translation.iconIsExist(name)
        return false
    }

    if(pathArray) {
        for(const path of pathArray) {
            const 
                d = path.match(/d="([Mm][^"]+")/g),

                stroke = /stroke=/.test(path),
                strokeWidth = path.match(/stroke-width="([^"]+)"/g),
                strokeOpacity = path.match(/stroke-opacity="([^"]+)"/g)
            
            fileContent += 
                `\n\t\t\t<path ${d} ${stroke ? "stroke='currentColor' fill='none'" : "fill='currentColor'"} ${strokeWidth ?? ''} ${strokeOpacity ?? ''}/>`
        }
    }
    if(circleArray) {
        for(const circle of circleArray) {
            const
                r = circle.match(/r="([^"]+)"/g),
                cx = circle.match(/cx="([^"]+)"/g),
                cy = circle.match(/cy="([^"]+)"/g),

                stroke = /stroke=/.test(circle),
                strokeWidth = circle.match(/stroke-width="([^"]+)"/g),
                strokeOpacity = circle.match(/stroke-opacity="([^"]+)"/g)

                fileContent += 
                    `\n\t\t\t<circle ${r} ${cx ?? ''} ${cy ?? ''} ${stroke ? "stroke='currentColor' fill='none'" : "fill='currentColor'"} ${strokeWidth ?? ''} ${strokeOpacity ?? ''}/>`
        }
    }
    if(lineArray) {
        for(const line of lineArray) {
            const
                x1 = line.match(/x1="([^"]+)"/g),
                y1 = line.match(/y1="([^"]+)"/g),
                x2 = line.match(/x2="([^"]+)"/g),
                y2 = line.match(/y2="([^"]+)"/g),

                transform = line.match(/transform="([^"]+)"/g),
                stroke = /stroke=/.test(line),
                strokeWidth = line.match(/stroke-width="([^"]+)"/g),
                strokeOpacity = line.match(/stroke-opacity="([^"]+)"/g)

                fileContent += 
                    `\n\t\t\t<line ${x1 ?? ''} ${y1 ?? ''} ${x2 ?? ''} ${y2 ?? ''} ${transform ?? ''} ${stroke ? "stroke='currentColor' fill='none'" : "fill='currentColor'"} ${strokeWidth ?? ''} ${strokeOpacity ?? ''}/>`
        }
    }

    fileContent += 
        `\n\t\t</symbol>` + 
        `\n\t</defs>` +
        `\n</svg>`

    fs.writeFileSync(destFile, fileContent, 'utf-8') 
    translation.iconWasCreated(destFile, name)
    console.log(`<svg><use href="${relativePath}/${nameOfTheOutputFile}#${name}"></svg>`)

    if(dummy) {
        const
            dummyDestination = resolve(__dirname, dummy.destination), 
            dummyFile = `${dummyDestination}/${dummy.fileName}`
        
        updateDummySVGPage({watchedFile: destFile, dummyFile: dummyFile, id: name, translation: translation})
    }

    return true
}