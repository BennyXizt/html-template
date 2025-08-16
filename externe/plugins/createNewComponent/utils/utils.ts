

export function updateMainSCSS({scssDir, componentName, fs}) {
    let fileContent: string

    const 
        data = fs.readFileSync(`${scssDir}/main.scss`, 'utf-8'),
        outputFile = `${scssDir}/main.scss`,
        startIndex = data.lastIndexOf('// internal components START'),
        lastIndex = data.lastIndexOf('// internal components END'),
        slicedText = data.slice(startIndex + '// internal components START'.length, lastIndex).trim()
        
    if(slicedText.length == 0) {
            fileContent = 
            `
            ${data.slice(0, startIndex + '// internal components START'.length).trim()}\n@import\n\t'./component/${componentName}';\n${data.slice(lastIndex).trim()}
            `.trim()   
    }
    else {
            fileContent = 
            `
            ${data.slice(0, startIndex + '// internal components START'.length).trim()}\n${slicedText.slice(0, -1)},\n\t'./component/${componentName}';\n${data.slice(lastIndex).trim()}
            `.trim()   
    }
    fs.writeFileSync(outputFile, fileContent, 'utf-8')  
}

export function createEJSFile({ejsDir,componentName,fs}) {
    const
        ejsFile = `${ejsDir}/${componentName}.ejs`,
        ejsFileContent = 
            `
                <% if(typeof ${componentName}_component !== 'undefined' && ${componentName}_component) {
            var blockCSS = '${componentName}'
            if(typeof ${componentName}_component.block !== 'undefined' && ${componentName}_component.block) {
                blockCSS = \`\${componentName.block}__${componentName} ${componentName}\`
            }\n%>\n<div class="<%=blockCSS%>"></div>\n<% } %>
            `.trim()

    fs.mkdirSync(ejsDir, { recursive: true })
    fs.writeFileSync(ejsFile, ejsFileContent, 'utf-8')
}

export function createSCSSFile({scssDir,componentName,fs}) {
    const
        scssFile = `${scssDir}/components/_${componentName}.scss`,
        scssFileContent = 
        `
            .${componentName} {\n\n}
        `.trim()

    fs.writeFileSync(scssFile, scssFileContent, 'utf-8')  
}