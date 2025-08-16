

export function updateMainSCSS({scssDir, blockType, componentName, fs}) {
    let fileContent: string

    const 
        data = fs.readFileSync(`${scssDir}/main.scss`, 'utf-8'),
        outputFile = `${scssDir}/main.scss`,
        startIndex = data.lastIndexOf(`// internal ${blockType} START`),
        lastIndex = data.lastIndexOf(`// internal ${blockType} END`),
        slicedText = data.slice(startIndex + `// internal ${blockType} START`.length, lastIndex).trim()
        
    if(slicedText.length == 0) {
            fileContent = 
            `
            ${data.slice(0, startIndex + `// internal ${blockType} START`.length).trim()}\n@import\n\t'./${blockType}/${componentName}';\n${data.slice(lastIndex).trim()}
            `.trim()   
    }
    else {
            fileContent = 
            `
            ${data.slice(0, startIndex + `// internal ${blockType} START`.length).trim()}\n${slicedText.slice(0, -1)},\n\t'./${blockType}/${componentName}';\n${data.slice(lastIndex).trim()}
            `.trim()   
    }
    fs.writeFileSync(outputFile, fileContent, 'utf-8')  
}

export function createEJSFile({ejsDir, blockType, componentName, fs}) {
    let ejsFileContent
    const ejsFile = `${ejsDir}/${blockType}/${componentName}.ejs`

    switch(blockType) {
        case 'components': {
            ejsFileContent = `
                <%\n\tif(typeof ${componentName}_component === 'undefined' || !${componentName}_component) {\n\t\treturn\n\t}
                `.trim() +
                `\n\n\tvar blockCSS = '${componentName}'` + 
                `\n\tif(typeof ${componentName}_component.block !== 'undefined' && ${componentName}_component.block) {` +
                `\n\t\tblockCSS = \`\${componentName.block}__${componentName} ${componentName}\`` + 
                `\n\t}\n%>` + 
                `\n\n<div class="<%=blockCSS%>">\n\n</div>`
            break
        }
        case 'layout': {
            ejsFileContent = 
                `<%\n\n%>` + 
                `\n\n<section class="${componentName}">\n\t<div class="${componentName}__container container">` +
                `\n\n\t</div>\n</section>` 
            break
        }
    }

    fs.mkdirSync(`${ejsDir}/${blockType}`, { recursive: true })
    fs.writeFileSync(ejsFile, ejsFileContent, 'utf-8')
}

export function createSCSSFile({scssDir, blockType, componentName, fs}) {
    const
        scssFile = `${scssDir}/${blockType}/_${componentName}.scss`,
        scssFileContent = 
        `
            @use 'sass:map';\n\n.${componentName} {\n\n}
        `.trim()

    fs.writeFileSync(scssFile, scssFileContent, 'utf-8')  
}

export function updateTestEJSFile({ejsDir, componentName, fs}) {
    const
        data = fs.readFileSync(`${ejsDir}/views/test.ejs`, 'utf-8'),
        ejsFile = `${ejsDir}/views/test.ejs`,
        lastIndex = data.lastIndexOf('</section>'),
        fileContent = 
        data.slice(0, lastIndex + '</section>'.length).trim() + '\n\t' +
        `
        <section class='${componentName}_component'>
        <div class="outer container">
            <div class="inner">
                <h6 class="text-center">${componentName.toUpperCase()} Component</h6>
                <div class="flex items-center gap-x-2">
                    <%- include('src/ejs/components/${componentName}.ejs', {
                        ${componentName}_component: {
                            
                        }
                    })%>
                </div>
            </div>
        </div>\n\t</section>
        `.trim() + '\n\t' +
        data.slice(lastIndex + '</section>'.length).trim()

    fs.writeFileSync(ejsFile, fileContent, 'utf-8')  
}