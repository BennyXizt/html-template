

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

export function createEJSFile({ejsDir, componentName, fs}) {
    const
        ejsFile = `${ejsDir}/components/${componentName}.ejs`,
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

export function createSCSSFile({scssDir, componentName, fs}) {
    const
        scssFile = `${scssDir}/components/_${componentName}.scss`,
        scssFileContent = 
        `
            .${componentName} {\n\n}
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
                    // Change Me
                </div>
            </div>
        </div>\n\t</section>
        `.trim() + '\n\t' +
        data.slice(lastIndex + '</section>'.length).trim()

    fs.writeFileSync(ejsFile, fileContent, 'utf-8')  
}