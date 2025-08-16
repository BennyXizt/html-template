import fs from 'fs'
import {relative, dirname} from 'path'
import { SVGFolderTranslation } from '../i18n'

export function updateDummySVGPage({watchedFile, dummyFile, id, translation}: {watchedFile: string, dummyFile: string, id: string, translation: SVGFolderTranslation}) {
    try {
        const relativePath = relative(dirname(dummyFile), watchedFile).replace(/\\/g, '/')
        if(!fs.existsSync(dummyFile) || fs.statSync(dummyFile).size === 0) {
            const 
                fileContent =
                `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dummy SVG</title>
                    </head>
                    <body>
                    <div data-fs-dummy-aside="">
                        <h3>Components</h3>
                        <ul>
                            <li>
                                <a href="./test.html">Test Page</a>
                            </li>
                            <li>
                                <a href="/">Home Page</a>
                            </li>
                        </ul>
                    </div>
                        <h1>Dummy SVG</h1>
                        <ul class="icons">
                        <li class="icon">
                            <svg><use href="${relativePath}#${id}"></use><use href="${relativePath.replace(/\/public/, '')}#${id}"></use></svg>
                            <span>${id}</span>        
                            <pre>
                            <code>
                                &lt;svg&gt;
                                  &lt;use href="media/icons/sprite.svg#${id}"&gt;&lt;/use&gt;
                                &lt;/svg&gt;
                            </code>      
                            </pre>  
                        </li>
                        </ul>

                        <style>
                        h1 {
                            text-align: center;
                        }
                        svg {
                            color: rgb(194, 0, 0);
                            width: 30px;
                            height: 30px;
                        }
                        ul {
                            display: flex;
                            flex-flow: row wrap;
                            gap: 10px;
                        }
                        li {
                            display: grid;
                            align-items: center;
                            justify-items: start;
                            grid-template-columns: repeat(2, 1fr);
                            border: 1px solid black;
                            padding: 12px;
                            font-weight: bold;
                        }
                        pre {
                            margin-top: 5px;
                            grid-column: 1 / -1;
                            margin-bottom: 0;
                            margin-right: 5px;
                        }
                        </style>
                    </body>
                    </html>
                `
            fs.writeFileSync(dummyFile, fileContent, 'utf-8')   
            translation.newFileAdded(dummyFile)
        }
        else {
             const 
                rewriteFile = fs.readFileSync(dummyFile, 'utf-8'),
                lastIndex = rewriteFile.lastIndexOf('</li>') + 5,
                fileContent = 
                `
                    ${rewriteFile.slice(0, lastIndex)}
                     <li class="icon">
                        <svg><use href="${relativePath}#${id}"></use><use href="${relativePath.replace(/\/public/, '')}#${id}"></use></svg>
                        <span>${id}</span>
                        <pre>
                        <code>
                            &lt;svg&gt;
                                &lt;use href="media/icons/sprite.svg#${id}"&gt;&lt;/use&gt;
                            &lt;/svg&gt;
                        </code>
                        </pre>
                    </li>
                    ${rewriteFile.slice(lastIndex)}
                `.trim()
        

             console.log(fileContent)
             
             fs.writeFileSync(dummyFile, fileContent, 'utf-8')   
             translation.fileHasBeenUpdated(dummyFile)
            
        }
    } catch(e) {
        console.log(e)
    }    
}