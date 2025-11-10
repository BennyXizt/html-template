

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
    let ejsFileContent,
    formattedComponentName = componentName
    const ejsFile = `${ejsDir}/${blockType}/${componentName}.ejs`

    if(componentName.includes('-')) {
        formattedComponentName = formattedComponentName
            .split('-')
            .map((e, i) => i > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
            .join('')
    }

    switch(blockType) {
        case 'components': {
            ejsFileContent = 
            `<%\n` +
            `// Пример вызова в шаблоне (EJS):\n` +
            `//\n` +
            `// <\\%- include('src/ejs/components/${componentName}.ejs', { \n` +
            `//\t${componentName}_component: {\n` +
            `//\t\tthis: {\n` +
            `//\t\t\tparent: 'parentClass',\n` +
            `//\t\t\tblock: 'childBlockClass',\n` +
            `//\t\t\tclass: ['childClass'],\n` +
            `//\t\t\ttag: 'div',\n` +
            `//\t\t\tstyle: ['customStyle'],\n` +
            `//\t\t\tdataAttribute: ['customDataAttributes'], \n` +
            `//\t\t}\n` +
            `//\t}\n` +
            `//\t}) %>\n` +
            `%>\n` +

            `<%\n` +
            `\tif(typeof ${componentName}_component === 'undefined' || !${componentName}_component) {\n` +
            `\t\treturn\n` +
            `\t}\n\n` +
            `\tvar thisClass = '${componentName}'\n` +
            `\tvar blockClass = thisClass\n` +
            `\tif(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.block !== 'undefined' && ${componentName}_component.this.block)\n` +
            `\t) {\n` +
            `\t\tblockClass = ${componentName}_component.this.block\n` +
            `\t}\n` +
            `\tif(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.parent !== 'undefined' && ${componentName}_component.this.parent)\n` +
            `\t) {\n` +
            `\t\tthisClass = \`$\{${componentName}_component.this.parent\}__$\{thisClass} $\{blockClass}\`\n` +
            `\t} else if(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.class !== 'undefined' && ${componentName}_component.this.class)\n` +
            `\t) {\n` +
            `\t\tif(typeof ${componentName}_component.this.class === 'string') {\n` +
            `\t\t\tthisClass = \`$\{${componentName}_component.this.class} $\{blockClass}\`\n` +
            `\t\t} else if(typeof ${componentName}_component.this.class === 'object') {\n` +
            `\t\t\tthisClass = \`$\{${componentName}_component.this.class.join(' ')} $\{blockClass}\`\n` +
            `\t\t}\n` +
            `\t} else {\n` +
            `\t\tthisClass = blockClass\n` +
            `\t}\n\n` +

            `\tvar thisTag = 'div'\n` +
            `\tif(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.tag !== 'undefined' && ${componentName}_component.this.tag)\n` +
            `\t) {\n` +
            `\t\tthisTag = ${componentName}_component.this.tag\n` +
            `\t}\n\n` +

            `\tvar thisStyles = undefined\n` +
            `\tif(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.style !== 'undefined' && ${componentName}_component.this.style)\n` +
            `\t) {\n` +
            `\t\tif(typeof ${componentName}_component.this.style === 'string') {\n` +
            `\t\t\tthisStyles = \`style='$\{${componentName}_component.this.style}'\`\n` +
            `\t\t} else if(typeof ${componentName}_component.this.style === 'object') {\n` +
            `\t\t\tthisStyles = \`style='$\{${componentName}_component.this.style.join(' ')}'\`\n` +
            `\t\t}\n` +
            `\t}\n\n` +

            `\tvar thisDataAttributes = ''\n` +
            `\tif(\n` +
            `\t\t(typeof ${componentName}_component.this !== 'undefined' && ${componentName}_component.this) &&\n` +
            `\t\t(typeof ${componentName}_component.this.dataAttribute !== 'undefined' && ${componentName}_component.this.dataAttribute)\n` +
            `\t) {\n` +
            `\t\tif(typeof ${componentName}_component.this.dataAttribute === 'string')\n` +
            `\t\t{\n` +
            `\t\t\tthisDataAttributes += ' ' + ${componentName}_component.this.dataAttribute\n` +
            `\t\t}\n` +
            `\t\telse if(typeof ${componentName}_component.this.dataAttribute === 'object')\n` +
            `\t\t{\n` +
            `\t\t\tthisDataAttributes += ' ' + ${componentName}_component.this.dataAttribute.join(' ')\n` +
            `\t\t}\n` +
            `\t}\n` +

            `%>\n\n` +

            `<<%=thisTag%> <%=thisDataAttributes%> class='<%=thisClass%>' <%-thisStyles%>>\n\n` +
            `</<%=thisTag%>>`
            break
        }
        case 'layout': {
            ejsFileContent = 
                `<%\n\n%>` + 
                `\n\n<section class="layout__${componentName} ${componentName}">\n\t<div class="${componentName}__container container">` +
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
        lastIndex = data.lastIndexOf('</section>')

    let formattedComponentName = componentName


    if(componentName.includes('-')) {
        formattedComponentName = formattedComponentName
            .split('-')
            .map((e, i) => i > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
            .join('')
    }

    const fileContent = 
        data.slice(0, lastIndex + '</section>'.length).trim() + '\n\t' +
        `
        <section class='${componentName}_component'>
        <div class="outer container">
            <div class="inner">
                <h6 class="text-center">${componentName.toUpperCase()} Component</h6>
                <div class="flex items-center gap-x-2">
                    <%- include('src/ejs/components/${componentName}.ejs', {
                        ${formattedComponentName}_component: {
                            
                        }
                    })%>
                </div>
            </div>
        </div>\n\t</section>
        `.trim() + '\n\t' +
        data.slice(lastIndex + '</section>'.length).trim()

    fs.writeFileSync(ejsFile, fileContent, 'utf-8')  
}

export function updateMainEJSFile({ejsDir, componentName, rootPage, fs}) {
    const
        data = fs.readFileSync(`${ejsDir}/views/${rootPage}`, 'utf-8'),
        ejsFile = `${ejsDir}/views/${rootPage}`,
        lastIndex = data.lastIndexOf('</main>'),
        fileContent = 
            data.slice(0, lastIndex).trim() + '\n\t' +
            `\t\t<%- include('src/ejs/layout/${componentName}.ejs')%>\n\t\t` +
            data.slice(lastIndex).trim()
            
        fs.writeFileSync(ejsFile, fileContent, 'utf-8')  
}